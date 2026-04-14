import { from } from '../dist/cradic.esm.js';
import { DEFAULT_PARAMS, OUTPUT_TYPES } from '../dist/cradic.esm.js';
import { readFileSync } from 'fs';

await from('主测试乢').to('html').saveAs('dist/tmp/demo.html');
await from('主测试乢').to('svg').saveAs('dist/tmp/demo.svg');
await from('主测试乢汉字').to('text').saveAs('dist/tmp/demo.txt');
await from('主测试乢').to('typ').saveAs('dist/tmp/demo.typ');

const html = readFileSync('dist/tmp/demo.html', 'utf-8');
const svg = readFileSync('dist/tmp/demo.svg', 'utf-8');
const text = readFileSync('dist/tmp/demo.txt', 'utf-8');
const typ = readFileSync('dist/tmp/demo.typ', 'utf-8');

console.log('=== HTML ===\n' + html + '\n');
console.log('=== SVG ===\n' + svg + '\n');
console.log('=== Text ===\n' + text + '\n');
console.log('=== Typst ===\n' + typ + '\n');
console.log('=== DEFAULT_PARAMS ===');
console.log(JSON.stringify(DEFAULT_PARAMS, null, 2));
console.log('\n=== OUTPUT_TYPES ===');
console.log(OUTPUT_TYPES);