# Faith Frontier

**Faith Frontier** is a Christian-informed public trust that documents legal matters, teaches civic responsibility, and stewards property initiatives with humility and accountability. The project serves the public under the U.S. Constitution and state law, and treats faith as a guide to conscience—not as extrajudicial authority.

This repository powers **faithfrontier.org** and brings together:

- transparent, verifiable public-record archives;
- protected theological reflections and essays;
- assistive automation for research, intake, and documentation; and
- structured operational guidance for lawful stewardship efforts.

The aim is sober transparency: explain what is being published, why it matters, and how neighbors can verify claims within lawful public-record systems.

---

## Why Faith Frontier Exists

- **Witness with accountability:** Publish primary documents and neutral narratives so communities can see the procedural record for themselves.
- **Civic discipleship:** Encourage constitutional literacy, due process, and lawful advocacy as acts of neighborly care.
- **Stewardship and service:** Support property, housing, and land rehabilitation projects in ways that respect zoning, licensing, tax law, and corporate separateness.
- **Faith-formed conscience:** Hold work and speech to Christian virtues—truthfulness, humility, repentance, and service—while honoring legitimate institutions and courts.

Heritage is treated as responsibility, not entitlement: generational American roots are acknowledged with gratitude for lawful processes and the constitutional order they depend on.

---

## What We Publish (and Why)

Faith Frontier content is intentionally separated to reduce confusion:

- **Public case records (`cases/`, `assets/cases/`, `_cases/`):** Procedural histories, dockets, and filings are posted for transparency, independent verification, and civic education. The goal is to document what happened—not to advance grievance or conspiracy narratives.
- **Faith and ethics essays (`_essays/`, `_articles/`, `_manifesto/`, `_pages/`, `_posts/`):** Reflections on stewardship, accountability, and moral formation. These writings express belief and conscience, not binding law.
- **Operational guidance (`_trust/`, `scripts/`, automation docs):** Tools and checklists for lawful governance, automation usage, and stewardship operations.

Each category is labeled so readers can distinguish belief from law and understand when a document is interpretive versus a public record. Case publications exist to strengthen public confidence in due process and to create verifiable audit trails—not to undermine courts or claim hidden knowledge.

---

## How Faith, Law, and Civic Duty Interact

- **Constitutional respect:** Work proceeds within courts, statutes, administrative rules, and public-record frameworks.
- **Due process first:** Transparency and open records are used to illuminate the steps taken in a case, not to bypass them.
- **Checks and balances:** Oversight is pursued through lawful filings, hearings, and documented correspondence—not through extrajudicial pressure.
- **Faith as formation:** Christian principles inform conduct, honesty, and compassion. They do not replace legal authority or create parallel courts.

---

## Transparency Standards for Cases

- Identify why a case is listed, what filings are included, and where the primary record is housed.
- Provide neutral summaries that trace procedural history without sensationalism or speculation.
- Link to source documents so readers can verify facts independently.
- Note the status of each matter (open, closed, appealed) and the jurisdiction involved.

Publishing cases in this way aims to educate citizens about lawful civic engagement and to model responsible public-record use.

---

## Platform & Automation Direction

Faith Frontier is evolving from a static site into a governed, automation-assisted platform that supports:

- opportunity and case sourcing;
- structured analysis and scoring;
- due-diligence workflows;
- documentation and audit trails; and
- public transparency with protected internal operations.

Automation is **assistive, not autonomous**: systems propose, humans decide, and every output is logged. All tooling is expected to honor privacy, licensing boundaries, and the separation between belief statements and legal records.

---

## Repository Structure

```text
_cases/              # Case summaries and metadata (Markdown)
  _TEMPLATE.md       # Template for creating new cases
cases/               # Normalized public-facing case folders with filings
assets/cases/        # Binary filings, exhibits, envelopes, media
_essays/             # Protected essays and narratives
_articles/, articles/ # Long-form content and features
_layouts/            # Jekyll templates (MIT-licensed code)
  case.html          # Standard case layout
  case-enhanced.html # Enhanced structured case layout
_includes/           # Reusable content snippets
assets/css/          # Stylesheets (MIT-licensed code)
  case-enhanced.css  # Enhanced case layout styling
assets/js/           # Scripts (MIT-licensed code)
assets/images/       # Logos, seals, diagrams (trademark governed)
scripts/             # Automation utilities (MIT-licensed code)
```

Navigation cues:

- Case materials live in `cases/` and `assets/cases/` for public verification.
- Faith and civic essays live in `_essays/`, `_articles/`, `_manifesto/`, `_pages/`, and `_posts/` to keep interpretation distinct from recordkeeping.
- Operational and automation files sit in `scripts/`, `_trust/`, and supporting docs to guide lawful use.

---

## Local Development

```bash
bundle install
bundle exec jekyll serve
# Visit http://localhost:4000
```

Production build:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

---

## Deployment

- GitHub Pages deploys from the `main` branch.
- Domain: **faithfrontier.org** (CNAME -> `xtx33.github.io`).
- Ensure DNS A-records follow GitHub's guidance if apex hosting is required.

---

## Governance, Licensing & Trust Boundaries

