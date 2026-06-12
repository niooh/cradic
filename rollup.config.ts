import json from '@rollup/plugin-json';
import oxc from 'rollup-plugin-oxc';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: 'cradic.cjs',
      exports: 'named',
      inlineDynamicImports: true,
    },
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: 'cradic.esm.js',
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    json(),
    oxc({
      minify: true,
    }),
   ],
  external: ['fs/promises', 'fs', 'path', 'child_process', 'os', 'buffer'],
};
