import { useState } from 'react';
import { FABRICATION_TABS, type FabricationTabKey } from '../constants';
import type {
  FabricationCollectionData,
  FabricationPresseData,
  FabricationProdParisData,
  FabricationProdDelocData,
} from '../types';

interface Props {
  collection: FabricationCollectionData;
  presse: FabricationPresseData;
  prodParis: FabricationProdParisData;
  prodDeloc: FabricationProdDelocData;
  onChangeCollection: (d: FabricationCollectionData) => void;
  onChangePresse: (d: FabricationPresseData) => void;
  onChangeProdParis: (d: FabricationProdParisData) => void;
  onChangeProdDeloc: (d: FabricationProdDelocData) => void;
}

function NumInput({
  label,
  rate,
  value,
  onChange,
}: {
  label: string;
  rate: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        <span className="ml-2 text-xs font-normal text-gray-400">({rate})</span>
      </label>
      <div className="relative">
        <input
          type="number"
          min={0}
          step={0.01}
          value={value || ''}
          placeholder="0"
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">h</span>
      </div>
    </div>
  );
}

export default function FabricationTabs(props: Props) {
  const [tab, setTab] = useState<FabricationTabKey>('collection');

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {FABRICATION_TABS.map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-5 py-3 text-sm font-semibold transition-colors relative ${
              tab === t.key
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
            {tab === t.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'collection' && (
        <CollectionTab
          data={props.collection}
          onChange={props.onChangeCollection}
        />
      )}
      {tab === 'presse' && (
        <PresseTab data={props.presse} onChange={props.onChangePresse} />
      )}
      {tab === 'prodParis' && (
        <ProdParisTab
          data={props.prodParis}
          onChange={props.onChangeProdParis}
        />
      )}
      {tab === 'prodDeloc' && (
        <ProdDelocTab
          data={props.prodDeloc}
          onChange={props.onChangeProdDeloc}
        />
      )}
    </div>
  );
}

function CollectionTab({
  data,
  onChange,
}: {
  data: FabricationCollectionData;
  onChange: (d: FabricationCollectionData) => void;
}) {
  const set = <K extends keyof FabricationCollectionData>(k: K, v: number) =>
    onChange({ ...data, [k]: v });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NumInput label="Temps Collection" rate="30€/h" value={data.tempsCollection} onChange={v => set('tempsCollection', v)} />
      <NumInput label="Temps Presse" rate="30€/h" value={data.tempsPresse} onChange={v => set('tempsPresse', v)} />
      <NumInput label="Cout atelier M2P Manip Textile" rate="48€/h" value={data.coutAtelierManipTextile} onChange={v => set('coutAtelierManipTextile', v)} />
      <NumInput label="Cout atelier M2P Broderies" rate="58€/h" value={data.coutAtelierBroderies} onChange={v => set('coutAtelierBroderies', v)} />
      <NumInput label="Sous traitance Maroc" rate="7€/h" value={data.sousTraitanceMaroc} onChange={v => set('sousTraitanceMaroc', v)} />
      <NumInput label="Sous traitance Mada" rate="7.5€/h" value={data.sousTraitanceMada} onChange={v => set('sousTraitanceMada', v)} />
    </div>
  );
}

function PresseTab({
  data,
  onChange,
}: {
  data: FabricationPresseData;
  onChange: (d: FabricationPresseData) => void;
}) {
  const set = <K extends keyof FabricationPresseData>(k: K, v: number) =>
    onChange({ ...data, [k]: v });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NumInput label="Cout atelier M2P PRESSE" rate="48€/h" value={data.coutAtelierPresse} onChange={v => set('coutAtelierPresse', v)} />
    </div>
  );
}

function ProdParisTab({
  data,
  onChange,
}: {
  data: FabricationProdParisData;
  onChange: (d: FabricationProdParisData) => void;
}) {
  const set = <K extends keyof FabricationProdParisData>(k: K, v: number) =>
    onChange({ ...data, [k]: v });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NumInput label="Cout atelier M2P Production/200M" rate="48€/h" value={data.coutAtelierProd200m} onChange={v => set('coutAtelierProd200m', v)} />
    </div>
  );
}

function ProdDelocTab({
  data,
  onChange,
}: {
  data: FabricationProdDelocData;
  onChange: (d: FabricationProdDelocData) => void;
}) {
  const set = <K extends keyof FabricationProdDelocData>(k: K, v: number) =>
    onChange({ ...data, [k]: v });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NumInput label="Sous traitance Maroc" rate="7€/h" value={data.sousTraitanceMaroc} onChange={v => set('sousTraitanceMaroc', v)} />
      <NumInput label="Sous traitance Mada" rate="7.5€/h" value={data.sousTraitanceMada} onChange={v => set('sousTraitanceMada', v)} />
    </div>
  );
}
