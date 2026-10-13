import { describe, test } from 'vitest'
import { join } from '../src'

describe('join benchmarks', () => {
  test('Basic joins', { timeout: 120_000 }, async ({ bench }) => {
    await bench('Simple join without separators at boundaries', () => {
      join('first', ',', 'second')
    }).run()

    await bench('Join with separator at end of first part', () => {
      join('first,', ',', 'second')
    }).run()

    await bench('Join with separator at start of second part', () => {
      join('first', ',', ',second')
    }).run()

    await bench('Both parts have separator at boundary', () => {
      join('first,', ',', ',second')
    }).run()
  })

  test('URL path separators', { timeout: 120_000 }, async ({ bench }) => {
    await bench('Join URL parts with slash', () => {
      join('http://example.com', '/', '/path/to/resource')
    }).run()

    await bench('Join URL with trailing slash', () => {
      join('http://example.com/', '/', 'path')
    }).run()

    await bench('Join URL parts both with slash', () => {
      join('http://example.com/', '/', '/path')
    }).run()

    await bench('Join deep URL paths', () => {
      join('http://example.com/api/v1/', '/', '/users/123/posts')
    }).run()
  })

  test('Query string separators', { timeout: 120_000 }, async ({ bench }) => {
    await bench('Join query parts with ampersand', () => {
      join('param1=value1', '&', 'param2=value2')
    }).run()

    await bench('Join with leading ampersand', () => {
      join('param1=value1', '&', '&param2=value2')
    }).run()

    await bench('Join empty first part with query', () => {
      join('', '?', '?query=test')
    }).run()

    await bench('Join URL path with query string', () => {
      join('http://example.com/path', '?', 'search=test&limit=10')
    }).run()
  })

  test('Edge cases', { timeout: 120_000 }, async ({ bench }) => {
    await bench('Both parts empty', () => {
      join('', ',', '')
    }).run()

    await bench('First part empty', () => {
      join('', '/', '/second')
    }).run()

    await bench('Second part empty', () => {
      join('first/', '/', '')
    }).run()

    await bench('Multiple separators in content', () => {
      join('a|b|c', '|', '|d|e|f')
    }).run()

    await bench('Long strings with separator', () => {
      join(
        'http://example.com/very/long/path/with/many/segments/',
        '/',
        '/and/more/segments/here',
      )
    }).run()
  })

  test('Different separators', { timeout: 120_000 }, async ({ bench }) => {
    await bench('Comma separator', () => {
      join('first', ',', 'second')
    }).run()

    await bench('Slash separator', () => {
      join('first', '/', 'second')
    }).run()

    await bench('Ampersand separator', () => {
      join('first', '&', 'second')
    }).run()

    await bench('Question mark separator', () => {
      join('path', '?', 'query')
    }).run()

    await bench('Pipe separator', () => {
      join('first', '|', 'second')
    }).run()
  })
})
