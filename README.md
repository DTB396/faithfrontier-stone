# Faith Frontier

**Faith Frontier** is a faith-guided public trust and automation-enabled platform designed to support
ethical civic oversight, transparent case documentation, and — increasingly — stewardship-based
property and community initiatives.

This repository powers **faithfrontier.org** and its supporting systems, combining:

- governed public-interest records,
- protected ecclesiastical content,
- and compliant automation used for analysis, sourcing, and coordination.

Faith Frontier is intentionally structured to earn trust across **courts, communities, collaborators,
and future partners** by making decisions explainable, auditable, and mission-anchored.

---

## Mission & Scope

- Maintain transparent public-interest case records.
- Publish essays and civic commentary rooted in theology and ethics.
- Provide carefully governed automation for intake, verification, and analysis workflows.

---

## Platform & Automation Direction

Faith Frontier is evolving from a static publication site into a governed, automation-assisted
platform that supports:

- opportunity and case sourcing
- structured analysis and scoring
- due-diligence workflows
- documentation and audit trails
- public transparency with protected internal operations

Automation is **assistive, not autonomous**:
systems propose, humans decide, and every output is logged.

This design enables Faith Frontier to responsibly expand into areas such as
property stewardship, rehabilitation coordination, and long-term leasing support,
while preserving legal, ecclesiastical, and ethical boundaries.

---

## Repository Structure

```text
_cases/              # Case summaries and metadata (Markdown)
cases/               # Normalized public-facing case folders with filings
assets/cases/        # Binary filings, exhibits, envelopes, media
_essays/             # Protected essays and narratives
_articles/, articles/ # Long-form content and features
_layouts/, _includes/ # Jekyll templates (MIT-licensed code)
assets/css/, assets/js/ # Stylesheets and scripts (MIT-licensed code)
assets/images/       # Logos, seals, diagrams (trademark governed)
scripts/             # Automation utilities (MIT-licensed code)
```

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

Faith Frontier operates under strict governance rules.
These are not optional and apply to all contributors and automation.

---

## Legal & Trust Framework

FaithFrontier content falls into two distinct categories:

1. **Source Code - Open use under the MIT License**

   Templates, CSS/JS, workflows, and automation scripts fall under [`LICENSE`](./LICENSE).

2. **Creative, legal, and theological content - Restricted use**

   Essays, metadata, branding, and case narratives are protected under [`CONTENT_LICENSE.md`](./CONTENT_LICENSE.md), [`TRADEMARK_NOTICE.md`](./TRADEMARK_NOTICE.md), and [`DISCLAIMER.md`](./DISCLAIMER.md).

### Required Legal References

- [`LICENSE`](./LICENSE): MIT license for code only.
- [`CONTENT_LICENSE.md`](./CONTENT_LICENSE.md): Ecclesiastical license for all non-code works.
- [`TRADEMARK_NOTICE.md`](./TRADEMARK_NOTICE.md): Protection for FaithFrontier marks, logos, seals, and visual theology.
- [`DISCLAIMER.md`](./DISCLAIMER.md): Reliance, liability, and public-trust usage boundaries.

Every contribution must preserve these boundaries. Do **not** treat essays, case records, metadata, or imagery as open-source material; obtain written approval before republishing any protected work.

---

## Directory-Level Enforcement

- `_cases/`, `_articles/`, `_essays/`, `_manifesto/`, `_pages/`, `_posts/`, `_trust/`: Markdown narratives governed by `CONTENT_LICENSE.md`.
- `cases/`, `assets/cases/`: Filings and exhibits. Public-record PDFs remain public domain, but FaithFrontier's summaries and organization remain protected.
- `assets/images/`: Logos and artwork subject to `TRADEMARK_NOTICE.md`.
- `_layouts/`, `_includes/`, `assets/css/`, `assets/js/`, `scripts/`, workflows: MIT-licensed code covered by `LICENSE`.

When adding new material, identify whether it is code or content, apply the appropriate license, and reference the governing document where necessary.

