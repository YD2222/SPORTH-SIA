/**
 * Catalogue SPORTHESIA — univers et prestations.
 * Source : cahier des charges client (oct. 2026).
 *
 * Règles :
 * - `priceStatus: "prévisionnel"` → affiché avec la mention « Tarif prévisionnel ».
 * - `bookable: false` → visible mais non réservable en ligne (orientation via Charly).
 * - Aucune technique non validée (Curapuls, radiofréquence, HIFU…) n'est listée comme prestation :
 *   elle apparaît au plus dans `soon` (« Offre à venir » / « Prochainement »), sans prix, durée ni réservation.
 */

export type UniverseSlug = "posture" | "mouvement" | "recuperation" | "silhouette";
export type PriceStatus = "confirmé" | "prévisionnel" | "à confirmer";

export type Faq = { q: string; a: string };

/** Offre future : jamais de prix, de durée, de disponibilité ni de lien de réservation. */
export type Soon = {
  id: string;
  label: "Prochainement" | "Offre à venir";
  title: string;
  /** Phrase d'accroche (facultative). */
  lead?: string;
  paragraphs: string[];
  /** Ligne de clôture discrète. */
  footer?: string;
  cta?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
};

export type InfoBlock = { title: string; items: string[] };

export type Service = {
  id: string;
  universe: UniverseSlug | "body-360";
  name: string;
  /** Bénéfice formulé avec prudence. */
  summary: string;
  durationMin: number | null;
  durationLabel: string;
  price: number | null;
  priceLabel: string;
  priceStatus: PriceStatus;
  bookable: boolean;
  /** Nombre de places par créneau (cours collectifs). */
  capacity: number;
  kind: "séance" | "cours" | "forfait";
  /** Pour un forfait : prestation dont on réserve la première séance. */
  bookAs?: string;
  seller: string;
  resources: { room: string; equipment?: string };
  forWhom: string[];
  steps: string[];
  preparation?: string[];
  precautions: string[];
  /** Libellé du bouton de réservation, si différent du libellé par défaut. */
  ctaLabel?: string;
  /** Information de sécurité propre au dispositif (silhouette, appareils). */
  safety?: string[];
  faq?: Faq[];
};

export type Universe = {
  slug: UniverseSlug;
  name: string;
  title: string;
  /** Phrase courte des cartes d'accueil. */
  cardLine: string;
  hook: string;
  intro: string[];
  conclusion: string;
  cta: string;
  homeCta: string;
  image: string;
  imageAlt: string;
  detailImage: string;
  detailImageAlt: string;
  keywords: string;
  seoTitle: string;
  seoDescription: string;
  /** Mentions non commerciales (techniques à venir, expertises sur indication). */
  notes: string[];
  /** Offres à venir et encarts « Prochainement ». */
  soon?: Soon[];
  /** Blocs d'information pratique (modalités, sécurité…). */
  info?: InfoBlock[];
  faq: Faq[];
};

