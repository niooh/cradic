import { getSplitMap } from '../utils';

export function renderText(text: string, params?: Record<string, any>): string {
  const { hSplitMap, vSplitMap } = getSplitMap(text, params?.mode);

  return text
    .split('')
    .map((char) => {
      if (hSplitMap[char]) return hSplitMap[char];
      if (vSplitMap[char]) return vSplitMap[char];
      return char;
    })
    .join('');
}
