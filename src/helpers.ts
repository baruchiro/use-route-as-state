export const getQueryParamsAsObject = (search: string) => {
    const params: Record<string, string> = {}

    new URLSearchParams(search).forEach((value, key) => params[key] = value)

    return params
}

export const removeUndefined = (obj: Record<string, string>) => Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .reduce((acc, key) => ({
        ...acc,
        [key]: obj[key]
    }), {} as Record<string, string>)

export const objectToQueryParams = (obj: Record<string, string>) => '?' + Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .map((key) => `${key}=${obj[key]}`)
    .join('&')
