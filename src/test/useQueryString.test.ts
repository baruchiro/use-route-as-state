import { act } from "@testing-library/react-hooks";
import { useQueryString } from '../index';
import renderer, { StateActions } from "./renderer";

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
