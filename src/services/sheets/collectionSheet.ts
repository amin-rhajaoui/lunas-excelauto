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

  // B15=0 for Collection sheet
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

  // === ROW 21: Total frais ===
  ws.getRow(21).height = 29.4;
  ws.getCell('A21').value = 'TOTAL FRAIS ENGAGES COLLECTION';
  ws.getCell('A21').font = FONT_DATA_BOLD;
  ws.getCell('A21').fill = SECTION_FILL;
  ws.getCell('E21').value = { formula: 'SUM(E9:E15)' };
  ws.getCell('E21').numFmt = FMT_EURO;
  ws.getCell('E21').font = FONT_DATA_BOLD;
  ws.getCell('E21').fill = SECTION_FILL;

  // === ROW 23: Section 2 ===
  ws.getRow(23).height = 29.4;
  ws.mergeCells('A23:H23');
  ws.getCell('A23').value = '2- COUTS DES MATIERES';
  ws.getCell('A23').font = FONT_DATA_BOLD;
  ws.getCell('A23').fill = SECTION_FILL;
  ws.getCell('A23').border = BORDER_MEDIUM_ALL;
  ws.getCell('A23').alignment = ALIGN_LEFT;

  // ROW 24: Sub-header
  ws.getRow(24).height = 42.6;
  ws.mergeCells('D24:E24');
  ws.getCell('D24').value = 'Coût necessaire par unité';
  ws.getCell('D24').font = FONT_SUB_HEADER;
  ws.getCell('D24').alignment = ALIGN_CENTER;
  ws.mergeCells('F24:H28');
  ws.getCell('F24').value = 'Commentaires :';
  ws.getCell('F24').font = FONT_DATA;

  // ROW 25: Cout matieres
  ws.getRow(25).height = 28.8;
  ws.getCell('A25').value = 'Coût matieres du galon au mtrs (fils ou autres)';
  ws.getCell('A25').font = FONT_DATA;
  ws.getCell('E25').value = form.coutsMatieres.coutMatieresGalon;
  ws.getCell('E25').font = FONT_DATA;
  ws.getCell('E25').fill = YELLOW_FILL;
  ws.getCell('E25').numFmt = FMT_EURO;

  // ROW 27: % alea
  ws.getRow(27).height = 28.8;
  ws.getCell('A27').value = '% matières pour atelier déloc ( A définir avec la prod)';
  ws.getCell('A27').font = FONT_DATA;
  ws.getCell('B27').value = 0.05;
  ws.getCell('B27').font = FONT_DATA;
  ws.getCell('B27').numFmt = FMT_PERCENT;
  ws.getCell('C27').value = 0.05;
  ws.getCell('C27').font = FONT_DATA;
  ws.getCell('C27').numFmt = FMT_PERCENT;
  ws.getCell('D27').value = form.coutsMatieres.aleaPercent;
  ws.getCell('D27').font = FONT_DATA;
  ws.getCell('D27').fill = YELLOW_FILL;
  ws.getCell('D27').numFmt = FMT_PERCENT;
  ws.getCell('E27').value = { formula: 'E25*D27' };
  ws.getCell('E27').numFmt = FMT_EURO;

  // ROW 28: Total matieres
  ws.getRow(28).height = 30.6;
  ws.getCell('A28').value = 'TOTAL MATIERES';
  ws.getCell('A28').font = FONT_DATA_BOLD;
  ws.getCell('A28').fill = SECTION_FILL;
  ws.getCell('E28').value = { formula: 'E25+E27' };
  ws.getCell('E28').numFmt = FMT_EURO;
  ws.getCell('E28').font = FONT_DATA_BOLD;
  ws.getCell('E28').fill = SECTION_FILL;

  // === ROW 30: Section 3 + column headers (same line) ===
  ws.getRow(30).height = 58.2;
  ws.getCell('A30').value = '3- TEMPS DE FABRICATION';
  ws.getCell('A30').font = FONT_DATA_BOLD;
  ws.getCell('A30').fill = SECTION_FILL;
  ws.getCell('A30').border = BORDER_MEDIUM_ALL;
  ws.getCell('A30').alignment = ALIGN_LEFT;
  // Column headers in same row
  const fabColHeaders = ['Coût unitaire', 'Unité', 'Unités Nécessaires', 'Prix de revient HT'];
  const fabCols = ['B', 'C', 'D', 'E'];
  fabCols.forEach((col, i) => {
    const cell = ws.getCell(`${col}30`);
    cell.value = fabColHeaders[i];
    cell.font = FONT_DATA_BOLD;
    cell.border = BORDER_MEDIUM_ALL;
    cell.alignment = ALIGN_CENTER;
  });

  // ROW 31: Sub-header "TEMPS LANCEMENT COLLECTION"
  ws.getRow(31).height = 28.8;
  ws.getCell('A31').value = 'TEMPS LANCEMENT COLLECTION';
  ws.getCell('A31').font = FONT_DATA_BOLD;

  // ROW 32: Info atelier (periwinkle fill, no data)
  ws.getRow(32).height = 28.8;
  ws.getCell('A32').value = 'Information atelier = Virginie 2h30';
  ws.getCell('A32').font = FONT_DATA;
  ws.getCell('A32').fill = PERIWINKLE_FILL;
  ws.getCell('B32').fill = PERIWINKLE_FILL;
  ws.getCell('C32').fill = PERIWINKLE_FILL;
  ws.getCell('D32').fill = PERIWINKLE_FILL;
  ws.getCell('E32').fill = PERIWINKLE_FILL;

  // Fabrication rows 33-37
  const fabRows: Array<{
    row: number;
    label: string;
    rate: number;
    field: keyof typeof form.fabricationCollection;
    hasFormula: boolean;
  }> = [
    { row: 33, label: 'temps Presse', rate: 30, field: 'tempsPresse', hasFormula: false },
    { row: 34, label: 'Cout  atelier M2P Manip Textile Production', rate: 48, field: 'coutAtelierManipTextile', hasFormula: false },
    { row: 35, label: 'Coût atelier M2P Production  broderies', rate: 58, field: 'coutAtelierBroderies', hasFormula: true },
    { row: 36, label: 'Coût Sous traitance deloc Maroc prod', rate: 7, field: 'sousTraitanceMaroc', hasFormula: true },
    { row: 37, label: 'Coût sous traitance deloc Mada prod', rate: 7.5, field: 'sousTraitanceMada', hasFormula: true },
  ];

  // Row 32 has tempsCollection data in B/D/E
  ws.getCell('B32').value = 30;
  ws.getCell('B32').font = FONT_DATA;
  ws.getCell('B32').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('C32').value = 'heure';
  ws.getCell('C32').font = FONT_DATA;
  ws.getCell('D32').value = form.fabricationCollection.tempsCollection;
  ws.getCell('D32').font = FONT_DATA;
  ws.getCell('D32').fill = YELLOW_FILL;
  ws.getCell('E32').value = { formula: 'B32*D32' };
  ws.getCell('E32').numFmt = FMT_EURO_ACCOUNTING;

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

  // ROW 39: Total fabrication
  ws.getRow(39).height = 29.4;
  ws.getCell('A39').value = 'TOTAL FABRICATION';
  ws.getCell('A39').font = FONT_DATA_BOLD;
  ws.getCell('A39').fill = SECTION_FILL;
  ws.getCell('E39').value = { formula: 'SUM(E32:E37)' };
  ws.getCell('E39').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E39').font = FONT_DATA_BOLD;
  ws.getCell('E39').fill = SECTION_FILL;

  // === SECTION 4: Transport ===
  ws.getRow(41).height = 29.4;
  ws.mergeCells('A41:H41');
  ws.getCell('A41').value = '4- TRANSPORT';
  ws.getCell('A41').font = FONT_DATA_BOLD;
  ws.getCell('A41').fill = SECTION_FILL;
  ws.getCell('A41').border = BORDER_MEDIUM_ALL;
  ws.getCell('A41').alignment = ALIGN_LEFT;

  // ROW 42: Transport header
  ws.getRow(42).height = 28.8;
  ws.getCell('A42').value = 'Transport';
  ws.getCell('A42').font = FONT_DATA;
  ws.getCell('E42').value = 'LUNAS';
  ws.getCell('E42').font = FONT_DATA_BOLD;
  ws.getCell('F42').value = 'CHA';
  ws.getCell('F42').font = FONT_DATA_BOLD;

  // ROW 43: Transport rates
  ws.getRow(43).height = 28.8;
  ws.getCell('A43').value = 'taux transport';
  ws.getCell('A43').font = FONT_DATA;
  ws.getCell('E43').value = TRANSPORT_LUNAS;
  ws.getCell('E43').numFmt = FMT_PERCENT;
  ws.getCell('E43').font = FONT_DATA;
  ws.getCell('F43').value = TRANSPORT_CHA;
  ws.getCell('F43').numFmt = FMT_PERCENT;
  ws.getCell('F43').font = FONT_SMALL;

  // ROW 44: TOTAL TRANSPORT
  ws.getRow(44).height = 28.8;
  ws.getCell('A44').value = 'TOTAL TRANSPORT';
  ws.getCell('A44').font = FONT_DATA;
  ws.getCell('E44').value = { formula: 'IF($H$2="LUNAS",(E39+E28)*E43,0)' };
  ws.getCell('E44').numFmt = FMT_EURO;
  ws.getCell('F44').value = { formula: 'IF($H$2="CHA",(E39+E28)*F43,0)' };
  ws.getCell('F44').numFmt = FMT_EURO;

  // === SECTION 5: Prix de revient ===
  ws.getRow(46).height = 29.4;
  ws.mergeCells('A46:H46');
  ws.getCell('A46').value = '5- LE PRIX DE REVIENT';
  ws.getCell('A46').font = FONT_DATA_BOLD;
  ws.getCell('A46').fill = SECTION_FILL;
  ws.getCell('A46').border = BORDER_MEDIUM_ALL;
  ws.getCell('A46').alignment = ALIGN_LEFT;

  // ROW 47: Activite
  ws.getRow(47).height = 32.4;
  ws.getCell('A47').value = 'Activité';
  ws.getCell('A47').font = FONT_DATA;
  ws.getCell('B47').value = form.activite;
  ws.getCell('B47').font = FONT_DATA;
  ws.getCell('B47').fill = BRIGHT_YELLOW_FILL;
  ws.getCell('E47').value = ACTIVITES[form.activite];
  ws.getCell('E47').font = FONT_DATA;
  ws.getCell('E47').fill = BRIGHT_YELLOW_FILL;
  ws.getCell('E47').numFmt = FMT_INT;

  // ROW 48: Cout de fabrication
  ws.getRow(48).height = 28.8;
  ws.getCell('A48').value = 'coût de fabrication (matières + fab)';
  ws.getCell('A48').font = FONT_DATA;
  ws.getCell('D48').value = { formula: 'E28+E39+E44+F44' };
  ws.getCell('D48').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E48').value = { formula: '1+(E47/100)' };
  ws.getCell('E48').numFmt = FMT_DECIMAL2;

  // ROW 49: Total prix de revient
  ws.getRow(49).height = 29.4;
  ws.getCell('A49').value = 'TOTAL PRIX DE REVIENT';
  ws.getCell('A49').font = FONT_DATA_BOLD;
  ws.getCell('A49').fill = SECTION_FILL;
  ws.getCell('E49').value = { formula: 'E48*D48' };
  ws.getCell('E49').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E49').font = FONT_DATA_BOLD;
  ws.getCell('E49').fill = SECTION_FILL;

  // === SECTION 6: Prix de vente ===
  ws.getRow(51).height = 29.4;
  ws.getCell('A51').value = '6 - PRIX DE VENTE';
  ws.getCell('A51').font = FONT_DATA_BOLD;
  ws.getCell('A51').fill = SECTION_FILL;
  ws.getCell('D51').value = 'marge';
  ws.getCell('D51').font = FONT_DATA;
  ws.getCell('E51').value = 'PV';
  ws.getCell('E51').font = FONT_DATA;

  ws.mergeCells('F51:H51');
  ws.getCell('F51').value = 'PRIX DE VENTE ANNONCE';
  ws.getCell('F51').font = FONT_DATA;

  // ROW 52: PV Collection
  ws.getRow(52).height = 28.8;
  ws.getCell('A52').value = 'Prix de vente Collection/Essais/TDS/Soumission';
  ws.getCell('A52').font = FONT_DATA;
  ws.getCell('D52').value = form.margesCollection.pvCollection;
  ws.getCell('D52').font = FONT_DATA;
  ws.getCell('D52').fill = YELLOW_FILL;
  ws.getCell('E52').value = { formula: 'E49*D52' };
  ws.getCell('E52').numFmt = FMT_EURO_ACCOUNTING;
  ws.mergeCells('F52:H52');

  // ROW 53: PV Frais dessins
  ws.getRow(53).height = 28.8;
  ws.getCell('A53').value = 'Prix de vente les frais engagés dessin & recherche';
  ws.getCell('A53').font = FONT_DATA;
  ws.getCell('D53').value = form.margesCollection.pvFraisDessins;
  ws.getCell('D53').font = FONT_DATA;
  ws.getCell('D53').fill = YELLOW_FILL;
  ws.getCell('E53').value = { formula: 'E21*D53' };
  ws.getCell('E53').numFmt = FMT_EURO_ACCOUNTING;
  ws.mergeCells('F53:H53');

  // ROW 54: PV Frais technique
  ws.getRow(54).height = 28.8;
  ws.getCell('A54').value = 'Prix de vente sur les frais engagés technique';
  ws.getCell('A54').font = FONT_DATA;
  ws.getCell('D54').value = form.margesCollection.pvFraisTechnique;
  ws.getCell('D54').font = FONT_DATA;
  ws.getCell('D54').fill = YELLOW_FILL;
  ws.mergeCells('F54:H54');

  // ROW 55: COMMENTAIRES
  ws.getRow(55).height = 28.8;
  ws.mergeCells('A55:H55');
  ws.getCell('A55').value = 'COMMENTAIRES/INFORMATIONS:' + (form.commentaires.collection ? '\n' + form.commentaires.collection : '');
  ws.getCell('A55').font = FONT_DATA_BOLD;

  // Apply thin borders to data rows
  const dataRows = [9, 10, 13, 14, 15, 18, 19, 20, 25, 27, 32, 33, 34, 35, 36, 37, 43, 44, 47, 48, 52, 53, 54];
  for (const r of dataRows) {
    for (const c of ['A', 'B', 'C', 'D', 'E']) {
      const cell = ws.getCell(`${c}${r}`);
      if (!cell.border) cell.border = BORDER_THIN_ALL;
    }
  }
}
