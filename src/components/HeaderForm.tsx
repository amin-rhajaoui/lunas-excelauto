import { Calendar, Building2, User, FolderOpen, Layers } from 'lucide-react';
import type { HeaderData, Societe } from '../types';

interface Props {
  data: HeaderData;
  onChange: (data: HeaderData) => void;
}

export default function HeaderForm({ data, onChange }: Props) {
  const set = <K extends keyof HeaderData>(key: K, value: HeaderData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          <User className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Client *
        </label>
        <input
          type="text"
          required
          value={data.client}
          onChange={e => set('client', e.target.value)}
          placeholder="ex: CHANEL"
          className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          <Building2 className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Societe *
        </label>
        <select
          value={data.societe}
          onChange={e => set('societe', e.target.value as Societe)}
          className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        >
          <option value="LUNAS">LUNAS</option>
          <option value="CHA">CHA</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          <Layers className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Collection
        </label>
        <input
          type="text"
          value={data.collection}
          onChange={e => set('collection', e.target.value)}
          placeholder="ex: 26K"
          className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          <FolderOpen className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Projet / Reference *
        </label>
        <input
          type="text"
          required
          value={data.projet}
          onChange={e => set('projet', e.target.value)}
          placeholder="ex: LF3635"
          className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          <Calendar className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Date *
        </label>
        <input
          type="date"
          required
          value={data.date}
          onChange={e => set('date', e.target.value)}
          className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>
    </div>
  );
}
