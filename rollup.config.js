import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import esbuild from 'rollup-plugin-esbuild';
import { resolve } from 'path';

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
    typescript({ tsconfig: './tsconfig.json' }),
    esbuild({
      minify: true,
    }),
   ],
  external: ['fs/promises', 'fs', 'path', 'child_process', 'os', 'buffer'],
};
