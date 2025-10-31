import path from 'node:path'
import url from 'node:url'
import codspeed from '@codspeed/vitest-plugin'
import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
} from 'vitest/config'

export default defineConfig({
  plugins: [codspeed()],
  test: {
    exclude: [...defaultExclude, 'tsdown.config.*'],
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, 'tsdown.config.*'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        './src',
      ),
    },
  },
})
