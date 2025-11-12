# 1) Custom Agent (Copilot) — auto-file, rename, and docket

Save as: `.github/copilot-instructions/agent-faithfrontier-docket.yml`

```yaml
---
name: FaithFrontier Docket Intake Agent
description: >
  Normalizes uploaded PDFs into correct case folders, renames to convention,
  updates _data/docket/<slug>.yml, and opens PRs. If ambiguous, parks items in
  an intake PR with a checklist.

---
# Agent Mission
## Intake pipeline (idempotent)
1) Discover new PDFs in:
   - `_inbox/**.pdf`
   - `assets/uploads/**.pdf`
   - `assets/cases/**` files not indexed in docket data
2) Determine case `slug`:
   - If file path already under `assets/cases/<slug>/`, use that slug
   - Else try to match by `primary_docket` or any `dockets[]` in `_cases/*.md`
     using a canonical map `_data/cases-map.yml` (create/maintain it)
   - Else infer from filename tokens (e.g., A-000313-25, ATL-L-002794-25)
3) Rename using canonical pattern:
   - `{DATE}_{TYPE}_{SHORT}.pdf`  e.g., `2025-11-12_Filing_Written-Appearance-ADA-MTD.pdf`
   - DATE pulled from filename or PDF metadata; fallback to commit date
4) Move to: `assets/cases/<slug>/docket/`
5) Update docket data:
   - `_data/docket/<slug>.yml` append:
     - `id:` `<DATE>-<kebab(short)>`
     - `date:` `YYYY-MM-DD`
     - `type:` `Filing|Order|Notice|Brief|Exhibit|Other` (guess from keywords; default Filing)
     - `title:` human title from filename (spaces)
     - `file:` absolute path to the moved PDF
     - `notes:` (optional) inferred source (e.g., “NJMCDirect upload/email”)
6) Open minimal PR per case:
   - Title: `chore(docket): intake <n> PDFs for <slug>`
   - Body: table of renames, moved paths, new docket entries
   - If slug/DATE/type uncertain: mark entries with `TODO:` in PR body

## Commands
- "Intake PDFs" → run full pipeline (discover→rename→move→update docket→PR)
- "Reindex docket for <slug>" → rescan assets/cases/<slug>/ and reconcile with docket file
- "List orphans" → report PDFs not referenced in any docket
- "Map docket A-000313-25 to slug street-crossing-pcr-appeal" → update `_data/cases-map.yml`

## Guardrails
- Never delete; only move/copy and open PRs
- Touch only: `_data/docket/*.yml`, `_data/cases-map.yml`, `assets/cases/**/docket/*.pdf`, `reports/**`
- No layout/CSS/branding changes
- Keep commits small and reversible

## Success Criteria
- No PDFs left in `_inbox` after intake
- Each moved PDF appears on its case page within the rendered Docket
- Build/CI pass with zero broken links
```

# 2) Case mapping (for reliable routing)

Save as: `_data/cases-map.yml`

```yaml
# docket_number_or_token : slug
A-000313-25: street-crossing-pcr-appeal
ATL-L-002794-25: atl-l-002794-25
ATL-L-002869-25: atl-l-002869-25
# add as you go; agent will append new mappings in PRs
```

# 3) GitHub Action — automatic intake/PR on every push

This watches `_inbox/` and `assets/uploads/`, runs a small Node script to rename/move, edits docket YAML, and opens a PR.
Save as: `.github/workflows/docket-intake.yml`

```yaml
name: Docket Intake
on:
  push:
    paths:
      - "_inbox/**"
      - "assets/uploads/**"
      - "_data/cases-map.yml"
  workflow_dispatch: {}

permissions:
  contents: write
  pull-requests: write

jobs:
  intake:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: node scripts/docket-intake.js
      - name: Create PR if changes
        uses: peter-evans/create-pull-request@v6
        with:
          commit-message: "chore(docket): normalize PDFs and update dockets"
          title: "chore(docket): intake PDFs"
          body: "Automated docket intake. Please review notes/TODOs."
          branch: "chore/docket-intake"
          delete-branch: true
```

# 4) The intake script (rename, move, index)

Save as: `scripts/docket-intake.js`

```js
// Minimal, Pages-safe intake: rename/move PDFs, update docket YAML, stage changes
// npm i js-yaml
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const INBOX = ['_inbox', 'assets/uploads'];
const CASES_DIR = 'assets/cases';
const DOCKET_DIR = '_data/docket';
const MAP_FILE = '_data/cases-map.yml';

const readYml = p => fs.existsSync(p) ? yaml.load(fs.readFileSync(p, 'utf8')) : undefined;
const writeYml = (p, obj) => fs.writeFileSync(p, yaml.dump(obj, { lineWidth: 1000 }));

const kebab = s => (s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const ensureDir = p => fs.mkdirSync(p, { recursive: true });

const casesMap = readYml(MAP_FILE) || {};
const caseFiles = fs.readdirSync('_cases').filter(f=>f.endsWith('.md'));

// Build reverse index: token->slug from case front matter + map file
const slugFromDocket = token => {
  if (casesMap[token]) return casesMap[token];
  // Try filename inference (last segment of permalink or filename)
  for (const f of caseFiles) {
    const txt = fs.readFileSync(path.join('_cases', f), 'utf8');
    const fm = (txt.match(/^---\n([\s\S]*?)\n---/)||[])[1]||'';
    const m = fm.match(/dockets:\s*\[([^\]]+)\]/) || fm.match(/dockets:\s*-\s*(.+)/);
    const slug = (fm.match(/permalink:\s*\/cases\/([a-z0-9-]+)\//i)||[])[1] ||
                 f.replace(/\.md$/,'');
    if (m && m[0].includes(token)) return slug;
  }
  return null;
};

const guessType = name => {
  const n = name.toLowerCase();
  if (n.includes('order')) return 'Order';
  if (n.includes('notice')) return 'Notice';
  if (n.includes('brief')) return 'Brief';
  if (n.includes('exhibit')) return 'Exhibit';
  if (n.includes('motion')) return 'Motion';
  return 'Filing';
};

const guessDate = (name, statsMtime) => {
  const m = name.match(/(20\d{2})[-_\.]?(0[1-9]|1[0-2])[-_\.]?(0[1-9]|[12]\d|3[01])/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  const d = new Date(statsMtime);
  return d.toISOString().slice(0,10);
};

const discoverPdfs = () => {
  const out = [];
  INBOX.forEach(dir=>{
    if (!fs.existsSync(dir)) return;
    const walk = d => fs.readdirSync(d).forEach(it=>{
      const p = path.join(d,it);
      const st = fs.statSync(p);
      if (st.isDirectory()) return walk(p);
      if (p.toLowerCase().endsWith('.pdf')) out.push({p, st});
    });
    walk(dir);
  });
  return out;
};

const loadDocket = slug => {
  const p = path.join(DOCKET_DIR, `${slug}.yml`);
  return { p, list: readYml(p) || [] };
};

const main = () => {
  const items = discoverPdfs();
  if (!items.length) { console.log('No PDFs to intake.'); return; }

  const changes = [];
  for (const {p, st} of items) {
    const base = path.basename(p);
    // Try to match by known tokens in filename
    const token = (base.match(/([A-Z]{1,3}-[A-Z]-\d{6,}-\d{2})/) || base.match(/A-\d{6}-\d{2}/) || [])[0];
    let slug = token ? slugFromDocket(token) : null;

    // If path already under assets/cases/<slug>/..., respect it
    const mUnder = p.match(/assets\/cases\/([a-z0-9-]+)\//i);
    if (mUnder) slug = mUnder[1];

    // Fallback: try a simple kebab of the parent dir name if it's inside assets/cases/*
    if (!slug && mUnder) slug = mUnder[1];

    // If still unknown, park under 'unassigned'
    slug = slug || 'unassigned';

    const date = guessDate(base, st.mtimeMs);
    const type = guessType(base);
    const short = base.replace(/\.pdf$/i,'').replace(/[_\.]+/g,'-');
    const newName = `${date}_${type}_${short}.pdf`.replace(/-+/g,'-');

    const destDir = path.join(CASES_DIR, slug, 'docket');
    ensureDir(destDir);
    const destPath = path.join(destDir, newName);

    fs.renameSync(p, destPath);

    const { p: docketFile, list } = loadDocket(slug);
    const id = `${date}-${kebab(short)}`.slice(0,64);
    const fileUrl = `/${destPath.replace(/\\/g,'/')}`;

    // De-dup if file already indexed
    const exists = list.find(e => e.file === fileUrl);
    if (!exists) {
      list.push({
        id, date,
        type, title: short.replace(/-/g,' ').trim(),
        file: fileUrl,
        notes: p.includes('_inbox') ? 'Intake: moved from _inbox' : 'Intake: assets/uploads'
      });
      writeYml(docketFile, list.sort((a,b)=> (a.date<b.date?1:-1)));
    }

    changes.push({ from: p, to: destPath, docketFile });
  }

  // Write a simple report
  ensureDir('reports');
  fs.writeFileSync('reports/docket-intake.json', JSON.stringify(changes, null, 2));
  console.log(`Intake complete: ${changes.length} files processed.`);
};

main();
```

# 5) How you’ll use it (simple)

* **Drop PDFs** into `_inbox/` (easiest) or `assets/uploads/`.
* Push/commit. The **Action** runs, renames, moves, updates the docket YAML, and opens a **PR**.
* If it can’t confidently match a case, it files under `unassigned` and flags TODOs in the PR—then you add a mapping line in `_data/cases-map.yml` and re-run (“Re-run job” in Actions).

# 6) Optional niceties

* Add a repo label `intake` for these PRs.
* Add branch protection so you always review before merge.
* If you want stricter names, change `guessType()` and the filename pattern once and you’re done.
