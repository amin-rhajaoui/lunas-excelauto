import { Calendar, Building2, User, FolderOpen, Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Combobox } from '@/components/ui/combobox';
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
  clientOptions?: string[];
  projetOptions?: string[];
  /** When true, show inline errors for required fields (Client, Projet, Date). */
  showValidationErrors?: boolean;
}

const requiredError = 'Champ obligatoire';

export default function HeaderForm({ data, onChange, clientOptions = [], projetOptions = [], showValidationErrors }: Props) {
  const set = <K extends keyof HeaderData>(key: K, value: HeaderData[K]) =>
    onChange({ ...data, [key]: value });

  const clientError = showValidationErrors && !data.client.trim();
  const projetError = showValidationErrors && !data.projet.trim();
  const dateError = showValidationErrors && !data.date.trim();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label>
          <User className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Client *
        </Label>
        <Combobox
          value={data.client}
          onChange={v => set('client', v)}
          options={clientOptions}
          placeholder="Nom du client"
          aria-invalid={clientError}
        />
        {clientError && (
          <p className="text-sm text-destructive" role="alert">
            {requiredError}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          <Building2 className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Société *
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
          Projet / Référence *
        </Label>
        <Combobox
          value={data.projet}
          onChange={v => set('projet', v)}
          options={projetOptions}
          placeholder="Référence du projet"
          aria-invalid={projetError}
        />
        {projetError && (
          <p className="text-sm text-destructive" role="alert">
            {requiredError}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          <Calendar className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Date *
        </Label>
        <Input
          type="date"
          required
          aria-required="true"
          aria-invalid={dateError}
          value={data.date}
          onChange={e => set('date', e.target.value)}
        />
        {dateError && (
          <p className="text-sm text-destructive" role="alert">
            {requiredError}
          </p>
        )}
      </div>
    </div>
  );
}
