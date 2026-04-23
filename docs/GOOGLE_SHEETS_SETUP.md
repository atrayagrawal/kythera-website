# Kythera Website - Google Sheets CMS Setup

## Overview
Your website pulls content from Google Sheets. When you edit the sheet, the website rebuilds automatically (hourly) or you can trigger a manual rebuild.

---

## Step 1: Create Your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it: **"Kythera Website Content"**
3. Create these 4 sheets (tabs at bottom):
   - `offerings`
   - `testimonials`
   - `faq`
   - `sections_toggle`

---

## Step 2: Add Your Data

### Sheet 1: Offerings
Copy this header row and data into the `offerings` sheet:

| id | name | tagline | status | icon | description | schedule | location | cta_text | cta_link | price | section_what_to_expect | section_who_for | section_schedule | section_pricing | section_gallery | section_faq |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| jam | Thursday Jam | A weekly gathering where we make sound together | active | 🎵 | Every Thursday, we gather in a circle to create sound together. No experience needed, no wrong notes. Just presence, intention, and the courage to be heard. | Thursdays, 7:30-9:30 PM | Jaipur, India | Register for This Week | https://lu.ma/kythera-jam | ₹500 | on | on | on | on | on | on |
| bhakti | Bhakti Sessions | Devotional singing for the modern seeker | active | 🙏 | Ancient chants in a modern context. We sing mantras, bhajans, and devotional songs from various traditions. It's not about religion—it's about surrender through sound. | Monthly, Sunday mornings | Jaipur, India | Join Next Session | https://lu.ma/kythera-bhakti | ₹300 | on | on | on | off | on | on |
| corporate | Corporate Wellness | Bring the circle to your workplace | active | 🏢 | Team building through music. We bring the Kythera experience to offices, creating spaces for connection outside of meetings and deadlines. | By appointment | Your office | Schedule a Session | mailto:hello@kythera.city | Custom | on | on | off | on | off | on |
| innercircle | Inner Circle | Deeper practice for committed members | active | ⭐ | An intimate group of 12 committed practitioners. Weekly sessions, personal guidance, and a deeper dive into the therapeutic aspects of sound. | Weekly, Tuesdays | Private Studio | Apply for Membership | mailto:innercircle@kythera.city | ₹2000/mo | on | on | on | on | off | on |
| kids | Kids Rhythm | Music exploration for ages 5-12 | active | 🥁 | Children discover the joy of rhythm and sound in a playful, non-competitive environment. No recitals, no grades—just pure musical exploration. | Saturdays, 10 AM | Jaipur, India | Register Your Child | https://tally.so/r/kids-form | ₹400 | on | on | on | off | on | on |
| retreats | Retreats | Immersive weekends away | active | 🏔️ | Quarterly retreats to locations around Rajasthan. Three days of intensive practice, silence, and community in nature. | Quarterly | Various | Join Waitlist | https://tally.so/r/retreat-waitlist | ₹3500 | on | on | on | on | on | on |

---

### Sheet 2: Testimonials
Copy this into the `testimonials` sheet:

| id | quote | name | context | status |
|---|---|---|---|---|
| 1 | I came for the music but stayed for the people. Kythera has given me a community I didn't know I was missing. | Priya M. | Thursday Jam regular | show |
| 2 | As someone who was told they 'couldn't sing' as a child, Kythera helped me reclaim my voice. No judgment, just support. | Arjun K. | Member since 2018 | show |
| 3 | Our company's Kythera session was the most connected our team has felt in years. Highly recommend for any workplace. | Rahul S. | Corporate client | show |

---

### Sheet 3: FAQ
Copy this into the `faq` sheet:

| id | question | answer | category | sort_order |
|---|---|---|---|---|
| 1 | Do I need musical experience? | Not at all. Kythera welcomes everyone, regardless of background. Many of our regulars had never sung in a group before joining. | jam | 1 |
| 2 | What should I bring? | Just yourself. We provide instruments, though you're welcome to bring your own if you have one. Water and light snacks provided. | jam | 3 |
| 3 | Can I visit once to try it out? | Absolutely. Single-session registration is available. Many of us started with just one Thursday. | jam | 2 |
| 4 | Is this a religious thing? | Not at all. While we use practices from various traditions (chanting, mantra), Kythera is secular. People of all faiths and no faith are welcome. | bhakti | 1 |
| 5 | What age is appropriate for Kids Rhythm? | We welcome children ages 5-12. Parents can drop off or stay and observe—whatever makes the child comfortable. | kids | 1 |

---

### Sheet 4: Sections Toggle
This controls which sections show on offering pages:

