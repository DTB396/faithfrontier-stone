// main.js — minimal nav test for Faith Frontier

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".nav-toggle");
    var nav =
      document.getElementById("site-nav") ||
      document.querySelector(".site-nav");

    if (!toggle || !nav) {
      // If this happens, HTML hooks don't match
      return;
    }

    // Create backdrop element
    var backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);

    // Start closed
    toggle.setAttribute("aria-expanded", "false");

    var keydownHandler = null;

    function getFocusableInNav() {
      return nav.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
    }

    function openNav() {
      if (nav.classList.contains("is-open")) return;
      nav.classList.add("is-open");
      toggle.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      backdrop.classList.add("is-visible");
      document.body.style.overflow = "hidden";

      // Focus first focusable
      var focusable = getFocusableInNav();
      if (focusable && focusable.length) {
        try {
          focusable[0].focus({ preventScroll: true });
        } catch (_err) {
          focusable[0].focus();
        }
      }

      if (!keydownHandler) {
        keydownHandler = function (e) {
          if (e.key === "Escape") {
            closeNav(true);
            return;
          }
          if (e.key !== "Tab") return;
          var nodes = getFocusableInNav();
          if (!nodes || !nodes.length) return;
          var first = nodes[0];
          var last = nodes[nodes.length - 1];
          var active = document.activeElement;
          if (e.shiftKey && active === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
          }
        };
      }
      window.addEventListener("keydown", keydownHandler);
    }

    function closeNav(restoreFocus) {
      if (!nav.classList.contains("is-open")) return;
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      backdrop.classList.remove("is-visible");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (keydownHandler) window.removeEventListener("keydown", keydownHandler);
      if (restoreFocus) {
        try {
          toggle.focus({ preventScroll: true });
        } catch (_err) {
          toggle.focus();
        }
      }
    }

    // Toggle menu
    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeNav(false);
      } else {
        openNav();
      }
    });

    // Close menu when backdrop is clicked
    backdrop.addEventListener("click", function () {
      closeNav(false);
    });

    // Close menu when a link is tapped (mobile UX)
    nav.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) return;
      if (!nav.classList.contains("is-open")) return;
      closeNav(false);
    });

    // Close menu on window resize to desktop
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth >= 768) {
          closeNav(false);
        }
      }, 250);
    });

    // In-drawer close button (mobile)
    var closeBtn = document.querySelector(".nav-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        closeNav(true);
      });
    }

    // Daily Verse (non-denominational, NJ morning)
    (function () {
      var container = document.getElementById("daily-verse");
      if (!container) return;

      // Cache by local date to avoid flicker during the day (America/New_York)
      function nycDateKey() {
        try {
          var fmt = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/New_York",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          var parts = fmt.formatToParts(new Date());
          var y = parts.find((p) => p.type === "year").value;
          var m = parts.find((p) => p.type === "month").value;
          var d = parts.find((p) => p.type === "day").value;
          return y + "-" + m + "-" + d;
        } catch (_err) {
          var dt = new Date();
          return (
            dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
          );
        }
      }

      var key = "ff-daily-verse-" + nycDateKey();
      var cached = null;
      try {
        cached = JSON.parse(localStorage.getItem(key));
      } catch (_err) {}

      function render(v) {
        var textEl = container.querySelector(".dv-text");
        var refEl = container.querySelector(".dv-ref");
        container.style.opacity = "0";
        var ref = (v && v.reference) || "";
        var text = (v && v.text) || "";
        if (textEl) textEl.textContent = text || "Daily verse unavailable.";
        if (refEl) {
          var q = encodeURIComponent(ref);

          // DOM-safe rendering (avoid innerHTML with third-party content)
          while (refEl.firstChild) refEl.removeChild(refEl.firstChild);
          if (ref) {
            refEl.appendChild(document.createTextNode("— " + ref + " · "));
            var versions = [
              { label: "GNV", version: "GNV" },
              { label: "NIV", version: "NIV" },
              { label: "AKJV", version: "AKJV" },
              { label: "ESV", version: "ESV" },
            ];
            versions.forEach(function (vItem, idx) {
              var a = document.createElement("a");
              a.href =
                "https://www.biblegateway.com/passage/?search=" +
                q +
                "&version=" +
                encodeURIComponent(vItem.version);
              a.target = "_blank";
              a.rel = "noopener";
              a.textContent = vItem.label;
              refEl.appendChild(a);
              if (idx !== versions.length - 1) {
                refEl.appendChild(document.createTextNode(" · "));
              }
            });
          }
        }
        // Fade in after content set
        requestAnimationFrame(function () {
          container.style.transition = "opacity 250ms ease";
          container.style.opacity = "1";
        });
      }

      if (cached) {
        render(cached);
        return;
      }

      // Fallback catalog: public-domain verses (AKJV/KJV phrasing) with references
      var FALLBACK_VERSES = [
        {
          reference: "Genesis 1:1",
          text: "In the beginning God created the heaven and the earth.",
        },
        {
          reference: "Psalm 23:1",
          text: "The LORD is my shepherd; I shall not want.",
        },
        {
          reference: "Proverbs 3:5-6",
          text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
        },
        {
          reference: "Isaiah 40:31",
          text: "They that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.",
        },
        {
          reference: "Jeremiah 29:11",
          text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
        },
        {
          reference: "Matthew 5:9",
          text: "Blessed are the peacemakers: for they shall be called the children of God.",
        },
        {
          reference: "Matthew 6:33",
          text: "Seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
        },
        {
          reference: "Matthew 11:28",
          text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
        },
        {
          reference: "John 3:16",
          text: "For God so loved the world, that he gave his only begotten Son.",
        },
        {
          reference: "John 8:12",
          text: "I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.",
        },
        {
          reference: "John 14:6",
          text: "I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
        },
        {
          reference: "Romans 8:28",
          text: "All things work together for good to them that love God, to them who are the called according to his purpose.",
        },
        {
          reference: "Romans 12:2",
          text: "Be not conformed to this world: but be ye transformed by the renewing of your mind.",
        },
        {
          reference: "1 Corinthians 13:4-7",
          text: "Charity suffereth long, and is kind; charity envieth not; ... beareth all things, believeth all things, hopeth all things, endureth all things.",
        },
        {
          reference: "Galatians 5:22-23",
          text: "The fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance.",
        },
        {
          reference: "Ephesians 2:8-9",
          text: "By grace are ye saved through faith; and that not of yourselves: it is the gift of God.",
        },
        {
          reference: "Philippians 4:6-7",
          text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
        },
        {
          reference: "Philippians 4:13",
          text: "I can do all things through Christ which strengtheneth me.",
        },
        {
          reference: "Colossians 3:23",
          text: "Whatsoever ye do, do it heartily, as to the Lord, and not unto men.",
        },
        {
          reference: "2 Timothy 1:7",
          text: "God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
        },
        {
          reference: "Hebrews 11:1",
          text: "Faith is the substance of things hoped for, the evidence of things not seen.",
        },
        {
          reference: "James 1:5",
          text: "If any of you lack wisdom, let him ask of God.",
        },
        {
          reference: "1 Peter 5:7",
          text: "Casting all your care upon him; for he careth for you.",
        },
        {
          reference: "1 John 4:18",
          text: "There is no fear in love; but perfect love casteth out fear.",
        },
      ];

      function pickFallbackByDate() {
        var date = nycDateKey();
        // Simple deterministic rotation: hash date to index
        var n = FALLBACK_VERSES.length;
        var sum = 0;
        for (var i = 0; i < date.length; i++) {
          sum = (sum * 31 + date.charCodeAt(i)) % 1000003;
        }
        var idx = sum % n;
        return FALLBACK_VERSES[idx];
      }

      // OurManna API provides public-domain KJV text; we link GNV/NIV/AKJV/ESV for comparison.
      var controller = null;
      var timeoutId = null;
      try {
        controller = new AbortController();
        timeoutId = setTimeout(function () {
          try {
            controller.abort();
          } catch (_err) {}
        }, 4500);
      } catch (_err) {}

      fetch(
        "https://beta.ourmanna.com/api/v1/get/?format=json",
        controller ? { signal: controller.signal } : undefined,
      )
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          if (timeoutId) clearTimeout(timeoutId);
          var item =
            data && data.verse && data.verse.details
              ? data.verse.details
              : null;
          var v = item
            ? { text: item.text || "", reference: item.reference || "" }
            : pickFallbackByDate();
          render(v);
          try {
            localStorage.setItem(key, JSON.stringify(v));
          } catch (_err) {}
        })
        .catch(function () {
          if (timeoutId) clearTimeout(timeoutId);
          var v = pickFallbackByDate();
          render(v);
          try {
            localStorage.setItem(key, JSON.stringify(v));
          } catch (_err) {}
        });
    })();
  });
})();
