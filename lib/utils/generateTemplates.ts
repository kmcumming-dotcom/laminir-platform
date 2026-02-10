import * as XLSX from 'xlsx-js-style';

// Refined brand colors - fashion-forward palette
const BRAND_CHARCOAL = 'FF1A1A1A';      
const BRAND_CHARCOAL_LIGHT = 'FF2D2D2D'; 
const BRAND_AMBER = 'FFD97706';          
const BRAND_AMBER_LIGHT = 'FFFEF3C7';    
const BRAND_STONE = 'FFFAFAF9';          
const BRAND_STONE_MED = 'FFF5F5F4';      
const BRAND_STONE_DARK = 'FFE7E5E4';     
const BRAND_WHITE = 'FFFFFFFF';
const BRAND_TEXT_SECONDARY = 'FF78716C'; 

// Safe Excel fonts (available on all systems)
const FONT_TITLE = 'Georgia';     // Serif for elegance
const FONT_BODY = 'Calibri';      // Sans-serif for clarity
const FONT_DATA = 'Calibri';      // Data consistency

function createBrandHeaderStyle() {
  return {
    font: { bold: true, sz: 24, color: { rgb: BRAND_CHARCOAL }, name: FONT_TITLE },
    alignment: { horizontal: 'left', vertical: 'center' },
    border: {
      bottom: { style: 'medium', color: { rgb: BRAND_AMBER } },
    },
  };
}

function createSubheaderStyle() {
  return {
    font: { sz: 10, color: { rgb: BRAND_TEXT_SECONDARY }, name: FONT_BODY },
    alignment: { horizontal: 'left', vertical: 'center' },
  };
}

function createColumnHeaderStyle() {
  return {
    font: { bold: true, color: { rgb: BRAND_WHITE }, sz: 10, name: FONT_BODY },
    fill: { fgColor: { rgb: BRAND_CHARCOAL } },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: BRAND_CHARCOAL } },
      bottom: { style: 'medium', color: { rgb: BRAND_AMBER } },
      left: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
      right: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
    },
  };
}

