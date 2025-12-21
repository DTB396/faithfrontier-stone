---
layout: default
title: "Case Records & Legal Archive"
permalink: /cases/
description: "Complete archive of Faith Frontier's legal proceedings—documenting competence, transparency, and constitutional literacy through public court records."
stylesheet: /assets/css/cases-index.css
---

{%- comment -%}
==============================================================================
FAITH FRONTIER CASE RECORDS INDEX
==============================================================================

This page displays the complete legal archive with:
- Hero section with case statistics
- Filter controls for status, court, and search
- Responsive card grid of all published cases
- Smart resource display (notes/evidence only when present)

Styling: /assets/css/cases-index.css
Case Layout: _layouts/case-enhanced.html
Resources Include: _includes/case-resources.html
{%- endcomment -%}

<!-- ==================== HERO SECTION ==================== -->
<div class="cases-hero">
  <div class="container" style="max-width: 1100px; margin: 0 auto;">
    <h1>Case Records & Legal Archive</h1>
    <p class="cases-hero-lead">
      Every filing. Every order. Every motion. Faith Frontier's complete legal record demonstrates <strong>procedural competence</strong>, 
      <strong>constitutional literacy</strong>, and <strong>transparent accountability</strong>—the foundation of trust for government partnerships and community stewardship.
    </p>
    
    <!-- Case Statistics -->
    <div class="cases-stats">
      {% assign total_cases = site.cases | where_exp: "case", "case.published != false" | size %}
      {% assign active_cases = site.cases | where: "status", "active" | where_exp: "case", "case.published != false" | size %}
      {% assign pending_cases = site.cases | where: "status", "pending" | where_exp: "case", "case.published != false" | size %}
      {% assign closed_cases = site.cases | where: "status", "closed" | where_exp: "case", "case.published != false" | size %}
      
      <div class="case-stat">
        <span class="case-stat-number">{{ total_cases }}</span>
        <span class="case-stat-label">Total Cases</span>
      </div>
      <div class="case-stat">
        <span class="case-stat-number">{{ active_cases }}</span>
        <span class="case-stat-label">Active Litigation</span>
      </div>
      <div class="case-stat">
        <span class="case-stat-number">{{ pending_cases }}</span>
        <span class="case-stat-label">Pending Decisions</span>
      </div>
      <div class="case-stat">
        <span class="case-stat-number">100%</span>
        <span class="case-stat-label">Transparency</span>
      </div>
    </div>
    
    <!-- Call-to-Action Buttons -->
    <div class="cases-actions">
      <a href="/stewardship/" class="btn-cases btn-primary">Join the Stewardship Journey</a>
      <a href="/government-partnerships/" class="btn-cases btn-secondary">Municipal Partnerships</a>
      <a href="#active-cases" class="btn-cases btn-secondary">Active Case Digest</a>
    </div>
  </div>
</div>

