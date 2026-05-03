import { describe, it, expect } from 'vitest';
import { from } from '../../src/core';

describe('renderText', () => {
  it('renders basic text output', async () => {
    const text = await from('一').to('text').toStr();
    expect(text).toBe('一');
  });

  it('splits characters horizontally', async () => {
    const text = await from('汉').to('text').with({ mode: 'h' }).toStr();
    expect(text).toBe('氵又');
  });

  it('splits characters vertically', async () => {
    const text = await from('字').to('text').with({ mode: 'v' }).toStr();
    expect(text).toBe('宀子');
  });

  it('splits characters both ways (h for 汉, v for 字)', async () => {
    const hText = await from('汉').to('text').with({ mode: 'b' }).toStr();
    expect(hText).toBe('氵又');
    const vText = await from('字').to('text').with({ mode: 'b' }).toStr();
    expect(vText).toBe('宀子');
  });

  it('passes through non-decomposable characters', async () => {
    const text = await from('氵又').to('text').toStr();
    expect(text).toBe('氵又');
  });

  it('applies separator - auto', async () => {
    const text = await from('一个简单的人')
      .to('text')
      .with({ mode: 'b', sep: 'auto' })
      .toStr();
    expect(text).toContain('\n');
  });

  it('applies separator - empty string (default)', async () => {
    const text = await from('一').to('text').toStr();
    expect(text).toBe('一');
  });

  it('applies separator - space', async () => {
    const text = await from('一二').to('text').with({ sep: ' ' }).toStr();
    expect(text).toBe('一 二');
  });

  it('handles multiple characters', async () => {
    const text = await from('汉字').to('text').with({ mode: 'b' }).toStr();
    expect(text).toBe('氵又宀子');
  });
});