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
├── manifest.webmanifest                # PWA — branding "Aide Salariés", theme navy #0B1D3A
├── favicon.svg                         # Logo "AS" (dégradé orange) — favicon vectoriel
├── ads.txt                             # AdSense — google.com, pub-7503799878812047, DIRECT
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
    ├── calculer-salaire-net-2025.html
    ├── deductions-impots-enfants.html      # Enfants : quotient, garde (7GA), scolarité, pensions
    ├── deductions-impots-maison.html       # Maison : emploi domicile (7DB), borne recharge (7ZQ), revenus locatifs
    ├── reduction-impot-dons.html           # Dons : 75 % case 7UD / 66 % case 7UF, syndicats 7AC
    ├── changement-situation-impots.html    # Mariage, naissance, divorce, déménagement pro (1AK)
    ├── decoder-fiche-paie.html             # Décodage bulletin : brut→net→net imposable (1AJ), CSG/CRDS
    ├── cout-augmentation-employeur.html    # Coût patronal d'une augmentation, réduction Fillon, PPV
    └── rupture-conventionnelle-negociation.html # Indemnité L.1237-13, exonération 6 PASS, ARE, négociation
```

> ⚠️ **Le dépôt git déployé est ce dossier `simulateur-salaire/`** (contient `.git`, `CNAME`). Le dossier parent `Aide_salariés/` n'est PAS versionné ; il contient une copie de ce `CLAUDE.md` (mémoire de session, à garder synchrone) et un fichier orphelin `generateur-lettre-depart.html` (ancienne version dev du générateur, non déployée).

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
| Décoder sa fiche de paie (lignes, CSG, net imposable 1AJ) | salaire | 2026-06-29 |
| Combien coûte une augmentation à l'employeur | salaire | 2026-06-29 |
| Rupture conventionnelle : calcul et négociation | chomage | 2026-06-29 |
| Dons aux associations : réduction 66 %/75 % | fiscalite | 2026-06-26 |
| Mariage, naissance, déménagement : changement de situation | fiscalite | 2026-06-26 |
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

**✅ Rétrofit `.declare-box` (28/06/2026) :** les 6 articles pré-existants (ARE, frais km, prélèvement source, freelance, salaire net) ont tous reçu des encarts `.declare-box` et `.case-tag` rétroactivement. Tous les articles du site intègrent désormais les numéros de cases officiels.

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
- **PASS 2026 :** 47 100 € — utilisé dans `rupture-conventionnelle.html` pour le calcul du plafond d'exonération de l'indemnité légale (2× PASS = 94 200 €).
- **Dons aux associations :**
  - Taux **75 %** → case **7UD** (aide aux personnes en difficulté) ; plafond **2 000 €** (relevé de 1 000 € à 2 000 € pour les dons effectués depuis le **14/10/2025**)
  - Taux **66 %** → case **7UF** (intérêt général) ; plafond 20 % du revenu imposable, excédent reportable 4 ans
  - **⚠️ Alerte correction :** dans `articles/optimiser-prelevement-source.html`, les cases 7UD et 7UF étaient **inversées** (7UD=66%, 7UF=75%). Corrigé le 28/06/2026. La règle est : **7UD = 75 % / 7UF = 66 %** — toujours vérifier dans ce sens.
  - Cotisations syndicales : case **7AC** (déclarant 1) / **7AE** (déclarant 2) — crédit 66 %, plafond 1 % salaire brut ; non cumulable avec frais réels.

---

## 🚨 9. Chantiers & Priorités

### Google Ads
- Campagne en mode responsive (titres/descriptions centrés sur le gain utilisateur).
- Sitelinks pointent vers des URL distinctes (`/articles.html`) pour éviter les rejets de liens dupliqués.

### Google AdSense — Statut : EN COURS DE VALIDATION (29/06/2026)
- **Contexte :** L'ancienne alerte "Contenu à faible valeur informative" datait de l'époque où le site n'avait que **3 articles**. Elle n'est plus d'actualité : le site compte désormais **13 articles + 10 outils**, le SEO technique est complet (canonical, OG, sitemap, ads.txt) et AdSense est sur **toutes les pages**. Le site est actuellement **en cours de validation** par AdSense.
- **À NE PAS refaire :** ne plus traiter le site comme du "Thin Content" — ce diagnostic est périmé. Le contenu est suffisant pour la validation.
- **Historique :**
  - **✅ Fait (26/06/2026) :** Écosystème Frais Réels — outil `/calculateur-frais-reels/` (bloc `tool-seo` ~350 mots) + article pilier `guide-frais-reels-deductibles.html` (~1200 mots).
  - **✅ Fait (29/06/2026) :** 3 articles ajoutés — `decoder-fiche-paie.html`, `cout-augmentation-employeur.html`, `rupture-conventionnelle-negociation.html`.

### ✅ Audit SEO & monétisation (29/06/2026)
Audit complet du code → corrections appliquées sur **les 25 pages** :
- **AdSense généralisé :** le script Auto Ads (`ca-pub-7503799878812047`) n'était que sur 1 page (`/simulateur-salaire/`). Injecté dans le `<head>` de **toutes** les pages (accueil, 10 outils, 13 articles, listing). C'était la fuite de revenu n°1.
- **`ads.txt` créé** à la racine (`google.com, pub-7503799878812047, DIRECT, f08c47fec0942fa0`) — lève l'alerte AdSense "revenus menacés".
- **Manifest réparé :** le fichier avait un nom corrompu (`manifest.webmanifest  json Copier Modifier` → 404) et un branding obsolète (orange/"Convertisseur Brut-Net"). Recréé sous le bon nom, branding "Aide Salariés", `theme_color` navy `#0B1D3A`.
- **`favicon.svg` créé** (logo "AS", dégradé orange `#FF6B00`→`#D95000`) — le site n'avait aucun favicon.
- **SEO `<head>` complété** sur l'accueil + les 10 outils (les articles l'avaient déjà) : `rel="canonical"` (anti duplicate-content), Open Graph (`og:title/description/url/type/locale/site_name`), `twitter:card`. Favicon + manifest + `theme-color` ajoutés partout.
- ✅ Vérifs : `calcImpot()` identique entre les 2 outils fiscaux, sitemap complet (24 URL). RAS de ce côté.
- **🧹 Fichier parasite supprimé (29/06/2026) :** `articles/optimiser-prelevement-source.html html Copier Modifier` — doublon obsolète au nom corrompu (version pré-rebranding « Convertisseur Brut-Net », 2025) qui était déployé tel quel. Supprimé du dépôt ; l'article réel `optimiser-prelevement-source.html` est conservé. ⚠️ **Vigilance générale :** ce type d'artefact (suffixe « json/html Copier Modifier » dans un nom de fichier, résidu de copier-coller) est déjà apparu 2 fois (manifest + cet article) — vérifier `find . -name "*Copier Modifier*"` après tout ajout de fichier.

