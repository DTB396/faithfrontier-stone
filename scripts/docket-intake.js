// Minimal, Pages-safe intake: rename/move PDFs, update docket YAML, stage changes
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
const caseFiles = fs.existsSync('_cases') ? fs.readdirSync('_cases').filter(f=>f.endsWith('.md')) : [];

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
    const walk = d => {
      const items = fs.readdirSync(d);
      items.forEach(it=>{
        const p = path.join(d,it);
        const st = fs.statSync(p);
        if (st.isDirectory()) return walk(p);
        if (p.toLowerCase().endsWith('.pdf')) out.push({p, st});
      });
    };
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
  if (!items.length) { 
    console.log('No PDFs to intake.'); 
    return; 
  }

  const changes = [];
  for (const {p, st} of items) {
    const base = path.basename(p);
    // Try to match by known tokens in filename
    const token = (base.match(/([A-Z]{1,3}-[A-Z]-\d{6,}-\d{2})/) || base.match(/A-\d{6}-\d{2}/) || [])[0];
    let slug = token ? slugFromDocket(token) : null;

    // If path already under assets/cases/<slug>/..., respect it
    const mUnder = p.match(/assets\/cases\/([a-z0-9-]+)\//i);
    if (mUnder) slug = mUnder[1];

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
      ensureDir(DOCKET_DIR);
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
