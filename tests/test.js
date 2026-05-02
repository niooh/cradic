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
    const html = await from('主乢').to('html').toString();
    assert(html.includes('class="split-char v-split"'));
    assert(html.includes('class="split-char h-split"'));
    assert(html.includes('原字: 主'));
    assert(html.includes('原字: 乢'));
  });

  await test('SVG: basic output', async () => {
    const svg = await from('汉').to('svg').toString();
    assert(svg.startsWith('<svg'));
    assert(svg.includes('xmlns="http://www.w3.org/2000/svg"'));
  });

  await test('SVG: split chars', async () => {
    const svg = await from('主').to('svg').toString();
    assert(svg.includes('亠'));
    assert(svg.includes('土'));
  });

  await test('Text: split replacement', async () => {
    const text = await from('主乢').to('text').toString();
    assert(text === '亠土山乚');
  });

  await test('Text: no split passthrough', async () => {
    const text = await from('汉').to('text').toString();
    assert(text === '汉');
  });

  await test('Typst: basic output', async () => {
    const typ = await from('汉').to('typ').toString();
    assert(typ.includes('#set page'));
    assert(typ.includes('#let params'));
    assert(typ.includes('char-cell'));
  });

  await test('Typst: grid content', async () => {
    const typ = await from('主乢').to('typ').toString();
    assert(typ.includes('h-split-map'));
    assert(typ.includes('v-split-map'));
  });

  await test('Custom params: boxWidth', async () => {
    const html = await from('汉').to('html').with({ boxWidth: 100 }).toString();
    assert(html.includes('width: 100px'));
  });

  await test('Chaining: returns instance for chaining', async () => {
    const instance = from('汉').to('html').with({ boxWidth: 80 });
    assert(instance !== null);
  });

  await test('Default output is html', async () => {
    const html = await from('汉').toString();
    assert(html.includes('<!DOCTYPE html>'));
  });

  await test('saveAs: writes file', async () => {
    const fs = await import('fs');
    await from('测试').to('text').saveAs('dist/tmp/test-output.txt');
    const content = fs.readFileSync('dist/tmp/test-output.txt', 'utf-8');
    assert(content === '测试');
    fs.unlinkSync('dist/tmp/test-output.txt');
  });

  // mode 参数测试
  await test('Mode: h = only horizontal split', async () => {
    const text = await from('主乢').to('text').with({ mode: 'h' }).toString();
    assert(text === '主山乚');
  });

  await test('Mode: v = only vertical split', async () => {
    const text = await from('主乢').to('text').with({ mode: 'v' }).toString();
    assert(text === '亠土乢');
  });

  await test('Mode: b = both h+v split (default)', async () => {
    const text = await from('主乢').to('text').with({ mode: 'b' }).toString();
    assert(text === '亠土山乚');
  });

/*
  await test('Mode: h → HTML only render h-split', async () => {
    const html = await from('主乢').to('html').with({ mode: 'h' }).toString();
    assert(html.includes('h-split'));
    assert(!html.includes('v-split'));
  });

  await test('Mode: v → HTML only render v-split', async () => {
    const html = await from('主乢').to('html').with({ mode: 'v' }).toString();
    assert(html.includes('v-split'));
    assert(!html.includes('h-split'));
  });

  await test('Mode: h → SVG only process h-split', async () => {
    const svg = await from('主乢').to('svg').with({ mode: 'h' }).toString();
    assert(svg.includes('山') && svg.includes('乚'));
    assert(svg.includes('主'));
  });

  await test('Mode: v → SVG only process v-split', async () => {
    const svg = await from('主乢').to('svg').with({ mode: 'v' }).toString();
    assert(svg.includes('亠') && svg.includes('土'));
    assert(svg.includes('乢'));
  });

  await test('Mode: works in Typst with filter', async () => {
    const typH = await from('主乢').to('typ').with({ mode: 'h' }).toString();
    const typV = await from('主乢').to('typ').with({ mode: 'v' }).toString();
    assert(typH.includes('h-split-map'));
    assert(typV.includes('v-split-map'));
  });
*/

  console.log('\nAll tests passed!');
}

run();
