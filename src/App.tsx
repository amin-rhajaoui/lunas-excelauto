import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import HeaderForm from './components/HeaderForm';
import FraisEngagesForm from './components/FraisEngagesForm';
import CoutsMatiereForm from './components/CoutsMatiereForm';
import FabricationTabs from './components/FabricationTabs';
import ActiviteSelect from './components/ActiviteSelect';
import MargesForm from './components/MargesForm';
import GenerateButton from './components/GenerateButton';
import LivePreview from './components/LivePreview';
import { generateExcel } from './services/excelGenerator';
import {
  DEFAULT_TEMPS_GRADATION_COUT,
  DEFAULT_ALEA_PERCENT,
  DEFAULT_ALEA_PERCENT_DELOC,
} from './constants';
import type { FormData, ActiviteKey } from './types';

const today = new Date().toISOString().slice(0, 10);

const initialFormData: FormData = {
  header: {
    client: '',
    societe: 'LUNAS',
    collection: '',
    projet: '',
    date: today,
  },
  fraisEngages: {
    rechercheDevHeures: 0,
    creationDessinHeures: 0,
    programmePrestaCoût: 0,
    programmePrestaQty: 0,
    cadreSerigraphieCoût: 0,
    cadreSerigraphieQty: 0,
    piquageHeures: 0,
    etudeIndustrialisationHeures: 0,
    testPrslCoût: 0,
    testPrslQty: 0,
    tempsGradationCoût: DEFAULT_TEMPS_GRADATION_COUT,
    tempsGradationHeures: 0,
  },
  coutsMatieres: {
    coutMatieresGalon: 0,
    aleaPercent: DEFAULT_ALEA_PERCENT,
    aleaPercentProdDeloc: DEFAULT_ALEA_PERCENT_DELOC,
  },
  fabricationCollection: {
    tempsCollection: 0,
  },
  fabricationPresse: { coutAtelierPresse: 0 },
  fabricationProdParis: { coutAtelierProd200m: 0 },
  fabricationProdDeloc: { sousTraitanceMaroc: 0, sousTraitanceMada: 0 },
  activite: 'Manipulation textile 83%' as ActiviteKey,
  margesCollection: {
    pvCollection: 2.5,
    pvFraisDessins: 3,
    pvFraisTechnique: 2,
    prixVenteAnnonce: 0,
  },
  margesPresse: { pvPresse: 1.75, prixVenteAnnonce: 0 },
  margesProdParis: { pvProdParis: 1.3, prixVenteAnnonce: 0 },
  margesProdDeloc: {
    pv200_500: 2.5,
    pv501_2000: 1.9,
    pv2001_3500: 1.75,
    pvAbove3500: 1.55,
    prixVenteAnnonce200_500: 0,
    prixVenteAnnonce501_2000: 0,
    prixVenteAnnonce2001_3500: 0,
    prixVenteAnnonceAbove3500: 0,
  },
  commentaires: {
    collection: '',
    presse: '',
    prodParis: '',
    prodDeloc: '',
  },
};

const SECTIONS = [
  { id: 'en-tete', title: 'En-tete' },
  { id: 'frais-engages', title: 'Frais engages' },
  { id: 'couts-matieres', title: 'Couts matieres' },
  { id: 'fabrication', title: 'Fabrication' },
  { id: 'activite', title: 'Activite' },
  { id: 'marges', title: 'Marges' },
  { id: 'commentaires-generation', title: 'Commentaires & Generation' },
] as const;

function SectionTitle({ index, title }: { index: number; title: string }) {
  return (
    <h3 className="text-lg font-bold mb-5 flex items-center gap-3 pt-2 first:pt-0">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">
        {index}
      </span>
      {title}
    </h3>
  );
}

