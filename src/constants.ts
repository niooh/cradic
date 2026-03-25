export const DEFAULT_PARAMS = {
  boxWidth: 60,
  boxHeight: 60,
  showBoxBorder: true,
  boxBorderColor: '#eee',
  boxMarginH: 2,
  boxGapH: 4,
  boxGapV: 8,
  cols: 6,

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

export const OUTPUT_TYPES = ['html', 'svg', 'typ', 'text', 'png', 'jpg', 'pdf'] as const;
export type OutputType = typeof OUTPUT_TYPES[number];