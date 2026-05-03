import { describe, it, expect } from 'vitest';
import { from } from '../../src/core';

describe('renderHtml', () => {
  it('renders basic HTML output', async () => {
    const html = await from('字').to('html').toStr();
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<div id="box">');
  });

  it('wraps characters with split-char class', async () => {
    const html = await from('字').to('html').toStr();
    expect(html).toContain('class="split-char');
  });

  it('applies custom boxWidth', async () => {
    const html = await from('字').to('html').with({ boxWidth: 100 }).toStr();
    expect(html).toContain('width: 100px');
  });

  it('applies custom boxHeight', async () => {
    const html = await from('字').to('html').with({ boxHeight: 80 }).toStr();
    expect(html).toContain('height: 80px');
  });

  it('shows box border when enabled', async () => {
    const html = await from('字').to('html').with({ showBoxBorder: true }).toStr();
    expect(html).toContain('border:');
  });

  it('hides box border when disabled', async () => {
    const html = await from('字').to('html').with({ showBoxBorder: false }).toStr();
    expect(html).not.toMatch(/border:\s*1px/);
  });

  it('applies fontWeight', async () => {
    const html = await from('字').to('html').with({ fontWeight: 700 }).toStr();
    expect(html).toContain('font-weight: 700');
  });

  it('applies custom fontFamily', async () => {
    const html = await from('字').to('html').with({ fontFamily: 'Arial, sans-serif' }).toStr();
    expect(html).toContain('font-family: Arial, sans-serif');
  });

  it('handles multiple characters', async () => {
    const html = await from('一二三').to('html').toStr();
    expect(html).toContain('class="split-char');
    expect(html).toContain('<span class="split-char">一</span>');
  });
});