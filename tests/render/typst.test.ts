import { describe, it, expect } from 'vitest';
import { from } from '../../src/core';

describe('renderTypst', () => {
  it('renders basic Typst output', async () => {
    const typ = await from('一').to('typ').toString();
    expect(typ).toContain('#set page');
    expect(typ).toContain('#let params');
    expect(typ).toContain('char-cell');
  });

  it('includes h-split-map', async () => {
    const typ = await from('汉').to('typ').with({ mode: 'h' }).toString();
    expect(typ).toContain('h-split-map');
  });

  it('includes v-split-map', async () => {
    const typ = await from('字').to('typ').with({ mode: 'v' }).toString();
    expect(typ).toContain('v-split-map');
  });

  it('includes both maps for mode b', async () => {
    const typ = await from('字').to('typ').with({ mode: 'b' }).toString();
    expect(typ).toContain('h-split-map');
    expect(typ).toContain('v-split-map');
  });

  it('applies custom boxSize', async () => {
    const typ = await from('一').to('typ').with({ boxSize: 50 }).toString();
    expect(typ).toContain('box-size: 50pt');
  });

  it('applies custom cols', async () => {
    const typ = await from('一').to('typ').with({ cols: 4 }).toString();
    expect(typ).toContain('cols: 4');
  });

  it('applies custom boxGap', async () => {
    const typ = await from('一').to('typ').with({ boxGap: 10 }).toString();
    expect(typ).toContain('box-gap: 10pt');
  });

  it('applies custom fontSize', async () => {
    const typ = await from('一').to('typ').with({ fontSize: 36 }).toString();
    expect(typ).toContain('font-size: 36pt');
  });

  it('applies hScale', async () => {
    const typ = await from('一').to('typ').with({ hScale: 0.7 }).toString();
    expect(typ).toContain('h-scale: 70%');
  });

  it('applies vScale', async () => {
    const typ = await from('一').to('typ').with({ vScale: 0.8 }).toString();
    expect(typ).toContain('v-scale: 80%');
  });

  it('handles multiple characters', async () => {
    const typ = await from('一二三').to('typ').toString();
    expect(typ).toContain('char-cell');
  });
});