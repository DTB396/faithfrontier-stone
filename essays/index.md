---
layout: listing
title: Essays & Commentary
permalink: /essays/
body_class: page-essays
---

<section aria-labelledby="essays-heading" class="essays-index shell">
  <header class="page-header">
    <h1 id="essays-heading">Essays & Commentary</h1>
    <p>Reflections on law as covenant, due process, and public trust.</p>
  </header>

  <div class="essays-list">
    {% assign sorted_essays = site.essays | sort: "date" | reverse %}
    {% for essay in sorted_essays %}
      <article class="essay-card">
        <h2 class="essay-card-title">
          <a href="{{ essay.url | relative_url }}">
            {{ essay.title }}
          </a>
        </h2>
        {% if essay.date %}
        <p class="essay-card-date">{{ essay.date | date: "%B %-d, %Y" }}</p>
        {% endif %}
        {% if essay.description %}
        <p class="essay-card-excerpt">{{ essay.description }}</p>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</section>
