import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { anovatorTable } from "@/content/services";
import { Reveal } from "./motion";
import { btn } from "./ui";

/** « Bilan ANOVATOR : pour quelles prestations ? » — tableau de référence du client. */
export function AnovatorTable() {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal className="rounded-[28px] bg-nuit p-7 text-ivoire sm:p-9">
          <p className="eyebrow text-or-clair">Bilan ANOVATOR préalable</p>
          <h3 className="font-display mt-3 text-3xl font-light">Demandé avant</h3>
          <ul className="mt-6 divide-y divide-ivoire/10">
            {anovatorTable.required.map((r) => (
              <li key={r.name} className="py-4">
                <p className="font-semibold">{r.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-ivoire/65">{r.note}</p>
              </li>
            ))}
          </ul>
          <Link href="/reserver?prestation=bilan-anovator" data-cta className={`${btn.gold} mt-6`}>
            Réserver mon bilan découverte — 35 € <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="rounded-[28px] border border-nuit/15 bg-white/40 p-7 sm:p-9">
          <p className="eyebrow text-or">Sans bilan ANOVATOR</p>
          <h3 className="font-display mt-3 text-3xl font-light">Accès direct</h3>
          <ul className="mt-6 divide-y divide-nuit/10">
            {anovatorTable.direct.map((r) => (
              <li key={r.name} className="py-4">
                <p className="font-semibold">{r.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-nuit/65">{r.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div className="mt-6 grid gap-4 text-sm leading-relaxed text-nuit/70 md:grid-cols-2">
        <p className="rounded-2xl bg-sable/70 px-6 py-5">{anovatorTable.rule}</p>
        <p className="rounded-2xl border-l-2 border-or bg-sable/40 px-6 py-5">{anovatorTable.vigilance}</p>
      </div>
    </div>
  );
}
