import { useCallback, useEffect, useState } from 'react'
import { generatePath, useHistory, useLocation, useRouteMatch } from 'react-router-dom'

const getQueryParamsAsObject = (search: string) => {
    let params = {}

    new URLSearchParams(search).forEach((value, key) => params[key] = value)

    return params
}

const objectToQueryParams = (obj: Record<string, string>) => '?' + Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .map((key) => `${key}=${obj[key]}`)
    .join('&')

export const useQueryAsState = (initialState?: Record<string, string>): [Record<string, string>, (updatedParams: Record<string, string>) => void] => {
    const { pathname, search } = useLocation()
    const history = useHistory()
    const [params, setParams] = useState(initialState || {})

    useEffect(() => setParams(getQueryParamsAsObject(search)), [search])

    const updateQuery = useCallback((updatedParams: Record<string, string>) => {
        Object.assign(params, updatedParams)
        history.replace(pathname + objectToQueryParams(params))
    }, [params, pathname])

    return [params, updateQuery]
}

export const useParamsAsState = (initialState?: Record<string, string>): [Record<string, string>, (updatedParams: Record<string, string>) => void] => {
    const { path, params } = useRouteMatch()
    const history = useHistory()
    const [urlParams, setUrlParams] = useState(initialState || {})

    useEffect(() => setUrlParams((uParams) => ({ ...uParams, ...params })), [params])

    const updateParams = useCallback((updatedParams: Record<string, string>) => {
        Object.assign(urlParams, updatedParams)
        history.push(generatePath(path, urlParams))
    }, [path, urlParams])

    return [urlParams, updateParams]
}
