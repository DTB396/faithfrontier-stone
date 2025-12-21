const fs = require('fs');
const path = require('path');

// Find all files recursively
function findFiles(dir, ext) {
  const results = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
      results.push(...findFiles(fullPath, ext));
    } else if (file.isFile() && file.name.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

// Extract CSS classes from CSS files
function extractCSSClasses(cssContent) {
  const classes = new Set();
  const classRegex = /\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g;
  let match;
  while ((match = classRegex.exec(cssContent)) !== null) {
    classes.add(match[1]);
  }
  return classes;
}

// Extract CSS variables from CSS files
function extractCSSVariables(cssContent) {
  const variables = new Set();
  const varRegex = /--([a-zA-Z0-9_-]+):/g;
  let match;
  while ((match = varRegex.exec(cssContent)) !== null) {
    variables.add('--' + match[1]);
  }
  return variables;
}

// Extract used classes from HTML/MD files
function extractUsedClasses(htmlContent) {
  const classes = new Set();
  const classRegex = /class=["']([^"']+)["']/g;
  let match;
  while ((match = classRegex.exec(htmlContent)) !== null) {
    match[1].split(/\s+/).forEach(cls => {
      if (cls.trim()) classes.add(cls.trim());
    });
  }
  return classes;
}

// Extract used variables from CSS/HTML files
function extractUsedVariables(content) {
  const variables = new Set();
  const varRegex = /var\((--[a-zA-Z0-9_-]+)\)/g;
  let match;
  while ((match = varRegex.exec(content)) !== null) {
    variables.add(match[1]);
  }
  return variables;
}

console.log('🔍 Starting CSS Audit...\n');

// Find all files
const cssFiles = findFiles('.', '.css');
const htmlFiles = [...findFiles('.', '.html'), ...findFiles('.', '.md')];

console.log(`📁 Found ${cssFiles.length} CSS files`);
console.log(`📁 Found ${htmlFiles.length} HTML/MD files\n`);

// Extract all defined classes and variables
const definedClasses = new Set();
const definedVariables = new Set();
const classLocations = new Map();
const varLocations = new Map();

cssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const classes = extractCSSClasses(content);
  const variables = extractCSSVariables(content);
  
  classes.forEach(cls => {
    definedClasses.add(cls);
    if (!classLocations.has(cls)) classLocations.set(cls, []);
    classLocations.get(cls).push(file);
  });
  
  variables.forEach(v => {
    definedVariables.add(v);
    if (!varLocations.has(v)) varLocations.set(v, []);
    varLocations.get(v).push(file);
  });
});

// Extract all used classes and variables
const usedClasses = new Set();
const usedVariables = new Set();

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const classes = extractUsedClasses(content);
  const variables = extractUsedVariables(content);
  
  classes.forEach(cls => usedClasses.add(cls));
  variables.forEach(v => usedVariables.add(v));
});

// Check CSS files for var() usage too
cssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const variables = extractUsedVariables(content);
  variables.forEach(v => usedVariables.add(v));
});

// Find unused classes
const unusedClasses = [...definedClasses].filter(cls => !usedClasses.has(cls));
const unusedVariables = [...definedVariables].filter(v => !usedVariables.has(v));

console.log('📊 AUDIT RESULTS\n');
console.log(`✅ Defined Classes: ${definedClasses.size}`);
console.log(`✅ Used Classes: ${usedClasses.size}`);
console.log(`❌ Unused Classes: ${unusedClasses.length}\n`);

console.log(`✅ Defined Variables: ${definedVariables.size}`);
console.log(`✅ Used Variables: ${usedVariables.size}`);
console.log(`❌ Unused Variables: ${unusedVariables.length}\n`);

// Report unused classes
if (unusedClasses.length > 0) {
  console.log('🗑️  UNUSED CLASSES (first 50):');
  unusedClasses.slice(0, 50).forEach(cls => {
    const locations = classLocations.get(cls);
    console.log(`  .${cls} - in ${locations.length} file(s)`);
  });
  console.log('');
}

// Report unused variables
if (unusedVariables.length > 0) {
  console.log('🗑️  UNUSED VARIABLES (first 50):');
  unusedVariables.slice(0, 50).forEach(v => {
    const locations = varLocations.get(v);
    console.log(`  ${v} - in ${locations.length} file(s)`);
  });
  console.log('');
}

// Save detailed report
const report = {
  summary: {
    definedClasses: definedClasses.size,
    usedClasses: usedClasses.size,
    unusedClasses: unusedClasses.length,
    definedVariables: definedVariables.size,
    usedVariables: usedVariables.size,
    unusedVariables: unusedVariables.length
  },
  unusedClasses: unusedClasses.map(cls => ({
    name: cls,
    locations: classLocations.get(cls)
  })),
  unusedVariables: unusedVariables.map(v => ({
    name: v,
    locations: varLocations.get(v)
  }))
};

fs.writeFileSync('css-audit-report.json', JSON.stringify(report, null, 2));
console.log('💾 Detailed report saved to css-audit-report.json');
