import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { CharlyButton } from "./Charly";
import { Emblem } from "./Logo";
import { RevealWords, Reveal } from "./motion";
import { btn, container } from "./ui";

export function FinalCta({
  title = "Votre évolution commence ici.",
  text = "Prenez le temps de découvrir ce qui vous correspond.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-nuit py-28 text-ivoire lg:py-36">
      {/* Anneaux qui respirent */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivoire/[0.07] animate-souffle"
            style={{ width: 420 + i * 260, height: 420 + i * 260, animationDelay: `${i * 0.9}s` }}
          />
        ))}
      </div>
      <div className={`${container} relative flex flex-col items-center text-center`}>
        <Reveal>
          <span className="grid size-20 place-items-center rounded-full bg-ivoire">
            <Emblem className="size-16" animated />
          </span>
        </Reveal>
        <RevealWords
          text={title}
          emphasis={["ici"]}
          className="font-display mt-10 max-w-4xl text-[clamp(2.6rem,6vw,5.4rem)] leading-[1] font-light"
        />
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-xl text-lg text-ivoire/75">{text}</p>
          <div data-cta className="mt-10 flex flex-wrap justify-center gap-3">
            <CharlyButton className={btn.gold}>
              <MessageCircle className="size-4" /> Parler à Charly
            </CharlyButton>
            <Link href="/reserver" className={btn.ghostLight}>
              Prendre rendez-vous <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <p className="mt-8 text-sm text-ivoire/50">Charly vous oriente si vous le souhaitez — vous pouvez aussi réserver directement.</p>
        </Reveal>
      </div>
    </section>
  );
}
