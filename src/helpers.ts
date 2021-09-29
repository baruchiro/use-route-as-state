export const getQueryParamsAsObject = (search: string) => {
    const params: Record<string, string|string[]> = {}

    new URLSearchParams(search).forEach((_, key) => {
        const keyValues = new URLSearchParams(search).getAll(key)

        // default array key
        if (key.endsWith('[]')) {
            const keyName = key.replace('[]','')
            params[keyName] = keyValues
        // empty array key
        } else if (key.endsWith('[-]')) {
            const keyName = key.replace('[-]','')
            params[keyName] = []
        // string key
        } else {
            params[key] = keyValues[0]
        }
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
        ? obj[key].length > 0
            ? (obj[key] as string[]).reduce((acc, cur) => acc + `${key}[]=${cur}&`, '').slice(0, -1)
            : `${key}[-]=`
        : `${key}=${obj[key]}`)
    .join('&')
