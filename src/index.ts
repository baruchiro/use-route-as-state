import { useCallback, useMemo } from 'react'
import { generatePath, useHistory, useLocation, useRouteMatch } from 'react-router-dom'

const removeUndefined = (obj: Record<string, string>) => Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})

const getQueryParamsAsObject = (search: string) => {
    const params: Record<string, string> = {}

    new URLSearchParams(search).forEach((value, key) => params[key] = value)

    return params
}

const objectToQueryParams = (obj: Record<string, string>) => '?' + Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .map((key) => `${key}=${obj[key]}`)
    .join('&')

export const useQueryAsState = (defaultValues?: Record<string, string>): [Record<string, string>, (updatedParams: Record<string, string>) => void] => {
    const { pathname, search } = useLocation()
    const history = useHistory()

    const queryData = useMemo(() => getQueryParamsAsObject(search), [search])

    const updateQuery = useCallback((updatedParams: Record<string, string>) => {
        history.replace(pathname + objectToQueryParams({ ...queryData, ...updatedParams }))
    }, [queryData, pathname, history])

    const queryWithDefault = useMemo(() => ({ ...defaultValues, ...removeUndefined(queryData) }), [queryData, defaultValues])

    return [queryWithDefault, updateQuery]
}

export const useParamsAsState = (defaultValues?: Record<string, string>): [Record<string, string>, (updatedParams: Record<string, string>) => void] => {
    const { path, params } = useRouteMatch()
    const history = useHistory()

    const updateParams = useCallback((updatedParams: Record<string, string>) => {
        history.push(generatePath(path, { ...params, ...updatedParams }))
    }, [path, params, history])

    const paramsWithDefault = useMemo(() => ({ ...defaultValues, ...removeUndefined(params) }), [params, defaultValues])

    return [paramsWithDefault, updateParams]
}
