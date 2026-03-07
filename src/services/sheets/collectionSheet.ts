import type { Worksheet } from 'exceljs';
import type { FormData } from '../../types';
import { ACTIVITES, RATE_BUREAU, TRANSPORT_LUNAS, TRANSPORT_CHA } from '../../constants';
import {
  YELLOW_FILL, BRIGHT_YELLOW_FILL, SECTION1_FILL, SECTION_FILL, PERIWINKLE_FILL,
  FONT_WARNING, FONT_HEADER, FONT_TITLE, FONT_DATA, FONT_DATA_BOLD,
  FONT_DATE, FONT_SUB_HEADER,
  BORDER_THIN_ALL, BORDER_MEDIUM_ALL,
  ALIGN_CENTER, ALIGN_LEFT,
  FMT_EURO, FMT_EURO_ACCOUNTING, FMT_PERCENT, FMT_DECIMAL2, FMT_INT, FMT_DATE,
  richTextLabel, applyPageSetup, applyColumnDefaults,
} from './sharedStyles';

export function buildCollectionSheet(ws: Worksheet, form: FormData) {
  // Page setup & zoom
  applyPageSetup(ws, 33);

  // Column widths
  ws.getColumn('A').width = 93.66;
  ws.getColumn('B').width = 45.55;
  ws.getColumn('C').width = 12.89;
  ws.getColumn('D').width = 23.11;
  ws.getColumn('E').width = 27.44;
  ws.getColumn('F').width = 17.55;
  ws.getColumn('G').width = 23.11;
  ws.getColumn('H').width = 38.89;

  // Column default styles
  applyColumnDefaults(ws);

  // === ROW 1: Warning ===
  ws.getRow(1).height = 29.4;
  const a1 = ws.getCell('A1');
  a1.value = 'Veiller à bien remplir tous les * et les cases en jaune';
  a1.font = FONT_WARNING;

  // === ROWS 2-5: Header ===
  ws.getRow(2).height = 52.8;
  ws.getRow(3).height = 33;
  ws.getRow(4).height = 35.4;
  ws.getRow(5).height = 43.8;

  // Row 2 - Rich text labels
  ws.mergeCells('C2:D5');
  ws.mergeCells('E2:F3');
  ws.getCell('A2').value = richTextLabel('CLIENT ');
  ws.getCell('A2').font = FONT_HEADER;
  ws.getCell('A2').border = BORDER_THIN_ALL;
  ws.getCell('A2').alignment = { vertical: 'middle' };
  ws.getCell('B2').value = form.header.client;
  ws.getCell('B2').font = FONT_HEADER;
  ws.getCell('B2').fill = YELLOW_FILL;
  ws.getCell('B2').border = BORDER_THIN_ALL;
  ws.getCell('G2').value = richTextLabel('SOCIETE ');
  ws.getCell('G2').font = FONT_HEADER;
  ws.getCell('G2').border = BORDER_THIN_ALL;
  ws.getCell('G2').alignment = { vertical: 'middle' };
  ws.mergeCells('G3:H3');
  ws.getCell('H2').value = form.header.societe;
  ws.getCell('H2').font = FONT_HEADER;
  ws.getCell('H2').fill = YELLOW_FILL;
  ws.getCell('H2').border = BORDER_THIN_ALL;

  // Row 3
  ws.getCell('A3').value = 'COLLECTION :';
  ws.getCell('A3').font = FONT_HEADER;
  ws.getCell('A3').border = BORDER_THIN_ALL;
  ws.getCell('B3').value = form.header.collection;
  ws.getCell('B3').font = FONT_HEADER;
  ws.getCell('B3').fill = YELLOW_FILL;
  ws.getCell('B3').border = BORDER_THIN_ALL;

  // Row 4
  ws.getCell('A4').value = richTextLabel('PROJET / REFERENCE ');
  ws.getCell('A4').font = FONT_HEADER;
  ws.getCell('A4').border = BORDER_THIN_ALL;
  ws.getCell('A4').alignment = { vertical: 'middle' };
  ws.getCell('B4').value = form.header.projet;
  ws.getCell('B4').font = FONT_HEADER;
  ws.getCell('B4').fill = YELLOW_FILL;
  ws.getCell('B4').border = BORDER_THIN_ALL;

  // Title E4 (merged E4:H5)
  ws.mergeCells('E4:H5');
  ws.getCell('E4').value = 'PRIX COLLECTION';
  ws.getCell('E4').font = FONT_TITLE;
  ws.getCell('E4').fill = PERIWINKLE_FILL;
  ws.getCell('E4').alignment = ALIGN_CENTER;
  ws.getCell('E4').border = { top: { style: 'medium' }, left: { style: 'medium' } };

  // Row 5
  ws.getCell('A5').value = richTextLabel('DATE ');
  ws.getCell('A5').font = FONT_HEADER;
  ws.getCell('A5').border = BORDER_THIN_ALL;
  ws.getCell('A5').alignment = { vertical: 'middle' };
  const dateVal = form.header.date ? new Date(form.header.date) : new Date();
  ws.getCell('B5').value = dateVal;
  ws.getCell('B5').font = FONT_DATE;
  ws.getCell('B5').fill = YELLOW_FILL;
  ws.getCell('B5').numFmt = FMT_DATE;
  ws.getCell('B5').border = BORDER_THIN_ALL;
  ws.getCell('B5').alignment = { horizontal: 'center', vertical: 'middle' };

  // === ROW 6: Section 1 Header (uses SECTION1_FILL = theme 5) ===
  ws.getRow(6).height = 29.4;
  ws.mergeCells('A6:H6');
  ws.getCell('A6').value = '1- FRAIS ENGAGES';
  ws.getCell('A6').font = FONT_DATA_BOLD;
  ws.getCell('A6').fill = SECTION1_FILL;
  ws.getCell('A6').border = { left: { style: 'medium' } };
  ws.getCell('A6').alignment = { horizontal: 'left' };

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
  ws.getCell('A8').value = 'Frais Recherche & dessins';
  ws.getCell('A8').font = FONT_DATA_BOLD;
  ws.getCell('A8').border = BORDER_THIN_ALL;
  ws.getCell('A8').alignment = { horizontal: 'center', vertical: 'middle' };

  // === ROWS 9-10: Recherche & Création ===
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
  ws.getCell('E9').font = FONT_DATA;

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
  ws.getCell('E10').font = FONT_DATA;

  // === ROW 12: Sub-header ===
  ws.getCell('A12').value = 'Intervention prestataire externe';
  ws.getCell('A12').font = FONT_DATA_BOLD;
  ws.getCell('A12').border = BORDER_THIN_ALL;
  ws.getCell('A12').alignment = { horizontal: 'center', vertical: 'middle' };

  // === ROWS 13-15 ===
  ws.getCell('A13').value = 'Programme Presta externe';
  ws.getCell('A13').font = FONT_DATA;
  ws.getCell('B13').value = form.fraisEngages.programmePrestaCoût;
  ws.getCell('B13').font = FONT_DATA;
  ws.getCell('B13').fill = YELLOW_FILL;
  ws.getCell('B13').numFmt = FMT_EURO;
  ws.getCell('C13').value = 'Forfait';
  ws.getCell('C13').font = FONT_DATA;
  ws.getCell('D13').value = form.fraisEngages.programmePrestaQty;
  ws.getCell('D13').font = FONT_DATA;
  ws.getCell('D13').fill = YELLOW_FILL;
  ws.getCell('E13').value = { formula: 'D13*B13' };
  ws.getCell('E13').numFmt = FMT_EURO;
  ws.getCell('E13').font = FONT_DATA;

  ws.getCell('A14').value = 'Cadre sérigraphie';
  ws.getCell('A14').font = FONT_DATA;
  ws.getCell('B14').value = form.fraisEngages.cadreSerigraphieCoût;
  ws.getCell('B14').font = FONT_DATA;
  ws.getCell('B14').fill = YELLOW_FILL;
  ws.getCell('B14').numFmt = FMT_EURO;
  ws.getCell('C14').value = 'Forfait';
  ws.getCell('C14').font = FONT_DATA;
  ws.getCell('D14').value = form.fraisEngages.cadreSerigraphieQty;
  ws.getCell('D14').font = FONT_DATA;
  ws.getCell('D14').fill = YELLOW_FILL;
  ws.getCell('E14').value = { formula: 'D14*B14' };
  ws.getCell('E14').numFmt = FMT_EURO;
  ws.getCell('E14').font = FONT_DATA;

  // B15=0 for Collection sheet
  ws.getCell('A15').value = 'Piquage';
  ws.getCell('A15').font = FONT_DATA;
  ws.getCell('B15').value = 0;
  ws.getCell('B15').font = FONT_DATA;
  ws.getCell('B15').numFmt = FMT_EURO;
  ws.getCell('C15').value = 'heure';
  ws.getCell('C15').font = FONT_DATA;
  ws.getCell('D15').value = form.fraisEngages.piquageHeures;
  ws.getCell('D15').font = FONT_DATA;
  ws.getCell('D15').fill = YELLOW_FILL;
  ws.getCell('E15').value = { formula: 'D15*B15' };
  ws.getCell('E15').numFmt = FMT_EURO;
  ws.getCell('E15').font = FONT_DATA;

  // === ROW 17: Sub-header ===
  ws.getCell('A17').value = 'Industrialisation & Qualité';
  ws.getCell('A17').font = FONT_DATA_BOLD;
  ws.getCell('A17').border = BORDER_THIN_ALL;
  ws.getCell('A17').alignment = { horizontal: 'center', vertical: 'middle' };

  // === ROWS 18-20 ===
  ws.getCell('A18').value = 'Etude industrialisation';
  ws.getCell('A18').font = FONT_DATA;
  ws.getCell('B18').value = RATE_BUREAU;
  ws.getCell('B18').font = FONT_DATA;
  ws.getCell('B18').numFmt = FMT_EURO;
  ws.getCell('C18').value = 'heure';
  ws.getCell('C18').font = FONT_DATA;
  ws.getCell('D18').value = form.fraisEngages.etudeIndustrialisationHeures;
  ws.getCell('D18').font = FONT_DATA;
  ws.getCell('D18').fill = YELLOW_FILL;
  ws.getCell('E18').value = { formula: 'B18*D18' };
  ws.getCell('E18').numFmt = FMT_EURO;
  ws.getCell('E18').font = FONT_DATA;

  ws.getCell('A19').value = 'Test PRSL';
  ws.getCell('A19').font = FONT_DATA;
  ws.getCell('B19').value = form.fraisEngages.testPrslCoût;
  ws.getCell('B19').font = FONT_DATA;
  ws.getCell('B19').fill = YELLOW_FILL;
  ws.getCell('B19').numFmt = FMT_EURO;
  ws.getCell('C19').value = 'unité';
  ws.getCell('C19').font = FONT_DATA;
  ws.getCell('D19').value = form.fraisEngages.testPrslQty;
  ws.getCell('D19').font = FONT_DATA;
  ws.getCell('D19').fill = YELLOW_FILL;
  ws.getCell('E19').value = { formula: 'B19*D19' };
  ws.getCell('E19').numFmt = FMT_EURO;
  ws.getCell('E19').font = FONT_DATA;

  ws.getCell('A20').value = 'Temps gradation ';
  ws.getCell('A20').font = FONT_DATA;
  ws.getCell('B20').value = form.fraisEngages.tempsGradationCoût;
  ws.getCell('B20').font = FONT_DATA;
  ws.getCell('B20').fill = YELLOW_FILL;
  ws.getCell('B20').numFmt = FMT_EURO;
  ws.getCell('C20').value = 'heure';
  ws.getCell('C20').font = FONT_DATA;
  ws.getCell('D20').value = form.fraisEngages.tempsGradationHeures;
  ws.getCell('D20').font = FONT_DATA;
  ws.getCell('D20').fill = YELLOW_FILL;
  ws.getCell('E20').value = { formula: 'B20*D20' };
  ws.getCell('E20').numFmt = FMT_EURO;
  ws.getCell('E20').font = FONT_DATA;

  // === ROW 21: Total frais (SECTION1_FILL = theme 5) ===
  ws.getCell('A21').value = 'TOTAL FRAIS ENGAGES COLLECTION';
  ws.getCell('A21').font = FONT_DATA_BOLD;
  ws.getCell('A21').fill = SECTION1_FILL;
  ws.mergeCells('B21:D21');
  ws.mergeCells('F21:H21');
  ws.getCell('E21').value = { formula: 'SUM(E9:E15)' };
  ws.getCell('E21').numFmt = FMT_EURO;
  ws.getCell('E21').font = FONT_DATA_BOLD;
  ws.getCell('E21').fill = SECTION1_FILL;

  // === ROW 22: Spacer ===
  ws.getRow(22).height = 29.4;
  ws.mergeCells('A22:H22');

  // === ROW 23: Section 2 ===
  ws.mergeCells('A23:H23');
  ws.getCell('A23').value = '2- COUTS DES MATIERES';
  ws.getCell('A23').font = FONT_DATA_BOLD;
  ws.getCell('A23').fill = SECTION_FILL;
  ws.getCell('A23').border = BORDER_MEDIUM_ALL;
  ws.getCell('A23').alignment = ALIGN_LEFT;

  // ROW 24: Sub-header + merged areas
  ws.getRow(24).height = 42.6;
  ws.mergeCells('A24:C24');
  ws.mergeCells('D24:E24');
  ws.getCell('D24').value = 'Coût necessaire par unité';
  ws.getCell('D24').font = FONT_SUB_HEADER;
  ws.getCell('D24').alignment = ALIGN_CENTER;
  ws.mergeCells('F24:H27');
  ws.getCell('F24').value = 'Commentaires :';
  ws.getCell('F24').font = FONT_DATA;

  // ROW 25-26: Cout matieres (merged B25:D26)
  ws.mergeCells('B25:D26');
  ws.getCell('A25').value = 'Coût matieres du galon au mtrs (fils ou autres)';
  ws.getCell('A25').font = FONT_DATA;
  ws.getCell('E25').value = form.coutsMatieres.coutMatieresGalon;
  ws.getCell('E25').font = FONT_DATA;
  ws.getCell('E25').fill = YELLOW_FILL;
  ws.getCell('E25').numFmt = FMT_EURO;

  // ROW 27: % alea (merged B27:C27)
  ws.mergeCells('B27:C27');
  ws.getCell('A27').value = '% matières pour atelier déloc ( A définir avec la prod)';
  ws.getCell('A27').font = FONT_DATA;
  ws.getCell('D27').value = form.coutsMatieres.aleaPercent / 100;
  ws.getCell('D27').font = FONT_DATA;
  ws.getCell('D27').fill = YELLOW_FILL;
  ws.getCell('D27').numFmt = FMT_PERCENT;
  ws.getCell('E27').value = { formula: 'E25*D27' };
  ws.getCell('E27').numFmt = FMT_EURO;
  ws.getCell('E27').font = FONT_DATA;

  // ROW 28: Total matieres (merged B28:D28, F28:H28)
  ws.mergeCells('B28:D28');
  ws.mergeCells('F28:H28');
  ws.getCell('A28').value = 'TOTAL MATIERES';
  ws.getCell('A28').font = FONT_DATA_BOLD;
  ws.getCell('A28').fill = SECTION_FILL;
  ws.getCell('E28').value = { formula: 'E25+E27' };
  ws.getCell('E28').numFmt = FMT_EURO;
  ws.getCell('E28').font = FONT_DATA_BOLD;
  ws.getCell('E28').fill = SECTION_FILL;

  // === ROW 29: Spacer ===
  ws.getRow(29).height = 27;
  ws.mergeCells('A29:H29');

  // === ROW 30: Section 3 + column headers ===
  ws.getRow(30).height = 57.6;
  ws.getCell('A30').value = '3- TEMPS DE FABRICATION';
  ws.getCell('A30').font = FONT_DATA_BOLD;
  ws.getCell('A30').fill = SECTION_FILL;
  ws.getCell('A30').border = BORDER_MEDIUM_ALL;
  ws.getCell('A30').alignment = ALIGN_LEFT;
  const fabColHeaders = ['Coût unitaire', 'Unité', 'Unités Nécessaires', 'Prix de revient HT'];
  const fabCols = ['B', 'C', 'D', 'E'];
  fabCols.forEach((col, i) => {
    const cell = ws.getCell(`${col}30`);
    cell.value = fabColHeaders[i];
    cell.font = FONT_DATA_BOLD;
    cell.border = BORDER_MEDIUM_ALL;
    cell.alignment = ALIGN_CENTER;
  });
  ws.mergeCells('F30:H30');

  // ROW 31: Sub-header "TEMPS LANCEMENT COLLECTION" (merged B31:E31, F31:H32)
  ws.getRow(31).height = 49.2;
  ws.getCell('A31').value = 'TEMPS LANCEMENT COLLECTION';
  ws.getCell('A31').font = FONT_DATA_BOLD;
  ws.getCell('A31').border = BORDER_THIN_ALL;
  ws.mergeCells('B31:E31');
  ws.mergeCells('F31:H32');

  // ROW 32: Fabrication row (1 single row - tempsCollection at rate 30)
  ws.getCell('A32').value = 'Information atelier =      h';
  ws.getCell('A32').font = FONT_DATA;
  ws.getCell('A32').fill = PERIWINKLE_FILL;
  ws.getCell('A32').border = BORDER_THIN_ALL;
  ws.getCell('B32').value = 30;
  ws.getCell('B32').font = FONT_DATA;
  ws.getCell('B32').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('B32').fill = PERIWINKLE_FILL;
  ws.getCell('B32').border = BORDER_THIN_ALL;
  ws.getCell('C32').value = 'heure';
  ws.getCell('C32').font = FONT_DATA;
  ws.getCell('C32').fill = PERIWINKLE_FILL;
  ws.getCell('C32').border = BORDER_THIN_ALL;
  ws.getCell('D32').value = form.fabricationCollection.tempsCollection;
  ws.getCell('D32').font = FONT_DATA;
  ws.getCell('D32').fill = YELLOW_FILL;
  ws.getCell('D32').border = BORDER_THIN_ALL;
  ws.getCell('E32').value = { formula: 'B32*D32' };
  ws.getCell('E32').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E32').font = FONT_DATA;
  ws.getCell('E32').border = BORDER_THIN_ALL;

  // ROW 33: Spacer (" ")
  ws.getCell('A33').value = ' ';
  ws.getCell('A33').font = FONT_DATA;
  ws.getCell('A33').border = BORDER_THIN_ALL;
  ws.mergeCells('F33:H33');

  // ROW 34: Total fabrication (merged B34:D34, F34:H34)
  ws.getRow(34).height = 34.8;
  ws.mergeCells('B34:D34');
  ws.mergeCells('F34:H34');
  ws.getCell('A34').value = 'TOTAL FABRICATION';
  ws.getCell('A34').font = FONT_DATA_BOLD;
  ws.getCell('A34').fill = SECTION_FILL;
  ws.getCell('E34').value = { formula: 'SUM(E32:E32)' };
  ws.getCell('E34').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E34').font = FONT_DATA_BOLD;
  ws.getCell('E34').fill = SECTION_FILL;

  // === ROW 35: Spacer ===
  ws.getRow(35).height = 25.95;
  ws.mergeCells('A35:H35');

  // === SECTION 4: Transport ===
  ws.mergeCells('A36:H36');
  ws.getCell('A36').value = '4- TRANSPORT';
  ws.getCell('A36').font = FONT_DATA_BOLD;
  ws.getCell('A36').fill = SECTION_FILL;
  ws.getCell('A36').border = BORDER_MEDIUM_ALL;
  ws.getCell('A36').alignment = ALIGN_LEFT;

  // ROW 37-38: Transport (merged A37:D38, G37:H38)
  ws.mergeCells('A37:D38');
  ws.getCell('A37').value = 'Transport\ntaux transport';
  ws.getCell('A37').font = FONT_DATA;
  ws.getCell('A37').alignment = { wrapText: true, vertical: 'middle' };
  ws.mergeCells('G37:H38');
  ws.getCell('E37').value = 'LUNAS';
  ws.getCell('E37').font = FONT_DATA_BOLD;
  ws.getCell('E37').border = BORDER_THIN_ALL;
  ws.getCell('F37').value = 'CHA';
  ws.getCell('F37').font = FONT_DATA_BOLD;
  ws.getCell('F37').border = BORDER_THIN_ALL;

  ws.getCell('E38').value = TRANSPORT_LUNAS;
  ws.getCell('E38').numFmt = FMT_PERCENT;
  ws.getCell('E38').font = FONT_DATA_BOLD;
  ws.getCell('E38').border = BORDER_THIN_ALL;
  ws.getCell('F38').value = TRANSPORT_CHA;
  ws.getCell('F38').numFmt = FMT_PERCENT;
  ws.getCell('F38').font = FONT_DATA;
  ws.getCell('F38').border = BORDER_THIN_ALL;

  // ROW 39: TOTAL TRANSPORT (merged B39:D39)
  ws.getRow(39).height = 29.4;
  ws.mergeCells('B39:D39');
  ws.getCell('A39').value = 'TOTAL TRANSPORT';
  ws.getCell('A39').font = FONT_DATA_BOLD;
  ws.getCell('A39').fill = SECTION_FILL;
  ws.getCell('E39').value = { formula: 'IF($H$2="LUNAS",(E34+E28)*E38,0)' };
  ws.getCell('E39').numFmt = FMT_EURO;
  ws.getCell('E39').font = FONT_DATA_BOLD;
  ws.getCell('E39').fill = SECTION_FILL;
  ws.getCell('F39').value = { formula: 'IF($H$2="CHA",(E34+E28)*F38,0)' };
  ws.getCell('F39').numFmt = FMT_EURO;
  ws.getCell('F39').font = FONT_DATA_BOLD;

  // === ROW 40: Spacer ===
  ws.getRow(40).height = 25.95;
  ws.mergeCells('A40:H40');

  // === SECTION 5: Prix de revient ===
  ws.mergeCells('A41:H41');
  ws.getCell('A41').value = '5- LE PRIX DE REVIENT';
  ws.getCell('A41').font = FONT_DATA_BOLD;
  ws.getCell('A41').fill = SECTION_FILL;
  ws.getCell('A41').border = BORDER_MEDIUM_ALL;
  ws.getCell('A41').alignment = ALIGN_LEFT;

  // ROW 42: Activite (merged B42:C42, F42:H43)
  ws.getRow(42).height = 32.4;
  ws.mergeCells('B42:C42');
  ws.getCell('A42').value = 'Activité';
  ws.getCell('A42').font = FONT_DATA;
  ws.getCell('B42').value = form.activite;
  ws.getCell('B42').font = FONT_DATA;
  ws.getCell('B42').fill = BRIGHT_YELLOW_FILL;
  ws.getCell('E42').value = ACTIVITES[form.activite];
  ws.getCell('E42').font = FONT_DATA;
  ws.getCell('E42').fill = BRIGHT_YELLOW_FILL;
  ws.getCell('E42').numFmt = FMT_INT;
  ws.mergeCells('F42:H43');

  // ROW 43: Cout de fabrication (merged B43:C43)
  ws.mergeCells('B43:C43');
  ws.getCell('A43').value = 'coût de fabrication (matières + fab)';
  ws.getCell('A43').font = FONT_DATA;
  ws.getCell('D43').value = { formula: 'E28+E34+E39+F39' };
  ws.getCell('D43').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('D43').font = FONT_DATA_BOLD;
  ws.getCell('E43').value = { formula: '1+(E42/100)' };
  ws.getCell('E43').numFmt = FMT_DECIMAL2;
  ws.getCell('E43').font = FONT_DATA_BOLD;

  // ROW 44: Total prix de revient (merged B44:D44, F44:H44)
  ws.getRow(44).height = 46.2;
  ws.mergeCells('B44:D44');
  ws.mergeCells('F44:H44');
  ws.getCell('A44').value = 'TOTAL PRIX DE REVIENT';
  ws.getCell('A44').font = FONT_DATA_BOLD;
  ws.getCell('A44').fill = SECTION_FILL;
  ws.getCell('E44').value = { formula: 'E43*D43' };
  ws.getCell('E44').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E44').font = FONT_DATA_BOLD;
  ws.getCell('E44').fill = SECTION_FILL;

  // === ROW 45: Spacer ===
  ws.getRow(45).height = 31.8;
  ws.mergeCells('A45:H45');

  // === SECTION 6: Prix de vente ===
  ws.getCell('A46').value = '6 - PRIX DE VENTE';
  ws.getCell('A46').font = FONT_DATA_BOLD;
  ws.getCell('A46').fill = SECTION_FILL;
  ws.mergeCells('B46:C46');
  ws.getCell('D46').value = 'marge';
  ws.getCell('D46').font = FONT_DATA;
  ws.getCell('E46').value = 'PV';
  ws.getCell('E46').font = FONT_DATA;
  ws.mergeCells('F46:H46');
  ws.getCell('F46').value = 'PRIX DE VENTE ANNONCE';
  ws.getCell('F46').font = FONT_DATA;

  // ROW 47: PV Collection (merged B47:C47, F47:H47)
  ws.getRow(47).height = 49.2;
  ws.mergeCells('B47:C47');
  ws.getCell('A47').value = 'Prix de vente Collection/Essais/TDS/Soumission';
  ws.getCell('A47').font = FONT_DATA_BOLD;
  ws.getCell('D47').value = form.margesCollection.pvCollection;
  ws.getCell('D47').font = FONT_DATA;
  ws.getCell('D47').fill = YELLOW_FILL;
  ws.getCell('E47').value = { formula: 'E44*D47' };
  ws.getCell('E47').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E47').font = FONT_DATA_BOLD;
  ws.mergeCells('F47:H47');
  if (form.margesCollection.prixVenteAnnonce) {
    ws.getCell('F47').value = form.margesCollection.prixVenteAnnonce;
    ws.getCell('F47').numFmt = FMT_EURO;
    ws.getCell('F47').font = { size: 22, bold: true, color: { argb: 'FFFF0000' } };
    ws.getCell('F47').fill = BRIGHT_YELLOW_FILL;
  }

  // ROW 48: PV Frais dessins (merged B48:C48, F48:H48)
  ws.getRow(48).height = 47.4;
  ws.mergeCells('B48:C48');
  ws.getCell('A48').value = 'Prix de vente les frais engagés dessin & recherche';
  ws.getCell('A48').font = FONT_DATA;
  ws.getCell('D48').value = form.margesCollection.pvFraisDessins;
  ws.getCell('D48').font = FONT_DATA;
  ws.getCell('D48').fill = YELLOW_FILL;
  ws.getCell('E48').value = { formula: 'E21*D48' };
  ws.getCell('E48').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E48').font = FONT_DATA_BOLD;
  ws.mergeCells('F48:H48');

  // ROW 49: PV Frais technique (merged B49:C49, F49:H49)
  ws.getRow(49).height = 48;
  ws.mergeCells('B49:C49');
  ws.getCell('A49').value = 'Prix de vente sur les frais engagés technique';
  ws.getCell('A49').font = FONT_DATA;
  ws.getCell('D49').value = form.margesCollection.pvFraisTechnique;
  ws.getCell('D49').font = FONT_DATA;
  ws.getCell('D49').fill = YELLOW_FILL;
  ws.mergeCells('F49:H49');

  // ROW 50: COMMENTAIRES (merged A50:H50)
  ws.getRow(50).height = 115.2;
  ws.mergeCells('A50:H50');
  ws.getCell('A50').value = 'COMMENTAIRES/INFORMATIONS:' + (form.commentaires.collection ? '\n' + form.commentaires.collection : '');
  ws.getCell('A50').font = FONT_DATA_BOLD;
  ws.getCell('A50').alignment = { wrapText: true, vertical: 'top' };

  // Apply thin borders to data rows
  const dataRows = [9, 10, 13, 14, 15, 18, 19, 20, 25, 27, 32, 38, 42, 43, 47, 48, 49];
  for (const r of dataRows) {
    for (const c of ['A', 'B', 'C', 'D', 'E']) {
      const cell = ws.getCell(`${c}${r}`);
      if (!cell.border) cell.border = BORDER_THIN_ALL;
    }
  }
}
