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
        codeSplitting: false // vite8 config
      },
    },
    minify: 'oxc',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      './node/binary': resolve(__dirname, './src/node/binary.stub.ts'),
      './node/fs': resolve(__dirname, './src/node/fs.stub.ts'),
    },
  },
  define: {
    'process.env.BROWSER': 'true',
  },
});