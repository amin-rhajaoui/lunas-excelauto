import { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import HeaderForm from './components/HeaderForm';
import FraisEngagesForm from './components/FraisEngagesForm';
import CoutsMatiereForm from './components/CoutsMatiereForm';
import FabricationTabs from './components/FabricationTabs';
import ActiviteSelect from './components/ActiviteSelect';
import MargesForm from './components/MargesForm';
import GenerateButton from './components/GenerateButton';
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
  },
  margesPresse: { pvPresse: 1.75 },
  margesProdParis: { pvProdParis: 1.3 },
  margesProdDeloc: {
    pv200_500: 2.5,
    pv501_2000: 1.9,
    pv2001_3500: 1.75,
    pvAbove3500: 1.55,
  },
  commentaires: {
    collection: '',
    presse: '',
    prodParis: '',
    prodDeloc: '',
  },
};

const SECTIONS = [
  { id: 'en-tete', title: 'En-tête' },
  { id: 'frais-engages', title: 'Frais engagés' },
  { id: 'couts-matieres', title: 'Coûts matières' },
  { id: 'fabrication', title: 'Fabrication' },
  { id: 'activite', title: 'Activité' },
  { id: 'marges', title: 'Marges' },
  { id: 'commentaires-generation', title: 'Commentaires & Génération' },
] as const;

function SectionTitle({ index, title }: { index: number; title: string }) {
  return (
    <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-3 pt-2 first:pt-0">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold shrink-0">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-violet-700 text-white py-8 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <FileSpreadsheet className="w-10 h-10 opacity-90" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Generateur Excel Tarification
            </h1>
            <p className="text-blue-200 text-sm mt-1">
              Lunas / CHA — Generation automatique du fichier de tarification
            </p>
          </div>
        </div>
      </header>

      {/* Form — une seule page avec sections */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 pb-12">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-10">
          {/* 1. En-tête */}
          <div id={SECTIONS[0].id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <SectionTitle index={1} title={SECTIONS[0].title} />
            <HeaderForm
              data={form.header}
              onChange={header => setForm(f => ({ ...f, header }))}
            />
          </div>

          {/* 2. Frais engagés */}
          <div id={SECTIONS[1].id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <SectionTitle index={2} title={SECTIONS[1].title} />
            <FraisEngagesForm
              data={form.fraisEngages}
              onChange={fraisEngages => setForm(f => ({ ...f, fraisEngages }))}
            />
          </div>

          {/* 3. Coûts matières */}
          <div id={SECTIONS[2].id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <SectionTitle index={3} title={SECTIONS[2].title} />
            <CoutsMatiereForm
              data={form.coutsMatieres}
              onChange={coutsMatieres => setForm(f => ({ ...f, coutsMatieres }))}
            />
          </div>

          {/* 4. Fabrication */}
          <div id={SECTIONS[3].id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
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

          {/* 5. Activité */}
          <div id={SECTIONS[4].id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <SectionTitle index={5} title={SECTIONS[4].title} />
            <ActiviteSelect
              value={form.activite}
              onChange={activite => setForm(f => ({ ...f, activite }))}
            />
          </div>

          {/* 6. Marges */}
          <div id={SECTIONS[5].id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
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

          {/* 7. Commentaires & Génération */}
          <div id={SECTIONS[6].id}>
            <SectionTitle index={7} title={SECTIONS[6].title} />
            <p className="text-gray-600 text-sm mb-4">
              Verifiez vos informations puis cliquez sur le bouton ci-dessous pour generer votre fichier Excel.
            </p>
            <div className="max-w-2xl space-y-4 mb-6">
              {([
                { key: 'collection' as const, label: 'Collection' },
                { key: 'presse' as const, label: 'Presse' },
                { key: 'prodParis' as const, label: 'Prod Paris' },
                { key: 'prodDeloc' as const, label: 'Prod Deloc' },
              ] as const).map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Commentaires — {label}
                  </label>
                  <textarea
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
              <p className="text-sm text-red-500 mt-3">
                Veuillez remplir les champs obligatoires (Client, Projet, Date) dans l'en-tête.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
