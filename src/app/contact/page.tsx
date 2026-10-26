import type { Metadata } from "next";
import Link from "next/link";
import { CharlyButton } from "@/components/Charly";
import { ProsePage } from "@/components/ProsePage";
import { btn } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Accès & contact",
  description: "SPORTHESIA, Paris 7e : adresse, horaires et contact. Réservez en ligne ou parlez à Charly.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <ProsePage eyebrow="Accès & contact" title="Nous trouver" intro={`${site.expertise}. Le lieu pilote du concept SPORTHESIA.`}>
      <section className="grid gap-10 sm:grid-cols-2">
        <div>
          <h2>Adresse</h2>
          <address className="mt-3 not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <p className="mt-3 text-sm">
            <span className="font-semibold text-nuit">Métro :</span> {site.metro.join(", ")}
          </p>
        </div>
        <div>
          <h2>Horaires</h2>
          <ul className="!ml-0">
            {site.hours.map((h) => (
              <li key={h.days} style={{ listStyle: "none", marginLeft: 0 }}>
                {h.days} · {h.hours}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Écrire</h2>
          <p className="mt-3">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </section>
      <section className="flex flex-wrap gap-3">
        <Link href="/reserver" className={`${btn.primary} !no-underline`}>
          Prendre rendez-vous
        </Link>
        <CharlyButton className={btn.ghost}>Parler à Charly</CharlyButton>
      </section>
      <section className="overflow-hidden rounded-[28px] border border-nuit/10">
        <iframe
          title="Plan d'accès — Paris 7e"
          className="h-[380px] w-full grayscale-[60%]"
          loading="lazy"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${site.geo.lng - 0.012}%2C${site.geo.lat - 0.006}%2C${site.geo.lng + 0.012}%2C${site.geo.lat + 0.006}&layer=mapnik&marker=${site.geo.lat}%2C${site.geo.lng}`}
        />
      </section>
    </ProsePage>
  );
}
