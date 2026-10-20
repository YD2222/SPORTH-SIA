import type { Metadata } from "next";
import { ProsePage, Todo } from "@/components/ProsePage";
import { ExpertiseShowcase } from "@/components/ExpertiseShowcase";
import { expertiseIntro } from "@/content/expertise";
import { signatures } from "@/content/site";

export const metadata: Metadata = {
  title: "Notre expertise",
  description:
    "Bilan SPORTHESIA BODY 360, bilan Clinique OPS, bilan émotionnel en kinésiologie, bilan mobilité, équilibre et force : l'expertise SPORTHESIA à Paris 7e, site pilote exploité par PhysioGym.",
  alternates: { canonical: "/expertise" },
};

// TODO : liste confirmée par le client (nom, qualification, statut, prestations vendues).
const team = [
  { role: "Posturologie — PhysioGym", scope: "Bilan postural AeroCore™, bilan ANOVATOR Découverte, BODY 360, Clinique OPS" },
  { role: "Activité physique adaptée — indépendant(e)", scope: "Bilan mobilité, équilibre et force ; cours de gym en petit groupe" },
  { role: "Technologies de récupération physique", scope: "Luminothérapie, Lapex, MTT" },
  { role: "Bien-être — indépendant(e)", scope: "Massage de bien-être" },
  { role: "Esthétique — indépendant(e)", scope: "Cryolipolyse" },
  { role: "Kinésiologie — indépendant(e)", scope: "Bilan émotionnel en kinésiologie" },
];

// Équipements réellement disponibles au lancement — aucun équipement futur.
const equipment = ["AeroCore™ (bilan postural)", "ANOVATOR (mesures corporelles)", "Luminothérapie", "Cryolipolyse", "Lapex", "MTT"];

export default function Page() {
  return (
    <ProsePage eyebrow="Notre expertise" title={expertiseIntro.title} intro={signatures.histoire}>
      <section>
        {expertiseIntro.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>
      <section aria-labelledby="bilans-title">
        <h2 id="bilans-title">Nos bilans</h2>
        <div className="mt-8 [&_a]:no-underline">
          <ExpertiseShowcase detailed />
        </div>
      </section>
      <section>
        <h2>Une marque, un concept, un site pilote</h2>
        <p>
          SPORTHESIA® est une marque déposée et un concept dédiés à la posture, au mouvement, à la récupération, à la silhouette et au bien-être. Ce n&apos;est pas
          une société autonome : son site pilote parisien est exploité par PhysioGym, Paris 7e.
        </p>
        <p>
          Les prestations SPORTHESIA sont distinctes des soins conventionnés de PhysioGym : on y vient librement, sans prescription, pour prendre soin de son corps.
        </p>
      </section>
      <section>
        <h2>L&apos;équipe</h2>
        <p>
          Chaque prestation est réalisée par un professionnel qualifié dans son domaine. Celui qui vend et facture la prestation est indiqué sur sa fiche.{" "}
          <Todo>Noms, qualifications et statuts à confirmer</Todo>
        </p>
        <ul className="!mt-6 !ml-0 divide-y divide-nuit/10 border-y border-nuit/10">
          {team.map((t) => (
            <li key={t.role} className="!ml-0 flex list-none flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-6">
              <span className="font-semibold text-nuit">{t.role}</span>
              <span className="text-sm text-nuit/65 sm:text-right">{t.scope}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Équipements disponibles</h2>
        <p>Seuls les équipements réellement disponibles sont présentés ; les nouveautés sont annoncées comme telles, sans réservation possible avant leur ouverture.</p>
        <ul>
          {equipment.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Une parole prudente</h2>
        <p>
          Nous ne promettons pas de résultats spectaculaires. Nous proposons un cadre, une attention et des outils pour que chacun avance à son rythme.{" "}
          {signatures.envie}
        </p>
      </section>
    </ProsePage>
  );
}
