import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      <div className="space-y-2">
        <Label>Cout matieres du galon (€/m)</Label>
        <Input
          type="number"
          min={0}
          step={0.01}
          value={data.coutMatieresGalon || ''}
          placeholder="0"
          onChange={e => set('coutMatieresGalon', parseFloat(e.target.value) || 0)}
        />
      </div>
      <div className="space-y-2">
        <Label>% alea (Collection / Presse / 200m)</Label>
        <div className="relative">
          <Input
            type="number"
            min={0}
            max={100}
            step={1}
            value={data.aleaPercent || ''}
            placeholder="0"
            onChange={e => set('aleaPercent', parseFloat(e.target.value) || 0)}
            className="pr-10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
            %
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <Label>% matieres deloc (Prod deloc)</Label>
        <div className="relative">
          <Input
            type="number"
            min={0}
            max={100}
            step={1}
            value={data.aleaPercentProdDeloc || ''}
            placeholder="0"
            onChange={e => set('aleaPercentProdDeloc', parseFloat(e.target.value) || 0)}
            className="pr-10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
            %
          </span>
        </div>
      </div>
    </div>
  );
}
