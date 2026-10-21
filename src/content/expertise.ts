/**
 * Notre expertise — textes du bloc d'accueil et de la page /expertise.
 * Source : retour client du 21/10/2026. Textes des bilans : proposition à valider par le client.
 */

export const expertiseIntro = {
  title: "Une expertise de la posture, du mouvement et du bien-être à Paris 7e",
  paragraphs: [
    "Chez SPORTHESIA, chaque personne possède son histoire, ses attentes et son rythme.",
    "Notre approche associe différentes compétences pour vous proposer un accompagnement personnalisé, qu'il s'agisse de posture, d'activité physique, de récupération ou de bien-être.",
    "Des professionnels indépendants interviennent dans leur domaine de compétence : activité physique adaptée, posturologie, esthétique, technologies de récupération physique et kinésiologie.",
    "Que vous souhaitiez un soin isolé ou une prise en charge complète et personnalisée, votre expert SPORTHESIA vous propose une feuille de route.",
  ],
  legal:
    "SPORTHESIA® est une marque et un concept. Son site pilote parisien est exploité par PhysioGym, Paris 7e ; chaque prestation est vendue par le professionnel identifié sur sa fiche.",
};

export type Assessment = {
  id: string;
  name: string;
  /** Texte court affiché sous la grande photo. */
  text: string;
  /** Précision affichée sur la page /expertise. */
  detail: string;
  href: string;
  linkLabel: string;
  /** Photo provisoire de la mosaïque, en attendant les visuels du client. */
  image: string;
  imageAlt: string;
  /** Point focal du recadrage. */
  focus?: string;
};

/** Grande photo d'ensemble fournie par le client : remplace la mosaïque dès qu'elle est renseignée. */
export const expertisePhoto: { src: string; alt: string } | null = null;

// TODO : textes définitifs à fournir / valider par le client.
export const assessments: Assessment[] = [
  {
    id: "bilan-body-360",
    image: "/images/body-360.jpg",
    imageAlt: "Praticien commentant l'analyse corporelle d'une femme debout sur une plateforme de mesure, devant un écran de scan du corps",
    focus: "20% 50%",
    name: "Bilan SPORTHESIA BODY 360",
    text: "Une consultation d'expertise d'environ 50 minutes : mesures corporelles, entretien, analyse de vos résultats et recommandations individualisées.",
    detail: "Mesures ANOVATOR incluses ; option AeroCore™ facultative pour la posture. Le point de départ d'un parcours personnalisé.",
    href: "/body-360",
    linkLabel: "Découvrir BODY 360",
  },
  {
    id: "bilan-clinique-ops",
    image: "/images/bilan-clinique-ops.webp",
    imageAlt: "Praticien en blouse observant l'alignement postural d'une jeune femme, vue de profil",
    focus: "50% 35%",
    name: "Bilan Clinique OPS",
    text: "Une évaluation posturale spécialisée, proposée lorsque votre situation le justifie, pour approfondir l'analyse de votre posture et de vos appuis.",
    detail: "Expertise complémentaire, sur indication et non systématique. Tarif sur évaluation.",
    href: "/posture",
    linkLabel: "Univers Posture",
  },
  {
    id: "bilan-emotionnel",
    image: "/images/bilan-emotionnel.webp",
    imageAlt: "Kinésiologue accompagnant une cliente debout lors d'un bilan émotionnel, dans le studio SPORTHESIA",
    focus: "52% 30%",
    name: "Bilan émotionnel en kinésiologie",
    text: "Un temps d'écoute avec un kinésiologue pour identifier les blocages où le corps et les émotions se rejoignent, dits somato-émotionnels.",
    detail: "Démarche de bien-être, non médicale : elle ne remplace ni un diagnostic, ni un traitement, ni un suivi psychologique.",
    href: "/expertise#bilan-emotionnel",
    linkLabel: "En savoir plus",
  },
  {
    id: "bilan-mobilite",
    image: "/images/bilan-mobilite.jpg",
    imageAlt: "Coach SPORTHESIA évaluant l'équilibre et la mobilité d'une cliente sur un tapis d'analyse du mouvement",
    focus: "57% 40%",
    name: "Bilan mobilité, équilibre et force",
    text: "Des tests simples réalisés par un professionnel pour mesurer votre mobilité, votre équilibre et votre force, et adapter votre activité à vos capacités.",
    detail: "Un repère concret avant de reprendre ou de faire progresser votre activité physique, en cours collectif ou en séance individuelle.",
    href: "/mouvement",
    linkLabel: "Univers Mouvement",
  },
];
