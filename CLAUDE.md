# CLAUDE.md — Aide Salariés (simulateur-salaire.fr)

Ce fichier sert de mémoire globale pour Claude Code. Il récapitule la philosophie du site, les choix techniques, l'architecture et les chantiers en cours. À mettre à jour à chaque grande étape.

---

## 🎯 1. Philosophie & Objectifs

- **Cible :** Salariés et indépendants en France, sans compétence juridique, fiscale ou technique.
- **Règle d'or UI/UX :** Simplicité absolue. Chaque outil répond à un besoin précis. Pas de jargon sans exemple. Montrer toujours le **gain réel net dans la poche** (ex : l'impôt économisé, pas la somme déduite du revenu).
- **Modèle économique :** 100 % gratuit, sans inscription, financé par Google AdSense. ⚠️ **Aucune campagne Google Ads payante n'est active** (confirmé par l'utilisateur le 28/07/2026) — le trafic est **100 % organique**. Ne pas raisonner comme si le trafic était acheté.
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

**🎨 Infographies SVG inline (depuis le 27/07/2026) :** **les 23 articles** en sont dotés (liste en §9). **Règle : SVG inline, jamais de photo ni de fichier image.** Le SVG coûte 0 requête réseau, préserve le chargement instantané sur mobile (majorité du trafic), reste net sur tout écran et — c'est le point clé — **porte une information chiffrée**, ce qu'une photo d'illustration n'apporte pas. Structure type :

```html
<figure class="figure">
  <svg viewBox="0 0 660 290" xmlns="http://www.w3.org/2000/svg"
       role="img" aria-labelledby="titreX descX">
    <title id="titreX">…</title>
    <desc id="descX">Description chiffrée complète, lue par les robots et les lecteurs d'écran</desc>
    …
  </svg>
  <figcaption>…</figcaption>
</figure>
```

Ajouter au `<style>` de l'article les classes `.figure`, `.figure svg` (`width:100%; height:auto`) et `.figure figcaption`. Palette imposée : `#1A5CFF` (valeur mise en avant), `#0B1D3A` (second niveau), `#94A3B8`/`#CBD5E1` (prélèvements, parts neutres), `#fb923c` (piège, alerte). **Accents obligatoires dans les libellés SVG**, comme dans tout le site. Le `<desc>` doit reprendre tous les chiffres du graphique : c'est ce que lit un robot qui n'affiche pas l'image.

