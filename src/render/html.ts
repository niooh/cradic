import { HTML_PARAMS } from '../constants';
import { getSplitMap, mergeParams } from '../utils';

export function renderHtml(text: string, params?: Record<string, any>): string {
  const p = mergeParams(HTML_PARAMS, params);
  const { hSplitMap, vSplitMap } = getSplitMap();
  const css = generateCSS(p);
  const html = strToSplitHtml(text, hSplitMap, vSplitMap, p);
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>汉字拆分</title>
  <style>${css}</style>
</head>
<body>
  <div id="box">${html}</div>
</body>
</html>`;
}

function generateCSS(p: Record<string, any>): string {
  const borderStyle = p.showBoxBorder
    ? `border: 1px solid ${p.boxBorderColor};`
    : 'border: none;';
  
  return `
    body {
      font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
      font-size: 32px;
      padding: 40px;
      line-height: 1.8;
    }
    
    #box {
      letter-spacing: 0;
    }
    
    .split-char {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: ${p.boxWidth}px;
      height: ${p.boxHeight}px;
      vertical-align: middle;
      margin: 0 ${p.boxMarginH}px;
      box-sizing: border-box;
      ${borderStyle}
      overflow: hidden;
    }
    
    .split-char.h-split {
      flex-direction: row;
    }
    
    .split-char.h-split .part {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${p.partScale}em;
      line-height: 1;
      transform-origin: center center;
      font-weight: ${p.fontWeight};
      -webkit-text-stroke: ${p.textStroke} ${p.textStrokeColor};
    }
    
    .part-left {
      transform: scaleX(${p.hLeftScaleX}) translateX(${p.hLeftOffsetX}em);
    }
    
    .part-right {
      transform: scaleX(${p.hRightScaleX}) translateX(${p.hRightOffsetX}em);
    }
    
    .split-char.v-split {
      flex-direction: column;
    }
    
    .split-char.v-split .part {
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${p.partScale}em;
      line-height: 1;
      transform-origin: center center;
      font-weight: ${p.fontWeight};
      -webkit-text-stroke: ${p.textStroke} ${p.textStrokeColor};
    }
    
    .part-top {
      transform: scaleY(${p.vTopScaleY}) translateY(${p.vTopOffsetY}em);
    }
    
    .part-bottom {
      transform: scaleY(${p.vBottomScaleY}) translateY(${p.vBottomOffsetY}em);
    }
  `;
}

function strToSplitHtml(
  text: string,
  hSplitMap: Record<string, string>,
  vSplitMap: Record<string, string>,
  p: Record<string, any>
): string {
  return text
    .split('')
    .map((char) => {
      if (hSplitMap[char]) {
        const [left, right] = hSplitMap[char].split('');
        return `<span class="split-char h-split" title="原字: ${char}">
          <span class="part part-left">${left}</span>
          <span class="part part-right">${right}</span>
        </span>`;
      }
      if (vSplitMap[char]) {
        const [top, bottom] = vSplitMap[char].split('');
        return `<span class="split-char v-split" title="原字: ${char}">
          <span class="part part-top">${top}</span>
          <span class="part part-bottom">${bottom}</span>
        </span>`;
      }
      return `<span class="split-char">${char}</span>`;
    })
    .join('');
}
