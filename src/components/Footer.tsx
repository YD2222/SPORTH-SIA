import Link from "next/link";
import { footerLinks, nav, site, signatures } from "@/content/site";
import { Emblem } from "./Logo";
import { container } from "./ui";

export function Footer() {
  return (
    <footer className="grain bg-encre pb-28 text-ivoire/80 sm:pb-0">
      <div className={`${container} grid gap-14 pt-20 pb-12 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-ivoire">
              <Emblem className="size-12" />
            </span>
            <div>
              <p className="font-display text-2xl tracking-[0.14em] text-ivoire">SPORTHESIA®</p>
              <p className="text-sm text-or-clair">{site.tagline}</p>
            </div>
          </div>
          <p className="mt-8 max-w-sm font-display text-2xl leading-snug text-ivoire/90 italic">{signatures.acteur}</p>
          <p className="mt-6 text-xs tracking-[0.2em] uppercase">{site.expertise}</p>
        </div>

        <nav aria-label="Univers" className="lg:col-span-2">
          <p className="eyebrow text-or-clair">Univers</p>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.slice(1).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-ivoire">{l.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/reserver" className="transition-colors hover:text-ivoire">Prendre rendez-vous</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Informations" className="lg:col-span-3">
          <p className="eyebrow text-or-clair">Informations</p>
          <ul className="mt-5 space-y-3 text-sm">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-ivoire">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <p className="eyebrow text-or-clair">Nous trouver</p>
          <address className="mt-5 text-sm leading-relaxed not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <ul className="mt-4 space-y-1 text-sm">
            {site.hours.map((h) => (
              <li key={h.days}>
                <span className="text-ivoire">{h.days}</span> · {h.hours}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${container} flex flex-col gap-3 border-t border-ivoire/10 py-6 text-xs text-ivoire/50 sm:flex-row sm:justify-between`}>
        <p>© {new Date().getFullYear()} SPORTHESIA® — marque déposée. Prestations non conventionnées, clairement identifiées sur chaque fiche.</p>
        <p>Paris 7e</p>
      </div>
    </footer>
  );
}
