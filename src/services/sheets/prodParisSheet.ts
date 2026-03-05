import type { Worksheet } from 'exceljs';
import type { FormData } from '../../types';
import { ACTIVITES, RATE_BUREAU, TRANSPORT_LUNAS, TRANSPORT_CHA } from '../../constants';
import {
  YELLOW_FILL, BRIGHT_YELLOW_FILL, SECTION_FILL, PROD_PARIS_FILL,
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
  ws.getCell('E4').value = 'PRIX PROD FAB PARIS 200 M \nOU PROD PARIS\n';
  ws.getCell('E4').font = FONT_TITLE;
  ws.getCell('E4').fill = PROD_PARIS_FILL;
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

  // ROW 21: Total frais
  ws.getRow(21).height = 29.4;
  ws.getCell('A21').value = 'TOTAL FRAIS ENGAGES COLLECTION'; ws.getCell('A21').font = FONT_DATA_BOLD; ws.getCell('A21').fill = SECTION_FILL;
  ws.getCell('E21').value = { formula: 'SUM(E9:E15)' }; ws.getCell('E21').numFmt = FMT_EURO; ws.getCell('E21').font = FONT_DATA_BOLD; ws.getCell('E21').fill = SECTION_FILL;

  // === SECTION 2 ===
  ws.getRow(23).height = 29.4;
  ws.mergeCells('A23:H23');
  ws.getCell('A23').value = '2- COUTS DES MATIERES'; ws.getCell('A23').font = FONT_DATA_BOLD; ws.getCell('A23').fill = SECTION_FILL; ws.getCell('A23').border = BORDER_MEDIUM_ALL; ws.getCell('A23').alignment = ALIGN_LEFT;

  ws.getRow(24).height = 42.6;
  ws.mergeCells('D24:E24');
  ws.getCell('D24').value = 'Coût necessaire par unité'; ws.getCell('D24').font = FONT_SUB_HEADER; ws.getCell('D24').alignment = ALIGN_CENTER;
  ws.mergeCells('F24:H28');
  ws.getCell('F24').value = 'Commentaires :'; ws.getCell('F24').font = FONT_DATA;

  ws.getRow(25).height = 28.8;
  ws.getCell('A25').value = 'Coût matieres du galon au mtrs (fils ou autres)'; ws.getCell('A25').font = FONT_DATA;
  ws.getCell('E25').value = form.coutsMatieres.coutMatieresGalon; ws.getCell('E25').fill = YELLOW_FILL; ws.getCell('E25').numFmt = FMT_EURO; ws.getCell('E25').font = FONT_DATA;

  ws.getRow(27).height = 28.8;
  ws.getCell('A27').value = '% matières pour atelier déloc ( A définir avec la prod)'; ws.getCell('A27').font = FONT_DATA;
  ws.getCell('B27').value = 0.05; ws.getCell('B27').numFmt = FMT_PERCENT; ws.getCell('B27').font = FONT_DATA;
  ws.getCell('C27').value = 0.05; ws.getCell('C27').numFmt = FMT_PERCENT; ws.getCell('C27').font = FONT_DATA;
  ws.getCell('D27').value = form.coutsMatieres.aleaPercent; ws.getCell('D27').fill = YELLOW_FILL; ws.getCell('D27').numFmt = FMT_PERCENT; ws.getCell('D27').font = FONT_DATA;
  ws.getCell('E27').value = { formula: 'E25*D27' }; ws.getCell('E27').numFmt = FMT_EURO;

  ws.getRow(28).height = 30.6;
  ws.getCell('A28').value = 'TOTAL MATIERES'; ws.getCell('A28').font = FONT_DATA_BOLD; ws.getCell('A28').fill = SECTION_FILL;
  ws.getCell('E28').value = { formula: 'E25+E27' }; ws.getCell('E28').numFmt = FMT_EURO; ws.getCell('E28').font = FONT_DATA_BOLD; ws.getCell('E28').fill = SECTION_FILL;

  // === SECTION 3: Fabrication ===
  // ROW 30: Section header + column headers (same line)
  ws.getRow(30).height = 58.2;
  ws.getCell('A30').value = '3- TEMPS DE FABRICATION';
  ws.getCell('A30').font = FONT_DATA_BOLD;
  ws.getCell('A30').fill = SECTION_FILL;
  ws.getCell('A30').border = BORDER_MEDIUM_ALL;
  ws.getCell('A30').alignment = ALIGN_LEFT;
  const fabColHeaders = ['Coût unitaire', 'Unité', 'Unités Nécessaires', 'Prix de revient HT'];
  ['B', 'C', 'D', 'E'].forEach((col, i) => {
    const c = ws.getCell(`${col}30`);
    c.value = fabColHeaders[i]; c.font = FONT_DATA_BOLD; c.border = BORDER_MEDIUM_ALL; c.alignment = ALIGN_CENTER;
  });

  // ROW 31: Sub-header
  ws.getRow(31).height = 28.8;
  ws.getCell('A31').value = 'TEMPS LANCEMENT COMMANDE 200 M OU PROD PARIS';
  ws.getCell('A31').font = FONT_DATA_BOLD;

  // ROW 32: Info atelier (teal fill, no data)
  ws.getRow(32).height = 28.8;
  ws.getCell('A32').value = 'Information atelier = 1h15 = arrondi à 1h30';
  ws.getCell('A32').font = FONT_DATA;
  ws.getCell('A32').fill = PROD_PARIS_FILL;
  ws.getCell('B32').fill = PROD_PARIS_FILL;
  ws.getCell('C32').fill = PROD_PARIS_FILL;
  ws.getCell('D32').fill = PROD_PARIS_FILL;
  ws.getCell('E32').fill = PROD_PARIS_FILL;

  // ROW 33: Single fab row - Cout atelier M2P Production/200M (rate 48)
  ws.getRow(33).height = 28.8;
  ws.getCell('A33').value = 'Cout  atelier M2P Manip Textile Production/200M'; ws.getCell('A33').font = FONT_DATA;
  ws.getCell('B33').value = 48; ws.getCell('B33').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('B33').font = FONT_DATA;
  ws.getCell('C33').value = 'heure'; ws.getCell('C33').font = FONT_DATA;
  ws.getCell('D33').value = form.fabricationProdParis.coutAtelierProd200m; ws.getCell('D33').fill = YELLOW_FILL; ws.getCell('D33').font = FONT_DATA;
  ws.getCell('E33').value = { formula: 'B33*D33' }; ws.getCell('E33').numFmt = FMT_EURO_ACCOUNTING;

  // ROW 34: Total fabrication
  ws.getRow(34).height = 29.4;
  ws.getCell('A34').value = 'TOTAL FABRICATION'; ws.getCell('A34').font = FONT_DATA_BOLD; ws.getCell('A34').fill = SECTION_FILL;
  ws.getCell('E34').value = { formula: 'SUM(E31:E33)' }; ws.getCell('E34').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('E34').font = FONT_DATA_BOLD; ws.getCell('E34').fill = SECTION_FILL;

  // === SECTION 4: Transport ===
  ws.getRow(36).height = 29.4;
  ws.mergeCells('A36:H36');
  ws.getCell('A36').value = '4- TRANSPORT'; ws.getCell('A36').font = FONT_DATA_BOLD; ws.getCell('A36').fill = SECTION_FILL; ws.getCell('A36').border = BORDER_MEDIUM_ALL; ws.getCell('A36').alignment = ALIGN_LEFT;

  ws.getRow(37).height = 28.8;
  ws.getCell('A37').value = 'Transport'; ws.getCell('A37').font = FONT_DATA;
  ws.getCell('E37').value = 'LUNAS'; ws.getCell('E37').font = FONT_DATA_BOLD;
  ws.getCell('F37').value = 'CHA'; ws.getCell('F37').font = FONT_DATA_BOLD;

  ws.getRow(38).height = 28.8;
  ws.getCell('A38').value = 'taux transport'; ws.getCell('A38').font = FONT_DATA;
  ws.getCell('E38').value = TRANSPORT_LUNAS; ws.getCell('E38').numFmt = FMT_PERCENT; ws.getCell('E38').font = FONT_DATA;
  ws.getCell('F38').value = TRANSPORT_CHA; ws.getCell('F38').numFmt = FMT_PERCENT; ws.getCell('F38').font = FONT_SMALL;

  ws.getRow(39).height = 28.8;
  ws.getCell('A39').value = 'TOTAL TRANSPORT'; ws.getCell('A39').font = FONT_DATA;
  ws.getCell('E39').value = { formula: 'IF($H$2="LUNAS",(E34+E28)*E38,0)' }; ws.getCell('E39').numFmt = FMT_EURO;
  ws.getCell('F39').value = { formula: 'IF($H$2="CHA",(E34+E28)*F38,0)' }; ws.getCell('F39').numFmt = FMT_EURO;

  // === SECTION 5: Prix de revient ===
  ws.getRow(41).height = 29.4;
  ws.mergeCells('A41:H41');
  ws.getCell('A41').value = '5- LE PRIX DE REVIENT'; ws.getCell('A41').font = FONT_DATA_BOLD; ws.getCell('A41').fill = SECTION_FILL; ws.getCell('A41').border = BORDER_MEDIUM_ALL; ws.getCell('A41').alignment = ALIGN_LEFT;

  ws.getRow(42).height = 32.4;
  ws.getCell('A42').value = 'Activité'; ws.getCell('A42').font = FONT_DATA;
  ws.getCell('B42').value = form.activite; ws.getCell('B42').fill = BRIGHT_YELLOW_FILL; ws.getCell('B42').font = FONT_DATA;
  ws.getCell('E42').value = ACTIVITES[form.activite]; ws.getCell('E42').fill = BRIGHT_YELLOW_FILL; ws.getCell('E42').numFmt = FMT_INT; ws.getCell('E42').font = FONT_DATA;

  ws.getRow(43).height = 28.8;
  ws.getCell('A43').value = 'coût de fabrication (matières + fab)'; ws.getCell('A43').font = FONT_DATA;
  ws.getCell('D43').value = { formula: 'E28+E34+E39+F39' }; ws.getCell('D43').numFmt = FMT_EURO_ACCOUNTING;
  ws.getCell('E43').value = { formula: '1+(E42/100)' }; ws.getCell('E43').numFmt = FMT_DECIMAL2;

  ws.getRow(44).height = 29.4;
  ws.getCell('A44').value = 'TOTAL PRIX DE REVIENT'; ws.getCell('A44').font = FONT_DATA_BOLD; ws.getCell('A44').fill = SECTION_FILL;
  ws.getCell('E44').value = { formula: 'E43*D43' }; ws.getCell('E44').numFmt = FMT_EURO_ACCOUNTING; ws.getCell('E44').font = FONT_DATA_BOLD; ws.getCell('E44').fill = SECTION_FILL;

  // === SECTION 6: Prix de vente ===
  ws.getRow(46).height = 29.4;
  ws.getCell('A46').value = '6 - PRIX DE VENTE'; ws.getCell('A46').font = FONT_DATA_BOLD; ws.getCell('A46').fill = SECTION_FILL;
  ws.getCell('D46').value = 'marge'; ws.getCell('D46').font = FONT_DATA;
  ws.getCell('E46').value = 'PV'; ws.getCell('E46').font = FONT_DATA;
  ws.mergeCells('F46:H46');
  ws.getCell('F46').value = 'PRIX DE VENTE ANNONCE'; ws.getCell('F46').font = FONT_DATA;

  // ROW 47: Single PV row
  ws.getRow(47).height = 28.8;
  ws.getCell('A47').value = 'Prix de vente Prod Paris ou 200 M'; ws.getCell('A47').font = FONT_DATA;
  ws.getCell('D47').value = form.margesProdParis.pvProdParis; ws.getCell('D47').fill = YELLOW_FILL; ws.getCell('D47').font = FONT_DATA;
  ws.getCell('E47').value = { formula: 'E44*D47' }; ws.getCell('E47').numFmt = FMT_EURO_ACCOUNTING;
  ws.mergeCells('F47:H47');

  // ROW 48: COMMENTAIRES
  ws.getRow(48).height = 28.8;
  ws.mergeCells('A48:H48');
  ws.getCell('A48').value = 'COMMENTAIRES/INFORMATIONS:' + (form.commentaires.prodParis ? '\n' + form.commentaires.prodParis : ''); ws.getCell('A48').font = FONT_DATA_BOLD;

  // Apply borders
  const dataRows = [9, 10, 13, 14, 15, 18, 19, 20, 25, 27, 33, 38, 39, 42, 43, 47];
  for (const r of dataRows) {
    for (const c of ['A', 'B', 'C', 'D', 'E']) {
      const cell = ws.getCell(`${c}${r}`);
      if (!cell.border) cell.border = BORDER_THIN_ALL;
    }
  }
}
