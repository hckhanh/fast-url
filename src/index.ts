/**
 * Fast URL builder with type safety and performance optimization.
 *
 * This module provides utilities to build URLs safely and efficiently,
 * handling path parameters, query strings, and URL joining operations.
 *
 * @example
 * ```ts
 * import { createUrl } from "fast-url";
 *
 * // Build URL with path and query parameters
 * createUrl('https://api.example.com', '/users/:id', { id: 42, search: 'foo' })
 * // -> 'https://api.example.com/users/42?search=foo'
 * ```
 *
 * @module
 */

import { stringify } from './querystring/stringify.ts'

/**
 * A map of parameters for URL building.
 * Used for both path parameters and query string parameters.
 */
export type ParamMap = Record<string, unknown>

/**
 * Builds a URL using the base template and specified parameters.
 *
 * @param {String} baseTemplate a URL template that contains zero or more :params
 * @param {Object} params an object with properties that correspond to the :params
 *   in the base template. Unused properties become query params.
 *
 * @returns {String} a URL with path params substituted and query params appended
 *
 * @example
 * ```ts
 * createUrl('http://api.example.com/users/:id', { id: 42, search: 'foo' })
 * // -> 'http://api.example.com/users/42?search=foo'
 * ```
 */
export function createUrl(baseTemplate: string, params: ParamMap): string

/**
 * Concatenates the base URL and the path specified using `/` as a separator.
 * If `/` occurs at the concatenation boundary in either parameter, it is removed.
 *
 * @param {String} baseUrl the first part of the URL
 * @param {String} path the second part of the URL
 *
 * @returns {String} the result of the concatenation
 *
 * @example
 * ```ts
 * createUrl('http://api.example.com/', '/users')
 * // -> 'http://api.example.com/users'
 * ```
 */
export function createUrl(baseUrl: string, path: string): string

/**
 * Concatenates the base URL and the path specified using `/` as a separator.
 * If `/` occurs at the concatenation boundary in either parameter, it is removed.
 * Substitutes path parameters with the properties of the @see params object and appends
 * unused properties in the path as query params.
 *
 * @param {String} baseUrl the first part of the URL
 * @param {String} pathTemplate the second part of the URL
 * @param {Object} params Object with properties that correspond to the :params
 *   in the base template. Unused properties become query params.
 *
 * @returns {String} URL with path params substituted and query params appended
 *
 * @example
 * ```ts
 * createUrl('http://api.example.com/', '/users/:id', { id: 42, search: 'foo' })
 * // -> 'http://api.example.com/users/42?search=foo'
 * ```
 */
export function createUrl(
  baseUrl: string,
  pathTemplate: string,
  params: ParamMap,
): string

export function createUrl(
  baseUrlOrTemplate: string,
  pathTemplateOrParams: string | ParamMap,
  maybeParams: ParamMap = {},
): string {
  return typeof pathTemplateOrParams === 'string'
    ? createUrlImpl(pathTemplateOrParams, maybeParams, baseUrlOrTemplate)
    : createUrlImpl(baseUrlOrTemplate, pathTemplateOrParams, undefined)
}

function joinFullUrl(
  renderedPath: string,
  baseUrl: string,
  pathAndQuery: string,
): string {
  return renderedPath.length
    ? join(baseUrl, '/', pathAndQuery)
    : join(baseUrl, '?', pathAndQuery)
}

function createUrlImpl(
  pathTemplate: string,
  params: ParamMap,
  baseUrl: string | undefined,
) {
  const { renderedPath, remainingParams } = path(pathTemplate, params)
  const cleanParams = removeNullOrUndef(remainingParams)
  const renderedQuery = query(cleanParams)
  const pathAndQuery = join(renderedPath, '?', renderedQuery)

  return baseUrl
    ? joinFullUrl(renderedPath, baseUrl, pathAndQuery)
    : pathAndQuery
}

/**
 * Creates a query string from the specified object.
 *
 * @param {Object} params an object to convert into a query string.
 *
 * @returns {String} Query string.
 *
 * @example
 * ```ts
 * query({ id: 42, search: 'foo' })
 * // -> 'id=42&search=foo'
 * ```
 */
export function query(params: ParamMap): string {
  return Object.keys(params).length ? stringify(params) : ''
}

