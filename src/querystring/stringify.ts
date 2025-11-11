/**
 * Query string serialization utilities.
 *
 * This module provides functions to convert JavaScript objects into URL-encoded
 * query strings, handling various data types including primitives and arrays.
 *
 * @module
 */

import { encodeString } from './node.ts'

/**
 * Converts a value to its primitive string representation for query strings.
 * Handles string, bigint, boolean, and number types.
 *
 * @param value - The value to convert
 * @returns The encoded primitive string or empty string if invalid
 */
function getAsPrimitive(value: unknown) {
  const type = typeof value

  if (type === 'string') {
    // Length check is handled inside the encodeString function
    return encodeString(value as string)
  } else if (type === 'bigint' || type === 'boolean') {
    return '' + value
  } else if (type === 'number' && Number.isFinite(value)) {
    return (value as number) < 1e21 ? '' + value : encodeString('' + value)
  }

  return ''
}

/**
 * Converts an object into a URL-encoded query string.
 *
 * Handles various data types including strings, numbers, booleans, bigints, and arrays.
 * Array values are serialized by repeating the key for each value.
 *
 * @param input - The object to stringify
 * @returns The URL-encoded query string
 *
 * @example
 * ```ts
 * stringify({ name: 'John', age: 30 })
 * // -> 'name=John&age=30'
 *
 * stringify({ tags: ['a', 'b', 'c'] })
 * // -> 'tags=a&tags=b&tags=c'
 * ```
 */
export function stringify(input: unknown) {
  if (input === null || typeof input !== 'object') {
    return ''
  }

  const keys = Object.keys(input)
  const keyLength = keys.length

  if (keyLength === 0) {
    return ''
  }

  let result = ''
  const inputObj = input as Record<string, unknown>

  // Process first key without separator
  let key = keys[0]
  let value = inputObj[key]
  let encodedKey = encodeString(key)

  if (Array.isArray(value)) {
    const valueLength = value.length
    for (let j = 0; j < valueLength; j++) {
      if (j > 0) result += '&'
      result += encodedKey
      result += '='
      result += getAsPrimitive(value[j])
    }
  } else {
    result += encodedKey
    result += '='
    result += getAsPrimitive(value)
  }

  // Process remaining keys with separator prefix
  for (let i = 1; i < keyLength; i++) {
    result += '&'
    key = keys[i]
    value = inputObj[key]
    encodedKey = encodeString(key)

    if (Array.isArray(value)) {
      const valueLength = value.length
      for (let j = 0; j < valueLength; j++) {
        if (j > 0) result += '&'
        result += encodedKey
        result += '='
        result += getAsPrimitive(value[j])
      }
    } else {
      result += encodedKey
      result += '='
      result += getAsPrimitive(value)
    }
  }

  return result
}
