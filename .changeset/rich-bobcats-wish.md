---
"fast-url": major
---

This pull request introduces a major update to the querystring module, aligning it with the latest Node.js implementation while optimizing for both browser and server environments. The update includes a highly optimized encoding function, enhanced test coverage, improved benchmarks, and new linting rules. The most significant changes are grouped below:

**Querystring Module Update & Optimization**

* Replaced the querystring implementation in `src/querystring/node.ts` with an optimized version based on the latest Node.js source, featuring direct constant access and inlined logic for `encodeString`, resulting in 5-20% performance improvement over the previous version and matching or exceeding the legacy implementation. [[1]](diffhunk://#diff-059db6f886c62bfbe786f10ebcd4dace1c268a8df5f97249ae234e7a0e780202R1-R169) [[2]](diffhunk://#diff-0453925e3cc7ea1788c0b323ed15f500ac460437a2b1d6d7b913579f33ea274fR1-R101)
* Updated the `stringify` function in `src/querystring/stringify.ts` to use the new `encodeString` and improved primitive handling, ensuring correct and efficient query string serialization.
* Refactored imports in `src/index.ts` to use the new querystring path.

**Testing & Benchmarking Enhancements**

* Expanded the test suite to 95 tests and introduced comprehensive benchmarks comparing old, new, and optimized implementations. All tests pass and benchmarks confirm negligible real-world performance differences.

**Developer Experience & Tooling**

* Added new linting rules and enabled the Biome "nursery" ruleset in `biome.json` for improved code consistency and style enforcement. [[1]](diffhunk://#diff-2bc8a1f5e9380d5a187a4e90f11b4dd36c3abad6aea44c84be354a4f44cdec55L24-R42) [[2]](diffhunk://#diff-2bc8a1f5e9380d5a187a4e90f11b4dd36c3abad6aea44c84be354a4f44cdec55R52-R58)
* Added `@types/node` to `devDependencies` for improved type support.
* Updated `vitest.config.mts` to support path aliasing for cleaner imports using `@`. [[1]](diffhunk://#diff-2988e37334fe90f690078d3a20744a1aaae079bd9bb1ce557a3add080dd89141R1) [[2]](diffhunk://#diff-2988e37334fe90f690078d3a20744a1aaae079bd9bb1ce557a3add080dd89141R17-R21)

**Summary:**  
This update modernizes and optimizes the querystring module, bringing it in line with Node.js best practices, improving performance, expanding test coverage, and enhancing developer tooling—all with no breaking changes and full cross-environment compatibility.
