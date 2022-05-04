import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { encodeValues, useDecodedLocation, useDecodedRouteMatch } from './encodeDecode'
import { objectToQueryParams, removeUndefined } from './helpers'

type DispatchState<TState> = Dispatch<SetStateAction<TState>>
type RouteObject = Record<string, string | string[]>
type ParamsRouteObject = Record<string, string | undefined>

export const useQueryString = (defaultValues?: RouteObject): [RouteObject, DispatchState<RouteObject>] => {
    const { pathname, search } = useDecodedLocation()
    const navigate = useNavigate()

    const updateQuery: DispatchState<RouteObject> = useCallback((dispatch: SetStateAction<RouteObject>) => {
        const updatedParams = typeof dispatch === 'function' ? dispatch(search) : dispatch
        navigate(pathname + objectToQueryParams(encodeValues(updatedParams)), { replace: true })
    }, [search, pathname, navigate])

    const queryWithDefault = useMemo(() => Object.assign({}, defaultValues, removeUndefined(search)), [search, defaultValues])

    return [queryWithDefault, updateQuery]
}

export const useQueryStringKey = (key: string, defaultValue?: string | string[]): [string | string[] | undefined, Dispatch<SetStateAction<string | string[]>>] => {
    const [{ [key]: value }, updateQuery] = useQueryString(defaultValue === undefined ? undefined : { [key]: defaultValue })
    const updateKey = useCallback((dispatch: SetStateAction<string | string[]>) => {
        const newValue = typeof dispatch === 'function' ? dispatch(value) : dispatch
        newValue === undefined ? updateQuery(({ [key]: _, ...rest }) => rest) : updateQuery((prev) => ({ ...prev, [key]: newValue }))
    }, [updateQuery, key, value])

    return [value, updateKey]
}

export const useRouteParams = (defaultValues?: ParamsRouteObject): [ParamsRouteObject, DispatchState<ParamsRouteObject>] => {
    const { path, params } = useDecodedRouteMatch()
    const navigate = useNavigate()

    const updateParams = useCallback((dispatch: SetStateAction<ParamsRouteObject>) => {
        const updatedParams = typeof dispatch === 'function' ? dispatch(params) : dispatch
        navigate(generatePath(path, encodeValues(updatedParams)))
    }, [path, params, navigate])

    const paramsWithDefault = useMemo(() => Object.assign({}, defaultValues, removeUndefined(params)), [params, defaultValues])

    return [paramsWithDefault, updateParams]
}

export type UrlState = {
    params: ParamsRouteObject,
    query: RouteObject
}
export const useUrlState = (defaultValues?: UrlState): [UrlState, DispatchState<UrlState>] => {
    const navigate = useNavigate()
    const { path, params } = useDecodedRouteMatch()
    const { search } = useDecodedLocation()

    const updateUrl = useCallback((dispatch: SetStateAction<UrlState>) => {
        const updatedState = typeof dispatch === 'function' ? dispatch({ params, query: search }) : dispatch
        const updatedParams = encodeValues(updatedState.params)
        const updatedQuery = objectToQueryParams(encodeValues(updatedState.query))
        navigate(generatePath(path, updatedParams) + updatedQuery)
    }, [navigate, params, path, search])

    const stateWithdefaults = useMemo(() => {
        return {
            params: Object.assign({}, defaultValues?.params, removeUndefined(params)),
            query: Object.assign({}, defaultValues?.query, removeUndefined(search))
        }
    }, [defaultValues, params, search])

    return [stateWithdefaults, updateUrl]
}
