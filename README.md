# Cradic

Chinese character splitting and reorganization library.

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

Override default parameters.

```javascript
from('汉字').with({
  boxWidth: 80,
  boxHeight: 80,
  cols: 4
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

| Parameter | Default | Description |
|-----------|---------|------------|
| `boxWidth` | 60 | Cell width (px) |
| `boxHeight` | 60 | Cell height (px) |
| `cols` | 6 | Columns in grid |
| `showBoxBorder` | true | Show borders |
| `partScale` | 0.75 | Base scale |
| `hLeftScaleX` | 0.75 | Left part H scale |
| `hRightScaleX` | 0.8 | Right part H scale |
| `vTopScaleY` | 0.7 | Top part V scale |
| `vBottomScaleY` | 0.85 | Bottom part V scale |

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
