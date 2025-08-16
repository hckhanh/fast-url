import { bench, describe } from 'vitest'
import { query } from '../src'

describe('query benchmarks', () => {
  bench(
    'Can handle multiple params',
    () => {
      query({
        frappucino: 'muffin',
        goat: 'scone',
        pond: 'moose',
        foo: ['bar', 'baz', 'bal'],
        bool: true,
        bigIntKey: BigInt(100),
        numberKey: 256,
      })
    },
    { iterations: 10000 },
  )
})
