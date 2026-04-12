# Cradic

汉字拆分重组库。

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
const html = await from('主测试乢汉字').to('html').toString();

// 生成 SVG
const svg = await from('汉字').to('svg').toString();

// 纯文本（简单替换）
const text = await from('主乢').to('text').toString();
// → "亠土山乚"

// Typst 排版
const typ = await from('汉字').to('typ').toString();
```

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

覆盖默认参数。不同输出类型有不同的参数集。参数使用小驼峰命名风格。

```javascript
// HTML 参数
from('汉字').to('html').with({
  boxWidth: 80,
  boxHeight: 80,
  showBoxBorder: true
})

// SVG 参数
from('汉字').to('svg').with({
  boxWidth: 60,
  boxHeight: 60,
  cols: 4,
  boxGapH: 4
})

// Typst 参数
from('汉字').to('typ').with({
  boxSize: 40,
  cols: 6,
  hScale: 0.65,
  vScale: 0.65
})
```

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

## 默认参数

不同输出类型有不同的参数集，只使用与输出类型相关的参数。

### HTML 参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `boxWidth` | 60 | 单元格宽度 (px) |
| `boxHeight` | 60 | 单元格高度 (px) |
| `showBoxBorder` | true | 显示边框 |
| `boxBorderColor` | '#eee' | 边框颜色 |
| `boxMarginH` | 2 | 水平边距 (px) |
| `partScale` | 0.75 | 基础缩放 |
| `hLeftScaleX` | 0.75 | 左部分横向缩放 |
| `hRightScaleX` | 0.8 | 右部分横向缩放 |
| `vTopScaleY` | 0.7 | 上部分纵向缩放 |
| `vBottomScaleY` | 0.85 | 下部分纵向缩放 |
| `hLeftOffsetX` | 0.3 | 左偏移 (em) |
| `hRightOffsetX` | -0.3 | 右偏移 (em) |
| `vTopOffsetY` | 0.5 | 上偏移 (em) |
| `vBottomOffsetY` | -0.5 | 下偏移 (em) |
| `fontWeight` | 380 | 部件字体粗细 |
| `textStroke` | '1px' | 文字描边 |
| `textStrokeColor` | '#000' | 描边颜色 |

### SVG 参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `boxWidth` | 60 | 单元格宽度 (px) |
| `boxHeight` | 60 | 单元格高度 (px) |
| `showBoxBorder` | true | 显示边框 |
| `boxBorderColor` | '#eee' | 边框颜色 |
| `boxGapH` | 4 | 水平间距 (px) |
| `boxGapV` | 8 | 垂直间距 (px) |
| `cols` | 6 | 网格列数 |
| `partScale` | 0.8 | 基础缩放 |
| `hLeftScaleX` | 0.7 | 左部分横向缩放 |
| `hRightScaleX` | 0.7 | 右部分横向缩放 |
| `vTopScaleY` | 0.7 | 上部分纵向缩放 |
| `vBottomScaleY` | 0.7 | 下部分纵向缩放 |
| `hLeftOffsetX` | 2 | 左偏移 (px) |
| `hRightOffsetX` | -2 | 右偏移 (px) |
| `vTopOffsetY` | 6 | 上偏移 (px) |
| `vBottomOffsetY` | -6 | 下偏移 (px) |

### Typst 参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `boxSize` | 40 | 单元格大小 (pt) |
| `cols` | 6 | 网格列数 |
| `boxGap` | 5 | 单元格间距 (pt) |
| `fontSize` | 30 | 字体大小 (pt) |
| `hScale` | 0.65 | 水平缩放 |
| `vScale` | 0.65 | 垂直缩放 |
| `hTightness` | -4 | 水平紧凑度 (pt) |
| `vTightness` | -2 | 垂直紧凑度 (pt) |
| `stroke` | '0.5pt + gray' | 单元格边框描边 |

## 数据来源

部件数据来自 [CJKVI IDS](https://github.com/cjkvi/cjkvi-ids)。

当前包含的字符：
- 横向拆分：乢, 乣, 乨
- 纵向拆分：丫, 主, 罢

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

MIT