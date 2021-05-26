import { act } from "@testing-library/react-hooks";
import { useQueryStringKey } from '../index';
import renderer from "./renderer";

describe('useQueryStringKey', () => {

  it('Should be undefined by default', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo'))

    expect(state.get).toBe(undefined)
    expect(history.location.search).toBe('')
  })

  it('Should be the default input', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo', 'bar'))

    expect(state.get).toBe('bar')
    expect(history.location.search).toBe('')
  })

  it('Should update the state and the search', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo'))

    act(() => {
      state.set('bar')
    })

    expect(state.get).toBe('bar')
    expect(history.location.search).toBe('?foo=bar')
  })

  it('Should show empty string', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo'))

    act(() => {
      state.set('')
    })

    expect(state.get).toBe('')
    expect(history.location.search).toBe('?foo=')
  })

  it('Should show empty string and not default', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo', 'bar'))

    act(() => {
      state.set('')
    })

    expect(state.get).toBe('')
    expect(history.location.search).toBe('?foo=')
  })

  it('Should reset to default', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo', 'bar'))

    act(() => {
      state.set('bazz')
    })

    act(() => {
      // @ts-expect-error: It not supported also in useState
      state.set()
    })

    expect(state.get).toBe('bar')
    expect(history.location.search).toBe('')
  })

  it('Should use the previous state', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo'))

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
