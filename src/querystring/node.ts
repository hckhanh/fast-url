// This file is adapted from the Node.js project.
// The full implementation can be found from https://github.com/nodejs/node/blob/main/lib/internal/querystring.js
// Updated to the latest version with browser and server compatibility

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

/**
 * Encodes a string for use in URL query strings.
 * Based on Node.js internal querystring implementation.
 * Optimized version with direct table access for maximum performance.
 *
 * @param str - The string to encode
 * @returns The encoded string
 */
export function encodeString(str: string): string {
  const len = str.length
  if (len === 0) return ''

  let i = 0,
    out = '',
    lastPos = 0

  outer: for (; i < len; i++) {
    let c = str.codePointAt(i) as number

    // ASCII
    while (c < 0x80) {
      if (noEscape[c] !== 1) {
        if (lastPos < i) {
          out += str.slice(lastPos, i)
        }

        lastPos = i + 1
        out += hexTable[c]
      }

      if (++i === len) break outer

      c = str.codePointAt(i) as number
    }

    if (lastPos < i) {
      out += str.slice(lastPos, i)
    }

    // Multi-byte characters
    if (c < 0x800) {
      lastPos = i + 1
      out += hexTable[0xc0 | (c >> 6)] + hexTable[0x80 | (c & 0x3f)]
      continue
    }
    if (c < 0x10000) {
      lastPos = i + 1
      out +=
        hexTable[0xe0 | (c >> 12)] +
        hexTable[0x80 | ((c >> 6) & 0x3f)] +
        hexTable[0x80 | (c & 0x3f)]
      continue
    }

    // 4-byte UTF-8 (code points >= 0x10000)
    // These are represented as surrogate pairs in UTF-16, so we need to skip 2 positions
    ++i
    lastPos = i + 1
    out +=
      hexTable[0xf0 | (c >> 18)] +
      hexTable[0x80 | ((c >> 12) & 0x3f)] +
      hexTable[0x80 | ((c >> 6) & 0x3f)] +
      hexTable[0x80 | (c & 0x3f)]
  }

  if (lastPos === 0) {
    return str
  }

  if (lastPos < len) {
    return out + str.slice(lastPos)
  }

  return out
}
