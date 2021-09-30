import { act } from "@testing-library/react-hooks";
import { useQueryString } from '../index';
import renderer from "./renderer";

describe('useQueryString', () => {

  it('Should have default empty', () => {
    const { state, history } = renderer(() => useQueryString())

    expect(state.get).toStrictEqual({})
    expect(history.location.search).toBe('')
  })

  it('Should be the default input', () => {
    const { state, history } = renderer(() => useQueryString({
      foo: 'bar',
      bazz: 'eggs'
    }))

    expect(state.get).toStrictEqual({
      foo: 'bar',
      bazz: 'eggs'
    })
    expect(history.location.search).toBe('')
  })

  it('Should have full object and search', () => {
    const { state, history } = renderer(() => useQueryString())

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

  it('Should have full object and search, include array', () => {
    const { state, history } = renderer(() => useQueryString())

    act(() => {
      state.set({
        foo: 'bar',
        arr: ['bazz', 'temp'],
        tee: [],
        bazz: 'eggs'
      })
    })

    expect(state.get).toEqual({
      foo: 'bar',
      arr: ['bazz', 'temp'],
      tee: [],
      bazz: 'eggs'
    })
    expect(history.location.search).toBe('?foo=bar&arr[]=bazz&arr[]=temp&tee[-]=&bazz=eggs')
  })

  it('Should remove field', () => {
    const { state, history } = renderer(() => useQueryString())

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
    const { state, history } = renderer(() => useQueryString())

    act(() =>
      state.set({ bazz: '' })
    )
    expect(state.get).toStrictEqual({ bazz: '' })
    expect(history.location.search).toBe('?bazz=')
  })
})

// TODO: defaults