<!-- ==================== MAIN CONTENT ==================== -->
<div class="container" style="max-width: 1100px; margin: 0 auto; padding: 0 1.5rem;">
  
  <!-- ==================== WHY THIS MATTERS ==================== -->
  <section style="margin-bottom: 3rem;">
    <h2 style="font-size: 1.75rem; margin-bottom: 1.5rem; color: var(--color-text, #f9fafb);">Why This Archive Matters</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
      
      <!-- For Government Partners -->
      <div style="padding: 1.5rem; background: var(--color-surface-alt, #2a2826); border-radius: 8px; border-left: 4px solid var(--accent-brass, #d4a574);">
        <h3 style="margin-top: 0; color: var(--accent-brass, #d4a574); font-size: 1.125rem;">For Government Partners</h3>
        <p style="margin-bottom: 0; line-height: 1.6; font-size: 0.9375rem;">
          Documented track record of procedural competence, constitutional knowledge, and ability to navigate complex legal systems—essential for emergency housing contracts and reentry partnerships.
        </p>
      </div>
      
      <!-- For Community Members -->
      <div style="padding: 1.5rem; background: var(--color-surface-alt, #2a2826); border-radius: 8px; border-left: 4px solid var(--accent-brass, #d4a574);">
        <h3 style="margin-top: 0; color: var(--accent-brass, #d4a574); font-size: 1.125rem;">For Community Members</h3>
        <p style="margin-bottom: 0; line-height: 1.6; font-size: 0.9375rem;">
          Real-world proof that Faith Frontier operates with transparency, humility, and respect for due process—building trust through verifiable actions, not empty promises.
        </p>
      </div>
      
      <!-- For Legal Researchers -->
      <div style="padding: 1.5rem; background: var(--color-surface-alt, #2a2826); border-radius: 8px; border-left: 4px solid var(--accent-brass, #d4a574);">
        <h3 style="margin-top: 0; color: var(--accent-brass, #d4a574); font-size: 1.125rem;">For Legal Researchers</h3>
        <p style="margin-bottom: 0; line-height: 1.6; font-size: 0.9375rem;">
          Comprehensive docket entries, filings, and procedural history demonstrating constitutional issues, procedural challenges, and the evolution of legal strategy over time.
        </p>
      </div>
    </div>
  </section>
  
  <!-- ==================== FILTER CONTROLS ==================== -->
  <div class="case-filters" id="case-filters">
    <div class="filter-row">
      <div class="filter-group">
        <label for="filter-status">Status</label>
        <select id="filter-status" class="filter-select">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="filter-court">Court</label>
        <select id="filter-court" class="filter-select">
          <option value="">All Courts</option>
          {% assign all_courts = site.cases | where_exp: "case", "case.published != false" | map: "court" | uniq | sort %}
          {% for court in all_courts %}
            {% if court and court != "" %}
            <option value="{{ court }}">{{ court }}</option>
            {% endif %}
          {% endfor %}
        </select>
      </div>
      
      <div class="filter-group" style="flex: 2;">
        <label for="filter-search">Search</label>
        <input type="text" id="filter-search" class="filter-input" placeholder="Search by title, docket, or description...">
      </div>
    </div>
  </div>
  
  <!-- ==================== ACTIVE CASES ==================== -->
  <section id="active-cases" style="margin-bottom: 3rem;">
    <h2 style="font-size: 1.75rem; margin-bottom: 1.5rem; color: var(--color-text, #f9fafb);">Active Cases</h2>
    <div class="cases-grid" id="active-cases-grid">
      {% assign active = site.cases | where: "status", "active" | where_exp: "case", "case.published != false" | sort: "filed_date" | reverse %}
      {% if active.size > 0 %}
        {% for case in active %}
          {% include case-card.html case=case %}
        {% endfor %}
      {% else %}
        <div class="no-results">
          <div class="no-results-icon">⚖️</div>
          <h3 class="no-results-title">No Active Cases</h3>
          <p class="no-results-text">There are currently no active cases in the system.</p>
        </div>
      {% endif %}
    </div>
  </section>
  
  <!-- ==================== PENDING CASES ==================== -->
  {% assign pending = site.cases | where: "status", "pending" | where_exp: "case", "case.published != false" | sort: "filed_date" | reverse %}
  {% if pending.size > 0 %}
  <section style="margin-bottom: 3rem;">
    <h2 style="font-size: 1.75rem; margin-bottom: 1.5rem; color: var(--color-text, #f9fafb);">Pending Decisions</h2>
    <div class="cases-grid">
      {% for case in pending %}
        {% include case-card.html case=case %}
      {% endfor %}
    </div>
  </section>
  {% endif %}
  
  <!-- ==================== CLOSED CASES ==================== -->
  {% assign closed = site.cases | where: "status", "closed" | where_exp: "case", "case.published != false" | sort: "filed_date" | reverse %}
  {% if closed.size > 0 %}
  <section style="margin-bottom: 3rem;">
    <h2 style="font-size: 1.75rem; margin-bottom: 1.5rem; color: var(--color-text, #f9fafb);">Closed Cases</h2>
    <div class="cases-grid">
      {% for case in closed %}
        {% include case-card.html case=case %}
      {% endfor %}
    </div>
  </section>
  {% endif %}
  
  <!-- ==================== TRANSPARENCY STATEMENT ==================== -->
  <section style="margin: 4rem 0; padding: 2rem; background: var(--color-surface-alt, #2a2826); border-radius: 12px; border: 1px solid var(--color-border, #3a3835);">
    <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--accent-brass, #d4a574);">Our Commitment to Transparency</h2>
    <p style="line-height: 1.7; margin-bottom: 1rem; font-size: 0.9375rem;">
      Every case listed here is backed by public court records. We publish filings, dockets, and procedural history to demonstrate:
    </p>
    <ul style="line-height: 1.7; margin-bottom: 1rem; padding-left: 1.5rem;">
      <li><strong>Constitutional literacy:</strong> Understanding of due process, rights, and legal procedure</li>
      <li><strong>Procedural competence:</strong> Ability to navigate court systems and administrative processes</li>
      <li><strong>Accountability:</strong> Nothing hidden, everything verifiable through official records</li>
      <li><strong>Educational value:</strong> Real-world examples of civic engagement and legal advocacy</li>
    </ul>
    <p style="line-height: 1.7; margin-bottom: 0; font-size: 0.9375rem;">
      This archive exists to build trust through transparency and to demonstrate that Faith Frontier operates with integrity, humility, and respect for lawful processes.
    </p>
  </section>

  <!-- ==================== OPRA RECORDS INTEGRATION ==================== -->
  <section style="margin: 4rem 0; padding: 2rem; background: linear-gradient(135deg, var(--brass-alpha-05), var(--brass-alpha-02)); border-radius: 12px; border: 1px solid var(--brass-alpha-20);">
    <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--accent-brass, #d4a574);">
      📋 Supporting OPRA Administrative Records
    </h2>
    <p style="line-height: 1.7; margin-bottom: 1.5rem; font-size: 0.9375rem;">
      Many cases are supported by Open Public Records Act (OPRA) requests that document vendor relationships, 
      policy frameworks, and operational oversight. These administrative records complement litigation by establishing 
      factual foundations through official government documents.
    </p>
    
    {% assign opra_count = site.opra | size %}
    {% assign active_opra = site.opra | where: "status", "Active" | size %}
    {% assign pending_opra = site.opra | where: "status", "Awaiting Response" | size %}
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      <div style="text-align: center; padding: 1rem; background: var(--brass-alpha-10); border-radius: 8px;">
        <div style="font-size: 2rem; font-weight: bold; color: var(--accent-brass, #d4a574);">{{ opra_count }}</div>
        <div style="font-size: 0.875rem; color: var(--color-text-muted, #b0aca5);">Total OPRA Records</div>
      </div>
      <div style="text-align: center; padding: 1rem; background: var(--brass-alpha-10); border-radius: 8px;">
        <div style="font-size: 2rem; font-weight: bold; color: var(--accent-brass, #d4a574);">{{ active_opra }}</div>
        <div style="font-size: 0.875rem; color: var(--color-text-muted, #b0aca5);">Active Requests</div>
      </div>
      <div style="text-align: center; padding: 1rem; background: var(--brass-alpha-10); border-radius: 8px;">
        <div style="font-size: 2rem; font-weight: bold; color: var(--accent-brass, #d4a574);">{{ pending_opra }}</div>
        <div style="font-size: 0.875rem; color: var(--color-text-muted, #b0aca5);">Pending Responses</div>
      </div>
    </div>
    
    <div style="text-align: center;">
      <a href="/opra/" class="btn-cases btn-secondary" style="display: inline-block; padding: 0.75rem 1.5rem; background: var(--accent-brass, #d4a574); color: var(--color-bg, #1a1816); border-radius: 6px; text-decoration: none; font-weight: 600; transition: all 0.2s;">
        View All OPRA Records →
      </a>
    </div>
    
    <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--brass-alpha-20); font-size: 0.875rem; color: var(--color-text-muted, #b0aca5);">
      <strong>What are OPRA records?</strong> OPRA (Open Public Records Act) allows citizens to request government documents. 
      Faith Frontier uses OPRA to gather factual evidence about vendor contracts, policy decisions, and operational oversight—
      creating transparent documentation that supports legal strategy and public accountability.
    </div>
  </section>
  
</div>

<!-- ==================== CLIENT-SIDE FILTERING ==================== -->
<script>
(function() {
  'use strict';
  
  const filterStatus = document.getElementById('filter-status');
  const filterCourt = document.getElementById('filter-court');
  const filterSearch = document.getElementById('filter-search');
  const casesGrids = document.querySelectorAll('.cases-grid');
  
  if (!filterStatus || !filterCourt || !filterSearch) return;
  
  function applyFilters() {
    const statusValue = filterStatus.value.toLowerCase();
    const courtValue = filterCourt.value.toLowerCase();
    const searchValue = filterSearch.value.toLowerCase();
    
    casesGrids.forEach(function(grid) {
      const cards = grid.querySelectorAll('.case-card');
      let visibleCount = 0;
      
      cards.forEach(function(card) {
        const cardStatus = (card.dataset.status || '').toLowerCase();
        const cardCourt = (card.dataset.court || '').toLowerCase();
        const cardText = card.textContent.toLowerCase();
        
        const matchesStatus = !statusValue || cardStatus === statusValue;
        const matchesCourt = !courtValue || cardCourt.includes(courtValue);
        const matchesSearch = !searchValue || cardText.includes(searchValue);
        
        if (matchesStatus && matchesCourt && matchesSearch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      // Show/hide no results message
      let noResults = grid.querySelector('.no-results');
      if (visibleCount === 0 && !noResults) {
        noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = '<div class="no-results-icon">🔍</div><h3 class="no-results-title">No Cases Found</h3><p class="no-results-text">Try adjusting your filters or search terms.</p>';
        grid.appendChild(noResults);
      } else if (visibleCount > 0 && noResults) {
        noResults.remove();
      }
    });
  }
  
  filterStatus.addEventListener('change', applyFilters);
  filterCourt.addEventListener('change', applyFilters);
  filterSearch.addEventListener('input', applyFilters);
})();
</script>
