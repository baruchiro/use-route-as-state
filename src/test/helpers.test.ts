import { getQueryParamsAsObject } from "../helpers"

describe('getQueryParamsAsObject', () => {
    it.each([
        ['text', 'text'],
        ['', ''],
        ['%25', '%'],
        ['%2525', '%25'],
        ['%', '%'],
        ['%2F', '/']
    ])('Should parse "%s" to "%s"', (field, parsed) => {
        const queryString = `field=${field}`
        expect(getQueryParamsAsObject(queryString).field).toBe(parsed)
    })

    it.each([
        '', '?'
    ])('Should return empty object for "%s"', (search) => {
        expect(getQueryParamsAsObject(search)).toStrictEqual({})
    })
})