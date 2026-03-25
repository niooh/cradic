import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Cradic',
      fileName: (format) => `cradic.browser.${format === 'es' ? 'js' : 'umd.js'}`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});