import { Calendar, Building2, User, FolderOpen, Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
      <div className="space-y-2">
        <Label>
          <User className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Client *
        </Label>
        <Input
          type="text"
          required
          value={data.client}
          onChange={e => set('client', e.target.value)}
          placeholder="Nom du client"
        />
      </div>

      <div className="space-y-2">
        <Label>
          <Building2 className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Societe *
        </Label>
        <Select value={data.societe} onValueChange={v => set('societe', v as Societe)}>
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LUNAS">LUNAS</SelectItem>
            <SelectItem value="CHA">CHA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>
          <Layers className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Collection
        </Label>
        <Input
          type="text"
          value={data.collection}
          onChange={e => set('collection', e.target.value)}
          placeholder="Nom de la collection"
        />
      </div>

      <div className="space-y-2">
        <Label>
          <FolderOpen className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Projet / Reference *
        </Label>
        <Input
          type="text"
          required
          value={data.projet}
          onChange={e => set('projet', e.target.value)}
          placeholder="Reference du projet"
        />
      </div>

      <div className="space-y-2">
        <Label>
          <Calendar className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Date *
        </Label>
        <Input
          type="date"
          required
          value={data.date}
          onChange={e => set('date', e.target.value)}
        />
      </div>
    </div>
  );
}
