/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['./__tests__/**'],
    alias: {
      '@/components/*': 'components/*',
      '@/utils/*': 'utils/*',
      '@/interfaces/*': 'interfaces/*',
      '@/icons/*': 'icons/*'
    }
  },
  base: '/',
  resolve: {
    alias: {
      '@/components/*': 'components/*',
      '@/utils/*': 'utils/*',
      '@/interfaces/*': 'interfaces/*',
      '@/icons/*': 'icons/*'
    }
  }
})
