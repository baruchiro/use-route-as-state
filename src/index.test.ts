import { act } from "@testing-library/react-hooks";
import { useQueryStringKey } from ".";
import { useQueryString } from './index';
import renderer, { StateActions } from "./test/renderer";

describe('useQueryString', () => {

  let state: StateActions<Record<string, string>>
  let history: ReturnType<typeof renderer>['history']

  beforeEach(() => {
    ({ state, history } = renderer(() => useQueryString()))
  })

  it('Should have default empty', () => {

    expect(state.get).toStrictEqual({})
    expect(history.location.search).toBe('')
  })

  it('Should have full object and search', () => {
    act(() => {
      state.set({
        foo: 'bar',
        bazz: 'eggs'
      })
    })

    expect(state.get).toStrictEqual({
      foo: 'bar',
      bazz: 'eggs'
    })
    expect(history.location.search).toBe('?foo=bar&bazz=eggs')
  })

  it('Should remove field', () => {
    act(() => {
      state.set({
        foo: 'bar',
        bazz: 'eggs'
      })
    })

    act(() =>
      state.set(({ foo, ...rest }) => rest)
    )
    expect(state.get).toStrictEqual({ bazz: 'eggs' })
    expect(history.location.search).toBe('?bazz=eggs')
  })

  it('Should show empty string', () => {
    act(() =>
      state.set({ bazz: '' })
    )
    expect(state.get).toStrictEqual({ bazz: '' })
    expect(history.location.search).toBe('?bazz=')
  })
})

describe('useQueryStringKey', () => {

  let state: StateActions<string>
  let history: ReturnType<typeof renderer>['history']

  beforeEach(() => {
    ({ state, history } = renderer(() => useQueryStringKey('foo')))
  })

  it('Should be undefined by default', () => {

    expect(state.get).toBe(undefined)
    expect(history.location.search).toBe('')
  })

  it('Should update the state and the search', () => {
    act(() => {
      state.set('bar')
    })

    expect(state.get).toBe('bar')
    expect(history.location.search).toBe('?foo=bar')
  })

  it('Should use the previous state', () => {
    act(() => {
      state.set('bar')
    })

    act(() => {
      state.set((prev) => prev + prev)
    })

    expect(state.get).toBe('barbar')
    expect(history.location.search).toBe('?foo=barbar')
  })
})
