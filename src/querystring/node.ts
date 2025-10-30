// This file is adapted from Node.js project.
// Full implementation can be found from https://github.com/nodejs/node/blob/main/lib/internal/querystring.js
// Updated to latest version with browser and server compatibility

// Hex encoding lookup table
const hexTable = new Array(256)
for (let i = 0; i < 256; ++i) {
  hexTable[i] = '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase()
}

// These characters do not need escaping when generating query strings:
// ! - . _ ~
// ' ( ) *
// digits
// alpha (uppercase)
// alpha (lowercase)
// biome-ignore format: the array should not be formatted
const noEscape = new Int8Array([
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, // 80 - 95
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, // 112 - 127
])

// Hex validation lookup table for decoding
// biome-ignore format: the array should not be formatted
export const isHexTable = new Int8Array([
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63 (digits)
  0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 64 - 79 (A-F)
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 80 - 95
  0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 96 - 111 (a-f)
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 112 - 127
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 128+
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
])

/**
 * Encodes a string for use in URL query strings.
 * Based on Node.js internal querystring implementation.
 *
 * @param str - The string to encode
 * @param noEscapeTable - Lookup table for characters that don't need escaping
 * @param hexTable - Lookup table for hex encoding
 * @returns The encoded string
 */
function encodeStr(
  str: string,
  noEscapeTable: Int8Array,
  hexTable: string[],
): string {
  const len = str.length
  if (len === 0) return ''

  let out = ''
  let lastPos = 0
  let i = 0

  outer: for (; i < len; i++) {
    let c = str.charCodeAt(i)

    // ASCII
    while (c < 0x80) {
      if (noEscapeTable[c] !== 1) {
        if (lastPos < i) {
          out += str.slice(lastPos, i)
        }
        lastPos = i + 1
        out += hexTable[c]
      }

      if (++i === len) break outer

      c = str.charCodeAt(i)
    }

    if (lastPos < i) {
      out += str.slice(lastPos, i)
    }

    // Multi-byte characters
    if (c < 0x800) {
      lastPos = i + 1
      out += hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]
      continue
    }
    if (c < 0xD800 || c >= 0xE000) {
      lastPos = i + 1
      out +=
        hexTable[0xE0 | (c >> 12)] +
        hexTable[0x80 | ((c >> 6) & 0x3F)] +
        hexTable[0x80 | (c & 0x3F)]
      continue
    }
    // Surrogate pair
    ++i

    if (i >= len) {
      throw new Error('URI malformed')
    }

    const c2 = str.charCodeAt(i) & 0x3FF

    lastPos = i + 1
    c = 0x10000 + (((c & 0x3FF) << 10) | c2)
    out +=
      hexTable[0xF0 | (c >> 18)] +
      hexTable[0x80 | ((c >> 12) & 0x3F)] +
      hexTable[0x80 | ((c >> 6) & 0x3F)] +
      hexTable[0x80 | (c & 0x3F)]
  }
  if (lastPos === 0) return str
  if (lastPos < len) return out + str.slice(lastPos)
  return out
}

/**
 * Encodes a string for use in URL query strings.
 * This is the main export that uses the default encoding tables.
 *
 * @param str - The string to encode
 * @returns The encoded string
 */
export function encodeString(str: string): string {
  return encodeStr(str, noEscape, hexTable)
}
