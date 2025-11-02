---
"fast-url": major
---

**BREAKING CHANGE**: Renamed default export from `urlcat` to `createUrl` for better clarity and JSR.io compliance

### JSR.io Compliance

Made the package fully compliant with JSR.io (JavaScript Registry) requirements:

- Added comprehensive module documentation to all entrypoints with `@module` tags
- Added JSDoc documentation for all exported symbols (100% coverage)
- Added usage examples in module documentation
- Enhanced TypeScript type safety with proper documentation for `ParamMap` type
- Verified no slow types are used (strict mode enabled)

### Breaking Changes

- **Renamed**: Default export changed from `urlcat` to `createUrl`
  ```typescript
  // Before
  import urlcat from 'fast-url';
  urlcat('https://api.example.com', '/users/:id', { id: 42 });
  
  // After
  import createUrl from 'fast-url';
  createUrl('https://api.example.com', '/users/:id', { id: 42 });
  ```

### Migration Guide

Update your imports and function calls:

1. Replace `import urlcat from 'fast-url'` with `import createUrl from 'fast-url'`
2. Replace all `urlcat(...)` calls with `createUrl(...)`
3. For CommonJS: Replace `const urlcat = require('fast-url').default` with `const createUrl = require('fast-url').default`

The API and all utility functions (`query`, `subst`, `join`) remain unchanged and fully compatible.

### Documentation Improvements

- Enhanced JSDoc comments with better examples
- Added module-level documentation for better IDE support
- Improved type definitions for JSR.io compatibility
- All exported symbols now have comprehensive documentation
