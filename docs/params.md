# Cradic – Parameters

## Common Parameter

`mode` (default `'b'`) – Controls split direction. Applies to **all** output types.

- `'b'`: Both horizontal and vertical splits
- `'h'`: Only horizontal splits (e.g., 汉 → 氵又, 字 stays as 字)
- `'v'`: Only vertical splits (e.g., 字 → 宀子, 汉 stays as 汉)

Example:
```js
from('汉字').to('text').with({ mode: 'h' }).toString()
// "氵又字"
```

## HTML Parameters

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

## SVG Parameters

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

## Typst Parameters

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
