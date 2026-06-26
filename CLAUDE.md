# CLAUDE.md — Aide Salariés (simulateur-salaire.fr)

Ce fichier sert de mémoire globale pour Claude Code. Il récapitule la philosophie du site, les choix techniques, l'architecture et les chantiers en cours. À mettre à jour à chaque grande étape.

---

## 🎯 1. Philosophie & Objectifs

- **Cible :** Salariés et indépendants en France, sans compétence juridique, fiscale ou technique.
- **Règle d'or UI/UX :** Simplicité absolue. Chaque outil répond à un besoin précis. Pas de jargon sans exemple. Montrer toujours le **gain réel net dans la poche** (ex : l'impôt économisé, pas la somme déduite du revenu).
- **Modèle économique :** 100 % gratuit, sans inscription, financé par Google AdSense, propulsé par trafic Google Ads.
- **Déploiement :** GitHub Pages (`simulateur-salaire.fr`). `git push origin main` → live en ~60 secondes. Aucun build system, aucun package manager, aucune suite de tests.

---

## 🛠️ 2. Stack Technique

- **Frontend :** HTML5, CSS3 pur (variables CSS, grids), Vanilla JS (aucun framework, aucun import).
- **Performance :** Code ultra-léger, chargement instantané, mobile-first (majorité du trafic).
- **Police :** Inter (Google Fonts) — chargée via `<link rel="preconnect">` sur toutes les pages.
- **Hébergement :** GitHub Pages — dépôt `Remi59210/simulateur-salaire`, fichier `CNAME` → `simulateur-salaire.fr`.

---

## 🎨 3. Charte Graphique (Variables CSS)

Définies dans `css/tools.css` et dupliquées en inline dans `index.html` et `simulateur-salaire/index.html` (ces deux pages ne chargent pas `tools.css`).

| Variable | Valeur | Usage |
|---|---|---|
| `--navy` | `#0B1D3A` | Fond header, footer, textes forts |
| `--navy-mid` | `#12305E` | Dégradé hero, accents dark |
| `--blue` | `#1A5CFF` | Boutons, CTA, focus, accents |
| `--blue-dark` | `#0E4BE6` | Hover boutons |
| `--blue-soft` | `#E8F0FF` | Fond badges, encarts, icônes |
| `--blue-mid` | `#C7D7F8` | Bordures légères |
| `--bg` | `#F6F9FF` | Fond de page général |
| `--white` | `#FFFFFF` | Fond des cards |
| `--text` | `#1E293B` | Texte principal |
| `--muted` | `#64748B` | Texte secondaire |
| `--border` | `#DCE6F5` | Bordures |

**Identité visuelle :** Accents oranges (`#FF6B00`) **exclusivement** sur le logo "AS" et les liens actifs du menu. Ne pas introduire l'orange ailleurs.

**⚠️ Compat rétro :** Dans `tools.css`, les variables `--orange`, `--orange-dark`, `--orange-light`, `--orange-mid` sont intentionnellement remappées vers des valeurs bleues. C'est un alias de compatibilité — ne pas supprimer.

---

## 📁 4. Architecture des Fichiers

```
simulateur-salaire/
├── index.html                          # Dashboard principal
├── CNAME                               # simulateur-salaire.fr
├── robots.txt
├── sitemap.xml
├── manifest.webmanifest
├── css/
│   ├── nav.css                         # Barre de nav uniquement (fond #0F172A)
│   └── tools.css                       # Palette, layout, cards, inputs, footer
├── js/
│   ├── nav.js                          # IIFE — injecte <nav> sur toutes les pages
│   └── articles.js                     # Tableau statique des articles pour articles.html
├── simulateur-salaire/
│   ├── index.html                      # Simulateur Brut → Net (outil principal)
│   ├── cout-employeur.html
│   ├── comparateur-statuts.html
│   ├── simulateur-prime.html
│   ├── tjm-net.html
│   ├── rupture-conventionnelle.html
│   └── simulateur-are.html
├── calculateur-frais-kilometriques/
│   └── index.html                      # Calculateur frais km 2026 (barème DGFiP)
├── calculateur-frais-reels/
│   └── index.html                      # Simulateur GLOBAL de frais réels (10% vs réels)
├── generateur-lettre/
│   └── index.html                      # Générateur lettres RH
└── articles/
    ├── guide-frais-reels-deductibles.html  # Guide ultime frais réels (pilier SEO/AdSense)
    ├── calcul-are-chomage.html
    ├── frais-kilometriques-impots.html
    ├── optimiser-prelevement-source.html
    ├── statut-freelance-2026.html
    └── calculer-salaire-net-2025.html
```

