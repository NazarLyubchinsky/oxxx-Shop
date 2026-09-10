const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const sourcePath = path.resolve(__dirname, '..', 'Склад-на-04-09-2026_D4 (1).xls');
const outputPath = path.resolve(__dirname, '..', 'src', 'utils', 'shopItems.json');

const workbook = XLSX.readFile(sourcePath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });
const headers = rows[0].map(value => String(value || '').trim());
const isNewFormat = headers.includes('Розмір') && headers.includes('PCD1');

const parseDescription = (description) => {
  const value = String(description || '').replace(/\s+/g, ' ').trim();
  const sizeMatch = value.match(/R(\d+)/i);
  const widths = [...value.matchAll(/(\d+(?:[.,]\d+)?)J/gi)];
  const pcdMatches = [...value.matchAll(/(\d+)\s*[*xх]\s*(\d+(?:[.,]\d+)?)/gi)];
  const etMatch = value.match(/ET\s*([+-]?\d+(?:[.,]\d+)?)/i);
  const diaMatch = value.match(/DIA\s*([+-]?\d+(?:[.,]\d+)?)/i);

  return {
    size: sizeMatch ? `R${sizeMatch[1]}` : '',
    width: widths[0] ? widths[0][1].replace(',', '.') : '',
    pcd: pcdMatches[pcdMatches.length - 1]
      ? `${pcdMatches[pcdMatches.length - 1][1]}x${pcdMatches[pcdMatches.length - 1][2].replace(',', '.')}`
      : '',
    et: etMatch ? etMatch[1].replace(',', '.') : '',
    dia: diaMatch ? diaMatch[1].replace('.', ',') : '',
  };
};

const products = rows
  .slice(1)
  .filter(row => Number.isFinite(Number(row[0])))
  .map((row, index) => {
    const code = String(row[0]);
    const model = isNewFormat ? code : String(row[1]).trim();
    const description = isNewFormat
      ? [row[1], row[2], row[3], row[4]].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
      : String(row[5] || '').replace(/\s+/g, ' ').trim();
    const quantity = isNewFormat ? row[6] : row[3];
    const rawD4 = isNewFormat ? row[5] : row[2];

    if (!description || quantity === null || quantity === undefined) return null;
    if (model === 'ZW-244 BP' || description.includes('ZW-244 BP')) return null;

    const parsed = parseDescription(description);
    const title = `${description} ${model}`.trim();

    return {
      sys: { id: `xls-${code}-${index + 1}` },
      title,
      discount: null,
      size: parsed.size,
      pcd: parsed.pcd,
      dia: parsed.dia,
      supplier: '',
      model,
      code,
      width: parsed.width,
      et: parsed.et,
      d4: Number(rawD4),
      holeType: isNewFormat ? row[7] || '' : row[4] || '',
      imageCollection: { items: [] },
    };
  })
  .filter(Boolean);

fs.writeFileSync(outputPath, `${JSON.stringify(products, null, 2)}\n`);
console.log(`Imported ${products.length} products to ${outputPath}`);