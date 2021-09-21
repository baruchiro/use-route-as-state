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

export const decodeValues = (obj: Record<string, string>) => {
    const data = Object.keys(obj).reduce((acc, key) => {
        acc[key] = obj[key] && decodeURIComponent(obj[key] as string)
        return acc

    }, {} as Record<string, string>)

    return data
}

export const encodeValues = (obj: Record<string, string|string[]>) => {
    const data = Object.keys(removeUndefined(obj)).reduce((acc, key) => {

        if (Array.isArray(obj[key])) {
            acc[key] = (obj[key] as string[]).map((value:string) => {
                return encodeURIComponent(value)
            })
        } else {
            acc[key] = obj[key] && encodeURIComponent(obj[key] as string)
        }

        return acc

    }, {} as Record<string, string|string[]>)

    return data
}

export const encodeParamsValues = (obj: Record<string, string>) => {
    const data = Object.keys(removeUndefined(obj)).reduce((acc, key) => {
        acc[key] = obj[key] && encodeURIComponent(obj[key] as string)
        return acc

    }, {} as Record<string, string>)

    return data
}