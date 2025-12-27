---
layout: default
title: "Faith Frontier"
hide_hero: true
show_breadcrumbs: false
description: "Faith Frontier Ecclesiastical Trust is a faith-rooted stewardship trust in New Jersey focused on transparent recordkeeping, civic literacy, and lawful community restoration."
stylesheet: /assets/css/home.css

hero_eyebrow: "Faith Frontier Ecclesiastical Trust"
hero_eyebrow_icon: true
hero_title: "Faith-informed transparency for New Jersey neighbors"
hero_summary: "A Christian-informed stewardship trust that publishes public records, teaches civic literacy, and supports lawful property initiatives with humility, due process, and accountability."
hero_primary_url: "/stewardship/"
hero_primary_label: "Begin the Stewardship Pathway"
hero_secondary_url: "/opra/"
hero_secondary_label: "OPRA Records"

hero_highlights:
  - label: "Due Process & Clarity"
    text: "Plain-language documentation helps residents understand legal procedures, seek counsel, and rely on lawful processes with dignity."
  - label: "Lawful Stewardship"
    text: "Property initiatives respect zoning, licensing, and tax compliance—pursuing housing solutions within legal boundaries."
  - label: "Transparent Accountability"
    text: "Every action is documented openly, inviting oversight and correction while honoring both faith principles and civic obligations."
---

<!-- markdownlint-disable MD033 -->

{% include premium-hero.html %}

<section class="home-overview">
  <!-- Center-aligned brand -->
  <a
    class="premium-brand site-logo js-site-logo"
    href="{{ '/' | relative_url }}"
    aria-label="Faith Frontier Ecclesiastical Trust home"
  >
    <div class="premium-brand__logo">
      <img
        src="{{ '/assets/img/faithfrontier-mark.svg' | relative_url }}"
        alt=""
        width="48"
        height="48"
        class="premium-brand__mark"
        aria-hidden="true"
      />
      <span class="premium-brand__wordmark">
        {% include logo-faithfrontier-header.svg %}
      </span>
    </div>
  </a>

  <div class="cta-row">
    <a class="btn btn-primary" href="/stewardship/">Explore the pathway</a>
    <a class="btn btn-ghost" href="/programs/emergency-housing/">Emergency housing</a>
    <a class="btn btn-ghost" href="/manifesto/">Read the manifesto</a>
  </div>

  <div class="home-cards">
    <article class="home-card">
      <h3 class="h5">Start with public records</h3>
      <p class="small">
        Browse OPRA administrative records and timelines, including links to public tracking where available.
      </p>
      <a class="btn btn-ghost btn--sm" href="/opra/">Open OPRA index →</a>
    </article>

    <article class="home-card">
      <h3 class="h5">Navigate cases and filings</h3>
      <p class="small">
        A structured case library for record navigation. Items are indexed for clarity and do not substitute for filed
        pleadings.
      </p>
      <a class="btn btn-ghost btn--sm" href="/cases/">Browse cases →</a>
    </article>

    <article class="home-card">
      <h3 class="h5">Learn the process</h3>
      <p class="small">
        Civic literacy resources: terminology, timelines, and practical checklists designed for real-world use.
      </p>
      <a class="btn btn-ghost btn--sm" href="/stewardship-resources/">Stewardship resources →</a>
    </article>
  </div>

  <hr />

  <div class="home-boundaries">
    <p class="section-eyebrow">Boundaries</p>
    <h3 class="section-heading h4">What this site is—and is not</h3>
    <ul class="bullets">
      <li>
        <strong>Yes:</strong> transparent documentation, public records indexing, and practical education.
      </li>
      <li>
        <strong>Yes:</strong> lawful stewardship initiatives pursued with permits, inspections, and compliance.
      </li>
      <li>
        <strong>No:</strong> legal representation, legal advice, or instructions to evade oversight.
      </li>
      <li>
        <strong>No:</strong> unverified claims presented as fact; corrections are logged when needed.
      </li>
    </ul>
  </div>

  <hr />

  {% include featured-essays.html %}

  <div class="cta-row cta-row--split">
    <a class="btn btn-primary" href="/contact/">Contact / record access</a>
    <a class="btn btn-ghost" href="/about/">About Faith Frontier</a>
  </div>
</section>
