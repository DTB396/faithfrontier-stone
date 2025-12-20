# Governance Refactor Tool - Implementation Summary

**Created:** December 20, 2025  
**Purpose:** Automated content validation and refactoring using copilot-instructions.md governance framework

---

## Overview

A comprehensive Node.js tool that scans Faith Frontier content for governance compliance and can automatically refactor problematic text to meet mission, tone, and legal standards.

## Files Created

### Core Script
**`scripts/refactor-with-governance.js`** (650+ lines)
- Main refactoring engine
- Rule-based detection system
- AI-powered refactoring (OpenAI GPT-4)
- Backup and reporting system
- CLI with multiple modes

### Documentation
1. **`_internal/GOVERNANCE-REFACTOR-TOOL.md`** (500+ lines)
   - Complete system documentation
   - Usage examples and workflows
   - API reference and configuration
   - Integration guides

2. **`_internal/GOVERNANCE-REFACTOR-QUICKSTART.md`** (150 lines)
   - Fast reference guide
   - Common commands and workflows
   - Issue type reference
   - Troubleshooting tips

3. **`_internal/README-SECTION-GOVERNANCE.md`** (50 lines)
   - README section for governance tool
   - Quick command reference
   - Standards overview

### Package Configuration
**`package.json`** - Added npm scripts:
- `governance:audit` - Audit all content
- `governance:audit:section` - Audit specific section
- `governance:refactor` - Refactor all content
- `governance:refactor:section` - Refactor specific section
- `governance:refactor:file` - Refactor single file
- `governance:dry-run` - Preview changes

---

## Features

### Detection Capabilities

**Prohibited Language Detection:**
- Pattern matching for forbidden terms (alternative currency, asset-backed money, financial sovereignty, etc.)
- Keyword scanning (revolutionary movement, currency issuer, lawless, etc.)
- Regex-based pattern recognition

**Tone Analysis:**
- Excessive exclamation marks (>10 indicates over-excitement)
- All-caps words (>5 indicates shouting)
- Fear-based language (crisis, collapse, emergency, urgent, critical)

**Compliance Checking:**
- Legal framework references (New Jersey, U.S. law)
- Accountability language
- Stewardship principles
- Humble faith references (non-coercive)

### Refactoring Methods

**Rule-Based Refactoring:**
Simple find-and-replace for common violations:
```javascript
'alternative currency' → 'local trade network'
'asset-backed money' → 'tangible value exchange'
'financial sovereignty' → 'economic self-reliance'
'divine mandate' → 'faith-inspired purpose'
'prophetic certainty' → 'scriptural guidance'
```

**AI-Powered Refactoring:**
- Uses OpenAI GPT-4o with governance framework as system prompt
- Context-aware rewriting while preserving meaning
- Intelligent tone adjustment
- Legal language refinement
- Temperature: 0.3 for balanced creativity and consistency

### Safety Features

**Backup System:**
- Automatic timestamped backups before any modification
- Stored in `reports/governance-refactor/backups/`
- Format: `filename.TIMESTAMP.bak`

**Modes:**
- `--audit-only` - Report issues without making changes
- `--dry-run` - Preview changes without writing to disk
- `--interactive` - Review each change manually (planned)
- `--no-ai` - Use rule-based refactoring only

### Reporting

**Console Output:**
- Real-time progress updates
- Issue detection during scanning
- Refactoring status messages

**JSON Report:**
- Complete scan results
- Detailed issue information
- Files processed, refactored, skipped, errors
- Saved with timestamp: `report-TIMESTAMP.json`

**Markdown Summary:**
- Human-readable report
- Issues organized by file
- Severity indicators
- Always saved as `LATEST-REPORT.md`

---

## Governance Rules

### Prohibited Content

**Patterns:**
- `/alternative currenc/i`
- `/replace.*fiat/i`
- `/asset-backed money/i`
- `/extralegal/i`
- `/financial sovereignty/i`
- `/parallel government/i`
- `/reject.*civil law/i`
- `/divine mandate/i`
- `/prophetic certainty/i`
- `/weaponize.*scripture/i`
- `/religious authority over.*law/i`

**Keywords:**
- "revolutionary movement"
- "currency issuer"
- "overthrow"
- "lawless"
- "above the law"

### Required Elements

**Tone:** Calm, grounded, sober, modest, factual

**Legal Framework:** New Jersey, U.S. law, compliant, lawful

**Boundaries:** Accountability, transparency, stewardship

### Encouraged Language

- Stewardship, local trade, community
- Accountability, neighbor-care, lawful
- Dignity, craft, vocation
- Tangible work, housing, land rehabilitation

---

## Usage Examples

### Pre-Publish Content Check
```bash
# Check new essay before publishing
node scripts/refactor-with-governance.js --audit-only --file _essays/new-content.md

# Review issues
cat reports/governance-refactor/LATEST-REPORT.md

# Fix if needed
node scripts/refactor-with-governance.js --file _essays/new-content.md
```

### Weekly Content Audit
```bash
# Audit all content sections
npm run governance:audit

# Review report
cat reports/governance-refactor/LATEST-REPORT.md

# Fix problem sections
npm run governance:refactor:section essays
```

### Bulk Content Modernization
```bash
# Preview changes to entire section
node scripts/refactor-with-governance.js --dry-run --section manifesto

# If comfortable with changes, run for real
npm run governance:refactor:section manifesto

# Review diffs
git diff _manifesto/
```

