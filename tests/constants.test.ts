import { describe, it, expect } from 'vitest';
import {
  HTML_PARAMS,
  SVG_PARAMS,
  TYPST_PARAMS,
  TEXT_PARAMS,
  DEFAULT_PARAMS,
  OUTPUT_TYPES,
  TYPE_ALIAS,
} from '../src/constants';

describe('constants', () => {
  describe('HTML_PARAMS', () => {
    it('has default mode', () => {
      expect(HTML_PARAMS.mode).toBe('b');
    });

    it('has default box dimensions', () => {
      expect(HTML_PARAMS.boxWidth).toBe(60);
      expect(HTML_PARAMS.boxHeight).toBe(60);
    });

    it('has part scale', () => {
      expect(HTML_PARAMS.partScale).toBe(0.75);
    });
  });

  describe('SVG_PARAMS', () => {
    it('has default mode', () => {
      expect(SVG_PARAMS.mode).toBe('b');
    });

    it('has default box dimensions', () => {
      expect(SVG_PARAMS.boxWidth).toBe(60);
      expect(SVG_PARAMS.boxHeight).toBe(60);
    });

    it('has cols', () => {
      expect(SVG_PARAMS.cols).toBe(6);
    });
  });

  describe('TYPST_PARAMS', () => {
    it('has default mode', () => {
      expect(TYPST_PARAMS.mode).toBe('b');
    });

    it('has boxSize', () => {
      expect(TYPST_PARAMS.boxSize).toBe(40);
    });

    it('has fontSize', () => {
      expect(TYPST_PARAMS.fontSize).toBe(30);
    });
  });

  describe('TEXT_PARAMS', () => {
    it('has default mode', () => {
      expect(TEXT_PARAMS.mode).toBe('b');
    });

    it('has empty separator', () => {
      expect(TEXT_PARAMS.sep).toBe('');
    });
  });

  describe('DEFAULT_PARAMS', () => {
    it('equals HTML_PARAMS', () => {
      expect(DEFAULT_PARAMS).toBe(HTML_PARAMS);
    });
  });

  describe('OUTPUT_TYPES', () => {
    it('includes html', () => {
      expect(OUTPUT_TYPES).toContain('html');
    });

    it('includes svg', () => {
      expect(OUTPUT_TYPES).toContain('svg');
    });

    it('includes text', () => {
      expect(OUTPUT_TYPES).toContain('text');
    });

    it('includes typ', () => {
      expect(OUTPUT_TYPES).toContain('typ');
    });

    it('includes png', () => {
      expect(OUTPUT_TYPES).toContain('png');
    });

    it('includes jpg', () => {
      expect(OUTPUT_TYPES).toContain('jpg');
    });

    it('includes pdf', () => {
      expect(OUTPUT_TYPES).toContain('pdf');
    });
  });

  describe('TYPE_ALIAS', () => {
    it('maps txt to text', () => {
      expect(TYPE_ALIAS.txt).toBe('text');
    });

    it('maps htm to html', () => {
      expect(TYPE_ALIAS.htm).toBe('html');
    });

    it('maps jpeg to jpg', () => {
      expect(TYPE_ALIAS.jpeg).toBe('jpg');
    });
  });
});