---

## AI-Assisted Analysis

Optional tooling in `scripts/` leverages OpenAI APIs. Configure credentials via `.github/SETUP-OPENAI.md` and review `QUICKSTART-GENERATE-ANALYSIS.md` plus `ANALYSIS-SYSTEM.md` before running any automation. Outputs remain subject to the disclaimer and content-license rules.

---

## Disclaimer

Nothing in this repository constitutes legal advice. Review [`DISCLAIMER.md`](./DISCLAIMER.md) for the full statement before relying on any analysis or narrative.

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

AI tools must follow those documents and respect all governance and licensing boundaries.
Short, honest answer first — then the **best possible workaround that actually works today**:

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

Paste this in:

```markdown
# FaithFrontier Copilot Agent Instructions

You are acting as a long-running project agent for FaithFrontier.

## Mission
Advance FaithFrontier as a lawful, ethical, stewardship-first sourcing and real-estate platform, aligned with:
- Faith Frontier Ecclesiastical Trust (mission & governance)
- Tillerstead LLC (commercial construction/maintenance only)

## Core Priorities
- New Jersey focus: Atlantic, Cape May, Ocean counties
- Future Mercer County (Trenton) presence
- Compliance-first architecture
- No scraping or ToS violations
- Clear separation of church and LLC

## When generating code:
- Prefer static-first + automation
- Document decisions clearly
- Leave TODOs where licensing or legal approval is required
- Never invent proprietary APIs or data

## Ongoing Objectives
- Improve sourcing-agent tooling
- Expand market-trend ingestion
- Enhance contract/property scoring
- Strengthen CI/CD and automation
- Keep documentation aligned with mission

Treat this file as authoritative context.
```

👉 **This is how Copilot “remembers” your intentions.**

---

## ⚙️ STEP 2 — ONE COMMAND TO BOOTSTRAP EVERYTHING

From your terminal:

```bash
git clone https://github.com/XTX33/FaithFrontier.git
cd FaithFrontier
code .
```

Then, **in VS Code Copilot Chat**, run this **exact command prompt**:

```text
Read .github/copilot/AGENT_INSTRUCTIONS.md.
Act as a project agent.
Generate everything required to satisfy the setup workflow described in this repository:
- setup_faithfrontier.sh
- Dockerfile and docker-compose.yml
- GitHub Actions CI
- market-trend ingestion module
- contract-matching module
- README updates
Continue generating files and improvements until the repository is production-ready.
When uncertain, leave TODOs instead of guessing.
```

This is as close as Copilot gets to “agent mode”.

---

## 🔁 STEP 3 — KEEP COPILOT WORKING CONTINUOUSLY

Copilot continues when you **anchor it to artifacts**:

### Option A — Comment-Driven Continuation

At the top of any file, add:

```js
// COPILOT: continue improving this module per AGENT_INSTRUCTIONS.md
```

Copilot will keep extending that file in scope.

---

### Option B — Task List Control (Very Powerful)

Create:

```bash
code TASKS.md
```

```markdown
# FaithFrontier Agent Tasks

- [ ] Create setup_faithfrontier.sh
- [ ] Add market trend ingestion (RSS + summarizer)
- [ ] Add contract/property scoring
- [ ] Add NJ zoning awareness hooks
- [ ] Improve README stewardship narrative
- [ ] Add CI automation

COPILOT: Work through these tasks sequentially.
```

Copilot will naturally follow unchecked tasks when prompted.

---

## 🧩 STEP 4 — BACKGROUND “AUTOMATION” (REAL, NOT AI MAGIC)

For actual background work, use **GitHub Actions**, not Copilot.

Example trigger:

```yaml
on:
  schedule:
    - cron: "0 2 * * *"
```

This runs:

- market trend ingestion
- scoring updates
- report generation

👉 Copilot **writes the automation**
👉 GitHub Actions **executes it continuously**

That’s the correct separation.

---
