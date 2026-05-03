import { defineConfig } from 'vite';
import { resolve } from 'path';
import terser from 'terser';

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
        inlineDynamicImports: true,
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
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