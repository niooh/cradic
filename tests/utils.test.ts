import { describe, it, expect } from 'vitest';
import { getSplitMap, isNodeEnv, isBrowserEnv, mergeParams } from '../src/utils';

describe('utils', () => {
  describe('getSplitMap', () => {
    it('returns h split map for mode h', () => {
      const result = getSplitMap('汉', 'h');
      expect(result.hSplitMap).toBeDefined();
      expect(result.useH).toBe(true);
      expect(result.useV).toBe(false);
    });

    it('returns v split map for mode v', () => {
      const result = getSplitMap('字', 'v');
      expect(result.vSplitMap).toBeDefined();
      expect(result.useV).toBe(true);
      expect(result.useH).toBe(false);
    });

    it('returns both maps for mode b (char with both splits)', () => {
      const result = getSplitMap('汉字', 'b');
      expect(result.useH).toBe(true);
      expect(result.useV).toBe(true);
    });

    it('returns empty maps for text without splits', () => {
      const result = getSplitMap('一二三', 'b');
      expect(result.hSplitMap).toEqual({});
      expect(result.useH).toBe(false);
      expect(result.useV).toBe(true);
    });
  });

  describe('isNodeEnv', () => {
    it('returns true in node environment', () => {
      expect(isNodeEnv()).toBe(true);
    });
  });

  describe('isBrowserEnv', () => {
    it('returns false in node environment', () => {
      expect(isBrowserEnv()).toBe(false);
    });
  });

  describe('mergeParams', () => {
    it('returns defaults when custom is undefined', () => {
      const defaults = { a: 1, b: 2 };
      const result = mergeParams(defaults);
      expect(result).toEqual(defaults);
    });

    it('merges custom params', () => {
      const defaults = { a: 1, b: 2 };
      const custom = { b: 3, c: 4 };
      const result = mergeParams(defaults, custom);
      expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('does not mutate defaults', () => {
      const defaults = { a: 1 };
      mergeParams(defaults, { b: 2 });
      expect(defaults).toEqual({ a: 1 });
    });
  });
});