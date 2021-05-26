import { act } from "@testing-library/react-hooks";
import { useQueryStringKey } from '../index';
import renderer, { StateActions } from "./renderer";

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
