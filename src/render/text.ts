import { TEXT_PARAMS } from '../constants';
import { getSplitMap, mergeParams } from '../utils';

export function renderText(text: string, params?: Record<string, any>): string {
  const p = mergeParams(TEXT_PARAMS, params);
  const { hSplitMap, vSplitMap } = getSplitMap(text, p.mode);
  const { sep } = p;

  if (sep === 'auto') {
    const parts = text.split('').map((char) => {
      if (vSplitMap[char]) {
        const [top, bottom] = vSplitMap[char].split('');
        return { type: 'v' as const, content: top + '\n' + bottom };
      }
      if (hSplitMap[char]) {
        return { type: 'h' as const, content: hSplitMap[char] };
      }
      return { type: 'n' as const, content: char };
    });

    let result = '';
    parts.forEach((part, idx) => {
      if (idx > 0) {
        result += part.type === 'v' ? '\n\n' : ' ';
      }
      result += part.content;
    });
    return result;
  }

  // 其他普通 sep（包括 ''、' ' 等）
  const mapped = text.split('').map((char) => {
    if (hSplitMap[char]) return hSplitMap[char];
    if (vSplitMap[char]) return vSplitMap[char];
    return char;
  });

  if (typeof sep === 'string') {
    return mapped.join(sep);
  }
  // 兜底
  return mapped.join('');
}
