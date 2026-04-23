# Google Sheets Setup Guide

## Overview
This website uses Google Sheets as a content management system. Content editors can update the website by editing spreadsheets - no coding required.

## Sheet Structure

### 1. offerings
| Column | Description |
|--------|-------------|
| id | URL slug (jam, bhakti, etc.) |
| name | Display name |
| tagline | Short description |
| status | active / coming_soon / inactive |
| icon | Emoji or icon name |
| description | Full description |
| schedule | When it happens |
| location | Where |
| cta_text | Button text |
| cta_link | External URL |
| price | Price display |
| section_what_to_expect | on / off |
| section_who_for | on / off |
| section_schedule | on / off |
| section_pricing | on / off |
| section_gallery | on / off |
| section_faq | on / off |

### 2. testimonials
| Column | Description |
|--------|-------------|
| id | Unique ID |
| quote | Testimonial text |
| name | Person's name |
| context | Attribution |
| status | show / hide |

### 3. faq
| Column | Description |
|--------|-------------|
| id | Unique ID |
| category | General, Jam, Corporate, etc. |
| question | Q |
| answer | A |
| order | Display order |

### 4. gallery
| Column | Description |
|--------|-------------|
| id | Unique ID |
| url | Image URL |
| caption | Description |
| category | Jam, Bhakti, Kids, etc. |
| featured | yes / no |
| status | show / hide |

### 5. jam_schedule
| Column | Description |
|--------|-------------|
| date | Date of jam |
| time | Time range |
| location | Venue |
| registration_url | Luma link |
| status | open / full / cancelled |

## Setup Instructions

### Step 1: Create Google Sheet
1. Go to Google Sheets
2. Create new spreadsheet: "Kythera Website Content"
3. Create tabs: offerings, testimonials, faq, gallery, jam_schedule
4. Add headers (first row) matching the columns above

### Step 2: Enable Google Sheets API
1. Go to Google Cloud Console
2. Create new project
3. Enable Google Sheets API
4. Create Service Account
5. Download JSON key file
6. Rename to `service-account.json`

### Step 3: Share Sheet
1. Open your Google Sheet
2. Click "Share"
3. Add service account email (from JSON file) as Viewer
4. Copy Sheet ID from URL

### Step 4: Configure Repository
1. Add Sheet ID to GitHub Secrets as `GOOGLE_SHEET_ID`
2. Add service account JSON to GitHub Secrets as `GOOGLE_SERVICE_ACCOUNT`

### Step 5: Test
1. Run `npm run fetch-sheets` locally
2. Check that JSON files are created in `src/_data/`
3. Run `npm run build` to verify

## Content Updates

### To update text:
1. Edit cell in Google Sheet
2. Site auto-updates within 1 hour (or manual trigger)

### To toggle a section:
1. Change section column to "on" or "off"
2. Next build reflects changes

### To add a new offering:
1. Add row to `offerings` sheet
2. Set sections you want visible
3. Create offering page file (or use dynamic generation)

### To add photos:
1. Upload to Google Drive
2. Get public share link
3. Add to `gallery` sheet with URL

## Manual Build Trigger

1. Go to GitHub repository
2. Navigate to Actions tab
3. Click "Build and Deploy" workflow
4. Click "Run workflow"
5. Site rebuilds in ~2 minutes
