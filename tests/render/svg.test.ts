import { describe, it, expect } from 'vitest';
import { from } from '../../src/core';

describe('renderSvg', () => {
  it('renders basic SVG output', async () => {
    const svg = await from('一字').to('svg').toStr();
    expect(svg).toMatch(/^<svg/);
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
  });

  it('applies custom boxWidth', async () => {
    const svg = await from('一').to('svg').with({ boxWidth: 100 }).toStr();
    expect(svg).toContain('width="100"');
  });

  it('applies custom boxHeight', async () => {
    const svg = await from('一').to('svg').with({ boxHeight: 80 }).toStr();
    expect(svg).toContain('height="80"');
  });

  it('shows box border when enabled', async () => {
    const svg = await from('一').to('svg').with({ showBoxBorder: true }).toStr();
    expect(svg).toContain('rect');
  });

  it('handles horizontal split', async () => {
    const svg = await from('汉').to('svg').with({ mode: 'h' }).toStr();
    expect(svg).toContain('氵');
    expect(svg).toContain('又');
  });

  it('handles vertical split', async () => {
    const svg = await from('字').to('svg').with({ mode: 'v' }).toStr();
    expect(svg).toContain('translate(30, 21)');
    expect(svg).toContain('translate(30, 39)');
  });

  it('applies custom fontFamily', async () => {
    const svg = await from('字').to('svg').with({ fontFamily: 'Times New Roman, serif' }).toStr();
    expect(svg).toContain('font-family="Times New Roman, serif"');
  });

  it('handles both split modes (h for Han, v for Zi)', async () => {
    const hSvg = await from('汉').to('svg').with({ mode: 'b' }).toStr();
    expect(hSvg).toContain('氵');
    expect(hSvg).toContain('又');
    const vSvg = await from('字').to('svg').with({ mode: 'b' }).toStr();
    expect(vSvg).toContain('translate(30, 21)');
    expect(vSvg).toContain('translate(30, 39)');
  });
});