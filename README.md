# fast-url

A folk version of the [urlcat](https://github.com/balazsbotond/urlcat) focuses on performance and simplicity.
Build correct URLs easily. A fast, minimal fork of urlcat focused on performance and simplicity.

[![Test](https://github.com/hckhanh/fast-url/actions/workflows/test.yml/badge.svg)](https://github.com/hckhanh/fast-url/actions/workflows/test.yml)
[![npm version](https://img.shields.io/npm/v/fast-url.svg?style=flat)](https://www.npmjs.com/package/fast-url)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/fast-url)](https://bundlephobia.com/result?p=fast-url)
[![CodSpeed](https://img.shields.io/endpoint?url=https://codspeed.io/badge.json)](https://codspeed.io/hckhanh/fast-url)

fast-url is a tiny JavaScript/TypeScript library that makes building URLs convenient and prevents common mistakes.

## Features

- Lightweight: Only one dependency (fast-querystring) and minimal bundle size
- Type safe: Written in TypeScript with full type definitions
- URL safe: Automatically escapes parameters and handles edge cases
- Flexible: Multiple ways to build URLs for different use cases

## Installation

```bash
# Using bun (recommended)
bun add fast-url

# Using npm
npm install fast-url
```

## Usage

![Basic usage example](docs/urlcat-basic-usage.svg#gh-light-mode-only)
![Basic usage example (dark mode)](docs/urlcat-basic-usage-dark.svg#gh-dark-mode-only)

### Basic URL building

```javascript
import urlcat from 'fast-url'

// Path parameters
urlcat('https://api.example.com', '/users/:id', { id: 123 })
// → 'https://api.example.com/users/123'

// Query parameters
urlcat('https://api.example.com', '/users', { limit: 10, offset: 20 })
// → 'https://api.example.com/users?limit=10&offset=20'

// Combined path and query parameters
urlcat('https://api.example.com', '/users/:id/posts', { id: 123, limit: 10 })
// → 'https://api.example.com/users/123/posts?limit=10'
```

### CommonJS

```javascript
const urlcat = require('fast-url').default
```

### Utility functions

```javascript
import { query, subst, join } from 'fast-url'

// Build query strings
query({ name: 'John', age: 30 })
// → 'name=John&age=30'

// Substitute path parameters
subst('/users/:id/posts/:postId', { id: 123, postId: 456 })
// → '/users/123/posts/456'

// Join URL parts
join('https://api.example.com/', '/', '/users')
// → 'https://api.example.com/users'
```

## API

### `urlcat(baseUrl, pathTemplate, params?)`
Build a complete URL by combining a base URL, path template, and parameters.

### `urlcat(baseTemplate, params)`
Use a single template containing path parameters; unused params become query parameters.

### `query(params)`
Build a query string from an object of key-value pairs.

### `subst(template, params)`
Substitute path parameters in a template string.

### `join(part1, separator, part2)`
Join two URL parts with exactly one separator.

## Why fast-url?

Building URLs manually is error-prone:

```javascript
// ❌ Error-prone manual approach
const url = `${baseUrl}/users/${id}/posts?limit=${limit}&offset=${offset}`
// Issues: double slashes, unescaped parameters, complex concatenation
```

```javascript
// ✅ Clean and safe with fast-url
const url = urlcat(baseUrl, '/users/:id/posts', { id, limit, offset })
```

fast-url handles:
- Automatic parameter escaping
- Proper URL segment joining
- Clean separation of path and query parameters

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
