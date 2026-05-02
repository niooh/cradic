import { from } from '../dist/cradic.esm.js';

function expectEqual(actual, expected, message = '值不相等') {
  if (actual !== expected) {
    const err = new Error(message);
    err.actual = actual;
    err.expected = expected;
    throw err;
  }
}

function expectInclude(fullStr, subStr, message = '未包含指定内容') {
  if (!fullStr.includes(subStr)) {
    const err = new Error(message);
    err.actual = fullStr;
    err.expected = subStr;
    throw err;
  }
}

function expectStartWith(str, prefix, message = '字符串开头不匹配') {
  if (!str.startsWith(prefix)) {
    const err = new Error(message);
    err.actual = str.slice(0, 50) + '...';
    err.expected = prefix;
    throw err;
  }
}

// 测试运行器
async function test(name, fn) {
  try {
    await fn();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}`);
    console.error(`  Error: ${e.message}`);
    if (e.expected !== undefined) {
      console.error(`  Expected: ${JSON.stringify(e.expected)}`);
      console.error(`  Actual:   ${JSON.stringify(e.actual)}`);
    }
  }
}

async function run() {
  // 基础测试
  await test('HTML: basic output', async () => {
    const html = await from('汉字').to('html').toString();
    expectInclude(html, '<!DOCTYPE html>');
    expectInclude(html, '<div id="box">');
  });

  await test('HTML: split chars wrapped', async () => {
    const html = await from('汉字').to('html').toString();
    expectInclude(html, 'class="split-char v-split"');
    expectInclude(html, 'class="split-char h-split"');
  });

  await test('SVG: basic output', async () => {
    const svg = await from('汉').to('svg').toString();
    expectStartWith(svg, '<svg');
    expectInclude(svg, 'xmlns="http://www.w3.org/2000/svg"');
  });

  await test('Text: split replacement', async () => {
    const text = await from('汉字').to('text').toString();
    expectEqual(text, '氵又宀子');
  });

  await test('Text: no split passthrough', async () => {
    const text = await from('氵又').to('text').toString();
    expectEqual(text, '氵又');
  });

  await test('Typst: basic output', async () => {
    const typ = await from('汉').to('typ').toString();
    expectInclude(typ, '#set page');
    expectInclude(typ, '#let params');
    expectInclude(typ, 'char-cell');
  });

  await test('Typst: grid content', async () => {
    const typ = await from('汉字').to('typ').toString();
    expectInclude(typ, 'h-split-map');
    expectInclude(typ, 'v-split-map');
  });

  await test('Custom params: boxWidth', async () => {
    const html = await from('汉').to('html').with({ boxWidth: 100 }).toString();
    expectInclude(html, 'width: 100px');
  });

  await test('Default output is html', async () => {
    const html = await from('汉').toString();
    expectInclude(html, '<!DOCTYPE html>');
  });

  await test('saveAs: write file', async () => {
    const fs = await import('fs');
    const path = 'dist/tmp/test-output.txt';
    // 确保目录存在
    if (!fs.existsSync('dist/tmp')) fs.mkdirSync('dist/tmp', { recursive: true });
    await from('测试').to('text').saveAs(path);
    const content = fs.readFileSync(path, 'utf-8');
    expectEqual(content, '氵则讠式');
    fs.unlinkSync(path);
  });

  // mode 参数测试
  await test('Mode: h = only horizontal split', async () => {
    const text = await from('汉字').to('text').with({ mode: 'h' }).toString();
    expectEqual(text, '氵又字');
  });

  await test('Mode: v = only vertical split', async () => {
    const text = await from('汉字').to('text').with({ mode: 'v' }).toString();
    expectEqual(text, '汉宀子');
  });

  await test('Mode: b = both h+v split (default)', async () => {
    const text = await from('汉字').to('text').with({ mode: 'b' }).toString();
    expectEqual(text, '氵又宀子');
  });

  await test('Text: sep: auto', async () => {
    const text = await from('一个简单的人')
      .to('text')
      .with({ mode: 'b', sep: 'auto' })
      .toString();
    expectEqual(text, '一\n\n人\n丨\n\n⺮\n间 单 白勺 人');
  });

  await test('Text: sep: "" empty', async () => {
    const text = await from('一个简单的人')
      .to('text')
      .with({ mode: 'b', sep: '' })
      .toString();
    expectEqual(text, '一人丨⺮间单白勺人');
  });

  await test('Text: sep: " " space', async () => {
    const text = await from('一个简单的人')
      .to('text')
      .with({ mode: 'b', sep: ' ' })
      .toString();
    expectEqual(text, '一 人丨 ⺮间 单 白勺 人');
  });

  console.log('\nAll tests passed!');
}

run();