function createDataStyle(rowIndex: number, isFirstCol: boolean = false, alignment: string = 'left') {
  const isEvenRow = rowIndex % 2 === 0;
  const baseStyle: any = {
    font: { sz: 10, color: { rgb: BRAND_CHARCOAL }, name: FONT_DATA },
    fill: { fgColor: { rgb: isEvenRow ? BRAND_WHITE : BRAND_STONE } },
    alignment: { horizontal: alignment, vertical: 'center' },
    border: {
      top: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
      bottom: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
      left: { style: 'thin', color: { rgb: isFirstCol ? BRAND_AMBER : BRAND_STONE_DARK } },
      right: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
    },
  };

  if (isFirstCol) {
    baseStyle.border.left = { style: 'medium', color: { rgb: BRAND_AMBER } };
  }

  return baseStyle;
}
function addDataValidation(ws: any, range: string, options: string[]) {
  if (!ws['!dataValidation']) {
    ws['!dataValidation'] = [];
  }
  
  ws['!dataValidation'].push({
    type: 'list',
    allowBlank: false,
    sqref: range,
    formulas: [`"${options.join(',')}"`],
  });
}
export function downloadForecastTemplate() {
  const wb = XLSX.utils.book_new();

  // Create data with brand header
  const brandHeader = [['laminir.']];
  const subHeader = [['Weekly Forecast Upload']];
  const spacer = [['']];
  
  const headers = [[
    'Retailer Profile',
    'Week Commencing',
    'Market',
    'Channel',
    'Sales Plan',
    'Units Plan',
    'Gross Margin % Plan',
    'AOV Plan',
    'Traffic Plan',
    'Conversion Plan',
    'Marketing Spend Plan',
    'MER Plan',
    'ROAS Plan',
  ]];

  const sampleData = [
    ['UNTLD', '2026-02-10', 'AU', 'Online', 350000, 4200, 0.65, 85, 60000, 0.045, 15000, 9.0, 4.5],
    ['UNTLD', '2026-02-17', 'AU', 'Online', 365000, 4300, 0.65, 85, 62000, 0.045, 16000, 9.0, 4.5],
    ['UNTLD', '2026-02-24', 'AU', 'Online', 370000, 4350, 0.66, 85, 63000, 0.046, 16500, 9.2, 4.6],
  ];

  const wsData = [...brandHeader, ...subHeader, ...spacer, ...headers, ...sampleData];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Column widths
  ws['!cols'] = [
    { wch: 16 }, { wch: 14 }, { wch: 9 }, { wch: 11 }, { wch: 12 },
    { wch: 10 }, { wch: 17 }, { wch: 9 }, { wch: 12 }, { wch: 14 },
    { wch: 17 }, { wch: 9 }, { wch: 9 },
  ];

  // Row heights
  ws['!rows'] = [
    { hpt: 45 },  // Brand header
    { hpt: 20 },  // Subheader
    { hpt: 10 },  // Spacer
    { hpt: 32 },  // Column headers (row 4)
    { hpt: 22 },  // Data rows
    { hpt: 22 },
    { hpt: 22 },
  ];

  // Merge brand header across all columns
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 12 } },  // laminir.
    { s: { r: 1, c: 0 }, e: { r: 1, c: 12 } },  // Subheader
  ];

  // Style brand header (row 1)
  if (ws['A1']) {
    ws['A1'].s = createBrandHeaderStyle();
  }

  // Style subheader (row 2)
  if (ws['A2']) {
    ws['A2'].s = createSubheaderStyle();
  }

  // Style column headers (row 4)
  const headerCells = ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4', 'J4', 'K4', 'L4', 'M4'];
  headerCells.forEach(cell => {
    if (ws[cell]) ws[cell].s = createColumnHeaderStyle();
  });

  // Style data rows (starting from row 5)
  const dataStartRow = 5;
  for (let row = 0; row < sampleData.length; row++) {
    const actualRow = dataStartRow + row;
    
    for (let col = 0; col < headers[0].length; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: actualRow - 1, c: col });
      if (ws[cellAddress]) {
        const isFirstCol = col === 0;
        let alignment = 'left';

        // Right-align numbers
        if (col >= 4 && col <= 12) {
          alignment = 'right';
        }
        // Center-align dates, markets, channels
        if (col === 1 || col === 2 || col === 3) {
          alignment = 'center';
        }

        ws[cellAddress].s = createDataStyle(actualRow, isFirstCol, alignment);

        // Apply number formats
        if (col === 4 || col === 10) { // Sales, Marketing Spend
          ws[cellAddress].z = '$#,##0';
        } else if (col === 5) { // Units
          ws[cellAddress].z = '#,##0';
        } else if (col === 6) { // Gross Margin %
          ws[cellAddress].z = '0.0%';
        } else if (col === 7) { // AOV
          ws[cellAddress].z = '$0';
        } else if (col === 8) { // Traffic
          ws[cellAddress].z = '#,##0';
        } else if (col === 9) { // Conversion
          ws[cellAddress].z = '0.00%';
        } else if (col === 11 || col === 12) { // MER, ROAS
          ws[cellAddress].z = '0.0';
        } else if (col === 1) { // Date
          ws[cellAddress].z = 'yyyy-mm-dd';
        }
      }
    }
  }
