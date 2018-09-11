import {
    normalize,
    bemCx
} from '../index'

describe('bem utils', () => {

    describe('normalize', () => {
        it('handles string', () => {
            expect(
                normalize('xxx')
            ).toEqual(['xxx'])
        })

        it('handles null', () => {
            expect(
                normalize(null)
            ).toEqual([])
        })

        it('handles undefined', () => {
            expect(
                normalize()
            ).toEqual([])

            expect(
                normalize(undefined)
            ).toEqual([])
        })

        it('handles empty array', () => {
            expect(
                normalize([])
            ).toEqual([])
        })

        it('handles simple array', () => {
            expect(
                normalize(['a', 'b'])
            ).toEqual(['a', 'b'])
        })

        it('handles nested array', () => {
            expect(
                normalize([['a'], 'b', ['34', ['www', 'xxx']]])
            ).toEqual(['a', 'b', '34', 'www', 'xxx'])
        })

        it('handles map', () => {
            expect(
                normalize({ a: false, c: 2 * 2 === 4, bubu: null, papa: true })
            ).toEqual(['c', 'papa'])
        })

        it('handles empty map', () => {
            expect(
                normalize({})
            ).toEqual([])
        })

        it('handles maps nested in array', () => {
            expect(
                normalize([{ 'a': false }, { 'c': 2 * 2 === 4 }, 'b'])
            ).toEqual(['c', 'b'])
        })
    })

    describe('normalize with prefix', () => {
        it('handles string', () => {
            expect(
                normalize('xxx', 'prefix')
            ).toEqual(['prefix--xxx'])
        })

        it('handles null', () => {
            expect(
                normalize(null, 'prefix')
            ).toEqual([])
        })

        it('handles undefined', () => {
            expect(
                normalize(undefined, 'prefix')
            ).toEqual([])

            expect(
                normalize(undefined, 'prefix')
            ).toEqual([])
        })

        it('handles empty array', () => {
            expect(
                normalize([], 'prefix')
            ).toEqual([])
        })

        it('handles simple array', () => {
            expect(
                normalize(['a', 'b'], 'prefix')
            ).toEqual(['prefix--a', 'prefix--b'])
        })

        it('handles nested array', () => {
            expect(
                normalize([['a'], 'b', ['34', ['www', 'xxx']]], 'prefix')
            ).toEqual(['prefix--a', 'prefix--b', 'prefix--34', 'prefix--www', 'prefix--xxx'])
        })

        it('handles map', () => {
            expect(
                normalize({ a: false, c: 2 * 2 === 4, bubu: null, papa: true }, 'prefix')
            ).toEqual(['prefix--c', 'prefix--papa'])
        })

        it('handles empty map', () => {
            expect(
                normalize({}, 'prefix')
            ).toEqual([])
        })

        it('handles maps nested in array', () => {
            expect(
                normalize([{ 'a': false }, { 'c': 2 * 2 === 4 }, 'b'], 'prefix')
            ).toEqual(['prefix--c', 'prefix--b'])
        })
    })

    describe('bemCx', () => {

        it('handles no modifiers', () => {
            expect(
                bemCx('block')
            ).toMatch('block')
        })

        it('handles map', () => {
            expect(
                bemCx('block',
                    { 'modif': true }
                )
            ).toMatch('block block--modif')
        })

        it('handles multi element map', () => {
            expect(
                bemCx('block', {
                    'modif': true,
                    'modif22': true
                })
            ).toMatch('block block--modif block--modif22')
        })

        it('handles map with condition: false', () => {
            expect(
                bemCx('block',
                    { 'modif': false }
                )
            ).toMatch('block')
        })

        it('handles falsy condition: undefined', () => {
            expect(
                bemCx('block', { 'modif': undefined })
            ).toMatch('block')
        })

        it('handles falsy condition: 0', () => {
            expect(
                bemCx('block', { 'modif': 0 })
            ).toMatch('block')
        })

        it('handles block elements', () => {
            expect(
                bemCx('block__some-element', {
                    'modif': true
                })
            ).toMatch('block__some-element block__some-element--modif')
        })

        it('handles array', () => {
            expect(
                bemCx('block',
                    ['modif', 'modif2']
                )
            ).toMatch('block block--modif block--modif2')
        })

        it('handles custom classes', () => {
            expect(
                bemCx('block',
                    ['modif', 'modif2'],
                    'some-other-class'
                )
            ).toMatch('block block--modif block--modif2 some-other-class')
        })

        it('handles complex custom classes', () => {
            expect(
                bemCx('block',
                    ['modif', 'modif2'],
                    {
                        'some-other-class': false,
                        'yet-another-class': true,
                        'yet-another-class2': false
                    }
                )
            ).toMatch('block block--modif block--modif2 yet-another-class')
        })

    })

})
