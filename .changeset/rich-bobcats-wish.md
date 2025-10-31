---
"fast-url": major
---

This pull request introduces a major modernization and optimization of the querystring module, aligning it with the latest Node.js implementation while improving performance, expanding test coverage, and enhancing developer tooling. The update brings a faster, more consistent, and fully cross-environment compatible querystring implementation, alongside improved developer experience and comprehensive documentation.

**Querystring Module Modernization & Optimization**
- Replaced the querystring implementation in `src/querystring/node.ts` with a highly optimized version based on the latest Node.js source, featuring direct constant access and inlined logic for `encodeString`, resulting in a 5-20% performance improvement and matching or exceeding the legacy implementation.
- Updated the `stringify` function in `src/querystring/stringify.ts` to utilize the new `encodeString` and improved primitive handling for correct and efficient query string serialization.
- Refactored imports in `src/index.ts` to use the new querystring path, ensuring all code uses the updated implementation. [[1]](diffhunk://#diff-a2a171449d862fe29692ce031981047d7ab755ae7f84c707aef80701b3ea0c80L1-R1) [[2]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R26)

**Testing & Benchmarking Enhancements**
- Expanded the test suite to 95 tests (including new tests for `isHexTable`) and introduced comprehensive benchmarks comparing old, new, and optimized implementations, with all tests passing and benchmarks confirming negligible real-world performance differences. [[1]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R26) [[2]](diffhunk://#diff-b1255cb5753ee281e39df01d1270d6b0bdad8fa4dd0476d53e278280f4ffa8d1R1-R119) [[3]](diffhunk://#diff-059db6f886c62bfbe786f10ebcd4dace1c268a8df5f97249ae234e7a0e780202R1-R169)

**Developer Experience & Tooling Improvements**
- Added new linting rules and enabled the Biome "nursery" ruleset in `biome.json` for improved code consistency and style enforcement. [[1]](diffhunk://#diff-2bc8a1f5e9380d5a187a4e90f11b4dd36c3abad6aea44c84be354a4f44cdec55L24-R42) [[2]](diffhunk://#diff-2bc8a1f5e9380d5a187a4e90f11b4dd36c3abad6aea44c84be354a4f44cdec55R52-R58) [[3]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R26)
- Added `@types/node` to `devDependencies` for improved type support. [[1]](diffhunk://#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519L39-R44) [[2]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R26)
- Updated `vitest.config.mts` to support path aliasing for cleaner imports using `@`.

**Documentation & Security**
- Added detailed documentation and summary files (`QUERYSTRING_UPDATE_SUMMARY.md`, `OPTIMIZATION_GUIDE.md`) explaining the update, performance comparisons, and optimization techniques. [[1]](diffhunk://#diff-b1255cb5753ee281e39df01d1270d6b0bdad8fa4dd0476d53e278280f4ffa8d1R1-R119) [[2]](diffhunk://#diff-059db6f886c62bfbe786f10ebcd4dace1c268a8df5f97249ae234e7a0e780202R1-R169) [[3]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R26)
- Added a `SECURITY.md` policy outlining supported versions, vulnerability reporting, and best practices.
- Updated the README to clarify Unicode handling capabilities. [[1]](diffhunk://#diff-b335630551682c19a781afebcf4d07bf978fb1f8ac04c6bf87428ed5106870f5R19) [[2]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R26)

Overall, this update modernizes and optimizes the querystring module, improves performance, expands test coverage, and enhances developer tooling, with no breaking changes and full cross-environment compatibility.
