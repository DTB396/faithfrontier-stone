---
layout: default
title: "Holistic Independence & Stewardship Guide"
description: "A collaborative, compliance-forward guide to reducing preventable dependency by strengthening daily foundations—food, plants, movement, sleep, and informed consent—organized by USDA plant hardiness zones."
audience: "Public"
status: "Living document"
permalink: /health/holistic-independence/
show_breadcrumbs: true
hide_hero: true

page_includes:
  - holistic-data.html

page_js:
  - /assets/js/holistic-filter.js
---

<section class="section-block">
  <div class="container">
    <p class="section-eyebrow">Stewardship • Food-first • Informed consent</p>
    <h1 class="section-heading">Holistic Independence & Stewardship Guide</h1>
    <p class="section-lead">
      A practical reference for families and communities who want to lower baseline inflammation, stress, and preventable pain—
      while collaborating safely with licensed clinicians.
    </p>

    <blockquote>
      <p><em>“Jesus entered the temple and overturned the tables of the money changers.”</em></p>
      <p class="muted">
        This guide challenges dependency-by-default and encourages responsibility, discernment, and stewardship.
        It does not reject legitimate medical care.
      </p>
    </blockquote>
  </div>
</section>

<section class="section-block">
  <div class="container">

    <h2 class="h3">Read first</h2>

    <div class="callout">
      <ul>
        <li><strong>No medical advice.</strong> Educational and collaborative only.</li>
        <li><strong>No “stop your meds” messaging.</strong> Medication changes must be made with a licensed clinician.</li>
        <li><strong>Safety first.</strong> If symptoms are severe, sudden, or worsening, seek urgent medical care.</li>
        <li><strong>Verify locally.</strong> Zones and frost windows are planning aids; microclimates vary by neighborhood and elevation.</li>
      </ul>
    </div>

    <p class="muted">
      Faith Frontier does not diagnose, treat, or cure disease. Individuals assume responsibility for personal decisions and should
      coordinate care with qualified professionals.
    </p>

  </div>
</section>

<section class="section-block">
  <div class="container">
    <h2 class="h3">Interactive: Zone → Plants → Conditions</h2>
    <p class="muted">
      Pick your USDA plant hardiness zone (most common household system). Frost windows shown are approximate planning ranges.
    </p>

    <div class="holistic-controls">
      <label class="control">
        <span>USDA Zone</span>
        <select id="zoneSelect">
          <option value="">Choose zone…</option>
          {% for z in (site.data.holistic_plants.zones.min..site.data.holistic_plants.zones.max) %}
          <option value="{{ z }}">{{ z }}</option>
          {% endfor %}
        </select>
      </label>

      <label class="control">
        <span>State (optional)</span>
        <select id="stateSelect">
          <option value="">Pick a state…</option>
          <!-- Add state options progressively (each may include data-zone as a convenience hint). -->
          <option value="FL" data-zone="9">Florida (example)</option>
          <option value="NJ" data-zone="7">New Jersey (example)</option>
        </select>
      </label>

      <label class="control">
        <span>Search</span>
        <input id="searchInput" type="search" placeholder="turmeric, tea, sleep, inflammation…" />
      </label>
    </div>

    <div id="conditionChips" class="holistic-conditions"></div>

    <div class="holistic-layout">
      <div class="holistic-map">
        <h3 class="h4">U.S. Map (optional)</h3>
        <p class="muted">
          If your SVG has state paths tagged with <code>data-state="NJ"</code> (and optional <code>data-zone</code>),
          you can click states to auto-select a zone.
        </p>

        <div class="map-shell" id="usMapShell">
          <!-- If you embed via <object>, JS will wire it automatically. -->
          <object id="usMapObj" type="image/svg+xml" data="{{ '/assets/svg/us-states.svg' | relative_url }}"></object>
        </div>

        <div id="mapTooltip" class="map-tooltip" hidden></div>
      </div>

      <div class="holistic-results">
        <div id="resultsMeta" class="results-meta"></div>
        <div id="resultsGrid" class="results-grid"></div>
      </div>
    </div>

  </div>
</section>

<section class="section-block">
  <div class="container">
    <h2 class="h3">Practical foundations</h2>

    <h3 class="h4">Core principle</h3>
    <p>
      Inflammation, pain, and nervous-system load are influenced throughout the day by food, movement, posture, sleep, stress,
      and environment. Medication can be appropriate and sometimes essential—this guide focuses on strengthening daily inputs.
    </p>

    <h3 class="h4">Florida-friendly starter set (adaptable by zone)</h3>
    <ul>
      <li><strong>Turmeric</strong> + black pepper + dietary fat (food/tea)</li>
      <li><strong>Ginger</strong> (tea + cooking)</li>
      <li><strong>Tulsi</strong> (gentle tea)</li>
      <li><strong>Rosemary</strong> (food + infused oil for massage)</li>
      <li><strong>Leafy greens</strong>, <strong>sweet potatoes</strong>, <strong>okra</strong>, <strong>peppers</strong>, <strong>cooked tomatoes</strong></li>
    </ul>

    <h3 class="h4">Oil infusion (beginner-safe)</h3>
    <ol>
      <li>Chop rosemary and/or ginger.</li>
      <li>Cover in olive or coconut oil.</li>
      <li>Infuse 2–4 weeks (or warm gently on very low heat).</li>
      <li>Strain and label with date.</li>
    </ol>
    <p class="muted">
      Essential oils are concentrated and can irritate skin—avoid undiluted use. Food + tea + gentle topical oils are a safer first step.
    </p>

    <h3 class="h4">Caution list</h3>
    <ul>
      <li><strong>St. John’s Wort</strong>: broad medication interactions.</li>
      <li><strong>Kava</strong>: potential liver risk.</li>
      <li>High-dose extracts: avoid early; start low and coordinate with a clinician.</li>
    </ul>

  </div>
</section>

<section class="section-block">
  <div class="container">
    <h2 class="h3">Expansion roadmap</h2>

    <ul>
      <li>State tooltips: zone hint + approximate frost window + featured plants</li>
      <li>Condition subguides: pain/nerve, sleep, stress, inflammation, digestion</li>
      <li>Printable regional garden plans</li>
      <li>Clinician appendix: collaboration workflow, contraindication checklist, documentation templates</li>
    </ul>

    <p>
      This guide is a starting point —
      <strong>a table overturned against exploitation, while honoring the sanctity of the temple itself.</strong>
    </p>

    <p class="muted">Living document. Contributions welcome, with safety and sourcing standards.</p>
  </div>
</section>
