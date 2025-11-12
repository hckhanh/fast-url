---
"fast-url": patch
---

Performance optimizations for path and parameter handling utilities in `src/index.ts`. This release focuses on reducing regex recompilation overhead, optimizing string manipulation for path joining, and improving parameter filtering performance.

**Performance Optimizations:**

- **Pre-compiled regex**: Extracted the path parameter regex (`PATH_PARAM_REGEX`) to module scope to avoid recompiling it on every `path()` call, improving efficiency for path template processing.
- **Optimized `join()` function**: Rewrote to use direct string indexing (`part1[len1 - 1]`, `part2[0]`) instead of `endsWith`/`startsWith` methods, added fast paths for empty strings, and optimized for the most common URL joining scenario where both parts have separators. This reduces unnecessary string slicing and improves speed.
- **Optimized `removeNullOrUndef()` function**: Improved performance by checking for null/undefined values before allocating a new object, and using direct property iteration instead of `Object.entries`/`Object.fromEntries`. This results in faster execution and less memory usage, especially when no filtering is needed.

**Parameter Validation Improvements:**

- Enhanced `validatePathParam()` to check for empty strings in path parameters, ensuring that string path parameters cannot be empty or whitespace-only values.
- Improved code readability by adding blank lines between logical blocks in validation logic.
