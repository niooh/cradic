import { SVG_PARAMS } from '../constants';
import { getSplitMap, mergeParams } from '../utils';

export function renderSvg(text: string, params?: Record<string, any>): string {
  const p = mergeParams(SVG_PARAMS, params);
  const { hSplitMap, vSplitMap } = getSplitMap(text, p.mode);
  const chars = text.split('');
  const items: string[] = [];

  chars.forEach((char, idx) => {
    const col = idx % p.cols;
    const row = Math.floor(idx / p.cols);
    const cellX = col * (p.boxWidth + p.boxGapH);
    const cellY = row * (p.boxHeight + p.boxGapV);
    items.push(getCharSvgItem(char, cellX, cellY, hSplitMap, vSplitMap, p));
  });

  const totalRows = Math.ceil(chars.length / p.cols);
  const svgW = p.cols * (p.boxWidth + p.boxGapH) - p.boxGapH;
  const svgH = totalRows * (p.boxHeight + p.boxGapV) - p.boxGapV;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${svgW}" height="${svgH}">` +
    `${items.join('')}</svg>`;
}

function getCharSvgItem(
  char: string,
  cellX: number,
  cellY: number,
  hSplitMap: Record<string, string>,
  vSplitMap: Record<string, string>,
  p: Record<string, any>
): string {
  const w = p.boxWidth;
  const h = p.boxHeight;
  const centerX = cellX + w / 2;
  const centerY = cellY + h / 2;

  const rect = p.showBoxBorder
    ? `<rect x="${cellX}" y="${cellY}" width="${w}" height="${h}" fill="none" stroke="${p.boxBorderColor}" stroke-width="1"/>`
    : '';

  const baseFontSize = p.boxHeight * p.partScale;
  const commonAttr = `font-family="${p.fontFamily}" font-size="${baseFontSize}px" text-anchor="middle" dominant-baseline="central" fill="#000"`;

  if (!hSplitMap[char] && !vSplitMap[char]) {
    return `${rect}<text x="${centerX}" y="${centerY}" ${commonAttr}>${char}</text>`;
  }

  if (hSplitMap[char]) {
    const [left, right] = hSplitMap[char].split('');
    const leftCenterX = cellX + w * 0.25 + p.hLeftOffsetX;
    const rightCenterX = cellX + w * 0.75 + p.hRightOffsetX;
    const transLeft = `translate(${leftCenterX}, ${centerY}) scale(${p.hLeftScaleX}, 1)`;
    const transRight = `translate(${rightCenterX}, ${centerY}) scale(${p.hRightScaleX}, 1)`;
    return `${rect}<text transform="${transLeft}" ${commonAttr}>${left}</text><text transform="${transRight}" ${commonAttr}>${right}</text>`;
  }

  if (vSplitMap[char]) {
    const [top, bottom] = vSplitMap[char].split('');
    const topCenterY = cellY + h * 0.25 + p.vTopOffsetY;
    const bottomCenterY = cellY + h * 0.75 + p.vBottomOffsetY;
    const transTop = `translate(${centerX}, ${topCenterY}) scale(1, ${p.vTopScaleY})`;
    const transBottom = `translate(${centerX}, ${bottomCenterY}) scale(1, ${p.vBottomScaleY})`;
    return `${rect}<text transform="${transTop}" ${commonAttr}>${top}</text><text transform="${transBottom}" ${commonAttr}>${bottom}</text>`;
  }

  return '';
}