export const universes: Universe[] = [
  {
    slug: "posture",
    name: "Posture",
    title: "Mieux comprendre son corps",
    cardLine: "Mieux comprendre son corps pour mieux l'accompagner.",
    hook: "Découvrez comment votre corps organise son équilibre.",
    intro: [
      "Notre posture évolue avec notre histoire, nos habitudes, nos mouvements et les contraintes du quotidien.",
      "Raideurs, inconfort, déséquilibres ou perte de mobilité peuvent influencer notre façon de nous tenir et de bouger.",
      "SPORTHESIA propose une approche individualisée pour mieux comprendre son fonctionnement corporel et explorer les possibilités d'amélioration.",
    ],
    conclusion: "Comprendre sa posture, c'est déjà porter un nouveau regard sur son corps.",
    cta: "Réserver mon bilan postural",
    homeCta: "Découvrir la posture",
    image: "/images/posture3.jpg",
    imageAlt: "Personne debout sur une plateforme d'analyse posturale, dans une pièce lumineuse",
    detailImage: "/images/posture.jpg",
    detailImageAlt: "Bilan postural en cours avec un praticien et un écran d'analyse",
    keywords: "bilan postural Paris 7e, analyse posturale, AeroCore, posture",
    seoTitle: "Bilan postural AeroCore™ à Paris 7e",
    seoDescription:
      "Bilan postural AeroCore™ de 60 minutes à Paris 7e : évaluation individualisée, restitution et dispositif personnel inclus (200 €). Séance de suivi postural.",
    notes: [
      "Le recours à des évaluations complémentaires spécialisées, notamment Clinique OPS, pourra être envisagé lorsque cela est pertinent, sans être systématique.",
    ],
    faq: [
      {
        q: "Faut-il une prescription pour réserver un bilan postural ?",
        a: "Non. Le bilan postural AeroCore™ est une prestation autonome, non conventionnée, que vous pouvez réserver directement en ligne.",
      },
      {
        q: "Le bilan postural est-il remboursé ?",
        a: "Il s'agit d'une prestation non conventionnée. Certaines mutuelles peuvent proposer une participation : renseignez-vous auprès de la vôtre, aucune prise en charge n'est garantie.",
      },
      {
        q: "Quelle différence avec le bilan BODY 360 ?",
        a: "Le bilan postural AeroCore™ (200 €) est une prestation distincte, centrée sur la posture et l'équilibre. Les bilans ANOVATOR et BODY 360 portent sur les mesures et la composition corporelle. Aucun bilan n'est obligatoire pour réserver les autres prestations.",
      },
      {
        q: "Le bilan corrige-t-il ma posture ?",
        a: "Le bilan vous aide à mieux comprendre l'organisation de votre équilibre corporel. Il ne promet pas de correction universelle ni de résultat garanti : il constitue une première étape pour envisager un accompagnement adapté.",
      },
    ],
  },
  {
    slug: "mouvement",
    name: "Mouvement",
    title: "Le plaisir de bouger à nouveau",
    cardLine: "Retrouver le plaisir de bouger, à son rythme.",
    hook: "Bougez à votre rythme, entretenez vos capacités.",
    intro: [
      "Le mouvement fait partie de notre équilibre.",
      "Pourtant, le manque de temps, l'inactivité, certaines appréhensions ou les changements liés à l'âge peuvent progressivement nous éloigner de l'activité physique.",
      "Chez SPORTHESIA, il n'est pas question de performance à tout prix. L'objectif est de retrouver le plaisir de bouger, de développer ses capacités et d'avancer dans un cadre adapté à chacun.",
    ],
    conclusion: "Il n'est jamais trop tard pour retrouver le plaisir de bouger.",
    cta: "Voir les cours disponibles",
    homeCta: "Découvrir le mouvement",
    image: "/images/mouvement2.jpg",
    imageAlt: "Petit groupe en séance d'étirements au sol dans un studio lumineux",
    detailImage: "/images/mouvement.jpg",
    detailImageAlt: "Trois personnes réalisant un étirement assis, à la lumière naturelle",
    keywords: "cours collectif petit groupe Paris 7e, mobilité, renforcement, activité physique adaptée",
    seoTitle: "Cours en petit groupe (4 max) à Paris 7e — mobilité, renforcement",
    seoDescription:
      "Cours collectifs de 55 minutes limités à 4 participants à Paris 7e : mobilité, renforcement, équilibre. 35 € la séance, carnet de 5 séances 175 €.",
    notes: [
      "Les séances pourront être encadrées par un professionnel qualifié en activité physique adaptée, notamment pour des adultes souhaitant reprendre une activité progressivement.",
    ],
    soon: [
      {
        id: "seances-individuelles",
        label: "Offre à venir",
        title: "Séances individuelles",
        paragraphs: ["Un accompagnement en tête-à-tête, à votre rythme. Tarifs et intervenants communiqués prochainement."],
      },
    ],
    info: [
      {
        title: "S'inscrire à un cours",
        items: [
          "Choisissez un créneau en ligne : le nombre de places restantes est indiqué (4 participants maximum).",
          "Arrivez 5 minutes en avance pour un court échange sur votre forme du jour.",
          "Annulation ou report : selon les conditions indiquées avant validation.",
        ],
      },
      {
        title: "Carnets de séances",
        items: [
          "Carnet de 5 séances : 175 €, soit 35 € la séance, sans remise.",
          "Carnet de 10 séances : 350 €, soit 35 € la séance, sans remise.",
          "Durée de validité et transférabilité : précisées avant paiement.",
        ],
      },
      {
        title: "Tenue et accessibilité",
        items: [
          "Tenue confortable, bouteille d'eau, serviette. Tapis et matériel fournis.",
          "Exercices adaptés à votre condition physique, quel que soit votre point de départ.",
          "Signalez toute limitation ou reprise après blessure : l'encadrant adapte la séance.",
        ],
      },
    ],
    faq: [
      {
        q: "Faut-il un bon niveau pour participer ?",
        a: "Non. Les cours sont limités à quatre participants pour que chacun avance à son rythme, quel que soit son point de départ.",
      },
      {
        q: "Le carnet de cinq séances est-il une remise ?",
        a: "Non : le carnet est un format pratique au même tarif de 35 € par séance. Il vous évite de régler chaque cours séparément.",
      },
      {
        q: "Puis-je prêter mon carnet ?",
        a: "Les conditions de transfert et la durée de validité des carnets vous sont indiquées avant paiement.",
      },
      {
        q: "Que dois-je apporter ?",
        a: "Une tenue confortable, une bouteille d'eau et une serviette. Les tapis et le matériel sont fournis.",
      },
    ],
  },
  {
    slug: "recuperation",
    name: "Récupération",
    title: "S'accorder du temps pour soi",
    cardLine: "Prendre le temps de récupérer et de se ressourcer.",
    hook: "Accordez à votre corps le temps de récupérer.",
    intro: [
      "Nos activités, nos efforts, notre environnement et le rythme de la vie quotidienne sollicitent constamment notre corps.",
      "Prendre le temps de récupérer, de se détendre et de se recentrer fait aussi partie d'une démarche de bien-être.",
      "SPORTHESIA propose différents accompagnements pour favoriser la détente et le confort corporel.",
    ],
    conclusion: "Prendre soin de soi, c'est aussi savoir s'accorder une pause.",
    cta: "Choisir ma séance",
    homeCta: "Découvrir la récupération",
    image: "/images/massage.jpg",
    imageAlt: "Mains d'un praticien pendant un massage de bien-être du dos",
    detailImage: "/images/salle.jpg",
    detailImageAlt: "Salle de massage apaisante à la lumière tamisée",
    keywords: "massage bien-être Paris 7e, luminothérapie Paris, récupération",
    seoTitle: "Massage bien-être et luminothérapie à Paris 7e",
    seoDescription:
      "Massage de bien-être de 55 minutes (110 €) et séances de luminothérapie de 20 minutes (40 €, forfait 5 séances 180 €) à Paris 7e.",
    notes: [
      "Le massage proposé est un massage de bien-être, non thérapeutique : il ne constitue pas un acte de soin.",
      "D'autres prestations utilisant les équipements disponibles pourront être proposées après validation de leurs indications et de leurs tarifs.",
    ],
    soon: [
      {
        id: "brumisation-marine",
        label: "Prochainement",
        title: "Brumisation marine & relaxation lumineuse",
        lead: "Une nouvelle expérience de détente et de bien-être.",
        paragraphs: [
          "Imaginez un espace intimiste, entièrement dédié à votre relaxation.",
          "Confortablement installé sur un transat ergonomique, laissez-vous envelopper par une fine brume d'eau de mer diffusée délicatement dans la pièce.",
          "Dans cette atmosphère inspirée du littoral, un éclairage spécialement conçu pour le bien-être pourra associer luminothérapie et infrarouges, pour une expérience sensorielle associant brumisation marine, lumière et détente.",
          "L'espace, volontairement intimiste, accueillera principalement des séances individuelles, avec la possibilité de partager cette parenthèse de relaxation à deux.",
          "Un moment pour ralentir, se ressourcer et retrouver le plaisir de prendre soin de soi.",
        ],
        footer: "Bientôt disponible chez SPORTHESIA — Univers Récupération, Paris 7e. Ouverture prochainement.",
        cta: "À découvrir bientôt",
        image: "/images/brumisation.webp",
        imageAlt: "Espace de relaxation intimiste avec deux transats, brume légère et éclairage chaud",
        imageCaption: "Visuel d'ambiance — remplacé par une photographie de l'espace réel à son ouverture.",
      },
    ],
    info: [
      {
        title: "Bien-être, pas soin",
        items: [
          "Le massage proposé est un massage de bien-être, réalisé par un praticien indépendant : il ne s'agit pas d'un acte thérapeutique.",
          "Les séances ne remplacent ni un avis médical ni un traitement.",
        ],
      },
      {
        title: "Accueil et confort",
        items: [
          "Une pièce calme, à température agréable, linge fourni.",
          "Un court échange avant chaque séance pour adapter l'expérience à vos attentes.",
          "Prévoyez quelques minutes de retour au calme après la séance.",
        ],
      },
    ],
    faq: [
      {
        q: "Le massage de bien-être est-il un soin médical ?",
        a: "Non. Il s'agit d'une séance de détente et de confort corporel, distincte des actes de soins réglementés.",
      },
      {
        q: "Qui réalise le massage ?",
        a: "Un praticien bien-être indépendant, dont le nom figure sur la fiche de la prestation. Il vend et facture lui-même la séance.",
      },
      {
        q: "Qu'est-ce que la luminothérapie proposée ?",
        a: "Une exposition encadrée à une lumière d'intensité contrôlée, pendant 20 minutes, dans une démarche de bien-être. Le praticien vous présente l'appareil utilisé et ses conditions d'usage avant la séance.",
      },
    ],
  },
  {
    slug: "silhouette",
    name: "Silhouette",
    title: "Se sentir bien dans son corps",
    cardLine: "Prendre soin de son corps et de son image.",
    hook: "Des soins corporels adaptés à vos objectifs.",
    intro: [
      "Notre silhouette évolue avec le temps, notre mode de vie et notre histoire.",
      "Prendre soin de son apparence peut aussi participer au plaisir de se retrouver et de se sentir mieux dans son corps.",
      "SPORTHESIA propose des prestations esthétiques corporelles personnalisées, dans une approche respectueuse de chacun, sans modèle imposé ni promesse irréaliste.",
    ],
    conclusion: "Prendre soin de sa silhouette, c'est avant tout le faire pour soi.",
    cta: "Découvrir les soins silhouette",
    homeCta: "Découvrir la silhouette",
    image: "/images/silhouette.jpg",
    imageAlt: "Portrait de profil d'une femme, épaule nue, lumière douce",
    detailImage: "/images/studio2.jpg",
    detailImageAlt: "Espace lumineux et épuré",
    keywords: "cryolipolyse Paris 7e, soin silhouette, Lapex, MTT",
    seoTitle: "Cryolipolyse et soins silhouette à Paris 7e",
    seoDescription:
      "Cryolipolyse à Paris 7e : un applicateur 190 €, deux applicateurs 250 € (60 min). Séances Lapex et MTT de 30 minutes (90 €). Sans promesse irréaliste.",
    notes: [
    ],
    soon: [
      {
        id: "radiofrequence",
        label: "Offre à venir",
        title: "Radiofréquence",
        paragraphs: ["Cette technique rejoindra l'univers Silhouette après validation de la prestation. Ni tarif ni réservation pour le moment."],
      },
      {
        id: "hifu",
        label: "Prochainement",
        title: "HIFU — ultrasons focalisés",
        paragraphs: [
          "Une nouvelle technologie esthétique de traitement ciblé par ultrasons focalisés rejoindra prochainement notre univers Silhouette. Informations et modalités de consultation communiquées lors de son ouverture.",
        ],
        cta: "En savoir plus prochainement",
        // TODO : photo officielle du modèle exact (Nubway), après autorisation de réutilisation.
        imageCaption: "Photographie de l'appareil communiquée à l'ouverture.",
      },
    ],
    info: [
      {
        title: "Sécurité et information",
        items: [
          "Chaque appareil vous est présenté avant la séance : nom et modèle, usage autorisé, qualification du praticien.",
          "Un échange préalable vérifie l'absence de contre-indication et l'adéquation de la prestation à vos attentes.",
          "Les risques et effets indésirables possibles vous sont expliqués ; votre consentement est recueilli avant toute séance.",
          "Les effets varient d'une personne à l'autre : aucun résultat n'est garanti.",
        ],
      },
    ],
    faq: [
      {
        q: "La cryolipolyse garantit-elle un résultat ?",
        a: "Non. Les effets varient d'une personne à l'autre. Un échange préalable permet de vérifier l'absence de contre-indication et l'adéquation de la prestation à vos attentes.",
      },
      {
        q: "Quels effets peuvent survenir après une cryolipolyse ?",
        a: "Des rougeurs, une sensibilité, un engourdissement, des ecchymoses ou un gonflement transitoires sont possibles. Des complications plus rares existent, dont l'hyperplasie adipeuse paradoxale (augmentation du volume de la zone traitée). Elles vous sont présentées avant la séance.",
      },
      {
        q: "Quelles sont les contre-indications ?",
        a: "Notamment la grossesse et l'allaitement, certaines pathologies liées au froid (cryoglobulinémie, maladie de Raynaud), les troubles de la circulation, les lésions cutanées sur la zone ou un dispositif implanté. La liste complète vous est remise avant la séance.",
      },
    ],
  },
];

