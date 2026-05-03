import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { from } from '../src/core';
import fs from 'fs';
import path from 'path';

describe('Cradic', () => {
  const tmpDir = 'dist/tmp';
  const testFile = path.join(tmpDir, 'test-output.txt');

  beforeEach(() => {
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  describe('from()', () => {
    it('creates Cradic instance', () => {
      const cr = from('字');
      expect(cr).toBeDefined();
    });
  });

  describe('to()', () => {
    it('sets output type to html', async () => {
      const html = await from('一').to('html').toString();
      expect(html).toContain('<!DOCTYPE html>');
    });

    it('sets output type to svg', async () => {
      const svg = await from('一').to('svg').toString();
      expect(svg).toMatch(/^<svg/);
    });

    it('sets output type to text (splits char by default)', async () => {
      const text = await from('字').to('text').toString();
      expect(text).toBe('宀子');
    });

    it('sets output type to typ', async () => {
      const typ = await from('一').to('typ').toString();
      expect(typ).toContain('#set page');
    });

    it('accepts type aliases', async () => {
      const text = await from('字').to('txt').toString();
      expect(text).toBe('宀子');
    });
  });

  describe('with()', () => {
    it('applies custom params for html', async () => {
      const html = await from('字').to('html').with({ boxWidth: 100 }).toString();
      expect(html).toContain('width: 100px');
    });

    it('applies custom params for text', async () => {
      const text = await from('汉').to('text').with({ mode: 'h' }).toString();
      expect(text).toBe('氵又');
    });
  });

  describe('toString()', () => {
    it('returns string for html output', async () => {
      const html = await from('字').to('html').toString();
      expect(typeof html).toBe('string');
      expect(html).toContain('box');
    });

    it('returns string for text output', async () => {
      const text = await from('字').to('text').toString();
      expect(typeof text).toBe('string');
    });
  });

  describe('saveAs()', () => {
    it('saves text to file', async () => {
      await from('测试').to('text').saveAs(testFile);
      const content = fs.readFileSync(testFile, 'utf-8');
      expect(content).toBe('氵则讠式');
    });

    it('saves html to file', async () => {
      await from('字').to('html').saveAs(path.join(tmpDir, 'test.html'));
      const content = fs.readFileSync(path.join(tmpDir, 'test.html'), 'utf-8');
      expect(content).toContain('<!DOCTYPE html>');
    });
  });

  describe('log()', () => {
    it('does not throw', () => {
      expect(() => from('字').log()).not.toThrow();
    });
  });

  describe('Default behavior', () => {
    it('default output is html', async () => {
      const html = await from('字').toString();
      expect(html).toContain('<!DOCTYPE html>');
    });
  });
});