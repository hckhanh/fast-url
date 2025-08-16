import { bench, describe } from 'vitest'
import urlcat from '../src'

describe('urlcat benchmarks', () => {
  bench(
    "Can handle complex URL's",
    () => {
      urlcat('http://example.com/', '/users/:userId/posts/:postId/comments', {
        userId: 123,
        postId: 987,
        authorId: 456,
        limit: 10,
        offset: 120,
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
