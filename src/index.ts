import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { encodeValues, useDecodedLocation, useDecodedRouteMatch } from './encodeDecode'
import { objectToQueryParams, removeUndefined } from './helpers'
export * from './deprecated'

type DisaptchState = Dispatch<SetStateAction<Record<string, string>>>

export const useQueryString = (defaultValues?: Record<string, string>): [Record<string, string>, DisaptchState] => {
    const { pathname, search } = useDecodedLocation()
    const history = useHistory()

    const updateQuery: DisaptchState = useCallback((dispatch: SetStateAction<Record<string, string>>) => {
        const updatedParams = typeof dispatch === 'function' ? dispatch(search) : dispatch
        history.replace(pathname + objectToQueryParams(encodeValues(updatedParams)))
    }, [search, pathname, history])

    const queryWithDefault = useMemo(() => Object.assign({}, defaultValues, removeUndefined(search)), [search, defaultValues])

    return [queryWithDefault, updateQuery]
}

export const useQueryStringKey = (key: string, defaultValue?: string): [string | undefined, Dispatch<SetStateAction<string>>] => {
    const [{ [key]: value }, updateQuery] = useQueryString(defaultValue === undefined ? undefined : { [key]: defaultValue })
    const updateKey = useCallback((dispatch: SetStateAction<string>) => {
        const newValue = typeof dispatch === 'function' ? dispatch(value) : dispatch
        newValue === undefined ? updateQuery(({ [key]: _, ...rest }) => rest) : updateQuery((prev) => ({ ...prev, [key]: newValue }))
    }, [updateQuery, key, value])

    return [value, updateKey]
}

export const useRouteParams = (defaultValues?: Record<string, string>): [Record<string, string>, DisaptchState] => {
    const { path, params } = useDecodedRouteMatch()
    const history = useHistory()

    const updateParams = useCallback((dispatch: SetStateAction<Record<string, string>>) => {
        const updatedParams = typeof dispatch === 'function' ? dispatch(params) : dispatch
        history.push(generatePath(path, encodeValues(updatedParams)))
    }, [path, params, history])

    const paramsWithDefault = useMemo(() => Object.assign({}, defaultValues, removeUndefined(params)), [params, defaultValues])

    return [paramsWithDefault, updateParams]
}
