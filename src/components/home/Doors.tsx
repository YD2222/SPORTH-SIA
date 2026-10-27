"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { universes } from "@/content/services";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Les quatre portes : quatre arches de même importance visuelle.
 * Desktop : la porte survolée s'élargit. Mobile : quatre cartes empilées.
 */
export function Doors() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <>
      {/* Desktop */}
      <div className="hidden h-[620px] gap-4 lg:flex">
        {universes.map((u, i) => {
          const isActive = active === i;
          return (
            <motion.div
              key={u.slug}
              layout={!reduce}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              initial={reduce ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 1.1, ease, delay: i * 0.1, layout: { duration: 0.8, ease } }}
              style={{ flexGrow: isActive ? 2.3 : 1, flexBasis: 0 }}
              className="relative min-w-0"
            >
              <Link
                href={`/${u.slug}`}
                className="group relative block h-full overflow-hidden rounded-t-full rounded-b-[28px] bg-brume"
                aria-label={`${u.name} — ${u.cardLine}`}
              >
                <Image
                  src={u.image}
                  style={{ objectPosition: u.imageFocus }}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className={`object-cover transition-transform duration-[1.6s] ease-[var(--ease-souffle)] ${isActive ? "scale-100" : "scale-110"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-encre/85 via-encre/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-ivoire">
                  <h3 className="font-display text-[2.1rem] leading-none">{u.name}</h3>
                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, height: isActive ? "auto" : 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 max-w-[28ch] text-[1.02rem] leading-relaxed text-ivoire/85">{u.cardLine}</p>
                    <span className="mt-6 inline-flex items-center gap-2 border-b border-or-clair pb-1 text-[0.75rem] font-semibold tracking-[0.16em] uppercase">
                      {u.homeCta}
                      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile & tablette */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 lg:hidden">
        {universes.map((u, i) => (
          <motion.div
            key={u.slug}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, ease, delay: (i % 2) * 0.08 }}
          >
            <Link href={`/${u.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[20px] bg-brume">
                <Image src={u.image} alt="" fill sizes="(min-width: 640px) 50vw, 50vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" style={{ objectPosition: u.imageFocus }} />
                <div className="absolute inset-0 bg-gradient-to-t from-encre/70 via-transparent to-transparent" />
                <h3 className="absolute bottom-3 left-0 right-0 text-center font-display text-[1.25rem] leading-none text-ivoire sm:text-[1.8rem]">{u.name}</h3>
              </div>
              <p className="mt-3 text-[0.88rem] leading-snug text-nuit/75 sm:text-[1rem]">{u.cardLine}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 border-b border-or pb-0.5 text-[0.62rem] font-semibold tracking-[0.12em] uppercase sm:text-[0.72rem]">
                {u.homeCta} <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