/**
 * Substitutes :params in a template with property values of an object.
 *
 * @param {String} template a string that contains :params.
 * @param {Object} params an object with keys that correspond to the params in the template.
 *
 * @returns {String} Rendered path after substitution.
 *
 * @example
 * ```ts
 * subst('/users/:id/posts/:postId', { id: 42, postId: 36 })
 * // -> '/users/42/posts/36'
 * ```
 */
export function subst(template: string, params: ParamMap): string {
  const { renderedPath } = path(template, params)
  return renderedPath
}

function path(template: string, params: ParamMap) {
  // Fast path: no parameters in template
  if (!template.includes(':')) {
    return { renderedPath: template, remainingParams: params }
  }

  const usedKeys = new Set<string>()
  let result = ''
  let i = 0
  const len = template.length

  while (i < len) {
    const char = template[i]

    if (char === ':') {
      // Found a parameter - extract the key
      const keyStart = i + 1
      let keyEnd = keyStart

      // First character must be _ or letter
      const firstChar = template.charCodeAt(keyStart)
      if (
        (firstChar >= 65 && firstChar <= 90) || // A-Z
        (firstChar >= 97 && firstChar <= 122) || // a-z
        firstChar === 95 // _
      ) {
        keyEnd++
        // Continue with word characters (letters, digits, _)
        while (keyEnd < len) {
          const code = template.charCodeAt(keyEnd)
          if (
            (code >= 48 && code <= 57) || // 0-9
            (code >= 65 && code <= 90) || // A-Z
            (code >= 97 && code <= 122) || // a-z
            code === 95 // _
          ) {
            keyEnd++
          } else {
            break
          }
        }

        const key = template.slice(keyStart, keyEnd)
        validatePathParam(params, key)
        usedKeys.add(key)
        result += encodeURIComponent(params[key] as string | number | boolean)
        i = keyEnd
      } else {
        // Invalid parameter format, just add the colon
        result += char
        i++
      }
    } else {
      result += char
      i++
    }
  }

  // Build remaining params object (only if there are used keys)
  const remainingParams: ParamMap = {}
  if (usedKeys.size > 0) {
    for (const key in params) {
      if (!usedKeys.has(key)) {
        remainingParams[key] = params[key]
      }
    }
  } else {
    // No parameters used, return original params
    return { renderedPath: result, remainingParams: params }
  }

  return { renderedPath: result, remainingParams }
}

function validatePathParam(params: ParamMap, key: string) {
  if (!Object.hasOwn(params, key)) {
    throw new Error(`Missing value for path parameter ${key}.`)
  }
  const type = typeof params[key]
  if (type !== 'boolean' && type !== 'string' && type !== 'number') {
    throw new TypeError(
      `Path parameter ${key} cannot be of type ${type}. ` +
        'Allowed types are: boolean, string, number.',
    )
  }
  if (type === 'string' && (params[key] as string).trim() === '') {
    throw new Error(`Path parameter ${key} cannot be an empty string.`)
  }
}

/**
 * Joins two strings using a separator.
 * If the separator occurs at the concatenation boundary in either of the strings, it is removed.
 * This prevents accidental duplication of the separator.
 *
 * @param {String} part1 First string.
 * @param {String} separator Separator used for joining.
 * @param {String} part2 Second string.
 *
 * @returns {String} Joined string.
 *
 * @example
 * ```ts
 * join('first/', '/', '/second')
 * // -> 'first/second'
 * ```
 */
export function join(part1: string, separator: string, part2: string): string {
  const p1 = part1.endsWith(separator)
    ? part1.slice(0, -separator.length)
    : part1
  const p2 = part2.startsWith(separator) ? part2.slice(separator.length) : part2
  return !p1 || !p2 ? p1 + p2 : p1 + separator + p2
}

/**
 * Removes null and undefined values from a parameter map.
 * This function filters out any properties with null or undefined values,
 * returning a new object containing only defined values.
 *
 * @param {ParamMap} params The parameter map to filter
 *
 * @example
 * ```ts
 * removeNullOrUndef({ a: 'hello', b: null, c: undefined, d: 'world' })
 * // -> { a: 'hello', d: 'world' }
 * ```
 */
function removeNullOrUndef<P extends ParamMap>(params: P) {
  const result: ParamMap = {}
  for (const key in params) {
    const value = params[key]
    if (value != null) {
      result[key] = value
    }
  }
  return result as { [K in keyof P]: NonNullable<P[K]> }
}
