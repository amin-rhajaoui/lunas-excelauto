import type { Worksheet } from 'exceljs';
import { ACTIVITES } from '../../constants';
import type { ActiviteKey } from '../../types';

export function buildMappingSheet(ws: Worksheet) {
  ws.getColumn('A').width = 28.55;

  // Header
  ws.getCell('A1').value = 'Activité';
  ws.getCell('B1').value = '%';

  // Activity rows
  const keys = Object.keys(ACTIVITES) as ActiviteKey[];
  keys.forEach((key, i) => {
    ws.getCell(`A${i + 2}`).value = key;
    ws.getCell(`B${i + 2}`).value = ACTIVITES[key];
    ws.getCell(`B${i + 2}`).numFmt = '0';
  });

  // Societes
  ws.getCell('A8').value = 'Sociétés';
  ws.getCell('A9').value = 'LUNAS';
  ws.getCell('A10').value = 'CHA';
}
