import * as XLSX from 'xlsx';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  data?: any[];
}

// Expected columns for each template type
const FORECAST_COLUMNS = [
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
];

const ACTUALS_COLUMNS = [
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
];

const GTM_COLUMNS = [
  'Retailer Profile',
  'Event Date',
  'Event Name',
  'Event Type',
  'Market',
  'Channel',
  'Description',
  'Expected Impact',
  'Status',
];

const VALID_MARKETS = ['AU', 'US', 'UK', 'EU', 'ROW', 'All'];
const VALID_CHANNELS = ['Online', 'Stores', 'Wholesale', 'All'];
const VALID_STATUSES = ['Planned', 'Confirmed', 'In Progress', 'Completed'];

async function validateExcelFile(
  file: File,
  expectedColumns: string[],
  type: 'forecast' | 'actuals' | 'gtm'
): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Check file type
  const fileExt = file.name.split('.').pop()?.toLowerCase();
  if (!fileExt || !['xlsx', 'csv', 'xls'].includes(fileExt)) {
    errors.push('Invalid file type. Please upload an .xlsx or .csv file.');
    return { isValid: false, errors, warnings };
  }

  try {
    // Read the file
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    // Get the first sheet (template sheet)
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON, skipping the first 3 rows (LAMINIR brand, subheader, spacer)
    // Row 4 contains the actual column headers
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { 
      raw: false,
      defval: '', // Empty cells become empty strings
      range: 3, // Start reading from row 4 (0-indexed, so 3 = row 4)
      blankrows: false, // Skip completely blank rows
    });

    if (jsonData.length === 0) {
      errors.push('File is empty. Please add data to the template.');
      return { isValid: false, errors, warnings };
    }

    // 2. Check column headers
    const actualColumns = Object.keys(jsonData[0] || {});
    const missingColumns = expectedColumns.filter(col => !actualColumns.includes(col));
    
    if (missingColumns.length > 0) {
      errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
    }

    const extraColumns = actualColumns.filter(col => !expectedColumns.includes(col));
    if (extraColumns.length > 0) {
      warnings.push(`Extra columns found (will be ignored): ${extraColumns.join(', ')}`);
    }

    if (errors.length > 0) {
      return { isValid: false, errors, warnings };
    }

    // 3. Validate data rows
    jsonData.forEach((row, index) => {
      const rowNum = index + 5; // +5 because we skipped 3 header rows, then row 4 is column headers, data starts at row 5

      // Check required fields
      if (!row['Retailer Profile']) {
        errors.push(`Row ${rowNum}: Retailer Profile is required`);
      }

      // Validate dates
      const dateField = type === 'gtm' ? 'Event Date' : 'Week Commencing';
      if (!row[dateField]) {
        errors.push(`Row ${rowNum}: ${dateField} is required`);
      } else if (!isValidDate(row[dateField])) {
        errors.push(`Row ${rowNum}: ${dateField} must be in YYYY-MM-DD format`);
      }

      // Validate Market
      if (row['Market'] && !VALID_MARKETS.includes(row['Market'])) {
        errors.push(`Row ${rowNum}: Invalid Market "${row['Market']}". Must be one of: ${VALID_MARKETS.join(', ')}`);
      }

      // Validate Channel
      if (row['Channel'] && !VALID_CHANNELS.includes(row['Channel'])) {
        errors.push(`Row ${rowNum}: Invalid Channel "${row['Channel']}". Must be one of: ${VALID_CHANNELS.join(', ')}`);
      }

      // Validate Status (GTM only)
      if (type === 'gtm' && row['Status'] && !VALID_STATUSES.includes(row['Status'])) {
        errors.push(`Row ${rowNum}: Invalid Status "${row['Status']}". Must be one of: ${VALID_STATUSES.join(', ')}`);
      }

      // Validate numeric fields (forecast/actuals only)
      if (type === 'forecast' || type === 'actuals') {
        const suffix = type === 'forecast' ? 'Plan' : 'Actual';
        
        // REQUIRED core business metrics
        const requiredFields = [
          `Sales ${suffix}`,
          `Units ${suffix}`,
          `Gross Margin % ${suffix}`,
        ];

        requiredFields.forEach(field => {
          const value = row[field];
          
          // Check if field is missing or empty
          if (value === null || value === undefined || value === '' || (typeof value === 'string' && value.trim() === '')) {
            errors.push(`Row ${rowNum}: ${field} is required`);
            return;
          }
          
          // Strip currency symbols and commas before parsing
          const cleanValue = typeof value === 'string' 
            ? value.replace(/[$,%]/g, '').trim() 
            : value;
          
          const numValue = parseFloat(cleanValue);
          if (isNaN(numValue)) {
            errors.push(`Row ${rowNum}: ${field} must be a number (found: "${value}")`);
          }
          
          // Validate Gross Margin % is between 0 and 1
          if (field.includes('Gross Margin %')) {
            if (numValue < 0 || numValue > 1) {
              warnings.push(`Row ${rowNum}: ${field} should be between 0 and 1 (e.g., 0.65 for 65%)`);
            }
          }
        });

        // OPTIONAL supporting metrics
        const optionalNumericFields = [
          `AOV ${suffix}`,
          `Traffic ${suffix}`,
          `Marketing Spend ${suffix}`,
          `MER ${suffix}`,
          `ROAS ${suffix}`,
        ];

        optionalNumericFields.forEach(field => {
          const value = row[field];
          // Skip if truly empty
          if (value === null || value === undefined || value === '' || (typeof value === 'string' && value.trim() === '')) {
            return;
          }
          
          // Strip currency symbols and commas before parsing
          const cleanValue = typeof value === 'string' 
            ? value.replace(/[$,]/g, '').trim() 
            : value;
          
          const numValue = parseFloat(cleanValue);
          if (isNaN(numValue)) {
            errors.push(`Row ${rowNum}: ${field} must be a number (found: "${value}")`);
          }
        });

        // OPTIONAL Conversion % (separate handling for percentage validation)
        const conversionField = `Conversion ${suffix}`;
        const conversionValue = row[conversionField];
        
        if (conversionValue !== null && conversionValue !== undefined && conversionValue !== '' && 
            !(typeof conversionValue === 'string' && conversionValue.trim() === '')) {
          
          const cleanValue = typeof conversionValue === 'string' 
            ? conversionValue.replace(/[%,]/g, '').trim() 
            : conversionValue;
          
          const numValue = parseFloat(cleanValue);
          if (isNaN(numValue)) {
            errors.push(`Row ${rowNum}: ${conversionField} must be a number (found: "${conversionValue}")`);
          } else if (numValue < 0 || numValue > 1) {
            warnings.push(`Row ${rowNum}: ${conversionField} should be between 0 and 1 (e.g., 0.045 for 4.5%)`);
          }
        }
      }

      // GTM-specific validations
      if (type === 'gtm') {
        if (!row['Event Name']) {
          errors.push(`Row ${rowNum}: Event Name is required`);
        }
        if (!row['Event Type']) {
          errors.push(`Row ${rowNum}: Event Type is required`);
        }
        // Market and Channel already validated above as required
        // Description, Expected Impact, and Status are optional
      }
    });

    // If too many errors, truncate
    if (errors.length > 20) {
      const remaining = errors.length - 20;
      errors.splice(20);
      errors.push(`... and ${remaining} more errors`);
    }
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      data: errors.length === 0 ? jsonData : undefined,
    };

  } catch (error) {
    console.error('File validation error:', error);
    errors.push('Failed to read file. Please ensure it is a valid Excel file.');
    return { isValid: false, errors, warnings };
  }
}

function isValidDate(dateStr: string): boolean {
  if (!dateStr) return false;
  
  // Check YYYY-MM-DD format
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;

  // Check if it's a valid date
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

// EXPORT FUNCTIONS AT THE BOTTOM (after validateExcelFile is defined)
export async function validateForecastFile(file: File): Promise<ValidationResult> {
  return validateExcelFile(file, FORECAST_COLUMNS, 'forecast');
}

export async function validateActualsFile(file: File): Promise<ValidationResult> {
  return validateExcelFile(file, ACTUALS_COLUMNS, 'actuals');
}

export async function validateGTMFile(file: File): Promise<ValidationResult> {
  return validateExcelFile(file, GTM_COLUMNS, 'gtm');
}