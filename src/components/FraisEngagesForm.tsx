import { useState, useEffect } from 'react';
import type { FraisEngagesData } from '../types';
import { formatTime, parseTime } from '../utils';

interface Props {
  data: FraisEngagesData;
  onChange: (data: FraisEngagesData) => void;
}

function NumInput({
  label,
  value,
  onChange,
  step = 1,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  suffix?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          min={0}
          step={step}
          value={value || ''}
          placeholder="0"
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function TimeInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [text, setText] = useState(() => formatTime(value));

  useEffect(() => {
    setText(formatTime(value));
  }, [value]);

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={text}
          placeholder="0h00"
          onChange={e => setText(e.target.value)}
          onBlur={() => {
            const parsed = parseTime(text);
            onChange(parsed);
            setText(formatTime(parsed));
          }}
          className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>
    </div>
  );
}

export default function FraisEngagesForm({ data, onChange }: Props) {
  const set = <K extends keyof FraisEngagesData>(key: K, value: number) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="space-y-6">
      {/* Frais Recherche & dessins */}
      <div>
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
          Frais Recherche & dessins
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TimeInput
            label="Recherche, dev, echantillons (heures)"
            value={data.rechercheDevHeures}
            onChange={v => set('rechercheDevHeures', v)}
          />
          <TimeInput
            label="Creation dessin technique (heures)"
            value={data.creationDessinHeures}
            onChange={v => set('creationDessinHeures', v)}
          />
        </div>
      </div>

      {/* Intervention prestataire externe */}
      <div>
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
          Intervention prestataire externe
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumInput
            label="Programme Presta externe - cout unitaire"
            value={data.programmePrestaCoût}
            onChange={v => set('programmePrestaCoût', v)}
            step={0.01}
            suffix="€"
          />
          <NumInput
            label="Programme Presta externe - quantite"
            value={data.programmePrestaQty}
            onChange={v => set('programmePrestaQty', v)}
          />
          <NumInput
            label="Cadre serigraphie - cout unitaire"
            value={data.cadreSerigraphieCoût}
            onChange={v => set('cadreSerigraphieCoût', v)}
            step={0.01}
            suffix="€"
          />
          <NumInput
            label="Cadre serigraphie - quantite"
            value={data.cadreSerigraphieQty}
            onChange={v => set('cadreSerigraphieQty', v)}
          />
          <TimeInput
            label="Piquage (heures)"
            value={data.piquageHeures}
            onChange={v => set('piquageHeures', v)}
          />
        </div>
      </div>

      {/* Industrialisation & Qualite */}
      <div>
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
          Industrialisation & Qualite
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TimeInput
            label="Etude industrialisation (heures)"
            value={data.etudeIndustrialisationHeures}
            onChange={v => set('etudeIndustrialisationHeures', v)}
          />
          <NumInput
            label="Test PRSL - cout unitaire"
            value={data.testPrslCoût}
            onChange={v => set('testPrslCoût', v)}
            step={0.01}
            suffix="€"
          />
          <NumInput
            label="Test PRSL - quantite"
            value={data.testPrslQty}
            onChange={v => set('testPrslQty', v)}
          />
          <NumInput
            label="Temps gradation - cout unitaire"
            value={data.tempsGradationCoût}
            onChange={v => set('tempsGradationCoût', v)}
            step={0.01}
            suffix="€"
          />
          <TimeInput
            label="Temps gradation (heures)"
            value={data.tempsGradationHeures}
            onChange={v => set('tempsGradationHeures', v)}
          />
        </div>
      </div>
    </div>
  );
}
