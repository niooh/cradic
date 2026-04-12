# Cradic

Chinese character splitting and reorganization library.

[中文文档](./docs/zh-CN/README.md)

```
npm install cradic
```

## Features

- **Multi-format output**: HTML, SVG, Typst, Plain text
- **Chainable API**: Fluent interface for configuration
- **Browser + Node.js**: Works in both environments
- **Customizable**: Flexible parameter system

## Quick Start

```javascript
import { from } from 'cradic';

// Generate HTML
const html = await from('主测试乢汉字').to('html').toString();

// Generate SVG
const svg = await from('汉字').to('svg').toString();

// Plain text (simple replacement)
const text = await from('主乢').to('text').toString();
// → "亠土山乚"

// Typst for typography
const typ = await from('汉字').to('typ').toString();
```

## API

### `from(text)`

Create a Cradic instance with input text.

```javascript
const cr = from('汉字');
```

### `.to(type)`

Set output format. Default is `html`.

- `html` - HTML document with CSS (default)
- `svg` - SVG grid layout
- `typ` - Typst document
- `text` - Plain text split replacement
- `png` / `jpg` / `pdf` - Image (Node.js only, requires external tools)

```javascript
from('汉字').to('svg')
```

### `.with(params)`

Override default parameters. Different output types have different parameter sets. Parameters use camelCase style.

```javascript
// HTML parameters
from('汉字').to('html').with({
  boxWidth: 80,
  boxHeight: 80,
  showBoxBorder: true
})

// SVG parameters
from('汉字').to('svg').with({
  boxWidth: 60,
  boxHeight: 60,
  cols: 4,
  boxGapH: 4
})

// Typst parameters
from('汉字').to('typ').with({
  boxSize: 40,
  cols: 6,
  hScale: 0.65,
  vScale: 0.65
})
```

### `.log()`

Print output to console. Returns `this` for chaining.

```javascript
from('汉字').to('html').log();
```

### `.saveAs(filename)`

Save to file.

- **Node.js**: Writes to filesystem
- **Browser**: Triggers download

```javascript
await from('汉字').to('html').saveAs('output.html');
```

### `.toString()`

Get output as string.

```javascript
const html = await from('汉字').to('html').toString();
```

## Default Parameters

Different output types have their own parameter sets. Only use parameters relevant to your output type.

### HTML Parameters

| Parameter | Default | Description |
|-----------|---------|------------|
| `boxWidth` | 60 | Cell width (px) |
| `boxHeight` | 60 | Cell height (px) |
| `showBoxBorder` | true | Show border |
| `boxBorderColor` | '#eee' | Border color |
| `boxMarginH` | 2 | Horizontal margin (px) |
| `partScale` | 0.75 | Base scale |
| `hLeftScaleX` | 0.75 | Left part H scale |
| `hRightScaleX` | 0.8 | Right part H scale |
| `vTopScaleY` | 0.7 | Top part V scale |
| `vBottomScaleY` | 0.85 | Bottom part V scale |
| `hLeftOffsetX` | 0.3 | Left offset (em) |
| `hRightOffsetX` | -0.3 | Right offset (em) |
| `vTopOffsetY` | 0.5 | Top offset (em) |
| `vBottomOffsetY` | -0.5 | Bottom offset (em) |
| `fontWeight` | 380 | Font weight for parts |
| `textStroke` | '1px' | Text stroke |
| `textStrokeColor` | '#000' | Stroke color |

### SVG Parameters

| Parameter | Default | Description |
|-----------|---------|------------|
| `boxWidth` | 60 | Cell width (px) |
| `boxHeight` | 60 | Cell height (px) |
| `showBoxBorder` | true | Show border |
| `boxBorderColor` | '#eee' | Border color |
| `boxGapH` | 4 | Horizontal gap (px) |
| `boxGapV` | 8 | Vertical gap (px) |
| `cols` | 6 | Columns in grid |
| `partScale` | 0.8 | Base scale |
| `hLeftScaleX` | 0.7 | Left part H scale |
| `hRightScaleX` | 0.7 | Right part H scale |
| `vTopScaleY` | 0.7 | Top part V scale |
| `vBottomScaleY` | 0.7 | Bottom part V scale |
| `hLeftOffsetX` | 2 | Left offset (px) |
| `hRightOffsetX` | -2 | Right offset (px) |
| `vTopOffsetY` | 6 | Top offset (px) |
| `vBottomOffsetY` | -6 | Bottom offset (px) |

### Typst Parameters

| Parameter | Default | Description |
|-----------|---------|------------|
| `boxSize` | 40 | Cell size (pt) |
| `cols` | 6 | Columns in grid |
| `boxGap` | 5 | Gap between cells (pt) |
| `fontSize` | 30 | Font size (pt) |
| `hScale` | 0.65 | Horizontal scale |
| `vScale` | 0.65 | Vertical scale |
| `hTightness` | -4 | Horizontal tightness (pt) |
| `vTightness` | -2 | Vertical tightness (pt) |
| `stroke` | '0.5pt + gray' | Cell border stroke |

## Data Source

Part data sourced from [CJKVI IDS](https://github.com/cjkvi/cjkvi-ids).

Currently included characters:
- Horizontal splits: 乢, 乣, 乨
- Vertical splits: 丫, 主, 罢

## Browser Usage

```html
<script type="module">
  import { from } from './cradic.browser.js';

  const html = await from('汉字').to('html').toString();
  document.body.innerHTML = html;
</script>
```

## Node.js Usage

```javascript
import { from } from 'cradic';

await from('汉字').to('html').saveAs('output.html');
```

## Image Generation (Node.js only)

Requires external tools:

- `rsvg-convert` for PNG/JPG
- `typst` for PDF

```javascript
await from('汉字').to('png').saveAs('output.png');
await from('汉字').to('pdf').saveAs('output.pdf');
```

## Build

```bash
npm run build     # Build CJS and ESM
npm run build:browser  # Browser build
```

## License

MIT
