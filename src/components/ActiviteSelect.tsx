import { ACTIVITES } from '../constants';
import type { ActiviteKey } from '../types';

interface Props {
  value: ActiviteKey;
  onChange: (value: ActiviteKey) => void;
}

const activiteKeys = Object.keys(ACTIVITES) as ActiviteKey[];

export default function ActiviteSelect({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Activite
        </label>
        <select
          value={value}
          onChange={e => onChange(e.target.value as ActiviteKey)}
          className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        >
          {activiteKeys.map(key => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Pourcentage activite
        </label>
        <div className="h-12 px-4 flex items-center rounded-lg border border-gray-200 bg-gray-50 text-base font-semibold text-blue-700">
          {ACTIVITES[value]}%
        </div>
      </div>
    </div>
  );
}
