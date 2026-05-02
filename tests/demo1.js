import { from } from '../dist/cradic.esm.js';

const text = '一个简单的汉字结构拆解测试';
const formats = ['html', 'svg', 'txt', 'typ'];

async function run() {
  for (const fmt of formats) {
    try {
      const filename = `dist/tmp/demo.${fmt}`;
      await from(text).to(fmt).saveAs(filename);
      console.log(`✓ ${fmt.toUpperCase()} -> ${filename}`);
    } catch (err) {
      console.error(`✗ Failed to generate ${fmt.toUpperCase()}:`, err.message);
    }
  }
}

run();
