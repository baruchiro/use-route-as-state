export const getQueryParamsAsObject = (search: string) => {
    const params: Record<string, string|string[]> = {}

    new URLSearchParams(search).forEach((_, key) => {
        const keyValues = new URLSearchParams(search).getAll(key)
        const keyName = key.includes('[]') ? key.replace('[]','') : key
        params[keyName] = keyName !== key ? keyValues.filter((value) => value !== '' || keyValues.length > 1) : keyValues[0]
    })

    return params
}

export type PartialWithoutUndefined<T> = Partial<T> & { [K in keyof T]-?: K extends keyof T ? T[K] : never };

export const removeUndefined = <T extends Record<string, string | string[] | undefined>>(obj: T) => Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .reduce((acc, key) => ({
        ...acc,
        [key]: obj[key] as string
    }), {} as Record<string, string|string[]>)

export const objectToQueryParams = (obj: Record<string, string|string[]>) => '?' + Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .map((key) => Array.isArray(obj[key])
        ? (obj[key] as string[]).reduce((acc, cur) => acc + `${key}[]=${cur}&`, '').slice(0, -1)
        : `${key}=${obj[key]}`)
    .join('&')
