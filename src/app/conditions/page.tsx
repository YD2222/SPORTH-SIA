import type { Metadata } from "next";
import { ProsePage, Todo } from "@/components/ProsePage";
import { bookingConditions } from "@/content/services";

export const metadata: Metadata = { title: "Conditions générales applicables", alternates: { canonical: "/conditions" } };

export default function Page() {
  return (
    <ProsePage
      eyebrow="Réservation et vente"
      title="Conditions générales applicables"
      intro="Ces conditions s'appliquent aux réservations effectuées sur le site SPORTHESIA. Chaque prestation est vendue par le professionnel indiqué sur sa fiche."
    >
      <section>
        <h2>L&apos;essentiel</h2>
        <ul>
          {bookingConditions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Vendeur et facturation</h2>
        <p>
          Le professionnel indépendant facture directement la prestation au client. Ses coordonnées, son régime de facturation et ses conditions sont indiqués avant
          la validation de la réservation. <Todo>À compléter par prestataire</Todo>.
        </p>
      </section>
      <section>
        <h2>Paiement, acompte et remboursement</h2>
        <p>
          Selon la prestation, un acompte ou le paiement intégral peut être demandé en ligne via un prestataire de paiement sécurisé. En cas d&apos;annulation dans les
          délais, le montant versé est remboursé. <Todo>Modalités définitives à valider</Todo>.
        </p>
      </section>
      <section>
        <h2>Report et annulation</h2>
        <p>
          Le délai d&apos;annulation ou de report sans frais est fixé par chaque professionnel et indiqué avant validation. <Todo>Règle commerciale (24 heures
          envisagées) à confirmer et à vérifier juridiquement par prestataire</Todo>.
        </p>
      </section>
      <section>
        <h2>Bilans BODY 360</h2>
        <p>
          Le bilan initial SPORTHESIA BODY 360 est réglé avant le rendez-vous, via le parcours de paiement prévu. <Todo>Sous réserve d&apos;intégration et de
          conformité</Todo>.
        </p>
      </section>
      <section>
        <h2>Carnets et forfaits</h2>
        <p>
          Les carnets de cinq cours (175 €) et de dix cours (350 €) sont facturés 35 € la séance, sans remise. Durée de validité et transférabilité :{" "}
          <Todo>à préciser</Todo>. Forfait luminothérapie : <Todo>montant à confirmer</Todo>.
        </p>
      </section>
      <section>
        <h2>Nature des prestations</h2>
        <p>
          Les prestations SPORTHESIA sont des prestations de bien-être, d&apos;activité physique ou d&apos;esthétique, non conventionnées. Elles ne remplacent ni un
          diagnostic médical, ni un traitement. Aucun résultat n&apos;est garanti.
        </p>
      </section>
      <section>
        <h2>Médiation de la consommation</h2>
        <p>
          En cas de litige, vous pouvez recourir gratuitement à un médiateur de la consommation : <Todo>coordonnées du médiateur de chaque vendeur</Todo>.
        </p>
      </section>
      <section>
        <h2>Droit de rétractation</h2>
        <p>
          Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation ne s&apos;applique pas aux prestations de loisirs fournies à une
          date déterminée. Les conditions d&apos;annulation ci-dessus s&apos;appliquent. <Todo>À valider juridiquement</Todo>.
        </p>
      </section>
    </ProsePage>
  );
}
