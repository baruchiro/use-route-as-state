export const getQueryParamsAsObject = (search: string) => {
    const params: Record<string, string | string[]> = {}

    new URLSearchParams(search).forEach((_, key) => {
        const keyValues = new URLSearchParams(search).getAll(key)

        // default array key
        if (key.endsWith('[]')) {
            const keyName = key.replace('[]', '')
            params[keyName] = keyValues
            // empty array key
        } else if (key.endsWith('[-]')) {
            const keyName = key.replace('[-]', '')
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
    }), {} as Record<string, string | string[]>)

const arrayToQueryParams = (key: string, values: string[]) => values.length === 0
    ? `${key}[-]=`
    : values.map((value) => `${key}[]=${value}`).join('&')

export const objectToQueryParams = (obj: Record<string, string | string[]>) => '?' + Object.entries(obj)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => Array.isArray(value) ? arrayToQueryParams(key, value) : `${key}=${value}`)
    .join('&')