export default function App() {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  const isValid =
    form.header.client.trim() !== '' &&
    form.header.projet.trim() !== '' &&
    form.header.date !== '';

  async function handleGenerate() {
    if (!isValid) return;
    setLoading(true);
    try {
      await generateExcel(form);
    } catch (err) {
      console.error('Excel generation error:', err);
      alert('Erreur lors de la generation du fichier Excel.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b py-5 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
              Generateur Excel Tarification
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Generation automatique du fichier de tarification
            </p>
          </div>
        </div>
      </header>

      {/* Two-column layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-12 flex gap-6">
        <Card className="p-6 md:p-8 space-y-10 flex-1 min-w-0">
          {/* 1. En-tete */}
          <div id={SECTIONS[0].id}>
            <SectionTitle index={1} title={SECTIONS[0].title} />
            <HeaderForm
              data={form.header}
              onChange={header => setForm(f => ({ ...f, header }))}
            />
          </div>

          <Separator />

          {/* 2. Frais engages */}
          <div id={SECTIONS[1].id}>
            <SectionTitle index={2} title={SECTIONS[1].title} />
            <FraisEngagesForm
              data={form.fraisEngages}
              onChange={fraisEngages => setForm(f => ({ ...f, fraisEngages }))}
            />
          </div>

          <Separator />

          {/* 3. Couts matieres */}
          <div id={SECTIONS[2].id}>
            <SectionTitle index={3} title={SECTIONS[2].title} />
            <CoutsMatiereForm
              data={form.coutsMatieres}
              onChange={coutsMatieres => setForm(f => ({ ...f, coutsMatieres }))}
            />
          </div>

          <Separator />

          {/* 4. Fabrication */}
          <div id={SECTIONS[3].id}>
            <SectionTitle index={4} title={SECTIONS[3].title} />
            <FabricationTabs
              collection={form.fabricationCollection}
              presse={form.fabricationPresse}
              prodParis={form.fabricationProdParis}
              prodDeloc={form.fabricationProdDeloc}
              onChangeCollection={fabricationCollection =>
                setForm(f => ({ ...f, fabricationCollection }))
              }
              onChangePresse={fabricationPresse =>
                setForm(f => ({ ...f, fabricationPresse }))
              }
              onChangeProdParis={fabricationProdParis =>
                setForm(f => ({ ...f, fabricationProdParis }))
              }
              onChangeProdDeloc={fabricationProdDeloc =>
                setForm(f => ({ ...f, fabricationProdDeloc }))
              }
            />
          </div>

          <Separator />

          {/* 5. Activite */}
          <div id={SECTIONS[4].id}>
            <SectionTitle index={5} title={SECTIONS[4].title} />
            <ActiviteSelect
              value={form.activite}
              onChange={activite => setForm(f => ({ ...f, activite }))}
            />
          </div>

          <Separator />

          {/* 6. Marges */}
          <div id={SECTIONS[5].id}>
            <SectionTitle index={6} title={SECTIONS[5].title} />
            <MargesForm
              collection={form.margesCollection}
              presse={form.margesPresse}
              prodParis={form.margesProdParis}
              prodDeloc={form.margesProdDeloc}
              onChangeCollection={margesCollection =>
                setForm(f => ({ ...f, margesCollection }))
              }
              onChangePresse={margesPresse =>
                setForm(f => ({ ...f, margesPresse }))
              }
              onChangeProdParis={margesProdParis =>
                setForm(f => ({ ...f, margesProdParis }))
              }
              onChangeProdDeloc={margesProdDeloc =>
                setForm(f => ({ ...f, margesProdDeloc }))
              }
            />
          </div>

          <Separator />

          {/* 7. Commentaires & Generation */}
          <div id={SECTIONS[6].id}>
            <SectionTitle index={7} title={SECTIONS[6].title} />
            <p className="text-muted-foreground text-sm mb-4">
              Verifiez vos informations puis cliquez sur le bouton ci-dessous pour generer votre fichier Excel.
            </p>
            <div className="max-w-2xl space-y-4 mb-6">
              {([
                { key: 'collection' as const, label: 'Collection' },
                { key: 'presse' as const, label: 'Presse' },
                { key: 'prodParis' as const, label: 'Prod Paris' },
                { key: 'prodDeloc' as const, label: 'Prod Deloc' },
              ] as const).map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <Label>Commentaires — {label}</Label>
                  <textarea
                    rows={2}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder={`Commentaires pour la feuille ${label}...`}
                    value={form.commentaires[key]}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        commentaires: { ...f.commentaires, [key]: e.target.value },
                      }))
                    }
                  />
                </div>
              ))}
            </div>
            <GenerateButton
              onClick={handleGenerate}
              loading={loading}
              disabled={!isValid}
            />
            {!isValid && (
              <p className="text-sm text-destructive mt-3">
                Veuillez remplir les champs obligatoires (Client, Projet, Date) dans l'en-tete.
              </p>
            )}
          </div>
        </Card>

        {/* Sticky preview sidebar (hidden on mobile) */}
        <aside className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-6">
            <LivePreview form={form} />
          </div>
        </aside>
      </main>
    </div>
  );
}
