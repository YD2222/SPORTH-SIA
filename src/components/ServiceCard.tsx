"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, Clock, Plus, UserRound } from "lucide-react";
import type { Service } from "@/content/services";
import { useCharly } from "./Charly";
import { btn } from "./ui";

export function ServiceCard({ s, index }: { s: Service; index: number }) {
  const [open, setOpen] = useState(false);
  const { open: openCharly } = useCharly();
  const detailsId = `details-${s.id}`;

  return (
    <motion.article
      id={s.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: Math.min(index, 3) * 0.06 }}
      className="scroll-mt-28 border-t border-nuit/15 py-9 first:border-t-0 lg:py-11"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <div className="flex flex-wrap items-center gap-2">
            {s.kind === "forfait" && <span className="rounded-full bg-sable px-3 py-1 text-[0.68rem] font-semibold tracking-[0.14em] uppercase">Forfait</span>}
            {s.kind === "cours" && (
              <span className="rounded-full bg-brume px-3 py-1 text-[0.68rem] font-semibold tracking-[0.14em] uppercase">{s.capacity} participants max.</span>
            )}
            {s.priceStatus === "prévisionnel" && (
              <span className="rounded-full border border-or/50 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.14em] text-or uppercase">Tarif prévisionnel</span>
            )}
          </div>
          <h3 className="font-display mt-3 text-[clamp(1.7rem,2.6vw,2.3rem)] leading-tight">{s.name}</h3>
          <p className="mt-3 max-w-xl text-[1.05rem] leading-relaxed text-nuit/70">{s.summary}</p>
        </div>

        <dl className="grid grid-cols-2 gap-4 text-sm lg:col-span-3 lg:grid-cols-1 lg:pt-2">
          <div className="flex items-center gap-2.5">
            <Clock className="size-4 text-or" aria-hidden />
            <dt className="sr-only">Durée</dt>
            <dd>{s.durationLabel}</dd>
          </div>
          <div className="flex items-start gap-2.5">
            <UserRound className="mt-0.5 size-4 shrink-0 text-or" aria-hidden />
            <dt className="sr-only">Professionnel</dt>
            <dd className="text-nuit/70">{s.seller}</dd>
          </div>
        </dl>

        <div data-cta className="flex flex-col gap-4 lg:col-span-3 lg:items-end lg:pt-1 lg:text-right">
          <p className="font-display text-[2.1rem] leading-none">
            {s.priceLabel}
            {s.priceStatus === "prévisionnel" && <span className="sr-only"> (tarif prévisionnel)</span>}
          </p>
          {s.bookable ? (
            <Link href={`/reserver?prestation=${s.id}`} className={`${btn.primary} w-full whitespace-nowrap lg:w-auto`}>
              {s.ctaLabel ?? (s.kind === "forfait" ? "Réserver ce forfait" : "Réserver cette prestation")}
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ) : (
            <button onClick={openCharly} className={`${btn.ghost} w-full lg:w-auto`}>
              Demander à Charly
            </button>
          )}
          {!s.bookable && <p className="text-xs text-ardoise">Réservation en ligne ouverte dès validation du tarif.</p>}
        </div>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={detailsId}
        className="group mt-6 inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.16em] uppercase"
      >
        <span className={`grid size-7 place-items-center rounded-full border border-nuit/20 transition-transform duration-500 ${open ? "rotate-45 bg-nuit text-ivoire" : ""}`}>
          <Plus className="size-3.5" />
        </span>
        {open ? "Masquer le détail" : "À qui s'adresse la séance, déroulement, précautions"}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={detailsId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pt-8 md:grid-cols-3">
              <Detail title="À qui s'adresse la séance" items={s.forWhom} />
              <Detail title="Déroulement" items={s.steps} ordered />
              <div className="space-y-8">
                {s.preparation && <Detail title="Préparation" items={s.preparation} />}
                <Detail title="Précautions et contre-indications" items={s.precautions} />
                {s.safety && <Detail title="Sécurité et information" items={s.safety} />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function Detail({ title, items, ordered }: { title: string; items: string[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <div>
      <p className="eyebrow text-or">{title}</p>
      <List className="mt-4 space-y-2.5 text-[0.95rem] leading-relaxed text-nuit/75">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-nuit/40" aria-hidden />
            {it}
          </li>
        ))}
      </List>
    </div>
  );
}
