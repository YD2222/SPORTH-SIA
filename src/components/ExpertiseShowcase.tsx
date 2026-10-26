import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { assessments, expertisePhoto } from "@/content/expertise";
import { ImageReveal, Reveal } from "./motion";

/**
 * Une grande photo, puis les bilans en dessous (retour client du 21/10).
 * Tant que la photo d'ensemble du client n'est pas fournie, une mosaïque des quatre bilans
 * forme une seule image continue, alignée sur les textes.
 */
export function ExpertiseShowcase({ detailed = false }: { detailed?: boolean }) {
  return (
    <div>
      {expertisePhoto ? (
        <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-[32px] sm:aspect-[16/7]">
          <Image src={expertisePhoto.src} alt={expertisePhoto.alt} fill sizes="100vw" className="object-cover" />
        </ImageReveal>
      ) : (
        <ImageReveal className="overflow-hidden rounded-[32px]">
          <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-4">
          {assessments.map((a) => (
            <div key={a.id} className="relative aspect-square overflow-hidden bg-brume sm:aspect-[3/4] lg:aspect-[3/4.4]">
              <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" style={{ objectPosition: a.focus }} />
            </div>
          ))}
          </div>
        </ImageReveal>
      )}

      <div
        className={
          detailed
            ? "mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2"
            : "-mx-5 mt-8 flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
        }
      >
        {assessments.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.06} className={detailed ? "" : "w-[78%] shrink-0 snap-start sm:w-auto sm:shrink"}>
            <article id={detailed ? a.id : undefined} className="scroll-mt-28 border-t border-or/40 pt-5">
              <h3 className="font-display text-[1.45rem] leading-tight">{a.name}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-nuit/70">{a.text}</p>
              {detailed && <p className="mt-3 text-sm leading-relaxed text-ardoise">{a.detail}</p>}
              {!(detailed && a.href.startsWith("/expertise")) && (
                <Link href={a.href} className="group mt-4 inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.16em] uppercase">
                  {a.linkLabel}
                  <ArrowUpRight className="size-4 text-or transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
