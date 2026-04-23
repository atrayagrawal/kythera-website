# Kythera Website

A modern, multi-page static website for Kythera Music Wellness Community.

## Features

- Multi-page static site (Home, Offerings, About, Community, Connect, Gallery)
- Google Sheets content management
- Flexible offering pages with toggleable sections
- Responsive design (mobile-first)
- Automated builds via GitHub Actions
- FREE hosting on GitHub Pages (~$12/year for domain)

## Quick Start

```bash
# Install dependencies
npm install

# Build CSS and serve locally
npm run serve

# Build for production
npm run build
```

## Content Management

Content is managed via Google Sheets:
- **Offerings**: Program details, sections, pricing
- **Testimonials**: Community quotes
- **FAQ**: Common questions
- **Gallery**: Photo URLs and captions
- **Jam Schedule**: Upcoming event dates

See [GOOGLE_SETUP.md](GOOGLE_SETUP.md) for setup instructions.

## Deployment

The site automatically deploys via GitHub Actions:
- Builds hourly from Google Sheets
- Manual trigger available
- FREE for public repositories

## Technology Stack

- **Generator**: 11ty (Eleventy)
- **Templates**: Nunjucks
- **Styling**: Tailwind CSS
- **Hosting**: GitHub Pages
- **CMS**: Google Sheets API
- **CI/CD**: GitHub Actions

## Project Structure

```
src/
├── _includes/
│   ├── layouts/       # Page layouts
│   └── components/      # Reusable components
├── _data/              # JSON data from Google Sheets
├── pages/              # Page content
│   ├── offerings/
│   ├── about/
│   ├── community/
│   ├── connect/
│   └── gallery/
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── scripts/
    └── fetch-sheets.js  # Google Sheets integration
```

## External Integrations

- **Registration**: Luma (linked)
- **Forms**: Tally/Google Forms (linked)
- **Payments**: Razorpay (linked)
- **Chat**: WhatsApp (wa.me links)
- **Blog**: Substack (linked)
- **Photos**: Instagram widget + Google Drive

## License

MIT
