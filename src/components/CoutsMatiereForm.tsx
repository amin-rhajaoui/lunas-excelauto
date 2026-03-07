import type { CoutsMatieresData } from '../types';

interface Props {
  data: CoutsMatieresData;
  onChange: (data: CoutsMatieresData) => void;
}

export default function CoutsMatiereForm({ data, onChange }: Props) {
  const set = <K extends keyof CoutsMatieresData>(key: K, value: number) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Cout matieres du galon (€/m)
        </label>
        <input
          type="number"
          min={0}
          step={0.01}
          value={data.coutMatieresGalon || ''}
          placeholder="0"
          onChange={e => set('coutMatieresGalon', parseFloat(e.target.value) || 0)}
          className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          % alea (Collection / Presse / 200m)
        </label>
        <div className="relative">
          <input
            type="number"
            min={0}
            max={100}
            step={1}
            value={data.aleaPercent || ''}
            placeholder="0"
            onChange={e => set('aleaPercent', parseFloat(e.target.value) || 0)}
            className="w-full h-12 px-4 pr-10 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            %
          </span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          % matieres deloc (Prod deloc)
        </label>
        <div className="relative">
          <input
            type="number"
            min={0}
            max={100}
            step={1}
            value={data.aleaPercentProdDeloc || ''}
            placeholder="0"
            onChange={e => set('aleaPercentProdDeloc', parseFloat(e.target.value) || 0)}
            className="w-full h-12 px-4 pr-10 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            %
          </span>
        </div>
      </div>
    </div>
  );
}
