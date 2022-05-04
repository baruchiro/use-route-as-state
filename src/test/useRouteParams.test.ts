import { act } from "@testing-library/react-hooks";
import { useRouteParams } from '../index';
import renderer from "./renderer";

describe('useRouteParams', () => {

  it('Should have default empty', () => {
    const { state, history } = renderer(() => useRouteParams(), '/:foo?/:bar?')

    const s = state.get
    expect(s).toStrictEqual({})
    expect(history.location.pathname).toBe('/')
  })

  it('Should be the default input', () => {
    const { state, history } = renderer(() => useRouteParams({ foo: 'bazz', bar: 'eggs' }), '/:foo?/:bar?')

    expect(state.get).toStrictEqual({ foo: 'bazz', bar: 'eggs' })
    expect(history.location.pathname).toBe('/')
  })

  it('Should have full object and path', () => {
    const { state, history } = renderer(() => useRouteParams(), '/:foo?/:bar?')

    act(() => {
      state.set({
        foo: 'bazz',
        bar: 'eggs'
      })
    })

    expect(state.get).toStrictEqual({
      foo: 'bazz',
      bar: 'eggs'
    })
    expect(history.location.pathname).toBe('/bazz/eggs')
  })

  it('Should remove latest field', () => {
    const { state, history } = renderer(() => useRouteParams(), '/:foo?/:bar?')

    act(() => {
      state.set({
        foo: 'bazz',
        bar: 'eggs'
      })
    })

    act(() =>
      state.set(({ bar, ...rest }) => rest)
    )
    expect(state.get).toStrictEqual({ foo: 'bazz' })
    expect(history.location.pathname).toBe('/bazz')
  })
})
