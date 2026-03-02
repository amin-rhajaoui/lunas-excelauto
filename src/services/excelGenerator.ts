import ExcelJS from 'exceljs';
import type { FormData } from '../types';
import { SHEET_NAMES } from '../constants';
import { buildCollectionSheet } from './sheets/collectionSheet';
import { buildPresseSheet } from './sheets/presseSheet';
import { buildProdParisSheet } from './sheets/prodParisSheet';
import { buildProdDelocSheet } from './sheets/prodDelocSheet';
import { buildMappingSheet } from './sheets/mappingSheet';

export async function generateExcel(form: FormData): Promise<void> {
  const workbook = new ExcelJS.Workbook();

  // Create sheets in the same order as the template
  const wsCollection = workbook.addWorksheet(SHEET_NAMES.collection);
  const wsPresse = workbook.addWorksheet(SHEET_NAMES.presse);
  const wsProdParis = workbook.addWorksheet(SHEET_NAMES.prodParis);
  const wsProdDeloc = workbook.addWorksheet(SHEET_NAMES.prodDeloc);
  const wsMapping = workbook.addWorksheet(SHEET_NAMES.mapping);

  // Build each sheet
  buildCollectionSheet(wsCollection, form);
  buildPresseSheet(wsPresse, form);
  buildProdParisSheet(wsProdParis, form);
  buildProdDelocSheet(wsProdDeloc, form);
  buildMappingSheet(wsMapping);

  // Generate buffer and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const filename = `${form.header.client || 'Client'} ${form.header.projet || 'Projet'}.xlsx`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
