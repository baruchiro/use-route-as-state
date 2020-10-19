import { useCallback, useMemo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { encodeValues, useDecodedLocation, useDecodedRouteMatch } from './encodeDecode'
import { objectToQueryParams, removeUndefined } from './helpers'

export const useQueryAsState =  <T extends Record<string, string>>(defaultValues?: T): [T, (updatedParams: Partial<T>) => void] => {
    const { pathname, search } = useDecodedLocation()
    const history = useHistory()

    const updateQuery = useCallback((updatedParams: Partial<T>) => {
        history.replace(pathname + objectToQueryParams(encodeValues({ ...search, ...updatedParams })))
    }, [search, pathname, history])

    const queryWithDefault = useMemo(() => Object.assign({}, defaultValues, removeUndefined(search)), [search, defaultValues])

    return [queryWithDefault, updateQuery]
}

export const useParamsAsState = <T extends Record<string, string>>(defaultValues?: T): [T, (updatedParams: Partial<T>) => void] => {
    const { path, params } = useDecodedRouteMatch<T>()
    const history = useHistory()

    const updateParams = useCallback((updatedParams: Partial<T>) => {
        history.push(generatePath(path, encodeValues({ ...params, ...updatedParams })))
    }, [path, params, history])

    const paramsWithDefault = useMemo(() => Object.assign({}, defaultValues, removeUndefined(params)), [params, defaultValues])

    return [paramsWithDefault, updateParams]
}
