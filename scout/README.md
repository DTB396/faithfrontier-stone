# Faith Frontier Property Stewardship & Acquisition Engine

## Overview
This system enables Faith Frontier Trust to identify, score, and shortlist properties for stewardship, housing, and land-rehab—while maintaining strict legal, ethical, and compliance boundaries. All data sources are API-based and authorized. All scoring is transparent and auditable.

## Directory Structure
```
/scout/
  config.yml              # Mission weights, thresholds, red flags
  sources.yml             # Approved APIs / feeds only
  schema.json             # Normalized property schema
  score.py                # Scoring engine (deterministic, explainable)
  ingest/                 # API adapters (no scraping)
  output/
    weekly-shortlist.md   # Public-facing shortlist
    candidates.json       # Ingested, normalized property data
  logs/
    api-runs/             # API call logs
    decisions/            # Scoring/shortlist logs
```

## Usage
1. **Ingest properties:**
   - Use scripts in `ingest/` to fetch and normalize property data from approved APIs.
   - All API runs are logged for auditability.
2. **Score properties:**
   - Run `score.py` to generate scores and explanations for each property.
   - Outputs a public shortlist and detailed rationales.
3. **Review shortlist:**
   - Trustees and stewards review the shortlist and explanations.
   - Tillerstead LLC receives only anonymized, contract-based briefs for construction bids.

## Legal & Governance Safeguards
- **Faith Frontier Trust** selects and stewards properties. It does not perform construction.
- **Tillerstead LLC** is a separate, arm’s-length vendor for construction/rehab. It does not control property selection.
- All cross-entity work is by written, market-rate contract only.
- All decisions and data flows are logged for compliance and auditability.

## Compliance & Ethics
- No scraping, no unauthorized data use, no black-box automation.
- All scoring and selection logic is open and explainable.
- System is designed for future regulatory, tax, and audit requirements.

## Stewardship Principles
- Regenerative land use
- Long-term soil, water, and habitat health
- Humane, non-extractive housing
- Durable, low-chemical construction

## For More Information
- See `how-we-discern-properties.md` for public explanation.
- See `config.yml` and `schema.json` for technical details.

---

*When in doubt, choose compliance, clarity, and stewardship.*
