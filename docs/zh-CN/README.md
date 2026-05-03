# Cradic

汉字偏旁拆分重组工具。将汉字简单拆解为偏旁部首，再重新拼合，形成有趣的视觉效果。  
(cradic ≈ chinese radical)

[English Version](../../README.md)

```
npm install cradic
```

## 特性

- **多格式输出**：HTML、SVG、Typst、纯文本
- **链式 API**：流畅的配置调用
- **浏览器 + Node.js**：双环境支持
- **可定制**：灵活参数系统

## 快速开始

```javascript
import { from } from 'cradic';

// 生成 HTML
const html = await from('汉字测试').to('html').toString();

// 生成 SVG
const svg = await from('汉字').to('svg').toString();

// 纯文本（简单替换）
const text = await from('主乢').to('text').toString();
// '亠土山乚'

// Typst 排版
const typ = await from('汉字').to('typ').toString();
```

![HTML渲染示例](../figures/html_render_example.jpg)


## API

### `from(text)`

创建 Cradic 实例，传入要处理的文本。

```javascript
const cr = from('汉字');
```

### `.to(type)`

设置输出格式，默认为 `html`。

- `html` - 带 CSS 的 HTML 文档
- `svg` - SVG 网格布局
- `typ` - Typst 文档
- `text` - 纯文本拆分替换
- `png` / `jpg` / `pdf` - 图片（仅 Node.js，需要外部工具）

```javascript
from('汉字').to('svg')
```

### `.with(params)`

覆盖默认参数。参数会与所选输出类型（由 `.to()` 决定）的默认值合并。

- `mode`（`'b'`|`'h'`|`'v'`）– 控制拆分方向（适用于所有类型）。默认为 `'b'`。
- `sep` – 纯文本输出时的分隔符（仅在 `.to('text')` 时有效）。使用 `'auto'` 会智能分隔：垂直拆分前加两个换行符，其他加空格。

```javascript
from('汉字').to('text').with({ mode: 'h' }).toString();  // '氵又字'
from('汉字').to('text').with({ sep: ' ' }).toString();   // '氵又 宀子'
from('一个').to('text').with({ sep: 'auto' }).toString(); // '氵又\n\n宀子'
```

完整参数列表（单元格大小、颜色、字体等）请查阅 **[params.md](./params.md)**。

### `.log()`

打印输出到控制台。返回 `this` 用于链式调用。

```javascript
from('汉字').to('html').log();
```

### `.saveAs(filename)`

保存到文件。

- **Node.js**：写入文件系统
- **浏览器**：触发下载

```javascript
await from('汉字').to('html').saveAs('output.html');
```

### `.toString()`

获取输出字符串。

```javascript
const html = await from('汉字').to('html').toString();
```

## 浏览器用法

```html
<script type="module">
  import { from } from './cradic.browser.js';

  const html = await from('汉字').to('html').toString();
  document.body.innerHTML = html;
</script>
```

## Node.js 用法

```javascript
import { from } from 'cradic';

await from('汉字').to('html').saveAs('output.html');
```

## 图片生成（仅 Node.js）

需要外部工具：

- PNG/JPG 需要 `rsvg-convert`
- PDF 需要 `typst`

```javascript
await from('汉字').to('png').saveAs('output.png');
await from('汉字').to('pdf').saveAs('output.pdf');
```

## 构建

```bash
npm run build     # 构建 CJS 和 ESM
npm run build:browser  # 浏览器构建
```

## 许可证

本项目源代码采用 MIT 协议开源。
`h.json`、`v.json` 部分数据来源于 [漢語拆字字典](https://github.com/kfcd/chaizi)，该部分数据遵循 **CC BY 3.0** 协议。
