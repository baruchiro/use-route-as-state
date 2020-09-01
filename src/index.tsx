import { generatePath, useHistory, useLocation, useRouteMatch } from 'react-router-dom'

const getQueryParamsAsObject = (search: string) => {
    let params = {}

    new URLSearchParams(search).forEach((value, key) => params[key] = value)

    return params
}

const objectToQueryParams = (obj: Record<string, string>) => '?' + Object.keys(obj).map((key) => `${key}=${obj[key]}`).join('&')

export const useQueryAsState = () => {
    const { pathname, search } = useLocation()
    const history = useHistory()

    const params = getQueryParamsAsObject(search)

    const updateQuery = (updatedParams: Record<string, string>) => {
        Object.assign(params, updatedParams)
        history.replace(pathname + objectToQueryParams(params))
    }

    return [params, updateQuery]
}

export const useParamsAsState = () => {
    const { path, params } = useRouteMatch()
    const history = useHistory()

    const updateParams = (updatedParams: Record<string, string>) => {
        Object.assign(params, updatedParams)
        history.push(generatePath(path, params))
    }
    return [params, updateParams]
}
