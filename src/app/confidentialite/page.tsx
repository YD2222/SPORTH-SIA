import type { Metadata } from "next";
import { ProsePage, Todo } from "@/components/ProsePage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" } };

export default function Page() {
  return (
    <ProsePage
      eyebrow="Vos données"
      title="Politique de confidentialité"
      intro="Nous collectons uniquement les informations nécessaires à la gestion de votre rendez-vous. Elles ne sont jamais revendues."
    >
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          <Todo>Structure exploitante</Todo>, joignable à <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
      <section>
        <h2>Données collectées et finalités</h2>
        <ul>
          <li>Prénom, nom, e-mail et téléphone : confirmation, rappel et gestion de votre rendez-vous.</li>
          <li>Prestation, date et professionnel choisis : organisation du planning et facturation par le professionnel.</li>
          <li>Message facultatif : préparation de la séance. Nous vous demandons de ne pas y indiquer d&apos;informations de santé détaillées.</li>
        </ul>
        <p>Base légale : exécution de la réservation que vous demandez.</p>
      </section>
      <section>
        <h2>Bilans et données de santé</h2>
        <p>
          Les bilans ANOVATOR et BODY 360 (mesures, questionnaire préalable, résultats) peuvent contenir des données relatives à la santé. Elles sont traitées avec
          votre consentement explicite, transmises de manière sécurisée et accessibles uniquement au professionnel qui vous accompagne. Hébergement :{" "}
          <Todo>hébergeur certifié HDS le cas échéant, à confirmer</Todo>.
        </p>
      </section>
      <section>
        <h2>Destinataires</h2>
        <p>
          Le professionnel qui réalise la prestation, et nos sous-traitants techniques (outil de réservation CharlySecure®, paiement Stripe, hébergement), liés par
          contrat. Les informations ne sont partagées entre professionnels que dans la limite strictement nécessaire.
        </p>
      </section>
      <section>
        <h2>Durée de conservation</h2>
        <p>
          <Todo>À définir</Todo> — par exemple 3 ans après votre dernier rendez-vous, puis suppression ou anonymisation. Les pièces comptables sont conservées selon les
          obligations légales.
        </p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez accéder à vos données, les rectifier, les effacer, limiter ou vous opposer à leur traitement, et en demander la portabilité, en écrivant à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez aussi saisir la CNIL (cnil.fr).
        </p>
      </section>
    </ProsePage>
  );
}
