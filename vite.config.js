import { defineConfig } from 'vite'

export default defineConfig({
  base: '/qr-code-generator/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
