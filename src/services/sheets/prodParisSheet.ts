import type { Worksheet } from 'exceljs';
import type { FormData } from '../../types';
import { ACTIVITES, RATE_BUREAU, TRANSPORT_LUNAS, TRANSPORT_CHA } from '../../constants';
import {
  YELLOW_FILL, BRIGHT_YELLOW_FILL, SECTION_FILL,
  FONT_WARNING, FONT_HEADER, FONT_TITLE, FONT_DATA, FONT_DATA_BOLD,
  FONT_DATE, FONT_SUB_HEADER, FONT_SMALL,
  BORDER_THIN_ALL, BORDER_MEDIUM_ALL,
  ALIGN_CENTER, ALIGN_LEFT,
  FMT_EURO, FMT_EURO_ACCOUNTING, FMT_PERCENT, FMT_DECIMAL2, FMT_INT, FMT_DATE,
} from './sharedStyles';

export function buildProdParisSheet(ws: Worksheet, form: FormData) {
  // Column widths
  ws.getColumn('A').width = 94.55;
  ws.getColumn('B').width = 47.55;
  ws.getColumn('C').width = 12.44;
  ws.getColumn('D').width = 21.33;
  ws.getColumn('E').width = 19.44;
  ws.getColumn('F').width = 17.33;
  ws.getColumn('G').width = 18;
  ws.getColumn('H').width = 43.44;

  // === HEADER ===
  ws.getRow(1).height = 21.6;
  ws.getCell('A1').value = 'Veiller à bien remplir tous les * et les cases en jaune';
  ws.getCell('A1').font = FONT_WARNING;

  ws.getRow(2).height = 24.9;
  ws.getCell('A2').value = 'CLIENT * :'; ws.getCell('A2').font = FONT_HEADER;
  ws.getCell('B2').value = form.header.client; ws.getCell('B2').font = FONT_HEADER; ws.getCell('B2').fill = YELLOW_FILL;
  ws.getCell('G2').value = 'SOCIETE * :'; ws.getCell('G2').font = FONT_HEADER;
  ws.getCell('H2').value = form.header.societe; ws.getCell('H2').font = FONT_HEADER; ws.getCell('H2').fill = YELLOW_FILL;

  ws.getRow(3).height = 24.9;
  ws.getCell('A3').value = 'COLLECTION :'; ws.getCell('A3').font = FONT_HEADER;
  ws.getCell('B3').value = form.header.collection; ws.getCell('B3').font = FONT_HEADER; ws.getCell('B3').fill = YELLOW_FILL;

  ws.getRow(4).height = 24.9;
  ws.getCell('A4').value = 'PROJET / REFERENCE * :'; ws.getCell('A4').font = FONT_HEADER;
  ws.getCell('B4').value = form.header.projet; ws.getCell('B4').font = FONT_HEADER; ws.getCell('B4').fill = YELLOW_FILL;

  ws.mergeCells('E4:H5');
  ws.getCell('E4').value = 'PRIX PROD FAB PARIS 200 M OU PROD PARIS\n';
  ws.getCell('E4').font = FONT_TITLE;
  ws.getCell('E4').fill = SECTION_FILL;
  ws.getCell('E4').alignment = ALIGN_CENTER;

  ws.getRow(5).height = 43.8;
  ws.getCell('A5').value = 'DATE * :'; ws.getCell('A5').font = FONT_HEADER;
  const dateVal = form.header.date ? new Date(form.header.date) : new Date();
  ws.getCell('B5').value = dateVal; ws.getCell('B5').font = FONT_DATE; ws.getCell('B5').fill = YELLOW_FILL; ws.getCell('B5').numFmt = FMT_DATE;

  // === SECTION 1 ===
  ws.getRow(6).height = 29.4;
  ws.mergeCells('A6:H6');
  ws.getCell('A6').value = '1- FRAIS ENGAGES'; ws.getCell('A6').font = FONT_DATA_BOLD; ws.getCell('A6').fill = SECTION_FILL; ws.getCell('A6').border = BORDER_MEDIUM_ALL; ws.getCell('A6').alignment = ALIGN_LEFT;

  ws.getRow(7).height = 72;
  const headers = ['Désignation', 'Coût unitaire', 'Unité', 'Unités Nécessaires', 'Prix de revient HT'];
  ['A', 'B', 'C', 'D', 'E'].forEach((col, i) => {
    const c = ws.getCell(`${col}7`); c.value = headers[i]; c.font = FONT_DATA_BOLD; c.border = BORDER_MEDIUM_ALL; c.alignment = ALIGN_CENTER;
  });

  ws.getRow(8).height = 28.8;
  ws.getCell('A8').value = 'Frais Recherche & dessins'; ws.getCell('A8').font = FONT_DATA_BOLD;

  for (const r of [9, 10]) ws.getRow(r).height = 28.8;
  ws.getCell('A9').value = 'Recherche, développement, échantillons'; ws.getCell('A9').font = FONT_DATA;
  ws.getCell('B9').value = RATE_BUREAU; ws.getCell('B9').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B9').font = FONT_DATA;
  ws.getCell('C9').value = 'heure'; ws.getCell('C9').font = FONT_DATA;
  ws.getCell('D9').value = form.fraisEngages.rechercheDevHeures; ws.getCell('D9').fill = YELLOW_FILL; ws.getCell('D9').font = FONT_DATA;
  ws.getCell('E9').value = { formula: 'D9*B9' }; ws.getCell('E9').numFmt = FMT_EURO;

  ws.getCell('A10').value = 'Création dessin technique'; ws.getCell('A10').font = FONT_DATA;
  ws.getCell('B10').value = RATE_BUREAU; ws.getCell('B10').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B10').font = FONT_DATA;
  ws.getCell('C10').value = 'heure'; ws.getCell('C10').font = FONT_DATA;
  ws.getCell('D10').value = form.fraisEngages.creationDessinHeures; ws.getCell('D10').fill = YELLOW_FILL; ws.getCell('D10').font = FONT_DATA;
  ws.getCell('E10').value = { formula: 'D10*B10' }; ws.getCell('E10').numFmt = FMT_EURO;

  ws.getRow(12).height = 28.8;
  ws.getCell('A12').value = 'Intervention prestataire externe'; ws.getCell('A12').font = FONT_DATA_BOLD;

  for (const r of [13, 14, 15]) ws.getRow(r).height = 28.8;
  ws.getCell('A13').value = 'Programme Presta externe'; ws.getCell('A13').font = FONT_DATA;
  ws.getCell('B13').value = form.fraisEngages.programmePrestaCoût; ws.getCell('B13').fill = YELLOW_FILL; ws.getCell('B13').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B13').font = FONT_DATA;
  ws.getCell('C13').value = 'Forfait'; ws.getCell('C13').font = FONT_DATA;
  ws.getCell('D13').value = form.fraisEngages.programmePrestaQty; ws.getCell('D13').fill = YELLOW_FILL; ws.getCell('D13').font = FONT_DATA;
  ws.getCell('E13').value = { formula: 'D13*B13' }; ws.getCell('E13').numFmt = FMT_EURO;

  ws.getCell('A14').value = 'Cadre sérigraphie'; ws.getCell('A14').font = FONT_DATA;
  ws.getCell('B14').value = form.fraisEngages.cadreSerigraphieCoût; ws.getCell('B14').fill = YELLOW_FILL; ws.getCell('B14').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B14').font = FONT_DATA;
  ws.getCell('C14').value = 'Forfait'; ws.getCell('C14').font = FONT_DATA;
  ws.getCell('D14').value = form.fraisEngages.cadreSerigraphieQty; ws.getCell('D14').fill = YELLOW_FILL; ws.getCell('D14').font = FONT_DATA;
  ws.getCell('E14').value = { formula: 'D14*B14' }; ws.getCell('E14').numFmt = FMT_EURO;

  // B15=38 for Prod Paris
  ws.getCell('A15').value = 'Piquage'; ws.getCell('A15').font = FONT_DATA;
  ws.getCell('B15').value = RATE_BUREAU; ws.getCell('B15').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B15').font = FONT_DATA;
  ws.getCell('C15').value = 'heure'; ws.getCell('C15').font = FONT_DATA;
  ws.getCell('D15').value = form.fraisEngages.piquageHeures; ws.getCell('D15').fill = YELLOW_FILL; ws.getCell('D15').font = FONT_DATA;
  ws.getCell('E15').value = { formula: 'D15*B15' }; ws.getCell('E15').numFmt = FMT_EURO;

  ws.getRow(17).height = 28.8;
  ws.getCell('A17').value = 'Industrialisation & Qualité'; ws.getCell('A17').font = FONT_DATA_BOLD;

  for (const r of [18, 19, 20]) ws.getRow(r).height = 28.8;
  ws.getCell('A18').value = 'Etude industrialisation'; ws.getCell('A18').font = FONT_DATA;
  ws.getCell('B18').value = RATE_BUREAU; ws.getCell('B18').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B18').font = FONT_DATA;
  ws.getCell('C18').value = 'heure'; ws.getCell('C18').font = FONT_DATA;
  ws.getCell('D18').value = form.fraisEngages.etudeIndustrialisationHeures; ws.getCell('D18').fill = YELLOW_FILL; ws.getCell('D18').font = FONT_DATA;
  ws.getCell('E18').value = { formula: 'B18*D18' }; ws.getCell('E18').numFmt = FMT_EURO;

  ws.getCell('A19').value = 'Test PRSL'; ws.getCell('A19').font = FONT_DATA;
  ws.getCell('B19').value = form.fraisEngages.testPrslCoût; ws.getCell('B19').fill = YELLOW_FILL; ws.getCell('B19').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B19').font = FONT_DATA;
  ws.getCell('C19').value = 'unité'; ws.getCell('C19').font = FONT_DATA;
  ws.getCell('D19').value = form.fraisEngages.testPrslQty; ws.getCell('D19').fill = YELLOW_FILL; ws.getCell('D19').font = FONT_DATA;
  ws.getCell('E19').value = { formula: 'B19*D19' }; ws.getCell('E19').numFmt = FMT_EURO;

  ws.getCell('A20').value = 'Temps gradation '; ws.getCell('A20').font = FONT_DATA;
  ws.getCell('B20').value = form.fraisEngages.tempsGradationCoût; ws.getCell('B20').fill = YELLOW_FILL; ws.getCell('B20').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B20').font = FONT_DATA;
  ws.getCell('C20').value = 'heure'; ws.getCell('C20').font = FONT_DATA;
  ws.getCell('D20').value = form.fraisEngages.tempsGradationHeures; ws.getCell('D20').fill = YELLOW_FILL; ws.getCell('D20').font = FONT_DATA;
  ws.getCell('E20').value = { formula: 'B20*D20' }; ws.getCell('E20').numFmt = FMT_EURO;

  ws.getRow(22).height = 29.4;
  ws.getCell('A22').value = 'TOTAL FRAIS ENGAGES 200M/PROD PARIS'; ws.getCell('A22').font = FONT_DATA_BOLD; ws.getCell('A22').fill = SECTION_FILL;
  ws.getCell('E22').value = { formula: 'SUM(E9:E15)' }; ws.getCell('E22').numFmt = FMT_EURO; ws.getCell('E22').font = FONT_DATA_BOLD; ws.getCell('E22').fill = SECTION_FILL;

  // === SECTION 2 ===
  ws.getRow(24).height = 29.4;
  ws.mergeCells('A24:H24');
  ws.getCell('A24').value = '2- COUTS DES MATIERES'; ws.getCell('A24').font = FONT_DATA_BOLD; ws.getCell('A24').fill = SECTION_FILL; ws.getCell('A24').border = BORDER_MEDIUM_ALL; ws.getCell('A24').alignment = ALIGN_LEFT;

  ws.getRow(25).height = 42.6;
  ws.mergeCells('D25:E25');
  ws.getCell('D25').value = 'Coût necessaire par unité'; ws.getCell('D25').font = FONT_SUB_HEADER; ws.getCell('D25').alignment = ALIGN_CENTER;
  ws.mergeCells('F25:H29');
  ws.getCell('F25').value = 'Commentaires :'; ws.getCell('F25').font = FONT_DATA;

  ws.getRow(26).height = 28.8;
  ws.getCell('A26').value = 'Coût matieres du galon au mtrs (fils ou autres)'; ws.getCell('A26').font = FONT_DATA;
  ws.getCell('E26').value = form.coutsMatieres.coutMatieresGalon; ws.getCell('E26').fill = YELLOW_FILL; ws.getCell('E26').numFmt = FMT_EURO; ws.getCell('E26').font = FONT_DATA;

  ws.getRow(28).height = 28.8;
  ws.getCell('A28').value = '% alea'; ws.getCell('A28').font = FONT_DATA;
  ws.getCell('B28').value = 0.05; ws.getCell('B28').numFmt = FMT_PERCENT; ws.getCell('B28').font = FONT_DATA;
  ws.getCell('D28').value = form.coutsMatieres.aleaPercent; ws.getCell('D28').fill = YELLOW_FILL; ws.getCell('D28').numFmt = FMT_PERCENT; ws.getCell('D28').font = FONT_DATA;
  ws.getCell('E28').value = { formula: 'E26*D28' }; ws.getCell('E28').numFmt = FMT_EURO;

  ws.getRow(30).height = 30.6;
  ws.getCell('A30').value = 'TOTAL MATIERES'; ws.getCell('A30').font = FONT_DATA_BOLD; ws.getCell('A30').fill = SECTION_FILL;
  ws.getCell('E30').value = { formula: 'E26+E28' }; ws.getCell('E30').numFmt = FMT_EURO; ws.getCell('E30').font = FONT_DATA_BOLD; ws.getCell('E30').fill = SECTION_FILL;

  // === SECTION 3: Fabrication ===
  ws.getRow(31).height = 29.4;
  ws.getCell('A31').value = '3- TEMPS DE FABRICATION'; ws.getCell('A31').font = FONT_DATA_BOLD; ws.getCell('A31').fill = SECTION_FILL;

  ws.getRow(32).height = 58.2;
  ['A', 'B', 'C', 'D', 'E'].forEach((col, i) => {
    const c = ws.getCell(`${col}32`); c.value = headers[i]; c.font = FONT_DATA_BOLD; c.border = BORDER_MEDIUM_ALL; c.alignment = ALIGN_CENTER;
  });

  const fabRows: Array<{ row: number; label: string; rate: number; value: number }> = [
    { row: 33, label: 'Temps Collection', rate: 30, value: form.fabricationProdParis.tempsCollection },
    { row: 34, label: 'temps Presse', rate: 30, value: form.fabricationProdParis.tempsPresse },
    { row: 35, label: 'Cout atelier M2P Production/200M', rate: 48, value: form.fabricationProdParis.coutAtelierProd200m },
  ];

  for (const fr of fabRows) {
    ws.getRow(fr.row).height = 28.8;
    ws.getCell(`A${fr.row}`).value = fr.label; ws.getCell(`A${fr.row}`).font = FONT_DATA;
    ws.getCell(`B${fr.row}`).value = fr.rate; ws.getCell(`B${fr.row}`).numFmt = FMT_EURO_ACCOUNTING; ws.getCell(`B${fr.row}`).font = FONT_DATA;
    ws.getCell(`C${fr.row}`).value = 'heure'; ws.getCell(`C${fr.row}`).font = FONT_DATA;
    ws.getCell(`D${fr.row}`).value = fr.value; ws.getCell(`D${fr.row}`).fill = YELLOW_FILL; ws.getCell(`D${fr.row}`).font = FONT_DATA;
    ws.getCell(`E${fr.row}`).value = { formula: `B${fr.row}*D${fr.row}` }; ws.getCell(`E${fr.row}`).numFmt = FMT_EURO_ACCOUNTING;
  }

  ws.getRow(37).height = 29.4;
  ws.getCell('A37').value = 'TOTAL FABRICATION'; ws.getCell('A37').font = FONT_DATA_BOLD; ws.getCell('A37').fill = SECTION_FILL;
  ws.getCell('E37').value = { formula: 'SUM(E33:E35)' }; ws.getCell('E37').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('E37').font = FONT_DATA_BOLD; ws.getCell('E37').fill = SECTION_FILL;

  // === SECTION 4: Transport ===
  ws.getRow(39).height = 29.4;
  ws.mergeCells('A39:H39');
  ws.getCell('A39').value = '4- TRANSPORT'; ws.getCell('A39').font = FONT_DATA_BOLD; ws.getCell('A39').fill = SECTION_FILL; ws.getCell('A39').border = BORDER_MEDIUM_ALL; ws.getCell('A39').alignment = ALIGN_LEFT;

  ws.getRow(40).height = 28.8;
  ws.getCell('A40').value = 'Transport'; ws.getCell('A40').font = FONT_DATA;
  ws.getCell('E40').value = 'LUNAS'; ws.getCell('E40').font = FONT_DATA_BOLD;
  ws.getCell('F40').value = 'CHA'; ws.getCell('F40').font = FONT_DATA_BOLD;

  ws.getRow(41).height = 28.8;
  ws.getCell('A41').value = 'taux transport'; ws.getCell('A41').font = FONT_DATA;
  ws.getCell('E41').value = TRANSPORT_LUNAS; ws.getCell('E41').numFmt = FMT_PERCENT; ws.getCell('E41').font = FONT_DATA;
  ws.getCell('F41').value = TRANSPORT_CHA; ws.getCell('F41').numFmt = FMT_PERCENT; ws.getCell('F41').font = FONT_SMALL;

  ws.getRow(42).height = 28.8;
  ws.getCell('A42').value = 'total transport'; ws.getCell('A42').font = FONT_DATA;
  ws.getCell('E42').value = { formula: 'IF($H$2="LUNAS",(E37+E30)*E41,0)' }; ws.getCell('E42').numFmt = FMT_EURO;
  ws.getCell('F42').value = { formula: 'IF($H$2="CHA",(E37+E30)*F41,0)' }; ws.getCell('F42').numFmt = FMT_EURO;

  // === SECTION 5: Prix de revient ===
  ws.getRow(44).height = 29.4;
  ws.mergeCells('A44:H44');
  ws.getCell('A44').value = '5- PRIX DE REVIENT'; ws.getCell('A44').font = FONT_DATA_BOLD; ws.getCell('A44').fill = SECTION_FILL; ws.getCell('A44').border = BORDER_MEDIUM_ALL; ws.getCell('A44').alignment = ALIGN_LEFT;

  ws.getRow(45).height = 32.4;
  ws.getCell('A45').value = 'Activité'; ws.getCell('A45').font = FONT_DATA;
  ws.getCell('B45').value = form.activite; ws.getCell('B45').fill = BRIGHT_YELLOW_FILL; ws.getCell('B45').font = FONT_DATA;
  ws.getCell('E45').value = ACTIVITES[form.activite]; ws.getCell('E45').fill = BRIGHT_YELLOW_FILL; ws.getCell('E45').numFmt = FMT_INT; ws.getCell('E45').font = FONT_DATA;

  ws.getRow(46).height = 28.8;
  ws.getCell('A46').value = 'coût de fabrication (matières + fab)'; ws.getCell('A46').font = FONT_DATA;
  ws.getCell('D46').value = { formula: 'E30+E37+E42+F42' }; ws.getCell('D46').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E46').value = { formula: '1+(E45/100)' }; ws.getCell('E46').numFmt = FMT_DECIMAL2;

  ws.getRow(48).height = 29.4;
  ws.getCell('A48').value = 'TOTAL PRIX DE REVIENT'; ws.getCell('A48').font = FONT_DATA_BOLD; ws.getCell('A48').fill = SECTION_FILL;
  ws.getCell('E48').value = { formula: 'E46*D46' }; ws.getCell('E48').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('E48').font = FONT_DATA_BOLD; ws.getCell('E48').fill = SECTION_FILL;

  // === SECTION 6: Prix de vente ===
  ws.getRow(50).height = 29.4;
  ws.getCell('A50').value = '6 - PRIX DE VENTE PROD PARIS / 200 M'; ws.getCell('A50').font = FONT_DATA_BOLD; ws.getCell('A50').fill = SECTION_FILL;
  ws.getCell('D50').value = 'marge'; ws.getCell('D50').font = FONT_DATA;
  ws.getCell('E50').value = 'PV'; ws.getCell('E50').font = FONT_DATA;
  ws.mergeCells('F50:H50');
  ws.getCell('F50').value = 'PRIX SELON ANCIENNE FORMULE'; ws.getCell('F50').font = FONT_DATA;

  ws.getRow(51).height = 28.8;
  ws.getCell('A51').value = 'Prix de vente Prod Paris ou 200 M'; ws.getCell('A51').font = FONT_DATA;

  ws.getRow(52).height = 28.8;
  ws.getCell('A52').value = 'Prix de vente Prod Paris ou 200 M'; ws.getCell('A52').font = FONT_DATA;
  ws.getCell('C52').value = 'ou'; ws.getCell('C52').font = FONT_DATA;
  ws.getCell('D52').value = form.margesProdParis.pvProdParis; ws.getCell('D52').fill = YELLOW_FILL; ws.getCell('D52').font = FONT_DATA;
  ws.getCell('E52').value = { formula: 'E48*D52' }; ws.getCell('E52').numFmt = FMT_EURO_ACCOUNTING;
  ws.mergeCells('F51:H51');
  ws.mergeCells('F52:H52');

  // Apply borders
  const dataRows = [9, 10, 13, 14, 15, 18, 19, 20, 26, 28, 33, 34, 35, 41, 42, 45, 46, 51, 52];
  for (const r of dataRows) {
    for (const c of ['A', 'B', 'C', 'D', 'E']) {
      const cell = ws.getCell(`${c}${r}`);
      if (!cell.border) cell.border = BORDER_THIN_ALL;
    }
  }
}
