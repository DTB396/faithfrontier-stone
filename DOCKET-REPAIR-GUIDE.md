# Docket System Repair Guide

## Problem Summary

The FaithFrontier `/cases/` page is showing a 404 error because the docket system has a structural mismatch:

### Current State (Broken)
- **PDFs are located in:** `cases/<slug>/filings/*.pdf`
- **YAML files reference:** `/cases/<slug>/<filename>.pdf`
- **Expected by system:** `/assets/cases/<slug>/docket/<filename>.pdf`

### Issues Identified

1. **Wrong directory structure**: Files are in `cases/*/filings/` instead of `assets/cases/*/docket/`
2. **Incorrect YAML paths**: Docket YAML files point to `/cases/<slug>/` instead of `/assets/cases/<slug>/docket/`
3. **Filename mismatches**: YAML uses `YYYY-MM-DD_Name.pdf` while actual files use `YYYYMMDD-name.pdf`

## Active NJ Cases Identified

Based on analysis of `_cases/` directory:

### Active Cases (status: active)
1. **ATL-L-002794-25** - Law Division (Civil, Track Change Litigation)
2. **ATL-DC-007956-25** - Special Civil Part (Toll Enforcement)
3. **ATL-L-002869-25** - Law Division (Declaratory Judgment)
4. **ATL-L-003252-25** - Law Division (needs case details updated)
5. **A-000313-25** - Appellate Division (Street Crossing PCR Appeal)
6. **1:25-cv-15641** - US District Court (Federal Civil Rights)

### Pending Cases
1. **ATL-22-002292** - PCR 2022 (Barber NJ PCR)
2. **1:22-cv-06206** - US District Court

### Cases with "open" status (should be normalized to "active", "pending", or "closed")
- ATL-24-001934
- ATL-22-002313
- ATL-L-003252-25

## Solution

### Automated Repair (Recommended)

Run the comprehensive repair script:

```bash
cd /workspaces/FaithFrontier
node scripts/repair-docket-system.js
```

This script will:
1. ✅ Create `/assets/cases/<slug>/docket/` directories
2. ✅ Copy all PDFs from `cases/<slug>/filings/` to new location
3. ✅ Update all YAML files in `_data/docket/` with correct paths
4. ✅ Match actual filenames using intelligent fuzzy matching
5. ✅ Generate a detailed report of all changes

### Manual Verification Steps

After running the script:

1. **Check git status:**
   ```bash
   git status
   ```

2. **Verify file structure:**
   ```bash
   ls -la assets/cases/atl-l-002794-25/docket/
   ```

3. **Test Jekyll build:**
   ```bash
   bundle exec jekyll build
   ```

4. **Test locally:**
   ```bash
   bundle exec jekyll serve
   ```
   Visit: http://localhost:4000/cases/

5. **Review case index page** - Should show all cases with proper metadata

## Required Case Data Updates

### Cases needing complete metadata:

**ATL-L-003252-25** (`_cases/atl-l-003252-25/index.md`):
- Missing: court, venue, case_type, role, filed_date, judge
- Has: Basic template only
- Status: Marked as "open" (should be "active")

### Cases needing status normalization:

Update these from "open" to proper status ("active", "pending", or "closed"):
- A-000313-25
- ATL-24-001934
- ATL-22-002292
- ATL-22-002313
- ATL-L-003252-25

## Cases-Map.yml Verification

Current mapping in `_data/cases-map.yml`:

```yaml
A-000313-25: street-crossing-pcr-appeal
ATL-24-001934: street-crossing-pcr-appeal
ATL-L-002794-25: atl-l-002794-25
ATL-L-002869-25: atl-l-002869-25
ATL-L-002908-25: atl-l-002908-25
ATL-22-002292: barber-nj-pcr-2022
ATL-22-002313: barber-nj-pcr-2022
ATL-DC-007956-25: atl-dc-007956-25
1:22-cv-06206: usdj-1-22-cv-06206
1:25-cv-15641-RMB-MJS: usdj-1-25-cv-15641
```

### Missing from map:
- ATL-L-003252-25 (needs to be added)

## Expected File Counts

| Case Slug | PDF Count | YAML Entries |
|-----------|-----------|--------------|
| atl-l-002794-25 | 29 | Needs verification |
| atl-dc-007956-25 | 27 | Needs verification |
| atl-l-002869-25 | 7 | 4 documented |
| atl-l-003252-25 | 36 | Needs creation |
| a-000313-25 | 7 | Needs verification |
| usdj-1-22-cv-06206 | 10 | Needs verification |
| usdj-1-25-cv-15641 | 3 | Needs verification |

## Post-Repair Checklist

- [ ] Run repair script successfully
- [ ] Verify all PDFs copied to assets/cases/*/docket/
- [ ] Confirm YAML files updated with correct paths
- [ ] Update ATL-L-003252-25 case metadata
- [ ] Normalize all "open" statuses to standard values
- [ ] Add ATL-L-003252-25 to cases-map.yml
- [ ] Test Jekyll build (no errors)
- [ ] Test /cases/ page loads correctly
- [ ] Verify individual case pages display dockets
- [ ] Commit changes to git

## Additional Scripts Available

- `scripts/docket-intake.js` - Process new PDFs from _inbox/
- `scripts/analyze-cases.js` - Generate AI analysis of cases
- `scripts/reorganize-dockets.py` - Python version of reorganization
- `scripts/reorganize-docket-files.sh` - Shell script version
- `scripts/reorganize-docket-files.js` - Node.js version (alternate)

## Troubleshooting

### If /cases/ still shows 404:
1. Check `cases/index.html` exists (it does)
2. Verify Jekyll build completed without errors
3. Check `_config.yml` collections configuration (verified correct)
4. Ensure `_data/docket/*.yml` files are valid YAML

### If individual case pages load but no dockets show:
1. Verify YAML file exists in `_data/docket/<slug>.yml`
2. Check file paths in YAML are correct
3. Ensure PDFs exist at the referenced paths
4. Check `_includes/case-analysis.html` template

### If filenames don't match:
- The repair script uses fuzzy matching
- Manually update YAML file paths if needed
- Actual files use: `YYYYMMDD-description.pdf`
- YAML may reference: `YYYY-MM-DD_Description.pdf`

## Support Files Created

- `/workspaces/FaithFrontier/scripts/repair-docket-system.js` - **Main repair tool**
- `/workspaces/FaithFrontier/scripts/reorganize-dockets.py` - Python alternative
- `/workspaces/FaithFrontier/scripts/reorganize-docket-files.sh` - Shell alternative
- This guide: `DOCKET-REPAIR-GUIDE.md`

## Contact

For issues or questions about this repair:
- Review `DOCKET-SYSTEM.md` for system documentation
- Check `ANALYSIS-SYSTEM.md` for case analysis features
- See `.github/copilot-instructions.md` for development guidelines
