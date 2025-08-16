import { bench, describe } from 'vitest'
import { join } from '../src'

describe('join benchmarks', () => {
  bench(
    'Uses exactly one separator even if the first part ends with it and the second part starts with it',
    () => {
      join('first,', ',', ',second')
    },
    { iterations: 10000 },
  )
})
