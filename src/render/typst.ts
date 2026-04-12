import { TYPST_PARAMS } from '../constants';
import { getSplitMap, mergeParams } from '../utils';

export function renderTypst(text: string, params?: Record<string, any>): string {
  const p = mergeParams(TYPST_PARAMS, params);
  const { hSplitMap, vSplitMap } = getSplitMap();

  const hMapStr = JSON.stringify(hSplitMap)
    .replace(/"/g, '"')
    .replace(/:/g, ': ');
  const vMapStr = JSON.stringify(vSplitMap)
    .replace(/"/g, '"')
    .replace(/:/g, ': ');

  return `#set page(width: auto, height: auto, margin: 1cm)

#let params = (
  box-size: ${p.boxSize}pt,
  cols: ${p.cols},
  box-gap: ${p.boxGap}pt,
  font-size: ${p.fontSize}pt,
  h-scale: ${(p.hScale * 100).toFixed(0)}%,
  v-scale: ${(p.vScale * 100).toFixed(0)}%,
  h-tightness: ${p.hTightness}pt,
  v-tightness: ${p.vTightness}pt,
  stroke: ${p.stroke},
)

#let h-split-map = ${hMapStr}
#let v-split-map = ${vMapStr}

#let char-cell(char) = {
  box(
    width: params.box-size,
    height: params.box-size,
    stroke: params.stroke,
    clip: true,
    {
      set align(center + horizon)
      set text(size: params.font-size, font: "SimSun")
      if char in h-split-map {
        let (left, right) = h-split-map.at(char)
        stack(dir: ltr, spacing: params.h-tightness, scale(x: params.h-scale, reflow: true, left), scale(x: params.h-scale, reflow: true, right))
      } else if char in v-split-map {
        let (top, bottom) = v-split-map.at(char)
        stack(dir: ttb, spacing: params.v-tightness, scale(y: params.v-scale, reflow: true, top), scale(y: params.v-scale, reflow: true, bottom))
      } else {
        scale(88%, char)
      }
    }
  )
}

#grid(
  columns: (params.box-size,) * params.cols,
  column-gutter: params.box-gap,
  row-gutter: params.box-gap,
  ..("${text}".clusters().map(char => char-cell(char)))
)`;
}