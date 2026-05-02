import hSplitMap from '../assets/h.json';
import vSplitMap from '../assets/v.json';

export function getSplitMap() {
  return { 
    hSplitMap: hSplitMap as Record<string, string>,
    vSplitMap: vSplitMap as Record<string, string>
  };
}

export function isNodeEnv(): boolean {
  return typeof window === 'undefined';
}

export function isBrowserEnv(): boolean {
  return typeof window !== 'undefined';
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
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}