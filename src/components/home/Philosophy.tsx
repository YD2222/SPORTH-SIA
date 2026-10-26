"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { container } from "../ui";

/** Texte fondateur, validé par le client — reproduit intégralement. */
const paragraphs = [
  "Notre corps raconte aussi notre histoire. Le temps, les épreuves de la vie, un accident, le stress, les émotions ou l'inactivité peuvent laisser des traces et créer des blocages, physiques, mentaux ou émotionnels.",
  "Notre posture, nos mouvements, notre silhouette et notre bien-être sont liés. Lorsqu'un de ces équilibres est perturbé, les autres peuvent être affectés.",
  "Chez SPORTHESIA, nous croyons aux bienfaits du mouvement, de l'attention portée à soi et d'un accompagnement adapté.",
  "Améliorer sa posture, retrouver le plaisir de bouger, prendre soin de sa silhouette et favoriser la récupération : autant de façons de renouer avec son corps et d'explorer de nouvelles possibilités.",
  "La transformation commence par l'envie d'avancer. Devenez acteur de votre évolution, à votre rythme.",
];

function Para({ text, first }: { text: string; first?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.45"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.16, 1]);
  return (
    <motion.p
      ref={ref}
      style={{ opacity }}
      className={
        first
          ? "font-display text-[clamp(1.55rem,3.6vw,3.1rem)] leading-[1.15] font-light"
          : "font-display text-[clamp(1.15rem,2.3vw,2rem)] leading-[1.35] font-light"
      }
    >
      {text}
    </motion.p>
  );
}

export function Philosophy() {
  return (
    <section aria-labelledby="philo-title" className="relative py-16 sm:py-24 lg:py-40">
      <div className={`${container} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow text-or">Notre philosophie</p>
            <h2 id="philo-title" className="font-display mt-5 text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.02]">
              Rien n&apos;est figé.
              <br />
              <span className="italic text-ardoise">Tout peut évoluer.</span>
            </h2>
            {/* La ligne d'axe qui se remplit à la lecture */}
            <div aria-hidden className="mt-10 hidden h-40 w-px bg-nuit/10 lg:block">
              <div className="h-full w-px origin-top animate-[souffle_7s_ease-in-out_infinite] bg-gradient-to-b from-or to-transparent" />
            </div>
          </div>
        </div>
        <div className="space-y-6 sm:space-y-10 lg:col-span-7 lg:col-start-6">
          {paragraphs.map((p, i) => (
            <Para key={i} text={p} first={i === 0} />
          ))}
          <p className="pt-4 text-[0.8rem] font-semibold tracking-[0.2em] text-or uppercase">Avec SPORTHESIA, osez le premier pas !</p>
        </div>
      </div>
    </section>
  );
}
