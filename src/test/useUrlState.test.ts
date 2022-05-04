import { act } from "@testing-library/react-hooks";
import { useUrlState } from '../index';
import renderer from "./renderer";

const fullState = {
  params: {
    foo: 'oof',
    bar: 'rab'
  },
  query: {
    buzz: 'zzub',
    eggs: 'sgge'
  }
}

describe('useUrlState', () => {

  it('Should have default empty', () => {
    const { state, history } = renderer(() => useUrlState(), '/:foo/:bar')

    expect(state.get?.params).toStrictEqual({})
    expect(history.location.pathname).toBe('/')

    expect(state.get?.query).toStrictEqual({})
    expect(history.location.search).toBe('')
  })

  it('Should be the default input', () => {
    const { state, history } = renderer(() => useUrlState(fullState), '/:foo/:bar')

    expect(state.get?.params).toStrictEqual(fullState.params)
    expect(history.location.pathname).toBe('/')

    expect(state.get?.query).toStrictEqual(fullState.query)
    expect(history.location.search).toBe('')
  })

  it('Should have all data', () => {
    const { state, history } = renderer(() => useUrlState(), '/:foo/:bar')

    act(() => {
      state.set(fullState)
    })

    expect(state.get?.params).toStrictEqual(fullState.params)
    expect(history.location.pathname).toBe('/oof/rab')


    expect(state.get?.query).toStrictEqual(fullState.query)
    expect(history.location.search).toBe('?buzz=zzub&eggs=sgge')
  })

  it('Should remove field', () => {
    const { state, history } = renderer(() => useUrlState(), '/:foo/:bar')

    act(() => {
      state.set(fullState)
    })

    act(() =>
      state.set({
        params: {
          foo: 'bar'
        },
        query: {
          buzz: 'eggs'
        }
      })
    )

    expect(state.get?.params).toStrictEqual({ foo: 'bar' })
    expect(history.location.pathname).toBe('/bar')


    expect(state.get?.query).toStrictEqual({ buzz: 'eggs' })
    expect(history.location.search).toBe('?buzz=eggs')
  })

  it('Should show empty string', () => {
    const { state, history } = renderer(() => useUrlState(), '/:foo/:bar')

    act(() =>
      state.set({
        params: {},
        query: {
          bazz: ''
        }
      })
    )
    expect(state.get?.query).toStrictEqual({ bazz: '' })
    expect(history.location.search).toBe('?bazz=')
  })
})
