(function () {
  'use strict';

  var el = document.getElementById('site-nav');
  if (!el) return;

  var path = window.location.pathname;

  function isActive(patterns) {
    return patterns.some(function (p) {
      if (p === '/') return path === '/' || path === '/index.html';
      if (p === '/articles/') return path === '/articles.html' || path.startsWith('/articles/');
      return path === p;
    });
  }

  function icon(d) {
    return '<svg class="g-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
  }
  function ddIcon(d) {
    return '<svg class="g-nav-dd-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
  }

  var ic = {
    money:     '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    mail:      '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    doc:       '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    building:  '<rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="22" x2="9" y2="12"/><line x1="15" y1="22" x2="15" y2="12"/><rect x="9" y="12" width="6" height="10"/><rect x="7" y="6" width="2" height="2"/><rect x="11" y="6" width="2" height="2"/><rect x="15" y="6" width="2" height="2"/>',
    balance:   '<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>',
    gift:      '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/>',
    handshake: '<path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>',
    shield:    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    grid:      '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    home:      '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    car:       '<path d="M5 17H3a2 2 0 0 1-2-2V9l2-4h14l2 4v6a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>',
  };

  var dropTools = [
    { href: '/simulateur-salaire/',                          label: 'Brut → Net',            patterns: ['/simulateur-salaire/', '/simulateur-salaire/index.html'],           i: ic.money },
    { sep: true },
    { href: '/simulateur-salaire/cout-employeur.html',       label: 'Coût employeur',         patterns: ['/simulateur-salaire/cout-employeur.html'],                          i: ic.building },
    { href: '/simulateur-salaire/comparateur-statuts.html',  label: 'Comparateur de statuts',      patterns: ['/simulateur-salaire/comparateur-statuts.html'],                     i: ic.balance },
    { href: '/simulateur-salaire/simulateur-prime.html',     label: 'Simulateur de prime',         patterns: ['/simulateur-salaire/simulateur-prime.html'],                        i: ic.gift },
    { href: '/simulateur-salaire/tjm-net.html',              label: 'TJM → Net mensuel',      patterns: ['/simulateur-salaire/tjm-net.html'],                                 i: ic.briefcase },
    { sep: true },
    { href: '/simulateur-salaire/rupture-conventionnelle.html', label: 'Indemnité rupture conv.', patterns: ['/simulateur-salaire/rupture-conventionnelle.html'],            i: ic.handshake },
    { href: '/simulateur-salaire/simulateur-are.html',       label: 'Simulateur ARE',              patterns: ['/simulateur-salaire/simulateur-are.html'],                          i: ic.shield },
    { sep: true },
    { href: '/calculateur-frais-kilometriques/', label: 'Frais kilométriques',  patterns: ['/calculateur-frais-kilometriques/', '/calculateur-frais-kilometriques/index.html'], i: ic.car },
  ];

  var isSimActive = dropTools.filter(function(t){return t.href;}).some(function(t){ return isActive(t.patterns); });

  var ddItemsHTML = dropTools.map(function(t) {
    if (t.sep) return '<div class="g-nav-dd-sep"></div>';
    return '<a href="' + t.href + '" class="g-nav-dd-item' + (isActive(t.patterns) ? ' active' : '') + '">' +
      ddIcon(t.i) + '<span>' + t.label + '</span></a>';
  }).join('');

  var regularLinks = [
    { href: '/generateur-lettre/',  label: 'Lettre de départ', patterns: ['/generateur-lettre/', '/generateur-lettre/index.html'], i: ic.mail },
    { href: '/articles.html',       label: 'Articles',               patterns: ['/articles.html', '/articles/'],                         i: ic.doc  },
  ];

  var regHTML = regularLinks.map(function(p) {
    return '<a href="' + p.href + '" class="g-nav-link' + (isActive(p.patterns) ? ' active' : '') + '">' +
      icon(p.i) + '<span>' + p.label + '</span></a>';
  }).join('');

  var ddHTML =
    '<div class="g-nav-dd" id="gNavDd">' +
      '<button class="g-nav-dd-btn' + (isSimActive ? ' active' : '') + '" id="gNavDdBtn" aria-expanded="false" aria-haspopup="true">' +
        icon(ic.grid) +
        '<span>Simulateurs</span>' +
        '<svg class="g-nav-dd-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
      '</button>' +
      '<div class="g-nav-dd-menu" id="gNavDdMenu">' + ddItemsHTML + '</div>' +
    '</div>';

  var isSubpage = path.startsWith('/simulateur-salaire/') || path.startsWith('/generateur-lettre/') || path.startsWith('/calculateur-frais-kilometriques/');
  var backHTML = isSubpage
    ? '<div class="g-back"><a class="g-back-link" href="/">' + icon(ic.home) + '<span>Accueil</span></a></div>'
    : '';

  el.innerHTML =
    '<nav class="g-nav" role="navigation" aria-label="Navigation principale">' +
      '<div class="g-nav-inner">' +
        '<a href="/" class="g-nav-brand" aria-label="Aide Salariés — Accueil">' +
          '<div class="g-nav-logo" aria-hidden="true">AS</div>' +
          '<span class="g-nav-brand-name">Aide Salariés</span>' +
        '</a>' +
        '<div class="g-nav-links" id="gNavLinks">' + ddHTML + regHTML + '</div>' +
        '<button class="g-nav-toggle" id="gNavToggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="gNavLinks">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>' +
    '</nav>' + backHTML;

  var toggle  = document.getElementById('gNavToggle');
  var linksEl = document.getElementById('gNavLinks');
  var ddBtn   = document.getElementById('gNavDdBtn');
  var ddEl    = document.getElementById('gNavDd');

  toggle.addEventListener('click', function () {
    var open = linksEl.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  ddBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = ddEl.classList.toggle('open');
    ddBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('click', function (e) {
    if (!el.contains(e.target)) {
      linksEl.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Ouvrir le menu');
      ddEl.classList.remove('open');
      ddBtn.setAttribute('aria-expanded', 'false');
    } else if (!ddEl.contains(e.target)) {
      ddEl.classList.remove('open');
      ddBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      ddEl.classList.remove('open');
      ddBtn.setAttribute('aria-expanded', 'false');
    }
  });
})();