// Add data validation dropdowns
  addDataValidation(ws, 'C5:C1000', ['AU', 'US', 'UK', 'EU', 'ROW']); // Market
  addDataValidation(ws, 'D5:D1000', ['Online', 'Stores', 'Wholesale']); // Channel
  // Freeze header rows (rows 1-4)
  ws['!freeze'] = { xSplit: 0, ySplit: 4 };

  XLSX.utils.book_append_sheet(wb, ws, 'Forecast Template');

  // ========== INSTRUCTIONS SHEET ==========
  const instructions = [
    [''],
    ['laminir.'],
    ['Weekly Forecast Upload Template'],
    [''],
    ['Upload your planned metrics for upcoming trading weeks'],
    [''],
    [''],
    ['COLUMN REFERENCE'],
    [''],
    ['Retailer Profile', 'Your retailer name (e.g., UNTLD)'],
    ['Week Commencing', 'Week start date in YYYY-MM-DD format'],
    ['Market', 'Market code: AU | US | UK | EU | ROW (enter exactly as shown)'],
['Channel', 'Channel: Online | Stores | Wholesale (enter exactly as shown)'],
    ['Sales Plan', 'Forecasted revenue ($)'],
    ['Units Plan', 'Forecasted units sold'],
    ['Gross Margin % Plan', 'Forecasted GM % as decimal (0.65 = 65%)'],
    ['AOV Plan', 'Forecasted average order value ($)'],
    ['Traffic Plan', 'Forecasted sessions/visits'],
    ['Conversion Plan', 'Forecasted conversion rate as decimal (0.045 = 4.5%)'],
    ['Marketing Spend Plan', 'Forecasted marketing investment ($)'],
    ['MER Plan', 'Marketing efficiency: revenue per $1 marketing'],
    ['ROAS Plan', 'Return on ad spend: revenue per $1 ads'],
    [''],
    [''],
    ['BEFORE UPLOADING'],
    [''],
    ['Delete sample rows 5-7 from the template sheet', ''],
    ['Maintain rows 1-4 (branding and headers) exactly as provided', ''],
    ['Enter dates as YYYY-MM-DD (e.g., 2026-02-10)', ''],
    ['Express percentages as decimals: 65% → 0.65, 4.5% → 0.045', ''],
    ['Add rows as needed for your forecast period', ''],
    ['Upload at the start of each week', ''],
    [''],
    [''],
    [''],
    ['Questions? hello@laminir.com'],
  ];

  const wsInst = XLSX.utils.aoa_to_sheet(instructions);
  wsInst['!cols'] = [{ wch: 35 }, { wch: 60 }];
  
  const instRowHeights: any[] = [];
  instRowHeights[0] = { hpt: 20 };
  instRowHeights[1] = { hpt: 45 };
  instRowHeights[2] = { hpt: 18 };
  instRowHeights[3] = { hpt: 10 };
  instRowHeights[4] = { hpt: 22 };
  instRowHeights[7] = { hpt: 28 };
  instRowHeights[24] = { hpt: 28 };
  wsInst['!rows'] = instRowHeights;

  wsInst['!merges'] = [
    { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } }, // LAMINIR
    { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } }, // Template name
    { s: { r: 4, c: 0 }, e: { r: 4, c: 1 } }, // Subtitle
    { s: { r: 7, c: 0 }, e: { r: 7, c: 1 } }, // Section header
    { s: { r: 25, c: 0 }, e: { r: 25, c: 1 } }, // Section header
  ];

  // Style laminir brand
  if (wsInst['A2']) {
    wsInst['A2'].s = {
      font: { bold: true, sz: 24, color: { rgb: BRAND_CHARCOAL }, name: FONT_TITLE },
      alignment: { horizontal: 'left', vertical: 'center' },
      border: { bottom: { style: 'medium', color: { rgb: BRAND_AMBER } } },
    };
  }

  // Style template name
  if (wsInst['A3']) {
    wsInst['A3'].s = {
      font: { bold: true, sz: 14, color: { rgb: BRAND_CHARCOAL }, name: FONT_BODY },
      alignment: { horizontal: 'left', vertical: 'center' },
    };
  }

  // Style subtitle
  if (wsInst['A5']) {
    wsInst['A5'].s = {
      font: { sz: 11, color: { rgb: BRAND_TEXT_SECONDARY }, name: FONT_BODY },
      alignment: { horizontal: 'left', vertical: 'center' },
    };
  }

  // Style section headers
  ['A8', 'A26'].forEach(cell => {
    if (wsInst[cell]) {
      wsInst[cell].s = {
        font: { bold: true, sz: 11, color: { rgb: BRAND_CHARCOAL }, name: FONT_BODY },
        fill: { fgColor: { rgb: BRAND_AMBER_LIGHT } },
        alignment: { horizontal: 'left', vertical: 'center' },
        border: {
          left: { style: 'medium', color: { rgb: BRAND_AMBER } },
          top: { style: 'thin', color: { rgb: BRAND_AMBER } },
          bottom: { style: 'thin', color: { rgb: BRAND_AMBER } },
          right: { style: 'thin', color: { rgb: BRAND_AMBER } },
        },
      };
    }
  });

  // Style field reference table
  for (let row = 10; row <= 22; row++) {
    const cellA = XLSX.utils.encode_cell({ r: row - 1, c: 0 });
    const cellB = XLSX.utils.encode_cell({ r: row - 1, c: 1 });
    const isEven = row % 2 === 0;
    
    if (wsInst[cellA]) {
      wsInst[cellA].s = {
        font: { bold: true, sz: 10, color: { rgb: BRAND_CHARCOAL }, name: FONT_BODY },
        fill: { fgColor: { rgb: isEven ? BRAND_STONE_MED : BRAND_STONE } },
        alignment: { horizontal: 'left', vertical: 'center' },
        border: {
          left: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          right: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          top: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          bottom: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
        },
      };
    }
    
    if (wsInst[cellB]) {
      wsInst[cellB].s = {
        font: { sz: 10, color: { rgb: BRAND_TEXT_SECONDARY }, name: FONT_BODY },
        fill: { fgColor: { rgb: isEven ? BRAND_STONE_MED : BRAND_STONE } },
        alignment: { horizontal: 'left', vertical: 'center' },
        border: {
          left: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          right: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          top: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          bottom: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
        },
      };
    }
  }

  // Style instruction steps
  for (let row = 27; row <= 32; row++) {
    const cellA = XLSX.utils.encode_cell({ r: row - 1, c: 0 });
    if (wsInst[cellA]) {
      wsInst[cellA].s = {
        font: { sz: 10, color: { rgb: BRAND_CHARCOAL }, name: FONT_BODY },
        alignment: { horizontal: 'left', vertical: 'center' },
      };
    }
  }

  // Style footer
  if (wsInst['A37']) {
    wsInst['A37'].s = {
      font: { sz: 9, color: { rgb: BRAND_TEXT_SECONDARY }, name: FONT_BODY },
      alignment: { horizontal: 'center', vertical: 'center' },
    };
    wsInst['!merges'] = [...(wsInst['!merges'] || []), { s: { r: 36, c: 0 }, e: { r: 36, c: 1 } }];
  }

  XLSX.utils.book_append_sheet(wb, wsInst, 'Instructions');

  XLSX.writeFile(wb, 'Laminir_Forecast_Template.xlsx');
}

