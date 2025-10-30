---
"fast-url": major
---

This pull request introduces a major update to the querystring module, bringing it in line with the latest Node.js implementation while optimizing for both browser and server environments. The update focuses on performance improvements, expanded test coverage, enhanced benchmarks, and improved developer tooling, all while maintaining backward compatibility and cross-environment support.

**Querystring Module Modernization & Optimization**
- Replaced the querystring implementation in `src/querystring/node.ts` with a highly optimized version based on the latest Node.js source, featuring direct constant access and inlined logic for `encodeString`. This results in a 5-20% performance improvement over the previous version and matches or exceeds the legacy implementation. [[1]](diffhunk://#diff-0453925e3cc7ea1788c0b323ed15f500ac460437a2b1d6d7b913579f33ea274fR1-R94) [[2]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R24)
- Updated the `stringify` function in `src/querystring/stringify.ts` to use the new `encodeString` and improved primitive handling, ensuring correct and efficient query string serialization. [[1]](diffhunk://#diff-fb1a6783ea8dfac582e255a4704987ee3074725b323ab15e2c31d045374e301cR1-R58) [[2]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R24)
- Refactored imports in `src/index.ts` to use the new querystring path, ensuring all code uses the updated implementation. [[1]](diffhunk://#diff-a2a171449d862fe29692ce031981047d7ab755ae7f84c707aef80701b3ea0c80L1-R1) [[2]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R24)

**Testing & Benchmarking Enhancements**
- Expanded the test suite to 95 tests, including new tests for additional functionality (such as `isHexTable`), and introduced comprehensive benchmarks comparing old, new, and optimized implementations. All tests pass, and benchmarks confirm negligible real-world performance differences. [[1]](diffhunk://#diff-b1255cb5753ee281e39df01d1270d6b0bdad8fa4dd0476d53e278280f4ffa8d1R1-R119) [[2]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R24) [[3]](diffhunk://#diff-059db6f886c62bfbe786f10ebcd4dace1c268a8df5f97249ae234e7a0e780202R1-R169)

**Developer Experience & Tooling Improvements**
- Added new linting rules and enabled the Biome "nursery" ruleset in `biome.json` for improved code consistency and style enforcement. [[1]](diffhunk://#diff-2bc8a1f5e9380d5a187a4e90f11b4dd36c3abad6aea44c84be354a4f44cdec55L24-R42) [[2]](diffhunk://#diff-2bc8a1f5e9380d5a187a4e90f11b4dd36c3abad6aea44c84be354a4f44cdec55R52-R58) [[3]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R24)
- Added `@types/node` to `devDependencies` for improved type support. [[1]](diffhunk://#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519L39-R44) [[2]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R24)
- Updated `vitest.config.mts` to support path aliasing for cleaner imports using `@`. [[1]](diffhunk://#diff-2988e37334fe90f690078d3a20744a1aaae079bd9bb1ce557a3add080dd89141R1-R2) [[2]](diffhunk://#diff-2988e37334fe90f690078d3a20744a1aaae079bd9bb1ce557a3add080dd89141R18-R25) [[3]](diffhunk://#diff-14e40eac46f8bc6dc4729aa2106d6980ef015e09358a51d4649e6243ff738357R1-R24)

**Documentation & Guidance**
- Added detailed documentation and summary files (`QUERYSTRING_UPDATE_SUMMARY.md`, `OPTIMIZATION_GUIDE.md`) to explain the update, performance comparisons, and optimization techniques used. [[1]](diffhunk://#diff-b1255cb5753ee281e39df01d1270d6b0bdad8fa4dd0476d53e278280f4ffa8d1R1-R119) [[2]](diffhunk://#diff-059db6f886c62bfbe786f10ebcd4dace1c268a8df5f97249ae234e7a0e780202R1-R169)

**Minor Enhancements**
- Updated the README to clarify Unicode handling capabilities.

Overall, this update modernizes and optimizes the querystring module, improves performance, expands test coverage, and enhances developer tooling, with no breaking changes and full cross-environment compatibility.
