import { useMemo } from "react"
import { useLocation, useRouteMatch } from "react-router-dom"
import { getQueryParamsAsObject, removeUndefined } from "./helpers"

export const useDecodedLocation = () => {
    const { search, ...rest } = useLocation()

    const decodedSearch = useMemo(() => getQueryParamsAsObject(search), [search])

    return { search: decodedSearch, ...rest }
}

export const useDecodedRouteMatch = () => {
    const { params, ...rest } = useRouteMatch()

    const decodedParams = useMemo(() => decodeValues(params as Record<string, string>), [params])

    return { params: decodedParams, ...rest }
}

export const decodeValues = (obj: Record<string, string>) => Object.keys(obj)
    .reduce((acc, key) => ({
        ...acc,
        [key]: obj[key] && decodeURIComponent(obj[key])
    }), {} as Record<string, string>)

export const encodeValues = (obj: Record<string, string>) => Object.keys(removeUndefined(obj))
    .reduce((acc, key) => ({
        ...acc,
        [key]: obj[key] && encodeURIComponent(obj[key])
    }), {} as Record<string, string>)