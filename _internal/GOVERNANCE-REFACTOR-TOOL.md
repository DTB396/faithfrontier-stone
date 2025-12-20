# Governance Refactor Tool

Automated content validation and refactoring system that uses the **copilot-instructions.md** governance framework to ensure all site content complies with Faith Frontier's mission, tone, and legal standards.

## Overview

This tool analyzes Markdown files across the site for governance compliance and can automatically refactor content to meet standards. It uses both rule-based detection and optional AI-powered refactoring.

## Features

- **Automated Scanning** - Check all files or specific sections for governance issues
- **Rule-Based Detection** - Pattern matching for prohibited language and tone issues
- **AI-Powered Refactoring** - Uses OpenAI GPT-4 with governance framework as system prompt
- **Backup System** - Automatically backs up files before modification
- **Interactive Mode** - Review and approve each change manually
- **Audit Mode** - Report issues without making changes
- **Dry Run** - Preview changes without writing to disk
- **Detailed Reports** - JSON and Markdown reports with issue tracking

## Installation

Already installed as part of the FaithFrontier project. Requires:

```bash
npm install  # Includes openai and dotenv dependencies
```

For AI refactoring, set your OpenAI API key:

```bash
echo "OPENAI_API_KEY=sk-..." >> .env
```

## Usage

### Basic Commands

```bash
# Audit all content (no changes)
node scripts/refactor-with-governance.js --audit-only --all

# Audit specific section
node scripts/refactor-with-governance.js --audit-only --section essays

# Audit single file
node scripts/refactor-with-governance.js --audit-only --file _essays/2025-11-10-revelations.md

# Refactor all content with AI
node scripts/refactor-with-governance.js --all

# Refactor specific section (rule-based only)
node scripts/refactor-with-governance.js --no-ai --section manifesto

# Dry run (show what would change)
node scripts/refactor-with-governance.js --dry-run --section trust

# Interactive mode (review each change)
node scripts/refactor-with-governance.js --interactive --section essays
```

### Command Options

| Option | Description |
|--------|-------------|
| `--all` | Scan all content sections (essays, cases, trust, manifesto, pages, posts) |
| `--section <name>` | Scan specific section (essays, cases, trust, manifesto, pages, posts) |
| `--file <path>` | Scan single file |
| `--audit-only` | Report issues without making changes |
| `--dry-run` | Preview changes without writing to disk |
| `--interactive` | Review and approve each change manually |
| `--no-ai` | Use rule-based refactoring only (no OpenAI API calls) |

## Governance Rules

The tool checks for compliance with standards defined in `.github/copilot-instructions.md`:

### Prohibited Content

**Patterns that trigger alerts:**
- Alternative currencies
- Asset-backed money systems
- Financial sovereignty claims
- Extralegal commerce
- Parallel government references
- Revolutionary movement language
- Divine mandate claims
- Prophetic certainty
- Weaponized scripture
- Religious authority over civil law

**Prohibited keywords:**
- "revolutionary movement"
- "currency issuer"
- "overthrow"
- "lawless"
- "above the law"

### Required Elements

**Tone:**
- Calm, grounded, sober
- Modest, factual
- Neighbor-facing (not adversarial)

**Legal Framework:**
- References to New Jersey jurisdiction
- U.S. constitutional framework
- Compliance language
- Lawful alternatives

**Boundaries:**
- Accountability mechanisms
- Transparency commitments
- Stewardship principles

### Encouraged Language

- Local trade and labor
- Community accountability
- Mutual aid
- Tangible work and skills
- Small-scale resilience
- Craft and vocation
- Dignity and service

## Detection Logic

### Rule-Based Issues

1. **Prohibited Language** - Regex pattern matching for forbidden terms
2. **Tone Issues** - Heuristic detection of:
   - Excessive exclamation marks (>10 indicates over-excitement)
   - All-caps words (>5 indicates shouting)
   - Fear-based language (crisis, collapse, emergency, urgent, critical)

### AI-Powered Analysis

When `OPENAI_API_KEY` is set, the tool can use GPT-4 for:
- Contextual understanding of violations
- Intelligent rewriting while preserving meaning
- Tone adjustment
- Legal language refinement

## Refactoring Methods

### Rule-Based Refactoring

Simple find-and-replace for common violations:

```javascript
{
  'alternative currency' → 'local trade network',
  'asset-backed money' → 'tangible value exchange',
  'financial sovereignty' → 'economic self-reliance',
  'divine mandate' → 'faith-inspired purpose',
  'prophetic certainty' → 'scriptural guidance',
}
```

### AI Refactoring

Uses OpenAI GPT-4 with:
- **System prompt:** Full copilot-instructions.md governance framework
- **User prompt:** Content + detected issues + refactoring requirements
- **Temperature:** 0.3 (balanced creativity and consistency)
- **Model:** gpt-4o (optimized for instruction following)

The AI is instructed to:
1. Fix all detected issues
2. Maintain core message and structure
3. Use calm, grounded, sober tone
4. Ensure legal compliance language
5. Avoid prohibited patterns
6. Keep faith references humble and non-coercive
7. Focus on local stewardship and lawful alternatives
8. Write for diverse audiences (judges, regulators, pastors, neighbors)

## Output and Reports

### Console Output

Real-time feedback during scanning:
```
📝 Analyzing: _essays/2025-11-10-revelations.md
   ⚠️  Found 2 issue(s):
      1. PROHIBITED_LANGUAGE: Contains prohibited pattern: "alternative currency"
      2. TONE_ISSUE: Excessive exclamation marks (15) - tone should be sober and calm
   🤖 Requesting AI refactoring...
   ✓ File refactored successfully
```

