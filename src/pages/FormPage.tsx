import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Eye } from 'lucide-react';
import HeaderForm from '../components/HeaderForm';
import FraisEngagesForm from '../components/FraisEngagesForm';
import CoutsMatiereForm from '../components/CoutsMatiereForm';
import FabricationTabs from '../components/FabricationTabs';
import ActiviteSelect from '../components/ActiviteSelect';
import MargesForm from '../components/MargesForm';
import GenerateButton from '../components/GenerateButton';
import LivePreview from '../components/LivePreview';
import { generateExcel } from '../services/excelGenerator';
import { saveTarification } from '../services/tarificationService';
import { useClientProjetOptions } from '../hooks/use-client-projet-options';
import {
  DEFAULT_TEMPS_GRADATION_COUT,
  DEFAULT_ALEA_PERCENT,
  DEFAULT_ALEA_PERCENT_DELOC,
} from '../constants';
import type { FormData, ActiviteKey } from '../types';

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
    <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-3 rounded-lg bg-muted/50 py-3 pl-4 pr-4 border-l-4 border-primary/40 first:pt-3">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
        {index}
      </span>
      {title}
    </h2>
  );
}

export default function FormPage() {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [sectionSelectValue, setSectionSelectValue] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const { clientOptions, projetOptions } = useClientProjetOptions(form.header.client, refreshKey);

  const isValid =
    form.header.client.trim() !== '' &&
    form.header.projet.trim() !== '' &&
    form.header.date !== '';

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  async function handleGenerate() {
    if (!isValid) {
      setShowValidationErrors(true);
      return;
    }
    setLoading(true);
    try {
      await generateExcel(form);
      await saveTarification(form);
      setRefreshKey(k => k + 1);
      toast.success('Excel généré et tarification sauvegardée');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Erreur lors de la génération du fichier Excel.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-6 relative pb-24 lg:pb-0">
      <Card className="p-6 md:p-8 flex-1 min-w-0">
        {/* Mobile: menu "Aller à la section" + bouton aperçu */}
        <div className="lg:hidden mb-6 flex flex-col sm:flex-row gap-3 sm:items-end">
          <div className="flex-1 min-w-0">
            <Label className="text-muted-foreground text-xs font-medium mb-2 block">Aller à la section</Label>
            <Select
            value={sectionSelectValue}
            onValueChange={(id) => {
              if (id) {
                scrollToSection(id);
                setSectionSelectValue('');
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir une section..." />
            </SelectTrigger>
            <SelectContent>
              {SECTIONS.map((s, i) => (
                <SelectItem key={s.id} value={s.id}>
                  {i + 1}. {s.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          </div>
          <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="default" className="gap-2 shrink-0">
                  <Eye className="size-4" />
                  Voir l'aperçu des prix
                </Button>
              }
            />
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Aperçu des prix</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <LivePreview form={form} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="space-y-12">
          {/* 1. En-tête */}
          <div id={SECTIONS[0].id} className="scroll-mt-6">
            <SectionTitle index={1} title={SECTIONS[0].title} />
            <HeaderForm
            data={form.header}
            onChange={header => setForm(f => ({ ...f, header }))}
            clientOptions={clientOptions}
            projetOptions={projetOptions}
            showValidationErrors={showValidationErrors}
          />
        </div>

        {/* 2. Frais engagés */}
        <div id={SECTIONS[1].id} className="scroll-mt-6">
          <SectionTitle index={2} title={SECTIONS[1].title} />
          <FraisEngagesForm
            data={form.fraisEngages}
            onChange={fraisEngages => setForm(f => ({ ...f, fraisEngages }))}
          />
        </div>

        {/* 3. Coûts matières */}
        <div id={SECTIONS[2].id} className="scroll-mt-6">
          <SectionTitle index={3} title={SECTIONS[2].title} />
          <CoutsMatiereForm
            data={form.coutsMatieres}
            onChange={coutsMatieres => setForm(f => ({ ...f, coutsMatieres }))}
          />
        </div>

        {/* 4. Fabrication */}
        <div id={SECTIONS[3].id} className="scroll-mt-6">
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
        <div id={SECTIONS[4].id} className="scroll-mt-6">
          <SectionTitle index={5} title={SECTIONS[4].title} />
          <ActiviteSelect
            value={form.activite}
            onChange={activite => setForm(f => ({ ...f, activite }))}
          />
        </div>

        {/* 6. Marges */}
        <div id={SECTIONS[5].id} className="scroll-mt-6">
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
        <div id={SECTIONS[6].id} className="scroll-mt-6">
          <SectionTitle index={7} title={SECTIONS[6].title} />
          <p className="text-muted-foreground text-sm mb-4">
            Vérifiez vos informations puis cliquez sur le bouton ci-dessous pour générer votre fichier Excel.
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
                <Textarea
                  rows={2}
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
              Veuillez remplir les champs obligatoires (Client, Projet, Date) dans l'en-tête.
            </p>
          )}
        </div>
        </div>
      </Card>

      {/* Sticky sidebar: sommaire + aperçu (hidden on mobile) */}
      <aside className="hidden lg:block w-80 shrink-0">
        <div className="sticky top-6 space-y-4">
          <nav aria-label="Sommaire du formulaire" className="rounded-lg border bg-card p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Sommaire</p>
            <ul className="space-y-0.5">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(s.id)}
                    className="w-full text-left text-sm py-1.5 px-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <span className="text-muted-foreground tabular-nums">{i + 1}.</span>{' '}
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <LivePreview form={form} />
        </div>
      </aside>

      {/* Mobile: barre sticky avec bouton Générer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-3">
        <div className="max-w-4xl mx-auto">
          <GenerateButton
            onClick={handleGenerate}
            loading={loading}
            disabled={!isValid}
          />
          {!isValid && (
            <p className="text-xs text-destructive mt-2 text-center">
              Remplissez Client, Projet et Date (en-tête) pour générer.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
