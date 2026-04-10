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
    await from('测试').to('text').saveAs('tests/test-output.txt');
    const content = fs.readFileSync('tests/test-output.txt', 'utf-8');
    assert(content === '测试');
    fs.unlinkSync('tests/test-output.txt');
  });

  console.log('\nAll tests passed!');
}

run();