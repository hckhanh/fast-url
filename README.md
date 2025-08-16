<h1 align="center">
  <br>
  <img src="docs/cat.svg" alt="urlcat">
  <br>
  urlcat
  <br>
</h1>

<h4 align="center">Build correct URLs easily.</h4>

<p align="center">
  <a href="https://github.com/balazsbotond/urlcat/actions">
    <img src="https://github.com/balazsbotond/urlcat/actions/workflows/ci.yml/badge.svg" alt="Build Status">
  </a>
  <a href="https://www.npmjs.com/package/urlcat">
    <img src="https://img.shields.io/npm/v/urlcat.svg?style=flat" alt="npm version">
  </a>
  <a href="https://bundlephobia.com/result?p=urlcat">
    <img src="https://badgen.net/bundlephobia/minzip/urlcat" alt="Bundle Size">
  </a>
  <a href="https://coveralls.io/github/balazsbotond/urlcat?branch=master">
    <img src="https://coveralls.io/repos/github/balazsbotond/urlcat/badge.svg?branch=master" alt="Coverage Status">
  </a>
  <a href="https://codspeed.io/hckhanh/fast-url">
    <img src="https://img.shields.io/endpoint?url=https://codspeed.io/badge.json" alt="CodSpeed Badge">
  </a>
</p>

*urlcat* is a tiny JavaScript library that makes building URLs very convenient and prevents common mistakes.

## Features

- **Lightweight**: Only one dependency and under 11KB minified and gzipped
- **Type Safe**: Written in TypeScript with full type definitions
- **URL Safe**: Automatically escapes parameters and handles edge cases
- **Flexible**: Multiple ways to build URLs for different use cases

## Installation

```bash
npm install urlcat
```

## Usage

<br>
<p align="center">
  <img src="docs/urlcat-basic-usage.svg#gh-light-mode-only" alt="Basic usage example">
  <img src="docs/urlcat-basic-usage-dark.svg#gh-dark-mode-only" alt="Basic usage example (dark mode)">
</p>

### Basic URL Building

```javascript
import urlcat from 'urlcat';

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
const urlcat = require('urlcat').default;
```

### Utility Functions

```javascript
import { query, subst, join } from 'urlcat';

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

### `query(params)`

Build a query string from an object of key-value pairs.

### `subst(template, params)`

Substitute path parameters in a template string.

### `join(part1, separator, part2)`

Join two URL parts with exactly one separator.

## Why urlcat?

Building URLs manually is error-prone:

```javascript
// ❌ Error-prone manual approach
const url = `${baseUrl}/users/${id}/posts?limit=${limit}&offset=${offset}`;
// Issues: double slashes, unescaped parameters, complex concatenation
```

```javascript
// ✅ Clean and safe with urlcat
const url = urlcat(baseUrl, '/users/:id/posts', { id, limit, offset });
```

urlcat handles:
- Automatic parameter escaping
- Proper URL segment joining
- Clean separation of path and query parameters

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT