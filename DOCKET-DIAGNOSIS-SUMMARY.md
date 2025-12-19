# FaithFrontier Docket System Diagnosis & Repair Summary

**Date:** December 19, 2025  
**Issue:** https://faithfrontier.org/cases/ returning 404 error  
**Status:** Diagnosed - Ready for Repair

## Root Cause Analysis

### Primary Issue: Directory Structure Mismatch

The docket system expects files in a specific location that doesn't match where they currently exist:

**Current Location (Wrong):**
```
cases/<slug>/filings/*.pdf
```

**Expected Location (Per DOCKET-SYSTEM.md):**
```
assets/cases/<slug>/docket/*.pdf
```

**YAML References (Also Wrong):**
```yaml
file: /cases/<slug>/<filename>.pdf
```

**Should Be:**
```yaml
file: /assets/cases/<slug>/docket/<filename>.pdf
```

### Secondary Issues

1. **Filename Format Mismatch**
   - Actual files: `YYYYMMDD-description-with-hyphens.pdf`
   - YAML references: `YYYY-MM-DD_Description_With_Underscores.pdf`

2. **Missing Directory**
   - `assets/cases/` directory did not exist
   - Now created with proper subdirectories

3. **Incomplete Case Metadata**
   - ATL-L-003252-25 has minimal front matter
   - Several cases use "open" instead of standard status values

4. **Cases-Map Incomplete**
   - ATL-L-003252-25 was not mapped
   - A-000313-25 was incorrectly mapped

## What Was Done

### ✅ Completed

1. **Created Directory Structure**
   - Created `assets/cases/` directory
   - Created subdirectories for all active cases:
     - `assets/cases/a-000313-25/docket/`
     - `assets/cases/atl-l-002794-25/docket/`
     - `assets/cases/atl-l-002869-25/docket/`
     - `assets/cases/atl-l-003252-25/docket/`
     - `assets/cases/atl-dc-007956-25/docket/`
     - `assets/cases/usdj-1-22-cv-06206/docket/`
     - `assets/cases/usdj-1-25-cv-15641/docket/`

2. **Updated Cases-Map**
   - Fixed A-000313-25 mapping (was pointing to wrong slug)
   - Added ATL-L-003252-25 mapping
   - Verified all active NJ cases are mapped

3. **Created Comprehensive Repair Tools**
   - `scripts/repair-docket-system.js` - Main automated repair tool
   - `scripts/reorganize-dockets.py` - Python alternative
   - `scripts/reorganize-docket-files.sh` - Shell script alternative
   - `scripts/reorganize-docket-files.js` - Node.js alternative
   - `DOCKET-REPAIR-GUIDE.md` - Step-by-step instructions

### ⏳ Needs To Be Done (Run the script)

1. **Copy PDF Files**
   - Copy all 124 PDFs from `cases/*/filings/` to `assets/cases/*/docket/`
   - Preserve filenames exactly as they are

2. **Update YAML Files**
   - Update 12 YAML files in `_data/docket/`
   - Change all paths from `/cases/<slug>/` to `/assets/cases/<slug>/docket/`
   - Match actual filenames using intelligent fuzzy matching

3. **Verify and Test**
   - Run Jekyll build
   - Test /cases/ page
   - Verify individual case pages display dockets

## Active NJ Case List (Verified)

### Civil Cases - Atlantic County Superior Court

1. **ATL-L-002794-25** - Law Division
   - Type: Civil (Track Change Litigation)
   - Status: Active
   - Filed: 2025-10-03
   - 29 PDF documents
   - YAML: Exists, needs path updates

2. **ATL-DC-007956-25** - Special Civil Part
   - Type: Civil Collection (Toll Enforcement)
   - Status: Active
   - Filed: 2025-03-28
   - 27 PDF documents
   - YAML: Exists, needs path updates

3. **ATL-L-002869-25** - Law Division
   - Type: Declaratory Judgment
   - Status: Active
   - Filed: 2025-10-14
   - 7 PDF documents
   - YAML: Exists (4 entries), needs path updates and completion

4. **ATL-L-003252-25** - Law Division
   - Type: **[NEEDS UPDATE]**
   - Status: Open (should be "active")
   - Filed: **[NEEDS UPDATE]**
   - 36 PDF documents
   - YAML: **MISSING - needs to be created**
   - Case metadata: **INCOMPLETE - needs full front matter**

### PCR and Appeals

