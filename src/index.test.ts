import { act, renderHook } from "@testing-library/react-hooks";
import { useQueryStringKey } from './index';
import wrapper from './test/RouterWrapper';

type HookAction<TState> = (props: unknown) => [TState | undefined, (updatedValue: TState) => void]
const helper = <TState>(action: HookAction<TState>) => {
  const { result } = renderHook(action, { wrapper })

  return {
    result,
    get state() {
      return result.current[0]
    },
    get setState() {
      return result.current[1]
    }

  }
}

describe('useQueryStringKey', () => {

  it('Should update the state', () => {
    const result = helper(() => useQueryStringKey('foo'))

    expect(result.state).toBe(undefined)

    act(() => {
      result.setState('bar')
    })

    expect(result.state).toBe('bar')
  })
})
