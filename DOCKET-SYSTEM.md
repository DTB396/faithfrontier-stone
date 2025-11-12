# FaithFrontier Docket Management System

This document describes the docket management system implemented for the FaithFrontier Jekyll site.

## Overview

The docket system provides a structured way to manage court filings, orders, and other case documents with the following features:

- **Searchable case index** with filtering by status and text search
- **Data-driven docket entries** stored in YAML files
- **Automated intake workflow** for normalizing and organizing PDFs
- **PR-based upload system** via Cloudflare Worker (optional)
- **GitHub Pages compatible** - no custom plugins required

## Directory Structure

```
├── _cases/                          # Case markdown files
├── _data/
│   ├── docket/                      # Docket entries (YAML)
│   │   ├── street-crossing-pcr-appeal.yml
│   │   ├── barber-nj-pcr-2022.yml
│   │   └── ...
│   └── cases-map.yml                # Docket number → slug mapping
├── assets/
│   ├── cases/                       # Case assets organized by slug
│   │   ├── street-crossing-pcr-appeal/
│   │   │   └── docket/              # PDFs for this case
│   │   └── ...
│   └── js/
│       ├── case-search.js           # Client-side filtering
│       └── docket-submit.js         # Upload form handler
├── cases/
│   └── index.html                   # Searchable case index
├── cases.json                       # JSON feed for search
├── docket/
│   └── submit/
│       └── index.html               # Upload form
├── _inbox/                          # Drop PDFs here for intake
├── scripts/
│   └── docket-intake.js             # Intake automation
└── worker/
    ├── worker.js                    # Cloudflare Worker
    └── README.md                    # Worker setup instructions
```

## Case Schema

Each case in `_cases/*.md` should follow this front matter schema:

```yaml
---
layout: case
published: true
title: "Full Case Title"
short_title: "Short Case Title"
permalink: /cases/<slug>/
court: "Court Name"
venue: "Venue"
case_type: "Case Type"
role: "Your Role"
dockets: ["DOCKET-1", "DOCKET-2"]
primary_docket: "DOCKET-1"
status: "Active"
filed_date: YYYY-MM-DD
judge: "Judge Name"
tags: ["tag1", "tag2"]
---
```

## Docket Entry Schema

Docket entries in `_data/docket/<slug>.yml`:

```yaml
- id: 2025-11-12-unique-identifier
  date: 2025-11-12
  type: Filing|Order|Notice|Brief|Exhibit|Motion|Other
  title: Human-readable title
  file: /assets/cases/<slug>/docket/filename.pdf
  notes: Optional notes
```

## Usage

### Method 1: Web Upload (Recommended)

1. Navigate to `/docket/submit/`
2. Fill out the form with case, date, type, title, and PDF
3. Submit - this creates a PR for review
4. Review and merge the PR

**Note:** Requires Cloudflare Worker setup (see `worker/README.md`)

### Method 2: Automated Intake

1. Drop PDFs into `_inbox/` directory
2. Commit and push
3. The intake workflow runs automatically
4. Review the generated PR and merge

### Method 3: Manual

1. Upload PDF to `assets/cases/<slug>/docket/`
2. Edit `_data/docket/<slug>.yml` to add entry
3. Commit and push

## Workflows

### `.github/workflows/validate.yml`
- Runs on every push and PR
- Builds the Jekyll site
- Checks for broken links

### `.github/workflows/docket-intake.yml`
- Triggers on changes to `_inbox/` or `assets/uploads/`
- Normalizes PDF filenames
- Moves to correct case folder
- Updates docket YAML
- Creates PR for review

## Case Slug Mapping

The `_data/cases-map.yml` file maps docket numbers to case slugs:

```yaml
A-000313-25: street-crossing-pcr-appeal
ATL-24-001934: street-crossing-pcr-appeal
```

This helps the intake automation route PDFs to the correct case folder.

## Search Functionality

The case index at `/cases/` includes:

- Text search across title, docket numbers, and tags
- Filter by status (Active, Closed, Stayed)
- Client-side filtering via `/cases.json`

## Naming Conventions

### PDFs
Pattern: `YYYY-MM-DD_Type_Description.pdf`

Example: `2025-11-12_Filing_Written-Appearance-ADA-MTD.pdf`

### Docket IDs
Pattern: `YYYY-MM-DD-kebab-case-description`

Example: `2025-11-12-written-appearance`

## Maintenance

### Adding a New Case

1. Create `_cases/<slug>.md` with proper front matter
2. Create `_data/docket/<slug>.yml` (can be empty initially)
3. Add docket number mappings to `_data/cases-map.yml`
4. Create folder: `assets/cases/<slug>/docket/`

### Updating Docket Entries

Edit the corresponding `_data/docket/<slug>.yml` file directly, or use the upload form.

### Finding Orphaned PDFs

The intake script reports orphaned PDFs in `reports/docket-intake.json`.

## Troubleshooting

### Case pages show "No docket entries yet"
- Verify `_data/docket/<slug>.yml` exists
- Check that the slug in the file path matches the case's URL slug
- Ensure YAML is valid (no syntax errors)

### Search not working
- Check browser console for JavaScript errors
- Verify `/cases.json` is generating correctly
- Ensure `case-search.js` is loaded

### Upload form not working
- Check that Cloudflare Worker is deployed
- Verify worker URL in `docket-submit.js`
- Check browser console for CORS errors
- Ensure GitHub token has proper permissions

## Security Considerations

- GitHub token (for worker) only has `repo` scope
- Worker validates all inputs
- CORS restricts requests to faithfrontier.org
- All uploads go through PR review
- Never commit secrets to the repository

## Support

For issues or questions about the docket system, please open an issue on GitHub.
