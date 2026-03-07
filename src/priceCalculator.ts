import type { FormData } from './types';
import {
  ACTIVITES,
  RATE_BUREAU,
  RATE_PRESSE,
  RATE_M2P,
  RATE_MAROC,
  RATE_MADA,
  TRANSPORT_LUNAS,
  TRANSPORT_CHA,
} from './constants';

export interface SheetPrices {
  totalFrais: number;
  totalMatieres: number;
  totalFabrication: number;
  totalTransport: number;
  coutFabrication: number; // matieres + fab + transport
  activiteMultiplier: number; // 1 + activite%/100
  totalPrixDeRevient: number;
  prixDeVente: number[];
}

export interface AllPrices {
  collection: SheetPrices;
  presse: SheetPrices;
  prodParis: SheetPrices;
  prodDeloc: SheetPrices;
}

function computeFrais(form: FormData, piquageRate: number): number {
  const f = form.fraisEngages;
  const e9 = f.rechercheDevHeures * RATE_BUREAU;
  const e10 = f.creationDessinHeures * RATE_BUREAU;
  const e13 = f.programmePrestaQty * f.programmePrestaCoût;
  const e14 = f.cadreSerigraphieQty * f.cadreSerigraphieCoût;
  const e15 = f.piquageHeures * piquageRate;
  return e9 + e10 + e13 + e14 + e15;
}

function computeTransport(
  societe: string,
  totalMatieres: number,
  totalFab: number,
  hasCHA: boolean,
): number {
  if (societe === 'LUNAS') {
    return (totalFab + totalMatieres) * TRANSPORT_LUNAS;
  }
  if (hasCHA && societe === 'CHA') {
    return (totalFab + totalMatieres) * TRANSPORT_CHA;
  }
  return 0;
}

export function calculatePrices(form: FormData): AllPrices {
  const activitePercent = ACTIVITES[form.activite];
  const activiteMultiplier = 1 + activitePercent / 100;
  const societe = form.header.societe;

  // === Collection ===
  const collFrais = computeFrais(form, 0); // B15=0 for Collection
  const collMatiereBase = form.coutsMatieres.coutMatieresGalon;
  const collAlea = collMatiereBase * (form.coutsMatieres.aleaPercent / 100);
  const collMatieres = collMatiereBase + collAlea;
  const collFab = 30 * form.fabricationCollection.tempsCollection; // rate 30
  const collTransportLunas = societe === 'LUNAS' ? (collFab + collMatieres) * TRANSPORT_LUNAS : 0;
  const collTransportCHA = societe === 'CHA' ? (collFab + collMatieres) * TRANSPORT_CHA : 0;
  const collTransport = collTransportLunas + collTransportCHA;
  const collCoutFab = collMatieres + collFab + collTransport;
  const collPdR = collCoutFab * activiteMultiplier;
  const collPV1 = collPdR * form.margesCollection.pvCollection;
  const collPV2 = collFrais * form.margesCollection.pvFraisDessins;

  const collection: SheetPrices = {
    totalFrais: collFrais,
    totalMatieres: collMatieres,
    totalFabrication: collFab,
    totalTransport: collTransport,
    coutFabrication: collCoutFab,
    activiteMultiplier,
    totalPrixDeRevient: collPdR,
    prixDeVente: [collPV1, collPV2],
  };

  // === Presse ===
  const presseFrais = computeFrais(form, RATE_BUREAU); // B15=38
  const presseMatiereBase = form.coutsMatieres.coutMatieresGalon;
  const presseAlea = presseMatiereBase * (form.coutsMatieres.aleaPercent / 100);
  const presseMatieres = presseMatiereBase + presseAlea;
  const presseFab = RATE_PRESSE * form.fabricationPresse.coutAtelierPresse;
  const presseTransport = computeTransport(societe, presseMatieres, presseFab, true);
  const presseCoutFab = presseMatieres + presseFab + presseTransport;
  const pressePdR = presseCoutFab * activiteMultiplier;
  const pressePV = pressePdR * form.margesPresse.pvPresse;

  const presse: SheetPrices = {
    totalFrais: presseFrais,
    totalMatieres: presseMatieres,
    totalFabrication: presseFab,
    totalTransport: presseTransport,
    coutFabrication: presseCoutFab,
    activiteMultiplier,
    totalPrixDeRevient: pressePdR,
    prixDeVente: [pressePV],
  };

  // === Prod Paris ===
  const ppFrais = computeFrais(form, RATE_BUREAU);
  const ppMatiereBase = form.coutsMatieres.coutMatieresGalon;
  const ppAlea = ppMatiereBase * (form.coutsMatieres.aleaPercent / 100);
  const ppMatieres = ppMatiereBase + ppAlea;
  const ppFab = RATE_M2P * form.fabricationProdParis.coutAtelierProd200m;
  const ppTransport = computeTransport(societe, ppMatieres, ppFab, true);
  const ppCoutFab = ppMatieres + ppFab + ppTransport;
  const ppPdR = ppCoutFab * activiteMultiplier;
  const ppPV = ppPdR * form.margesProdParis.pvProdParis;

  const prodParis: SheetPrices = {
    totalFrais: ppFrais,
    totalMatieres: ppMatieres,
    totalFabrication: ppFab,
    totalTransport: ppTransport,
    coutFabrication: ppCoutFab,
    activiteMultiplier,
    totalPrixDeRevient: ppPdR,
    prixDeVente: [ppPV],
  };

  // === Prod Deloc ===
  const pdFrais = computeFrais(form, RATE_BUREAU);
  const pdMatiereBase = form.coutsMatieres.coutMatieresGalon;
  const pdAlea = pdMatiereBase * (form.coutsMatieres.aleaPercentProdDeloc / 100);
  const pdMatieres = pdMatiereBase + pdAlea;
  const pdFabMaroc = RATE_MAROC * form.fabricationProdDeloc.sousTraitanceMaroc;
  const pdFabMada = RATE_MADA * form.fabricationProdDeloc.sousTraitanceMada;
  const pdFab = pdFabMaroc + pdFabMada;
  // Prod deloc uses $G$2 (LUNAS only transport)
  const pdTransport = societe === 'LUNAS' ? (pdFab + pdMatieres) * TRANSPORT_LUNAS : 0;
  const pdCoutFab = pdMatieres + pdFab + pdTransport;
  const pdPdR = pdCoutFab * activiteMultiplier;
  const pdPVs = [
    pdPdR * form.margesProdDeloc.pv200_500,
    pdPdR * form.margesProdDeloc.pv501_2000,
    pdPdR * form.margesProdDeloc.pv2001_3500,
    pdPdR * form.margesProdDeloc.pvAbove3500,
  ];

  const prodDeloc: SheetPrices = {
    totalFrais: pdFrais,
    totalMatieres: pdMatieres,
    totalFabrication: pdFab,
    totalTransport: pdTransport,
    coutFabrication: pdCoutFab,
    activiteMultiplier,
    totalPrixDeRevient: pdPdR,
    prixDeVente: pdPVs,
  };

  return { collection, presse, prodParis, prodDeloc };
}
