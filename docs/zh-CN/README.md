# Cradic

<p align="center">
  <a href="../../README.md">English</a> | 简体中文
</p>

汉字偏旁拆分重组工具。将汉字简单拆解为偏旁部首，再重新拼合，形成有趣的视觉效果。
  
**cradic** ≈ **c**hinese **radical**

## 安装
```bash
npm install cradic
```

## 特性

- **多格式输出**：HTML、SVG、Typst、纯文本
- **链式 API**：流畅的配置调用
- **浏览器 + Node.js**：双环境支持

## 快速开始

```javascript
import { from } from 'cradic';

// 生成 html 并保存文件
from('一个简单的汉字结构拆解测试').to('html').saveAs('output.html');

// 生成文本并输出到控制台
from('一个简单的汉字结构拆解测试').to('text').log();
// -> '一人丨⺮间单白勺氵又宀子纟吉木勾扌斥解氵则讠式'
```

你也可以直接访问 [在线演示](https://ldlsn1.github.io/repo/tests/demos/demo.html) 。

![HTML渲染示例](../figures/html_render_example.avif)


## API

### `from(string)`

创建 Cradic 实例，传入要处理的字符串。

```javascript
const cr = from('汉字');
```

### `.to(type)`

设置输出格式，默认为 `html`。

- `html` - 带 CSS 的 HTML（推荐）
- `svg` - SVG
- `typ` - Typst
- `text` - 纯文本替换
- `png` | `jpg` | `pdf` | `avif` - 二进制文件（仅 Node.js）

```javascript
from('汉字').to('svg')
```

### `.with(params)`

覆盖默认参数。参数会与所选输出类型（由 `.to()` 决定）的默认值合并。

- `mode`（`'b'`|`'h'`|`'v'`）– 控制拆分方向（适用于所有类型）。默认为 `'b'`。
- `sep` – 纯文本输出时的分隔符（仅在 `.to('text')` 时有效）。使用 `'auto'` 会智能分隔：垂直拆分前加两个换行符，其他加空格。

```javascript
from('汉字').to('text').with({ mode: 'h' }).log();  // '氵又字'
from('汉字').to('text').with({ sep: ' ' }).log();   // '氵又 宀子'
```

完整参数列表（单元格大小、颜色、字体等）请查阅 [params.md](./params.md)。

### `.log()`

打印输出到控制台。返回 `this` 用于链式调用。

```javascript
from('汉字').to('html').log();
```

### `.saveAs(filename)`

保存到文件。

- **Node.js**：写入本地文件
- **浏览器**：触发下载

```javascript
await from('汉字').to('html').saveAs('output.html');
```

### `.toStr()`

获取输出字符串。该方法返回 `Promise<string>`，需使用 `await`。

```javascript
const html = await from('汉字').to('html').toStr();
```

## 浏览器用法

```html
<script type="module">
  import { from } from './cradic.browser.js';

  const html = await from('汉字').to('html').toStr();
  document.body.innerHTML = html;
</script>
```

## Node.js 用法

```javascript
import { from } from 'cradic';

await from('汉字').to('html').saveAs('output.html');
```

具体用法也可查看 [tests/demos](./tests/demos/) 。

## 图片生成（仅 Node.js，可选）

依赖外部工具：

- PNG/JPG 需 `rsvg-convert`
- PDF 需 `typst`
- AVIF 需 `avifenc`

```javascript
await from('汉字').to('png').saveAs('output.png');
await from('汉字').to('pdf').saveAs('output.pdf');
```

## 构建

```bash
npm run build:node     # 为 nodejs 构建
npm run build:browser  # 为浏览器构建
```

## 许可证

本项目源代码采用 **MIT** 协议开源。
`assets/h.json`、`assets/v.json` 中部分数据来源于 [漢語拆字字典](https://github.com/kfcd/chaizi)，该数据遵循 **CC BY 3.0** 协议。
