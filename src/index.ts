import { useCallback, useMemo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { encodeValues, useDecodedLocation, useDecodedRouteMatch } from './encodeDecode'
import { objectToQueryParams, removeUndefined } from './helpers'

export const useQueryAsState = (defaultValues?: Record<string, string>): [Record<string, string>, (updatedParams: Record<string, string>) => void] => {
    const { pathname, search } = useDecodedLocation()
    const history = useHistory()

    const updateQuery = useCallback((updatedParams: Record<string, string>) => {
        history.replace(pathname + objectToQueryParams(encodeValues({ ...search, ...updatedParams })))
    }, [search, pathname, history])

    const queryWithDefault = useMemo(() => ({ ...defaultValues, ...removeUndefined(search) }), [search, defaultValues])

    return [queryWithDefault, updateQuery]
}

export const useParamsAsState = (defaultValues?: Record<string, string>): [Record<string, string>, (updatedParams: Record<string, string>) => void] => {
    const { path, params } = useDecodedRouteMatch()
    const history = useHistory()

    const updateParams = useCallback((updatedParams: Record<string, string>) => {
        history.push(generatePath(path, encodeValues({ ...params, ...updatedParams })))
    }, [path, params, history])

    const paramsWithDefault = useMemo(() => ({ ...defaultValues, ...removeUndefined(params) }), [params, defaultValues])

    return [paramsWithDefault, updateParams]
}
