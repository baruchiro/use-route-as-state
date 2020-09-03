import { useEffect, useState } from 'react'
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

export const useQueryAsState = (): [Record<string, string>, (updatedParams: Record<string, string>) => void] => {
    const { pathname, search } = useLocation()
    const history = useHistory()
    const [params, setParams] = useState({})

    useEffect(() => setParams(getQueryParamsAsObject(search)), [search])

    const updateQuery = (updatedParams: Record<string, string>) => {
        Object.assign(params, updatedParams)
        history.replace(pathname + objectToQueryParams(params))
    }

    return [params, updateQuery]
}

export const useParamsAsState = (): [Record<string, string>, (updatedParams: Record<string, string>) => void] => {
    const { path, params } = useRouteMatch()
    const history = useHistory()

    const updateParams = (updatedParams: Record<string, string>) => {
        Object.assign(params, updatedParams)
        history.push(generatePath(path, params))
    }
    return [params, updateParams]
}
