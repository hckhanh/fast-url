import { stringify } from 'fast-querystring'

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
 * urlcat('http://api.example.com/users/:id', { id: 42, search: 'foo' })
 * // -> 'http://api.example.com/users/42?search=foo
 * ```
 */
export default function urlcat(baseTemplate: string, params: ParamMap): string

/**
 * Concatenates the base URL and the path specified using '/' as a separator.
 * If a '/' occurs at the concatenation boundary in either parameter, it is removed.
 *
 * @param {String} baseUrl the first part of the URL
 * @param {String} path the second part of the URL
 *
 * @returns {String} the result of the concatenation
 *
 * @example
 * ```ts
 * urlcat('http://api.example.com/', '/users')
 * // -> 'http://api.example.com/users
 * ```
 */
export default function urlcat(baseUrl: string, path: string): string

/**
 * Concatenates the base URL and the path specified using '/' as a separator.
 * If a '/' occurs at the concatenation boundary in either parameter, it is removed.
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
 * urlcat('http://api.example.com/', '/users/:id', { id: 42, search: 'foo' })
 * // -> 'http://api.example.com/users/42?search=foo
 * ```
 */
export default function urlcat(
  baseUrl: string,
  pathTemplate: string,
  params: ParamMap,
): string

export default function urlcat(
  baseUrlOrTemplate: string,
  pathTemplateOrParams: string | ParamMap,
  maybeParams: ParamMap = {},
): string {
  return typeof pathTemplateOrParams === 'string'
    ? urlcatImpl(pathTemplateOrParams, maybeParams, baseUrlOrTemplate)
    : urlcatImpl(baseUrlOrTemplate, pathTemplateOrParams, undefined)
}

function joinFullUrl(
  renderedPath: string,
  baseUrl: string,
  pathAndQuery: string,
): string {
  if (renderedPath.length) {
    return join(baseUrl, '/', pathAndQuery)
  } else {
    return join(baseUrl, '?', pathAndQuery)
  }
}

function urlcatImpl(
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
  /* NOTE: Handle quirk of `new UrlSearchParams(params).toString()` in Webkit 602.x.xx
   *       versions which returns stringified object when params is empty object
   */
  if (Object.keys(params).length < 1) {
    return ''
  }

  // fast-querystring has a simpler API than qs
  // It automatically handles encoding and arrays
  return stringify(params)
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
  const remainingParams = { ...params }

  const renderedPath = template.replace(/:[_A-Za-z]+[_A-Za-z0-9]*/g, (p) => {
    // do not replace "::"
    const key = p.slice(1)
    validatePathParam(params, key)
    delete remainingParams[key]
    return encodeURIComponent(params[key] as string | number | boolean)
  })

  return { renderedPath, remainingParams }
}

function validatePathParam(params: ParamMap, key: string) {
  const allowedTypes = ['boolean', 'string', 'number']

  if (!Object.hasOwn(params, key)) {
    throw new Error(`Missing value for path parameter ${key}.`)
  }
  if (!allowedTypes.includes(typeof params[key])) {
    throw new TypeError(
      `Path parameter ${key} cannot be of type ${typeof params[key]}. ` +
        `Allowed types are: ${allowedTypes.join(', ')}.`,
    )
  }
  if (typeof params[key] === 'string' && params[key].trim() === '') {
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
  return p1 === '' || p2 === '' ? p1 + p2 : p1 + separator + p2
}

/**
 * Removes null and undefined values from a parameter map.
 * This function filters out any properties with null or undefined values,
 * returning a new object containing only defined values.
 *
 * @param {ParamMap} params The parameter map to filter
 * @returns {ParamMap} A new object with null and undefined values removed
 *
 * @example
 * ```ts
 * removeNullOrUndef({ a: 'hello', b: null, c: undefined, d: 'world' })
 * // -> { a: 'hello', d: 'world' }
 * ```
 */
function removeNullOrUndef<P extends ParamMap>(params: P) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined,
    ),
  ) as { [K in keyof P]: NonNullable<P[K]> }
}
