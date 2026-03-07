import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { calculatePrices, type AllPrices, type SheetPrices } from '../priceCalculator';
import type { FormData } from '../types';

interface Props {
  form: FormData;
}

function fmt(n: number): string {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' \u20AC';
}

function SheetBlock({
  title,
  color,
  prices,
  pvLabels,
  prixVenteAnnonce,
}: {
  title: string;
  color: string;
  prices: SheetPrices;
  pvLabels: string[];
  prixVenteAnnonce: Array<{ label: string; value: number }>;
}) {
  return (
    <div>
      <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${color}`}>
        {title}
      </div>
      <div className="space-y-1 text-sm">
        <Row label="Frais engages" value={prices.totalFrais} muted />
        <Row label="Matieres" value={prices.totalMatieres} />
        <Row label="Fabrication" value={prices.totalFabrication} />
        <Row label="Transport" value={prices.totalTransport} muted />
        <div className="border-t border-border pt-1 mt-1">
          <Row label="Prix de revient" value={prices.totalPrixDeRevient} bold />
        </div>
        {prices.prixDeVente.map((pv, i) => (
          <Row key={i} label={pvLabels[i]} value={pv} bold highlight />
        ))}
        {prixVenteAnnonce.filter(p => p.value > 0).map((p, i) => (
          <div key={i} className="flex justify-between font-semibold text-red-600">
            <span className="truncate mr-2">{p.label}</span>
            <span className="tabular-nums whitespace-nowrap">{fmt(p.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  muted,
  highlight,
}: {
  label: string;
  value: number;
  bold?: boolean;
  muted?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className={`flex justify-between ${bold ? 'font-semibold' : ''} ${muted ? 'text-muted-foreground' : ''}`}>
      <span className="truncate mr-2">{label}</span>
      <span className={`tabular-nums whitespace-nowrap ${highlight ? 'text-primary font-bold' : ''}`}>
        {fmt(value)}
      </span>
    </div>
  );
}

export default function LivePreview({ form }: Props) {
  const prices: AllPrices = useMemo(() => calculatePrices(form), [form]);

  return (
    <Card className="p-4 space-y-4 text-sm">
      <h3 className="text-sm font-bold uppercase tracking-wide text-center">
        Apercu des prix
      </h3>

      <SheetBlock
        title="Collection"
        color="text-indigo-600"
        prices={prices.collection}
        pvLabels={['PV Collection', 'PV Frais dessins']}
        prixVenteAnnonce={[{ label: 'PV annonce', value: form.margesCollection.prixVenteAnnonce }]}
      />

      <Separator />

      <SheetBlock
        title="Presse"
        color="text-green-600"
        prices={prices.presse}
        pvLabels={['PV Presse']}
        prixVenteAnnonce={[{ label: 'PV annonce', value: form.margesPresse.prixVenteAnnonce }]}
      />

      <Separator />

      <SheetBlock
        title="Prod Paris / 200m"
        color="text-teal-600"
        prices={prices.prodParis}
        pvLabels={['PV Prod Paris']}
        prixVenteAnnonce={[{ label: 'PV annonce', value: form.margesProdParis.prixVenteAnnonce }]}
      />

      <Separator />

      <SheetBlock
        title="Prod Deloc"
        color="text-pink-600"
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
