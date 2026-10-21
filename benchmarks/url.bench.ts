import { afterAll, expect, test } from 'vitest'
import { createUrl, join, query, subst } from '../src/index.ts'

const batchSize = 100
const queryInputs = Array.from({ length: batchSize }, (_, i) => ({
  search: `cà phê ${i}`,
  page: i,
  tags: ['typescript', 'url builder'],
  active: true,
}))
const pathInputs = Array.from({ length: batchSize }, (_, i) => ({
  id: i,
  name: `user ${i}`,
  page: i + 1,
  missing: null,
}))
const largeInput = Object.fromEntries(
  Array.from({ length: 50 }, (_, i) => [`key${i}`, `value ${i}`]),
)
let consumed = 0

test('public URL workloads', { timeout: 120_000 }, async ({ bench }) => {
  await bench('join base and path - 100 calls', () => {
    for (let i = 0; i < batchSize; i++) {
      consumed += join('https://api.example.com/', '/', '/users').length
    }
  }).run()

  await bench('static URL - 100 calls', () => {
    for (let i = 0; i < batchSize; i++) {
      consumed += createUrl('https://api.example.com/', '/users').length
    }
  }).run()

  await bench('query-only URL - 100 calls', () => {
    for (const input of queryInputs) {
      consumed += createUrl('https://api.example.com/users', input).length
    }
  }).run()

  await bench('path and query URL - 100 calls', () => {
    for (const input of pathInputs) {
      consumed += createUrl(
        'https://api.example.com',
        '/users/:id/:name',
        input,
      ).length
    }
  }).run()

  await bench('substitute two path parameters - 100 calls', () => {
    for (const input of pathInputs) {
      consumed += subst('/users/:id/:name', input).length
    }
  }).run()

  await bench('substitute static path - 100 calls', () => {
    for (const input of pathInputs) {
      consumed += subst('/users', input).length
    }
  }).run()

  await bench('mixed query values - 100 calls', () => {
    for (const input of queryInputs) {
      consumed += query(input).length
    }
  }).run()

  await bench('50 query parameters - 100 calls', () => {
    for (let i = 0; i < batchSize; i++) {
      consumed += query(largeInput).length
    }
  }).run()
})

afterAll(() => {
  expect(consumed).toBeGreaterThan(0)
})
