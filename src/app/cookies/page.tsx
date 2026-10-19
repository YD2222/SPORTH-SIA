import type { Metadata } from "next";
import { ProsePage } from "@/components/ProsePage";

export const metadata: Metadata = { title: "Gestion des cookies", alternates: { canonical: "/cookies" } };

export default function Page() {
  return (
    <ProsePage eyebrow="Cookies" title="Gestion des cookies" intro="Ce site n'utilise aucun cookie publicitaire ni de mesure d'audience nécessitant votre consentement.">
      <section>
        <h2>Ce que nous utilisons</h2>
        <p>Uniquement des éléments techniques indispensables au fonctionnement du site et de la réservation. Ils ne nécessitent pas votre consentement.</p>
      </section>
      <section>
        <h2>Si cela change</h2>
        <p>
          Si un outil de mesure d&apos;audience ou le module CharlySecure® dépose des cookies soumis à consentement, un bandeau vous permettra de les accepter ou de les
          refuser, aussi simplement l&apos;un que l&apos;autre, et cette page sera mise à jour.
        </p>
      </section>
    </ProsePage>
  );
}
