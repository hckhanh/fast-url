import path from 'node:path'
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
      '@': path.resolve(__dirname, './src'),
    },
  },
})
