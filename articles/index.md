---
layout: listing
title: Essays & Biographies
permalink: /articles/
body_class: page-essays
description: "Legacy articles path, now listing the essays collection of long-form biographies, constitutional narratives, and public-trust documentation for Faith Frontier."
---

<section aria-labelledby="articles-heading" class="articles-index shell">
  <header class="page-header" style="max-width: 60rem; margin: 0 auto 2rem;">
    <h1 id="articles-heading">Essays & Biographies</h1>
    <p style="font-size: 1.1rem; line-height: 1.7; color: var(--color-muted);">
      Long-form biographies, constitutional narratives, and documentation curated for Faith Frontier.
      These pieces weave personal history with jurisdiction-aware analysis to support transparent,
      community-centered recordkeeping. (This page now mirrors the essays collection.)
    </p>
  </header>

  <div class="articles-list" style="max-width: 60rem; margin: 0 auto;">
    {% assign collection_items = site.essays | default: site.articles %}
    {% assign sorted_articles = collection_items | default: empty | sort: "date" | reverse %}
    {% for article in sorted_articles %}
      <article class="article-card" style="padding: 1.2rem 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
        <h2 class="article-card-title" style="margin: 0 0 0.35rem 0; font-size: 1.5rem;">
          <a href="{{ article.url | relative_url }}">{{ article.title }}</a>
        </h2>
        {% if article.date %}
        <p class="article-card-date" style="margin: 0 0 0.35rem 0; color: var(--color-muted);">{{ article.date | date: "%B %-d, %Y" }}</p>
        {% endif %}
        {% if article.description %}
        <p class="article-card-excerpt" style="margin: 0; color: var(--color-muted);">{{ article.description }}</p>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</section>
