import type { ActiviteKey } from './types';

export const ACTIVITES: Record<ActiviteKey, number> = {
  'Broderies 69%': 69,
  'Applications /Serigraphie 47%': 47,
  'Patch / Broderie Mecanique 70%': 70,
  'Manipulation textile 83%': 83,
};

// Fixed hourly rates (B column)
export const RATE_BUREAU = 38;        // B9, B10, B15, B18
export const RATE_COLLECTION = 30;    // Temps Collection
export const RATE_PRESSE = 30;        // Temps Presse
export const RATE_M2P = 48;           // Cout atelier M2P
export const RATE_BRODERIES = 58;     // Cout atelier M2P Broderies
export const RATE_MAROC = 7;          // Sous traitance Maroc
export const RATE_MADA = 7.5;         // Sous traitance Mada

// Transport rates
export const TRANSPORT_LUNAS = 0.0805;
export const TRANSPORT_CHA = 0.0833;

// Default values
export const DEFAULT_TEMPS_GRADATION_COUT = 35;
export const DEFAULT_ALEA_PERCENT = 0.05;
export const DEFAULT_ALEA_PERCENT_DELOC = 0.10;

// Sheet names (Presse has trailing space in template)
export const SHEET_NAMES = {
  collection: 'Collection',
  presse: 'Presse ',
  prodParis: '200 m ou Prod Paris',
  prodDeloc: 'Prod déloc',
  mapping: 'Mapping',
} as const;

export const FABRICATION_TABS = [
  { key: 'collection', label: 'Collection' },
  { key: 'presse', label: 'Presse' },
  { key: 'prodParis', label: '200m / Prod Paris' },
  { key: 'prodDeloc', label: 'Prod deloc' },
] as const;

export type FabricationTabKey = typeof FABRICATION_TABS[number]['key'];