### JSON Report

Saved to `reports/governance-refactor/report-TIMESTAMP.json`:

```json
{
  "scanned": 42,
  "issues": [
    {
      "file": "_essays/example.md",
      "issues": [
        {
          "type": "PROHIBITED_LANGUAGE",
          "message": "Contains prohibited pattern: \"alternative currency\"",
          "severity": "high",
          "pattern": "alternative currenc"
        }
      ]
    }
  ],
  "refactored": ["_essays/example.md"],
  "skipped": [],
  "errors": []
}
```

### Markdown Summary

Saved to `reports/governance-refactor/LATEST-REPORT.md`:

```markdown
# Governance Refactor Report

Generated: 2025-12-20T10:30:00.000Z

## Summary

- Files scanned: 42
- Files with issues: 3
- Files refactored: 2
- Files skipped: 1
- Errors: 0

## Issues Detected

### _essays/example.md

- **PROHIBITED_LANGUAGE** (high): Contains prohibited pattern: "alternative currency"
- **TONE_ISSUE** (medium): Excessive exclamation marks (15)
```

## Backup System

Before modifying any file, a timestamped backup is created:

```
reports/governance-refactor/backups/
  example.md.2025-12-20T10-30-00-000Z.bak
  revelations.md.2025-12-20T10-31-15-000Z.bak
```

To restore a backup:
```bash
cp reports/governance-refactor/backups/FILE.TIMESTAMP.bak _essays/FILE
```

## Workflow Examples

### Pre-Publish Audit

Before deploying new content:

```bash
# Check all content for issues
node scripts/refactor-with-governance.js --audit-only --all

# Review report
cat reports/governance-refactor/LATEST-REPORT.md

# Fix specific files manually or with AI
node scripts/refactor-with-governance.js --file _essays/problematic-essay.md
```

### Bulk Content Review

Review an entire section:

```bash
# Dry run to see what would change
node scripts/refactor-with-governance.js --dry-run --section manifesto

# If comfortable with changes, run for real
node scripts/refactor-with-governance.js --section manifesto

# Check diffs
git diff _manifesto/
```

### Manual Refinement Workflow

1. Run audit to find issues
2. Attempt rule-based fixes
3. Review remaining issues manually
4. Use AI for complex refactoring

```bash
# Step 1: Audit
node scripts/refactor-with-governance.js --audit-only --all

# Step 2: Rule-based fixes
node scripts/refactor-with-governance.js --no-ai --all

# Step 3: Review report for remaining issues
cat reports/governance-refactor/LATEST-REPORT.md

# Step 4: AI refactor remaining problem files
node scripts/refactor-with-governance.js --file _essays/complex-theology.md
```

## Adding Custom Rules

To extend the governance rules, edit `GOVERNANCE_RULES` in the script:

```javascript
const GOVERNANCE_RULES = {
  prohibited: {
    patterns: [
      /your custom regex/i,
      // ... existing patterns
    ],
    keywords: [
      'your keyword',
      // ... existing keywords
    ]
  },
  // ... other rules
};
```

## Integration with CI/CD

Add to GitHub Actions workflow:

```yaml
- name: Governance Audit
  run: |
    node scripts/refactor-with-governance.js --audit-only --all
    if grep -q "Files with issues: [1-9]" reports/governance-refactor/LATEST-REPORT.md; then
      echo "Governance issues detected"
      cat reports/governance-refactor/LATEST-REPORT.md
      exit 1
    fi
```

## Limitations

1. **Pattern Matching** - Rule-based detection can't understand context
2. **False Positives** - May flag legitimate uses of monitored terms
3. **AI Dependency** - Best results require OpenAI API (costs money)
4. **Manual Review** - Complex theological or legal content should be human-reviewed
5. **Tone Subjectivity** - Tone assessment is heuristic, not perfect

## Best Practices

1. **Always audit before refactoring** - Understand issues first
2. **Use dry run for bulk changes** - Preview before committing
3. **Review AI changes** - Don't blindly trust automated refactoring
4. **Keep backups** - Don't delete backup directory
5. **Run regularly** - Catch issues early in content development
6. **Combine with human review** - Tool assists, humans decide

## Troubleshooting

**"No OpenAI API key found"**
- Set `OPENAI_API_KEY` in `.env` file
- Or use `--no-ai` flag for rule-based only

**"Target not found"**
- Check section name spelling
- Use absolute or relative path for files
- Ensure file exists

**"Too many issues detected"**
- Run audit-only first to assess scope
- Tackle one section at a time
- Review governance framework for alignment

**"AI refactoring changed meaning"**
- Restore from backup
- Adjust AI prompt in `buildRefactorPrompt()`
- Consider manual editing instead

## Related Documentation

- [.github/copilot-instructions.md](.github/copilot-instructions.md) - Complete governance framework
- [_internal/BRAND-TONE-GUIDE.md](_internal/BRAND-TONE-GUIDE.md) - Writing style guidelines
- [_internal/STYLE-RULES.md](_internal/STYLE-RULES.md) - Technical style standards

## Future Enhancements

Potential improvements for future versions:

- [ ] Readline integration for true interactive mode
- [ ] Parallel processing for faster bulk scanning
- [ ] Configurable rules via YAML file
- [ ] Git diff preview before committing changes
- [ ] Integration with Vale linter for style checking
- [ ] Custom AI models for faster/cheaper refactoring
- [ ] Web UI for visual issue review
- [ ] Automated PR creation with proposed fixes
