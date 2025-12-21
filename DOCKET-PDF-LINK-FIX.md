# FaithFrontier Docket PDF Link Fix - Summary

## Problem
PDFs showing 404 errors on https://faithfrontier.org/cases/atl-l-003252-25/

## Root Cause
The docket YAML file had absolute paths like `/assets/cases/...` but the actual built site has files at `/cases/atl-l-003252-25/filings/...`

## Changes Made

### 1. Updated README.md (`cases/atl-l-003252-25/README.md`)
- ✅ Converted flat file list to **chronological docket with metadata**
- ✅ Added document types (Certification, Order, Brief, etc.)
- ✅ Organized by date for easy navigation
- ✅ Used relative paths `./filings/filename.pdf`
- ✅ Added URL encoding for filenames with spaces
- ✅ Highlighted key documents (OTSC Granted marked with ✓)

### 2. Updated Docket YAML (`_data/docket/atl-l-003252-25.yml`)
- ✅ Changed file paths from `/assets/cases/...` to `/cases/atl-l-003252-25/filings/...`
- ✅ Added December 20, 2025 filings (most recent)
- ✅ Ensured filename consistency with actual files
- ✅ Maintained YAML structure for Jekyll template compatibility

## How Jekyll Template Works

From `_layouts/case.html` (lines 81-88):

```liquid
{% if d.file %}
  {% assign docket_file = d.file %}
  {% assign first_char = docket_file | slice: 0, 1 %}
  {% if first_char == '/' %}
    <a href="{{ docket_file }}" target="_blank" rel="noopener">{{ d.title }}</a>
  {% else %}
    <a href="/cases/{{ slug }}/filings/{{ docket_file | uri_escape }}" target="_blank" rel="noopener">{{ d.title }}</a>
  {% endif %}
{% endif %}
```

**Logic:**
- If path starts with `/` → Use as absolute path
- If path does NOT start with `/` → Prepend `/cases/{slug}/filings/`

## Correct Path Format

**YAML File Should Use:**
```yaml
file: /cases/atl-l-003252-25/filings/filename.pdf
```

**Renders as:**
```html
<a href="/cases/atl-l-003252-25/filings/filename.pdf">Title</a>
```

## Files Updated

1. `C:\Users\Devon Tyler\faithfrontier\cases\atl-l-003252-25\README.md`
2. `C:\Users\Devon Tyler\faithfrontier\_data\docket\atl-l-003252-25.yml`

## Verification Steps

After pushing to GitHub and site rebuild:

1. Visit: https://faithfrontier.org/cases/atl-l-003252-25/
2. Check that docket entries display
3. Click on any PDF link (should no longer 404)
4. Verify most recent entries (Dec 19-20) appear

## Special Notes

### Filenames with Spaces
Two December 20 files have spaces in names:
- `12-20-2025-Plaintiff Procedural and Supplemental Certifications.pdf`
- `12-20-2025-Service on Counsel.pdf`

**Handled via URL encoding:**
```yaml
file: /cases/atl-l-003252-25/filings/12-20-2025-Plaintiff%20Procedural%20and%20Supplemental%20Certifications.pdf
```

### File Naming Inconsistency
- Most files use format: `YYYYMMDD-description.pdf` (e.g., `20251219-plaintiffs-reply-brief.pdf`)
- Dec 20 files use: `MM-DD-YYYY-Description With Spaces.pdf`

**Recommendation:** Rename Dec 20 files to match pattern:
```
20251220-plaintiff-procedural-supplemental-certifications.pdf
20251220-service-on-counsel.pdf
```

But current YAML accounts for existing filenames.

## Next Steps

1. **Commit changes:**
   ```bash
   git add cases/atl-l-003252-25/README.md
   git add _data/docket/atl-l-003252-25.yml
   git commit -m "Fix PDF 404 errors: Update docket paths to match built site structure"
   git push
   ```

2. **Wait for GitHub Pages build** (~2-3 minutes)

3. **Verify links work** at https://faithfrontier.org/cases/atl-l-003252-25/

4. **Optional:** Normalize Dec 20 filenames for consistency

## Additional Improvements Made

### README.md Enhancements:
- Chronological organization with date headers
- Document type labels (Order, Brief, Certification, etc.)
- Highlighted critical documents (OTSC GRANTED ✓)
- Updated case summary to reflect OTSC granted status
- Added return date information (Dec 22, 2025)

### YAML Enhancements:
- Consistent ID structure
- All entries have proper metadata (id, date, type, title, file)
- Sorted chronologically
- Includes latest filings

## Maintenance

To add new filings:

1. Add PDF to `cases/atl-l-003252-25/filings/`
2. Add entry to `_data/docket/atl-l-003252-25.yml`:
   ```yaml
   - id: YYYYMMDD-short-description
     date: YYYY-MM-DD
     type: Filing Type
     title: Full Description
     file: /cases/atl-l-003252-25/filings/filename.pdf
   ```
3. Optionally update README.md for human-readable view
4. Commit and push

The Jekyll site will automatically rebuild and display new entries.
