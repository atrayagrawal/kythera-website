const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const DATA_DIR = path.join(__dirname, '..', 'src', '_data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Check if we have credentials
if (!fs.existsSync('service-account.json')) {
  console.log('No service-account.json found, skipping Google Sheets fetch');
  process.exit(0);
}

if (!SPREADSHEET_ID) {
  console.log('No GOOGLE_SHEET_ID set, skipping Google Sheets fetch');
  process.exit(0);
}

const auth = new google.auth.GoogleAuth({
  keyFile: 'service-account.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Convert sheet rows to array of objects using headers
function rowsToObjects(rows) {
  if (!rows || rows.length === 0) return [];

  const headers = rows[0];
  const data = rows.slice(1);

  return data.map((row, index) => {
    const obj = {};
    headers.forEach((header, i) => {
      // Handle undefined cells (short rows)
      obj[header] = row[i] !== undefined ? row[i] : '';
    });
    return obj;
  }).filter((row, index) => {
    // Skip empty rows (rows where all values are empty)
    const hasData = Object.values(row).some(val => val && val.trim && val.trim() !== '');
    if (!hasData) {
      console.log(`  Skipping empty row ${index + 2}`);
    }
    return hasData;
  });
}

async function fetchSheet(sheetName, range) {
  try {
    console.log(`Fetching ${sheetName}...`);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log(`  No data found for ${sheetName}`);
      return [];
    }

    const data = rowsToObjects(rows);
    console.log(`  Fetched ${data.length} rows from ${sheetName}`);
    return data;
  } catch (error) {
    console.error(`  Error fetching ${sheetName}:`, error.message);
    return null;
  }
}

async function fetchAllData() {
  console.log('Fetching data from Google Sheets...');
  console.log(`Spreadsheet ID: ${SPREADSHEET_ID}`);

  const sheetsConfig = [
    { name: 'offerings', range: 'offerings!A:Q' },
    { name: 'testimonials', range: 'testimonials!A:E' },
    { name: 'faq', range: 'faq!A:E' },
    { name: 'sections_toggle', range: 'sections_toggle!A:C' },
    { name: 'jam_schedule', range: 'jam_schedule!A:E' },
  ];

  let hasErrors = false;

  for (const config of sheetsConfig) {
    const data = await fetchSheet(config.name, config.range);

    if (data === null) {
      hasErrors = true;
      continue;
    }

    // Save to JSON file
    const outputPath = path.join(DATA_DIR, `${config.name}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`  Saved to ${outputPath}`);
  }

  if (hasErrors) {
    console.error('\nSome sheets failed to fetch. Check errors above.');
    process.exit(1);
  }

  console.log('\nAll data fetched successfully!');
}

fetchAllData().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
