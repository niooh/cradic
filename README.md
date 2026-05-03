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

// Generate html and output to console
from('一个简单的汉字结构拆解测试').to('html').log();

// Generate plain text
from('一个简单的汉字结构拆解测试').to('text').log();
//  -> '一人丨⺮间单白勺氵又宀子纟吉木勾扌斥解氵则讠式'
```

![HTML render example](docs/figures/html_render_example.jpg)


## API

### `from(text)`

Create a Cradic instance with input text.

```javascript
const cr = from('汉字');
```

### `.to(type)`

Set output format. Default is `html`.

- `html` – HTML document with CSS (recommended)
- `svg` – SVG grid layout
- `typ` – Typst document
- `text` – Plain text with radical replacements
- `png` / `jpg` / `pdf` – Binary files (Node.js only, requires external tools)

```javascript
from('汉字').to('svg')
```

### `.with(params)`

Override default parameters. Parameters are merged with the defaults of the chosen output type (set by `.to()`).

- `mode` (`'b'`|`'h'`|`'v'`) – Controls split directions (works for all types). Default `'b'`.
- `sep` – Separator for text output (only works with `.to('text')`). Use `'auto'` for smart separator: two newlines before vertically-split characters, space before others.

```javascript
from('汉字').to('text').with({ mode: 'h' }).toString();  // '氵又字'
from('汉字').to('text').with({ sep: ' ' }).toString();   // '氵又 宀子'
from('一个').to('text').with({ sep: 'auto' }).toString(); // '氵又\n\n宀子'
```

For a full list of type-specific parameters (cell size, colors, fonts, etc.), see **[docs/params.md](./docs/params.md)**.

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

## Binary Files Generation (Node.js only)

Requires external tools:

- `rsvg-convert` for PNG/JPG
- `typst` for PDF

```javascript
await from('汉字').to('png').saveAs('output.png');
await from('汉字').to('pdf').saveAs('output.pdf');
```

## Build

```bash
npm run build  # Build CJS and ESM
npm run build:browser  # Browser build
```

## License

The source code of this project is released under the MIT License.  
The data in `h.json` and `v.json` is partly sourced from (https://github.com/kfcd/chaizi) and is licensed under **CC BY 3.0**.
```
