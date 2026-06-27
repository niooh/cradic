import hSplitMapFull from '../assets/h.json';
import vSplitMapFull from '../assets/v.json';

/**
 * 从全量映射中仅保留 text 内实际出现的字符
 */
function filterMapByText(
  text: string,
  map: Record<string, string>
): Record<string, string> {
  const used: Record<string, string> = {};
  for (const char of text) {
    if (char in map && !(char in used)) {
      used[char] = map[char];
    }
  }
  return used;
}

/**
 * 根据 mode 与 text，返回裁剪后的拆分映射，以及是否用到了 h/v 样式
 */
export function getSplitMap(text: string, mode: 'b' | 'h' | 'v') {
  const hRaw = mode === 'v' ? {} : (hSplitMapFull as Record<string, string>);
  const vRaw = mode === 'h' ? {} : (vSplitMapFull as Record<string, string>);

  const hSplitMap = filterMapByText(text, hRaw);
  const vSplitMap = filterMapByText(text, vRaw);

  return {
    hSplitMap,
    vSplitMap,
    useH: Object.keys(hSplitMap).length > 0,
    useV: Object.keys(vSplitMap).length > 0,
  };
}

export function isNodeEnv(): boolean {
  return typeof window === 'undefined';
}

export function mergeParams(defaults: Record<string, any>, custom?: Record<string, any>) {
  if (!custom) return defaults;
  return { ...defaults, ...custom };
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
