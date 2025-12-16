# Faith Frontier Case Archive System Guide

This guide documents the enhanced case archive system for Faith Frontier, including the new structured case layout, workflow for adding cases, and best practices for maintaining professional legal documentation.

## Overview

The Faith Frontier case archive provides structured, professionally organized documentation of legal cases with a focus on:

- **Transparency**: Clear, accessible case information for New Jersey residents
- **Due Process Documentation**: Detailed records of procedural steps and filings
- **Personal Narrative**: Connecting legal cases to Faith Frontier's mission
- **Professional Standards**: Legal document organization that respects court protocols

## Case Layout Options

### Standard Layout (`case.html`)

The standard layout provides basic case information with:
- Case caption and metadata
- Docket entries
- Key filings
- AI-generated analysis (optional)

**Use when:** Simple case structure without extensive narrative is sufficient.

### Enhanced Layout (`case-enhanced.html`)

The enhanced layout provides a comprehensive, structured case format with:
- **Case Caption**: Formal header with standardized metadata
- **Procedural Posture**: Timeline and current procedural status
- **Factual Background**: Neutral summary of underlying facts
- **My Involvement**: Personal context and Faith Frontier connection
- **Current Status**: Clear description of present state and next steps
- **Docket Entries**: Chronological list of all filings with enhanced styling
- **Key Filings**: Organized document links with checksums
- **Related Matters**: Connected cases and dockets
- **Document Provenance**: Source and authenticity information

**Use when:** Case requires detailed narrative structure or represents significant Faith Frontier documentation.

## Case Schema

### Required Fields

```yaml
layout: case-enhanced  # or 'case' for standard
title: "Full Case Title"
short_title: "Short Name"
slug: kebab-case-slug
permalink: /cases/kebab-case-slug/
court: "Court Name"
case_type: "Type"
role: "Your Role"
primary_docket: "DOCKET-NUMBER"
status: active  # active, pending, or closed
filed_date: YYYY-MM-DD
```

### Enhanced Layout Fields

For `case-enhanced` layout, include these additional fields:

```yaml
# Procedural context
forum_level: "Trial Court"
procedural_posture: |
  Multi-line description of current procedural status.

# Timeline of key events
timeline:
  - date: YYYY-MM-DD
    event: "Event description"

# Factual narrative
factual_background: |
  Neutral summary of underlying facts.

# Personal narrative
my_involvement: |
  Your perspective and Faith Frontier connection.

# Current state
current_status: |
  Where the case stands now.

next_steps:
  - "Anticipated action 1"
  - "Anticipated action 2"

# Related matters
related_cases:
  - title: "Related Case"
    url: "/cases/slug/"
    relationship: "Relationship description"
```

### Optional Fields

```yaml
judge: "Judge Name"
venue: "County or District"
tags: [tag1, tag2]
assets_dir: "/cases/slug/docket/"
source_url: "https://source.url"
received_via: "How documents were obtained"
provenance_note: "Additional source context"
```

## Workflow for Adding New Cases

### 1. Prepare Case Information

Before creating the case file, gather:
- All docket numbers
- Filing dates and key events
- PDF documents of filings
- Case narrative and factual background
- Current status information

### 2. Create Case Directory

```bash
mkdir -p _cases/your-case-slug
mkdir -p assets/cases/your-case-slug/docket
```

### 3. Copy Template

```bash
cp _cases/_TEMPLATE.md _cases/your-case-slug/index.md
```

### 4. Fill Out Front Matter

Edit `_cases/your-case-slug/index.md` and complete all relevant fields:

- Replace template placeholders with actual case information
- Write clear, neutral factual background
- Explain personal involvement and Faith Frontier connection
- Document procedural status and timeline

### 5. Add Docket Entries

Create or update `_data/docket/your-case-slug.yml`:

```yaml
- id: 2025-01-15-complaint
  date: 2025-01-15
  type: Filing
  title: Complaint
  file: /assets/cases/your-case-slug/docket/2025-01-15_Filing_Complaint.pdf
  notes: "Initial filing initiating the action"

- id: 2025-02-01-answer
  date: 2025-02-01
  type: Filing
  title: Answer
  file: /assets/cases/your-case-slug/docket/2025-02-01_Filing_Answer.pdf
```

### 6. Upload Documents

Place PDF files in `assets/cases/your-case-slug/docket/` following naming convention:
```
YYYY-MM-DD_Type_Description.pdf
```

### 7. Update Cases Map

Add docket number mapping to `_data/cases-map.yml`:

```yaml
YOUR-DOCKET-NUMBER: your-case-slug
```

### 8. Build and Test

```bash
bundle exec jekyll serve
```

Navigate to `http://localhost:4000/cases/your-case-slug/` to verify.

## Writing Guidelines

### Factual Background

The factual background should read like a court opinion:
- **Neutral tone**: Avoid subjective characterizations
- **Chronological**: Present events in order
- **Factual**: Stick to verifiable facts
- **Clear**: Use plain language accessible to non-lawyers

**Good example:**
> This case arises from a lease dispute between [parties]. On [date], [event occurred]. 
> The landlord alleges [claim]. The tenant maintains [defense].

**Avoid:**
> This outrageous case shows how landlords abuse tenants. The evil landlord clearly violated my rights.

### My Involvement

This section connects the legal case to Faith Frontier's mission:
- Explain your role (plaintiff, defendant, etc.)
- Describe why you're pursuing or defending the case
- Connect to Faith Frontier themes (due process, transparency, justice)
- Share personal impact while maintaining dignity

**Good example:**
> As the plaintiff, I am seeking [remedy] because [reason]. This case exemplifies the procedural 
> barriers that New Jersey residents face when [context]. By documenting this matter on Faith Frontier, 
> I hope to illuminate [systemic issue] and provide guidance for others in similar situations.

