## Governance & Content Refactoring

Faith Frontier maintains strict governance standards for all published content. A comprehensive refactoring tool helps validate and revise content to ensure compliance with mission, tone, and legal standards.

### Quick Commands

```bash
# Audit all content for governance issues
npm run governance:audit

# Audit specific section (essays, cases, trust, manifesto)
npm run governance:audit:section essays

# Refactor all content using AI
npm run governance:refactor

# Preview changes without writing files
npm run governance:dry-run
```

### What the Tool Checks

**Prohibited Content:**
- Alternative currency claims
- Financial sovereignty rhetoric
- Extralegal commerce suggestions
- Divine mandate claims
- Revolutionary movement language

**Tone Standards:**
- Calm, grounded, factual writing
- Modest rather than emphatic
- Neighbor-facing rather than adversarial
- Legally sober and compliant

**Required Elements:**
- New Jersey/U.S. law compliance
- Accountability and transparency commitments
- Faith as conscience guide (not coercion)
- Local stewardship focus

### Documentation

- **[GOVERNANCE-REFACTOR-TOOL.md](_internal/GOVERNANCE-REFACTOR-TOOL.md)** - Complete system documentation
- **[GOVERNANCE-REFACTOR-QUICKSTART.md](_internal/GOVERNANCE-REFACTOR-QUICKSTART.md)** - Fast reference guide
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** - Full governance framework

### Workflow Integration

The tool can be used:
- Before publishing new content (pre-deployment audit)
- During content review cycles (weekly/monthly audits)
- As part of CI/CD validation (automated checks)
- For bulk content modernization (section-by-section refactoring)

All changes are backed up automatically, and detailed reports track what was found and fixed.
