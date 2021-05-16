/* eslint-disable no-magic-numbers */
import { takeAll } from '../../eager'
import { map } from '../map'

describe('map calls a function for each element of an iterable and returns the result', () => {
    it('squares all the numbers', () => {
        expect(takeAll(map([1, 2, 3], (n) => n * n))).toStrictEqual([1, 4, 9])
    })
})
