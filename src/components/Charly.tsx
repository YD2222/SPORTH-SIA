"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X, ArrowUpRight, MessageCircle } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { site } from "@/content/site";
import { body360, universes, servicesOf } from "@/content/services";
import { Emblem } from "./Logo";

type Ctx = { open: () => void; close: () => void };
const CharlyContext = createContext<Ctx>({ open: () => {}, close: () => {} });
export const useCharly = () => useContext(CharlyContext);

/**
 * Charly — orientation et prise de rendez-vous.
 * Si NEXT_PUBLIC_CHARLY_URL est défini, le widget CharlySecure® est chargé dans le panneau.
 * Sinon, une orientation guidée (sans conversation imposée) mène directement aux réservations.
 */
export function CharlyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <CharlyContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-[80]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button aria-label="Fermer" onClick={close} className="absolute inset-0 bg-encre/40 backdrop-blur-sm" />
            <motion.aside
              role="dialog"
              data-lenis-prevent
              aria-modal="true"
              aria-labelledby="charly-title"
              className="absolute right-0 bottom-0 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-ivoire shadow-2xl sm:top-3 sm:right-3 sm:bottom-3 sm:max-h-none sm:w-[440px] sm:rounded-[2rem]"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="flex items-center gap-3 border-b border-nuit/10 px-6 py-5">
                <Emblem className="size-10" animated />
                <div className="flex-1">
                  <p id="charly-title" className="font-display text-xl">Charly</p>
                  <p className="text-xs text-ardoise">Orientation et prise de rendez-vous</p>
                </div>
                <button onClick={close} className="grid size-10 place-items-center rounded-full hover:bg-nuit/5" aria-label="Fermer le panneau Charly">
                  <X className="size-5" />
                </button>
              </header>
              {site.charlyUrl ? (
                <iframe src={site.charlyUrl} title="Charly — CharlySecure®" className="h-full min-h-[70dvh] w-full flex-1" />
              ) : (
                <Orientation onNavigate={close} />
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </CharlyContext.Provider>
  );
}

function Orientation({ onNavigate }: { onNavigate: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);
  const options = [
    ...universes.map((x) => ({ slug: x.slug as string, name: x.name, line: x.cardLine })),
    { slug: body360.slug as string, name: "BODY 360", line: "Faire le point avec des mesures et un bilan corporel." },
  ];
  const u = options.find((x) => x.slug === choice);
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="max-w-[34ch] rounded-2xl rounded-tl-sm bg-brume px-4 py-3 text-[0.95rem] leading-relaxed">
        Bonjour, je suis Charly. Une question sur une prestation, un tarif ou votre rendez-vous&nbsp;? Je vous aide à trouver l&apos;information et vous oriente vers la réservation adaptée.
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {options.map((x) => (
          <button
            key={x.slug}
            onClick={() => setChoice(x.slug)}
            aria-pressed={choice === x.slug}
            className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors last:col-span-2 ${
              choice === x.slug ? "border-nuit bg-nuit text-ivoire" : "border-nuit/15 hover:border-nuit/40"
            }`}
          >
            <span className="block font-semibold">{x.name}</span>
            <span className={`mt-0.5 block text-xs ${choice === x.slug ? "text-ivoire/70" : "text-ardoise"}`}>{x.line}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {u && (
          <motion.div key={u.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6">
            <div className="ml-auto w-fit max-w-[30ch] rounded-2xl rounded-tr-sm bg-nuit px-4 py-3 text-sm text-ivoire">{u.name}</div>
            <div className="mt-4 max-w-[34ch] rounded-2xl rounded-tl-sm bg-brume px-4 py-3 text-[0.95rem] leading-relaxed">
              Voici les prestations correspondantes, avec leur durée et leur prix.
            </div>
            <ul className="mt-4 space-y-2">
              {servicesOf(u.slug as Parameters<typeof servicesOf>[0])
                .filter((s) => s.kind !== "forfait")
                .map((s) => (
                  <li key={s.id}>
                    <Link
                      href={s.bookable ? `/reserver?prestation=${s.id}` : `/${u.slug}#${s.id}`}
                      onClick={onNavigate}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-nuit/10 bg-white/60 px-4 py-3 transition-colors hover:border-or"
                    >
                      <span>
                        <span className="block text-sm font-semibold">{s.name}</span>
                        <span className="text-xs text-ardoise">
                          {s.durationLabel} · {s.priceLabel}
                          {s.priceStatus === "prévisionnel" && " (prévisionnel)"}
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 rounded-2xl border border-dashed border-nuit/20 p-4 text-sm text-ardoise">
        <MessageCircle className="mb-2 size-4 text-or" />
        Une question plus précise&nbsp;? Écrivez-nous à{" "}
        <a className="font-semibold text-nuit underline decoration-or underline-offset-4" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </div>
    </div>
  );
}

export function CharlyButton({ className = "", children = "Parler à Charly" }: { className?: string; children?: ReactNode }) {
  const { open } = useCharly();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
