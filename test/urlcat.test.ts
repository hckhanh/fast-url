import { describe, expect, it } from 'vitest'
import { createUrl } from '../src'

describe('createUrl', () => {
  it('Concatenates the base URL and the path if no params are passed', () => {
    const expected = 'http://example.com/path'
    const actual = createUrl('http://example.com', 'path')
    expect(actual).toBe(expected)
  })

  it('Uses exactly one slash for joining even if the base URL has a trailing slash', () => {
    const expected = 'http://example.com/path'
    const actual = createUrl('http://example.com/', 'path')
    expect(actual).toBe(expected)
  })

  it('Uses exactly one slash for joining even if the path has a leading slash', () => {
    const expected = 'http://example.com/path'
    const actual = createUrl('http://example.com', '/path')
    expect(actual).toBe(expected)
  })

  it('Uses exactly one slash for joining even if the base URL and the path both have a slash at the boundary', () => {
    const expected = 'http://example.com/path'
    const actual = createUrl('http://example.com/', '/path')
    expect(actual).toBe(expected)
  })

  it('Substitutes path parameters', () => {
    const expected = 'http://example.com/path/1'
    const actual = createUrl('http://example.com/', '/path/:p', { p: 1 })
    expect(actual).toBe(expected)
  })

  it('Allows path parameters at the beginning of the path', () => {
    const expected = 'http://example.com/1'
    const actual = createUrl('http://example.com/', ':p', { p: 1 })
    expect(actual).toBe(expected)
  })

  it('Parameters that are missing from the path become query parameters', () => {
    const expected = 'http://example.com/path/1?q=2'
    const actual = createUrl('http://example.com/', '/path/:p', { p: 1, q: 2 })
    expect(actual).toBe(expected)
  })

  it('Uses exactly one ? to join query parameters even if the path has a trailing question mark', () => {
    const expected = 'http://example.com/path?q=2'
    const actual = createUrl('http://example.com/', '/path?', { q: 2 })
    expect(actual).toBe(expected)
  })

  it('Removes trailing question mark from the path if no params are specified', () => {
    const expected = 'http://example.com/path'
    const actual = createUrl('http://example.com/', '/path?', {})
    expect(actual).toBe(expected)
  })

  it('All parameters become query parameters if the path has no parameters', () => {
    const expected = 'http://example.com/path'
    const actual = createUrl('http://example.com/', '/path?', {})
    expect(actual).toBe(expected)
  })

  it('If a parameter appears twice in the path, it is substituted twice', () => {
    const expected = 'http://example.com/path/a/b/a/r'
    const actual = createUrl('http://example.com/', '/path/:p1/:p2/:p1/r', {
      p1: 'a',
      p2: 'b',
    })
    expect(actual).toBe(expected)
  })

  it('Escapes both path and query parameters', () => {
    const expected = 'http://example.com/path/a%20b?q=b%20c'
    const actual = createUrl('http://example.com/', '/path/:p', {
      p: 'a b',
      q: 'b c',
    })
    expect(actual).toBe(expected)
  })

  it("Can handle complex URL's", () => {
    const expected =
      'http://example.com/users/123/posts/987/comments?authorId=456&limit=10&offset=120'
    const actual = createUrl(
      'http://example.com/',
      '/users/:userId/posts/:postId/comments',
      { userId: 123, postId: 987, authorId: 456, limit: 10, offset: 120 },
    )
    expect(actual).toBe(expected)
  })

  it('Provides an overload (baseUrl, pathTemplate) that works correctly', () => {
    const expected = 'http://example.com/path'
    const actual = createUrl('http://example.com/', '/path')
    expect(actual).toBe(expected)
  })

  it('Handles "//" path correctly (reproduces #7)', () => {
    const expected = 'http://example.com//'
    const actual = createUrl('http://example.com/', '//')
    expect(actual).toBe(expected)
  })

  it('Provides an overload (baseTemplate, params) that works correctly', () => {
    const expected = 'http://example.com/path/a%20b?q=b%20c'
    const actual = createUrl('http://example.com/path/:p', {
      p: 'a b',
      q: 'b c',
    })
    expect(actual).toBe(expected)
  })

  it('Escape empty path params', () => {
    const expected = 'http://example.com/path?p=a'
    const actual = createUrl('http://example.com/path', '', { p: 'a' })
    expect(actual).toBe(expected)
  })

  it('Renders boolean (true) path params', () => {
    const expected = 'http://example.com/path/true'
    const actual = createUrl('http://example.com/path/:p', { p: true })
    expect(actual).toBe(expected)
  })

  it('Renders boolean (false) path params', () => {
    const expected = 'http://example.com/path/false'
    const actual = createUrl('http://example.com/path/:p', { p: false })
    expect(actual).toBe(expected)
  })

  it('Renders number path params', () => {
    const expected = 'http://example.com/path/456'
    const actual = createUrl('http://example.com/path/:p', { p: 456 })
    expect(actual).toBe(expected)
  })

  it('Renders string path params', () => {
    const expected = 'http://example.com/path/test'
    const actual = createUrl('http://example.com/path/:p', { p: 'test' })
    expect(actual).toBe(expected)
  })

  it('Ignores entirely numeric path params', () => {
    const expected = 'http://localhost:3000/path/test'
    const actual = createUrl('http://localhost:3000/path/:p', { p: 'test' })
    expect(actual).toBe(expected)
  })

  it('Ignores null query params', () => {
    const expected = 'http://example.com/path?q=test'
    const actual = createUrl('http://example.com/path', { p: null, q: 'test' })
    expect(actual).toBe(expected)
  })

  it('Ignores undefined query params', () => {
    const expected = 'http://example.com/path?q=test'
    const actual = createUrl('http://example.com/path', {
      p: undefined,
      q: 'test',
    })
    expect(actual).toBe(expected)
  })

  it('Throws if a path param is an object', () => {
    expect(() =>
      createUrl('http://example.com/path/:p', { p: {} }),
    ).toThrowError(
      'Path parameter p cannot be of type object. Allowed types are: boolean, string, number.',
    )
  })

  it('Throws if a path param is an array', () => {
    expect(() =>
      createUrl('http://example.com/path/:p/:q', { p: [] }),
    ).toThrowError(
      'Path parameter p cannot be of type object. Allowed types are: boolean, string, number.',
    )
  })

  it('Throws if a path param is a symbol', () => {
    expect(() =>
      createUrl('http://example.com/path/:p', { p: Symbol() }),
    ).toThrowError(
      'Path parameter p cannot be of type symbol. Allowed types are: boolean, string, number.',
    )
  })

  it('Throws if a path param is undefined', () => {
    expect(() =>
      createUrl('http://example.com/path/:p', { p: undefined }),
    ).toThrowError(
      'Path parameter p cannot be of type undefined. Allowed types are: boolean, string, number.',
    )
  })

  it('Throws if a path param is null', () => {
    expect(() =>
      createUrl('http://example.com/path/:p', { p: null }),
    ).toThrowError(
      'Path parameter p cannot be of type object. Allowed types are: boolean, string, number.',
    )
  })

  it('Throws if a path param is an empty string', () => {
    expect(() =>
      createUrl('http://example.com/path/:p', { p: '' }),
    ).toThrowError('Path parameter p cannot be an empty string.')
  })

  it('Throws if a path param contains only whitespace', () => {
    expect(() =>
      createUrl('http://example.com/path/:p', { p: '  ' }),
    ).toThrowError('Path parameter p cannot be an empty string.')
  })

  it('Allows port numbers in path params', () => {
    expect(createUrl('http://example.com:8080/path/:p', { p: 1 })).toBe(
      'http://example.com:8080/path/1',
    )
  })

  it('Ignores path params which start with a number', () => {
    expect(
      createUrl('http://example.com:8080/path/:1/:2/:p', {
        '1': 1,
        '2': 2,
        p: 3,
      }),
    ).toBe('http://example.com:8080/path/:1/:2/3?1=1&2=2')
  })

  it('Does not replace both colons', () => {
    expect(
      createUrl('http::one://example.com:8080/path/:one/:two/:three', {
        one: 1,
        two: 2,
        three: 3,
      }),
    ).toBe('http:1://example.com:8080/path/1/2/3')
  })

  it('Handles unicode emoji in path parameters', () => {
    const expected = 'http://example.com/path/%F0%9F%9A%80'
    const actual = createUrl('http://example.com/path/:emoji', { emoji: '🚀' })
    expect(actual).toBe(expected)
  })

  it('Handles unicode emoji in query parameters', () => {
    const expected = 'http://example.com/path?emoji=%F0%9F%9A%80'
    const actual = createUrl('http://example.com/path', { emoji: '🚀' })
    expect(actual).toBe(expected)
  })

  it('Handles multiple unicode characters in path parameters', () => {
    const expected = 'http://example.com/path/%F0%9F%9A%80/%F0%9F%8C%9F'
    const actual = createUrl('http://example.com/path/:a/:b', {
      a: '🚀',
      b: '🌟',
    })
    expect(actual).toBe(expected)
  })

  it('Handles unicode characters mixed with ASCII in path parameters', () => {
    const expected = 'http://example.com/path/hello%F0%9F%9A%80world'
    const actual = createUrl('http://example.com/path/:text', {
      text: 'hello🚀world',
    })
    expect(actual).toBe(expected)
  })

  it('Handles unicode emoji with path and query parameters together', () => {
    const expected = 'http://example.com/path/%F0%9F%9A%80?search=%F0%9F%8C%9F'
    const actual = createUrl('http://example.com/path/:emoji', {
      emoji: '🚀',
      search: '🌟',
    })
    expect(actual).toBe(expected)
  })

  it('Handles various unicode characters (emoji, symbols, accents)', () => {
    const expected =
      'http://example.com/users/%C3%A9?name=%E4%B8%AD%E6%96%87&symbol=%E2%9C%93'
    const actual = createUrl('http://example.com/users/:id', {
      id: 'é',
      name: '中文',
      symbol: '✓',
    })
    expect(actual).toBe(expected)
  })

  it('Handles Vietnamese characters in path parameters', () => {
    const expected = 'http://example.com/city/%C4%90%C3%A0%20N%E1%BA%B5ng'
    const actual = createUrl('http://example.com/city/:name', {
      name: 'Đà Nẵng',
    })
    expect(actual).toBe(expected)
  })

  it('Handles Vietnamese characters in query parameters', () => {
    const expected =
      'http://example.com/search?q=Vi%E1%BB%87t%20Nam&city=S%C3%A0i%20G%C3%B2n'
    const actual = createUrl('http://example.com/search', {
      q: 'Việt Nam',
      city: 'Sài Gòn',
    })
    expect(actual).toBe(expected)
  })

  it('Handles Vietnamese characters with path and query together', () => {
    const expected = 'http://example.com/user/Nguy%E1%BB%85n?name=Tr%E1%BA%A7n'
    const actual = createUrl('http://example.com/user/:id', {
      id: 'Nguyễn',
      name: 'Trần',
    })
    expect(actual).toBe(expected)
  })
})
