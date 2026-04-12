export const HTML_PARAMS = {
  boxWidth: 60,
  boxHeight: 60,
  showBoxBorder: true,
  boxBorderColor: '#eee',
  boxMarginH: 2,

  partScale: 0.75,
  hLeftScaleX: 0.75,
  hRightScaleX: 0.8,
  vTopScaleY: 0.7,
  vBottomScaleY: 0.85,

  hLeftOffsetX: 0.3,
  hRightOffsetX: -0.3,
  vTopOffsetY: 0.5,
  vBottomOffsetY: -0.5,

  fontWeight: 380,
  textStroke: '1px',
  textStrokeColor: '#000',
};

export const SVG_PARAMS = {
  boxWidth: 60,
  boxHeight: 60,
  showBoxBorder: true,
  boxBorderColor: '#eee',
  boxGapH: 4,
  boxGapV: 8,
  cols: 6,

  partScale: 0.8,
  hLeftScaleX: 0.7,
  hRightScaleX: 0.7,
  vTopScaleY: 0.7,
  vBottomScaleY: 0.7,

  hLeftOffsetX: 2,
  hRightOffsetX: -2,
  vTopOffsetY: 6,
  vBottomOffsetY: -6,
};

export const TYPST_PARAMS = {
  boxSize: 40,
  cols: 6,
  boxGap: 5,
  fontSize: 30,
  hScale: 0.65,
  vScale: 0.65,
  hTightness: -4,
  vTightness: -2,
  stroke: '0.5pt + gray',
};

export const DEFAULT_PARAMS = HTML_PARAMS;

export const OUTPUT_TYPES = ['html', 'svg', 'typ', 'text', 'png', 'jpg', 'pdf'] as const;
export type OutputType = typeof OUTPUT_TYPES[number];