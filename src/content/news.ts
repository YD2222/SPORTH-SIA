/**
 * Actualités et offres du moment.
 * Ajouter, modifier ou retirer une entrée ici suffit : l'accueil et la page
 * /actualites se mettent à jour. Une offre expirée (validUntil dépassée) disparaît
 * automatiquement.
 */
export type NewsItem = {
  id: string;
  kind: "Offre découverte" | "Événement" | "Nouveauté" | "Prochainement" | "Forfait" | "Intervenant";
  title: string;
  text: string;
  /** Conditions affichées sous l'offre. */
  conditions?: string;
  validFrom?: string; // YYYY-MM-DD
  validUntil?: string; // YYYY-MM-DD
  link?: { href: string; label: string };
};

// Annonces réelles uniquement — pas de fausse promotion.
export const news: NewsItem[] = [
  {
    id: "body-360",
    kind: "Nouveauté",
    title: "SPORTHESIA BODY 360",
    text: "Commencez par le bilan ANOVATOR Découverte : une première évaluation et un échange avec un professionnel pour trouver ensemble votre parcours.",
    conditions: "Bilan ANOVATOR Découverte 35 € (au lieu de 50 €) · Bilan initial BODY 360 149 €.",
    link: { href: "/body-360", label: "Découvrir BODY 360" },
  },
  {
    id: "brumisation",
    kind: "Prochainement",
    title: "Brumisation marine & relaxation lumineuse",
    text: "Un espace intimiste dédié à la détente, entre fine brume d'eau de mer et lumière douce, dans l'univers Récupération.",
    conditions: "Ouverture prochainement. Informations communiquées à l'ouverture.",
    link: { href: "/recuperation#brumisation-marine", label: "En savoir plus" },
  },
  {
    id: "hifu",
    kind: "Prochainement",
    title: "HIFU — ultrasons focalisés",
    text: "Une nouvelle technologie esthétique de traitement ciblé rejoindra l'univers Silhouette.",
    conditions: "Informations et modalités de consultation communiquées lors de son ouverture.",
    link: { href: "/silhouette#hifu", label: "En savoir plus" },
  },
];

export function activeNews(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return news.filter(
    (n) => (!n.validFrom || n.validFrom <= today) && (!n.validUntil || n.validUntil >= today),
  );
}
