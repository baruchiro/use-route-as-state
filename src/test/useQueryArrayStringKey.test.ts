import { act } from "@testing-library/react-hooks";
import { useQueryStringKey } from '../index';
import renderer from "./renderer";

describe('useArrayQueryStringKey', () => {

  it('Should be undefined by default', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo'), '/')

    const s = state.get
    expect(s).toBe(undefined)
    expect(history.location.search).toBe('')
  })

  it('Should return a default empty array', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo', []))

    expect(state.get).toEqual([])
    expect(history.location.search).toBe('')
  })

  it('Should add one array element', () => {
    //useQueryStringKey('foo', [])
    const { state, history, result } = renderer(() => useQueryStringKey('foo', []))

    act(() => {
      result.current[1](['bar'])
      state.set(['bar'])
    })

    expect(state.get).toEqual(['bar'])
    expect(history.location.search).toBe('?foo[]=bar')
  })

  it('Should show an empty array as [-]', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo', ['bar']))

    act(() => {
      state.set([])
    })

    expect(state.get).toEqual([])
    expect(history.location.search).toBe('?foo[-]=')
  })

  it('Should update the state to show an array with an empty string', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo', 'bar'))

    act(() => {
      state.set([''])
    })

    expect(state.get).toEqual([''])
    expect(history.location.search).toBe('?foo[]=')
  })

  it('Should reset to default', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo', ['bar']))

    act(() => {
      state.set(['bazz'])
    })

    act(() => {
      state.set([])
    })

    expect(state.get).toEqual([])
    expect(history.location.search).toBe('?foo[-]=')
  })

  it('Should use the previous state', () => {
    const { state, history } = renderer(() => useQueryStringKey('foo'))

    act(() => {
      state.set(['bar'])
    })

    act(() => {
      state.set((prev) => typeof prev === 'string' ? prev + prev : [...prev, ...prev])
    })

    expect(state.get).toEqual(['bar', 'bar'])
    expect(history.location.search).toBe('?foo[]=bar&foo[]=bar')
  })
})