Faith Frontier operates under strict governance rules. These are not optional and apply to all contributors and automation.

### Legal & Trust Framework

FaithFrontier content falls into two distinct categories:

1. **Source Code – Open use under the MIT License**

   Templates, CSS/JS, workflows, and automation scripts fall under [`LICENSE`](./LICENSE).

2. **Creative, legal, and theological content – Restricted use**

   Essays, metadata, branding, and case narratives are protected under [`CONTENT_LICENSE.md`](./CONTENT_LICENSE.md), [`TRADEMARK_NOTICE.md`](./TRADEMARK_NOTICE.md), and [`DISCLAIMER.md`](./DISCLAIMER.md).

### Required Legal References

- [`LICENSE`](./LICENSE): MIT license for code only.
- [`CONTENT_LICENSE.md`](./CONTENT_LICENSE.md): Ecclesiastical license for all non-code works.
- [`TRADEMARK_NOTICE.md`](./TRADEMARK_NOTICE.md): Protection for FaithFrontier marks, logos, seals, and visual theology.
- [`DISCLAIMER.md`](./DISCLAIMER.md): Reliance, liability, and public-trust usage boundaries.

Every contribution must preserve these boundaries. Do **not** treat essays, case records, metadata, or imagery as open-source material; obtain written approval before republishing any protected work.

### Directory-Level Enforcement

- `_cases/`, `_articles/`, `_essays/`, `_manifesto/`, `_pages/`, `_posts/`, `_trust/`: Markdown narratives governed by `CONTENT_LICENSE.md`.
- `cases/`, `assets/cases/`: Filings and exhibits. Public-record PDFs remain public domain, but FaithFrontier's summaries and organization remain protected.
- `assets/images/`: Logos and artwork subject to `TRADEMARK_NOTICE.md`.
- `_layouts/`, `_includes/`, `assets/css/`, `assets/js/`, `scripts/`, workflows: MIT-licensed code covered by `LICENSE`.

When adding new material, identify whether it is code or content, apply the appropriate license, and reference the governing document where necessary.

---

## Enhanced Case Archive System

Faith Frontier features a structured case documentation system with two layout options:

- **Standard Layout** (`case.html`): Basic case information with docket entries and key filings.
- **Enhanced Layout** (`case-enhanced.html`): Comprehensive structured format with:
  - Case caption and standardized metadata
  - Procedural posture with timeline visualization
  - Factual background (neutral narrative)
  - Personal involvement and Faith Frontier connection
  - Current status and next steps
  - Enhanced docket entry styling
  - Professional print-ready formatting

See `CASE-ARCHIVE-GUIDE.md` for complete documentation on using the enhanced case system.

## AI-Assisted Analysis

Optional tooling in `scripts/` leverages OpenAI APIs. Configure credentials via `.github/SETUP-OPENAI.md` and review `QUICKSTART-GENERATE-ANALYSIS.md` plus `ANALYSIS-SYSTEM.md` before running any automation. Outputs remain subject to the disclaimer and content-license rules.

---

## Disclaimer

Nothing in this repository constitutes legal advice. Review [`DISCLAIMER.md`](./DISCLAIMER.md) for the full statement before relying on any analysis or narrative. Faith Frontier respects lawful oversight, welcomes correction, and invites public review of records to strengthen—not weaken—self-governance.

---

## Contributions

- Code contributions are welcome; keep them MIT-compatible.
- Content updates require approval to preserve accuracy, privacy, and ecclesiastical governance.

Questions, permissions, or coordination requests: **[info@tillerstead.com](mailto:info@tillerstead.com)**

---

## Automation & Agent Instructions

This repository is designed to work with AI-assisted development tools.

Authoritative agent context lives in:

- `.github/copilot/AGENT_INSTRUCTIONS.md`
- `TASKS.md`
- `docs/PLATFORM.md`

AI tools must follow those documents and respect all governance and licensing boundaries. Short, honest answer first — then the **best possible workaround that actually works today**:

> **There is no single “full command” that puts GitHub Copilot into a true autonomous background agent mode** that keeps working indefinitely on your wishes, intentions, and goals without prompts.
> That capability **does not exist** in Copilot as of 2025.

Copilot is **reactive**, not autonomous:

- It responds to prompts, files, comments, and terminal commands
- It does **not** self-initiate work in the background
- It does **not** retain goals unless they are written into files it can read

That said — you *can* get **very close to what you want** by doing this **the right, durable way**.

Below is the **maximum-power setup** that effectively turns Copilot into a **persistent project agent** for FaithFrontier.

---

## ✅ THE CORRECT WAY TO PUT COPILOT INTO “AGENT-LIKE” MODE

### 🔑 Principle

Copilot follows **instructions in the repository**, not your memory.

So we:

1. Encode your intentions as **living instruction files**
2. Trigger Copilot through **commands + comments**
3. Let **GitHub Actions** handle the “background” automation

---

## 🧠 STEP 1 — Create a Persistent Agent Instruction File

Create this file in the FaithFrontier repo:

```bash
mkdir -p .github/copilot
code .github/copilot/AGENT_INSTRUCTIONS.md
```
