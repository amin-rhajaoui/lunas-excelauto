import type { Worksheet } from 'exceljs';
import type { FormData } from '../../types';
import { ACTIVITES, RATE_BUREAU, TRANSPORT_LUNAS, TRANSPORT_CHA } from '../../constants';
import {
  YELLOW_FILL, BRIGHT_YELLOW_FILL, SECTION_FILL, PERIWINKLE_FILL,
  FONT_WARNING, FONT_HEADER, FONT_TITLE, FONT_DATA, FONT_DATA_BOLD,
  FONT_DATE, FONT_SUB_HEADER, FONT_SMALL,
  BORDER_THIN_ALL, BORDER_MEDIUM_ALL,
  ALIGN_CENTER, ALIGN_LEFT,
  FMT_EURO, FMT_EURO_ACCOUNTING, FMT_PERCENT, FMT_DECIMAL2, FMT_INT, FMT_DATE,
} from './sharedStyles';

export function buildCollectionSheet(ws: Worksheet, form: FormData) {
  // Column widths
  ws.getColumn('A').width = 93.66;
  ws.getColumn('B').width = 45.55;
  ws.getColumn('C').width = 12.89;
  ws.getColumn('D').width = 23.11;
  ws.getColumn('E').width = 27.44;
  ws.getColumn('F').width = 17.55;
  ws.getColumn('G').width = 23.11;
  ws.getColumn('H').width = 38.89;

  // === ROW 1: Warning ===
  ws.getRow(1).height = 21.6;
  const a1 = ws.getCell('A1');
  a1.value = 'Veiller à bien remplir tous les * et les cases en jaune';
  a1.font = FONT_WARNING;

  // === ROWS 2-5: Header ===
  ws.getRow(2).height = 24.9;
  ws.getRow(3).height = 24.9;
  ws.getRow(4).height = 24.9;
  ws.getRow(5).height = 43.8;

  // Row 2
  ws.getCell('A2').value = 'CLIENT * :';
  ws.getCell('A2').font = FONT_HEADER;
  ws.getCell('B2').value = form.header.client;
  ws.getCell('B2').font = FONT_HEADER;
  ws.getCell('B2').fill = YELLOW_FILL;
  ws.getCell('G2').value = 'SOCIETE * :';
  ws.getCell('G2').font = FONT_HEADER;
  ws.getCell('H2').value = form.header.societe;
  ws.getCell('H2').font = FONT_HEADER;
  ws.getCell('H2').fill = YELLOW_FILL;

  // Row 3
  ws.getCell('A3').value = 'COLLECTION :';
  ws.getCell('A3').font = FONT_HEADER;
  ws.getCell('B3').value = form.header.collection;
  ws.getCell('B3').font = FONT_HEADER;
  ws.getCell('B3').fill = YELLOW_FILL;

  // Row 4
  ws.getCell('A4').value = 'PROJET / REFERENCE * :';
  ws.getCell('A4').font = FONT_HEADER;
  ws.getCell('B4').value = form.header.projet;
  ws.getCell('B4').font = FONT_HEADER;
  ws.getCell('B4').fill = YELLOW_FILL;

  // Title E4 (merged E4:H5)
  ws.mergeCells('E4:H5');
  ws.getCell('E4').value = 'PRIX COLLECTION';
  ws.getCell('E4').font = FONT_TITLE;
  ws.getCell('E4').fill = PERIWINKLE_FILL;
  ws.getCell('E4').alignment = ALIGN_CENTER;

  // Row 5
  ws.getCell('A5').value = 'DATE * :';
  ws.getCell('A5').font = FONT_HEADER;
  const dateVal = form.header.date ? new Date(form.header.date) : new Date();
  ws.getCell('B5').value = dateVal;
  ws.getCell('B5').font = FONT_DATE;
  ws.getCell('B5').fill = YELLOW_FILL;
  ws.getCell('B5').numFmt = FMT_DATE;

  // === ROW 6: Section 1 Header ===
  ws.getRow(6).height = 29.4;
  ws.mergeCells('A6:H6');
  ws.getCell('A6').value = '1- FRAIS ENGAGES';
  ws.getCell('A6').font = FONT_DATA_BOLD;
  ws.getCell('A6').fill = SECTION_FILL;
  ws.getCell('A6').border = BORDER_MEDIUM_ALL;
  ws.getCell('A6').alignment = ALIGN_LEFT;

  // === ROW 7: Column headers ===
  ws.getRow(7).height = 72;
  const headers7 = ['Désignation', 'Coût unitaire', 'Unité', 'Unités Nécessaires', 'Prix de revient HT'];
  const cols7 = ['A', 'B', 'C', 'D', 'E'];
  cols7.forEach((col, i) => {
    const cell = ws.getCell(`${col}7`);
    cell.value = headers7[i];
    cell.font = FONT_DATA_BOLD;
    cell.border = BORDER_MEDIUM_ALL;
    cell.alignment = ALIGN_CENTER;
  });

  // === ROW 8: Sub-header ===
  ws.getRow(8).height = 28.8;
  ws.getCell('A8').value = 'Frais Recherche & dessins';
  ws.getCell('A8').font = FONT_DATA_BOLD;

  // === ROWS 9-10: Recherche & Création ===
  for (const r of [9, 10]) ws.getRow(r).height = 28.8;

  ws.getCell('A9').value = 'Recherche, développement, échantillons';
  ws.getCell('A9').font = FONT_DATA;
  ws.getCell('B9').value = RATE_BUREAU;
  ws.getCell('B9').font = FONT_DATA;
  ws.getCell('B9').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('C9').value = 'heure';
  ws.getCell('C9').font = FONT_DATA;
  ws.getCell('D9').value = form.fraisEngages.rechercheDevHeures;
  ws.getCell('D9').font = FONT_DATA;
  ws.getCell('D9').fill = YELLOW_FILL;
  ws.getCell('E9').value = { formula: 'D9*B9' };
  ws.getCell('E9').numFmt = FMT_EURO;

  ws.getCell('A10').value = 'Création dessin technique';
  ws.getCell('A10').font = FONT_DATA;
  ws.getCell('B10').value = RATE_BUREAU;
  ws.getCell('B10').font = FONT_DATA;
  ws.getCell('B10').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('C10').value = 'heure';
  ws.getCell('C10').font = FONT_DATA;
  ws.getCell('D10').value = form.fraisEngages.creationDessinHeures;
  ws.getCell('D10').font = FONT_DATA;
  ws.getCell('D10').fill = YELLOW_FILL;
  ws.getCell('E10').value = { formula: 'D10*B10' };
  ws.getCell('E10').numFmt = FMT_EURO;

  // === ROW 12: Sub-header ===
  ws.getRow(12).height = 28.8;
  ws.getCell('A12').value = 'Intervention prestataire externe';
  ws.getCell('A12').font = FONT_DATA_BOLD;

  // === ROWS 13-15 ===
  for (const r of [13, 14, 15]) ws.getRow(r).height = 28.8;

  ws.getCell('A13').value = 'Programme Presta externe';
  ws.getCell('A13').font = FONT_DATA;
  ws.getCell('B13').value = form.fraisEngages.programmePrestaCoût;
  ws.getCell('B13').font = FONT_DATA;
  ws.getCell('B13').fill = YELLOW_FILL;
  ws.getCell('B13').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('C13').value = 'Forfait';
  ws.getCell('C13').font = FONT_DATA;
  ws.getCell('D13').value = form.fraisEngages.programmePrestaQty;
  ws.getCell('D13').font = FONT_DATA;
  ws.getCell('D13').fill = YELLOW_FILL;
  ws.getCell('E13').value = { formula: 'D13*B13' };
  ws.getCell('E13').numFmt = FMT_EURO;

  ws.getCell('A14').value = 'Cadre sérigraphie';
  ws.getCell('A14').font = FONT_DATA;
  ws.getCell('B14').value = form.fraisEngages.cadreSerigraphieCoût;
  ws.getCell('B14').font = FONT_DATA;
  ws.getCell('B14').fill = YELLOW_FILL;
  ws.getCell('B14').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('C14').value = 'Forfait';
  ws.getCell('C14').font = FONT_DATA;
  ws.getCell('D14').value = form.fraisEngages.cadreSerigraphieQty;
  ws.getCell('D14').font = FONT_DATA;
  ws.getCell('D14').fill = YELLOW_FILL;
  ws.getCell('E14').value = { formula: 'D14*B14' };
  ws.getCell('E14').numFmt = FMT_EURO;

  // B15=0 for Collection sheet (not 38)
  ws.getCell('A15').value = 'Piquage';
  ws.getCell('A15').font = FONT_DATA;
  ws.getCell('B15').value = 0;
  ws.getCell('B15').font = FONT_DATA;
  ws.getCell('B15').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('C15').value = 'heure';
  ws.getCell('C15').font = FONT_DATA;
  ws.getCell('D15').value = form.fraisEngages.piquageHeures;
  ws.getCell('D15').font = FONT_DATA;
  ws.getCell('D15').fill = YELLOW_FILL;
  ws.getCell('E15').value = { formula: 'D15*B15' };
  ws.getCell('E15').numFmt = FMT_EURO;

  // === ROW 17: Sub-header ===
  ws.getRow(17).height = 28.8;
  ws.getCell('A17').value = 'Industrialisation & Qualité';
  ws.getCell('A17').font = FONT_DATA_BOLD;

  // === ROWS 18-20 ===
  for (const r of [18, 19, 20]) ws.getRow(r).height = 28.8;

  ws.getCell('A18').value = 'Etude industrialisation';
  ws.getCell('A18').font = FONT_DATA;
  ws.getCell('B18').value = RATE_BUREAU;
  ws.getCell('B18').font = FONT_DATA;
  ws.getCell('B18').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('C18').value = 'heure';
  ws.getCell('C18').font = FONT_DATA;
  ws.getCell('D18').value = form.fraisEngages.etudeIndustrialisationHeures;
  ws.getCell('D18').font = FONT_DATA;
  ws.getCell('D18').fill = YELLOW_FILL;
  ws.getCell('E18').value = { formula: 'B18*D18' };
  ws.getCell('E18').numFmt = FMT_EURO;

  ws.getCell('A19').value = 'Test PRSL';
  ws.getCell('A19').font = FONT_DATA;
  ws.getCell('B19').value = form.fraisEngages.testPrslCoût;
  ws.getCell('B19').font = FONT_DATA;
  ws.getCell('B19').fill = YELLOW_FILL;
  ws.getCell('B19').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('C19').value = 'unité';
  ws.getCell('C19').font = FONT_DATA;
  ws.getCell('D19').value = form.fraisEngages.testPrslQty;
  ws.getCell('D19').font = FONT_DATA;
  ws.getCell('D19').fill = YELLOW_FILL;
  ws.getCell('E19').value = { formula: 'B19*D19' };
  ws.getCell('E19').numFmt = FMT_EURO;

  ws.getCell('A20').value = 'Temps gradation ';
  ws.getCell('A20').font = FONT_DATA;
  ws.getCell('B20').value = form.fraisEngages.tempsGradationCoût;
  ws.getCell('B20').font = FONT_DATA;
  ws.getCell('B20').fill = YELLOW_FILL;
  ws.getCell('B20').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('C20').value = 'heure';
  ws.getCell('C20').font = FONT_DATA;
  ws.getCell('D20').value = form.fraisEngages.tempsGradationHeures;
  ws.getCell('D20').font = FONT_DATA;
  ws.getCell('D20').fill = YELLOW_FILL;
  ws.getCell('E20').value = { formula: 'B20*D20' };
  ws.getCell('E20').numFmt = FMT_EURO;

  // === ROW 22: Total frais ===
  ws.getRow(22).height = 29.4;
  ws.getCell('A22').value = 'TOTAL FRAIS ENGAGES COLLECTION';
  ws.getCell('A22').font = FONT_DATA_BOLD;
  ws.getCell('A22').fill = SECTION_FILL;
  ws.getCell('E22').value = { formula: 'SUM(E9:E15)' };
  ws.getCell('E22').numFmt = FMT_EURO;
  ws.getCell('E22').font = FONT_DATA_BOLD;
  ws.getCell('E22').fill = SECTION_FILL;

  // === ROW 24: Section 2 ===
  ws.getRow(24).height = 29.4;
  ws.mergeCells('A24:H24');
  ws.getCell('A24').value = '2- COUTS DES MATIERES';
  ws.getCell('A24').font = FONT_DATA_BOLD;
  ws.getCell('A24').fill = SECTION_FILL;
  ws.getCell('A24').border = BORDER_MEDIUM_ALL;
  ws.getCell('A24').alignment = ALIGN_LEFT;

  // ROW 25: Sub-header
  ws.getRow(25).height = 42.6;
  ws.mergeCells('D25:E25');
  ws.getCell('D25').value = 'Coût necessaire par unité';
  ws.getCell('D25').font = FONT_SUB_HEADER;
  ws.getCell('D25').alignment = ALIGN_CENTER;
  ws.mergeCells('F25:H29');
  ws.getCell('F25').value = 'Commentaires :';
  ws.getCell('F25').font = FONT_DATA;

  // ROW 26: Cout matieres
  ws.getRow(26).height = 28.8;
  ws.getCell('A26').value = 'Coût matieres du galon au mtrs (fils ou autres)';
  ws.getCell('A26').font = FONT_DATA;
  ws.getCell('E26').value = form.coutsMatieres.coutMatieresGalon;
  ws.getCell('E26').font = FONT_DATA;
  ws.getCell('E26').fill = YELLOW_FILL;
  ws.getCell('E26').numFmt = FMT_EURO;

  // ROW 28: % alea
  ws.getRow(28).height = 28.8;
  ws.getCell('A28').value = '% alea';
  ws.getCell('A28').font = FONT_DATA;
  ws.getCell('B28').value = 0.05;
  ws.getCell('B28').font = FONT_DATA;
  ws.getCell('B28').numFmt = FMT_PERCENT;
  ws.getCell('D28').value = form.coutsMatieres.aleaPercent;
  ws.getCell('D28').font = FONT_DATA;
  ws.getCell('D28').fill = YELLOW_FILL;
  ws.getCell('D28').numFmt = FMT_PERCENT;
  ws.getCell('E28').value = { formula: 'E26*D28' };
  ws.getCell('E28').numFmt = FMT_EURO;

  // ROW 30: Total matieres
  ws.getRow(30).height = 30.6;
  ws.getCell('A30').value = 'TOTAL MATIERES';
  ws.getCell('A30').font = FONT_DATA_BOLD;
  ws.getCell('A30').fill = SECTION_FILL;
  ws.getCell('E30').value = { formula: 'E26+E28' };
  ws.getCell('E30').numFmt = FMT_EURO;
  ws.getCell('E30').font = FONT_DATA_BOLD;
  ws.getCell('E30').fill = SECTION_FILL;

  // === SECTION 3: Fabrication ===
  ws.getRow(32).height = 29.4;
  ws.mergeCells('A32:H32');
  ws.getCell('A32').value = '3- TEMPS DE FABRICATION';
  ws.getCell('A32').font = FONT_DATA_BOLD;
  ws.getCell('A32').fill = SECTION_FILL;
  ws.getCell('A32').border = BORDER_MEDIUM_ALL;
  ws.getCell('A32').alignment = ALIGN_LEFT;

  // ROW 33: Fabrication column headers
  ws.getRow(33).height = 58.2;
  const fabHeaders = ['Désignation', 'Coût unitaire', 'Unité', 'Unités Nécessaires', 'Prix de revient HT'];
  cols7.forEach((col, i) => {
    const cell = ws.getCell(`${col}33`);
    cell.value = fabHeaders[i];
    cell.font = FONT_DATA_BOLD;
    cell.border = BORDER_MEDIUM_ALL;
    cell.alignment = ALIGN_CENTER;
  });

  // Fabrication rows 34-39
  const fabRows: Array<{
    row: number;
    label: string;
    rate: number;
    field: keyof typeof form.fabricationCollection;
    hasFormula: boolean;
  }> = [
    { row: 34, label: 'Temps Collection', rate: 30, field: 'tempsCollection', hasFormula: true },
    { row: 35, label: 'temps Presse', rate: 30, field: 'tempsPresse', hasFormula: false },
    { row: 36, label: 'Cout atelier M2P Manip Textile', rate: 48, field: 'coutAtelierManipTextile', hasFormula: false },
    { row: 37, label: 'Coût atelier M2P broderies', rate: 58, field: 'coutAtelierBroderies', hasFormula: true },
    { row: 38, label: 'Sous traitance deloc Maroc', rate: 7, field: 'sousTraitanceMaroc', hasFormula: true },
    { row: 39, label: 'Sous traitance deloc Mada', rate: 7.5, field: 'sousTraitanceMada', hasFormula: true },
  ];

  for (const fr of fabRows) {
    ws.getRow(fr.row).height = 28.8;
    ws.getCell(`A${fr.row}`).value = fr.label;
    ws.getCell(`A${fr.row}`).font = FONT_DATA;
    ws.getCell(`B${fr.row}`).value = fr.rate;
    ws.getCell(`B${fr.row}`).font = FONT_DATA;
    ws.getCell(`B${fr.row}`).numFmt = FMT_EURO_ACCOUNTING;
    ws.getCell(`C${fr.row}`).value = 'heure';
    ws.getCell(`C${fr.row}`).font = FONT_DATA;
    ws.getCell(`D${fr.row}`).value = form.fabricationCollection[fr.field];
    ws.getCell(`D${fr.row}`).font = FONT_DATA;
    ws.getCell(`D${fr.row}`).fill = YELLOW_FILL;
    if (fr.hasFormula) {
      ws.getCell(`E${fr.row}`).value = { formula: `B${fr.row}*D${fr.row}` };
      ws.getCell(`E${fr.row}`).numFmt = FMT_EURO_ACCOUNTING;
    }
  }

  // ROW 41: Total fabrication
  ws.getRow(41).height = 29.4;
  ws.getCell('A41').value = 'TOTAL FABRICATION';
  ws.getCell('A41').font = FONT_DATA_BOLD;
  ws.getCell('A41').fill = SECTION_FILL;
  ws.getCell('E41').value = { formula: 'SUM(E34:E39)' };
  ws.getCell('E41').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E41').font = FONT_DATA_BOLD;
  ws.getCell('E41').fill = SECTION_FILL;

  // === SECTION 4: Transport ===
  ws.getRow(43).height = 29.4;
  ws.mergeCells('A43:H43');
  ws.getCell('A43').value = '4- TRANSPORT';
  ws.getCell('A43').font = FONT_DATA_BOLD;
  ws.getCell('A43').fill = SECTION_FILL;
  ws.getCell('A43').border = BORDER_MEDIUM_ALL;
  ws.getCell('A43').alignment = ALIGN_LEFT;

  // ROW 44: Transport header
  ws.getRow(44).height = 28.8;
  ws.getCell('A44').value = 'Transport';
  ws.getCell('A44').font = FONT_DATA;
  ws.getCell('E44').value = 'LUNAS';
  ws.getCell('E44').font = FONT_DATA_BOLD;
  ws.getCell('F44').value = 'CHA';
  ws.getCell('F44').font = FONT_DATA_BOLD;

  // ROW 45: Transport rates
  ws.getRow(45).height = 28.8;
  ws.getCell('A45').value = 'taux transport';
  ws.getCell('A45').font = FONT_DATA;
  ws.getCell('E45').value = TRANSPORT_LUNAS;
  ws.getCell('E45').numFmt = FMT_PERCENT;
  ws.getCell('E45').font = FONT_DATA;
  ws.getCell('F45').value = TRANSPORT_CHA;
  ws.getCell('F45').numFmt = FMT_PERCENT;
  ws.getCell('F45').font = FONT_SMALL;

  // ROW 46: Transport calc
  ws.getRow(46).height = 28.8;
  ws.getCell('A46').value = 'total transport';
  ws.getCell('A46').font = FONT_DATA;
  ws.getCell('E46').value = { formula: 'IF($H$2="LUNAS",(E41+E30)*E45,0)' };
  ws.getCell('E46').numFmt = FMT_EURO;
  ws.getCell('F46').value = { formula: 'IF($H$2="CHA",(E41+E30)*F45,0)' };
  ws.getCell('F46').numFmt = FMT_EURO;

  // === SECTION 5: Prix de revient ===
  ws.getRow(48).height = 29.4;
  ws.mergeCells('A48:H48');
  ws.getCell('A48').value = '5- PRIX DE REVIENT';
  ws.getCell('A48').font = FONT_DATA_BOLD;
  ws.getCell('A48').fill = SECTION_FILL;
  ws.getCell('A48').border = BORDER_MEDIUM_ALL;
  ws.getCell('A48').alignment = ALIGN_LEFT;

  // ROW 49: Activite
  ws.getRow(49).height = 32.4;
  ws.getCell('A49').value = 'Activité';
  ws.getCell('A49').font = FONT_DATA;
  ws.getCell('B49').value = form.activite;
  ws.getCell('B49').font = FONT_DATA;
  ws.getCell('B49').fill = BRIGHT_YELLOW_FILL;
  ws.getCell('E49').value = ACTIVITES[form.activite];
  ws.getCell('E49').font = FONT_DATA;
  ws.getCell('E49').fill = BRIGHT_YELLOW_FILL;
  ws.getCell('E49').numFmt = FMT_INT;

  // ROW 50: Cout de fabrication + multiplier
  ws.getRow(50).height = 28.8;
  ws.getCell('A50').value = 'coût de fabrication (matières + fab)';
  ws.getCell('A50').font = FONT_DATA;
  ws.getCell('D50').value = { formula: 'E30+E41+E46+F46' };
  ws.getCell('D50').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E50').value = { formula: '1+(E49/100)' };
  ws.getCell('E50').numFmt = FMT_DECIMAL2;

  // ROW 52: Total prix de revient
  ws.getRow(52).height = 29.4;
  ws.getCell('A52').value = 'TOTAL PRIX DE REVIENT';
  ws.getCell('A52').font = FONT_DATA_BOLD;
  ws.getCell('A52').fill = SECTION_FILL;
  ws.getCell('E52').value = { formula: 'E50*D50' };
  ws.getCell('E52').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E52').font = FONT_DATA_BOLD;
  ws.getCell('E52').fill = SECTION_FILL;

  // === SECTION 6: Prix de vente ===
  ws.getRow(54).height = 29.4;
  ws.getCell('A54').value = '6 - PRIX DE VENTE COLLECTION';
  ws.getCell('A54').font = FONT_DATA_BOLD;
  ws.getCell('A54').fill = SECTION_FILL;
  ws.getCell('D54').value = 'marge';
  ws.getCell('D54').font = FONT_DATA;
  ws.getCell('E54').value = 'PV';
  ws.getCell('E54').font = FONT_DATA;

  ws.mergeCells('F54:H54');
  ws.getCell('F54').value = 'PRIX SELON ANCIENNE FORMULE';
  ws.getCell('F54').font = FONT_DATA;

  // ROW 55: PV Collection
  ws.getRow(55).height = 28.8;
  ws.getCell('A55').value = 'Prix de vente Collection/Essais/TDS/Soumission';
  ws.getCell('A55').font = FONT_DATA;
  ws.getCell('D55').value = form.margesCollection.pvCollection;
  ws.getCell('D55').font = FONT_DATA;
  ws.getCell('D55').fill = YELLOW_FILL;
  ws.getCell('E55').value = { formula: 'E52*D55' };
  ws.getCell('E55').numFmt = FMT_EURO_ACCOUNTING;
  ws.mergeCells('F55:H55');

  // ROW 56: PV Frais dessins
  ws.getRow(56).height = 28.8;
  ws.getCell('A56').value = 'Prix de vente les frais engagés dessin & recherche';
  ws.getCell('A56').font = FONT_DATA;
  ws.getCell('D56').value = form.margesCollection.pvFraisDessins;
  ws.getCell('D56').font = FONT_DATA;
  ws.getCell('D56').fill = YELLOW_FILL;
  ws.getCell('E56').value = { formula: 'E22*D56' };
  ws.getCell('E56').numFmt = FMT_EURO_ACCOUNTING;
  ws.mergeCells('F56:H56');

  // ROW 57: PV Frais technique
  ws.getRow(57).height = 28.8;
  ws.getCell('A57').value = 'Prix de vente sur les frais engagés technique';
  ws.getCell('A57').font = FONT_DATA;
  ws.getCell('D57').value = form.margesCollection.pvFraisTechnique;
  ws.getCell('D57').font = FONT_DATA;
  ws.getCell('D57').fill = YELLOW_FILL;
  ws.mergeCells('F57:H57');

  // Apply thin borders to data rows
  const dataRows = [9, 10, 13, 14, 15, 18, 19, 20, 26, 28, 34, 35, 36, 37, 38, 39, 45, 46, 49, 50, 55, 56, 57];
  for (const r of dataRows) {
    for (const c of ['A', 'B', 'C', 'D', 'E']) {
      const cell = ws.getCell(`${c}${r}`);
      if (!cell.border) cell.border = BORDER_THIN_ALL;
    }
  }
}
