import type { Style, Fill, Font, Border, Borders, Alignment } from 'exceljs';

// Colors
export const YELLOW_FILL: Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FEFFE1' },
};

export const BRIGHT_YELLOW_FILL: Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFFF00' },
};

export const SECTION_FILL: Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'D9E2F3' }, // light blue theme-like fill
};

export const PERIWINKLE_FILL: Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: '9999FF' },
};

export const PINK_FILL: Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'F092E7' },
};

export const PRESSE_FILL: Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: '92D050' },
};

export const PROD_PARIS_FILL: Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: '00B0F0' },
};

// Fonts
export const FONT_HEADER: Partial<Font> = {
  size: 22,
  bold: true,
};

export const FONT_WARNING: Partial<Font> = {
  size: 11,
  bold: true,
  color: { argb: 'FF0000' },
};

export const FONT_TITLE: Partial<Font> = {
  size: 26,
  bold: true,
};

export const FONT_DATA: Partial<Font> = {
  size: 22,
  bold: false,
};

export const FONT_DATA_BOLD: Partial<Font> = {
  size: 22,
  bold: true,
};

export const FONT_SMALL: Partial<Font> = {
  size: 9,
};

export const FONT_DATE: Partial<Font> = {
  size: 20,
  bold: true,
};

export const FONT_SUB_HEADER: Partial<Font> = {
  size: 20,
  bold: true,
};

// Borders
const THIN_BORDER: Partial<Border> = { style: 'thin' };
const MEDIUM_BORDER: Partial<Border> = { style: 'medium' };

export const BORDER_THIN_ALL: Partial<Borders> = {
  top: THIN_BORDER,
  bottom: THIN_BORDER,
  left: THIN_BORDER,
  right: THIN_BORDER,
};

export const BORDER_MEDIUM_ALL: Partial<Borders> = {
  top: MEDIUM_BORDER,
  bottom: MEDIUM_BORDER,
  left: MEDIUM_BORDER,
  right: MEDIUM_BORDER,
};

export const BORDER_MEDIUM_TOP_BOTTOM: Partial<Borders> = {
  top: MEDIUM_BORDER,
  bottom: MEDIUM_BORDER,
};

// Alignments
export const ALIGN_CENTER: Partial<Alignment> = {
  horizontal: 'center',
  vertical: 'middle',
  wrapText: true,
};

export const ALIGN_LEFT: Partial<Alignment> = {
  horizontal: 'left',
  vertical: 'middle',
  wrapText: true,
};

// Number formats
export const FMT_EURO = '#,##0.00 "€"';
export const FMT_EURO_ACCOUNTING = '_-* #,##0.00 "€"_-;\\-* #,##0.00 "€"_-;_-* "-"?? "€"_-;_-@_-';
export const FMT_PERCENT = '0%';
export const FMT_DECIMAL2 = '0.00';
export const FMT_INT = '0';
export const FMT_DATE = 'mm-dd-yy';
export const FMT_DECIMAL1 = '0.0';
export const FMT_EURO_FR = '_-* #,##0.00 [$€-40C]_-;\\-* #,##0.00 [$€-40C]_-;_-* "-"?? [$€-40C]_-;_-@_-';

// Common cell style presets
export const STYLE_YELLOW_INPUT: Partial<Style> = {
  fill: YELLOW_FILL,
  font: FONT_DATA,
  border: BORDER_THIN_ALL,
};

export const STYLE_SECTION_HEADER: Partial<Style> = {
  fill: SECTION_FILL,
  font: FONT_DATA_BOLD,
  border: BORDER_MEDIUM_ALL,
  alignment: ALIGN_LEFT,
};

export const STYLE_COLUMN_HEADER: Partial<Style> = {
  font: FONT_DATA_BOLD,
  border: BORDER_MEDIUM_ALL,
  alignment: ALIGN_CENTER,
};
