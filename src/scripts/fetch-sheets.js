const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || 'YOUR_SHEET_ID_HERE';
const OUTPUT_DIR = path.join(__dirname, '../_data');

async function fetchSheetData(auth, range) {
  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: range,
  });

  const rows = response.data.values;
  if (!rows || rows.length === 0) {
    console.log(`No data found for range: ${range}`);
    return [];
  }

  // First row is headers
  const headers = rows[0].map(h => h.toLowerCase().replace(/\s+/g, '_'));
  const data = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });
    data.push(obj);
  }

  return data;
}

async function main() {
  let auth;

  // Try service account first
  try {
    const keyFile = path.join(__dirname, '../../service-account.json');
    await fs.access(keyFile);
    auth = new google.auth.GoogleAuth({
      keyFile: keyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    console.log('Using service account authentication');
  } catch (e) {
    // Fall back to environment variable
    if (process.env.GOOGLE_SERVICE_ACCOUNT) {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
      auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });
      console.log('Using environment variable authentication');
    } else {
      console.log('No Google credentials found, using local data if available');
      return;
    }
  }

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Fetch all sheets
  const sheets = [
    { name: 'offerings', range: 'offerings!A1:Z1000' },
    { name: 'testimonials', range: 'testimonials!A1:Z1000' },
    { name: 'faq', range: 'faq!A1:Z1000' },
    { name: 'gallery', range: 'gallery!A1:Z1000' },
    { name: 'jam_schedule', range: 'jam_schedule!A1:Z1000' },
  ];

  for (const sheet of sheets) {
    try {
      console.log(`Fetching ${sheet.name}...`);
      const data = await fetchSheetData(auth, sheet.range);
      const outputPath = path.join(OUTPUT_DIR, `${sheet.name}.json`);
      await fs.writeFile(outputPath, JSON.stringify(data, null, 2));
      console.log(`  ✓ Saved ${data.length} records to ${sheet.name}.json`);
    } catch (err) {
      console.error(`  ✗ Error fetching ${sheet.name}:`, err.message);
    }
  }

  console.log('\nDone fetching sheets!');
}

main().catch(console.error);
