import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SHEET_COLORS } from '../lib/sheetColors';
import type {
  MargesCollectionData,
  MargesPresseData,
  MargesProdParisData,
  MargesProdDelocData,
} from '../types';

interface Props {
  collection: MargesCollectionData;
  presse: MargesPresseData;
  prodParis: MargesProdParisData;
  prodDeloc: MargesProdDelocData;
  onChangeCollection: (d: MargesCollectionData) => void;
  onChangePresse: (d: MargesPresseData) => void;
  onChangeProdParis: (d: MargesProdParisData) => void;
  onChangeProdDeloc: (d: MargesProdDelocData) => void;
}

function NumInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type="number"
        min={0}
        step={0.01}
        value={value || ''}
        placeholder="0"
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
      />
    </div>
  );
}

function SectionCard({
  colorKey,
  title,
  children,
}: {
  colorKey: keyof typeof SHEET_COLORS;
  title: string;
  children: React.ReactNode;
}) {
  const c = SHEET_COLORS[colorKey];
  return (
    <div className={`rounded-lg border-l-4 ${c.borderAccent} ${c.border} ${c.bgSubtle} p-4`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />
        <h4 className={`text-sm font-bold uppercase tracking-wide ${c.textHeading}`}>
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

export default function MargesForm(props: Props) {
  return (
    <div className="space-y-4">
      {/* Collection */}
      <SectionCard colorKey="collection" title="Collection">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumInput
            label="PV Collection (marge)"
            value={props.collection.pvCollection}
            onChange={v => props.onChangeCollection({ ...props.collection, pvCollection: v })}
          />
          <NumInput
            label="PV Frais dessins (marge)"
            value={props.collection.pvFraisDessins}
            onChange={v => props.onChangeCollection({ ...props.collection, pvFraisDessins: v })}
          />
          <NumInput
            label="PV Frais technique (marge)"
            value={props.collection.pvFraisTechnique}
            onChange={v => props.onChangeCollection({ ...props.collection, pvFraisTechnique: v })}
          />
          <NumInput
            label="Prix de vente annonce"
            value={props.collection.prixVenteAnnonce}
            onChange={v => props.onChangeCollection({ ...props.collection, prixVenteAnnonce: v })}
          />
        </div>
      </SectionCard>

      {/* Presse */}
      <SectionCard colorKey="presse" title="Presse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumInput
            label="PV Presse (marge)"
            value={props.presse.pvPresse}
            onChange={v => props.onChangePresse({ ...props.presse, pvPresse: v })}
          />
          <NumInput
            label="Prix de vente annonce"
            value={props.presse.prixVenteAnnonce}
            onChange={v => props.onChangePresse({ ...props.presse, prixVenteAnnonce: v })}
          />
        </div>
      </SectionCard>

      {/* 200m / Prod Paris */}
      <SectionCard colorKey="prodParis" title="200m / Prod Paris">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumInput
            label="PV Prod Paris / 200m (marge)"
            value={props.prodParis.pvProdParis}
            onChange={v => props.onChangeProdParis({ ...props.prodParis, pvProdParis: v })}
          />
          <NumInput
            label="Prix de vente annonce"
            value={props.prodParis.prixVenteAnnonce}
            onChange={v => props.onChangeProdParis({ ...props.prodParis, prixVenteAnnonce: v })}
          />
        </div>
      </SectionCard>

      {/* Prod deloc */}
      <SectionCard colorKey="prodDeloc" title="Prod deloc (par tranche)">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NumInput
            label="200/500m"
            value={props.prodDeloc.pv200_500}
            onChange={v => props.onChangeProdDeloc({ ...props.prodDeloc, pv200_500: v })}
          />
          <NumInput
            label="501/2000m"
            value={props.prodDeloc.pv501_2000}
            onChange={v => props.onChangeProdDeloc({ ...props.prodDeloc, pv501_2000: v })}
          />
          <NumInput
            label="2001/3500m"
            value={props.prodDeloc.pv2001_3500}
            onChange={v => props.onChangeProdDeloc({ ...props.prodDeloc, pv2001_3500: v })}
          />
          <NumInput
            label="> 3500m"
            value={props.prodDeloc.pvAbove3500}
            onChange={v => props.onChangeProdDeloc({ ...props.prodDeloc, pvAbove3500: v })}
          />
          <NumInput
            label="PV annonce 200/500m"
            value={props.prodDeloc.prixVenteAnnonce200_500}
            onChange={v => props.onChangeProdDeloc({ ...props.prodDeloc, prixVenteAnnonce200_500: v })}
          />
          <NumInput
            label="PV annonce 501/2000m"
            value={props.prodDeloc.prixVenteAnnonce501_2000}
            onChange={v => props.onChangeProdDeloc({ ...props.prodDeloc, prixVenteAnnonce501_2000: v })}
          />
          <NumInput
            label="PV annonce 2001/3500m"
            value={props.prodDeloc.prixVenteAnnonce2001_3500}
            onChange={v => props.onChangeProdDeloc({ ...props.prodDeloc, prixVenteAnnonce2001_3500: v })}
          />
          <NumInput
            label="PV annonce > 3500m"
            value={props.prodDeloc.prixVenteAnnonceAbove3500}
            onChange={v => props.onChangeProdDeloc({ ...props.prodDeloc, prixVenteAnnonceAbove3500: v })}
          />
        </div>
      </SectionCard>
    </div>
  );
}
