# Cradic – 参数说明

参数分为**通用参数**（适用于所有 `.to()` 类型）和**类型专属参数**（仅在特定输出格式下生效）。类型专属参数必须在调用 `.to()` 之后设置。

## 通用参数

`mode`（默认 `'b'`）– 控制拆分方向，适用于所有输出类型。

- `'b'`：同时（both）使用水平和垂直拆分
- `'h'`：仅水平（horizontal）拆分，如 “汉” -> “氵又”，“字” -> “字”
- `'v'`：仅垂直（vertical）拆分，如 “字” -> “宀子”，“汉” -> “汉”

示例：
```javascript
// 双向拆分（默认）
from('汉字').to('text').with({ mode: 'b' }).log();
// -> '氵又宀子'

// 仅水平拆分
from('汉字').to('text').with({ mode: 'h' }).log();
// -> '氵又字'

// 仅垂直拆分
from('汉字').to('text').with({ mode: 'v' }).log();
// -> '汉宀子'
```

## HTML 参数

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
| `fontFamily` | "'Noto Sans CJK SC', 'Noto Serif CJK SC'" | 字体 |
| `fontWeight` | 380 | 部件字体粗细 |
| `textStroke` | '1px' | 文字描边 |
| `textStrokeColor` | '#000' | 描边颜色 |

示例：
```javascript
from('汉字').to('html').with({
  boxWidth: 80,
  boxHeight: 80,
  showBoxBorder: true,
  boxBorderColor: '#ddd',
}).log();
```

## SVG 参数

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
| `fontFamily` | "'Noto Sans CJK SC', 'Noto Serif CJK SC'" | 字体 |

示例：
```javascript
from('汉字').to('svg').with({
  cols: 4,
  boxWidth: 50,
  boxGapH: 2,
}).log();
```

## Typst 参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `boxSize` | 40 | 单元格大小 (pt) |
| `cols` | 6 | 网格列数 |
| `boxGap` | 5 | 单元格间距 (pt) |
| `fontFamily` | '"Noto Sans CJK SC"' | 字体 |
| `fontSize` | 30 | 字体大小 (pt) |
| `hScale` | 0.65 | 水平缩放 |
| `vScale` | 0.65 | 垂直缩放 |
| `hTightness` | -4 | 水平紧凑度 (pt) |
| `vTightness` | -2 | 垂直紧凑度 (pt) |
| `stroke` | '0.5pt + gray' | 单元格边框描边 |

示例：
```javascript
from('汉字').to('typ').with({
  boxSize: 50,
  cols: 4,
  fontSize: 24,
}).log();
```

## 纯文本参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `sep` | `''` | 输出字符之间的分隔符。使用 `'auto'` 则智能分隔。 |

示例：
```javascript
from('一个').to('text').with({ sep: ' ' }).log();
// -> '一 人丨'

from('一个').to('text').with({ sep: 'auto' }).log();
// -> '一\n\n人\n丨'
```
