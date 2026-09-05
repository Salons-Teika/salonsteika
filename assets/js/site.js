/* ===========================================================================
   Salons Teika — page behaviour.
   Content lives in content.js; this file only wires it up.
   =========================================================================== */
(function () {
  'use strict';

  var LANGS = ['lv', 'ru', 'en'];
  var STORE_KEY = 'st-lang';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobile = window.matchMedia('(max-width: 900px)');

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* Resolve a dotted key like "hero.headline" against the language table. */
  function lookup(lang, path) {
    return path.split('.').reduce(function (o, k) {
      return (o == null) ? null : o[k];
    }, window.I18N[lang]);
  }

  /* ── Language ─────────────────────────────────────────────────────────── */
  var lang = (function () {
    var stored;
    try { stored = localStorage.getItem(STORE_KEY); } catch (e) { /* private mode */ }
    if (LANGS.indexOf(stored) > -1) return stored;
    var nav = (navigator.language || 'lv').slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) > -1 ? nav : 'lv';
  })();

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = next;
    try { localStorage.setItem(STORE_KEY, next); } catch (e) { /* ignore */ }

    $$('[data-i18n]').forEach(function (el) {
      var v = lookup(next, el.getAttribute('data-i18n'));
      if (v != null) el.textContent = v;
    });
    $$('[data-i18n-attr]').forEach(function (el) {
      // "aria-label:work.imgAria" — attribute name, then key.
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var bits = pair.split(':');
        var v = lookup(next, bits[1]);
        if (v != null) el.setAttribute(bits[0], v);
      });
    });

    // The CTA button label also appears inside the mobile call link.
    var call = $('.nav-mobile__call');
    if (call) call.textContent = lookup(next, 'cta') + ' · ' + window.SALON.phone;

    // About section runs its three facts together on one line.
    var facts = $('[data-facts]');
    if (facts) {
      var a = window.I18N[next].about;
      facts.textContent = [a.f1, a.f2, a.f3].join(' · ');
    }

    renderServices();
    renderReviews();
    renderGalleryLabels();

    $$('[data-lang-opt]').forEach(function (b) {
      var on = b.getAttribute('data-lang-opt') === next;
      if (b.hasAttribute('role')) b.setAttribute('aria-selected', String(on));
      else b.setAttribute('aria-pressed', String(on));
    });
    var cur = $('[data-lang-current]');
    if (cur) cur.textContent = window.SALON.flags[next] + ' ' + next.toUpperCase();
  }

  /* ── Services accordion ───────────────────────────────────────────────── */
  var openCats = { 0: true };

  function renderServices() {
    var grid = $('[data-services]');
    if (!grid) return;
    grid.textContent = '';

    window.SERVICES.forEach(function (cat, i) {
      var card = document.createElement('div');
      card.className = 'svc';

      var panelId = 'svc-panel-' + i;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'svc__toggle';
      btn.setAttribute('aria-expanded', String(!!openCats[i]));
      btn.setAttribute('aria-controls', panelId);

      var name = document.createElement('span');
      name.className = 'svc__name';
      name.textContent = cat.name[lang];

      var sym = document.createElement('span');
      sym.className = 'svc__sym';
      sym.setAttribute('aria-hidden', 'true');
      sym.textContent = openCats[i] ? '−' : '+';

      btn.append(name, sym);

      var panel = document.createElement('div');
      panel.className = 'svc__panel';
      panel.id = panelId;
      panel.hidden = !openCats[i];

      cat.items.forEach(function (it) {
        var row = document.createElement('div');
        row.className = 'svc__row';
        var n = document.createElement('span');
        n.className = 'svc__row-name';
        n.textContent = it.n[lang];
        var p = document.createElement('span');
        p.className = 'svc__row-price';
        p.textContent = it.p;
        row.append(n, p);
        panel.appendChild(row);
      });

      btn.addEventListener('click', function () {
        openCats[i] = !openCats[i];
        panel.hidden = !openCats[i];
        btn.setAttribute('aria-expanded', String(!!openCats[i]));
        sym.textContent = openCats[i] ? '−' : '+';
      });

      card.append(btn, panel);
      grid.appendChild(card);
    });
  }

  /* ── Reviews ──────────────────────────────────────────────────────────── */
  var QUOTE_MARK =
    '<svg aria-hidden="true" class="quote__mark" width="17" height="13" viewBox="0 0 26 20" fill="#50372B">' +
    '<path d="M0 20V11C0 4.9 3.2 1 9.6 0v4.6C6.8 5.3 5.4 7 5.3 9.4H10V20H0Z"></path>' +
    '<path d="M16 20V11C16 4.9 19.2 1 25.6 0v4.6C22.8 5.3 21.4 7 21.3 9.4H26V20H16Z"></path></svg>';

  function renderReviews() {
    var strip = $('[data-reviews]');
    if (!strip) return;
    strip.textContent = '';

    window.TESTIMONIALS.forEach(function (x) {
      var fig = document.createElement('figure');
      fig.className = 'quote';
      fig.innerHTML = QUOTE_MARK;

      var bq = document.createElement('blockquote');
      bq.textContent = x[lang] || x.lv;

      var cap = document.createElement('figcaption');
      cap.textContent = '— ' + x.name;

      fig.append(bq, cap);
      strip.appendChild(fig);
    });
    updateArrows();
  }

  /* Snap positions are base + i*stride — the strip has side padding on
     mobile, so base is not 0. Derive both from the children's offsets. */
  function reviewMetrics() {
    var el = $('[data-reviews]');
    if (!el || el.children.length < 2) return null;
    return {
      el: el,
      base: el.children[0].offsetLeft - el.offsetLeft,
      stride: el.children[1].offsetLeft - el.children[0].offsetLeft
    };
  }

  var arrowTimer;
  function updateArrows() {
    clearTimeout(arrowTimer);
    arrowTimer = setTimeout(function () {
      var m = reviewMetrics();
      var prev = $('[data-review-prev]');
      var next = $('[data-review-next]');
      if (!m || !prev || !next) return;
      var max = m.el.scrollWidth - m.el.clientWidth;
      var showArrows = !mobile.matches && max > 4;
      prev.setAttribute('aria-hidden', String(!(showArrows && m.el.scrollLeft > m.base + 4)));
      next.setAttribute('aria-hidden', String(!(showArrows && m.el.scrollLeft < max - 4)));
    }, 180);
  }

  var scrollAnim;
  function scrollReviews(dir) {
    var m = reviewMetrics();
    if (!m) return;
    var el = m.el;
    var idx = Math.round((el.scrollLeft - m.base) / m.stride) + dir;
    var max = el.scrollWidth - el.clientWidth;
    var target = Math.max(0, Math.min(max, m.base + idx * m.stride));

    cancelAnimationFrame(scrollAnim);
    if (reduced.matches) {
      el.scrollLeft = target;
      updateArrows();
      return;
    }
    var from = el.scrollLeft, dist = target - from, dur = 380, t0 = performance.now();
    (function tick(now) {
      var p = Math.min(1, (now - t0) / dur);
      el.scrollLeft = from + dist * (1 - Math.pow(1 - p, 3));
      if (p < 1) scrollAnim = requestAnimationFrame(tick);
      else updateArrows();
    })(t0);
  }

  /* ── Gallery ──────────────────────────────────────────────────────────── */
  function renderGalleryLabels() {
    $$('[data-shot]').forEach(function (el) {
      var cfg = window.GALLERY.filter(function (g) { return g.id === el.getAttribute('data-shot'); })[0];
      if (!cfg) return;
      var alt = cfg.alt[lang] || cfg.alt.lv;
      var img = $('img', el);
      if (img) img.alt = alt;
      el.setAttribute('aria-label', alt);
    });
  }

  /* ── Hero carousel ────────────────────────────────────────────────────── */
  function initCarousel() {
    var slides = $$('[data-slide]');
    var dots = $$('[data-dot]');
    if (!slides.length) return;

    var current = 0, paused = false, timer;

    function show(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.setAttribute('data-active', String(n === current)); });
      dots.forEach(function (d, n) { d.setAttribute('aria-current', String(n === current)); });
    }

    dots.forEach(function (d, n) {
      d.addEventListener('click', function () { paused = true; show(n); });
    });

    show(0);
    if (!reduced.matches) {
      timer = setInterval(function () { if (!paused) show(current + 1); }, 6500);
      // Stop cycling once the hero has scrolled away — no work off-screen.
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) clearInterval(timer);
        else if (!paused) timer = setInterval(function () { show(current + 1); }, 6500);
      });
    }
  }

  /* ── Popovers, menu, language dropdown ────────────────────────────────── */
  function closeAllPops(except) {
    $$('[data-pop]').forEach(function (p) {
      if (p !== except) {
        p.hidden = true;
        var t = $('[data-pop-toggle="' + p.getAttribute('data-pop') + '"]');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initChrome() {
    // Phone popovers (header CTA + hero CTA)
    $$('[data-pop-toggle]').forEach(function (btn) {
      var pop = $('[data-pop="' + btn.getAttribute('data-pop-toggle') + '"]');
      if (!pop) return;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = pop.hidden;
        closeAllPops(pop);
        closeLang();
        pop.hidden = !open;
        btn.setAttribute('aria-expanded', String(open));
      });
      pop.addEventListener('click', function (e) { e.stopPropagation(); });
    });

    // Language dropdown
    var langToggle = $('[data-lang-toggle]');
    var langMenu = $('[data-lang-menu]');
    if (langToggle && langMenu) {
      langToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = langMenu.hidden;
        closeAllPops();
        langMenu.hidden = !open;
        langToggle.setAttribute('aria-expanded', String(open));
      });
      langMenu.addEventListener('click', function (e) { e.stopPropagation(); });
    }

    $$('[data-lang-opt]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        applyLang(b.getAttribute('data-lang-opt'));
        closeLang();
        closeMenu();
      });
    });

    document.addEventListener('click', function () { closeAllPops(); closeLang(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeAllPops(); closeLang(); closeMenu(); }
    });

    // Mobile drawer
    var burger = $('[data-burger]');
    var drawer = $('[data-drawer]');
    if (burger && drawer) {
      burger.addEventListener('click', function () {
        var open = drawer.getAttribute('data-open') !== 'true';
        drawer.setAttribute('data-open', String(open));
        burger.setAttribute('aria-expanded', String(open));
      });
      $$('a', drawer).forEach(function (a) { a.addEventListener('click', closeMenu); });
    }
    mobile.addEventListener('change', function () { closeMenu(); updateArrows(); });
  }

  function closeLang() {
    var m = $('[data-lang-menu]'), t = $('[data-lang-toggle]');
    if (m) m.hidden = true;
    if (t) t.setAttribute('aria-expanded', 'false');
  }

  function closeMenu() {
    var d = $('[data-drawer]'), b = $('[data-burger]');
    if (d) d.setAttribute('data-open', 'false');
    if (b) b.setAttribute('aria-expanded', 'false');
  }

  /* ── Boot ─────────────────────────────────────────────────────────────── */
  function init() {
    initCarousel();
    initChrome();
    applyLang(lang);

    var strip = $('[data-reviews]');
    if (strip) strip.addEventListener('scroll', updateArrows, { passive: true });
    var prev = $('[data-review-prev]');
    var next = $('[data-review-next]');
    if (prev) prev.addEventListener('click', function () { scrollReviews(-1); });
    if (next) next.addEventListener('click', function () { scrollReviews(1); });
    window.addEventListener('resize', updateArrows, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