export function downloadActualsTemplate() {
  const wb = XLSX.utils.book_new();

  const brandHeader = [['laminir.']];
  const subHeader = [['Weekly Actuals Upload']];
  const spacer = [['']];
  
  const headers = [[
    'Retailer Profile',
    'Week Commencing',
    'Market',
    'Channel',
    'Sales Actual',
    'Units Actual',
    'Gross Margin % Actual',
    'AOV Actual',
    'Traffic Actual',
    'Conversion Actual',
    'Marketing Spend Actual',
    'MER Actual',
    'ROAS Actual',
  ]];

  const sampleData = [
    ['UNTLD', '2026-02-03', 'AU', 'Online', 342000, 4150, 0.63, 82, 58500, 0.043, 14200, 8.5, 4.2],
    ['UNTLD', '2026-01-27', 'AU', 'Online', 355000, 4280, 0.64, 83, 61000, 0.044, 15800, 8.7, 4.3],
    ['UNTLD', '2026-01-20', 'AU', 'Online', 338000, 4100, 0.62, 82, 57000, 0.042, 13800, 8.3, 4.1],
  ];

  const wsData = [...brandHeader, ...subHeader, ...spacer, ...headers, ...sampleData];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  ws['!cols'] = [
    { wch: 16 }, { wch: 14 }, { wch: 9 }, { wch: 11 }, { wch: 12 },
    { wch: 10 }, { wch: 17 }, { wch: 9 }, { wch: 12 }, { wch: 14 },
    { wch: 17 }, { wch: 9 }, { wch: 9 },
  ];

  ws['!rows'] = [
    { hpt: 45 }, { hpt: 20 }, { hpt: 10 }, { hpt: 32 },
    { hpt: 22 }, { hpt: 22 }, { hpt: 22 },
  ];

  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 12 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 12 } },
  ];

  if (ws['A1']) ws['A1'].s = createBrandHeaderStyle();
  if (ws['A2']) ws['A2'].s = createSubheaderStyle();

  const headerCells = ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4', 'J4', 'K4', 'L4', 'M4'];
  headerCells.forEach(cell => {
    if (ws[cell]) ws[cell].s = createColumnHeaderStyle();
  });

  const dataStartRow = 5;
  for (let row = 0; row < sampleData.length; row++) {
    const actualRow = dataStartRow + row;
    
    for (let col = 0; col < headers[0].length; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: actualRow - 1, c: col });
      if (ws[cellAddress]) {
        const isFirstCol = col === 0;
        let alignment = 'left';

        if (col >= 4 && col <= 12) alignment = 'right';
        if (col === 1 || col === 2 || col === 3) alignment = 'center';

        ws[cellAddress].s = createDataStyle(actualRow, isFirstCol, alignment);

        if (col === 4 || col === 10) { 
          ws[cellAddress].z = '$#,##0';
        } else if (col === 5) { 
          ws[cellAddress].z = '#,##0';
        } else if (col === 6) { 
          ws[cellAddress].z = '0.0%';
        } else if (col === 7) { 
          ws[cellAddress].z = '$0';
        } else if (col === 8) { 
          ws[cellAddress].z = '#,##0';
        } else if (col === 9) { 
          ws[cellAddress].z = '0.00%';
        } else if (col === 11 || col === 12) { 
          ws[cellAddress].z = '0.0';
        } else if (col === 1) { 
          ws[cellAddress].z = 'yyyy-mm-dd';
        }
      }
    }
  }
