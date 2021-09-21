import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { encodeValues, encodeParamsValues, useDecodedLocation, useDecodedRouteMatch } from './encodeDecode'
import { objectToQueryParams, removeUndefined } from './helpers'
export * from './deprecated'

type DispatchState<TState> = Dispatch<SetStateAction<TState>>
type RouteObject = Record<string, string|string[]>
type ParamsRouteObject = Record<string, string>

export const useQueryString = (defaultValues?: RouteObject): [RouteObject, DispatchState<RouteObject>] => {
    const { pathname, search } = useDecodedLocation()
    const history = useHistory()

    const updateQuery: DispatchState<RouteObject> = useCallback((dispatch: SetStateAction<RouteObject>) => {
        const updatedParams = typeof dispatch === 'function' ? dispatch(search) : dispatch
        history.replace(pathname + objectToQueryParams(encodeValues(updatedParams)))
    }, [search, pathname, history])

    const queryWithDefault = useMemo(() => Object.assign({}, defaultValues, removeUndefined(search)), [search, defaultValues])

    return [queryWithDefault, updateQuery]
}

export const useQueryStringKey = (key: string, defaultValue?: string|string[]): [string | string[] | undefined, Dispatch<SetStateAction<string|string[]>>] => {
    const [{ [key]: value }, updateQuery] = useQueryString(defaultValue === undefined ? undefined : { [key]: defaultValue })
    const updateKey = useCallback((dispatch: SetStateAction<string|string[]>) => {
        const newValue = typeof dispatch === 'function' ? dispatch(value) : dispatch
        newValue === undefined ? updateQuery(({ [key]: _, ...rest }) => rest) : updateQuery((prev) => ({ ...prev, [key]: newValue }))
    }, [updateQuery, key, value])

    return [value, updateKey]
}

export const useRouteParams = (defaultValues?: ParamsRouteObject): [ParamsRouteObject, DispatchState<ParamsRouteObject>] => {
    const { path, params } = useDecodedRouteMatch()
    const history = useHistory()

    const updateParams = useCallback((dispatch: SetStateAction<ParamsRouteObject>) => {
        const updatedParams = typeof dispatch === 'function' ? dispatch(params) : dispatch
        history.push(generatePath(path, encodeParamsValues(updatedParams)))
    }, [path, params, history])

    const paramsWithDefault = useMemo(() => Object.assign({}, defaultValues, removeUndefined(params)), [params, defaultValues])

    return [paramsWithDefault, updateParams]
}

export type UrlState = {
    params: ParamsRouteObject,
    query: RouteObject
}
export const useUrlState = (defaultValues?: UrlState): [UrlState, DispatchState<UrlState>] => {
    const history = useHistory()
    const { path, params } = useDecodedRouteMatch()
    const { search } = useDecodedLocation()

    const updateUrl = useCallback((dispatch: SetStateAction<UrlState>) => {
        const updatedState = typeof dispatch === 'function' ? dispatch({params, query: search}) : dispatch
        const updatedParams = encodeParamsValues(updatedState.params)
        const updatedQuery = objectToQueryParams(encodeValues(updatedState.query))
        history.push(generatePath(path, updatedParams) + updatedQuery)
    }, [history, params, path, search])

    const stateWithdefaults = useMemo(() => {
        return {
            params: Object.assign({}, defaultValues?.params, removeUndefined(params)),
            query: Object.assign({}, defaultValues?.query, removeUndefined(search))
        }
    }, [defaultValues, params, search])

    return [stateWithdefaults, updateUrl]
}
