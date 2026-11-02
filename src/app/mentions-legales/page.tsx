import type { Metadata } from "next";
import { ProsePage, Todo } from "@/components/ProsePage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } };

export default function Page() {
  return (
    <ProsePage eyebrow="Informations légales" title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          SPORTHESIA® est une marque déposée et un concept ; ce n&apos;est pas une société autonome. Le site pilote est exploité par PHYSIOGYM, société
          d&apos;exercice libéral par actions simplifiée (SELAS).
          <br />
          Siège : 5 rue Cognacq-Jay, 75007 Paris — SIRET : 938 089 133 00020 — RCS Paris 938 089 133 — TVA intracommunautaire : FR09938089133.
          <br />
          Directeur de la publication : Joël Reisberg, Président. Contact : <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.
        </p>
      </section>
      <section>
        <h2>Prestations et professionnels</h2>
        <p>
          Chaque prestation est vendue et facturée par le professionnel indiqué sur sa fiche, qui en assure la responsabilité dans son domaine de compétence. Les
          prestations présentées sur ce site ne sont pas conventionnées et sont distinctes des soins conventionnés de PhysioGym. Aucune prise en charge par une
          mutuelle ou un dispositif particulier n&apos;est garantie.
        </p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          La marque SPORTHESIA®, le logo, les textes et les visuels du site sont protégés. Toute reproduction sans autorisation est interdite. Crédits photographiques :
          <Todo>à compléter après shooting</Todo>.
        </p>
      </section>
    </ProsePage>
  );
}