### 🧩 Écosystème "Frais Réels" (maillage interne)

Trois pages interconnectées forment un entonnoir de conversion fiscal :

1. **Article pilier** `articles/guide-frais-reels-deductibles.html` — guide pédagogique ~1750 mots (transport/40 km, repas 5,45 €, frais cachés, tuto impots.gouv case 1AK + modèle à copier-coller). Contient 2 CTA vers le simulateur global.
2. **Outil de synthèse** `calculateur-frais-reels/index.html` — centralise TOUTES les dépenses (km + repas auto + autres), compare l'abattement 10 % aux frais réels et affiche le gain d'impôt réel. Renvoie vers le calculateur km dédié pour le détail.
3. **Outil amont** `calculateur-frais-kilometriques/index.html` — fournit le chiffre "frais km" à reporter dans l'outil global.

Les deux outils partagent **la même fonction `calcImpot()`** (barème IR 2026) et **les mêmes bornes d'abattement** (495 € / 14 426 €) — à garder synchronisées si l'une change.

---

## 📊 5. Inventaire des Outils

| # | Outil | URL | Statut |
|---|---|---|---|
| 1 | Simulateur Brut → Net | `/simulateur-salaire/` | ✅ Actif (5 statuts + curseur PAS) |
| 2 | Coût Employeur | `/simulateur-salaire/cout-employeur.html` | ✅ Actif |
| 3 | Comparateur de Statuts | `/simulateur-salaire/comparateur-statuts.html` | ✅ Actif |
| 4 | Simulateur de Prime | `/simulateur-salaire/simulateur-prime.html` | ✅ Actif (net + PAS) |
| 5 | TJM → Net Mensuel | `/simulateur-salaire/tjm-net.html` | ✅ Actif (portage, libéral, micro) |
| 6 | Rupture Conventionnelle | `/simulateur-salaire/rupture-conventionnelle.html` | ✅ Actif (indemnité légale) |
| 7 | Simulateur ARE | `/simulateur-salaire/simulateur-are.html` | ✅ Actif (SJR, durée) |
| 8 | Calculateur Frais Km 2026 | `/calculateur-frais-kilometriques/` | ✅ Actif (voir détail §8) |
| 9 | Simulateur Global Frais Réels | `/calculateur-frais-reels/` | ✅ Actif (10 % vs réels, verdict débutant) |
| 10 | Générateur Lettres RH | `/generateur-lettre/` | ✅ Actif (démission + rupture) |

---

## 📰 6. Inventaire des Articles (Blog)

Gérés via `js/articles.js` (tableau statique) + `articles.html` (listing avec filtres et pagination).

| Titre | Catégorie | Date |
|---|---|---|
| Impôts et enfants : déductions case par case | famille | 2026-06-26 |
| Impôts et maison : déductions case par case | immobilier | 2026-06-26 |
| Tutoriel : tout déduire aux frais réels (guide pilier) | fiscalite | 2026-06-26 |
| Droits France Travail 2026 : calcul de l'ARE | chomage | 2026-06-20 |
| Micro-entreprise vs Portage salarial 2026 | freelance | 2026-06-20 |
| Barème Frais Kilométriques 2026 | fiscalite | 2026-06-20 |
| Calculer son salaire net en 2026 | salaire | 2026-06-23 |
| Optimiser son prélèvement à la source | fiscalite | 2025-08-08 |

**Règle :** Quand un nouvel article est créé, ajouter une entrée dans `js/articles.js`. Le champ `link` doit pointer vers le chemin réel du fichier HTML.

**⚠️ Split architectural :** Les pages `articles/` utilisent **Tailwind CDN**. Les pages d'outils utilisent `tools.css`. Ne jamais croiser les deux.

