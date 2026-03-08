import { supabase } from '../lib/supabase';
import { calculatePrices } from '../priceCalculator';
import type { FormData } from '../types';
import type { TarificationRow, TarificationInsert } from '../lib/database.types';

export async function saveTarification(form: FormData): Promise<TarificationRow> {
  const prices = calculatePrices(form);

  const row: TarificationInsert = {
    client: form.header.client,
    societe: form.header.societe,
    collection: form.header.collection || null,
    projet: form.header.projet,
    date: form.header.date,
    form_data: form,
    prices,
    prix_collection: prices.collection.prixDeVente[0] ?? null,
    prix_presse: prices.presse.prixDeVente[0] ?? null,
    prix_prod_paris: prices.prodParis.prixDeVente[0] ?? null,
    prix_prod_deloc_200_500: prices.prodDeloc.prixDeVente[0] ?? null,
  };

  const { data, error } = await supabase
    .from('tarifications')
    .insert(row)
    .select()
    .single();

  if (error) throw error;
  return data as TarificationRow;
}

export async function fetchDistinctClients(): Promise<string[]> {
  const { data, error } = await supabase
    .from('tarifications')
    .select('client');

  if (error) throw error;
  const unique = [...new Set((data ?? []).map(r => r.client))];
  unique.sort((a, b) => a.localeCompare(b, 'fr'));
  return unique;
}

export async function fetchDistinctProjets(client?: string): Promise<string[]> {
  let query = supabase.from('tarifications').select('projet');
  if (client) {
    query = query.eq('client', client);
  }
  const { data, error } = await query;

  if (error) throw error;
  const unique = [...new Set((data ?? []).map(r => r.projet))];
  unique.sort((a, b) => a.localeCompare(b, 'fr'));
  return unique;
}

export async function fetchTarifications(): Promise<TarificationRow[]> {
  const { data, error } = await supabase
    .from('tarifications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as TarificationRow[];
}

export async function deleteTarification(id: string): Promise<void> {
  const { error } = await supabase
    .from('tarifications')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export interface DashboardStats {
  total: number;
  uniqueClients: number;
  thisMonth: number;
  byMonth: { month: string; count: number }[];
  byClient: { client: string; count: number }[];
  recent: TarificationRow[];
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const { data, error } = await supabase
    .from('tarifications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  const rows = (data ?? []) as TarificationRow[];
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const thisMonth = rows.filter(r => r.created_at.startsWith(currentMonth)).length;

  const clientSet = new Set(rows.map(r => r.client));

  // Group by month (last 6 months)
  const monthCounts = new Map<string, number>();
  for (const r of rows) {
    const m = r.created_at.slice(0, 7); // YYYY-MM
    monthCounts.set(m, (monthCounts.get(m) ?? 0) + 1);
  }
  const byMonth = Array.from(monthCounts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, count]) => ({ month, count }));

  // Group by client
  const clientCounts = new Map<string, number>();
  for (const r of rows) {
    clientCounts.set(r.client, (clientCounts.get(r.client) ?? 0) + 1);
  }
  const byClient = Array.from(clientCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([client, count]) => ({ client, count }));

  return {
    total: rows.length,
    uniqueClients: clientSet.size,
    thisMonth,
    byMonth,
    byClient,
    recent: rows.slice(0, 5),
  };
}
