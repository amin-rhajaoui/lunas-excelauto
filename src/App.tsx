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
    tempsPresse: 0,
    coutAtelierManipTextile: 0,
    coutAtelierBroderies: 0,
    sousTraitanceMaroc: 0,
    sousTraitanceMada: 0,
  },
  fabricationPresse: {
    tempsCollection: 0,
    tempsPresse: 0,
    coutAtelierPresse: 0,
  },
  fabricationProdParis: {
    tempsCollection: 0,
    tempsPresse: 0,
    coutAtelierProd200m: 0,
  },
  fabricationProdDeloc: {
    tempsCollection: 0,
    tempsPresse: 0,
    coutAtelierManipTextile: 0,
    coutAtelierBroderies: 0,
    sousTraitanceMaroc: 0,
    sousTraitanceMada: 0,
  },
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
};

function Section({
  title,
  number,
  children,
}: {
  title: string;
  number: number;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
          {number}
        </span>
        {title}
      </h3>
      {children}
    </section>
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

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-6">
        <Section title="En-tete" number={0}>
          <HeaderForm
            data={form.header}
            onChange={header => setForm(f => ({ ...f, header }))}
          />
        </Section>

        <Section title="Frais Engages" number={1}>
          <FraisEngagesForm
            data={form.fraisEngages}
            onChange={fraisEngages => setForm(f => ({ ...f, fraisEngages }))}
          />
        </Section>

        <Section title="Couts des Matieres" number={2}>
          <CoutsMatiereForm
            data={form.coutsMatieres}
            onChange={coutsMatieres => setForm(f => ({ ...f, coutsMatieres }))}
          />
        </Section>

        <Section title="Fabrication" number={3}>
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
        </Section>

        <Section title="Activite" number={5}>
          <ActiviteSelect
            value={form.activite}
            onChange={activite => setForm(f => ({ ...f, activite }))}
          />
        </Section>

        <Section title="Marges / Prix de Vente" number={6}>
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
        </Section>

        {/* Generate */}
        <div className="flex justify-center pt-4 pb-12">
          <GenerateButton
            onClick={handleGenerate}
            loading={loading}
            disabled={!isValid}
          />
        </div>
      </main>
    </div>
  );
}