// Add data validation dropdowns
  addDataValidation(ws, 'C5:C1000', ['AU', 'US', 'UK', 'EU', 'ROW']); // Market
  addDataValidation(ws, 'D5:D1000', ['Online', 'Stores', 'Wholesale']); // Channel
  ws['!freeze'] = { xSplit: 0, ySplit: 4 };

  XLSX.utils.book_append_sheet(wb, ws, 'Actuals Template');

  // Instructions sheet (same pattern as Forecast)
  const instructions = [
    [''],
    ['laminir.'],
    ['Weekly Actuals Upload Template'],
    [''],
    ['Upload actual performance data after each trading week'],
    [''],
    [''],
    ['COLUMN REFERENCE'],
    [''],
    ['Retailer Profile', 'Your retailer name (e.g., UNTLD)'],
    ['Week Commencing', 'Week start date in YYYY-MM-DD format'],
    ['Market', 'Market code: AU | US | UK | EU | ROW (enter exactly as shown)'],
['Channel', 'Channel: Online | Stores | Wholesale (enter exactly as shown)'],
    ['Sales Actual', 'Actual revenue ($)'],
    ['Units Actual', 'Actual units sold'],
    ['Gross Margin % Actual', 'Actual GM % as decimal (0.65 = 65%)'],
    ['AOV Actual', 'Actual average order value ($)'],
    ['Traffic Actual', 'Actual sessions/visits'],
    ['Conversion Actual', 'Actual conversion rate as decimal (0.045 = 4.5%)'],
    ['Marketing Spend Actual', 'Actual marketing investment ($)'],
    ['MER Actual', 'Marketing efficiency: revenue per $1 marketing'],
    ['ROAS Actual', 'Return on ad spend: revenue per $1 ads'],
    [''],
    [''],
    ['BEFORE UPLOADING'],
    [''],
    ['Delete sample rows 5-7 from the template sheet', ''],
    ['Maintain rows 1-4 (branding and headers) exactly as provided', ''],
    ['Enter dates as YYYY-MM-DD (e.g., 2026-02-03)', ''],
    ['Express percentages as decimals: 65% → 0.65, 4.5% → 0.045', ''],
    ['Add rows as needed for your reporting period', ''],
    ['Upload at the end of each week', ''],
    ['This data feeds your weekly trade intelligence', ''],
    [''],
    [''],
    [''],
    ['Questions? hello@laminir.com'],
  ];

  const wsInst = XLSX.utils.aoa_to_sheet(instructions);
  wsInst['!cols'] = [{ wch: 35 }, { wch: 60 }];
  
  const instRowHeights: any[] = [];
  instRowHeights[0] = { hpt: 20 };
  instRowHeights[1] = { hpt: 45 };
  instRowHeights[2] = { hpt: 18 };
  instRowHeights[3] = { hpt: 10 };
  instRowHeights[4] = { hpt: 22 };
  instRowHeights[7] = { hpt: 28 };
  instRowHeights[24] = { hpt: 28 };
  wsInst['!rows'] = instRowHeights;

  wsInst['!merges'] = [
    { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } },
    { s: { r: 4, c: 0 }, e: { r: 4, c: 1 } },
    { s: { r: 7, c: 0 }, e: { r: 7, c: 1 } },
    { s: { r: 25, c: 0 }, e: { r: 25, c: 1 } },
  ];

  if (wsInst['A2']) {
    wsInst['A2'].s = {
      font: { bold: true, sz: 24, color: { rgb: BRAND_CHARCOAL }, name: FONT_TITLE },
      alignment: { horizontal: 'left', vertical: 'center' },
      border: { bottom: { style: 'medium', color: { rgb: BRAND_AMBER } } },
    };
  }

  if (wsInst['A3']) {
    wsInst['A3'].s = {
      font: { bold: true, sz: 14, color: { rgb: BRAND_CHARCOAL }, name: FONT_BODY },
      alignment: { horizontal: 'left', vertical: 'center' },
    };
  }

  if (wsInst['A5']) {
    wsInst['A5'].s = {
      font: { sz: 11, color: { rgb: BRAND_TEXT_SECONDARY }, name: FONT_BODY },
      alignment: { horizontal: 'left', vertical: 'center' },
    };
  }

  ['A8', 'A26'].forEach(cell => {
    if (wsInst[cell]) {
      wsInst[cell].s = {
        font: { bold: true, sz: 11, color: { rgb: BRAND_CHARCOAL }, name: FONT_BODY },
        fill: { fgColor: { rgb: BRAND_AMBER_LIGHT } },
        alignment: { horizontal: 'left', vertical: 'center' },
        border: {
          left: { style: 'medium', color: { rgb: BRAND_AMBER } },
          top: { style: 'thin', color: { rgb: BRAND_AMBER } },
          bottom: { style: 'thin', color: { rgb: BRAND_AMBER } },
          right: { style: 'thin', color: { rgb: BRAND_AMBER } },
        },
      };
    }
  });

  for (let row = 10; row <= 22; row++) {
    const cellA = XLSX.utils.encode_cell({ r: row - 1, c: 0 });
    const cellB = XLSX.utils.encode_cell({ r: row - 1, c: 1 });
    const isEven = row % 2 === 0;
    
    if (wsInst[cellA]) {
      wsInst[cellA].s = {
        font: { bold: true, sz: 10, color: { rgb: BRAND_CHARCOAL }, name: FONT_BODY },
        fill: { fgColor: { rgb: isEven ? BRAND_STONE_MED : BRAND_STONE } },
        alignment: { horizontal: 'left', vertical: 'center' },
        border: {
          left: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          right: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          top: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          bottom: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
        },
      };
    }
    
    if (wsInst[cellB]) {
      wsInst[cellB].s = {
        font: { sz: 10, color: { rgb: BRAND_TEXT_SECONDARY }, name: FONT_BODY },
        fill: { fgColor: { rgb: isEven ? BRAND_STONE_MED : BRAND_STONE } },
        alignment: { horizontal: 'left', vertical: 'center' },
        border: {
          left: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          right: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          top: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          bottom: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
        },
      };
    }
  }

  for (let row = 27; row <= 33; row++) {
    const cellA = XLSX.utils.encode_cell({ r: row - 1, c: 0 });
    if (wsInst[cellA]) {
      wsInst[cellA].s = {
        font: { sz: 10, color: { rgb: BRAND_CHARCOAL }, name: FONT_BODY },
        alignment: { horizontal: 'left', vertical: 'center' },
      };
    }
  }

  if (wsInst['A38']) {
    wsInst['A38'].s = {
      font: { sz: 9, color: { rgb: BRAND_TEXT_SECONDARY }, name: FONT_BODY },
      alignment: { horizontal: 'center', vertical: 'center' },
    };
    wsInst['!merges'] = [...(wsInst['!merges'] || []), { s: { r: 37, c: 0 }, e: { r: 37, c: 1 } }];
  }

  XLSX.utils.book_append_sheet(wb, wsInst, 'Instructions');

  XLSX.writeFile(wb, 'Laminir_Actuals_Template.xlsx');
}

