import { describe, test } from 'vitest'
import { subst } from '../src'

describe('subst benchmarks', () => {
  test('Parameter count scaling', { timeout: 120_000 }, async ({ bench }) => {
    await bench('Empty template', () => {
      subst('', {})
    }).run()

    await bench('Single parameter', () => {
      subst(':id', { id: 42 })
    }).run()

    await bench('Two parameters', () => {
      subst('/:userId/:postId', { userId: 123, postId: 456 })
    }).run()

    await bench('Three parameters (original)', () => {
      subst('/:p/:q/:r', { p: 1, q: 'a', r: false })
    }).run()

    await bench('Five parameters', () => {
      subst('/:a/:b/:c/:d/:e', {
        a: 'first',
        b: 'second',
        c: 'third',
        d: 'fourth',
        e: 'fifth',
      })
    }).run()

    await bench('Ten parameters', () => {
      subst('/:p1/:p2/:p3/:p4/:p5/:p6/:p7/:p8/:p9/:p10', {
        p1: 1,
        p2: 2,
        p3: 3,
        p4: 4,
        p5: 5,
        p6: 6,
        p7: 7,
        p8: 8,
        p9: 9,
        p10: 10,
      })
    }).run()
  })

  test('Different value types', { timeout: 120_000 }, async ({ bench }) => {
    await bench('String values', () => {
      subst('/:firstName/:lastName', {
        firstName: 'John',
        lastName: 'Doe',
      })
    }).run()

    await bench('Number values', () => {
      subst('/:id/:page/:limit', {
        id: 123,
        page: 1,
        limit: 50,
      })
    }).run()

    await bench('Boolean values', () => {
      subst('/:enabled/:verified', {
        enabled: true,
        verified: false,
      })
    }).run()

    await bench('Mixed value types', () => {
      subst('/:name/:count/:active', {
        name: 'test',
        count: 42,
        active: true,
      })
    }).run()
  })

  test('Template patterns', { timeout: 120_000 }, async ({ bench }) => {
    await bench('Parameter at beginning', () => {
      subst(':resource/items', { resource: 'users' })
    }).run()

    await bench('Parameter at end', () => {
      subst('/api/v1/:resource', { resource: 'posts' })
    }).run()

    await bench('Parameters with static segments', () => {
      subst('/users/:userId/posts/:postId/comments', {
        userId: 123,
        postId: 456,
      })
    }).run()

    await bench('Consecutive parameters', () => {
      subst('/:year/:month/:day', {
        year: 2024,
        month: 10,
        day: 30,
      })
    }).run()

    await bench('Long template with many segments', () => {
      subst(
        '/api/:version/org/:orgId/project/:projectId/repo/:repoId/branch/:branchId',
        {
          version: 'v2',
          orgId: 'acme',
          projectId: 'web',
          repoId: 'frontend',
          branchId: 'main',
        },
      )
    }).run()
  })

  test('Real-world patterns', { timeout: 120_000 }, async ({ bench }) => {
    await bench('REST API resource path', () => {
      subst('/api/v1/users/:id', { id: 12_345 })
    }).run()

    await bench('Nested resource path', () => {
      subst('/users/:userId/posts/:postId', {
        userId: 123,
        postId: 456,
      })
    }).run()

    await bench('Deep nesting with IDs', () => {
      subst('/orgs/:orgId/teams/:teamId/members/:memberId', {
        orgId: 'acme',
        teamId: 'engineering',
        memberId: 'john',
      })
    }).run()

    await bench('Date-based path', () => {
      subst('/archive/:year/:month/:day/:slug', {
        year: 2024,
        month: 10,
        day: 30,
        slug: 'article-title',
      })
    }).run()

    await bench('Versioned API endpoint', () => {
      subst('/:version/:resource/:id', {
        version: 'v2',
        resource: 'users',
        id: 789,
      })
    }).run()
  })

  test('Special characters', { timeout: 120_000 }, async ({ bench }) => {
    await bench('Values with spaces', () => {
      subst('/:title', { title: 'hello world' })
    }).run()

    await bench('Values with special chars', () => {
      subst('/:email/:tag', {
        email: 'user@example.com',
        tag: 'important!',
      })
    }).run()

    await bench('Long parameter values', () => {
      subst('/:description', {
        description:
          'This is a very long description that contains many characters',
      })
    }).run()

    await bench('Unicode in values', () => {
      subst('/:name/:emoji', {
        name: '日本語',
        emoji: '🚀',
      })
    }).run()
  })

  test('Template complexity', { timeout: 120_000 }, async ({ bench }) => {
    await bench('Simple single-segment template', () => {
      subst(':id', { id: 42 })
    }).run()

    await bench('Medium complexity template', () => {
      subst('/api/:version/resource/:id', {
        version: 'v1',
        id: 123,
      })
    }).run()

    await bench('Complex multi-level template', () => {
      subst('/:category/:subcategory/:itemId/details/:section', {
        category: 'electronics',
        subcategory: 'laptops',
        itemId: 'mbp-2024',
        section: 'specs',
      })
    }).run()

    await bench('Very deep template (8 levels)', () => {
      subst('/:l1/:l2/:l3/:l4/:l5/:l6/:l7/:l8', {
        l1: 'a',
        l2: 'b',
        l3: 'c',
        l4: 'd',
        l5: 'e',
        l6: 'f',
        l7: 'g',
        l8: 'h',
      })
    }).run()
  })

  test('Parameter name patterns', { timeout: 120_000 }, async ({ bench }) => {
    await bench('Short parameter names', () => {
      subst('/:a/:b/:c', { a: 1, b: 2, c: 3 })
    }).run()

    await bench('Long parameter names', () => {
      subst('/:userId/:articleId/:commentId', {
        userId: 123,
        articleId: 456,
        commentId: 789,
      })
    }).run()

    await bench('CamelCase parameter names', () => {
      subst('/:firstName/:lastName/:emailAddress', {
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john@example.com',
      })
    }).run()

    await bench('Underscore parameter names', () => {
      subst('/:user_id/:post_id/:comment_id', {
        user_id: 1,
        post_id: 2,
        comment_id: 3,
      })
    }).run()
  })
})
