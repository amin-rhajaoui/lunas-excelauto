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
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type="number"
        min={0}
        step={0.01}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
        className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      />
    </div>
  );
}

export default function MargesForm(props: Props) {
  return (
    <div className="space-y-6">
      {/* Collection */}
      <div>
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
          Collection
        </h4>
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
        </div>
      </div>

      {/* Presse */}
      <div>
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
          Presse
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumInput
            label="PV Presse (marge)"
            value={props.presse.pvPresse}
            onChange={v => props.onChangePresse({ pvPresse: v })}
          />
        </div>
      </div>

      {/* 200m / Prod Paris */}
      <div>
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
          200m / Prod Paris
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumInput
            label="PV Prod Paris / 200m (marge)"
            value={props.prodParis.pvProdParis}
            onChange={v => props.onChangeProdParis({ pvProdParis: v })}
          />
        </div>
      </div>

      {/* Prod deloc */}
      <div>
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
          Prod deloc (par tranche)
        </h4>
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
        </div>
      </div>
    </div>
  );
}