export function downloadGTMTemplate() {
  const wb = XLSX.utils.book_new();

  const brandHeader = [['laminir.']];
  const subHeader = [['GTM Calendar Upload']];
  const spacer = [['']];
  
  const headers = [[
    'Retailer Profile',
    'Event Date',
    'Event Name',
    'Event Type',
    'Market',
    'Channel',
    'Description',
    'Expected Impact',
    'Status',
  ]];

  const sampleData = [
    ['UNTLD', '2026-02-14', "Valentine's Day Campaign", 'Marketing Campaign', 'AU', 'Online', 
     'Valentine-themed product promotion with 20% off selected styles', 'High traffic, increased AOV', 'Planned'],
    ['UNTLD', '2026-02-20', 'New Collection Launch', 'Product Launch', 'AU', 'Online',
     'Spring/Summer 2026 collection drop - 45 new styles', 'Traffic spike, new customer acquisition', 'Confirmed'],
    ['UNTLD', '2026-03-01', 'Autumn Pre-Launch', 'Product Launch', 'AU', 'Online',
     'AW26 preview for VIP customers', 'Full-price sell-through, brand elevation', 'Planned'],
  ];

  const wsData = [...brandHeader, ...subHeader, ...spacer, ...headers, ...sampleData];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  ws['!cols'] = [
    { wch: 16 }, { wch: 12 }, { wch: 24 }, { wch: 19 }, { wch: 9 },
    { wch: 11 }, { wch: 40 }, { wch: 30 }, { wch: 12 },
  ];

  ws['!rows'] = [
  { hpt: 45 }, // Brand header
  { hpt: 20 }, // Subheader
  { hpt: 10 }, // Spacer
  { hpt: 32 }, // Column headers
  { hpt: 40 }, // Data rows - taller for wrapped text
  { hpt: 40 },
  { hpt: 40 },
];

  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 8 } },
  ];

  if (ws['A1']) ws['A1'].s = createBrandHeaderStyle();
  if (ws['A2']) ws['A2'].s = createSubheaderStyle();

  const headerCells = ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4'];
  headerCells.forEach(cell => {
    if (ws[cell]) ws[cell].s = createColumnHeaderStyle();
  });

  const dataStartRow = 5;
