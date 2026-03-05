import { useState } from 'react';
import { FileSpreadsheet, ChevronLeft, ChevronRight, Check } from 'lucide-react';
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

const STEPS = [
  { title: 'En-tete' },
  { title: 'Frais Engages' },
  { title: 'Couts Matieres' },
  { title: 'Fabrication' },
  { title: 'Activite' },
  { title: 'Marges' },
  { title: 'Generation' },
] as const;

function StepIndicator({
  steps,
  current,
  visited,
  onStepClick,
}: {
  steps: typeof STEPS;
  current: number;
  visited: Set<number>;
  onStepClick: (step: number) => void;
}) {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto mb-8">
      {steps.map((s, i) => {
        const isCompleted = visited.has(i) && i < current;
        const isCurrent = i === current;
        const isClickable = visited.has(i);

        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <button
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(i)}
              className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all shrink-0 ${
                isCurrent
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : isCompleted
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer'
                    : isClickable
                      ? 'bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer'
                      : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : i + 1}
            </button>
            <span
              className={`hidden md:block ml-2 text-xs font-medium whitespace-nowrap ${
                isCurrent ? 'text-blue-700' : isCompleted ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {s.title}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-3 rounded ${
                  visited.has(i + 1) ? 'bg-blue-200' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));

  const isValid =
    form.header.client.trim() !== '' &&
    form.header.projet.trim() !== '' &&
    form.header.date !== '';

  function goTo(target: number) {
    setStep(target);
    setVisited(prev => new Set([...prev, target]));
  }

  function next() {
    if (step < STEPS.length - 1) goTo(step + 1);
  }

  function prev() {
    if (step > 0) goTo(step - 1);
  }

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
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <StepIndicator
          steps={STEPS}
          current={step}
          visited={visited}
          onStepClick={goTo}
        />

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
              {step + 1}
            </span>
            {STEPS[step].title}
          </h3>

          {step === 0 && (
            <HeaderForm
              data={form.header}
              onChange={header => setForm(f => ({ ...f, header }))}
            />
          )}

          {step === 1 && (
            <FraisEngagesForm
              data={form.fraisEngages}
              onChange={fraisEngages => setForm(f => ({ ...f, fraisEngages }))}
            />
          )}

          {step === 2 && (
            <CoutsMatiereForm
              data={form.coutsMatieres}
              onChange={coutsMatieres => setForm(f => ({ ...f, coutsMatieres }))}
            />
          )}

          {step === 3 && (
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
          )}

          {step === 4 && (
            <ActiviteSelect
              value={form.activite}
              onChange={activite => setForm(f => ({ ...f, activite }))}
            />
          )}

          {step === 5 && (
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
          )}

          {step === 6 && (
            <div className="flex flex-col items-center py-8 gap-6">
              <p className="text-gray-600 text-center max-w-md">
                Verifiez vos informations puis cliquez sur le bouton ci-dessous pour generer votre fichier Excel.
              </p>

              <div className="w-full max-w-2xl space-y-4">
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
                <p className="text-sm text-red-500">
                  Veuillez remplir les champs obligatoires (Client, Projet, Date) dans l'en-tete.
                </p>
              )}
            </div>
          )}
        </section>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6 pb-12">
          {step > 0 ? (
            <button
              type="button"
              onClick={prev}
              className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Precedent
            </button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 && (
            <button
              type="button"
              onClick={next}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-sm transition"
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
