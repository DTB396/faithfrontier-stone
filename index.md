---
layout: default
title: "Faith Frontier"
hero_panel: true
hide_hero: true
show_breadcrumbs: false
description: "Faith Frontier Ecclesiastical Trust builds a faith-rooted public trust for New Jersey residents, focusing on due process, equity, and restoration."
---

<!-- markdownlint-disable MD033 -->
<style>
  :root {
    --color-surface: var(--ff-surface, #0f172a);
    --color-surface-alt: var(--ts-navy-soft, #0a1b32);
    --color-text: var(--ff-ink, #f9fafb);
    --color-muted: var(--ff-muted, #a8a29e);
    --color-highlight: var(--ff-cream, #fef3c7);
    --accent-emerald: var(--ts-emerald, #018a6a);
    --accent-emerald-light: var(--ts-emerald-light, #24b58a);
    --accent-brass: var(--ts-brass, #b88a39);
    --accent-brass-muted: var(--ts-brass-muted, #a07a32);
    /* compatibility aliases and sensible defaults */
    --accent: var(--color-text);
    --muted: var(--color-muted);
    --card-bg: var(--color-surface-alt);

    /* layout tokens (provide sensible fallbacks if not declared globally) */
    --gutter: 1.5rem;
    --max-width: 1200px;
    --container-pad: 1rem;
    --radius-base: var(--radius-md, 16px);
    --shadow-base: var(--shadow-mid, 0 16px 40px rgba(0, 0, 0, 0.35));
    --space-section: var(--space-2xl, 3rem);
  }

  html{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial;}
  *,*::before,*::after{box-sizing:inherit}
  body{margin:0;line-height:1.5;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;color:var(--accent);background:#fff}
  .container{max-width:var(--max-width);padding:0 var(--container-pad);margin:0 auto}

  /* responsive type scale */
  h1{font-size:clamp(1.6rem, 4.5vw, 3rem);line-height:1.06;margin:.35em 0}
  h2{font-size:clamp(1.25rem, 3.2vw, 2rem);margin:.4em 0}
  h3{font-size:clamp(1rem, 2.2vw, 1.125rem);margin:.35em 0}
  p{margin:.5em 0;color:var(--muted);max-width:70ch}

  /* Hero layout improvements */
  .hero-grid{display:grid;grid-template-columns:1fr minmax(260px,360px);gap:var(--gutter);align-items:start;align-content:start}
  .hero-main{min-width:0}
  .hero-side-panel{background:transparent;display:flex;flex-direction:column;gap:clamp(.5rem,1.5vw,1rem);align-items:flex-start}
  .hero-brand-visual img{max-width:100%;height:auto;display:block}
  .hero-actions{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:0.75rem}
  .hero-actions .btn{min-width:120px;padding:.6rem 1rem}

  .hero-highlights{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:clamp(.5rem,1vw,.9rem);margin-top:1rem}
  .hero-highlight{background:var(--card-bg);padding:.75rem;border-radius:8px}

  /* side stats */
  .hero-panel__stat{display:flex;flex-direction:column;gap:.15rem}
  .hero-panel__number{font-weight:700;font-size:1.25rem}

  /* general section spacing */
  section{padding:clamp(1rem,3vw,2.5rem) 0}
  .section-divider{margin:0}

  /* responsive adjustments */
  @media (max-width:900px){
    .hero-grid{grid-template-columns:1fr;}
    .hero-side-panel{order:2}
    .hero-actions .btn{flex:1}
    .hero-highlights{grid-template-columns:1fr}
  }

  /* accessibility & performance */
  img{max-width:100%;height:auto;display:block}
  @media (prefers-reduced-motion:reduce){*{animation-duration:0.001ms!important;transition-duration:0.001ms!important}}
</style>

<section class="hero hero--home hero-home--revival">
  <div class="container hero-grid">
    <div class="hero-main">
      <p class="hero-eyebrow">Faith Frontier Ecclesiastical Trust</p>
      <h1>
        Faith-informed transparency for New Jersey neighbors
      </h1>
      <p class="hero-lead">
        Faith Frontier is a Christian-informed public trust that documents public records, teaches civic literacy, and stewards property initiatives with humility and accountability. We operate within the U.S. Constitution and New Jersey law, treating faith as a guide to conscience—not as extrajudicial authority—so residents can see the record, verify facts, and engage officials with confidence.
      </p>
      <div class="hero-highlights">
        <article class="hero-highlight">
          <span class="hero-highlight__label">Due process clarity</span>
          <p>Plain-language case journals track what has happened in courts, agencies, housing, and everyday disputes so people can follow the record, seek counsel, and rely on lawful procedures.</p>
        </article>
        <article class="hero-highlight">
          <span class="hero-highlight__label">Stewardship with boundaries</span>
          <p>Housing and land efforts are pursued lawfully, respecting zoning, licensing, tax rules, and corporate separateness. Stewardship means caring for neighbors while honoring compliance and proper oversight.</p>
        </article>
        <article class="hero-highlight">
          <span class="hero-highlight__label">Accountability</span>
          <p>Shared documentation, transparent records, and neutral summaries help landlords, contractors, agencies, and neighbors operate with dignity and fairness while inviting lawful oversight.</p>
        </article>
        <article class="hero-highlight">
          <span class="hero-highlight__label">Faith-shaped conscience</span>
          <p>Christian principles—truthfulness, humility, repentance, service—inform conduct and communication. They do not replace legal authority or create parallel courts.</p>
        </article>
      </div>
      <div class="hero-actions hero-actions--centered">
        <a class="btn btn-main" href="{{ '/about/' | relative_url }}">Explore Our Mission</a>
        <a class="btn btn-ghost" href="{{ '/cases/' | relative_url }}">Learn Your Rights</a>
        <a class="btn btn-ghost" href="{{ '/manifesto/' | relative_url }}">Read the Manifesto</a>
      </div>
    </div>

    <div class="hero-side-panel">
      <div class="hero-brand-visual">
        <!-- Placeholder for brand image or motif -->
        <!-- Preload hero visual for faster first-paint, use modern image attributes to reduce layout shift -->
        <link rel="preload" href="/assets/img/faithfrontier-mark.svg" as="image">
        <img src="/assets/img/faithfrontier-mark.svg" alt="Faith Frontier Crest" width="360" height="360" decoding="async" fetchpriority="high" style="max-width: 100%; height: auto; margin-bottom: 1.5rem;" />
      </div>
      <p class="hero-badge">Transparent, lawful, accountable</p>
      <!-- Daily Verse placed in side panel -->
      <div id="daily-verse" class="hero-scripture">
        <span class="dv-text">Loading daily verse…</span>
        <span class="dv-ref"></span>
        <span class="dv-note">Updated daily from Atlantic County, New Jersey</span>
      </div>

      <div class="hero-panel__stat">
        <span class="hero-panel__number">Open record</span>
        <span class="hero-panel__label">Case archives with source links</span>
      </div>
      <div class="hero-panel__stat">
        <span class="hero-panel__number">Guides</span>
        <span class="hero-panel__label">Plain-language civic primers</span>
      </div>
      <ul class="hero-checklist">
        <li>Neutral case summaries with verifiable citations</li>
        <li>Clear separation of faith reflections and legal records</li>
        <li>Compliance with licensing, zoning, and trust governance</li>
      </ul>
      <div class="hero-reverence">
        Faith shapes conscience and care; lawful process shapes action. Every filing, affidavit, and negotiation is handled with prayerful humility and respect for oversight.
      </div>

      <div class="hero-panel__clarity">
        <p>
          Cases are published for transparency and civic education. Readers are encouraged to verify filings through official dockets and to seek licensed counsel for legal advice.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="preamble">
  <div class="container preamble__inner">
    <p class="preamble__eyebrow">United States Constitution</p>
    <h2 class="preamble__title">We the People</h2>
    <p class="preamble__body">
      Our work is grounded in the promises of justice, tranquility, and the blessings of liberty. We live those ideals
      locally by advocating for due process, protecting conscience, and strengthening New Jersey communities with
      truth-telling and service.
    </p>
    <div class="preamble__principles">
      <div class="preamble__principle">Guarding against exploitation that erodes stewardship, dignity, and family identity.</div>
      <div class="preamble__principle">Standing firm with neighbors inside courts, agencies, housing disputes, and civic filings.</div>
      <div class="preamble__principle">Preserving sovereignty with justice, tranquility, mutual duty, and faithful care.</div>
    </div>
  </div>
</section>

<div class="section-divider" aria-hidden="true"><span></span></div>

<section class="section-block section-block--mission">
  <div class="container">
    <p class="section-eyebrow">What we are building</p>
    <h2 class="section-heading">Faith Frontier translates hard cases into hopeful systems.</h2>
    <p class="section-lead">
      Faith Frontier is an ecclesiastical, faith-rooted public trust committed to New Jersey's people. We acknowledge the
      harms we have witnessed -- confusing hearings, paperwork traps, agencies that miss humanity -- and we turn those
      lessons into a constructive path forward.
    </p>
    <p style="color: var(--color-muted);">
      We publish verifiable case materials for transparency and civic education, keep faith essays distinct from legal records,
      and operate within courts, statutes, and public-record frameworks. Open documentation invites oversight; it does not
      replace legitimate authority.
    </p>
    <p style="color: var(--color-muted);">
      We follow Christ's call to justice, mercy, and humility (cf. Matthew 5–7), anchoring our public recordkeeping in
      the witness tradition of the Geneva Bible while inviting transparent comparison across translations.
    </p>
    <p>
      We are building an ethical advocacy culture: documenting cases, equipping residents with plain-language guidance,
      and collaborating with churches, community leaders, professionals, and officials who want due process to work for
      everyone. Our focus is restoration, stewardship, and public trust.
    </p>
  </div>
</section>

<section class="section-block section-block--pillars">
  <div class="container">
    <p class="section-eyebrow">Pillars</p>
    <h2 class="section-heading">Ways we serve the Garden State</h2>
    <div class="section-grid pillars-grid">
      <article class="pillar-card">
        <h3>Education and Documentation</h3>
        <p>Plain-language guides for housing, benefits, policing, and civic filings paired with transparent case records.</p>
      </article>
      <article class="pillar-card">
        <h3>Advocacy Culture</h3>
        <p>Faith-rooted stewardship that respects courts and agencies while insisting on equity, due process, and accountability.</p>
      </article>
      <article class="pillar-card">
        <h3>Sanctuary and Restoration</h3>
        <p>Initiatives that support safe housing, honorable work, and parish-style sanctuary projects so neighbors can rebuild.</p>
      </article>
    </div>
  </div>
</section>

<div class="section-divider" aria-hidden="true"><span></span></div>

<section class="section-block section-block--serve">
  <div class="container">
    <p class="section-eyebrow">Who we stand beside</p>
    <h2 class="section-heading">Neighbors we defend and disciple</h2>
    <div class="serve-list">
      <article>
        <h3>Residents seeking clarity</h3>
        <p>People navigating municipal or state processes who need straight answers about rights, filings, and timelines.</p>
      </article>
      <article>
        <h3>Households facing disruption</h3>
        <p>Tenants, homeowners, workers, and small contractors looking for documented pathways toward stability and fairness.</p>
      </article>
      <article>
        <h3>Communities of faith and conscience</h3>
        <p>Churches, ministries, and civic partners collaborating on sanctuary, equitable service delivery, and covenantal advocacy.</p>
      </article>
    </div>
  </div>
</section>

<div class="section-divider" aria-hidden="true"><span></span></div>

<section class="section-block section-block--principles">
  <div class="container">
    <p class="section-eyebrow">Principles</p>
    <h2 class="section-heading">Our vows to Christ and neighbor</h2>
    <div class="section-grid principles-grid">
      <article class="principle-card">
        <h3>Truth / Equity / Faith</h3>
        <p>Every docket begins with prayer, honest narrative, and equitable remedies that honor heaven and earth.</p>
      </article>
      <article class="principle-card">
        <h3>Shelter each other</h3>
        <p>We safeguard one another through transparent process, shared resources, and neighborly duty.</p>
      </article>
      <article class="principle-card">
        <h3>Everlasting Trust</h3>
        <p>We steward the Trust with integrity, honoring constitutional protections and the moral weight of every affidavit.</p>
      </article>
      <article class="principle-card">
        <h3>Beyond commerce</h3>
        <p>People are never commodities; advocacy rejects exploitation and centers human dignity over transactions.</p>
      </article>
    </div>
  </div>
</section>

<div class="section-divider" aria-hidden="true"><span></span></div>

<section class="section-block section-block--law">
  <div class="container law-grid">
    <div>
      <p class="section-eyebrow">How we work with the law</p>
      <h2 class="section-heading">Faith Frontier rises with justice, not outside it.</h2>
      <p>
        We operate in harmony with New Jersey law, federal civil-rights principles, and constitutional due process. We are
        not a law firm; instead we illuminate rights, procedures, and ethical options so residents can engage counsel,
        courts, agencies, and public servants with confidence.
      </p>
    </div>
    <style>
      :root {
        --max-width: 1400px;
        --container-pad: clamp(1.5rem, 4vw, 3rem);
        --gutter: clamp(1.5rem, 4vw, 2.5rem);
        --muted: #b6c2d1;
        --accent: #f4efe7;
        --accent-brass: #d4a574;
        --accent-emerald: #10b981;
        --color-bg: #0b1220;
        --color-panel: #151c2e;
        --color-panel-dark: #101624;
        --card-bg: rgba(20,30,50,0.92);
        --shadow: 0 4px 32px rgba(15,23,42,0.22);
        --radius: 16px;
      }
      html { box-sizing: border-box; font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial; }
      *, *::before, *::after { box-sizing: inherit; }
      body {
        margin: 0;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        color: var(--accent);
        background: var(--color-bg);
      }
      .container {
        max-width: var(--max-width);
        padding: 0 var(--container-pad);
        margin: 0 auto;
        width: 100%;
        box-sizing: border-box;
      }
      h1, h2, h3 {
        color: var(--accent);
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 700;
        margin-top: 0.5em;
        margin-bottom: 0.3em;
        letter-spacing: -0.01em;
      }
      h1 { font-size: clamp(2.2rem, 5vw, 3.5rem); line-height: 1.08; }
      h2 { font-size: clamp(1.5rem, 3vw, 2.2rem); }
      h3 { font-size: clamp(1.15rem, 2vw, 1.35rem); }
      p {
        margin: .5em 0;
        color: var(--muted);
        max-width: 70ch;
        line-height: 1.8;
        font-size: 1.08rem;
      }
      section {
        padding: clamp(1.5rem, 4vw, 3rem) 0;
      }
      .section-divider {
        margin: 0;
        height: 2px;
        background: rgba(212,165,116,0.08);
        border: none;
      }
      .hero-grid {
        display: grid;
        grid-template-columns: 1.5fr minmax(340px, 1fr);
        gap: var(--gutter);
        align-items: stretch;
        align-content: start;
        min-height: 60vh;
      }
      .hero-main {
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.5rem;
      }
      .hero-side-panel {
        background: var(--card-bg);
        color: var(--accent);
        display: flex;
        flex-direction: column;
        gap: clamp(1rem, 2vw, 2rem);
        align-items: flex-start;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        padding: 2.5rem 2rem;
        margin-top: 0;
        min-width: 320px;
        max-width: 480px;
      }
      .hero-highlights {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: clamp(1rem, 2vw, 2rem);
        margin-top: 1.5rem;
      }
      .hero-highlight {
        background: var(--color-panel);
        color: var(--accent);
        padding: 1.25rem 1rem;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(15,23,42,0.18);
        min-height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 1px solid rgba(212,165,116,0.13);
      }
      .hero-highlight__label {
        color: var(--accent-brass);
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        margin-bottom: 0.2rem;
      }
      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 1.5rem;
        justify-content: center;
      }
      .hero-actions .btn {
        min-width: 140px;
        padding: .7rem 1.25rem;
        font-size: 1.1rem;
        border-radius: 8px;
        font-weight: 600;
        background: linear-gradient(90deg, var(--accent-brass), var(--accent-emerald));
        color: #181818;
        border: none;
        box-shadow: 0 2px 12px rgba(212, 165, 116, 0.12);
        transition: background 0.2s, box-shadow 0.2s;
      }
      .hero-actions .btn-ghost {
        background: transparent;
        color: var(--accent-brass);
        border: 1.5px solid var(--accent-brass);
        box-shadow: none;
      }
      .hero-actions .btn:hover, .hero-actions .btn:focus {
        background: linear-gradient(90deg, var(--accent-emerald), var(--accent-brass));
        box-shadow: 0 4px 18px rgba(212, 165, 116, 0.18);
        color: #181818;
      }
      .hero-actions .btn-ghost:hover, .hero-actions .btn-ghost:focus {
        background: var(--accent-brass);
        color: #181818;
        border-color: var(--accent-brass);
      }
      @media (max-width: 900px) {
        .hero-grid { grid-template-columns: 1fr; }
        .hero-side-panel { order: 2; width: 100%; max-width: none; min-width: 0; }
        .hero-actions .btn { flex: 1; }
        .hero-highlights { grid-template-columns: 1fr; }
      }
      img { max-width: 100%; height: auto; display: block; }
      @media (prefers-reduced-motion:reduce){*{animation-duration:0.001ms!important;transition-duration:0.001ms!important}}
    </style>