### Procedural Posture

Describe the current state of proceedings:
- What motions are pending?
- What is the next scheduled event?
- What procedural track is the case on?
- Have there been any significant rulings?

Use legal terminology correctly but provide explanations for non-lawyers.

### Current Status

Be specific and up-to-date:
- State the date of the status update
- Describe recent developments
- Identify pending actions
- Note upcoming deadlines

Update this section whenever significant events occur.

## Docket Management

### Entry Types

Use consistent types for docket entries:
- **Filing**: Documents filed by parties
- **Order**: Court orders and decisions
- **Notice**: Court notices and scheduling
- **Brief**: Legal memoranda and briefs
- **Motion**: Formal motions requesting relief
- **Exhibit**: Evidence and supporting documents
- **Other**: Miscellaneous entries

### Chronological Order

Maintain entries in chronological order in the YAML file (oldest to newest). The case page will display them in reverse chronological order (newest first).

### File Naming Convention

PDFs should follow this pattern:
```
YYYY-MM-DD_Type_Short-Description.pdf
```

Examples:
- `2025-01-15_Filing_Complaint.pdf`
- `2025-02-01_Motion_Summary-Judgment.pdf`
- `2025-03-10_Order_Granted-MTD.pdf`

## Styling and Presentation

### Status Badges

The enhanced layout includes styled status badges:
- **Active**: Green badge for ongoing cases
- **Pending**: Yellow badge for cases awaiting action
- **Closed**: Gray badge for concluded matters

### Timeline Visualization

The timeline component provides a visual representation of key events with:
- Date markers
- Event descriptions
- Visual connection line

### Docket Entry Styling

Docket entries are styled with:
- Monospace dates for alignment
- Type badges for quick scanning
- Hover effects for interactivity
- Notes displayed below entries

### Print-Friendly

The enhanced layout includes print styles for professional document printing.

## Integration with Existing Systems

### Automated Intake

The enhanced layout works with existing docket intake automation:
1. Drop PDFs in `_inbox/` or use web upload form
2. Automation normalizes filenames and adds to docket YAML
3. Review PR and merge

### Case Analysis

Enhanced cases still support AI-powered analysis:
- Analysis data stored in `_data/analysis/slug.yml`
- Rendered via `{% include case-analysis.html %}`
- Optional: can be hidden if not needed

### Search and Filtering

Enhanced cases are fully compatible with the case index search:
- All metadata is indexed
- Search works across title, docket, and tags
- Status filtering works with enhanced layout

## Best Practices

### 1. Maintain Neutrality

Keep factual backgrounds objective. Save subjective commentary for the "My Involvement" section.

### 2. Update Regularly

When significant events occur:
1. Add docket entry
2. Update "Current Status" section
3. Adjust timeline if needed
4. Update next steps

### 3. Protect Privacy

Redact sensitive personal information:
- Social Security numbers
- Financial account numbers
- Addresses (unless relevant to public record)
- Phone numbers
- Medical information

### 4. Document Sources

Use provenance fields to track document origins:
- `source_url`: Official source (e.g., court website)
- `received_via`: How documents were obtained
- `provenance_note`: Additional context

### 5. Use Checksums

For important documents, include SHA256 checksums in `_data/checksums/slug.yml`:
```yaml
"2025-01-15_Filing_Complaint.pdf": "sha256hash..."
```

This ensures document integrity and authenticity.

### 6. Link Related Cases

Use `related_cases` to connect related matters:
- Appeals from trial court decisions
- Consolidated cases
- Cases involving similar parties or issues
- Cases that inform or are informed by this case

### 7. Professional Tone

Maintain a professional, respectful tone throughout:
- Respect the court and opposing parties
- Avoid inflammatory language
- Let facts speak for themselves
- Focus on procedural and substantive legal issues

## Troubleshooting

### Case Page Not Rendering

Check:
1. YAML front matter is valid (use a YAML validator)
2. Layout name is spelled correctly (`case-enhanced`)
3. Required fields are present
4. Jekyll build succeeds without errors

### Docket Entries Not Showing

Verify:
1. Docket YAML file exists at `_data/docket/slug.yml`
2. Slug in filename matches case slug
3. YAML is valid (check for syntax errors)
4. Date format is `YYYY-MM-DD`

### Styling Issues

Confirm:
1. `case-enhanced.css` is loaded (check page source)
2. Browser cache is cleared
3. CSS variables are defined in theme files
4. No conflicting styles from other CSS files

### Documents Not Linking

Check:
1. `assets_dir` is set correctly in front matter
2. PDF files exist at specified paths
3. File paths in YAML match actual filenames
4. Paths start with `/assets/cases/...`

## Migration from Standard to Enhanced Layout

To upgrade an existing case to the enhanced layout:

1. Change `layout: case` to `layout: case-enhanced`
2. Add enhanced fields to front matter
3. Move content into appropriate sections:
   - Overview → `factual_background`
   - Status updates → `current_status`
   - Personal notes → `my_involvement`
4. Create timeline from status section if applicable
5. Add next steps if relevant
6. Test rendering and adjust as needed

## Examples

See these cases for examples of the enhanced layout in action:

- `/cases/street-crossing-pcr-appeal/` - Appeal with dual tracks
- (Additional examples as cases are migrated)

## Support

For questions or issues with the case archive system:
1. Review this guide
2. Check `DOCKET-SYSTEM.md` for docket management details
3. Consult `_cases/_TEMPLATE.md` for reference
4. Open a GitHub issue if problems persist

---

**Last Updated:** December 2025  
**Version:** 2.0 (Enhanced Layout Release)