### Single File Refactoring
```bash
# For complex theological content
node scripts/refactor-with-governance.js --file _essays/2025-12-02-demonic-agency-and-gods-sovereignty.md

# Review changes
git diff _essays/2025-12-02-demonic-agency-and-gods-sovereignty.md

# Restore if needed
cp reports/governance-refactor/backups/FILE.TIMESTAMP.bak _essays/FILE.md
```

---

## Test Results

Initial test run on `_essays/` section:

```
Files scanned: 12
Files with issues: 5
Issues found:
  - 4 files with excessive all-caps words (tone issue)
  - 1 file with excessive exclamation marks (tone issue)
  - 1 file with prohibited keyword "lawless" (content issue)

No errors encountered.
All issues properly detected and categorized.
```

**Files with Issues:**
1. `2020-12-28-thomas-becket-proclamation.md` - Excessive all-caps (9 words)
2. `2025-10-11-tiller-earth.md` - Excessive exclamation marks (12)
3. `2025-11-10-geneva-bible-scroll.md` - Excessive all-caps (7 words)
4. `2025-11-10-revelations.md` - Excessive all-caps (6 words)
5. `2025-12-02-demonic-agency-and-gods-sovereignty.md` - Prohibited keyword "lawless"

---

## Integration Points

### With Existing Systems

1. **Case Analysis System** (`scripts/analyze-cases.js`)
   - Can validate generated analysis reports
   - Ensure AI-generated content meets governance standards

2. **Docket Intake** (`scripts/docket-intake.js`)
   - Validate case summaries during intake
   - Check metadata descriptions for compliance

3. **Jekyll Build**
   - Pre-build validation step
   - Prevent deployment of non-compliant content

4. **CI/CD (GitHub Actions)**
   - Automated audit on every push
   - Block PRs with governance violations

### Future Enhancements

Planned improvements:
- [ ] Readline integration for true interactive mode
- [ ] Parallel processing for faster bulk scanning
- [ ] Configurable rules via YAML file
- [ ] Git diff preview before committing changes
- [ ] Integration with Vale linter for style checking
- [ ] Custom AI models for faster/cheaper refactoring
- [ ] Web UI for visual issue review
- [ ] Automated PR creation with proposed fixes

---

## Technical Architecture

### Core Components

1. **GovernanceRefactorTool Class**
   - Main orchestration class
   - Handles initialization, scanning, analysis, refactoring

2. **Rule Engine**
   - Pattern matching system
   - Tone analysis heuristics
   - Severity classification

3. **AI Integration**
   - OpenAI SDK wrapper
   - Prompt engineering
   - Response parsing

4. **File Management**
   - Recursive directory scanning
   - Markdown file filtering
   - Backup creation
   - Safe file writing

5. **Reporting System**
   - Console logging
   - JSON report generation
   - Markdown summary creation

### Dependencies

- `openai` - AI-powered refactoring
- `dotenv` - Environment configuration
- `fs`, `path` - File system operations
- Node.js ES6 modules

### Configuration

```javascript
const CONFIG = {
  copilotInstructionsPath: '.github/copilot-instructions.md',
  sectionsToScan: {
    essays: '_essays',
    cases: '_cases',
    trust: '_trust',
    manifesto: '_manifesto',
    pages: '_pages',
    posts: '_posts',
  },
  outputDir: 'reports/governance-refactor',
  backupDir: 'reports/governance-refactor/backups',
};
```

---

## Limitations

1. **Pattern Matching** - Rule-based detection can't understand context
2. **False Positives** - May flag legitimate uses of monitored terms
3. **AI Dependency** - Best results require OpenAI API (costs money)
4. **Manual Review** - Complex theological or legal content should be human-reviewed
5. **Tone Subjectivity** - Tone assessment is heuristic, not perfect

---

## Best Practices

1. **Always audit before refactoring** - Understand issues first
2. **Use dry run for bulk changes** - Preview before committing
3. **Review AI changes** - Don't blindly trust automated refactoring
4. **Keep backups** - Don't delete backup directory
5. **Run regularly** - Catch issues early in content development
6. **Combine with human review** - Tool assists, humans decide

---

## Related Documentation

- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** - Complete governance framework
- **[_internal/BRAND-TONE-GUIDE.md](_internal/BRAND-TONE-GUIDE.md)** - Writing style guidelines
- **[_internal/STYLE-RULES.md](_internal/STYLE-RULES.md)** - Technical style standards
- **[DOCKET-SYSTEM.md](DOCKET-SYSTEM.md)** - Document management system

---

## Conclusion

The Governance Refactor Tool provides a systematic, automated approach to maintaining content quality and compliance across the Faith Frontier site. It combines rule-based detection with AI-powered refactoring to ensure all published content aligns with the mission of local stewardship, legal compliance, and humble faith expression.

Key benefits:
- ✅ Automated detection of governance violations
- ✅ AI-powered contextual refactoring
- ✅ Safe backup and rollback system
- ✅ Comprehensive reporting
- ✅ Multiple operation modes (audit, dry-run, refactor)
- ✅ Integration with existing workflows

The tool is ready for immediate use and can be integrated into daily content workflows, weekly audits, and CI/CD pipelines.
