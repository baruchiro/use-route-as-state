import { useMemo } from "react"
import { useLocation, useRouteMatch } from "react-router-dom"
import { getQueryParamsAsObject } from "./helpers"
import { State } from "./types"

export const useDecodedLocation = () => {
    const { search, ...rest } = useLocation()

    const decodedSearch = useMemo(() => getQueryParamsAsObject(search), [search])

    return { search: decodedSearch, ...rest }
}

export const useDecodedRouteMatch = <T extends State>() => {
    const { params, ...rest } = useRouteMatch()

    const decodedParams = useMemo(() => decodeValues(params as T), [params])

    return { params: decodedParams, ...rest }
}

export const decodeValues = <T extends State>(obj: T) => Object.keys(obj)
    .reduce((acc, key) => ({
        ...acc,
        [key]: obj[key] && decodeURIComponent(obj[key])
    }), {} as T)

export const encodeValues = <T extends State>(obj: T) => Object.keys(obj)
    .reduce((acc, key) => ({
        ...acc,
        [key]: obj[key] && encodeURIComponent(obj[key])
    }), {} as T)