**Catégories de filtre** (`articles.html` + champ `category` dans `articles.js`) : `salaire`, `fiscalite`, `famille`, `immobilier`, `chomage`, `freelance`. Ajouter une catégorie = mettre à jour le `<select id="category-filter">` dans `articles.html`.

**Encarts « cases de déclaration »** : tous les articles fiscaux intègrent des blocs `.declare-box` (fond navy + badges `.db-case`) et des `.case-tag` inline qui citent les numéros de cases officiels (1AJ, 1AK, 7GA, 7DB, 7ZQ, 4BE…) pour guider l'utilisateur dans sa déclaration. Le CSS de ces classes est inline dans chaque article (pas de fichier partagé, cohérent avec le split Tailwind).

---

## 🔧 7. Navigation Globale (`js/nav.js`)

IIFE unique qui s'exécute sur toutes les pages. Elle lit `window.location.pathname` pour marquer le lien actif, puis écrit tout le `<nav>` dans `<div id="site-nav">`.

**Quand on ajoute un nouvel outil**, mettre à jour 3 endroits :
1. `js/nav.js` — ajouter une entrée dans le tableau `dropTools` (`href`, `label`, `patterns`, `i` icône SVG)
2. `js/nav.js` — ajouter le chemin dans `isSubpage` pour afficher le lien "← Accueil"
3. `index.html` — ajouter une `.tool-card` dans la grille de la section appropriée

---

## 🗓️ 8. Données Fiscales (à mettre à jour chaque année)

Les deux outils fiscaux intègrent les barèmes directement en JS. Valeurs à réviser annuellement (**dans les deux fichiers**) :

- Objet `BAREME` (frais km uniquement) : taux par puissance fiscale et par tranche de km
- Fonction `calcImpot()` : tranches IR (actuellement 0%/11%/30%/41%/45% — seuils 12000/29000/82000/177106). **Dupliquée à l'identique** dans `calculateur-frais-kilometriques/` et `calculateur-frais-reels/`.
- Abattement 10 % forfaitaire : min **495 €**, max **14 426 €** (revenus 2024 ; dans les deux outils)
- Majoration électrique : +20 % (frais km uniquement)
- Règle sécurité 40 km : alerte si trajet AR > 40 km (sauf justification)
- Valeur forfaitaire repas (`VALEUR_REPAS`) : **5,45 €/jour** travaillé (frais réels global ; revenus 2025)
- **ARE** (`simulateur-are.html`) : partie fixe **13,18 €**, plancher **32,13 €/jour** (revalorisation Unédic 1er juillet 2025). Mêmes valeurs reprises dans l'article `calcul-are-chomage.html` et le générateur de lettres — à synchroniser à chaque revalorisation (1er juillet).

---

## 🚨 9. Chantiers & Priorités

### Google Ads
- Campagne en mode responsive (titres/descriptions centrés sur le gain utilisateur).
- Sitelinks pointent vers des URL distinctes (`/articles.html`) pour éviter les rejets de liens dupliqués.

### Google AdSense — Alerte "Contenu à faible valeur informative"
- **Problème :** Les robots AdSense voient trop de JS, pas assez de texte lisible.
- **Action :** Ajouter sous chaque outil majeur un bloc `<section class="tool-seo">` avec FAQ + guide d'environ 600 mots.
- **Stratégie éditoriale :** Publier de nouveaux articles (rupture conventionnelle, coût d'une augmentation, décodage fiche de paie) pour éliminer le statut "Thin Content".
- **✅ Fait (26/06/2026) :** Création de l'écosystème Frais Réels — nouvel outil `/calculateur-frais-reels/` (avec bloc `tool-seo` ~350 mots) + article pilier `guide-frais-reels-deductibles.html` (~1200 mots). Sitemap.xml reconstruit avec les 18 URL réelles du site.
- **Prochaines pistes :** Articles "Décoder sa fiche de paie", "Combien coûte une augmentation", "Rupture conventionnelle : calcul et négociation".

---

## 🌐 10. Langue & Conventions

- Le site est entièrement en français. Tous les textes utilisateur, commentaires HTML et labels sont en français.
- Les identifiants techniques JS/CSS restent en anglais (noms de variables, classes CSS, fonctions).
- Ne jamais écrire de commentaires qui décrivent CE QUE fait le code — seulement le POURQUOI quand ce n'est pas évident.
