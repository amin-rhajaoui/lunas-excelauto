import type { Worksheet } from 'exceljs';
import type { FormData } from '../../types';
import { ACTIVITES, RATE_BUREAU, TRANSPORT_LUNAS } from '../../constants';
import {
  YELLOW_FILL, BRIGHT_YELLOW_FILL, SECTION1_FILL, SECTION_FILL, PINK_FILL,
  FONT_WARNING, FONT_HEADER, FONT_TITLE, FONT_DATA, FONT_DATA_BOLD,
  FONT_DATE, FONT_SUB_HEADER,
  BORDER_THIN_ALL, BORDER_MEDIUM_ALL,
  ALIGN_CENTER, ALIGN_LEFT,
  FMT_EURO, FMT_EURO_ACCOUNTING, FMT_PERCENT, FMT_DECIMAL2, FMT_INT, FMT_DATE,
  FMT_DECIMAL1, FMT_EURO_FR,
  richTextLabel, applyPageSetup, applyColumnDefaults,
} from './sharedStyles';

export function buildProdDelocSheet(ws: Worksheet, form: FormData) {
  applyPageSetup(ws, 36);

  // Column widths (A-G only)
  ws.getColumn('A').width = 90.66;
  ws.getColumn('B').width = 43.55;
  ws.getColumn('C').width = 13.33;
  ws.getColumn('D').width = 21.11;
  ws.getColumn('E').width = 27.78;
  ws.getColumn('F').width = 28;
  ws.getColumn('G').width = 55.89;

  applyColumnDefaults(ws, 'G');

  // === HEADER ===
  ws.getRow(1).height = 29.4;
  ws.getCell('A1').value = 'Veiller à bien remplir tous les * et les cases en jaune';
  ws.getCell('A1').font = FONT_WARNING;

  ws.getRow(2).height = 52.8;
  ws.getCell('A2').value = richTextLabel('CLIENT ');
  ws.getCell('A2').font = FONT_HEADER; ws.getCell('A2').border = BORDER_THIN_ALL; ws.getCell('A2').alignment = { vertical: 'middle' };
  ws.getCell('B2').value = form.header.client; ws.getCell('B2').font = FONT_HEADER; ws.getCell('B2').fill = YELLOW_FILL; ws.getCell('B2').border = BORDER_THIN_ALL;
  // Societe in F2/G2 for Prod deloc
  ws.getCell('F2').value = richTextLabel('SOCIETE ');
  ws.getCell('F2').font = FONT_HEADER; ws.getCell('F2').border = BORDER_THIN_ALL; ws.getCell('F2').alignment = { vertical: 'middle' };
  ws.getCell('G2').value = form.header.societe; ws.getCell('G2').font = FONT_HEADER; ws.getCell('G2').fill = YELLOW_FILL; ws.getCell('G2').border = BORDER_THIN_ALL;

  ws.getRow(3).height = 33;
  ws.getCell('A3').value = 'COLLECTION :'; ws.getCell('A3').font = FONT_HEADER; ws.getCell('A3').border = BORDER_THIN_ALL;
  ws.getCell('B3').value = form.header.collection; ws.getCell('B3').font = FONT_HEADER; ws.getCell('B3').fill = YELLOW_FILL; ws.getCell('B3').border = BORDER_THIN_ALL;

  ws.getRow(4).height = 35.4;
  ws.getCell('A4').value = richTextLabel('PROJET / REFERENCE ');
  ws.getCell('A4').font = FONT_HEADER; ws.getCell('A4').border = BORDER_THIN_ALL; ws.getCell('A4').alignment = { vertical: 'middle' };
  ws.getCell('B4').value = form.header.projet; ws.getCell('B4').font = FONT_HEADER; ws.getCell('B4').fill = YELLOW_FILL; ws.getCell('B4').border = BORDER_THIN_ALL;

  // Title E4:G5 (not H)
  ws.mergeCells('E4:G5');
  ws.getCell('E4').value = 'PRIX PRODUCTION\nDELOC\n';
  ws.getCell('E4').font = FONT_TITLE;
  ws.getCell('E4').fill = PINK_FILL;
  ws.getCell('E4').alignment = ALIGN_CENTER;
  ws.getCell('E4').border = { top: { style: 'medium' }, left: { style: 'medium' } };

  ws.getRow(5).height = 43.8;
  ws.getCell('A5').value = richTextLabel('DATE ');
  ws.getCell('A5').font = FONT_HEADER; ws.getCell('A5').border = BORDER_THIN_ALL; ws.getCell('A5').alignment = { vertical: 'middle' };
  const dateVal = form.header.date ? new Date(form.header.date) : new Date();
  ws.getCell('B5').value = dateVal; ws.getCell('B5').font = FONT_DATE; ws.getCell('B5').fill = YELLOW_FILL; ws.getCell('B5').numFmt = FMT_DATE; ws.getCell('B5').border = BORDER_THIN_ALL;

  // === SECTION 1 ===
  ws.getRow(6).height = 29.4;
  ws.mergeCells('A6:G6');
  ws.getCell('A6').value = '1- FRAIS ENGAGES'; ws.getCell('A6').font = FONT_DATA_BOLD; ws.getCell('A6').fill = SECTION1_FILL; ws.getCell('A6').border = { left: { style: 'medium' } }; ws.getCell('A6').alignment = { horizontal: 'left' };

  ws.getRow(7).height = 72;
  const headers = ['Désignation', 'Coût unitaire', 'Unité', 'Unités Nécessaires', 'Prix de revient HT'];
  ['A', 'B', 'C', 'D', 'E'].forEach((col, i) => {
    const c = ws.getCell(`${col}7`); c.value = headers[i]; c.font = FONT_DATA_BOLD; c.border = BORDER_MEDIUM_ALL; c.alignment = ALIGN_CENTER;
  });

  ws.getCell('A8').value = 'Frais Recherche & dessins'; ws.getCell('A8').font = FONT_DATA_BOLD;

  ws.getCell('A9').value = 'Recherche, développement, échantillons'; ws.getCell('A9').font = FONT_DATA;
  ws.getCell('B9').value = RATE_BUREAU; ws.getCell('B9').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B9').font = FONT_DATA;
  ws.getCell('C9').value = 'heure'; ws.getCell('C9').font = FONT_DATA;
  ws.getCell('D9').value = form.fraisEngages.rechercheDevHeures; ws.getCell('D9').fill = YELLOW_FILL; ws.getCell('D9').font = FONT_DATA;
  ws.getCell('E9').value = { formula: 'D9*B9' }; ws.getCell('E9').numFmt = FMT_EURO; ws.getCell('E9').font = FONT_DATA;

  ws.getCell('A10').value = 'Création dessin technique'; ws.getCell('A10').font = FONT_DATA;
  ws.getCell('B10').value = RATE_BUREAU; ws.getCell('B10').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B10').font = FONT_DATA;
  ws.getCell('C10').value = 'heure'; ws.getCell('C10').font = FONT_DATA;
  ws.getCell('D10').value = form.fraisEngages.creationDessinHeures; ws.getCell('D10').fill = YELLOW_FILL; ws.getCell('D10').font = FONT_DATA;
  ws.getCell('E10').value = { formula: 'D10*B10' }; ws.getCell('E10').numFmt = FMT_EURO; ws.getCell('E10').font = FONT_DATA;

  ws.getCell('A12').value = 'Intervention prestataire externe'; ws.getCell('A12').font = FONT_DATA_BOLD;

  ws.getCell('A13').value = 'Programme Presta externe'; ws.getCell('A13').font = FONT_DATA;
  ws.getCell('B13').value = form.fraisEngages.programmePrestaCoût; ws.getCell('B13').fill = YELLOW_FILL; ws.getCell('B13').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B13').font = FONT_DATA;
  ws.getCell('C13').value = 'Forfait'; ws.getCell('C13').font = FONT_DATA;
  ws.getCell('D13').value = form.fraisEngages.programmePrestaQty; ws.getCell('D13').fill = YELLOW_FILL; ws.getCell('D13').font = FONT_DATA;
  ws.getCell('E13').value = { formula: 'D13*B13' }; ws.getCell('E13').numFmt = FMT_EURO; ws.getCell('E13').font = FONT_DATA;

  ws.getCell('A14').value = 'Cadre sérigraphie'; ws.getCell('A14').font = FONT_DATA;
  ws.getCell('B14').value = form.fraisEngages.cadreSerigraphieCoût; ws.getCell('B14').fill = YELLOW_FILL; ws.getCell('B14').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B14').font = FONT_DATA;
  ws.getCell('C14').value = 'Forfait'; ws.getCell('C14').font = FONT_DATA;
  ws.getCell('D14').value = form.fraisEngages.cadreSerigraphieQty; ws.getCell('D14').fill = YELLOW_FILL; ws.getCell('D14').font = FONT_DATA;
  ws.getCell('E14').value = { formula: 'D14*B14' }; ws.getCell('E14').numFmt = FMT_EURO; ws.getCell('E14').font = FONT_DATA;

  // B15=38 for Prod deloc
  ws.getCell('A15').value = 'Piquage'; ws.getCell('A15').font = FONT_DATA;
  ws.getCell('B15').value = RATE_BUREAU; ws.getCell('B15').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B15').font = FONT_DATA;
  ws.getCell('C15').value = 'heure'; ws.getCell('C15').font = FONT_DATA;
  ws.getCell('D15').value = form.fraisEngages.piquageHeures; ws.getCell('D15').fill = YELLOW_FILL; ws.getCell('D15').font = FONT_DATA;
  ws.getCell('E15').value = { formula: 'D15*B15' }; ws.getCell('E15').numFmt = FMT_EURO; ws.getCell('E15').font = FONT_DATA;

  ws.getCell('A17').value = 'Industrialisation & Qualité'; ws.getCell('A17').font = FONT_DATA_BOLD;

  ws.getCell('A18').value = 'Etude industrialisation'; ws.getCell('A18').font = FONT_DATA;
  ws.getCell('B18').value = RATE_BUREAU; ws.getCell('B18').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B18').font = FONT_DATA;
  ws.getCell('C18').value = 'heure'; ws.getCell('C18').font = FONT_DATA;
  ws.getCell('D18').value = form.fraisEngages.etudeIndustrialisationHeures; ws.getCell('D18').fill = YELLOW_FILL; ws.getCell('D18').font = FONT_DATA;
  ws.getCell('E18').value = { formula: 'B18*D18' }; ws.getCell('E18').numFmt = FMT_EURO; ws.getCell('E18').font = FONT_DATA;

  ws.getCell('A19').value = 'Test PRSL'; ws.getCell('A19').font = FONT_DATA;
  ws.getCell('B19').value = form.fraisEngages.testPrslCoût; ws.getCell('B19').fill = YELLOW_FILL; ws.getCell('B19').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B19').font = FONT_DATA;
  ws.getCell('C19').value = 'unité'; ws.getCell('C19').font = FONT_DATA;
  ws.getCell('D19').value = form.fraisEngages.testPrslQty; ws.getCell('D19').fill = YELLOW_FILL; ws.getCell('D19').font = FONT_DATA;
  ws.getCell('E19').value = { formula: 'B19*D19' }; ws.getCell('E19').numFmt = FMT_EURO; ws.getCell('E19').font = FONT_DATA;

  ws.getCell('A20').value = 'Temps gradation '; ws.getCell('A20').font = FONT_DATA;
  ws.getCell('B20').value = form.fraisEngages.tempsGradationCoût; ws.getCell('B20').fill = YELLOW_FILL; ws.getCell('B20').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B20').font = FONT_DATA;
  ws.getCell('C20').value = 'heure'; ws.getCell('C20').font = FONT_DATA;
  ws.getCell('D20').value = form.fraisEngages.tempsGradationHeures; ws.getCell('D20').fill = YELLOW_FILL; ws.getCell('D20').font = FONT_DATA;
  ws.getCell('E20').value = { formula: 'B20*D20' }; ws.getCell('E20').numFmt = FMT_EURO; ws.getCell('E20').font = FONT_DATA;

  // ROW 22: Total frais
  ws.getRow(22).height = 29.4;
  ws.getCell('A22').value = 'TOTAL FRAIS ENGAGES COLLECTION'; ws.getCell('A22').font = FONT_DATA_BOLD; ws.getCell('A22').fill = SECTION1_FILL;
  ws.getCell('E22').value = { formula: 'SUM(E9:E15)' }; ws.getCell('E22').numFmt = FMT_EURO; ws.getCell('E22').font = FONT_DATA_BOLD; ws.getCell('E22').fill = SECTION1_FILL;

  // === SECTION 2: Matieres ===
  ws.getRow(24).height = 29.4;
  ws.mergeCells('A24:G24');
  ws.getCell('A24').value = '2- COUTS DES MATIERES'; ws.getCell('A24').font = FONT_DATA_BOLD; ws.getCell('A24').fill = SECTION_FILL; ws.getCell('A24').border = BORDER_MEDIUM_ALL; ws.getCell('A24').alignment = ALIGN_LEFT;

  ws.getRow(25).height = 42.6;
  ws.mergeCells('D25:E25');
  ws.getCell('D25').value = 'Coût necessaire par unité'; ws.getCell('D25').font = FONT_SUB_HEADER; ws.getCell('D25').alignment = ALIGN_CENTER;
  ws.mergeCells('F25:G28');
  ws.getCell('F25').value = 'Commentaires :'; ws.getCell('F25').font = FONT_DATA;

  ws.getCell('A26').value = 'Coût matieres du galon au mtrs (fils ou autres)'; ws.getCell('A26').font = FONT_DATA;
  ws.getCell('E26').value = form.coutsMatieres.coutMatieresGalon; ws.getCell('E26').fill = YELLOW_FILL; ws.getCell('E26').numFmt = FMT_EURO; ws.getCell('E26').font = FONT_DATA;

  // ROW 27: % matières
  ws.getCell('A27').value = '% matières pour atelier déloc ( A définir avec la prod)'; ws.getCell('A27').font = FONT_DATA;
  ws.getCell('B27').value = '5 ou 10 %'; ws.getCell('B27').font = FONT_DATA;
  ws.getCell('D27').value = form.coutsMatieres.aleaPercentProdDeloc / 100; ws.getCell('D27').fill = YELLOW_FILL; ws.getCell('D27').numFmt = FMT_PERCENT; ws.getCell('D27').font = FONT_DATA;
  ws.getCell('E27').value = { formula: 'E26*D27' }; ws.getCell('E27').numFmt = FMT_EURO; ws.getCell('E27').font = FONT_DATA;

  // ROW 28: Total matieres
  ws.getRow(28).height = 30.6;
  ws.getCell('A28').value = 'TOTAL MATIERES'; ws.getCell('A28').font = FONT_DATA_BOLD; ws.getCell('A28').fill = SECTION_FILL;
  ws.getCell('E28').value = { formula: 'E26+E27' }; ws.getCell('E28').numFmt = FMT_EURO; ws.getCell('E28').font = FONT_DATA_BOLD; ws.getCell('E28').fill = SECTION_FILL;

  // === SECTION 3: Fabrication ===
  ws.getRow(30).height = 58.2;
  ws.getCell('A30').value = '3- TEMPS DE FABRICATION';
  ws.getCell('A30').font = FONT_DATA_BOLD; ws.getCell('A30').fill = SECTION_FILL; ws.getCell('A30').border = BORDER_MEDIUM_ALL; ws.getCell('A30').alignment = ALIGN_LEFT;
  const fabColHeaders = ['Coût unitaire', 'Unité', 'Unités Nécessaires', 'Prix de revient HT'];
  ['B', 'C', 'D', 'E'].forEach((col, i) => {
    const c = ws.getCell(`${col}30`);
    c.value = fabColHeaders[i]; c.font = FONT_DATA_BOLD; c.border = BORDER_MEDIUM_ALL; c.alignment = ALIGN_CENTER;
  });

  // ROW 31: Info atelier (pink fill)
  ws.getCell('A31').value = 'Information atelier';
  ws.getCell('A31').font = FONT_DATA;
  ws.getCell('A31').fill = PINK_FILL;
  ws.getCell('B31').fill = PINK_FILL;
  ws.getCell('B31').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('C31').fill = PINK_FILL;
  ws.getCell('D31').fill = PINK_FILL;
  ws.getCell('D31').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E31').fill = PINK_FILL;
  ws.getCell('E31').numFmt = FMT_EURO_ACCOUNTING;

  // ROW 32: Maroc (rate 7)
  ws.getCell('A32').value = 'Coût Sous traitance deloc Maroc prod'; ws.getCell('A32').font = FONT_DATA;
  ws.getCell('B32').value = 7; ws.getCell('B32').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B32').font = FONT_DATA;
  ws.getCell('C32').value = 'heure'; ws.getCell('C32').font = FONT_DATA;
  ws.getCell('D32').value = form.fabricationProdDeloc.sousTraitanceMaroc; ws.getCell('D32').fill = YELLOW_FILL; ws.getCell('D32').font = FONT_DATA;
  ws.getCell('E32').value = { formula: 'B32*D32' }; ws.getCell('E32').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('E32').font = FONT_DATA;

  // ROW 33: Mada (rate 7.5) - keep correct formula +B33*D33
  ws.getCell('A33').value = 'Coût sous traitance deloc Mada prod'; ws.getCell('A33').font = FONT_DATA;
  ws.getCell('B33').value = 7.5; ws.getCell('B33').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B33').font = FONT_DATA;
  ws.getCell('C33').value = 'heure'; ws.getCell('C33').font = FONT_DATA;
  ws.getCell('D33').value = form.fabricationProdDeloc.sousTraitanceMada; ws.getCell('D33').fill = YELLOW_FILL; ws.getCell('D33').font = FONT_DATA;
  ws.getCell('E33').value = { formula: '+B33*D33' }; ws.getCell('E33').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('E33').font = FONT_DATA;

  // ROW 34: Total fabrication
  ws.getRow(34).height = 29.4;
  ws.getCell('A34').value = 'TOTAL FABRICATION'; ws.getCell('A34').font = FONT_DATA_BOLD; ws.getCell('A34').fill = SECTION_FILL;
  ws.getCell('E34').value = { formula: 'SUM(E31:E33)' }; ws.getCell('E34').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('E34').font = FONT_DATA_BOLD; ws.getCell('E34').fill = SECTION_FILL;

  // === SECTION 4: Transport (LUNAS only) ===
  ws.getRow(36).height = 29.4;
  ws.mergeCells('A36:G36');
  ws.getCell('A36').value = '4- TRANSPORT'; ws.getCell('A36').font = FONT_DATA_BOLD; ws.getCell('A36').fill = SECTION_FILL; ws.getCell('A36').border = BORDER_MEDIUM_ALL; ws.getCell('A36').alignment = ALIGN_LEFT;

  ws.getCell('A37').value = 'Transport'; ws.getCell('A37').font = FONT_DATA;
  ws.getCell('E37').value = 'LUNAS'; ws.getCell('E37').font = FONT_DATA_BOLD;

  ws.getCell('A38').value = 'taux transport'; ws.getCell('A38').font = FONT_DATA;
  ws.getCell('E38').value = TRANSPORT_LUNAS; ws.getCell('E38').numFmt = FMT_PERCENT; ws.getCell('E38').font = FONT_DATA;

  ws.getCell('A39').value = 'TOTAL TRANSPORT'; ws.getCell('A39').font = FONT_DATA;
  // Prod deloc uses $G$2 not $H$2
  ws.getCell('E39').value = { formula: 'IF($G$2="LUNAS",(E34+E28)*E38,0)' }; ws.getCell('E39').numFmt = FMT_EURO; ws.getCell('E39').font = FONT_DATA_BOLD;

  // === SECTION 5: Prix de revient ===
  ws.getRow(41).height = 29.4;
  ws.mergeCells('A41:G41');
  ws.getCell('A41').value = '5- LE PRIX DE REVIENT'; ws.getCell('A41').font = FONT_DATA_BOLD; ws.getCell('A41').fill = SECTION_FILL; ws.getCell('A41').border = BORDER_MEDIUM_ALL; ws.getCell('A41').alignment = ALIGN_LEFT;

  ws.getRow(42).height = 32.4;
  ws.getCell('A42').value = 'Activité'; ws.getCell('A42').font = FONT_DATA;
  ws.getCell('B42').value = form.activite; ws.getCell('B42').fill = BRIGHT_YELLOW_FILL; ws.getCell('B42').font = FONT_DATA;
  ws.getCell('E42').value = ACTIVITES[form.activite]; ws.getCell('E42').fill = BRIGHT_YELLOW_FILL; ws.getCell('E42').numFmt = FMT_INT; ws.getCell('E42').font = FONT_DATA;

  ws.getCell('A43').value = 'coût de fabrication (matières + fab)'; ws.getCell('A43').font = FONT_DATA;
  ws.getCell('D43').value = { formula: 'E28+E34+E39' }; ws.getCell('D43').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('D43').font = FONT_DATA_BOLD;
  ws.getCell('E43').value = { formula: '1+(E42/100)' }; ws.getCell('E43').numFmt = FMT_DECIMAL2; ws.getCell('E43').font = FONT_DATA_BOLD;

  ws.getRow(44).height = 29.4;
  ws.getCell('A44').value = 'TOTAL PRIX DE REVIENT'; ws.getCell('A44').font = FONT_DATA_BOLD; ws.getCell('A44').fill = SECTION_FILL;
  ws.getCell('E44').value = { formula: 'E43*D43' }; ws.getCell('E44').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('E44').font = FONT_DATA_BOLD; ws.getCell('E44').fill = SECTION_FILL;

  // === SECTION 6: Prix de vente (4 tiers) ===
  ws.getRow(46).height = 29.4;
  ws.getCell('A46').value = '6 - PRIX DE VENTE PRODUCTION'; ws.getCell('A46').font = FONT_DATA_BOLD; ws.getCell('A46').fill = SECTION_FILL;
  ws.getCell('D46').value = 'marge'; ws.getCell('D46').font = FONT_DATA;
  ws.getCell('E46').value = 'PV'; ws.getCell('E46').font = FONT_DATA;
  ws.mergeCells('F46:G46');

  const pvTiers: Array<{ row: number; label: string; margin: number; field: keyof typeof form.margesProdDeloc }> = [
    { row: 47, label: '200 / 500 m', margin: form.margesProdDeloc.pv200_500, field: 'pv200_500' },
    { row: 48, label: '501/2000 m', margin: form.margesProdDeloc.pv501_2000, field: 'pv501_2000' },
    { row: 49, label: '2001/3500 m', margin: form.margesProdDeloc.pv2001_3500, field: 'pv2001_3500' },
    { row: 50, label: 'au-delà 3500 m', margin: form.margesProdDeloc.pvAbove3500, field: 'pvAbove3500' },
  ];

  for (const pv of pvTiers) {
    ws.getCell(`A${pv.row}`).value = pv.label;
    ws.getCell(`A${pv.row}`).font = FONT_DATA;
    ws.getCell(`A${pv.row}`).fill = PINK_FILL;
    ws.getCell(`D${pv.row}`).value = pv.margin;
    ws.getCell(`D${pv.row}`).font = FONT_DATA;
    ws.getCell(`D${pv.row}`).fill = YELLOW_FILL;
    if (pv.row === 48) ws.getCell(`D${pv.row}`).numFmt = FMT_DECIMAL1;
    ws.getCell(`E${pv.row}`).value = { formula: `E44*D${pv.row}` };
    ws.getCell(`E${pv.row}`).numFmt = FMT_EURO_ACCOUNTING;
    ws.getCell(`E${pv.row}`).font = FONT_DATA_BOLD;
    ws.mergeCells(`F${pv.row}:G${pv.row}`);
    ws.getCell(`F${pv.row}`).numFmt = FMT_EURO_FR;
  }

  // ROW 51: COMMENTAIRES
  ws.mergeCells('A51:G51');
  ws.getCell('A51').value = 'COMMENTAIRES/INFORMATIONS:' + (form.commentaires.prodDeloc ? '\n' + form.commentaires.prodDeloc : ''); ws.getCell('A51').font = FONT_DATA_BOLD;
  ws.getCell('A51').alignment = { wrapText: true, vertical: 'top' };

  // Apply borders
  const dataRows = [9, 10, 13, 14, 15, 18, 19, 20, 26, 27, 32, 33, 38, 39, 42, 43, 47, 48, 49, 50];
  for (const r of dataRows) {
    for (const c of ['A', 'B', 'C', 'D', 'E']) {
      const cell = ws.getCell(`${c}${r}`);
      if (!cell.border) cell.border = BORDER_THIN_ALL;
    }
  }
}
