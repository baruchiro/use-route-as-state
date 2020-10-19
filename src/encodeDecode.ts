import { useMemo } from "react"
import { useLocation, useRouteMatch } from "react-router-dom"
import { getQueryParamsAsObject } from "./helpers"

export const useDecodedLocation = () => {
    const { search, ...rest } = useLocation()

    const decodedSearch = useMemo(() => decodeValues(getQueryParamsAsObject(search)), [search])

    return { search: decodedSearch, ...rest }
}

export const useDecodedRouteMatch = <T extends Record<string, string>>() => {
    const { params, ...rest } = useRouteMatch()

    const decodedParams = useMemo(() => decodeValues(params as T), [params])

    return { params: decodedParams, ...rest }
}

export const decodeValues = <T extends Record<string, string>>(obj: T) => Object.keys(obj)
    .reduce((acc, key) => ({
        ...acc,
        [key]: obj[key] && decodeURIComponent(obj[key])
    }), {} as T)

export const encodeValues = <T extends Record<string, string>>(obj: T) => Object.keys(obj)
    .reduce((acc, key) => ({
        ...acc,
        [key]: obj[key] && encodeURIComponent(obj[key])
    }), {} as T)