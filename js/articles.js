// js/articles.js
const articles = [
  {
    title: "Intéressement et participation 2026 : fonctionnement, fiscalité, PEE",
    slug: "prime-interessement-participation",
    date: "2026-06-30",
    category: "salaire",
    excerpt: "Toucher la prime en cash ou la placer sur un PEE ? Abondement, blocage 5 ans, CSG-CRDS et exonération d'impôt : la bonne stratégie pour votre épargne salariale.",
    readingTime: "8 min",
    link: "/articles/prime-interessement-participation.html"
  },
  {
    title: "Ticket-restaurant 2026 : montant max, règles et fiscalité",
    slug: "ticket-restaurant-2026",
    date: "2026-06-30",
    category: "salaire",
    excerpt: "Valeur faciale optimale, part employeur (50 à 60 %), exonération à 7,26 €, plafond de 25 €/jour : tout pour profiter au mieux de vos titres-restaurant.",
    readingTime: "7 min",
    link: "/articles/ticket-restaurant-2026.html"
  },
  {
    title: "Mutuelle d'entreprise obligatoire : ce que l'employeur doit payer",
    slug: "mutuelle-entreprise-obligatoire",
    date: "2026-06-30",
    category: "salaire",
    excerpt: "Participation minimale de 50 %, cas de dispense, portabilité après le départ et impact sur le net imposable : le guide de la complémentaire santé collective.",
    readingTime: "7 min",
    link: "/articles/mutuelle-entreprise-obligatoire.html"
  },
  {
    title: "Congés payés : calcul, acquisition et indemnité",
    slug: "conges-payes-calcul",
    date: "2026-06-30",
    category: "salaire",
    excerpt: "2,5 jours par mois, règle du dixième vs maintien de salaire, acquisition pendant un arrêt maladie et indemnité compensatrice : tout comprendre à vos congés.",
    readingTime: "8 min",
    link: "/articles/conges-payes-calcul.html"
  },
  {
    title: "Heures supplémentaires : majoration, exonération d'impôt, contingent",
    slug: "heures-supplementaires-majoration",
    date: "2026-06-30",
    category: "salaire",
    excerpt: "Majoration 25 %/50 %, exonération d'impôt jusqu'à 7 500 €/an (case 1GH), réduction de cotisations et contingent de 220 h : combien rapportent vraiment vos heures sup.",
    readingTime: "7 min",
    link: "/articles/heures-supplementaires-majoration.html"
  },
  {
    title: "Arrêt maladie : IJSS, délai de carence et maintien de salaire",
    slug: "arret-maladie-indemnites",
    date: "2026-06-30",
    category: "salaire",
    excerpt: "Délai de carence de 3 jours, indemnités journalières à 50 %, maintien de salaire employeur (90 % puis 66 %) et subrogation : quel revenu pendant un arrêt ?",
    readingTime: "8 min",
    link: "/articles/arret-maladie-indemnites.html"
  },
  {
    title: "Solde de tout compte : contenu, reçu et comment le contester",
    slug: "solde-tout-compte",
    date: "2026-06-30",
    category: "chomage",
    excerpt: "Ce que doit contenir le solde de tout compte, la valeur du reçu, le délai de 6 mois pour le contester et les postes à vérifier avant de signer.",
    readingTime: "7 min",
    link: "/articles/solde-tout-compte.html"
  },
  {
    title: "Indemnité de licenciement 2026 : calcul légal et fiscalité",
    slug: "indemnite-licenciement-calcul",
    date: "2026-06-30",
    category: "chomage",
    excerpt: "Formule 1/4 et 1/3 de mois par année d'ancienneté, salaire de référence, exonération d'impôt et différence avec la rupture conventionnelle. Exemple chiffré.",
    readingTime: "8 min",
    link: "/articles/indemnite-licenciement-calcul.html"
  },
  {
    title: "Période d'essai : durée légale, renouvellement et rupture",
    slug: "periode-essai-regles",
    date: "2026-06-30",
    category: "salaire",
    excerpt: "Durée max (2, 3 ou 4 mois), conditions strictes de renouvellement, délai de prévenance et règles de rupture côté salarié et employeur : tout sur la période d'essai.",
    readingTime: "7 min",
    link: "/articles/periode-essai-regles.html"
  },
  {
    title: "Prime de précarité (CDD) : qui y a droit, calcul et exceptions",
    slug: "prime-precarite-cdd",
    date: "2026-06-30",
    category: "chomage",
    excerpt: "10 % de la rémunération brute, mais pas toujours : CDI refusé, saisonnier, faute, rupture par le salarié… Tous les cas où la prime de précarité n'est pas due.",
    readingTime: "6 min",
    link: "/articles/prime-precarite-cdd.html"
  },
  {
    title: "Décoder sa fiche de paie 2026 : toutes les lignes expliquées",
    slug: "decoder-fiche-paie",
    date: "2026-06-29",
    category: "salaire",
    excerpt: "Brut, net imposable, net à payer, CSG/CRDS, retraite complémentaire (case 1AJ) : comprenez chaque ligne de votre bulletin de salaire avec des exemples chiffrés.",
    readingTime: "8 min",
    link: "/articles/decoder-fiche-paie.html"
  },
  {
    title: "Combien coûte une augmentation à l'employeur en 2026 ?",
    slug: "cout-augmentation-employeur",
    date: "2026-06-29",
    category: "salaire",
    excerpt: "+200 € brut, combien ça coûte réellement à l'entreprise ? Et combien de plus sur le compte du salarié ? Charges patronales, réduction Fillon et alternatives (PPV, intéressement).",
    readingTime: "7 min",
    link: "/articles/cout-augmentation-employeur.html"
  },
  {
    title: "Rupture conventionnelle 2026 : calcul de l'indemnité et stratégie de négociation",
    slug: "rupture-conventionnelle-negociation",
    date: "2026-06-29",
    category: "chomage",
    excerpt: "Formule légale art. L.1237-13, salaire de référence optimal, exonération fiscale (6 PASS = 282 600 €), ARE après la rupture et leviers de négociation au-delà du minimum.",
    readingTime: "9 min",
    link: "/articles/rupture-conventionnelle-negociation.html"
  },
  {
    title: "Dons aux associations 2026 : réduction d'impôt 66 % et 75 % (avec les cases)",
    slug: "reduction-impot-dons",
    date: "2026-06-26",
    category: "fiscalite",
    excerpt: "Dons à 66 % ou 75 %, plafonds, cotisations syndicales (7AC), partis politiques : tout récupérer sur vos dons, avec le numéro de case exact (7UD, 7UF).",
    readingTime: "8 min",
    link: "/articles/reduction-impot-dons.html"
  },
  {
    title: "Mariage, naissance, déménagement : déclarer un changement de situation aux impôts",
    slug: "changement-situation-impots",
    date: "2026-06-26",
    category: "fiscalite",
    excerpt: "Mariage, PACS, divorce, naissance, décès, déménagement : les démarches, les délais (60 jours) et les cases pour ajuster votre impôt en temps réel.",
    readingTime: "9 min",
    link: "/articles/changement-situation-impots.html"
  },
  {
    title: "Impôts et enfants 2026 : toutes les déductions et crédits (avec les cases)",
    slug: "deductions-impots-enfants",
    date: "2026-06-26",
    category: "famille",
    excerpt: "Frais de garde (7GA), scolarité (7EA/7EC/7EF), pension alimentaire, quotient familial : tous les avantages fiscaux liés aux enfants, avec le numéro de case exact.",
    readingTime: "9 min",
    link: "/articles/deductions-impots-enfants.html"
  },
  {
    title: "Impôts et maison 2026 : toutes les déductions et crédits (avec les cases)",
    slug: "deductions-impots-maison",
    date: "2026-06-26",
    category: "immobilier",
    excerpt: "Emploi à domicile (7DB), jardinage, borne de recharge (7ZQ), travaux, revenus locatifs (4BE) : les avantages fiscaux du logement, case par case.",
    readingTime: "10 min",
    link: "/articles/deductions-impots-maison.html"
  },
  {
    title: "Tutoriel : Tout ce que vous pouvez déduire aux frais réels et comment le déclarer",
    slug: "guide-frais-reels-deductibles",
    date: "2026-06-26",
    category: "fiscalite",
    excerpt: "Transport, repas à 5,45 €, télétravail, double résidence, formations, avocat aux Prud'hommes : la liste complète des frais réels et le tuto déclaration pas-à-pas.",
    readingTime: "9 min",
    link: "/articles/guide-frais-reels-deductibles.html"
  },
  {
    title: "Droits France Travail 2026 : Tout comprendre au calcul de l'ARE",
    slug: "calcul-are-chomage",
    date: "2026-06-20",
    category: "chomage",
    excerpt: "SJR, durée d'indemnisation de 6 à 27 mois, conditions d'inscription : le guide complet sur l'allocation chômage 2026.",
    readingTime: "7 min",
    link: "/articles/calcul-are-chomage.html"
  },
  {
    title: "Micro-entreprise vs Portage salarial : Quel statut choisir en 2026 ?",
    slug: "statut-freelance-2026",
    date: "2026-06-20",
    category: "freelance",
    excerpt: "Tableau comparatif complet : charges, protection sociale, retraite, complexité administrative. Choisissez le bon statut freelance.",
    readingTime: "8 min",
    link: "/articles/statut-freelance-2026.html"
  },
  {
    title: "Barème des Frais Kilométriques 2026 : Optimiser sa déclaration d'impôts",
    slug: "frais-kilometriques-impots",
    date: "2026-06-20",
    category: "fiscalite",
    excerpt: "Barème officiel 2026, calcul des frais réels, impact du télétravail : tout pour optimiser votre déduction fiscale.",
    readingTime: "6 min",
    link: "/articles/frais-kilometriques-impots.html"
  },
  {
    title: "Calculer son salaire net en 2026 : guide complet",
    slug: "calculer-salaire-net-2025",
    date: "2026-06-23",
    category: "salaire",
    excerpt: "Différence brut/net, simulateur, erreurs à éviter et exemples chiffrés simples.",
    readingTime: "8 min",
    link: "/articles/calculer-salaire-net-2025.html"
  },
  {
    title: "Optimiser son prélèvement à la source : 7 leviers concrets",
    slug: "optimiser-prelevement-source",
    date: "2025-08-08",
    category: "fiscalite",
    excerpt: "Ajuster son taux, gérer les acomptes, profiter des déductions et éviter les surprises.",
    readingTime: "7 min",
    link: "/articles/optimiser-prelevement-source.html"
  }
];
