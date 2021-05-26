import { decodeValues, encodeValues } from "../encodeDecode"

describe('encoding', () => {

    it.each([
        '', 'text', undefined, null
    ])(`Should'nt change it`, (text: any) => {
        expect(encodeValues({ text }).text).toBe(text)
    })

    it.each([
        ['%', '%25'],
        ['%25', '%2525'],
        ['/', '%2F']
    ])('Should encode "%s" to "%s"', (symbol, encoded) => {
        expect(encodeValues({ symbol }).symbol).toBe(encoded)
    })
})

describe('decoding', () => {

    it.each([
        '', 'text', undefined, null
    ])(`Should'nt change it`, (text: any) => {
        expect(decodeValues({ text }).text).toBe(text)
    })

    it.each([
        ['%25', '%'],
        ['%2525', '%25'],
        ['%2F', '/']
    ])('Should encode "%s" to "%s"', (symbol, encoded) => {
        expect(decodeValues({ symbol }).symbol).toBe(encoded)
    })
})