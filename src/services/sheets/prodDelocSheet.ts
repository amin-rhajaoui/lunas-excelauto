import type { Worksheet } from 'exceljs';
import type { FormData } from '../../types';
import { ACTIVITES, RATE_BUREAU, TRANSPORT_LUNAS } from '../../constants';
import {
  YELLOW_FILL, BRIGHT_YELLOW_FILL, SECTION_FILL, PINK_FILL,
  FONT_WARNING, FONT_HEADER, FONT_TITLE, FONT_DATA, FONT_DATA_BOLD,
  FONT_DATE, FONT_SUB_HEADER,
  BORDER_THIN_ALL, BORDER_MEDIUM_ALL,
  ALIGN_CENTER, ALIGN_LEFT,
  FMT_EURO, FMT_EURO_ACCOUNTING, FMT_PERCENT, FMT_DECIMAL2, FMT_INT, FMT_DATE,
  FMT_DECIMAL1, FMT_EURO_FR,
} from './sharedStyles';

export function buildProdDelocSheet(ws: Worksheet, form: FormData) {
  // Column widths (A-G used, Societe in G2)
  ws.getColumn('A').width = 90.66;
  ws.getColumn('B').width = 43.55;
  ws.getColumn('C').width = 13.33;
  ws.getColumn('D').width = 21.11;
  ws.getColumn('E').width = 20.44;
  ws.getColumn('F').width = 6.33;
  ws.getColumn('G').width = 19.55;
  ws.getColumn('H').width = 55.89;

  // === HEADER ===
  ws.getRow(1).height = 21.6;
  ws.getCell('A1').value = 'Veiller à bien remplir tous les * et les cases en jaune';
  ws.getCell('A1').font = FONT_WARNING;

  ws.getRow(2).height = 24.9;
  ws.getCell('A2').value = 'CLIENT * :'; ws.getCell('A2').font = FONT_HEADER;
  ws.getCell('B2').value = form.header.client; ws.getCell('B2').font = FONT_HEADER; ws.getCell('B2').fill = YELLOW_FILL;
  // Societe in G2 for Prod deloc (not H2)
  ws.getCell('F2').value = 'SOCIETE * :'; ws.getCell('F2').font = FONT_HEADER;
  ws.getCell('G2').value = form.header.societe; ws.getCell('G2').font = FONT_HEADER; ws.getCell('G2').fill = YELLOW_FILL;

  ws.getRow(3).height = 24.9;
  ws.getCell('A3').value = 'COLLECTION :'; ws.getCell('A3').font = FONT_HEADER;
  ws.getCell('B3').value = form.header.collection; ws.getCell('B3').font = FONT_HEADER; ws.getCell('B3').fill = YELLOW_FILL;

  ws.getRow(4).height = 24.9;
  ws.getCell('A4').value = 'PROJET / REFERENCE * :'; ws.getCell('A4').font = FONT_HEADER;
  ws.getCell('B4').value = form.header.projet; ws.getCell('B4').font = FONT_HEADER; ws.getCell('B4').fill = YELLOW_FILL;

  ws.mergeCells('E4:H5');
  ws.getCell('E4').value = 'PRIX PRODUCTION\nDéloc\n';
  ws.getCell('E4').font = FONT_TITLE;
  ws.getCell('E4').fill = PINK_FILL;
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

  // B15=38 for Prod deloc
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

  // ROW 22: Total frais (same as other sheets)
  ws.getRow(22).height = 29.4;
  ws.getCell('A22').value = 'TOTAL FRAIS ENGAGES PROD DELOC'; ws.getCell('A22').font = FONT_DATA_BOLD; ws.getCell('A22').fill = SECTION_FILL;
  ws.getCell('E22').value = { formula: 'SUM(E9:E15)' }; ws.getCell('E22').numFmt = FMT_EURO; ws.getCell('E22').font = FONT_DATA_BOLD; ws.getCell('E22').fill = SECTION_FILL;

  // === SECTION 2: Matieres (E26 for input, different row layout) ===
  ws.getRow(24).height = 29.4;
  ws.mergeCells('A24:H24');
  ws.getCell('A24').value = '2- COUTS DES MATIERES'; ws.getCell('A24').font = FONT_DATA_BOLD; ws.getCell('A24').fill = SECTION_FILL; ws.getCell('A24').border = BORDER_MEDIUM_ALL; ws.getCell('A24').alignment = ALIGN_LEFT;

  ws.getRow(25).height = 42.6;
  ws.mergeCells('D25:E25');
  ws.getCell('D25').value = 'Coût necessaire par unité'; ws.getCell('D25').font = FONT_SUB_HEADER; ws.getCell('D25').alignment = ALIGN_CENTER;
  ws.mergeCells('F25:H28');
  ws.getCell('F25').value = 'Commentaires :'; ws.getCell('F25').font = FONT_DATA;

  ws.getRow(26).height = 28.8;
  ws.getCell('A26').value = 'Coût matieres du galon au mtrs (fils ou autres)'; ws.getCell('A26').font = FONT_DATA;
  ws.getCell('E26').value = form.coutsMatieres.coutMatieresGalon; ws.getCell('E26').fill = YELLOW_FILL; ws.getCell('E26').numFmt = FMT_EURO; ws.getCell('E26').font = FONT_DATA;

  ws.getRow(28).height = 28.8;
  ws.getCell('A28').value = '% matières pour atelier déloc ( A définir avec la prod)'; ws.getCell('A28').font = FONT_DATA;
  ws.getCell('B28').value = '3 ou 5 % ??'; ws.getCell('B28').font = FONT_DATA;
  ws.getCell('D28').value = form.coutsMatieres.aleaPercentProdDeloc; ws.getCell('D28').fill = YELLOW_FILL; ws.getCell('D28').numFmt = FMT_PERCENT; ws.getCell('D28').font = FONT_DATA;
  ws.getCell('E28').value = { formula: 'E26*D28' }; ws.getCell('E28').numFmt = FMT_EURO;

  // ROW 29: Total matieres (in row 29 for Prod deloc, NOT 30)
  ws.getRow(29).height = 30.6;
  ws.getCell('A29').value = 'TOTAL MATIERES'; ws.getCell('A29').font = FONT_DATA_BOLD; ws.getCell('A29').fill = SECTION_FILL;
  ws.getCell('E29').value = { formula: 'E26+E28' }; ws.getCell('E29').numFmt = FMT_EURO; ws.getCell('E29').font = FONT_DATA_BOLD; ws.getCell('E29').fill = SECTION_FILL;

  // === SECTION 3: Fabrication (6 rows: 33-38) ===
  ws.getRow(31).height = 29.4;
  ws.getCell('A31').value = '3- TEMPS DE FABRICATION'; ws.getCell('A31').font = FONT_DATA_BOLD; ws.getCell('A31').fill = SECTION_FILL;

  ws.getRow(32).height = 58.2;
  ['A', 'B', 'C', 'D', 'E'].forEach((col, i) => {
    const c = ws.getCell(`${col}32`); c.value = headers[i]; c.font = FONT_DATA_BOLD; c.border = BORDER_MEDIUM_ALL; c.alignment = ALIGN_CENTER;
  });

  const fabRows: Array<{ row: number; label: string; rate: number; value: number }> = [
    { row: 33, label: 'Temps Collection', rate: 30, value: form.fabricationProdDeloc.tempsCollection },
    { row: 34, label: 'temps Presse', rate: 30, value: form.fabricationProdDeloc.tempsPresse },
    { row: 35, label: 'Cout atelier M2P Manip Textile', rate: 48, value: form.fabricationProdDeloc.coutAtelierManipTextile },
    { row: 36, label: 'Coût atelier M2P broderies', rate: 58, value: form.fabricationProdDeloc.coutAtelierBroderies },
    { row: 37, label: 'Sous traitance deloc Maroc', rate: 7, value: form.fabricationProdDeloc.sousTraitanceMaroc },
    { row: 38, label: 'Sous traitance deloc Mada', rate: 7.5, value: form.fabricationProdDeloc.sousTraitanceMada },
  ];

  for (const fr of fabRows) {
    ws.getRow(fr.row).height = 28.8;
    ws.getCell(`A${fr.row}`).value = fr.label; ws.getCell(`A${fr.row}`).font = FONT_DATA;
    ws.getCell(`B${fr.row}`).value = fr.rate; ws.getCell(`B${fr.row}`).numFmt = FMT_EURO_ACCOUNTING; ws.getCell(`B${fr.row}`).font = FONT_DATA;
    ws.getCell(`C${fr.row}`).value = 'heure'; ws.getCell(`C${fr.row}`).font = FONT_DATA;
    ws.getCell(`D${fr.row}`).value = fr.value; ws.getCell(`D${fr.row}`).fill = YELLOW_FILL; ws.getCell(`D${fr.row}`).font = FONT_DATA;
    ws.getCell(`E${fr.row}`).value = { formula: `B${fr.row}*D${fr.row}` }; ws.getCell(`E${fr.row}`).numFmt = FMT_EURO_ACCOUNTING;
  }

  // ROW 40: Total fabrication
  ws.getRow(40).height = 29.4;
  ws.getCell('A40').value = 'TOTAL FABRICATION'; ws.getCell('A40').font = FONT_DATA_BOLD; ws.getCell('A40').fill = SECTION_FILL;
  ws.getCell('E40').value = { formula: 'SUM(E33:E38)' }; ws.getCell('E40').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('E40').font = FONT_DATA_BOLD; ws.getCell('E40').fill = SECTION_FILL;

  // === SECTION 4: Transport (LUNAS only, no CHA) ===
  ws.getRow(42).height = 29.4;
  ws.mergeCells('A42:H42');
  ws.getCell('A42').value = '4- TRANSPORT'; ws.getCell('A42').font = FONT_DATA_BOLD; ws.getCell('A42').fill = SECTION_FILL; ws.getCell('A42').border = BORDER_MEDIUM_ALL; ws.getCell('A42').alignment = ALIGN_LEFT;

  ws.getRow(43).height = 28.8;
  ws.getCell('A43').value = 'Transport'; ws.getCell('A43').font = FONT_DATA;
  ws.getCell('E43').value = 'LUNAS'; ws.getCell('E43').font = FONT_DATA_BOLD;

  ws.getRow(44).height = 28.8;
  ws.getCell('A44').value = 'taux transport'; ws.getCell('A44').font = FONT_DATA;
  ws.getCell('E44').value = TRANSPORT_LUNAS; ws.getCell('E44').numFmt = FMT_PERCENT; ws.getCell('E44').font = FONT_DATA;

  ws.getRow(45).height = 28.8;
  ws.getCell('A45').value = 'total transport'; ws.getCell('A45').font = FONT_DATA;
  // Prod deloc uses $G$2 not $H$2
  ws.getCell('E45').value = { formula: 'IF($G$2="LUNAS",(E40+E29)*E44,0)' }; ws.getCell('E45').numFmt = FMT_EURO;

  // === SECTION 5: Prix de revient ===
  ws.getRow(47).height = 29.4;
  ws.mergeCells('A47:H47');
  ws.getCell('A47').value = '5- PRIX DE REVIENT'; ws.getCell('A47').font = FONT_DATA_BOLD; ws.getCell('A47').fill = SECTION_FILL; ws.getCell('A47').border = BORDER_MEDIUM_ALL; ws.getCell('A47').alignment = ALIGN_LEFT;

  ws.getRow(48).height = 32.4;
  ws.getCell('A48').value = 'Activité'; ws.getCell('A48').font = FONT_DATA;
  ws.getCell('B48').value = form.activite; ws.getCell('B48').fill = BRIGHT_YELLOW_FILL; ws.getCell('B48').font = FONT_DATA;
  ws.getCell('E48').value = ACTIVITES[form.activite]; ws.getCell('E48').fill = BRIGHT_YELLOW_FILL; ws.getCell('E48').numFmt = FMT_INT; ws.getCell('E48').font = FONT_DATA;

  ws.getRow(49).height = 28.8;
  ws.getCell('A49').value = 'coût de fabrication (matières + fab)'; ws.getCell('A49').font = FONT_DATA;
  // D49 = E29 + E40 + E45 (no F transport for prod deloc)
  ws.getCell('D49').value = { formula: 'E29+E40+E45' }; ws.getCell('D49').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E49').value = { formula: '1+(E48/100)' }; ws.getCell('E49').numFmt = FMT_DECIMAL2;

  ws.getRow(51).height = 29.4;
  ws.getCell('A51').value = 'TOTAL PRIX DE REVIENT'; ws.getCell('A51').font = FONT_DATA_BOLD; ws.getCell('A51').fill = SECTION_FILL;
  ws.getCell('E51').value = { formula: 'E49*D49' }; ws.getCell('E51').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('E51').font = FONT_DATA_BOLD; ws.getCell('E51').fill = SECTION_FILL;

  // === SECTION 6: Prix de vente (4 tiers) ===
  ws.getRow(53).height = 29.4;
  ws.getCell('A53').value = '6 - PRIX DE VENTE PRODUCTION'; ws.getCell('A53').font = FONT_DATA_BOLD; ws.getCell('A53').fill = SECTION_FILL;
  ws.getCell('D53').value = 'marge'; ws.getCell('D53').font = FONT_DATA;
  ws.getCell('E53').value = 'PV'; ws.getCell('E53').font = FONT_DATA;
  ws.mergeCells('F53:H53');

  const pvTiers: Array<{ row: number; label: string; margin: number; field: keyof typeof form.margesProdDeloc }> = [
    { row: 54, label: '200 / 500 m', margin: form.margesProdDeloc.pv200_500, field: 'pv200_500' },
    { row: 55, label: '501/2000 m', margin: form.margesProdDeloc.pv501_2000, field: 'pv501_2000' },
    { row: 56, label: '2001/3500 m', margin: form.margesProdDeloc.pv2001_3500, field: 'pv2001_3500' },
    { row: 57, label: 'au-delà 3500 m', margin: form.margesProdDeloc.pvAbove3500, field: 'pvAbove3500' },
  ];

  for (const pv of pvTiers) {
    ws.getRow(pv.row).height = 28.8;
    ws.getCell(`A${pv.row}`).value = pv.label;
    ws.getCell(`A${pv.row}`).font = FONT_DATA;
    ws.getCell(`A${pv.row}`).fill = PINK_FILL;
    ws.getCell(`D${pv.row}`).value = pv.margin;
    ws.getCell(`D${pv.row}`).font = FONT_DATA;
    ws.getCell(`D${pv.row}`).fill = YELLOW_FILL;
    if (pv.row === 55) ws.getCell(`D${pv.row}`).numFmt = FMT_DECIMAL1;
    ws.getCell(`E${pv.row}`).value = { formula: `E51*D${pv.row}` };
    ws.getCell(`E${pv.row}`).numFmt = FMT_EURO_ACCOUNTING;
    ws.mergeCells(`F${pv.row}:H${pv.row}`);
    ws.getCell(`F${pv.row}`).numFmt = FMT_EURO_FR;
  }

  // Apply borders
  const dataRows = [9, 10, 13, 14, 15, 18, 19, 20, 26, 28, 33, 34, 35, 36, 37, 38, 44, 45, 48, 49, 54, 55, 56, 57];
  for (const r of dataRows) {
    for (const c of ['A', 'B', 'C', 'D', 'E']) {
      const cell = ws.getCell(`${c}${r}`);
      if (!cell.border) cell.border = BORDER_THIN_ALL;
    }
  }
}
