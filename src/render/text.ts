import { getSplitMap } from '../utils';

export function renderText(text: string): string {
  const { hSplitMap, vSplitMap } = getSplitMap();

  return text
    .split('')
    .map((char) => {
      if (hSplitMap[char]) return hSplitMap[char];
      if (vSplitMap[char]) return vSplitMap[char];
      return char;
    })
    .join('');
}