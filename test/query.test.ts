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
})
