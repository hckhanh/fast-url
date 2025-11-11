import { describe, expect, it } from 'vitest'
import { query } from '../src'

describe('query', () => {
  it('Returns empty string if there are no params', () => {
    const expected = ''
    const actual = query({})
    expect(actual).toBe(expected)
  })

  it('Returns single key-value pair if one param is passed', () => {
    const expected = 'key=value'
    const actual = query({ key: 'value' })
    expect(actual).toBe(expected)
  })

  it('Can handle multiple params', () => {
    const expected = 'p1=v1&p2=v2&p3=v3'
    const actual = query({ p1: 'v1', p2: 'v2', p3: 'v3' })
    expect(actual).toBe(expected)
  })

  it('Can handle array value', () => {
    const expected = 'p1=v1&p1=v2&p1=v3'
    const actual = query({ p1: ['v1', 'v2', 'v3'] })
    expect(actual).toBe(expected)
  })

  it('Escapes the value', () => {
    const expected = 'key=a%20%22special%22%20value'
    const actual = query({ key: 'a "special" value' })
    expect(actual).toBe(expected)
  })

  it('Escapes the key', () => {
    const expected = 'a%20%22special%22%20key=value'
    const actual = query({ 'a "special" key': 'value' })
    expect(actual).toBe(expected)
  })

  it('Handles unicode emoji in values', () => {
    const expected = 'emoji=%F0%9F%9A%80'
    const actual = query({ emoji: '🚀' })
    expect(actual).toBe(expected)
  })

  it('Handles unicode emoji in keys', () => {
    const expected = '%F0%9F%9A%80=rocket'
    const actual = query({ '🚀': 'rocket' })
    expect(actual).toBe(expected)
  })

  it('Handles multiple unicode characters', () => {
    const expected = 'a=%F0%9F%9A%80&b=%F0%9F%8C%9F'
    const actual = query({ a: '🚀', b: '🌟' })
    expect(actual).toBe(expected)
  })

  it('Handles unicode mixed with ASCII', () => {
    const expected = 'text=hello%F0%9F%9A%80world'
    const actual = query({ text: 'hello🚀world' })
    expect(actual).toBe(expected)
  })

  it('Handles various unicode characters (accents, CJK, symbols)', () => {
    const expected = 'name=%C3%A9&chinese=%E4%B8%AD%E6%96%87&check=%E2%9C%93'
    const actual = query({ name: 'é', chinese: '中文', check: '✓' })
    expect(actual).toBe(expected)
  })

  it('Handles Vietnamese characters in values', () => {
    const expected =
      'country=Vi%E1%BB%87t%20Nam&city=%C4%90%C3%A0%20N%E1%BA%B5ng'
    const actual = query({ country: 'Việt Nam', city: 'Đà Nẵng' })
    expect(actual).toBe(expected)
  })

  it('Handles Vietnamese names with tone marks', () => {
    const expected = 'firstName=Nguy%E1%BB%85n&lastName=Tr%E1%BA%A7n'
    const actual = query({ firstName: 'Nguyễn', lastName: 'Trần' })
    expect(actual).toBe(expected)
  })
})
