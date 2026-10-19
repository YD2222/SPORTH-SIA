"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { RevealWords } from "../motion";
import { Plumb } from "../Plumb";
import { btn, container } from "../ui";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-[104px] pb-16 lg:min-h-[100svh] lg:pt-[120px] lg:pb-10">
      {/* halo de lumière naturelle */}
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] size-[900px] rounded-full bg-[radial-gradient(circle,rgba(231,237,240,1)_0%,rgba(231,237,240,0)_65%)]" />

      <div className={`${container} relative grid items-end gap-12 lg:grid-cols-12 lg:gap-8`}>
        <motion.div style={{ y: textY }} className="lg:col-span-7 lg:pb-16">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="eyebrow flex items-center gap-3 text-ardoise"
          >
            <span className="h-px w-8 bg-or" /> Votre corps, votre équilibre · Paris 7e
          </motion.p>

          <RevealWords
            as="h1"
            text="Rien n'est figé. Tout peut évoluer."
            emphasis={["évoluer"]}
            delay={0.2}
            stagger={0.08}
            className="font-display mt-7 text-[clamp(3rem,8.4vw,7.6rem)] leading-[0.94] font-light text-nuit"
          />

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.9 }}
            className="mt-8 max-w-[34rem] text-lg leading-relaxed text-nuit/75"
          >
            Découvrez une autre façon de prendre soin de votre corps, à votre rythme. Une approche personnalisée de la posture, du mouvement et du bien-être corporel.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.05 }}
            data-cta
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link href="#univers" className={btn.primary}>
              Découvrir les univers
              <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" />
            </Link>
            <Link href="/reserver" className={btn.ghost}>
              Prendre rendez-vous
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* L'arche : une porte ouverte sur le lieu, traversée par le fil à plomb */}
        <div className="relative mx-auto w-full max-w-[460px] lg:col-span-5 lg:max-w-none">
          <motion.div
            initial={reduce ? false : { clipPath: "inset(100% 0 0 0 round 999px 999px 28px 28px)" }}
            animate={{ clipPath: "inset(0% 0 0 0 round 999px 999px 28px 28px)" }}
            transition={{ duration: 1.6, ease, delay: 0.15 }}
            className="relative aspect-[4/5.4] overflow-hidden rounded-t-full rounded-b-[28px] bg-brume"
          >
            <motion.div style={{ y: imgY }} className="absolute inset-[-8%_0_-8%_0]">
              <Image
                src="/images/hero.jpg"
                alt="Femme en posture d'équilibre sur un tapis, dans un studio baigné de lumière naturelle"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-[50%_35%]"
              />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-encre/35 via-transparent to-transparent" />
          </motion.div>

          <Plumb length={430} className="pointer-events-none absolute top-[-36px] left-1/2 h-[calc(100%-40px)] w-[120px] -translate-x-1/2 drop-shadow-[0_6px_10px_rgba(15,35,51,0.25)]" />

          <motion.div
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 1.6 }}
            className="absolute bottom-6 -left-4 rounded-2xl bg-ivoire/90 px-5 py-4 shadow-[0_20px_50px_-20px_rgba(15,35,51,0.4)] backdrop-blur sm:-left-10"
          >
            <p className="eyebrow text-or">Votre corps</p>
            <p className="font-display text-xl">votre équilibre.</p>
          </motion.div>
        </div>
      </div>

      <div className={`${container} relative mt-14 hidden items-center justify-between text-[0.7rem] font-semibold tracking-[0.24em] text-nuit/50 uppercase lg:flex`}>
        <span>Posture</span>
        <span className="h-px flex-1 mx-6 bg-nuit/10" />
        <span>Mouvement</span>
        <span className="h-px flex-1 mx-6 bg-nuit/10" />
        <span>Récupération</span>
        <span className="h-px flex-1 mx-6 bg-nuit/10" />
        <span>Silhouette</span>
      </div>
    </section>
  );
}
