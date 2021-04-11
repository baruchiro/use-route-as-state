import { State } from "./types"

export const getQueryParamsAsObject = (search: string) => {
    const params: State = {}

    new URLSearchParams(search).forEach((value, key) => params[key] = value)

    return params
}

export const removeUndefined = <T extends State>(obj: T) => Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .reduce((acc, key) => ({
        ...acc,
        [key]: obj[key]
    }), {} as Partial<T>)

export const objectToQueryParams = (obj: State) => '?' + Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .map((key) => `${key}=${obj[key]}`)
    .join('&')
