import { from } from '../dist/cradic.esm.js';
import { DEFAULT_PARAMS, OUTPUT_TYPES } from '../dist/cradic.esm.js';

const html = await from('主测试乢汉字').to('html').toString();
const svg = await from('主测试乢').to('svg').toString();
const text = await from('主测试乢汉字').to('text').toString();
const typ = await from('主测试乢').to('typ').toString();

console.log('=== HTML ===\n' + html + '\n');
console.log('=== SVG ===\n' + svg + '\n');
console.log('=== Text ===\n' + text + '\n');
console.log('=== Typst ===\n' + typ + '\n');
console.log('=== DEFAULT_PARAMS ===');
console.log(JSON.stringify(DEFAULT_PARAMS, null, 2));
console.log('\n=== OUTPUT_TYPES ===');
console.log(OUTPUT_TYPES);