**🧱 `<head>` standard (à reproduire sur CHAQUE nouvelle page) :** script AdSense + `<link rel="icon" href="/favicon.svg">` + `<link rel="manifest" href="/manifest.webmanifest">` + `<meta name="theme-color" content="#0B1D3A">` + `rel="canonical"` propre à la page + bloc Open Graph. Sans ça, la page ne monétise pas et n'a pas de canonical.

### 🎯 Priorité actuelle : LE RÉFÉRENCEMENT (SEO organique)
Le trafic Google Ads est payant ; l'enjeu désormais est de capter du **trafic organique gratuit et durable**. La base technique est saine (canonical, OG, sitemap, mobile-first, pages légères). Leviers par ordre d'impact :

1. **✅ Fait (29/06/2026) — Données structurées `FAQPage`** : les FAQ des 8 pages d'outils (questions en `<h3>` + réponses) sont balisées en JSON-LD `FAQPage` → éligibles aux **rich snippets** (questions dépliables dans Google). Le balisage est généré depuis le texte visible (règle Google) ; tous les JSON validés. Les sous-titres de `simulateur-prime.html` et `rupture-conventionnelle.html` ont été **reformulés en questions** → ces 2 pages passent de 1 à **5 questions** chacune. **Convention à suivre : rédiger les `<h3>` des blocs `tool-seo` sous forme de questions** pour qu'ils alimentent le FAQPage.
2. **✅ Fait (29/06/2026) — `BreadcrumbList`** : fil d'Ariane JSON-LD sur **23 pages** — outils (`Accueil › [Outil]`, 2 niveaux) et articles (`Accueil › Articles › [Titre]`, 3 niveaux). L'accueil (racine) n'en a pas, c'est normal.
3. **✅ Fait (29/06/2026) — Maillage interne** : chaque page d'outil (les 10) a désormais un bloc `<section class="related-articles">` « Pour aller plus loin » avec 2 articles pertinents (styles inline via variables CSS, fonctionne aussi sur `simulateur-salaire/index.html` qui ne charge pas `tools.css`). Les articles liaient déjà vers les outils (1 à 5 liens chacun). **Le maillage outil ↔ article est maintenant bidirectionnel.** Mapping outil→articles dans `related.pl` (scratchpad).
4. **Cibler la longue traîne** (à faire — nécessite tes mots-clés cibles) — créer/optimiser des pages sur des requêtes précises à faible concurrence (ex. « salaire net 2500 brut », « indemnité rupture conventionnelle 10 ans d'ancienneté »). Intention de recherche claire = conversion outil.
5. **`tool-seo` ~600 mots** sous les outils encore "nus" : utile pour le SEO de la page outil (texte indexable + mots-clés), pas pour AdSense (réglé). NB : 8 pages outils ont déjà un bloc `tool-seo`.

**⚙️ Note technique — génération des données structurées :** scripts perl réutilisables dans le scratchpad de session (`genfaq.pl`/`insertfaq.pl` extraient les Q/R depuis `<section class="tool-seo">` ; `breadcrumb.pl` construit le fil d'Ariane). **Toujours `use utf8;` quand un script contient des libellés accentués codés en dur** (sinon double-encodage → `Coût` devient `CoÃ»t`). Pour `FAQPage`, ne baliser QUE les `<h3>` se terminant par « ? » et garder le texte fidèle au visible.

**Hors-priorité (faible ROI ici) :** `og:image` — n'alourdit pas le site mais ne sert qu'au partage social, marginal vu un trafic Ads/search.

---

## 🌐 10. Langue & Conventions

- Le site est entièrement en français. Tous les textes utilisateur, commentaires HTML et labels sont en français.
- Les identifiants techniques JS/CSS restent en anglais (noms de variables, classes CSS, fonctions).
- Ne jamais écrire de commentaires qui décrivent CE QUE fait le code — seulement le POURQUOI quand ce n'est pas évident.

---

## 🗂️ 11. Déploiement du 30/06/2026 — Pages légales + 10 articles SEO

### Pages légales créées (racine, au niveau de `index.html`)
Trois pages conformes AdSense/RGPD, design article (Tailwind + nav.js + footer avec liens légaux), au sitemap :

| Page | Fichier | Points clés |
|---|---|---|
| Politique de confidentialité | `politique-confidentialite.html` | RGPD + AdSense : cookies, données collectées, droits (accès/rectif/effacement/opposition), **aucun DPO désigné**, contact via formulaire |
| Mentions légales | `mentions-legales.html` | Éditeur = **Chapey Rémi**, hébergeur = **GitHub Pages / Microsoft**, propriété intellectuelle, droit applicable. **Aucun email exposé** → renvoi au formulaire |
| Contact | `contact.html` | Formulaire (nom/sujet/message) **sans backend ni mailto** — JS affiche « Formulaire en cours d'activation ». **Aucun email affiché** (choix utilisateur explicite) |

> ⚠️ **Règle email :** l'adresse `chapey.remi@gmail.com` **ne doit jamais apparaître** sur le site public (mentions légales, contact, etc.). Toujours renvoyer vers le formulaire de contact.

**Liens légaux dans TOUS les footers :** un bloc `.footer-legal` (liens inline `#9DBCFF`) a été inséré avant chaque `</footer>` des 24 pages existantes via le script `footerlegal.pl` (scratchpad). Il fonctionne sur les 3 types de footer (Tailwind articles, `tools.css` inline, `.container` du générateur). Les 3 pages légales et les 10 nouveaux articles l'intègrent nativement.

### 10 nouveaux articles SEO (longue traîne « droit du travail / paie »)
Tous datés du **2026-06-30**, design article standard (head AdSense/favicon/manifest/canonical/OG + JSON-LD Article + BreadcrumbList), ajoutés à `js/articles.js` (en tête) et au `sitemap.xml`. Le sujet « bulletin de salaire ligne par ligne » a été **écarté** (doublon avec `decoder-fiche-paie.html`) et remplacé par « indemnité de licenciement ».

| Titre | Fichier | Catégorie |
|---|---|---|
| Intéressement et participation (PEE) | `articles/prime-interessement-participation.html` | salaire |
| Ticket-restaurant 2026 | `articles/ticket-restaurant-2026.html` | salaire |
| Mutuelle d'entreprise obligatoire | `articles/mutuelle-entreprise-obligatoire.html` | salaire |
| Congés payés : calcul et indemnité | `articles/conges-payes-calcul.html` | salaire |
| Heures supplémentaires | `articles/heures-supplementaires-majoration.html` | salaire |
| Arrêt maladie : IJSS et maintien | `articles/arret-maladie-indemnites.html` | salaire |
| Solde de tout compte | `articles/solde-tout-compte.html` | chomage |
| Indemnité de licenciement | `articles/indemnite-licenciement-calcul.html` | chomage |
| Période d'essai | `articles/periode-essai-regles.html` | salaire |
| Prime de précarité (CDD) | `articles/prime-precarite-cdd.html` | chomage |

**Maillage :** chaque article comporte 1 CTA vers l'outil pertinent (prime, brut→net, rupture conv., ARE) + 2 liens « Voir aussi » vers d'autres articles (dont les nouveaux entre eux). **Total site : 23 articles + 10 outils + 3 pages légales.**