| offering_id | section | status |
|---|---|---|
| jam | what_to_expect | on |
| jam | who_for | on |
| jam | schedule | on |
| jam | pricing | on |
| jam | gallery | on |
| jam | faq | on |
| bhakti | what_to_expect | on |
| bhakti | who_for | on |
| bhakti | schedule | on |
| bhakti | pricing | off |
| bhakti | gallery | on |
| bhakti | faq | on |
| corporate | what_to_expect | on |
| corporate | who_for | on |
| corporate | schedule | off |
| corporate | pricing | on |
| corporate | gallery | off |
| corporate | faq | on |
| innercircle | what_to_expect | on |
| innercircle | who_for | on |
| innercircle | schedule | on |
| innercircle | pricing | on |
| innercircle | gallery | off |
| innercircle | faq | on |
| kids | what_to_expect | on |
| kids | who_for | on |
| kids | schedule | on |
| kids | pricing | off |
| kids | gallery | on |
| kids | faq | on |
| retreats | what_to_expect | on |
| retreats | who_for | on |
| retreats | schedule | on |
| retreats | pricing | on |
| retreats | gallery | on |
| retreats | faq | on |

---

## Step 3: Google Cloud Setup (Service Account)

### 3.1 Create a Google Cloud Project
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Name it: `kythera-website-cms`
4. Click "Create"

### 3.2 Enable Google Sheets API
1. In your new project, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click "Enable"

### 3.3 Create a Service Account
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Name: `kythera-website`
4. Click "Create and Continue" → "Done"

### 3.4 Create a Key
1. In the Service Accounts list, click on your new account
2. Go to the "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON" format
5. Click "Create" - this downloads a file

### 3.5 Share Your Sheet
1. Open your downloaded JSON key file
2. Copy the `client_email` value (looks like: `kythera-website@project-id.iam.gserviceaccount.com`)
3. In your Google Sheet, click "Share"
4. Paste that email address and give "Viewer" access
5. Click "Send"

### 3.6 Get Your Spreadsheet ID
1. In your Google Sheet URL, find the long string between `/d/` and `/edit`
2. Example: `https://docs.google.com/spreadsheets/d/1ABC123xyz/edit`
3. Your ID is: `1ABC123xyz`

---

## Step 4: Configure GitHub Secrets

1. Go to your GitHub repo: `https://github.com/atrayagrawal/kythera-website`
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"

### Add these 2 secrets:

**Secret 1:**
- Name: `GOOGLE_SERVICE_ACCOUNT`
- Value: Paste the ENTIRE contents of your downloaded JSON key file

**Secret 2:**
- Name: `GOOGLE_SHEET_ID`
- Value: Your spreadsheet ID (from Step 3.6)

---

## Step 5: Test the Connection

### Option A: Manual Trigger (Fastest)
1. Go to your GitHub repo
2. Click "Actions" tab
3. Click "Build and Deploy" workflow
4. Click "Run workflow" → "Run workflow"
5. Wait ~2 minutes for build to complete

### Option B: Wait for Hourly Build
Builds automatically every hour on the hour.

### Check if it's working:
1. Go to Actions tab and look at the latest build
2. Click on it → "build" job → "Fetch Google Sheets data" step
3. If it shows "Data fetched successfully" - you're connected!
4. If it shows "Fetch failed" - check your secrets

---

## How to Edit Content

### Edit Existing Content:
1. Open your Google Sheet
2. Find the row you want to edit (e.g., change the Jam price)
3. Edit the cell
4. Changes go live within 1 hour (or trigger manual build for immediate update)

### Add a New Offering:
1. Add a new row to the `offerings` sheet
2. Set `status` to `active`
3. Add corresponding rows to `sections_toggle` sheet
4. The new offering automatically appears on the site

### Hide an Offering:
1. Change `status` from `active` to `inactive`
2. It disappears from the site (but data is preserved)

### Change Link/Price/CTA:
1. Find the offering in the sheet
2. Edit `cta_link`, `price`, or `cta_text` column
3. Save - done!

### Fix Broken Links:
Just edit the `cta_link` column in the offerings sheet. Examples:
- Registration link changed? Update `cta_link` for that offering
- WhatsApp number changed? Update it in the `offerings` description or `cta_link`
- New payment system? Change all `cta_link` values at once

---

## Troubleshooting

**"Fetch failed" in GitHub Actions:**
- Check that `GOOGLE_SERVICE_ACCOUNT` secret contains the full JSON
- Check that `GOOGLE_SHEET_ID` is just the ID (not the full URL)
- Verify the service account email has access to the sheet

**Content not updating:**
- Make sure column headers match exactly (case-sensitive)
- Check that `status` column says `active` (not `Active`)
- Trigger manual build to test immediately

**New offering not showing:**
- Check `status` is `active`
- Check that you have corresponding rows in `sections_toggle`
- Verify `id` is lowercase with no spaces

---

## Quick Reference: What You Can Edit Without Code

| What | Where | Column to Edit |
|------|-------|----------------|
| Offering name/title | offerings | `name` |
| Offering description | offerings | `description` |
| Price | offerings | `price` |
| Registration link | offerings | `cta_link` |
| Schedule text | offerings | `schedule` |
| Testimonial text | testimonials | `quote` |
| FAQ question/answer | faq | `question`, `answer` |
| Show/hide sections | sections_toggle | `status` (on/off) |
| Hide an offering | offerings | `status` (inactive) |
| Coming soon status | offerings | `status` (coming_soon) |

---

## Need Help?

1. Check GitHub Actions logs for specific error messages
2. Verify your Google Sheet is shared with the service account email
3. Make sure the column headers match exactly (copy-paste from above)
4. Trigger a manual build to test immediately (don't wait for hourly)
