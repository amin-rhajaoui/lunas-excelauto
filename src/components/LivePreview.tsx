import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { calculatePrices, type AllPrices, type SheetPrices } from '../priceCalculator';
import { SHEET_COLORS } from '../lib/sheetColors';
import type { FormData } from '../types';

interface Props {
  form: FormData;
}

function fmt(n: number): string {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' \u20AC';
}

function computeMargin(pv: number, pdr: number): number | null {
  if (pv === 0) return null;
  return ((pv - pdr) / pv) * 100;
}

function MarginBadge({ pv, pdr }: { pv: number; pdr: number }) {
  const margin = computeMargin(pv, pdr);
  if (margin === null) return null;
  const color = margin >= 40 ? 'text-green-600 bg-green-50' : margin >= 20 ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50';
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${color}`}>
      {margin.toFixed(1)}%
    </span>
  );
}

function SheetBlock({
  title,
  colorKey,
  prices,
  pvLabels,
  prixVenteAnnonce,
}: {
  title: string;
  colorKey: keyof typeof SHEET_COLORS;
  prices: SheetPrices;
  pvLabels: string[];
  prixVenteAnnonce: Array<{ label: string; value: number }>;
}) {
  const c = SHEET_COLORS[colorKey];

  return (
    <div className={`rounded-lg border-l-4 ${c.borderAccent} ${c.border} ${c.bgSubtle} p-3 space-y-2`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />
        <span className={`text-xs font-bold uppercase tracking-wider ${c.textHeading}`}>
          {title}
        </span>
      </div>

      {/* Cost breakdown */}
      <div className="space-y-0.5 text-[13px]">
        <Row label="Frais engages" value={prices.totalFrais} muted />
        <Row label="Matieres" value={prices.totalMatieres} />
        <Row label="Fabrication" value={prices.totalFabrication} />
        <Row label="Transport" value={prices.totalTransport} muted />
      </div>

      {/* Prix de revient */}
      <div className={`border-t ${c.border} pt-1.5`}>
        <div className="flex justify-between text-[13px] font-semibold">
          <span>Prix de revient</span>
          <span className="tabular-nums">{fmt(prices.totalPrixDeRevient)}</span>
        </div>
      </div>

      {/* Prix de vente */}
      <div className="space-y-1">
        {prices.prixDeVente.map((pv, i) => (
          <div key={i} className={`flex justify-between items-center text-[13px] font-bold ${c.text}`}>
            <span className="truncate mr-2">{pvLabels[i]}</span>
            <div className="flex items-center gap-1.5">
              <MarginBadge pv={pv} pdr={prices.totalPrixDeRevient} />
              <span className="tabular-nums whitespace-nowrap">{fmt(pv)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Prix annonce */}
      {prixVenteAnnonce.filter(p => p.value > 0).map((p, i) => (
        <div key={i} className="flex justify-between items-center text-[13px]">
          <span className="truncate mr-2 text-muted-foreground">{p.label}</span>
          <div className="flex items-center gap-1.5">
            <MarginBadge pv={p.value} pdr={prices.totalPrixDeRevient} />
            <span className="tabular-nums whitespace-nowrap font-semibold text-orange-600">
              {fmt(p.value)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: number;
  muted?: boolean;
}) {
  return (
    <div className={`flex justify-between ${muted ? 'text-muted-foreground' : ''}`}>
      <span className="truncate mr-2">{label}</span>
      <span className="tabular-nums whitespace-nowrap">{fmt(value)}</span>
    </div>
  );
}

export default function LivePreview({ form }: Props) {
  const prices: AllPrices = useMemo(() => calculatePrices(form), [form]);

  return (
    <Card className="p-4 space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-center text-muted-foreground">
        Apercu des prix
      </h3>

      <SheetBlock
        title="Collection"
        colorKey="collection"
        prices={prices.collection}
        pvLabels={['PV Collection', 'PV Frais dessins']}
        prixVenteAnnonce={[{ label: 'PV annonce', value: form.margesCollection.prixVenteAnnonce }]}
      />

      <SheetBlock
        title="Presse"
        colorKey="presse"
        prices={prices.presse}
        pvLabels={['PV Presse']}
        prixVenteAnnonce={[{ label: 'PV annonce', value: form.margesPresse.prixVenteAnnonce }]}
      />

      <SheetBlock
        title="Prod Paris / 200m"
        colorKey="prodParis"
        prices={prices.prodParis}
        pvLabels={['PV Prod Paris']}
        prixVenteAnnonce={[{ label: 'PV annonce', value: form.margesProdParis.prixVenteAnnonce }]}
      />

      <SheetBlock
        title="Prod Deloc"
        colorKey="prodDeloc"
        prices={prices.prodDeloc}
        pvLabels={['200/500m', '501/2000m', '2001/3500m', '> 3500m']}
        prixVenteAnnonce={[
          { label: 'PV annonce 200/500', value: form.margesProdDeloc.prixVenteAnnonce200_500 },
          { label: 'PV annonce 501/2000', value: form.margesProdDeloc.prixVenteAnnonce501_2000 },
          { label: 'PV annonce 2001/3500', value: form.margesProdDeloc.prixVenteAnnonce2001_3500 },
          { label: 'PV annonce > 3500', value: form.margesProdDeloc.prixVenteAnnonceAbove3500 },
        ]}
      />
    </Card>
  );
}
