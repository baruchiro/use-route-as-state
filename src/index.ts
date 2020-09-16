import { useCallback, useMemo } from 'react'
import { generatePath, useHistory, useLocation, useRouteMatch } from 'react-router-dom'

const getQueryParamsAsObject = (search: string) => {
    let params: Record<string, string> = {}

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
    }, [queryData, pathname])

    const queryWithDefault = useMemo(() => ({ ...defaultValues, ...queryData }), [queryData])

    return [queryWithDefault, updateQuery]
}

export const useParamsAsState = (defaultValues?: Record<string, string>): [Record<string, string>, (updatedParams: Record<string, string>) => void] => {
    const { path, params } = useRouteMatch()
    const history = useHistory()

    const updateParams = useCallback((updatedParams: Record<string, string>) => {
        history.push(generatePath(path, { ...params, ...updatedParams }))
    }, [path, params])

    const paramsWithDefault = useMemo(() => ({ ...defaultValues, ...params }), [params])

    return [paramsWithDefault, updateParams]
}
