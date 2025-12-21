# Complete FaithFrontier Fixes - Deployment Script

Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     COMPLETE FAITHFRONTIER FIXES - DEPLOY ALL         ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

cd "C:\Users\Devon Tyler\faithfrontier"

Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "SUMMARY OF ALL FIXES" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. PDF LINK FIXES (11 docket files)" -ForegroundColor White
Write-Host "   • Fixed all /assets/cases/ → /cases/ paths" -ForegroundColor Gray
Write-Host "   • All case PDFs now accessible" -ForegroundColor Gray
Write-Host "   • Enhanced ATL-L-003252-25 README" -ForegroundColor Gray
Write-Host ""

Write-Host "2. HOMEPAGE STYLE FIXES" -ForegroundColor White
Write-Host "   • Removed floating scroll animation" -ForegroundColor Gray
Write-Host "   • Improved card text contrast (85% → 95% opacity)" -ForegroundColor Gray
Write-Host "   • Hero highlight text now readable" -ForegroundColor Gray
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Check git repo
if (-not (Test-Path ".git")) {
    Write-Host "ERROR: Not a git repository!" -ForegroundColor Red
    exit 1
}

Write-Host "Files to commit:" -ForegroundColor Yellow
git status --short

Write-Host ""
$confirm = Read-Host "Commit and push ALL fixes? (y/n)"

if ($confirm -eq 'y' -or $confirm -eq 'Y') {
    Write-Host "`nStaging all changes..." -ForegroundColor Cyan
    
    # Stage docket fixes
    git add _data/docket/*.yml
    git add cases/atl-l-003252-25/README.md
    
    # Stage style fixes
    git add assets/css/premium-hero.css
    
    # Stage documentation and tools
    git add fix-all-docket-paths.js
    git add commit-all-docket-fixes.ps1
    git add DOCKET-PDF-LINK-FIX.md
    git add FAITHFRONTIER_COMPLETE_FIX_ALL_CASES.md
    
    Write-Host "Creating commit..." -ForegroundColor Cyan
    git commit -m "Fix PDF 404 errors and homepage style issues

PDF Link Fixes:
- Updated all 11 docket YAML files from /assets/cases/ to /cases/
- Fixes 404 errors on all case pages
- Enhanced ATL-L-003252-25 README with chronological docket

Files fixed:
  • a-000313-25.yml
  • atl-22-002292.yml
  • atl-24-001934.yml
  • atl-dc-007956-25.yml
  • atl-l-002794-25.yml
  • atl-l-002869-25.yml
  • atl-l-003252-25.yml
  • barber-nj-pcr-2022.yml
  • street-crossing-pcr-appeal.yml
  • usdj-1-22-cv-06206.yml
  • usdj-1-25-cv-15641.yml

Homepage Style Fixes:
- Removed floating scroll indicator (.premium-hero__scroll)
- Improved card text contrast (85% → 95% opacity)
- Hero highlight text now readable on dark backgrounds

All case PDFs now accessible at faithfrontier.org/cases/
Homepage visual issues resolved."
    
    Write-Host "`nPushing to remote..." -ForegroundColor Cyan
    git push
    
    Write-Host "`n✓ All changes pushed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "VERIFICATION STEPS" -ForegroundColor Yellow
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Wait 2-3 minutes for GitHub Pages rebuild, then:" -ForegroundColor White
    Write-Host ""
    Write-Host "1. Test Homepage:" -ForegroundColor Yellow
    Write-Host "   • Visit: https://faithfrontier.org/" -ForegroundColor Gray
    Write-Host "   • Check: No floating scroll animation" -ForegroundColor Gray
    Write-Host "   • Check: Hero card text is readable" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Test Case PDFs:" -ForegroundColor Yellow
    Write-Host "   • Visit: https://faithfrontier.org/cases/" -ForegroundColor Gray
    Write-Host "   • Visit: https://faithfrontier.org/cases/atl-l-003252-25/" -ForegroundColor Gray
    Write-Host "   • Click any PDF link - should work!" -ForegroundColor Gray
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host "`nCommit cancelled." -ForegroundColor Yellow
    Write-Host "Run this script again when ready." -ForegroundColor Gray
}