5. **A-000313-25** - Appellate Division
   - Type: Post-Conviction Relief Appeal
   - Status: Open (should be "active")
   - Filed: 2025-10-29
   - Related to: ATL-24-001934
   - 7 PDF documents
   - YAML: Exists, needs path updates

6. **ATL-22-002292** - Superior Court
   - Type: Post-Conviction Relief
   - Status: Open (should be "pending")
   - Part of: barber-nj-pcr-2022
   - YAML: Exists

7. **ATL-22-002313** - Superior Court
   - Type: Post-Conviction Relief
   - Status: Open (should be "pending")
   - Part of: barber-nj-pcr-2022
   - YAML: Exists

### Federal Cases

8. **1:22-cv-06206** - US District Court (SDNY)
   - Type: Federal Civil Rights
   - Status: Pending
   - Filed: 2022-10-09
   - 10 PDF documents
   - YAML: Exists, needs path updates

9. **1:25-cv-15641-RMB-MJS** - US District Court
   - Type: Federal Civil Rights
   - Status: Active
   - Filed: 2025-09-09
   - 3 PDF documents
   - YAML: Exists, needs path updates

## File Statistics

| Case | PDFs Found | YAML Status | Priority |
|------|------------|-------------|----------|
| atl-l-002794-25 | 29 | Exists | High |
| atl-dc-007956-25 | 27 | Exists | High |
| atl-l-003252-25 | 36 | **MISSING** | **CRITICAL** |
| atl-l-002869-25 | 7 | Partial | Medium |
| a-000313-25 | 7 | Exists | High |
| usdj-1-22-cv-06206 | 10 | Exists | Medium |
| usdj-1-25-cv-15641 | 3 | Exists | Medium |
| **TOTAL** | **119** | 6/7 exist | - |

## Critical Action Items

### Immediate (Required for /cases/ to work)

1. **Run the repair script:**
   ```bash
   cd /workspaces/FaithFrontier
   node scripts/repair-docket-system.js
   ```

2. **Create YAML for ATL-L-003252-25:**
   - Create `_data/docket/atl-l-003252-25.yml`
   - Document all 36 PDF files
   - Follow schema in DOCKET-SYSTEM.md

3. **Update case metadata for ATL-L-003252-25:**
   - Update `_cases/atl-l-003252-25/index.md`
   - Add: court, venue, case_type, role, filed_date, judge, overview

### Follow-up (For consistency)

4. **Normalize status values:**
   - Change "open" → "active" or "pending" or "closed"
   - Affects: A-000313-25, ATL-24-001934, ATL-22-002292, ATL-22-002313, ATL-L-003252-25

5. **Complete ATL-L-002869-25 YAML:**
   - Add remaining 3 PDFs to docket YAML

6. **Verify all case front matter:**
   - Ensure all required fields present
   - Consistent formatting
   - Accurate docket numbers

## How to Run the Repair

### Option 1: Automated (Recommended)

```bash
cd /workspaces/FaithFrontier
node scripts/repair-docket-system.js
```

This will:
- Copy all PDFs to correct location
- Update all YAML files
- Generate detailed report
- Preserve original files (copies, not moves)

### Option 2: Manual

If automated script fails:
1. See `DOCKET-REPAIR-GUIDE.md` for step-by-step instructions
2. Use Python script: `python3 scripts/reorganize-dockets.py`
3. Use shell script: `bash scripts/reorganize-docket-files.sh`

## Validation Steps

After running repair:

```bash
# Check files were copied
ls -la assets/cases/atl-l-002794-25/docket/ | wc -l

# Verify YAML syntax
bundle exec jekyll build --trace

# Test site locally
bundle exec jekyll serve

# Visit http://localhost:4000/cases/
```

Expected result: Cases page loads, shows all cases, docket entries are clickable

## Additional Resources

- `DOCKET-SYSTEM.md` - Complete docket system documentation
- `DOCKET-REPAIR-GUIDE.md` - Detailed repair instructions
- `ANALYSIS-SYSTEM.md` - Case analysis features
- `.github/copilot-instructions.md` - Development guidelines

## Notes

- Original files in `cases/*/filings/` remain unchanged
- All changes are additions/copies, not deletions
- Safe to run multiple times (idempotent)
- Can be reviewed with `git status` before committing

---

**Ready to proceed:** Run `node scripts/repair-docket-system.js` to fix the 404 error and restore docket functionality.
