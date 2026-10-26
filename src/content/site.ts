/**
 * Informations générales du site.
 * Tout ce qui est marqué TODO doit être confirmé par le client avant mise en ligne.
 */
export const site = {
  name: "SPORTHESIA",
  tagline: "Votre corps, votre équilibre.",
  pillars: "Posture · Mouvement · Récupération · Silhouette",
  expertise: "Une expertise PhysioGym — Paris 7e",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sporthesia.fr", // TODO domaine définitif
  description:
    "SPORTHESIA, Paris 7e : posture, mouvement, récupération, silhouette et visage. Bilan ANOVATOR Découverte, bilan BODY 360, bilan postural AeroCore™, Clinique OPS, kinésiologie, cours de gym en petit groupe (4 max), massage bien-être, cryolipolyse.",
  address: {
    street: "5 rue Cognacq-Jay",
    postalCode: "75007",
    city: "Paris",
    country: "FR",
  },
  geo: { lat: 48.86166, lng: 2.30466 },
  /** Stations de métro les plus proches. */
  metro: ["Alma-Marceau", "Invalides", "École Militaire"],
  phone: "", // TODO
  email: "contact@sporthesia.fr", // TODO
  hours: [
    // TODO horaires définitifs
    { days: "Lundi – Vendredi", hours: "8h00 – 20h00" },
    { days: "Samedi", hours: "9h00 – 13h00" },
  ],
  charlyUrl: process.env.NEXT_PUBLIC_CHARLY_URL ?? "", // URL du widget CharlySecure® quand disponible
};

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/posture", label: "Posture" },
  { href: "/mouvement", label: "Mouvement" },
  { href: "/recuperation", label: "Récupération" },
  { href: "/silhouette", label: "Silhouette" },
  { href: "/body-360", label: "BODY 360" },
];

export const footerLinks = [
  { href: "/expertise", label: "Notre expertise" },
  { href: "/actualites", label: "Actualités et offres" },
  { href: "/contact", label: "Accès & contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/conditions", label: "Conditions générales applicables" },
  { href: "/cookies", label: "Gestion des cookies" },
];

/** Phrases signatures — réparties dans le site, jamais toutes au même endroit. */
export const signatures = {
  figé: "Rien n'est figé. Tout peut évoluer.",
  histoire: "Notre corps raconte aussi notre histoire.",
  renouer: "Renouer avec son corps et explorer de nouvelles possibilités.",
  envie: "La transformation commence par l'envie d'avancer.",
  acteur: "Devenez acteur de votre évolution, à votre rythme.",
  premierPas: "Avec SPORTHESIA, osez le premier pas !",
};
