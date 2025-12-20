# Governance Refactor Tool - Quick Start

Fast reference for using the governance refactoring system.

## Quick Commands

```bash
# Audit all content for issues
npm run governance:audit

# Audit specific section
npm run governance:audit:section essays

# Refactor all content with AI
npm run governance:refactor

# Refactor specific section
npm run governance:refactor:section manifesto

# Refactor single file
npm run governance:refactor:file _essays/example.md

# Preview changes without writing
npm run governance:dry-run
```

## Common Workflows

### Before Publishing New Content

```bash
# 1. Check the new content
node scripts/refactor-with-governance.js --audit-only --file _essays/new-essay.md

# 2. If issues found, refactor
node scripts/refactor-with-governance.js --file _essays/new-essay.md

# 3. Review the changes
git diff _essays/new-essay.md
```

### Weekly Content Audit

```bash
# Run full audit
npm run governance:audit

# Check report
cat reports/governance-refactor/LATEST-REPORT.md

# Fix problematic sections
npm run governance:refactor:section essays
```

### Pre-Deployment Check

```bash
# Dry run to see what would change
npm run governance:dry-run

# Review report before proceeding
cat reports/governance-refactor/LATEST-REPORT.md
```

## Issue Types

| Type | Severity | Meaning |
|------|----------|---------|
| **PROHIBITED_LANGUAGE** | High | Contains forbidden terms (alternative currency, etc.) |
| **PROHIBITED_KEYWORD** | High | Uses prohibited keywords (revolutionary movement, etc.) |
| **TONE_ISSUE** | Medium | Tone not calm/grounded (excessive !, CAPS, fear words) |

## Governance Standards

### ✅ Encouraged
- Local trade, stewardship, community accountability
- Calm, grounded, factual tone
- New Jersey/U.S. law compliance
- Faith-inspired (not faith-mandated)

### ❌ Prohibited
- Alternative currencies, asset-backed money
- Financial sovereignty claims
- Extralegal commerce
- Divine mandates, prophetic certainty
- Revolutionary/overthrow language

## Output Files

```
reports/governance-refactor/
  ├── report-2025-12-20T10-30-00.json    # Detailed JSON report
  ├── LATEST-REPORT.md                   # Human-readable summary
  └── backups/                           # Timestamped backups
      └── file.md.TIMESTAMP.bak
```

## Options Reference

| Option | Description |
|--------|-------------|
| `--all` | Scan all content sections |
| `--section <name>` | Scan specific section (essays, cases, trust, manifesto) |
| `--file <path>` | Scan single file |
| `--audit-only` | Report only, no changes |
| `--dry-run` | Preview changes |
| `--no-ai` | Rule-based only (no OpenAI) |
| `--interactive` | Review each change (WIP) |

## Examples

```bash
# Check all essays
node scripts/refactor-with-governance.js --audit-only --section essays

# Fix all trust documents without AI
node scripts/refactor-with-governance.js --no-ai --section trust

# Preview changes to manifesto
node scripts/refactor-with-governance.js --dry-run --section manifesto

# Refactor single problematic file
node scripts/refactor-with-governance.js --file _essays/2025-11-10-revelations.md
```

## Restoring Backups

If you need to undo changes:

```bash
# Find the backup
ls reports/governance-refactor/backups/

# Restore it
cp reports/governance-refactor/backups/FILE.TIMESTAMP.bak _essays/FILE.md
```

## Troubleshooting

**No issues found but you see problems?**
- Add patterns to `GOVERNANCE_RULES` in the script

**AI changing too much?**
- Use `--no-ai` for rule-based only
- Or manually edit after reviewing AI suggestions

**Want to preview before committing?**
- Always use `--dry-run` first
- Review `git diff` after refactoring

## Full Documentation

See [GOVERNANCE-REFACTOR-TOOL.md](GOVERNANCE-REFACTOR-TOOL.md) for complete documentation.