const PHYSIOGYM = "PhysioGym — praticien diplômé"; // TODO nom du professionnel vendeur
const APA = "Intervenant en activité physique adaptée"; // TODO nom et qualification

export const services: Service[] = [
  // — POSTURE —
  {
    id: "bilan-aerocore",
    universe: "posture",
    ctaLabel: "Réserver mon bilan postural",
    name: "Bilan postural AeroCore™",
    summary:
      "Une évaluation posturale individualisée pour découvrir comment votre corps organise son équilibre. Dispositif AeroCore™ personnel remis et inclus.",
    durationMin: 60,
    durationLabel: "60 min",
    price: 200,
    priceLabel: "200 €",
    priceStatus: "confirmé",
    bookable: true,
    capacity: 1,
    kind: "séance",
    seller: PHYSIOGYM,
    resources: { room: "salle-bilan", equipment: "aerocore" },
    forWhom: [
      "Vous ressentez raideurs, inconfort ou déséquilibres au quotidien.",
      "Vous souhaitez mieux comprendre votre posture avant de reprendre une activité.",
      "Vous voulez un point de départ clair pour un accompagnement adapté.",
    ],
    steps: [
      "Échange sur vos habitudes, votre histoire et vos attentes.",
      "Évaluation posturale debout et en mouvement, avec des tests comparatifs adaptés.",
      "Restitution des observations, expliquées simplement.",
      "Remise de votre dispositif AeroCore™ personnel et conseils d'utilisation.",
    ],
    preparation: ["Prévoyez une tenue souple permettant d'observer la posture.", "Arrivez 5 minutes en avance."],
    precautions: [
      "Ce bilan est une évaluation posturale : ce n'est pas un diagnostic médical et il ne remplace pas un traitement.",
      "Ses observations décrivent votre posture le jour du bilan ; elles ne prédisent pas un résultat.",
      "Signalez toute douleur aiguë, intervention récente ou grossesse lors de la réservation.",
    ],
  },
  {
    id: "suivi-postural",
    universe: "posture",
    name: "Séance de suivi postural",
    summary: "Un accompagnement individualisé selon vos besoins et vos objectifs, après votre bilan.",
    durationMin: 30,
    durationLabel: "30 min environ",
    price: 55,
    priceLabel: "55 €",
    priceStatus: "prévisionnel",
    bookable: false,
    capacity: 1,
    kind: "séance",
    seller: PHYSIOGYM,
    resources: { room: "salle-bilan", equipment: "aerocore" },
    forWhom: ["Vous avez réalisé un bilan postural AeroCore™ et souhaitez faire le point."],
    steps: ["Retour sur vos ressentis depuis le bilan.", "Contrôle postural.", "Ajustement des conseils."],
    precautions: [
      "Ce suivi ne remplace ni un diagnostic médical ni un traitement.",
      "Réservation ouverte dès validation du tarif et du praticien.",
    ],
  },

  // — MOUVEMENT —
  {
    id: "cours-collectif",
    universe: "mouvement",
    name: "Cours en petit groupe",
    summary:
      "Mobilité, renforcement et équilibre, à quatre participants maximum pour préserver la qualité de l'accompagnement.",
    durationMin: 55,
    durationLabel: "55 min",
    price: 35,
    priceLabel: "35 € / personne",
    priceStatus: "confirmé",
    bookable: true,
    capacity: 4,
    kind: "cours",
    seller: APA,
    resources: { room: "plateau" },
    forWhom: [
      "Vous souhaitez reprendre une activité physique progressivement.",
      "Vous voulez entretenir mobilité, force et équilibre.",
      "Vous préférez un cadre attentif à un cours collectif anonyme.",
    ],
    steps: [
      "Accueil et échange rapide sur votre forme du jour.",
      "Échauffement et mobilité.",
      "Renforcement et équilibre, adaptés à chacun.",
      "Retour au calme.",
    ],
    preparation: ["Tenue confortable, bouteille d'eau, serviette.", "Le matériel est fourni."],
    precautions: [
      "Signalez toute contre-indication à l'activité physique ou reprise après blessure.",
      "Un certificat médical peut être demandé selon votre situation.",
    ],
  },
  {
    id: "carnet-5",
    universe: "mouvement",
    name: "Carnet de cinq séances",
    summary: "Cinq cours en petit groupe, au même tarif de 35 € la séance. Un format pratique, pas une remise.",
    durationMin: 55,
    durationLabel: "5 × 55 min",
    price: 175,
    priceLabel: "175 €",
    priceStatus: "confirmé",
    bookable: true,
    capacity: 4,
    kind: "forfait",
    bookAs: "cours-collectif",
    seller: APA,
    resources: { room: "plateau" },
    forWhom: ["Vous souhaitez vous engager sur plusieurs semaines."],
    steps: ["Réservez votre premier cours, les suivants se planifient à votre rythme."],
    precautions: ["Conditions d'utilisation et de validité du carnet précisées avant paiement."],
  },
  {
    id: "carnet-10",
    universe: "mouvement",
    name: "Carnet de dix séances",
    summary: "Deux carnets de cinq cours, pour inscrire le mouvement dans la durée.",
    durationMin: 55,
    durationLabel: "10 × 55 min",
    price: 350,
    priceLabel: "350 €",
    priceStatus: "confirmé",
    bookable: true,
    capacity: 4,
    kind: "forfait",
    bookAs: "cours-collectif",
    seller: APA,
    resources: { room: "plateau" },
    forWhom: ["Vous souhaitez faire du mouvement une habitude."],
    steps: ["Réservez votre premier cours, les suivants se planifient à votre rythme."],
    precautions: ["Conditions d'utilisation et de validité du carnet précisées avant paiement."],
  },

  // — RÉCUPÉRATION —
  {
    id: "massage-bien-etre",
    universe: "recuperation",
    name: "Massage de bien-être",
    summary: "Une séance dédiée à la détente et au confort corporel. Massage de bien-être : il ne s'agit pas d'un acte thérapeutique.",
    durationMin: 55,
    durationLabel: "55 min",
    price: 110,
    priceLabel: "110 €",
    priceStatus: "confirmé",
    bookable: true,
    capacity: 1,
    kind: "séance",
    seller: "Praticien bien-être indépendant", // TODO
    resources: { room: "cabine-1" },
    forWhom: [
      "Vous ressentez le besoin de relâcher les tensions du quotidien.",
      "Vous souhaitez récupérer après une période d'effort.",
    ],
    steps: ["Échange sur vos attentes.", "Massage de 55 minutes.", "Temps de retour au calme."],
    precautions: [
      "Massage de bien-être, non thérapeutique.",
      "Déconseillé en cas de fièvre, lésion cutanée, phlébite ou trouble de la coagulation. Grossesse : à signaler.",
    ],
  },
  {
    id: "luminotherapie",
    universe: "recuperation",
    name: "Luminothérapie",
    summary: "Vingt minutes d'exposition à une lumière d'intensité contrôlée, dans une démarche de bien-être.",
    durationMin: 20,
    durationLabel: "20 min",
    price: 40,
    priceLabel: "40 €",
    priceStatus: "confirmé",
    bookable: true,
    capacity: 1,
    kind: "séance",
    seller: PHYSIOGYM,
    resources: { room: "cabine-2", equipment: "lampe-luminotherapie" },
    forWhom: ["Vous souhaitez intégrer un temps de lumière à votre routine, notamment en période hivernale."],
    steps: ["Présentation de l'appareil et de son usage.", "Séance de 20 minutes au calme."],
    precautions: [
      "Déconseillée en cas de pathologie oculaire, de traitement photosensibilisant ou de trouble bipolaire non suivi.",
      "Demandez l'avis de votre médecin en cas de doute.",
    ],
  },
  {
    id: "luminotherapie-5",
    universe: "recuperation",
    name: "Luminothérapie — forfait cinq séances",
    summary: "Cinq séances de 20 minutes, à planifier à votre rythme.",
    durationMin: 20,
    durationLabel: "5 × 20 min",
    price: 180,
    priceLabel: "180 €",
    priceStatus: "prévisionnel", // montant à reconfirmer par le client (retour du 17/10)
    bookable: false,
    capacity: 1,
    kind: "forfait",
    bookAs: "luminotherapie",
    seller: PHYSIOGYM,
    resources: { room: "cabine-2", equipment: "lampe-luminotherapie" },
    forWhom: ["Vous souhaitez une pratique régulière sur quelques semaines."],
    steps: ["Réservez votre première séance, les suivantes se planifient ensuite."],
    precautions: ["Mêmes précautions que la séance unitaire."],
  },

  // — SILHOUETTE —
  {
    id: "cryolipolyse-1",
    universe: "silhouette",
    name: "Cryolipolyse — un applicateur",
    summary:
      "Une technique esthétique utilisant le froid, proposée après vérification des contre-indications et de l'adéquation de la prestation.",
    durationMin: 60,
    durationLabel: "60 min",
    price: 190,
    priceLabel: "190 €",
    priceStatus: "confirmé",
    bookable: true,
    capacity: 1,
    kind: "séance",
    seller: "Praticien esthétique indépendant", // TODO
    resources: { room: "cabine-silhouette", equipment: "cryolipolyse" },
    forWhom: ["Vous souhaitez prendre soin d'une zone localisée, dans une démarche personnelle et réaliste."],
    steps: [
      "Échange préalable et vérification des contre-indications.",
      "Pose de l'applicateur sur la zone choisie.",
      "Séance d'environ 60 minutes.",
      "Conseils après séance.",
    ],
    preparation: ["Aucune préparation particulière. Prévoyez une tenue confortable."],
    precautions: [
      "Aucun résultat n'est garanti ; les effets varient d'une personne à l'autre.",
      "Contre-indiquée notamment en cas de grossesse, allaitement, cryoglobulinémie, maladie de Raynaud, troubles circulatoires, lésion cutanée sur la zone ou dispositif implanté.",
    ],
    safety: [
      "Appareil : nom et modèle communiqués avant la séance.", // TODO modèle exact
      "Effets transitoires possibles : rougeurs, sensibilité, engourdissement, ecchymoses, gonflement.",
      "Complication rare : hyperplasie adipeuse paradoxale (augmentation du volume de la zone traitée).",
      "Consentement éclairé recueilli avant la séance.",
    ],
  },
  {
    id: "cryolipolyse-2",
    universe: "silhouette",
    name: "Cryolipolyse — deux applicateurs",
    summary: "Deux zones traitées au cours de la même séance.",
    durationMin: 60,
    durationLabel: "60 min",
    price: 250,
    priceLabel: "250 €",
    priceStatus: "confirmé",
    bookable: true,
    capacity: 1,
    kind: "séance",
    seller: "Praticien esthétique indépendant", // TODO
    resources: { room: "cabine-silhouette", equipment: "cryolipolyse" },
    forWhom: ["Vous souhaitez prendre soin de deux zones lors d'une même séance."],
    steps: [
      "Échange préalable et vérification des contre-indications.",
      "Pose simultanée des deux applicateurs.",
      "Séance d'environ 60 minutes.",
    ],
    precautions: [
      "Aucun résultat n'est garanti ; les effets varient d'une personne à l'autre.",
      "Mêmes contre-indications que la séance un applicateur.",
    ],
    safety: [
      "Mêmes informations de sécurité que la séance un applicateur, présentées avant la séance.",
      "Complication rare : hyperplasie adipeuse paradoxale.",
      "Consentement éclairé recueilli avant la séance.",
    ],
  },
  {
    id: "lapex",
    universe: "silhouette",
    name: "Lapex",
    summary: "Une séance de 30 minutes, présentée en détail par le praticien selon l'usage autorisé de l'appareil.",
    durationMin: 30,
    durationLabel: "30 min",
    price: 90,
    priceLabel: "90 €",
    priceStatus: "confirmé",
    bookable: true,
    capacity: 1,
    kind: "séance",
    seller: PHYSIOGYM,
    resources: { room: "cabine-silhouette", equipment: "lapex" },
    forWhom: ["Vous souhaitez compléter votre démarche silhouette."],
    steps: ["Présentation de l'appareil et vérification des contre-indications.", "Séance de 30 minutes."],
    precautions: ["Aucun résultat n'est garanti.", "Contre-indications communiquées avant la séance."],
    safety: [
      "Appareil : nom, modèle et usage autorisé présentés avant la séance.", // TODO notice constructeur
      "Effets indésirables possibles et précautions expliqués lors de l'échange préalable.",
      "Consentement recueilli avant la séance.",
    ],
  },
  {
    id: "mtt",
    universe: "silhouette",
    name: "MTT",
    summary: "Une séance de 30 minutes, présentée en détail par le praticien selon l'usage autorisé de l'appareil.",
    durationMin: 30,
    durationLabel: "30 min",
    price: 90,
    priceLabel: "90 €",
    priceStatus: "confirmé",
    bookable: true,
    capacity: 1,
    kind: "séance",
    seller: PHYSIOGYM,
    resources: { room: "cabine-silhouette", equipment: "mtt" },
    forWhom: ["Vous souhaitez compléter votre démarche silhouette."],
    steps: ["Présentation de l'appareil et vérification des contre-indications.", "Séance de 30 minutes."],
    precautions: ["Aucun résultat n'est garanti.", "Contre-indications communiquées avant la séance."],
    safety: [
      "Appareil : nom, modèle et usage autorisé présentés avant la séance.", // TODO notice constructeur
      "Effets indésirables possibles et précautions expliqués lors de l'échange préalable.",
      "Consentement recueilli avant la séance.",
    ],
  },

  // — BODY 360 (offre transversale) —
  {
    id: "bilan-anovator",
    universe: "body-360",
    ctaLabel: "Réserver mon bilan ANOVATOR",
    name: "Bilan ANOVATOR complet",
    summary:
      "Mesures morphologiques et de composition corporelle, relevé postural simplifié. Votre bilan vous est remis par QR code et par e-mail.",
    durationMin: 30,
    durationLabel: "30 min environ", // TODO durée à confirmer
    price: 49,
    priceLabel: "49 €",
    priceStatus: "confirmé",
    bookable: true,
    capacity: 1,
    kind: "séance",
    seller: PHYSIOGYM,
    resources: { room: "salle-bilan", equipment: "anovator" },
    forWhom: [
      "Vous souhaitez des repères chiffrés sur votre corps.",
      "Vous voulez suivre votre évolution dans le temps.",
    ],
    steps: [
      "Accueil et explication de la mesure.",
      "Mesures de composition corporelle (masse grasse, masse maigre), périmètres et indices, selon les capacités du dispositif.",
      "Relevé postural simplifié.",
      "Remise du bilan par QR code et par e-mail.",
    ],
    preparation: ["Tenue légère.", "Évitez un repas copieux ou un effort intense juste avant la mesure."],
    precautions: [
      "Bilan de mesures : il ne comprend pas de consultation d'expertise approfondie.",
      "Ce n'est pas un examen médical. Signalez une grossesse ou un dispositif électronique implanté (pacemaker…) avant la mesure.",
    ],
  },
  {
    id: "bilan-body-360",
    universe: "body-360",
    ctaLabel: "Réserver mon bilan BODY 360",
    name: "Bilan initial SPORTHESIA BODY 360",
    summary:
      "Une consultation en présentiel d'environ 50 minutes : mesures ANOVATOR, entretien, analyse, explication de votre dossier et recommandations individualisées.",
    durationMin: 50,
    durationLabel: "50 min environ",
    price: 149,
    priceLabel: "149 €",
    priceStatus: "confirmé",
    bookable: true,
    capacity: 1,
    kind: "séance",
    seller: PHYSIOGYM,
    resources: { room: "salle-bilan", equipment: "anovator" },
    forWhom: [
      "Vous souhaitez comprendre vos mesures et savoir par où commencer.",
      "Vous cherchez des recommandations adaptées à votre situation et à vos objectifs.",
    ],
    steps: [
      "Questionnaire à remplir avant votre venue.",
      "Mesures ANOVATOR.",
      "Entretien et analyse de vos résultats.",
      "Explication de votre dossier et recommandations individualisées.",
      "Transmission sécurisée de vos résultats.",
    ],
    preparation: ["Remplissez le questionnaire reçu après réservation.", "Tenue légère."],
    precautions: [
      "Ce bilan ne remplace ni un diagnostic médical ni un traitement.",
      "Signalez une grossesse ou un dispositif électronique implanté avant la mesure.",
    ],
  },
];

