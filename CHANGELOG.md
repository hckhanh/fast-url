# fast-url

## 4.0.2

### Patch Changes

- 75521d2: Modernize development infrastructure and CI/CD workflows:

  - Migrate from npm to Bun for faster package management
  - Replace Jest with Vitest for improved test performance
  - Switch from ESLint to Biome for unified linting and formatting
  - Adopt mise for consistent toolchain management across environments
  - Add Changesets for automated version management and releases
  - Implement step-security/harden-runner for enhanced workflow security
  - Set up automated code fixes with autofix.ci
  - Add CodSpeed benchmarking integration
  - Configure OIDC authentication for Codecov uploads
  - Add OpenSSF Scorecard for supply-chain security monitoring

## 4.0.1

### Patch Changes

- 5c5463b: Add `sideEffects: false` to enable better tree-shaking optimization

## 4.0.0

### Major Changes

- c7a163d: ## Major Performance and API Overhaul

  ### 🚀 Performance Improvements

  - **Replace `qs` dependency with `fast-querystring`**: Significant performance boost for query string serialization with smaller bundle size
  - **Optimized internal implementations**: Improved regex patterns and streamlined parameter handling for better runtime performance
  - **Reduced bundle size**: Elimination of heavy `qs` dependency and related configuration overhead

  ### 💥 Breaking Changes

  #### Removed `configure` API

  - **REMOVED**: `configure()` function and `UrlCatConfiguration` type
  - **REMOVED**: Support for `arrayFormat` options (repeat, comma, brackets, indices)
  - **REMOVED**: Support for `objectFormat.format` options (RFC1738, RFC3986)
  - **IMPACT**: All query parameters now use `fast-querystring`'s default encoding behavior

  #### API Simplification

  - **REMOVED**: 4-parameter overload `urlcat(baseUrl, path, params, config)`
  - **SIMPLIFIED**: Only 3 core overloads remain:
    - `urlcat(baseTemplate, params)`
    - `urlcat(baseUrl, path)`
    - `urlcat(baseUrl, pathTemplate, params)`

  #### Query String Behavior Changes

  - **Spaces**: Now encoded as `%20` instead of `+` (RFC3986 vs RFC1738)
  - **Arrays**: Default serialization only (no custom arrayFormat support)
  - **Objects**: Simplified serialization without format configuration

  ### 🔧 Internal Improvements

  - **Regex optimization**: Simplified path parameter matching from `/:[_A-Za-z]+[_A-Za-z0-9]*/g` to `/:[_A-Za-z]+\w*/g`
  - **Better type safety**: More precise parameter validation and type constraints
  - **Cleaner implementation**: Reduced complexity in `urlcatImpl` and related functions
  - **Enhanced null/undefined filtering**: More efficient parameter cleanup

  ### 📚 Documentation Updates

  - Updated all examples to reflect new API
  - Removed configuration-related documentation
  - Updated installation instructions to prefer `bun`
  - Refreshed build and development workflow documentation

  ### 🛠 Development Experience

  - **Build tool migration**: Full migration from npm to bun for faster development
  - **Updated tooling**: Biome integration for linting and formatting
  - **Simplified scripts**: Streamlined package.json scripts for better DX
