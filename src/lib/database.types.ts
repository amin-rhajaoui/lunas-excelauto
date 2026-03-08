import type { FormData } from '../types';
import type { AllPrices } from '../priceCalculator';

export interface TarificationRow {
  id: string;
  created_at: string;
  client: string;
  societe: string;
  collection: string | null;
  projet: string;
  date: string;
  form_data: FormData;
  prices: AllPrices;
  prix_collection: number | null;
  prix_presse: number | null;
  prix_prod_paris: number | null;
  prix_prod_deloc_200_500: number | null;
}

export type TarificationInsert = Omit<TarificationRow, 'id' | 'created_at'>;
