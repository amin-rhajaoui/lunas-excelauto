import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SHEET_COLORS } from '../lib/sheetColors';
import { formatTime, parseTime } from '../utils';
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

function TimeInput({
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
  const [text, setText] = useState(() => formatTime(value));

  useEffect(() => {
    setText(formatTime(value));
  }, [value]);

  return (
    <div className="space-y-2">
      <Label>
        {label}
        <span className="ml-2 text-xs font-normal text-muted-foreground">({rate})</span>
      </Label>
      <Input
        type="text"
        value={text}
        placeholder="0h00"
        onChange={e => setText(e.target.value)}
        onBlur={() => {
          const parsed = parseTime(text);
          onChange(parsed);
          setText(formatTime(parsed));
        }}
      />
    </div>
  );
}

export default function FabricationTabs(props: Props) {
  return (
    <Tabs defaultValue="collection">
      <TabsList className="mb-4">
        <TabsTrigger value="collection" className="gap-2">
          <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.collection.dot}`} />
          Collection
        </TabsTrigger>
        <TabsTrigger value="presse" className="gap-2">
          <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.presse.dot}`} />
          Presse
        </TabsTrigger>
        <TabsTrigger value="prodParis" className="gap-2">
          <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.prodParis.dot}`} />
          200m / Prod Paris
        </TabsTrigger>
        <TabsTrigger value="prodDeloc" className="gap-2">
          <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.prodDeloc.dot}`} />
          Prod deloc
        </TabsTrigger>
      </TabsList>

      <TabsContent value="collection">
        <div className={`rounded-lg border-l-4 ${SHEET_COLORS.collection.borderAccent} ${SHEET_COLORS.collection.border} ${SHEET_COLORS.collection.bgSubtle} p-4`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TimeInput label="Temps Collection" rate="30\u20AC/h" value={props.collection.tempsCollection} onChange={v => props.onChangeCollection({ ...props.collection, tempsCollection: v })} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="presse">
        <div className={`rounded-lg border-l-4 ${SHEET_COLORS.presse.borderAccent} ${SHEET_COLORS.presse.border} ${SHEET_COLORS.presse.bgSubtle} p-4`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TimeInput label="Cout atelier M2P PRESSE" rate="48\u20AC/h" value={props.presse.coutAtelierPresse} onChange={v => props.onChangePresse({ coutAtelierPresse: v })} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="prodParis">
        <div className={`rounded-lg border-l-4 ${SHEET_COLORS.prodParis.borderAccent} ${SHEET_COLORS.prodParis.border} ${SHEET_COLORS.prodParis.bgSubtle} p-4`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TimeInput label="Cout atelier M2P Production/200M" rate="48\u20AC/h" value={props.prodParis.coutAtelierProd200m} onChange={v => props.onChangeProdParis({ coutAtelierProd200m: v })} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="prodDeloc">
        <div className={`rounded-lg border-l-4 ${SHEET_COLORS.prodDeloc.borderAccent} ${SHEET_COLORS.prodDeloc.border} ${SHEET_COLORS.prodDeloc.bgSubtle} p-4`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TimeInput label="Sous traitance Maroc" rate="7\u20AC/h" value={props.prodDeloc.sousTraitanceMaroc} onChange={v => props.onChangeProdDeloc({ ...props.prodDeloc, sousTraitanceMaroc: v })} />
            <TimeInput label="Sous traitance Mada" rate="7.5\u20AC/h" value={props.prodDeloc.sousTraitanceMada} onChange={v => props.onChangeProdDeloc({ ...props.prodDeloc, sousTraitanceMada: v })} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
