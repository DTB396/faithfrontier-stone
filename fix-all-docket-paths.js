#!/usr/bin/env node

/**
 * Fix All Docket PDF Paths
 * Replaces /assets/cases/ with /cases/ in all docket YAML files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docketDir = path.join(__dirname, '_data', 'docket');

console.log('\n╔═══════════════════════════════════════════════════════════╗');
console.log('║          FIX ALL DOCKET PDF PATHS                    ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

// Get all YAML files
const files = fs.readdirSync(docketDir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));

console.log(`Found ${files.length} docket files\n`);

let fixedCount = 0;
let alreadyCorrect = 0;
let errorCount = 0;

files.forEach(file => {
    const filePath = path.join(docketDir, file);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Check if it needs fixing
        if (content.includes('/assets/cases/')) {
            // Replace /assets/cases/ with /cases/
            content = content.replace(/\/assets\/cases\//g, '/cases/');
            
            // Write back
            fs.writeFileSync(filePath, content, 'utf8');
            
            console.log(`✓ FIXED: ${file}`);
            fixedCount++;
        } else if (content.includes('/cases/')) {
            console.log(`  OK: ${file} (already correct)`);
            alreadyCorrect++;
        } else {
            console.log(`  SKIP: ${file} (no file paths found)`);
        }
    } catch (error) {
        console.error(`✗ ERROR: ${file} - ${error.message}`);
        errorCount++;
    }
});

console.log('\n' + '═'.repeat(60));
console.log('SUMMARY');
console.log('═'.repeat(60));
console.log(`Fixed:           ${fixedCount}`);
console.log(`Already Correct: ${alreadyCorrect}`);
console.log(`Errors:          ${errorCount}`);
console.log(`Total:           ${files.length}`);
console.log('═'.repeat(60) + '\n');

if (fixedCount > 0) {
    console.log('✓ Changes made. Run git status to review.\n');
} else {
    console.log('No changes needed.\n');
}
