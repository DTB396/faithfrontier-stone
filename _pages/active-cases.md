---
layout: default
title: "Active Case Digest"
permalink: /cases/active/
description: "Live litigation tracker for the Faith Frontier Ecclesiastical Trust."
hero_panel: false
hide_hero: true
show_breadcrumbs: true
---

<section class="section-block cases-active-intro">
  <div class="container">
    <p class="section-eyebrow">Live litigation</p>
    <h1 class="section-heading">Active Case Digest</h1>
    <p class="section-lead">
      A daily-readable summary of every Faith Frontier case that is currently live in court. Each entry
      surfaces the venue, fast facts, and most recent filings so supporters and counsel can see what
      still requires prayer, oversight, or documents. Publication is for transparency and verification; the
      court record controls.
    </p>
    <p>
      This digest pulls from the Jekyll case collection (`_cases/*.md`). When a case is marked
      <strong>status: active</strong>, its overview, documents, and latest steps appear below automatically.
      These summaries are not legal advice and do not replace reading the underlying docket.
    </p>
  </div>
</section>

<section class="section-block cases-active-list">
  <div class="container">
    {% assign active_cases = site.cases | where: "status", "active" | sort: "filed_date" | reverse %}
    {% if active_cases.size == 0 %}
      <p>No cases are flagged as active right now. Check back soon.</p>
    {% else %}
      <div class="active-cases-grid">
        {% for case in active_cases %}
        <article class="active-case-card">
          <header>
            <p class="case-docket">{{ case.primary_docket | default: case.short_title }}</p>
            <h2><a href="{{ case.url | relative_url }}">{{ case.title }}</a></h2>
            <p class="case-meta">
              {{ case.court }} • Filed {{ case.filed_date | date: "%Y-%m-%d" }}
            </p>
          </header>
          {% if case.overview %}
            <p class="case-overview">{{ case.overview }}</p>
          {% endif %}
          {% if case.documents and case.documents.size > 0 %}
            {% assign last_doc = case.documents | last %}
            {% assign doc_path = last_doc.path | default: '' %}
            {% if doc_path != '' %}
              {% assign first_char = doc_path | slice: 0, 1 %}
              {% if doc_path contains '://' %}
                {% assign doc_url = doc_path %}
              {% elsif first_char == '/' %}
                {% assign doc_url = doc_path %}
              {% else %}
                {% assign assets_dir = case.assets_dir | default: '' | append: '/' | replace: '//', '/' %}
                {% if assets_dir == '' %}
                  {% assign doc_url = doc_path %}
                {% else %}
                  {% assign doc_url = assets_dir | append: doc_path %}
                {% endif %}
              {% endif %}
              <p class="case-latest">
                <strong>Latest filing:</strong>
                {% assign label = last_doc.label | default: last_doc.path | default: 'Document' %}
                {% if doc_url contains '://' %}
                  <a href="{{ doc_url }}" target="_blank" rel="noopener">{{ label }}</a>
                {% else %}
                  <a href="{{ doc_url | relative_url }}">{{ label }}</a>
                {% endif %}
              </p>
            {% endif %}
          {% endif %}
          <footer>
            <a class="btn btn-ghost" href="{{ case.url | relative_url }}">View full record</a>
          </footer>
        </article>
        {% endfor %}
      </div>
    {% endif %}
  </div>
</section>
