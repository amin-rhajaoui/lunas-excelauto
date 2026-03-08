import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Search, MoreHorizontal, Eye, Download, Trash2, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { fetchTarifications, deleteTarification } from '../services/tarificationService';
import { generateExcel } from '../services/excelGenerator';
import { calculatePrices } from '../priceCalculator';
import { formatEuro } from '../utils';
import { SHEET_COLORS } from '../lib/sheetColors';
import type { TarificationRow } from '../lib/database.types';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function PriceCell({ value, colorKey }: { value: number | null; colorKey: keyof typeof SHEET_COLORS }) {
  if (value == null) return <TableCell className="text-right text-muted-foreground">-</TableCell>;
  const c = SHEET_COLORS[colorKey];
  return (
    <TableCell className="text-right">
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold tabular-nums ${c.badge}`}>
        {formatEuro(value)}
      </span>
    </TableCell>
  );
}

function getAnnoncedPrice(row: TarificationRow, key: 'collection' | 'presse' | 'prodParis' | 'prodDeloc'): number {
  const fd = row.form_data;
  if (!fd) return 0;
  switch (key) {
    case 'collection': return fd.margesCollection?.prixVenteAnnonce ?? 0;
    case 'presse': return fd.margesPresse?.prixVenteAnnonce ?? 0;
    case 'prodParis': return fd.margesProdParis?.prixVenteAnnonce ?? 0;
    case 'prodDeloc': return fd.margesProdDeloc?.prixVenteAnnonce200_500 ?? 0;
  }
}

function computeMargin(pv: number, pdr: number): string {
  if (pv === 0) return '-';
  const m = ((pv - pdr) / pv) * 100;
  return m.toFixed(1) + '%';
}

export default function HistoryPage() {
  const [rows, setRows] = useState<TarificationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [detailRow, setDetailRow] = useState<TarificationRow | null>(null);
  const [deleteRow, setDeleteRow] = useState<TarificationRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [clientFilter, setClientFilter] = useState('');

  const uniqueClients = useMemo(
    () => [...new Set(rows.map(r => r.client))].sort((a, b) => a.localeCompare(b, 'fr')),
    [rows]
  );

  const clientSummary = useMemo(() => {
    if (!clientFilter) return [];
    const clientRows = rows.filter(r => r.client === clientFilter);
    const byProjet = new Map<string, TarificationRow>();
    for (const r of clientRows) {
      const existing = byProjet.get(r.projet);
      if (!existing || new Date(r.created_at) > new Date(existing.created_at)) {
        byProjet.set(r.projet, r);
      }
    }
    return Array.from(byProjet.values()).sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [rows, clientFilter]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await fetchTarifications();
      setRows(data);
    } catch {
      toast.error('Erreur lors du chargement des tarifications');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(row: TarificationRow) {
    setDeleting(true);
    try {
      await deleteTarification(row.id);
      setRows(prev => prev.filter(r => r.id !== row.id));
      toast.success('Tarification supprimee');
      setDeleteRow(null);
    } catch {
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleting(false);
    }
  }

  async function handleRedownload(row: TarificationRow) {
    try {
      await generateExcel(row.form_data);
      toast.success('Excel telecharge');
    } catch {
      toast.error('Erreur lors du telechargement');
    }
  }

  const filtered = rows.filter(r =>
    r.client.toLowerCase().includes(search.toLowerCase()) ||
    r.projet.toLowerCase().includes(search.toLowerCase())
  );

  // Compute detail prices for the detail dialog
  const detailPrices = useMemo(() => {
    if (!detailRow?.form_data) return null;
    try {
      return calculatePrices(detailRow.form_data);
    } catch {
      return null;
    }
  }, [detailRow]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Historique</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Toutes les tarifications generees
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="relative max-w-sm flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par client ou projet..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <select
            value={clientFilter}
            onChange={e => setClientFilter(e.target.value)}
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          >
            <option value="">Tous les clients</option>
            {uniqueClients.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {clientFilter && (
            <Button variant="ghost" size="icon-sm" onClick={() => setClientFilter('')}>
              <X className="size-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Client Price Summary */}
      {clientFilter && clientSummary.length > 0 && (
        <Card className="p-5 border-l-4 border-l-primary">
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
            Resume des prix — <span className="text-primary">{clientFilter}</span>
          </h3>
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.collection.dot}`} />
                      PV Collection
                    </span>
                  </TableHead>
                  <TableHead className="text-right">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.presse.dot}`} />
                      PV Presse
                    </span>
                  </TableHead>
                  <TableHead className="text-right">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.prodParis.dot}`} />
                      PV Prod Paris
                    </span>
                  </TableHead>
                  <TableHead className="text-right">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.prodDeloc.dot}`} />
                      PV Deloc
                    </span>
                  </TableHead>
                  <TableHead className="text-right text-orange-600">PV Annonce</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientSummary.map(row => {
                  const annonce = getAnnoncedPrice(row, 'collection');
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.projet}</TableCell>
                      <TableCell className="whitespace-nowrap">{formatDate(row.date)}</TableCell>
                      <PriceCell value={row.prix_collection} colorKey="collection" />
                      <PriceCell value={row.prix_presse} colorKey="presse" />
                      <PriceCell value={row.prix_prod_paris} colorKey="prodParis" />
                      <PriceCell value={row.prix_prod_deloc_200_500} colorKey="prodDeloc" />
                      <TableCell className="text-right tabular-nums font-semibold text-orange-600">
                        {annonce > 0 ? formatEuro(annonce) : '-'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* Main History Table */}
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Societe</TableHead>
              <TableHead>Projet</TableHead>
              <TableHead className="text-right">
                <span className="inline-flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.collection.dot}`} />
                  Collection
                </span>
              </TableHead>
              <TableHead className="text-right">
                <span className="inline-flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.presse.dot}`} />
                  Presse
                </span>
              </TableHead>
              <TableHead className="text-right">
                <span className="inline-flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.prodParis.dot}`} />
                  Prod Paris
                </span>
              </TableHead>
              <TableHead className="text-right">
                <span className="inline-flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.prodDeloc.dot}`} />
                  Deloc
                </span>
              </TableHead>
              <TableHead className="text-right text-orange-600">Annonce</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 10 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-muted-foreground py-8">
                  {search ? 'Aucun resultat pour cette recherche' : 'Aucune tarification'}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(row => {
                const annonce = getAnnoncedPrice(row, 'collection');
                return (
                  <TableRow key={row.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(row.created_at)}</TableCell>
                    <TableCell className="font-medium">{row.client}</TableCell>
                    <TableCell>
                      <Badge variant={row.societe === 'LUNAS' ? 'default' : 'secondary'}>
                        {row.societe}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.projet}</TableCell>
                    <PriceCell value={row.prix_collection} colorKey="collection" />
                    <PriceCell value={row.prix_presse} colorKey="presse" />
                    <PriceCell value={row.prix_prod_paris} colorKey="prodParis" />
                    <PriceCell value={row.prix_prod_deloc_200_500} colorKey="prodDeloc" />
                    <TableCell className="text-right tabular-nums font-semibold text-orange-600">
                      {annonce > 0 ? formatEuro(annonce) : '-'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setDetailRow(row)}>
                            <Eye className="size-4" />
                            Voir details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRedownload(row)}>
                            <Download className="size-4" />
                            Re-telecharger
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setDeleteRow(row)}
                          >
                            <Trash2 className="size-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Dialog - Enhanced with prix annonce + marge */}
      <Dialog open={detailRow !== null} onOpenChange={open => !open && setDetailRow(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Details de la tarification</DialogTitle>
            <DialogDescription>
              {detailRow?.client} - {detailRow?.projet}
            </DialogDescription>
          </DialogHeader>
          {detailRow && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-muted-foreground">Client</span>
                  <p className="font-medium">{detailRow.client}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Societe</span>
                  <p className="font-medium">{detailRow.societe}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Collection</span>
                  <p className="font-medium">{detailRow.collection ?? '-'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Projet</span>
                  <p className="font-medium">{detailRow.projet}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date</span>
                  <p className="font-medium">{formatDate(detailRow.date)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Cree le</span>
                  <p className="font-medium">{formatDate(detailRow.created_at)}</p>
                </div>
              </div>

              {/* Color-coded price cards */}
              <div className="border-t pt-3 space-y-3">
                <h4 className="font-semibold">Prix de vente & marges</h4>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { key: 'collection' as const, label: 'Collection', pv: detailRow.prix_collection, annonce: getAnnoncedPrice(detailRow, 'collection') },
                    { key: 'presse' as const, label: 'Presse', pv: detailRow.prix_presse, annonce: getAnnoncedPrice(detailRow, 'presse') },
                    { key: 'prodParis' as const, label: 'Prod Paris', pv: detailRow.prix_prod_paris, annonce: getAnnoncedPrice(detailRow, 'prodParis') },
                    { key: 'prodDeloc' as const, label: 'Prod Deloc', pv: detailRow.prix_prod_deloc_200_500, annonce: getAnnoncedPrice(detailRow, 'prodDeloc') },
                  ]).map(({ key, label, pv, annonce }) => {
                    const c = SHEET_COLORS[key];
                    const pdr = detailPrices ? detailPrices[key].totalPrixDeRevient : 0;
                    return (
                      <div key={key} className={`rounded-lg border-l-4 ${c.borderAccent} ${c.border} ${c.bgSubtle} p-3`}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                          <span className={`text-xs font-bold uppercase ${c.textHeading}`}>{label}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">PV</span>
                            <span className={`font-bold tabular-nums ${c.text}`}>
                              {pv != null ? formatEuro(pv) : '-'}
                            </span>
                          </div>
                          {detailPrices && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Marge</span>
                              <span className="font-semibold tabular-nums">
                                {pv != null ? computeMargin(pv, pdr) : '-'}
                              </span>
                            </div>
                          )}
                          {annonce > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Annonce</span>
                              <span className="font-semibold tabular-nums text-orange-600">
                                {formatEuro(annonce)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailRow(null)}>
              Fermer
            </Button>
            {detailRow && (
              <Button onClick={() => handleRedownload(detailRow)}>
                <Download className="size-4 mr-2" />
                Re-telecharger
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteRow !== null} onOpenChange={open => !open && setDeleteRow(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Etes-vous sur de vouloir supprimer la tarification de{' '}
              <strong>{deleteRow?.client}</strong> - <strong>{deleteRow?.projet}</strong> ?
              Cette action est irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteRow(null)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteRow && handleDelete(deleteRow)}
              disabled={deleting}
            >
              {deleting ? 'Suppression...' : 'Supprimer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
