# Cradic

A library that deconstructs Chinese characters into radicals and reassembles them for intriguing visual effects.  
cradic ≈ chinese radical

[中文文档](./docs/zh-CN/README.md)

```
npm install cradic
```

## Features

- **Multi‑format output**: HTML, SVG, Typst, Plain text
- **Chainable API**: Fluent interface for configuration
- **Browser + Node.js**: Works in both environments
- **Customizable**: Flexible parameter system

## Quick Start

```javascript
import { from } from 'cradic';

// Generate HTML
const html = await from('汉字测试').to('html').toString();

// Generate SVG
const svg = await from('汉字').to('svg').toString();

// Plain text (simple replacement)
const text = await from('汉字').to('text').toString();
// "亠土山乚"

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

- `html` – HTML document with CSS (recommend)
- `svg` – SVG grid layout
- `typ` – Typst document
- `text` – Plain text split replacement
- `png` / `jpg` / `pdf` – Binart files (Node.js only, requires external tools)

```javascript
from('汉字').to('html')
```

### `.with(params)`

Override default parameters.  
Parameters are merged with the defaults of the chosen output type.  

There is one **universal** parameter:

- `mode` (`'b'`|`'h'`|`'v'`) – Controls which split directions are used. Default `'b'` (both).

```javascript
let text;

// Only horizontal splits
text = await from('汉字').to('text').with({ mode: 'h' }).toString();
// -> "氵又字"

// Only vertical splits
const text = await from('汉字').to('text').with({ mode: 'v' }).toString();
// -> "汉宀子"
```

For a full list of parameters (HTML, SVG, Typst) see **[docs/params.md](./docs/params.md)**.

### `.log()`

Print output to console.

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

The source code of this project is released under the MIT License.  
The data in `h.json` and `v.json` is partly sourced from https://github.com/kfcd/chaizi and is licensed under **CC BY 3.0**.
```

