export const getQueryParamsAsObject = (search: string) => {
    const params: Record<string, string> = {}

    new URLSearchParams(search).forEach((value, key) => params[key] = value)

    return params
}

export type PartialWithoutUndefined<T> = Partial<T> & { [K in keyof T]-?: K extends keyof T ? T[K] : never };

export const removeUndefined = <T extends Record<string, string | undefined>>(obj: T) => Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .reduce((acc, key) => ({
        ...acc,
        [key]: obj[key] as string
    }), {} as Record<string, string>)

export const objectToQueryParams = (obj: Record<string, string>) => '?' + Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .map((key) => `${key}=${obj[key]}`)
    .join('&')