for (let row = 0; row < sampleData.length; row++) {
  const actualRow = dataStartRow + row;
  
  for (let col = 0; col < headers[0].length; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: actualRow - 1, c: col });
    if (ws[cellAddress]) {
      const isFirstCol = col === 0;
      let alignment = 'left';

      if (col === 1 || col === 4 || col === 5 || col === 8) {
        alignment = 'center';
      }

      ws[cellAddress].s = createDataStyle(actualRow, isFirstCol, alignment);

      // Add text wrapping to Description (col 6) and Expected Impact (col 7)
      if (col === 6 || col === 7) {
        ws[cellAddress].s.alignment = {
          ...ws[cellAddress].s.alignment,
          wrapText: true,
          vertical: 'top',  // Align to top for better readability
        };
      }

      if (col === 1) { 
        ws[cellAddress].z = 'yyyy-mm-dd';
      }
    }
  }
}
// Add data validation dropdowns
  addDataValidation(ws, 'E5:E1000', ['AU', 'US', 'UK', 'EU', 'ROW', 'All']); // Market
  addDataValidation(ws, 'F5:F1000', ['Online', 'Stores', 'Wholesale', 'All']); // Channel
  addDataValidation(ws, 'I5:I1000', ['Planned', 'Confirmed', 'In Progress', 'Completed']); // Status
  ws['!freeze'] = { xSplit: 0, ySplit: 4 };

  XLSX.utils.book_append_sheet(wb, ws, 'GTM Calendar');

  // Instructions
  const instructions = [
    [''],
    ['laminir.'],
    ['GTM Calendar Upload Template'],
    [''],
    ['Upload your go-to-market events and campaigns'],
    [''],
    [''],
    ['COLUMN REFERENCE'],
    [''],
    ['Retailer Profile', 'Your retailer name (e.g., UNTLD)'],
    ['Event Date', 'Event date in YYYY-MM-DD format'],
    ['Event Name', 'Name of the event or campaign'],
    ['Event Type', 'Marketing Campaign, Product Launch, Promotion, Sale Event'],
    ['Market', 'Market: AU | US | UK | EU | ROW | All (enter exactly as shown)'],
['Channel', 'Channel: Online | Stores | Wholesale | All (enter exactly as shown)'],
    ['Description', 'Brief description and key details'],
    ['Expected Impact', 'Expected business impact (e.g., High traffic, Margin pressure)'],
    ['Status', 'Status: Planned | Confirmed | In Progress | Completed (enter exactly as shown)'],
    [''],
    [''],
    ['BEFORE UPLOADING'],
    [''],
    ['Delete sample rows 5-7 from the template sheet', ''],
    ['Maintain rows 1-4 (branding and headers) exactly as provided', ''],
    ['Enter dates as YYYY-MM-DD (e.g., 2026-02-14)', ''],
    ['Add as many events as needed for your calendar', ''],
    [''],
    [''],
    [''],
    ['Questions? hello@laminir.com'],
  ];

  const wsInst = XLSX.utils.aoa_to_sheet(instructions);
  wsInst['!cols'] = [{ wch: 35 }, { wch: 60 }];
  
  const instRowHeights: any[] = [];
  instRowHeights[0] = { hpt: 20 };
  instRowHeights[1] = { hpt: 45 };
  instRowHeights[2] = { hpt: 18 };
  instRowHeights[3] = { hpt: 10 };
  instRowHeights[4] = { hpt: 22 };
  instRowHeights[7] = { hpt: 28 };
  instRowHeights[20] = { hpt: 28 };
  wsInst['!rows'] = instRowHeights;

  wsInst['!merges'] = [
    { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } },
    { s: { r: 4, c: 0 }, e: { r: 4, c: 1 } },
    { s: { r: 7, c: 0 }, e: { r: 7, c: 1 } },
    { s: { r: 21, c: 0 }, e: { r: 21, c: 1 } },
  ];

  if (wsInst['A2']) {
    wsInst['A2'].s = {
      font: { bold: true, sz: 24, color: { rgb: BRAND_CHARCOAL }, name: FONT_TITLE },
      alignment: { horizontal: 'left', vertical: 'center' },
      border: { bottom: { style: 'medium', color: { rgb: BRAND_AMBER } } },
    };
  }

  if (wsInst['A3']) {
    wsInst['A3'].s = {
      font: { bold: true, sz: 14, color: { rgb: BRAND_CHARCOAL }, name: FONT_BODY },
      alignment: { horizontal: 'left', vertical: 'center' },
    };
  }

  if (wsInst['A5']) {
    wsInst['A5'].s = {
      font: { sz: 11, color: { rgb: BRAND_TEXT_SECONDARY }, name: FONT_BODY },
      alignment: { horizontal: 'left', vertical: 'center' },
    };
  }

  ['A8', 'A22'].forEach(cell => {
    if (wsInst[cell]) {
      wsInst[cell].s = {
        font: { bold: true, sz: 11, color: { rgb: BRAND_CHARCOAL }, name: FONT_BODY },
        fill: { fgColor: { rgb: BRAND_AMBER_LIGHT } },
        alignment: { horizontal: 'left', vertical: 'center' },
        border: {
          left: { style: 'medium', color: { rgb: BRAND_AMBER } },
          top: { style: 'thin', color: { rgb: BRAND_AMBER } },
          bottom: { style: 'thin', color: { rgb: BRAND_AMBER } },
          right: { style: 'thin', color: { rgb: BRAND_AMBER } },
        },
      };
    }
  });

  for (let row = 10; row <= 18; row++) {
    const cellA = XLSX.utils.encode_cell({ r: row - 1, c: 0 });
    const cellB = XLSX.utils.encode_cell({ r: row - 1, c: 1 });
    const isEven = row % 2 === 0;
    
    if (wsInst[cellA]) {
      wsInst[cellA].s = {
        font: { bold: true, sz: 10, color: { rgb: BRAND_CHARCOAL }, name: FONT_BODY },
        fill: { fgColor: { rgb: isEven ? BRAND_STONE_MED : BRAND_STONE } },
        alignment: { horizontal: 'left', vertical: 'center' },
        border: {
          left: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          right: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          top: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          bottom: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
        },
      };
    }
    
    if (wsInst[cellB]) {
      wsInst[cellB].s = {
        font: { sz: 10, color: { rgb: BRAND_TEXT_SECONDARY }, name: FONT_BODY },
        fill: { fgColor: { rgb: isEven ? BRAND_STONE_MED : BRAND_STONE } },
        alignment: { horizontal: 'left', vertical: 'center' },
        border: {
          left: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          right: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          top: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
          bottom: { style: 'thin', color: { rgb: BRAND_STONE_DARK } },
        },
      };
    }
  }

  for (let row = 23; row <= 26; row++) {
    const cellA = XLSX.utils.encode_cell({ r: row - 1, c: 0 });
    if (wsInst[cellA]) {
      wsInst[cellA].s = {
        font: { sz: 10, color: { rgb: BRAND_CHARCOAL }, name: FONT_BODY },
        alignment: { horizontal: 'left', vertical: 'center' },
      };
    }
  }

  if (wsInst['A30']) {
    wsInst['A30'].s = {
      font: { sz: 9, color: { rgb: BRAND_TEXT_SECONDARY }, name: FONT_BODY },
      alignment: { horizontal: 'center', vertical: 'center' },
    };
    wsInst['!merges'] = [...(wsInst['!merges'] || []), { s: { r: 29, c: 0 }, e: { r: 29, c: 1 } }];
  }

  XLSX.utils.book_append_sheet(wb, wsInst, 'Instructions');

  XLSX.writeFile(wb, 'Laminir_GTM_Calendar_Template.xlsx');
}