**📏 Longueur cible d'un article : 1 500 mots minimum.** Les 10 articles du lot du 30/06 faisaient 540-830 mots — c'est ce qui a motivé le refus AdSense (voir §9). Ne plus jamais publier en dessous de ce seuil.

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
- Fonction `calcImpot()` : tranches IR 0%/11%/30%/41%/45% — seuils officiels **11 497 / 29 315 / 83 823 / 180 294** (mis à jour 15/07/2026, remplaçant les arrondis 12000/29000/82000/177106). **Dupliquée à l'identique** dans `calculateur-frais-kilometriques/` et `calculateur-frais-reels/`.
- Abattement 10 % forfaitaire : min **495 €**, max **14 426 €** (revenus 2024 ; dans les deux outils)
- Majoration électrique : +20 % (frais km uniquement)
- Règle sécurité 40 km : alerte si trajet AR > 40 km (sauf justification)
- Valeur forfaitaire repas (`VALEUR_REPAS`) : **5,45 €/jour** travaillé (frais réels global ; revenus 2025)
- **ARE** (`simulateur-are.html`) : partie fixe **13,18 €**, plancher **32,13 €/jour** (revalorisation Unédic 1er juillet 2025). Mêmes valeurs reprises dans l'article `calcul-are-chomage.html` et le générateur de lettres — à synchroniser à chaque revalorisation (1er juillet).
- **ARE — compléments (`calcul-are-chomage.html`, 28/07/2026) :** ⭐ **retenue de 3 % pour la retraite complémentaire**, calculée **sur le SJR** (et non sur l'allocation) — presque toujours omise dans les estimations en ligne, elle s'ajoute aux 6,7 % de CSG-CRDS. **Seuils d'âge relevés de 53/55 à 55/57 ans** par la convention d'assurance chômage de 2025 → durées max **18 / 22,5 / 27 mois**. Coefficient de **contracyclicité −25 %** (réforme 2023), plancher **182 jours**. **Dégressivité −30 % au 7<sup>e</sup> mois** au-delà d'environ 4 900 € brut/mois, avant 55 ans (seuil et plancher revalorisés chaque 1<sup>er</sup> juillet → ne pas figer de chiffre). Réexamen par l'instance paritaire régionale après **121 jours** pour une démission simple. Cumul activité réduite : ARE − **70 % du brut** repris, jours non indemnisés **reportés** (non perdus). Déclaration case **1AP**.
- **Quotient conjugal & changement de situation (`changement-situation-impots.html`) :** ⭐ **levier de la date** — depuis 2011, l'année du mariage/PACS le couple est imposé **conjointement sur l'année entière quelle que soit la date** : se marier le 31/12 donne 12 mois de quotient conjugal. Règle **symétrique** au divorce (imposition séparée sur l'année entière) → se séparer début janvier coûte une année de quotient. Le quotient **conjugal n'est pas plafonné** (contrairement au quotient **familial** : **1 791 € par demi-part**, revenus 2024, revalorisé chaque année). ⚠️ Le mariage ne fait **pas toujours** baisser l'impôt : gain nul si les deux conjoints sont déjà dans la même tranche. ⚠️ Le **taux individualisé ne réduit pas** l'impôt du foyer, il ne fait que le répartir — malentendu très fréquent. Option pour déclaration séparée l'année de l'union = **irrévocable**. Cases : **6GU** pensions versées / **1AO** pensions perçues (non cumulable avec le quart de part en résidence alternée) ; **case T** parent isolé = part entière dès le 1<sup>er</sup> enfant. Délai général de signalement : **60 jours**.
- **⚠️ PPV — information périmée corrigée le 28/07/2026 :** la prime de partage de la valeur n'est **plus exonérée d'impôt sur le revenu** depuis le **01/01/2024** (ni de CSG-CRDS), sauf versement sur un plan d'épargne salariale — exception maintenue pour les entreprises de **moins de 50 salariés** et les rémunérations < 3 SMIC. L'article `cout-augmentation-employeur.html` affirmait encore l'exonération générale. Plafonds 3 000 € / 6 000 € (avec accord d'intéressement).
- **⚠️ Allégements de cotisations patronales — ne rien figer :** le barème de la réduction générale est fixé par décret, révisé chaque année, et fait l'objet depuis 2025 d'une **réforme d'unification** des trois dispositifs (réduction générale + bandeaux maladie et famille) qui modifie coefficient **et** plafond. Les articles doivent décrire le **mécanisme** (dégressivité, effet de seuil) et renvoyer à urssaf.fr plutôt que publier un pourcentage. Repère sûr hors zone d'allégement : coût employeur ≈ brut × **1,42 à 1,45**.
- **⭐ Rupture conventionnelle — les TROIS plafonds d'exonération à ne pas confondre (`rupture-conventionnelle-negociation.html`) :** exonération **IR** plafonnée à **6 PASS = 282 600 €** (ne joue quasiment jamais) ; exonération de **cotisations sociales** à **2 PASS = 94 200 €** (idem) ; mais la **CSG-CRDS de 9,70 % s'applique dès le 1<sup>er</sup> euro** au-delà du montant légal ou conventionnel, sans abattement. C'est le seul plafond qui concerne réellement un salarié ordinaire. Exemple de référence : indemnité légale 4 800 € + supra-légal 7 200 € = 12 000 € négociés → CSG-CRDS 698 € → **11 302 € en poche**. ⚠️ Toujours raisonner en net quand on négocie. Corollaire important : **négocier plus est toujours gagnant** (le différé ARE décale le versement sans réduire la durée des droits), la seule contrainte est la trésorerie pendant le différé.
- **Frais kilométriques — seuil de bascule (`frais-kilometriques-impots.html`) :** distance aller simple à partir de laquelle les frais réels dépassent l'abattement de 10 % (véhicule 5 CV, 218 jours, tranche 5 001-20 000 km) — **7 km** à 25 000 € de net imposable, **10 km** à 30 000 €, **17 km** à 40 000 €, **23 km** à 50 000 €. Formule : `155,65 × distance + 1 395 = 0,10 × salaire`. ⚠️ Le barème est **forfaitaire** : carburant, entretien, pneus, assurance et dépréciation sont **déjà inclus** — ne s'y ajoutent que péages, stationnement et intérêts d'emprunt. Majoration **+20 %** pour un véhicule électrique. Règle des **40 km** contournable en justifiant l'éloignement dans « Informations complémentaires ».
- **PAS — calendrier annuel (`optimiser-prelevement-source.html`) :** **15 janvier** avance de 60 % des crédits d'impôt · **avril-juin** déclaration · **fin juillet** avis + taux de septembre · **septembre** nouveau taux et prélèvement du solde · **30 novembre** dernier jour pour moduler l'avance. Le **solde est étalé automatiquement sur 4 mensualités (septembre → décembre) au-delà de 300 €**. ⚠️ **Piège du taux neutre** : s'il est *inférieur* au taux réel, le salarié doit verser lui-même la différence chaque mois — omission fréquente, rappel majoré à la clé. Modulation à la baisse : **majoration si l'impôt réel dépasse de plus de 10 %** le montant modulé. Coût de l'inaction (cas de référence) : passage de 3 000 à 1 800 € net imposable en mars sans moduler → **1 080 € avancés**, remboursés ~16 mois plus tard.
- **Frais réels — le choix est INDIVIDUEL (`guide-frais-reels-deductibles.html`) :** dans un couple, chaque conjoint choisit séparément (case **1AK** déclarant 1 / **1BK** déclarant 2). Beaucoup de foyers renoncent parce que le calcul global n'était pas rentable, alors qu'il l'était pour l'un des deux. Option **révisable chaque année**, sans formalité. ⚠️ **Ne jamais confondre déduction et gain** : 3 088 € déduits rapportent 926 € à 30 % de TMI mais seulement 340 € à 11 %, et **rien** si le foyer n'est pas imposable. Justificatifs à conserver **3 ans** (délai de reprise).
- **PASS 2026 :** 47 100 € — utilisé dans `rupture-conventionnelle.html`. ⚠️ Deux plafonds distincts à ne pas confondre : exonération **fiscale** (IR) plafonnée à **6 PASS = 282 600 €** (c'est ce que la page affiche, correct) ; exonération **sociale** (cotisations) plafonnée à 2 PASS = 94 200 €.
- **⚠️ Différé spécifique d'indemnisation France Travail (indemnités supra-légales) :** diviseur **111,8** depuis le **1<sup>er</sup> janvier 2026** (circulaire Unédic du 02/01/2026). **L'ancienne valeur 94,4 est périmée** mais reste publiée par une majorité de sites concurrents — c'est un angle de différenciation. Plafond **150 jours** calendaires (**75 jours** en licenciement économique), auxquels s'ajoutent le délai d'attente de **7 jours** et le différé congés payés (max 30 j). Ce différé **retarde** le versement de l'ARE sans réduire la durée des droits. Cité dans `indemnite-licenciement-calcul.html`. Le diviseur évolue chaque année avec le plafond de la Sécurité sociale → **à revérifier chaque janvier**.
- **Heures supplémentaires (`heures-supplementaires-majoration.html`) :** exonération d'IR plafonnée à **7 500 € nets/an** (case **1GH**, entre dans le revenu fiscal de référence) ; réduction de cotisations salariales au taux max de **11,31 %** (vieillesse de base + AGIRC-ARRCO uniquement — **CSG/CRDS restent dues**) ; majorations 25 % / 50 %, plancher conventionnel 10 % ; contingent annuel **220 h**. NB : une défiscalisation intégrale a été discutée dans les débats budgétaires 2026 — vérifier avant de modifier le plafond.
- **Arrêt maladie (`arret-maladie-indemnites.html`) :** **double carence** à ne jamais confondre — **3 jours** côté Sécurité sociale (IJSS à partir du 4<sup>e</sup> jour) et **7 jours** côté employeur (maintien légal à partir du 8<sup>e</sup>, sauf AT/MP dès le 1<sup>er</sup>). IJSS = **50 %** du salaire journalier de base = (3 derniers bruts) ÷ **91,25**. Salaire de référence plafonné à **1,4 SMIC** depuis avril 2025 (**abaissé** depuis 1,8 SMIC → pénalise les salaires intermédiaires) → IJSS max ≈ **41,47 € brut/jour**. ⚠️ Ce montant est **brut** : CSG 6,2 % + CRDS 0,5 % = **6,7 %** → **38,69 € net/jour** réellement versés. Maintien employeur = **90 % du brut, IJSS déduites** (l'employeur ne verse que le complément), durées 30→90 jours selon l'ancienneté par tranches de 5 ans, puis même durée à 66,66 %. Fiscalité : imposables case **1AJ** ; **ALD exonérée** ; **AT/MP imposable à 50 %** seulement.
- **⭐ Congés payés acquis pendant un arrêt maladie (loi du 22/04/2024) :** renversement de la règle française, encore largement absent des sites concurrents et des logiciels de paie. Arrêt **non professionnel** → **2 jours ouvrables/mois**, plafond **24 j ouvrables/an**. Arrêt **professionnel (AT/MP)** → **2,5 j ouvrables/mois**, **30 j/an**, **sans limite de durée** d'arrêt. Report **15 mois**, mais ce délai **ne court qu'à compter de l'information écrite de l'employeur** (dans le mois suivant la reprise) — sans cette information, les jours ne peuvent pas être perdus. La fenêtre d'action **rétroactive** (remontant à 2009, pour les salariés en poste) est **forclose depuis le 23/04/2026** ; les droits acquis **depuis le 24/04/2024** restent dus.
- **Mutuelle d'entreprise (`mutuelle-entreprise-obligatoire.html`) :** part employeur **≥ 50 %**, calculée sur la **seule cotisation « salarié seul »** — l'extension aux ayants droit reste à la charge du salarié (source de déception fréquente). ⚠️ **Double règle fiscale opposée** : part **salariale déductible** du net imposable, part **patronale réintégrée** → c'est elle (avec la CSG-CRDS non déductible) qui explique que le net imposable dépasse le net à payer. Ne jamais redéduire la mutuelle aux frais réels. Panier de soins légal : 100 % ticket modérateur, forfait hospitalier **sans limite de durée**, dentaire **125 %** du tarif Sécu, optique **100/150/200 €** par période de 2 ans. **Versement santé** (CDD ≤ 3 mois ou ≤ 15 h/semaine) = contribution employeur × **105 %** (CDI) ou **125 %** (CDD). Dispense de droit si cotisation ≥ **10 %** de la rémunération brute (temps partiel, apprentis).
- **⭐ Portabilité + loi Évin (même article) :** portabilité **gratuite**, durée = dernier contrat, **plafond 12 mois**, sous condition d'ouverture des droits chômage. Ensuite, **loi Évin** : maintien du contrat à titre individuel avec tarif plafonné à **100 % / 125 % / 150 %** du tarif actifs (années 1/2/3), libre ensuite — **demande à faire dans les 6 mois**, à peine de forclusion. Droit très méconnu et jamais proposé spontanément : bon angle de différenciation.
- **Épargne salariale (`prime-interessement-participation.html`) :** plafond individuel intéressement et participation = **75 % du PASS = 35 325 €** (PASS 2026 à 47 100 €). Abondement max **300 %** du versement, plafonné à **8 % du PASS = 3 768 €** (PEE) ou **16 % = 7 536 €** (PER collectif). **CSG-CRDS 9,70 %** due dans tous les cas, y compris sur l'abondement, même en cas de placement ; plus-values à la sortie aux **prélèvements sociaux 17,2 %** mais exonérées d'IR. ⚠️ **Piège du silence** : sans réponse sous **15 jours**, l'intéressement part d'office sur le PEE et la participation pour **moitié sur le PER** (bloquée jusqu'à la retraite) — l'inaction bloque l'argent, elle ne le verse pas. **3 nouveaux cas de déblocage anticipé depuis l'été 2024** (loi partage de la valeur) : rénovation énergétique de la résidence principale, véhicule propre, proche aidant. Obligation de partage de la valeur étendue aux entreprises de **11 à 49 salariés** depuis le **01/01/2025** (bénéfice net fiscal ≥ 1 % du CA sur 3 exercices).
- **Prime de précarité — effet de cascade (`prime-precarite-cdd.html`) :** la prime = 10 % du brut **hors** indemnité de congés payés ; l'**ICCP se calcule ensuite sur le brut + la prime**. Total réel d'une fin de CDD ≈ **21 %** du brut, et non 20 %. Exemple de référence : 11 400 € brut → prime 1 140 € → ICCP 1 254 € (et non 1 140 €).
- **Refus de CDI après un CDD (L.1243-11-1) :** perte de la prime de précarité **et**, depuis 2024, possible privation de l'ARE après **2 refus en 12 mois** (décret 2023-1307, dispositif validé par le Conseil d'État). La proposition n'est opposable que si elle est **écrite**, sur le même emploi ou un emploi similaire, à rémunération, durée de travail, classification et lieu de travail équivalents.
- **Les quatre « nets » du bulletin (`calculer-salaire-net-2025.html`) :** brut → **montant net social** → **net imposable** → net à payer après impôt. ⚠️ Le **net imposable est SUPÉRIEUR au net à payer** (CSG-CRDS non déductible de **2,9 %** du brut + part patronale mutuelle réintégrées) — première source d'incompréhension. ⚠️ Le **PAS s'applique au net imposable**, pas au net à payer (≈ 4 €/mois d'écart à 2 500 € brut). Le **montant net social** (obligatoire depuis juillet 2023) est le montant de référence **pour le RSA et la prime d'activité**, pré-rempli dans les déclarations CAF — à ne pas confondre avec le net à payer. Repères : non-cadre ≈ **78 %** du brut, cadre ≈ **75 %**, fonction publique ≈ 85 %. L'article porte un **tableau de correspondance brut → net** (1 800 à 5 000 €) qui vise la longue traîne « X brut en net ».
- **Logement (`deductions-impots-maison.html`) :** ⭐ **Avance immédiate de crédit d'impôt** (Urssaf, gratuite) — les 50 % sont déduits **de la facture** au lieu d'être remboursés l'année suivante ; à activer sur cesu.urssaf.fr ou auprès du prestataire, qui ne la propose pas spontanément. Sinon, **avance de 60 %** le 15 janvier avec le même effet boomerang que pour les dons (reprise en septembre, modulable jusqu'au **30 novembre**). ⭐ **Déficit foncier doublé à 21 400 €** (au lieu de 10 700 €) pour les travaux de rénovation énergétique faisant passer un bien de E/F/G à au moins D — conserver les **DPE avant/après** et respecter l'engagement de **louer 3 ans** ; fenêtre temporelle à vérifier, la date retenue est celle du **paiement**. ⚠️ **Plafonnement global des niches fiscales : 10 000 €/an** — l'excédent est perdu, piège classique quand on cumule Pinel et emploi à domicile. **Crédits** (versés même non imposable) : 7DB, 7ZQ, 7WJ. **Réduction** (perdue si non imposable) : Pinel 7QA.
- **Micro-entreprise vs portage (`statut-freelance-2026.html`) :** sur **1 000 € facturés** — micro libéral ≈ **717 €** net (26,1 % + 2,2 % de versement libératoire), micro BIC ≈ 771 €, portage ≈ **505 €** avant IR (8 % de frais de gestion puis charges patronales et salariales). ⭐ L'écart annuel (~12 700 € sur 60 000 € de CA) **achète une protection** : ARE d'environ 1 700 €/mois pendant 18 mois, soit ~30 000 € — c'est l'angle qui manque partout ailleurs. ⚠️ **Créer sa micro APRÈS la rupture**, jamais avant : la micro n'**ouvre** aucun droit à l'ARE mais permet de **consommer** des droits acquis (cumul ou **ARCE** 60 % du reliquat). Versement libératoire : **1 % / 1,7 % / 2,2 %**. ⚠️ **Seuil de franchise en base de TVA instable** (réformes et reports successifs depuis 2025) → décrire le mécanisme, renvoyer à impots.gouv.fr, ne pas figer de montant. Plafonds de CA revalorisés **tous les 3 ans** ; sortie du régime après **2 années consécutives** de dépassement.
- **⚠️ Cotisation salariale maladie = 0 % (correction du 28/07/2026) :** supprimée au 01/01/2018 et remplacée par une hausse de CSG. Seule subsiste une cotisation locale d'environ **1,30 % en Alsace-Moselle**. `decoder-fiche-paie.html` affichait encore **0,75 %**, taux d'avant 2018. Rappel des taux salariaux 2026 (non-cadre, tranche 1) : vieillesse plafonnée **6,90 %** + déplafonnée **0,40 %**, AGIRC-ARRCO T1 **3,15 %**, CEG T1 **0,86 %**, CSG déductible **6,80 %** et CSG non déductible + CRDS **2,90 %** (assiette **98,25 %** du brut), chômage salarial **0 %**. Total ≈ **21,7 %** → cohérent avec les 22 % du simulateur. **Répartition sur 3 000 € brut :** retraite de base 219 €, retraite complémentaire 120 €, CSG-CRDS 286 €, mutuelle 25 € → **52 % des cotisations financent la retraite**.
- **⚠️ Ne jamais écrire « net imposable = brut − cotisations » :** `decoder-fiche-paie.html` faisait cette erreur et contredisait `calculer-salaire-net-2025.html`. Cascade correcte pour 3 000 € brut : cotisations 650 € → **net à payer avant impôt 2 350 €** → **net imposable 2 460 €** (réintégration CSG-CRDS non déductible + part patronale mutuelle) → PAS 8 % appliqué **au net imposable** (197 €, et non 188 €) → **net à payer 2 153 €**. Le net imposable est **toujours supérieur** au net à payer.
- **Conservation des bulletins de paie :** l'employeur doit garder un double **5 ans** ; le salarié doit les conserver **sans limitation de durée** — seule preuve des droits en cas de période manquante au relevé de carrière. Bulletin dématérialisé possible **sauf opposition écrite** du salarié ; coffre-fort numérique accessible après le départ de l'entreprise, mais **télécharger une copie personnelle chaque année** (un prestataire peut cesser son activité).
- **Enfants (`deductions-impots-enfants.html`) :** ⭐ **le plafond de 1 791 € par demi-part est rarement atteint** — pour un couple avec 2 enfants, le gain réel par enfant est d'environ **632 €** à 60 000 € de revenu net imposable, **1 047 €** à 70 000 €, et n'atteint le plafond qu'à partir de **~80 000 €**. Le quotient familial profite d'autant plus que le revenu est élevé ; les **crédits d'impôt**, eux, sont indépendants de la tranche et pèsent donc proportionnellement plus lourd pour les foyers modestes. **Enfant majeur : rattachement (plafonné à 1 791 €) vs pension déductible** (~6 800 €/enfant, revalorisé chaque année) — la pension gagne à partir de la tranche à 30 % (2 040 € d'économie), le rattachement gagne à 11 % (748 €) ; second critère décisif : les revenus d'un enfant rattaché **remontent dans le foyer**. **Job d'été** : exonéré jusqu'à **3 SMIC mensuels** pour un étudiant de moins de 26 ans (demande **expresse**, non automatique), jusqu'au **SMIC annuel** pour un apprenti. ⚠️ Ne pas confondre **7GA** (garde extérieure, plafond 3 500 €/enfant) et **7DB** (garde à domicile, plafond 12 000 € + 1 500 €/enfant).
- **Micro-entrepreneur (tjm-net.html) :** taux 2026 corrigés le 15/07/2026 — vente **12,3 %**, services BIC **21,2 %**, services libéraux BNC **26,1 %** (décret 2024-484 : trajectoire BNC 23,1 % → 24,6 % → 26,1 % au 01/01/2026). Les anciens taux (22,1 %/12,7 %) dataient d'avant 2022. NB : plafond CA services affiché 77 700 € (valable 2023-2025) — vérifier la revalorisation triennale 2026.
- **Dons aux associations :**
  - Taux **75 %** → case **7UD** (aide aux personnes en difficulté) ; plafond **2 000 €** (relevé de 1 000 € à 2 000 € pour les dons effectués depuis le **14/10/2025**)
  - Taux **66 %** → case **7UF** (intérêt général) ; plafond 20 % du revenu imposable, excédent reportable 4 ans
  - **⚠️ Alerte correction :** dans `articles/optimiser-prelevement-source.html`, les cases 7UD et 7UF étaient **inversées** (7UD=66%, 7UF=75%). Corrigé le 28/06/2026. La règle est : **7UD = 75 % / 7UF = 66 %** — toujours vérifier dans ce sens.
  - Cotisations syndicales : case **7AC** (déclarant 1) / **7AE** (déclarant 2) / **7AG** (personne à charge) — c'est un **crédit** d'impôt (remboursé même si non imposable), contrairement aux dons qui ouvrent une simple **réduction** (perdue si non imposable). Plafond 1 % du salaire brut ; non cumulable avec les frais réels.
  - Reports d'excédents des années antérieures : cases **7XS à 7XY** (une par année d'origine), report sur **4 ans** au taux d'origine. Le plafond des 20 % ne concerne que le taux à 66 % ; les dons à 75 % n'y sont pas soumis.
  - **⭐ Frais de bénévolat** (peu couvert ailleurs) : frais engagés pour une association et non remboursés = don, au même taux, à trois conditions — activité désintéressée, **renonciation écrite** au remboursement, **reçu fiscal** délivré par l'association. Barème kilométrique **spécifique aux bénévoles**, distinct du barème frais réels (tarif unique, sans puissance fiscale) et révisé chaque année → ne pas y écrire de montant sans le revérifier.
  - **Avance de 60 %** versée le 15 janvier sur la base de l'année précédente : si le donateur cesse de donner, reprise en septembre. Modulable/annulable jusqu'au **30 novembre** sur impots.gouv.fr.
  - **Aucune réduction** pour : cagnotte au profit d'un particulier, association de copropriétaires ou club réservé aux membres, achat déguisé en don (tombola, repas de soutien), organisme étranger non agréé. Test unique : reçu fiscal Cerfa ou rien.

---

## 🚨 9. Chantiers & Priorités

### Google Ads — ⚠️ dispositif à l'arrêt
Aucune campagne payante n'est active (confirmé le 28/07/2026). L'historique ci-dessous est conservé pour mémoire seulement : campagne responsive, sitelinks vers des URL distinctes (`/articles.html`) pour éviter les rejets de liens dupliqués. **Tout le trafic est organique** — c'est la seule source à travailler.

### 🔴 Google AdSense — MOTIF DE REFUS CONFIRMÉ : « Contenu à faible valeur informative » (27/07/2026)
**C'est le seul motif affiché dans la console AdSense.** Point capital : « Valider la propriété du site » est ✅ **vert** → le domaine `.fr` + l'hébergement GitHub Pages sont **acceptés et validés**. Toute la partie technique (AdSense 38/38, ads.txt, RGPD/CMP publié, contact, crawlabilité, sitemap) est donc **hors de cause**. Ne plus chercher de ce côté, et surtout **ne pas changer d'hébergeur ni de domaine** — ce serait inutile.

**Diagnostic éditorial (analyse du 27/07/2026) :**
- Les 10 articles du lot du 30/06 faisaient **~600-700 mots** (et non 800+ comme estimé), boilerplate compris.
- Le contenu, bien que factuellement juste, **reformulait des règles publiques** déjà présentes sur service-public.fr / urssaf.fr → faible différenciation aux yeux de Google.
- Signal aggravant : **10 articles publiés le même jour** (motif de production en masse).

**✅ Correctif engagé — enrichissement éditorial (27/07/2026) :** **8 articles sur 10** réécrits en profondeur, tous dotés d'une **infographie SVG inline** :
| Article | Avant | Après | Infographie SVG |
|---|---|---|---|
| `indemnite-licenciement-calcul.html` | 539 mots | **2 231** | Barres : indemnité selon l'ancienneté (rupture de pente à 10 ans) |
| `heures-supplementaires-majoration.html` | 613 mots | **1 789** | Barres empilées : net réel heure normale vs heure sup |
| `periode-essai-regles.html` | 611 mots | **1 841** | Frise chronologique du cas Julien |
| `solde-tout-compte.html` | 600 mots | **1 750** | Maquette de décompte + 3 lignes à vérifier |
| `conges-payes-calcul.html` | 636 mots | **1 680** | Calendrier ouvrables vs ouvrés (piège du samedi) |
| `prime-precarite-cdd.html` | 544 mots | **1 624** | Cascade des deux 10 % (précarité → congés payés) |
| `ticket-restaurant-2026.html` | 697 mots | **1 445** | Barres : coût employeur TR vs augmentation |
| `arret-maladie-indemnites.html` | 605 mots | **2 365** | Aire en escalier : couverture 0 % / 49 % / 90 % sur 15 jours |
| `mutuelle-entreprise-obligatoire.html` | 657 mots | **2 281** | Barres horizontales : coût réel mutuelle collective vs individuelle |
| `prime-interessement-participation.html` | 787 mots | **2 092** | Barres empilées : toucher la prime (904 €) vs placer sur PEE (1 966 €) |

**✅ Lot du 30/06 terminé (28/07/2026) — 10 articles sur 10 enrichis.** Poursuite hors lot, par blocs de 3 :

| Article | Avant | Après | Infographie SVG |
|---|---|---|---|
| `reduction-impot-dons.html` | 708 mots | **2 025** | Barres empilées : part État / part donateur sur un don de 2 500 € |
| `changement-situation-impots.html` | 803 mots | **2 251** | Barres : impôt en déclarations séparées vs commune (écart 6 810 €) |
| `calcul-are-chomage.html` | 896 mots | **1 950** | Frise : les 3 différés (7 + 13 + 43 j) avant le 1<sup>er</sup> versement |
| `cout-augmentation-employeur.html` | 832 mots | **1 879** | Barre empilée : où vont les 435 € dépensés par l'employeur |
| `deductions-impots-maison.html` | 965 mots | **2 127** | Barres : crédit d'impôt / reste à charge sur services à domicile |
| `statut-freelance-2026.html` | 947 mots | **2 094** | Barres : 717 € en micro vs 505 € en portage sur 1 000 € facturés |
| `calculer-salaire-net-2025.html` | 934 mots | **1 835** | Barre empilée brut → net, avec le net imposable en repère |
| `deductions-impots-enfants.html` | 1 005 mots | **2 144** | Barres : gain réel par enfant selon le revenu, butant sur le plafond |
| `decoder-fiche-paie.html` | 958 mots | **2 119** | Barre empilée : à quoi servent les 650 € de cotisations |
| `guide-frais-reels-deductibles.html` | 1 259 mots | **2 276** | Barres : abattement 10 % vs frais réels (+3 088 € de déduction) |
| `rupture-conventionnelle-negociation.html` | 1 143 mots | **2 120** | Barre empilée : 12 000 € négociés → 11 302 € en poche |
| `optimiser-prelevement-source.html` | 1 033 mots | **1 972** | Barres : 1 440 € prélevés sans modulation vs 360 € avec |
| `frais-kilometriques-impots.html` | 1 010 mots | **1 926** | Barres : seuil de bascule en km selon le salaire |

### ✅ ENRICHISSEMENT TERMINÉ — 23 articles sur 23 (28/07/2026)
Contrôle final `check.ps1` sur l'ensemble du dossier `articles/` : **23/23 articles ont 3 blocs JSON-LD valides** (Article + BreadcrumbList + FAQPage), **une infographie SVG bien formée**, aucun mojibake et un `<head>` SEO complet. Moyenne ≈ **2 000 mots**. Seul `ticket-restaurant-2026.html` (1 445 mots) reste légèrement sous la cible de 1 500 — marginal, à reprendre si l'occasion se présente.

**➡️ La phase éditoriale est close. Passer à la §12 (feuille de route SEO & revenus).**

**🎨 Choix assumé : infographies SVG inline, PAS de photos.** Motif : le refus vise le contenu *informatif*, qu'une photo d'illustration n'améliore pas ; le site n'a **aucun fichier binaire** (chargement instantané sur mobile, majorité du trafic) et il n'y a pas de build system pour optimiser des images. Le SVG inline coûte **0 requête réseau**, reste net sur tout écran, suit la charte (`#1A5CFF` / `#0B1D3A`) et **porte une information**. Conventions : `<figure class="figure">` + `viewBox` + `role="img"` + `<title>`/`<desc>` (accessibilité et lecture par les robots) + `<figcaption>`. CSS `.figure` à ajouter au `<style>` de l'article. ⚠️ **Accents obligatoires dans les libellés SVG** comme partout ailleurs.

**🧭 Méthode d'enrichissement (validée, à répliquer)** — c'est ce qui crée la valeur unique que Google réclame :
1. **Cas concrets chiffrés nominatifs** (ex. « Julien, technicien, 2 400 € brut » → calcul complet aboutissant à 1 920 € d'indemnité) ;
2. **Le chiffrage du gain réel en poche** + comparaison avec l'alternative (ex. titres-restaurant = 1 307 € net/an, contre 2 671 € de coût employeur pour la même somme via une augmentation) — c'est l'ADN du site ;
3. **Pièges et subtilités peu couverts ailleurs** (déduction du CDD/stage sur la période d'essai, jours de fractionnement, ouvrables vs ouvrés, cascade prime de précarité → congés payés, contrepartie de non-concurrence oubliée) ;
4. **Section « erreurs fréquentes »** (5-6 items) ;
5. **FAQ de 5-6 questions** + bloc JSON-LD `FAQPage` correspondant (bonus rich snippets) ;
6. **Liens contextuels vers les calculateurs** du site — le seul actif réellement unique ;
7. Mettre à jour l'en-tête « Mis à jour le JJ/MM/AAAA • N min de lecture » **et** ajouter `"dateModified"` au JSON-LD `Article` ;
8. **Une infographie SVG** portant le chiffre-clé de l'article.

**🔍 Vérifier les chiffres avant publication.** Plusieurs valeurs « connues » se sont révélées périmées lors de cette passe — voir §8. Toujours confirmer à la source les coefficients et plafonds avant de les écrire ; c'est précisément l'actualité des chiffres qui différencie le site des pages concurrentes.

**⚙️ Script de contrôle :** `check.ps1` (scratchpad) vérifie en un appel, pour une liste d'articles : nombre de mots du texte visible, validité de chaque bloc JSON-LD, bonne formation XML de chaque SVG, absence de mojibake et présence des 5 éléments de `<head>` (AdSense, canonical, OG, favicon, manifest). ⚠️ Le script est **volontairement en ASCII pur** : PowerShell 5.1 lit les `.ps1` sans BOM en ANSI et corromprait tout littéral accentué (le motif de détection de mojibake compris).

**🔬 Limite connue — pas de vérification visuelle possible.** Le navigateur intégré refuse les URL `file://` sans approbation manuelle par action, et Python n'est pas installé (seul le shim du Microsoft Store) : impossible de lancer un serveur local ou de faire une capture d'écran d'une page avant déploiement. **Conséquence pratique :** un SVG ne peut être validé que par (1) contrôle XML de bonne formation via `[xml]` en PowerShell et (2) vérification arithmétique des coordonnées — hauteurs de barres proportionnelles à l'échelle, `text-anchor` cohérent avec les centres, libellés dont la largeur estimée (≈ 0,55 × taille de police × nb de caractères) ne chevauche pas l'élément voisin. Cette méthode a déjà rattrapé une collision de libellés, mais elle ne remplace pas un œil humain : **demander à l'utilisateur de contrôler le rendu après déploiement**.

**⚠️ Règle de publication à respecter désormais :** ne **plus jamais publier en lot** (2-3 articles/semaine maximum). Cette règle vise la **création** d'articles neufs, **pas l'enrichissement** de pages existantes — améliorer 7 articles le même jour n'envoie aucun signal négatif, et laisser le site à moitié enrichi pendant des semaines fait courir le risque d'un nouveau refus. Privilégier l'approfondissement à la création.

**📌 Plus aucun article à enrichir.** Les 23 sont traités (voir l'encadré ci-dessus). Le prochain chantier est en **§12**.

**⚙️ Deux méthodes d'enrichissement, selon l'état de l'article :** si le contenu existant est faible ou mal structuré → **réécriture complète du fichier** (`Write`). Si le contenu est déjà juste et bien découpé (cas de `deductions-impots-maison` et `statut-freelance-2026`) → **`Edit` ciblés** : dateModified + bloc FAQPage dans le `<head>`, CSS `.figure`, insertion du SVG et des 2-3 sections neuves, puis « erreurs fréquentes » + FAQ avant le CTA. Nettement plus économe et sans risque de perdre du contenu correct. Le lot du 30/06 étant complet, la resoumission AdSense est possible dès maintenant ; poursuivre l'enrichissement en parallèle ne peut que renforcer le dossier.

**⚙️ Cadence validée par l'utilisateur (28/07/2026) : blocs de 3 articles par session.** Séquence appliquée à chaque article : lire le corps existant → vérifier les chiffres à la source → réécrire le fichier entier (`Write`) avec cas chiffré nominatif + SVG + tableau + erreurs fréquentes + FAQ/JSON-LD → `check.ps1` → commit groupé. Compter ~2 000 mots par article produit.

### Historique — correctif crawlabilité (précédent refus)
- **Contexte :** L'ancienne alerte "Contenu à faible valeur informative" datait de l'époque où le site n'avait que **3 articles**. Elle est **périmée** : le site compte désormais **23 articles + 10 outils + 3 pages légales**, le SEO technique est complet (canonical, OG, sitemap, ads.txt) et AdSense est sur **toutes les pages** (38/38 vérifié).
- **À NE PAS refaire :** ne plus traiter le site comme du "Thin Content" — diagnostic périmé, le contenu est largement suffisant.
- **🔎 Vraie cause probable du refus = CRAWLABILITÉ, pas le contenu :** la **nav est injectée en JS** (`nav.js`) et la **liste d'articles de `articles.html` est rendue en JS** (`articles.js` remplit un `<div id="articles-container">` vide). Un robot qui n'exécute pas JS ne voyait donc **aucun lien statique vers ~la moitié des articles** (seuls ~9 étaient en cartes `<a href>` sur l'accueil).
- **✅ Correctif crawlabilité (voir priorité SEO §9) :** bloc statique « Plan du site » ajouté aux footers de `index.html` et `articles.html` → **les 23 articles + 10 outils sont désormais atteignables en HTML pur**, sans JS.
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

### ✅ Audit global pré-resoumission AdSense (15/07/2026)
Contrôle complet des 38 pages + calculateurs :
- **Technique (38/38)** : AdSense, canonical, OG, favicon, manifest, theme-color, meta description, liens légaux — tout présent partout. Sitemap = correspondance 1:1 avec les fichiers (0 fantôme). JSON-LD tous valides. Aucune unité pub `<ins>` vide (Auto Ads only → pas d'emplacement trompeur). `BreadcrumbList` ajouté à `articles.html` (manquait).
- **Calculateurs vérifiés** : brut→net (22/25/15/35/48 %) ✅ · coût employeur (13/5,25/8,55/4,72/4,05/2,5 %) ✅ · prime ✅ · rupture (¼-⅓, 6 PASS) ✅ · ARE (13,18/32,13) ✅ · frais réels/km (495/14 426, repas 5,45) ✅.
- **2 corrections appliquées** : taux micro du TJM (obsolètes pré-2022 → taux 2026) et tranches `calcImpot()` (arrondis → barème officiel). Détail en §8.
- **Reste côté utilisateur** : activer le message RGPD (CMP Google certifié) dans AdSense → Confidentialité et messages, attendre 24-48 h, puis resoumettre.

---

## 🚀 12. Feuille de route SEO & revenus — À FAIRE APRÈS L'ENRICHISSEMENT DES 23 ARTICLES

> Établie le 28/07/2026 à la demande de l'utilisateur. **Ne pas démarrer ces chantiers tant que les 4 derniers articles ne sont pas enrichis** (liste en §9), sauf la resoumission AdSense qui est possible dès maintenant.

### 💶 Attentes de revenus — chiffres à ne pas gonfler
Revenu AdSense = `(pages vues ÷ 1000) × RPM`. Pour de la finance personnelle en français, trafic majoritairement mobile : **RPM de 4 à 8 €** sur les articles, **2 à 5 €** sur les pages d'outils (l'utilisateur calcule son net et repart en 40 s → peu d'impressions). Le marché français rapporte environ deux fois moins que l'anglophone.

| Pages vues / mois | Revenu mensuel réaliste |
|---|---|
| 5 000 | 20 – 35 € |
| 20 000 | 80 – 140 € |
| 50 000 | 200 – 350 € |
| 100 000 | 400 – 700 € |

**Trajectoire plausible :** 20-150 €/mois la première année ; quelques centaines d'euros à horizon 2-3 ans. Seuil de versement AdSense : **70 €** (donc paiement tous les 2-3 mois au début). ⚠️ **Ne jamais promettre mieux à l'utilisateur** : son objectif est un revenu passif, et une estimation optimiste lui ferait prendre de mauvaises décisions.

### 📋 Chantiers par ordre de rapport effort/impact

1. **🔴 Resoumettre à AdSense.** Tant que ce n'est pas fait, le revenu est nul quoi qu'on écrive. Possible dès maintenant (lot du 30/06 complet).
2. **📊 Google Search Console — 🔴 DIAGNOSTIC DU 25/08/2026 : LE SITEMAP N'A JAMAIS ÉTÉ SOUMIS.** Constat GSC : **8 URL connues de Google sur 38** (7 indexées + 1 en double), 642 impressions et 3 clics sur 3 mois, **position moyenne 29,5**. Cause identifiée : dans *Indexation → Sitemaps*, **aucun sitemap n'était déclaré**. Le fichier existe pourtant, est valide et est référencé dans `robots.txt` — mais un `robots.txt` ne fait que l'*autoriser*, il ne le soumet pas. Sans soumission, Google découvre les pages une par une au fil des liens, d'où les 30 pages jamais détectées.
   - **✅ RÉGLÉ le 25/08/2026 :** sitemap soumis via pilotage du navigateur. Résultat immédiat en console : `/sitemap.xml` · état **« Opération effectuée »** · **38 pages découvertes** (contre 8 URL connues auparavant). Le sitemap est apparu dans la seconde comme source de découverte lors des inspections d'URL suivantes.
   - **✅ Indexations demandées manuellement** (file d'exploration prioritaire) : `articles/calculer-salaire-net-2025.html`, `articles.html` et `articles/indemnite-licenciement-calcul.html`. Déjà indexées et donc laissées de côté : `/simulateur-salaire/`, `guide-frais-reels-deductibles.html`, `decoder-fiche-paie.html`.
   - ⚠️ **Quota atteint après 3 demandes** — la 4<sup>e</sup> (`rupture-conventionnelle-negociation.html`, que Google « ne reconnaissait pas » du tout) a renvoyé « Un problème est survenu ». Le quota d'indexation manuelle est bien plus bas que les ~10/jour souvent annoncés. **Ne pas réessayer en boucle** : reprendre le lendemain, quelques URL à la fois. Avec le sitemap désormais actif, cette étape manuelle n'est de toute façon plus qu'un accélérateur.
   - **⚠️ La « page non indexée » n'est PAS un défaut à corriger.** Motif = « page en double / canonique ». Vérifié le 25/08/2026 : les 5 pages `index.html` déclarent toutes un canonical vers la version **avec slash final** (`/simulateur-salaire/` et non `/simulateur-salaire/index.html`), et **aucun lien interne n'émet vers une variante `index.html`** (dans `nav.js`, ces chaînes sont des `patterns` de détection de page active, pas des `href`). GitHub Pages sert le même contenu aux deux URL ; Google explore la variante, lit le canonical et regroupe. **C'est le comportement attendu — ne rien « corriger » ici**, ce serait contre-productif.
   - **⚠️ Ne pas réécrire les titres/méta pour améliorer le CTR tant que la position moyenne est ~30.** Un CTR de 0,5 % en page 3 est normal (le CTR attendu y est de 0,3 à 0,5 %). Le problème est la **position**, pas l'accroche. Le levier réel reste les **liens entrants** (point 5).
   - Une fois le sitemap soumis et l'indexation remontée, exploiter enfin : requêtes en position 5-20 (gains les plus rapides), puis pages à fortes impressions et faible CTR.
3. **🎯 Bloc `tool-seo` sur `/simulateur-salaire/`.** La page la plus stratégique du site — l'outil principal, cible de « salaire brut net » — est la **seule sans bloc `tool-seo`**, alors que 8 autres outils en ont un. Meilleur rapport effort/impact du moment, faisable en une session.
4. **🔍 Longue traîne.** Le tableau brut → net de `calculer-salaire-net-2025.html` est le modèle : il vise « 2500 brut en net », « 3000 brut en net »… Volume énorme, intention parfaite. ⚠️ **Ne jamais générer des pages quasi identiques en série** — c'est précisément ce que Google sanctionne comme pages satellites. Pages substantielles uniquement.
5. **🔗 Liens entrants — le vrai goulot d'étranglement.** Le site n'en a probablement aucun ; c'est ce qui le sépare des concurrents installés, bien plus que le contenu. Les **calculateurs gratuits sont le meilleur actif** pour en obtenir (un outil se cite naturellement). Pistes : forums droit du travail et freelance, communautés françaises, associations de salariés, comptables. Non automatisable, fastidieux, mais c'est le facteur limitant.
6. **👤 E-E-A-T / YMYL — angle non exploité.** Le contenu fiscal et salarial est classé **YMYL** (« Your Money or Your Life ») par Google, qui lui applique une exigence supérieure sur l'expertise. Or le site est signé « Aide Salariés », entité sans visage. À créer : une page « Qui sommes-nous » avec le nom de **Chapey Rémi**, son parcours et sa légitimité sur ces sujets, + une signature d'auteur en bas d'article + `"author"` nommé dans le JSON-LD. Une heure de travail, effet direct sur un critère d'évaluation. **Ce n'est pas cosmétique sur cette catégorie de contenu.**

### 💡 Idée écartée pour l'instant : conseil en investissement / affiliation
L'utilisateur a envisagé (28/07/2026) d'ajouter du conseil en investissement avec des liens d'affiliation (type Trade Republic). **Écarté pour le moment**, pour trois raisons : (a) le **conseil en investissement financier est une activité réglementée** (statut CIF, immatriculation ORIAS, association agréée AMF) — la frontière est entre *pédagogie* (autorisée) et *recommandation personnalisée* (interdite sans statut) ; (b) introduire de l'affiliation **avant** la validation AdSense est exactement le profil que l'examinateur écarte ; (c) l'audience (« 2500 brut en net ») a une intention très faible d'ouvrir un compte-titres.

**Le pont qui reste valable, à ouvrir APRÈS la validation :** une verticale « épargne et fiscalité du patrimoine » qui prolonge le site sans le dénaturer — PEA vs assurance-vie vs PER (fiscalité comparée), ce que la déduction PER rapporte selon la tranche, PFU 30 % ou barème. Ces sujets parlent d'**enveloppes fiscales**, pas de placements : aucun risque réglementaire, et ils prolongent directement `prime-interessement-participation.html`. Zéro affiliation au départ.

---

## 📈 13. Détail des leviers SEO (base technique)

### 🎯 Priorité : LE RÉFÉRENCEMENT (SEO organique)
Tout le trafic est organique (aucune campagne payante). La base technique est saine (canonical, OG, sitemap, mobile-first, pages légères). Leviers par ordre d'impact :

1. **✅ Fait (29/06/2026) — Données structurées `FAQPage`** : les FAQ des 8 pages d'outils (questions en `<h3>` + réponses) sont balisées en JSON-LD `FAQPage` → éligibles aux **rich snippets** (questions dépliables dans Google). Le balisage est généré depuis le texte visible (règle Google) ; tous les JSON validés. Les sous-titres de `simulateur-prime.html` et `rupture-conventionnelle.html` ont été **reformulés en questions** → ces 2 pages passent de 1 à **5 questions** chacune. **Convention à suivre : rédiger les `<h3>` des blocs `tool-seo` sous forme de questions** pour qu'ils alimentent le FAQPage.
2. **✅ Fait (29/06/2026) — `BreadcrumbList`** : fil d'Ariane JSON-LD sur **23 pages** — outils (`Accueil › [Outil]`, 2 niveaux) et articles (`Accueil › Articles › [Titre]`, 3 niveaux). L'accueil (racine) n'en a pas, c'est normal.
3. **✅ Fait (29/06/2026) — Maillage interne** : chaque page d'outil (les 10) a désormais un bloc `<section class="related-articles">` « Pour aller plus loin » avec 2 articles pertinents (styles inline via variables CSS, fonctionne aussi sur `simulateur-salaire/index.html` qui ne charge pas `tools.css`). Les articles liaient déjà vers les outils (1 à 5 liens chacun). **Le maillage outil ↔ article est maintenant bidirectionnel.** Mapping outil→articles dans `related.pl` (scratchpad).
4. **✅ Fait — Crawlabilité / plan du site statique (correctif refus AdSense)** : bloc `<nav aria-label="Plan du site">` en HTML pur ajouté aux footers de `index.html` et `articles.html` (au-dessus des liens légaux). Il liste **les 10 outils + les 23 articles** groupés par thème, en `<a href>` statiques → le robot trouve toutes les pages sans exécuter de JS. Généré par `plan.pl` (data-driven depuis `articles.js`, groupé par `category`). ⚠️ **À régénérer/compléter à chaque nouvel article** (sinon le nouvel article n'est atteignable que via JS). Au passage : branding obsolète « Convertisseur Brut-Net » de `articles.html` (title + og:title + footer) corrigé en « Aide Salariés ». Les cartes de l'accueil étaient déjà de vrais `<a href>` (vérifié).
4 bis. **✅ Fait (25/08/2026) — `lastmod` du sitemap réalignés sur les dates réelles.** Les 38 URL annonçaient encore des dates de **juin** alors que les 23 articles avaient tous été réécrits fin juillet ; `optimiser-prelevement-source.html` affichait même `2025-08-08`, soit **un an de retard**. Or Google se sert de `lastmod` pour prioriser le recrawl : une date périmée lui dit « rien de neuf, ne reviens pas ». Corrigé via `fixlastmod.pl` (scratchpad), qui prend la date du **dernier commit git** touchant chaque fichier — jamais la date du jour, qui serait un faux signal. ⚠️ **À rejouer après chaque vague de modifications**, sinon le contenu enrichi reste invisible. ⚠️ Piège du script : un `local $/;` en portée fichier neutralise `chomp` pour tout le reste du programme → retours à la ligne injectés dans les balises (corrigé).
5. **Cibler la longue traîne** (à faire — nécessite tes mots-clés cibles) — créer/optimiser des pages sur des requêtes précises à faible concurrence (ex. « salaire net 2500 brut », « indemnité rupture conventionnelle 10 ans d'ancienneté »). Intention de recherche claire = conversion outil.
6. **`tool-seo` ~600 mots** sous les outils encore "nus" : utile pour le SEO de la page outil (texte indexable + mots-clés), pas pour AdSense (réglé). NB : 8 pages outils ont déjà un bloc `tool-seo`.

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
| Mentions légales | `mentions-legales.html` | Éditeur = **Chapey Rémi**, hébergeur = **GitHub Pages / Microsoft**, propriété intellectuelle, droit applicable. **Contact = email `chapey.remi01@gmail.com`** exposé au §1 Éditeur (+ lien page contact) |
| Contact | `contact.html` | **Email de contact affiché** en méthode principale : `chapey.remi01@gmail.com` (lien `mailto:`). Le faux formulaire « en cours d'activation » a été retiré (il ne fonctionnait pas → problème AdSense). |

> ⚠️ **Règle email (MISE À JOUR — inversée par l'utilisateur, contexte AdSense) :** l'adresse de contact publique est **`chapey.remi01@gmail.com`** (noter le `01`). Elle **doit** apparaître sur `contact.html` et dans les mentions légales (§1 Éditeur) — un moyen de contact réel et visible est **éliminatoire pour AdSense**. ⚠️ Ne pas confondre avec `chapey.remi@gmail.com` (l'email du compte, à ne pas publier). L'ancienne consigne « ne jamais afficher d'email, renvoyer au formulaire » est **caduque**.

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
