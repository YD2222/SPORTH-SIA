import Image from "next/image";
import type { Soon } from "@/content/services";
import { Emblem } from "./Logo";
import { ImageReveal, Reveal } from "./motion";

/** Emplacement photo en attente : sobre, jamais une fausse image d'appareil. */
export function PhotoSlot({ caption, className = "" }: { caption?: string; className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-br from-brume via-ivoire to-sable p-8 text-center ${className}`}>
      <span aria-hidden className="absolute -top-1/3 -right-1/4 size-[70%] rounded-full border border-or/20" />
      <span aria-hidden className="absolute -bottom-1/4 -left-1/4 size-[60%] rounded-full border border-nuit/10" />
      <Emblem className="relative size-14 opacity-80" />
      {caption && <p className="relative max-w-[24ch] text-sm text-ardoise">{caption}</p>}
    </div>
  );
}

/** Encart « Prochainement chez SPORTHESIA » : sans prix, durée ni réservation. */
export function SoonFeature({ item }: { item: Soon }) {
  return (
    <article id={item.id} className="scroll-mt-28 overflow-hidden rounded-[32px] border border-or/30 bg-white/40">
      <div className="grid lg:grid-cols-12">
        <div className="p-7 sm:p-10 lg:col-span-7 lg:p-14">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-or">
              <span className="h-px w-8 bg-or" /> {item.label} chez SPORTHESIA®
            </p>
            <h3 className="font-display mt-5 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.08] font-light">{item.title}</h3>
            {item.lead && <p className="font-display mt-4 text-xl text-ardoise italic">{item.lead}</p>}
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-nuit/75">
              {item.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {item.footer && <p className="mt-6 text-sm font-semibold text-nuit/60">{item.footer}</p>}
            {item.cta && (
              <span
                aria-disabled="true"
                className="mt-8 inline-flex cursor-default items-center gap-2 rounded-full border border-dashed border-nuit/30 px-6 py-3.5 text-[0.78rem] font-semibold tracking-[0.14em] text-nuit/60 uppercase"
              >
                {item.cta}
              </span>
            )}
          </Reveal>
        </div>
        <figure className="relative min-h-[280px] lg:col-span-5">
          {item.image ? (
            <ImageReveal className="absolute inset-0">
              <Image src={item.image} alt={item.imageAlt ?? ""} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </ImageReveal>
          ) : (
            <PhotoSlot caption={item.imageCaption} className="absolute inset-0" />
          )}
          {item.image && item.imageCaption && (
            <figcaption className="absolute inset-x-4 bottom-4 rounded-xl bg-encre/55 px-3 py-2 text-[0.72rem] text-ivoire/90 backdrop-blur">
              {item.imageCaption}
            </figcaption>
          )}
        </figure>
      </div>
    </article>
  );
}

/** Offre à venir, version compacte. */
export function SoonOffer({ item }: { item: Soon }) {
  return (
    <div id={item.id} className="scroll-mt-28 border-t border-nuit/15 py-9 lg:py-11">
      <div className="grid gap-4 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-9">
          <span className="rounded-full border border-nuit/20 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.14em] text-ardoise uppercase">{item.label}</span>
          <h3 className="font-display mt-3 text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight text-nuit/80">{item.title}</h3>
          {item.paragraphs.map((p) => (
            <p key={p} className="mt-2 max-w-xl text-nuit/60">
              {p}
            </p>
          ))}
        </div>
        <p className="text-sm text-ardoise lg:col-span-3 lg:text-right">Tarif et réservation communiqués prochainement</p>
      </div>
    </div>
  );
}
