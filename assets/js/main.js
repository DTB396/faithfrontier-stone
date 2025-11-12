// main.js — minimal nav test for Faith Frontier

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav') || document.querySelector('.site-nav');

    if (!toggle || !nav) {
      // If this happens, HTML hooks don't match
      return;
    }

    // Start closed
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a link is tapped (mobile UX)
    nav.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;
      if (!nav.classList.contains('is-open')) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();