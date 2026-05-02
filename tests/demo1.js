import { from } from '../dist/cradic.esm.js';

const text = '主测试乢汉字乣拆分乨演示罢了';
const formats = ['html', 'svg', 'txt', 'typ'];

async function run() {
  for (const fmt of formats) {
    try {
      const filename = `dist/tmp/demo.${fmt === 'typ' ? 'typ' : fmt}`;
      await from(text).to(fmt).saveAs(filename);
      console.log(`✓ ${fmt.toUpperCase()} → ${filename}`);
    } catch (err) {
      console.error(`✗ Failed to generate ${fmt.toUpperCase()}:`, err.message);
    }
  }
}

run();
