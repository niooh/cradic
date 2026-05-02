import { from } from '../dist/cradic.esm.js';
import { strict as assert } from 'assert';

async function test(name, fn) {
  try {
    await fn();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}`);
    console.error(e.message);
    process.exit(1);
  }
}

async function run() {
  // 基础测试
  await test('HTML: basic output', async () => {
    const html = await from('汉字').to('html').toString();
    assert(html.includes('<!DOCTYPE html>'));
    assert(html.includes('<div id="box">'));
  });

  await test('HTML: split chars wrapped', async () => {
    const html = await from('汉字').to('html').toString();
    assert(html.includes('class="split-char v-split"'));
    assert(html.includes('class="split-char h-split"'));
    assert(html.includes('原字: 汉'));
    assert(html.includes('原字: 字'));
  });

  await test('SVG: basic output', async () => {
    const svg = await from('汉').to('svg').toString();
    assert(svg.startsWith('<svg'));
    assert(svg.includes('xmlns="http://www.w3.org/2000/svg"'));
  });


  await test('Text: split replacement', async () => {
    const text = await from('汉字').to('text').toString();
    assert(text === '氵又宀子');
  });

  await test('Text: no split passthrough', async () => {
    const text = await from('氵又').to('text').toString();
    assert(text === '氵又');
  });

  await test('Typst: basic output', async () => {
    const typ = await from('汉').to('typ').toString();
    assert(typ.includes('#set page'));
    assert(typ.includes('#let params'));
    assert(typ.includes('char-cell'));
  });

  await test('Typst: grid content', async () => {
    const typ = await from('汉字').to('typ').toString();
    assert(typ.includes('h-split-map'));
    assert(typ.includes('v-split-map'));
  });

  await test('Custom params: boxWidth', async () => {
    const html = await from('汉').to('html').with({ boxWidth: 100 }).toString();
    assert(html.includes('width: 100px'));
  });

  await test('Default output is html', async () => {
    const html = await from('汉').toString();
    assert(html.includes('<!DOCTYPE html>'));
  });

  await test('saveAs: write file', async () => {
    const fs = await import('fs');
    await from('测试').to('text').saveAs('dist/tmp/test-output.txt');
    const content = fs.readFileSync('dist/tmp/test-output.txt', 'utf-8');
    assert(content === '氵则讠式');
    fs.unlinkSync('dist/tmp/test-output.txt');
  });

  // mode 参数测试
  await test('Mode: h = only horizontal split', async () => {
    const text = await from('汉字').to('text').with({ mode: 'h' }).toString();
    assert(text === '氵又字');
  });

  await test('Mode: v = only vertical split', async () => {
    const text = await from('汉字').to('text').with({ mode: 'v' }).toString();
    assert(text === '汉宀子');
  });

  await test('Mode: b = both h+v split (default)', async () => {
    const text = await from('汉字').to('text').with({ mode: 'b' }).toString();
    assert(text === '氵又宀子');
  });

  console.log('\nAll tests passed!');
}

run();
