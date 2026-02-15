import { describe, expect, it } from 'vitest'
import { subst } from '../src'

describe('subst', () => {
  it('Returns empty string if the template is empty and there are no params', () => {
    const expected = ''
    const actual = subst('', {})
    expect(actual).toBe(expected)
  })

  it('Returns empty string if the template is empty but a param is passed', () => {
    const expected = ''
    const actual = subst('', { p: 1 })
    expect(actual).toBe(expected)
  })

  it('Substitutes all params present in the object passed', () => {
    const expected = '/1/a/false'
    const actual = subst('/:p/:q/:r', { p: 1, q: 'a', r: false })
    expect(actual).toBe(expected)
  })

  it('Allows parameters at the beginning of the template', () => {
    const expected = '42'
    const actual = subst(':p', { p: 42 })
    expect(actual).toBe(expected)
  })

  it('Renders boolean (true) params', () => {
    const expected = 'true'
    const actual = subst(':p', { p: true })
    expect(actual).toBe(expected)
  })

  it('Renders boolean (false) params', () => {
    const expected = 'false'
    const actual = subst(':p', { p: false })
    expect(actual).toBe(expected)
  })

  it('Renders string params', () => {
    const expected = 'test'
    const actual = subst(':p', { p: 'test' })
    expect(actual).toBe(expected)
  })

  it('Renders number params', () => {
    const expected = '234'
    const actual = subst(':p', { p: 234 })
    expect(actual).toBe(expected)
  })

  it('Throws if a param is an array', () => {
    expect(() => subst(':p', { p: [] })).toThrowError(
      'Path parameter p cannot be of type object. Allowed types are: boolean, string, number.',
    )
  })

  it('Throws if a param is an object', () => {
    expect(() => subst(':p', { p: {} })).toThrowError(
      'Path parameter p cannot be of type object. Allowed types are: boolean, string, number.',
    )
  })

  it('Throws if a param is a symbol', () => {
    expect(() => subst(':p', { p: Symbol('test') })).toThrowError(
      'Path parameter p cannot be of type symbol. Allowed types are: boolean, string, number.',
    )
  })

  it('Throws if a param is missing', () => {
    expect(() => subst(':p', {})).toThrow()
  })

  it('Handles unicode emoji in params', () => {
    const expected = '%F0%9F%9A%80'
    const actual = subst(':p', { p: '🚀' })
    expect(actual).toBe(expected)
  })

  it('Handles multiple unicode emojis', () => {
    const expected = '/%F0%9F%9A%80/%F0%9F%8C%9F'
    const actual = subst('/:a/:b', { a: '🚀', b: '🌟' })
    expect(actual).toBe(expected)
  })

  it('Handles unicode mixed with ASCII', () => {
    const expected = '/hello%F0%9F%9A%80world'
    const actual = subst('/:text', { text: 'hello🚀world' })
    expect(actual).toBe(expected)
  })

  it('Handles various unicode characters (accents, CJK, symbols)', () => {
    const expected = '/users/%C3%A9/posts/%E4%B8%AD%E6%96%87/%E2%9C%93'
    const actual = subst('/users/:name/posts/:title/:status', {
      name: 'é',
      title: '中文',
      status: '✓',
    })
    expect(actual).toBe(expected)
  })

  it('Handles Vietnamese characters in substitution', () => {
    const expected =
      '/city/%C4%90%C3%A0%20N%E1%BA%B5ng/country/Vi%E1%BB%87t%20Nam'
    const actual = subst('/city/:city/country/:country', {
      city: 'Đà Nẵng',
      country: 'Việt Nam',
    })
    expect(actual).toBe(expected)
  })

  it('Handles Vietnamese names with diacritics', () => {
    const expected = '/user/Nguy%E1%BB%85n/Tr%E1%BA%A7n'
    const actual = subst('/user/:first/:last', {
      first: 'Nguyễn',
      last: 'Trần',
    })
    expect(actual).toBe(expected)
  })
})
