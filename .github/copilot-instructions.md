# Copilot Coding Agent Instructions

## Project Overview

**fast-url** is a high-performance TypeScript/JavaScript library for building URLs safely and conveniently. It's a fork of [urlcat](https://github.com/balazsbotond/urlcat) with a focus on performance and simplicity.

### Key Features
- Lightweight with minimal dependencies (only fast-querystring)
- Type-safe with full TypeScript definitions
- URL-safe with automatic parameter escaping
- Unicode-aware using `codePointAt` for proper Unicode handling
- Multiple ways to build URLs for different use cases

### Tech Stack
- **Language**: TypeScript
- **Runtime**: Node.js (with support for Bun and Deno)
- **Build Tool**: tsdown (powered by rolldown)
- **Testing**: Vitest with coverage reporting
- **Linting/Formatting**: Biome
- **Benchmarking**: CodSpeed
- **Package Manager**: Bun (but npm/pnpm also work)

## Building the Project

### Prerequisites
- Node.js (reasonably recent version)
- Bun installed (recommended) or npm

### Installation
```bash
# Clone the repository
git clone git@github.com:hckhanh/fast-url.git
cd fast-url

# Install dependencies
bun install
# OR
npm install
```

### Build Commands
```bash
# Build the library (outputs to dist/)
bun run build
# OR
npm run build
```

The build process uses tsdown to compile TypeScript and bundle the library. Output appears in the `dist/` directory.

## Running Tests

### Test Commands
```bash
# Run all tests
bun test
# OR
npm test

# Run tests with coverage
bun run test --coverage

# Run benchmarks
bun run bench
# OR
npm run bench
```

### Test Structure
- Tests are located in the `test/` directory
- Test files follow the pattern `*.test.ts`
- Tests use Vitest as the test runner
- All new features should have corresponding tests in the `test/` directory

### Test Coverage Requirements
- The project uses Codecov for coverage reporting
- Tests should maintain high coverage standards
- Coverage reports are uploaded automatically in CI

## Code Style and Formatting

### Biome Configuration
The project uses Biome for linting and formatting with the following standards:
- **Indent**: 2 spaces
- **Quotes**: Single quotes for JavaScript/TypeScript
- **Semicolons**: As needed (ASNeeded style)
- **Arrow Parentheses**: Always
- **Import Organization**: Automatic via Biome

### Format and Lint Commands
```bash
# Check and auto-fix formatting/linting issues
bun run format
# OR
npm run format

# Check without auto-fixing
bun biome check
# OR
npx biome check
```

### Important Rules
- **No unused imports**: Warnings with safe auto-fix
- **Use consistent type definitions**: Warnings with safe auto-fix
- **Use Node.js import protocol**: Warnings with safe auto-fix
- **Template literals**: Off (string concatenation allowed)

### Before Committing
Always run `bun run format` or `npm run format` before committing to ensure code style compliance.

## Dependencies

### Production Dependencies
- **fast-querystring**: The only production dependency, used for query string building

### Development Dependencies
- **@biomejs/biome**: Code formatting and linting
- **@changesets/cli**: Release management
- **@codspeed/vitest-plugin**: Performance benchmarking
- **@vitest/coverage-v8**: Test coverage reporting
- **knip**: Dead code detection
- **syncpack**: Keep package versions in sync
- **tsdown**: Build tool
- **typescript**: Type checking and compilation
- **vitest**: Testing framework

### Adding New Dependencies
- Keep the dependency footprint minimal
- Prefer well-maintained, popular libraries
- Ensure TypeScript type definitions are available
- Run tests after adding dependencies to ensure compatibility

## Project Structure

```
fast-url/
├── .github/          # GitHub configuration and workflows
├── benchmark/        # Performance benchmark tests
├── dist/            # Build output (gitignored)
├── docs/            # Documentation assets
├── src/             # Source code
│   ├── index.ts     # Main entry point
│   └── querystring/ # Query string utilities
├── test/            # Test files
├── tools/           # Build and development tools
└── web/             # Website/demo workspace
```

## CI/CD and Quality Gates

### GitHub Actions Workflows
1. **Test Workflow** (`test.yml`):
   - Runs Knip for dead code detection
   - Runs Deno type checking
   - Runs unit tests with coverage
   - Runs benchmarks with CodSpeed
   - Uploads coverage to Codecov

2. **CodeQL** (`codeql.yml`):
   - Security analysis for JavaScript/TypeScript

3. **Release** (`release.yml`):
   - Automated releases via changesets

4. **Scorecards** (`scorecards.yml`):
   - Security best practices scoring

### Quality Standards
- All tests must pass
- Code coverage should be maintained or improved
- No Biome linting errors
- No unused code (verified by Knip)
- Security scanning via CodeQL and Scorecards
- Aikido Safe Chain enabled for dependency security

### Pull Request Requirements
- PRs must pass all CI checks
- Tests should be added for new features
- Code should be formatted with Biome
- Coverage should not decrease
- Security scans must pass

## Documentation

### Updating Documentation
- Update `README.md` when adding new features or changing APIs
- Add JSDoc comments to exported functions
- Update `CHANGELOG.md` via changesets (run `changeset` command)
- Keep inline code examples up to date

### Documentation Files
- `README.md`: Main project documentation and usage examples
- `CONTRIBUTING.md`: Contribution guidelines
- `OPTIMIZATION_GUIDE.md`: Performance optimization notes
- `QUERYSTRING_UPDATE_SUMMARY.md`: Query string implementation details
- `CODE_OF_CONDUCT.md`: Code of conduct
- `SECURITY.md`: Security policy

## Restrictions and Guidelines

### Do NOT
- **Remove or modify tests** unless they are broken or outdated
- **Add unnecessary dependencies** - keep the library lightweight
- **Break backward compatibility** without major version bump
- **Modify files in `dist/`** - these are build artifacts
- **Commit build artifacts** - `dist/` is gitignored
- **Change core algorithms** without benchmarking performance impact
- **Remove security features** like parameter escaping

### Do
- **Write minimal, focused changes**
- **Add tests for new features**
- **Run format and tests before committing**
- **Update documentation for API changes**
- **Use TypeScript for type safety**
- **Maintain performance characteristics**
- **Follow existing code patterns and conventions**

## Performance Considerations

This library is focused on performance. When making changes:
- Run benchmarks before and after changes (`bun run bench`)
- Avoid unnecessary allocations
- Consider the impact on bundle size
- Test with large inputs when relevant
- Use efficient algorithms and data structures

The project uses CodSpeed for continuous performance monitoring in CI.

## Support and Contact

- **Issues**: https://github.com/hckhanh/fast-url/issues
- **Email**: hi@khanh.id
- **Homepage**: https://fast-url.khanh.id

## Additional Resources

- [urlcat (original library)](https://github.com/balazsbotond/urlcat)
- [Vitest Documentation](https://vitest.dev/)
- [Biome Documentation](https://biomejs.dev/)
- [tsdown Documentation](https://tsdown.deno.dev/)

# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `bun x ultracite fix`
- **Check for issues**: `bun x ultracite check`
- **Diagnose setup**: `bun x ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**
- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `bun x ultracite fix` before committing to ensure compliance.