/** SPORTHESIA BODY 360 — offre transversale, distincte des quatre univers. */
export const body360 = {
  slug: "body-360" as const,
  name: "BODY 360",
  fullName: "SPORTHESIA BODY 360",
  title: "Mieux comprendre son corps",
  hook: "Mieux comprendre son corps pour avancer avec des repères concrets.",
  intro:
    "Découvrez nos évaluations corporelles, du bilan de mesures ANOVATOR à l'accompagnement personnalisé SPORTHESIA BODY 360.",
  image: "", // TODO photo A (femme debout sur plateforme) — à recevoir
  imageAlt: "Illustration d'une évaluation corporelle accompagnée",
  imageCaption: "Illustration d'une évaluation corporelle accompagnée",
  seoTitle: "Bilan corporel ANOVATOR et BODY 360 à Paris 7e",
  seoDescription:
    "Bilan ANOVATOR complet (49 €) : composition corporelle, périmètres, relevé postural simplifié. Bilan initial SPORTHESIA BODY 360 (149 €) : 50 min d'entretien, d'analyse et de recommandations. Paris 7e.",
  faq: [
    {
      q: "Quelle différence entre les deux bilans ?",
      a: "Le bilan ANOVATOR (49 €) est un bilan de mesures, remis par QR code et e-mail. Le bilan BODY 360 (149 €) ajoute un entretien, l'analyse de vos résultats et des recommandations individualisées, lors d'une consultation d'environ 50 minutes.",
    },
    {
      q: "Est-ce la même chose que le bilan postural AeroCore™ ?",
      a: "Non. Le bilan postural AeroCore™ (200 €) est une prestation distincte, centrée sur la posture. Aucun bilan préalable n'est obligatoire pour réserver les autres prestations.",
    },
    {
      q: "Y a-t-il un suivi après le bilan BODY 360 ?",
      a: "Des suivis BODY 360 seront proposés. Leurs modalités et tarifs seront communiqués après validation.",
    },
    {
      q: "Mes résultats sont-ils protégés ?",
      a: "Oui. Ils vous sont transmis de manière sécurisée et ne sont partagés qu'avec le professionnel qui vous accompagne.",
    },
  ] as Faq[],
};

export const getUniverse = (slug: string) => universes.find((u) => u.slug === slug);
export const getService = (id: string) => services.find((s) => s.id === id);
export const servicesOf = (slug: UniverseSlug | "body-360") => services.filter((s) => s.universe === slug);
/** Prestation réellement planifiée (un forfait réserve sa première séance). */
export const slotServiceOf = (s: Service) => (s.bookAs ? getService(s.bookAs) ?? s : s);

export const bookingConditions = [
  "Le délai d'annulation ou de modification sans frais est indiqué pour chaque prestation avant validation (en principe 24 heures avant le rendez-vous, selon le professionnel).",
  "Selon la prestation et le professionnel, un acompte ou le paiement intégral peut être demandé lors de la réservation ; le montant est indiqué avant validation.",
  "Chaque prestation est vendue et facturée par le professionnel indiqué sur sa fiche.",
  "Prestations non conventionnées : aucune prise en charge par l'Assurance maladie ; une participation de votre mutuelle n'est jamais garantie.",
];
