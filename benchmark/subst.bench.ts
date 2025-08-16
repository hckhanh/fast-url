import { bench, describe } from 'vitest'
import { subst } from '../src'

describe('subst benchmarks', () => {
  bench(
    'Substitutes all params present in the object passed',
    () => {
      subst('/:p/:q/:r', { p: 1, q: 'a', r: false })
    },
    { iterations: 100000 },
  )
})
