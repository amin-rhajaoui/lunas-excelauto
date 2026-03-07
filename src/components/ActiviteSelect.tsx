import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
      <div className="space-y-2">
        <Label>Activite</Label>
        <Select value={value} onValueChange={v => onChange(v as ActiviteKey)}>
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {activiteKeys.map(key => (
              <SelectItem key={key} value={key}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Pourcentage activite</Label>
        <div className="h-10 px-4 flex items-center rounded-md border bg-muted text-sm font-semibold text-primary">
          {ACTIVITES[value]}%
        </div>
      </div>
    </div>
  );
}
