import { defineConfig } from 'tsdown'

export default defineConfig({
  platform: 'neutral',
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  exports: true,
})
