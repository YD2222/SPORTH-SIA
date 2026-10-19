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
      <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
        {universes.map((u, i) => (
          <motion.div
            key={u.slug}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, ease, delay: (i % 2) * 0.08 }}
          >
            <Link href={`/${u.slug}`} className="group block">
              <div className="relative aspect-[4/4.6] overflow-hidden rounded-t-full rounded-b-[24px] bg-brume">
                <Image src={u.image} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-encre/70 via-transparent to-transparent" />
                <h3 className="absolute bottom-5 left-6 font-display text-[2rem] leading-none text-ivoire">{u.name}</h3>
              </div>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-nuit/75">{u.cardLine}</p>
              <span className="mt-3 inline-flex items-center gap-2 border-b border-or pb-1 text-[0.72rem] font-semibold tracking-[0.16em] uppercase">
                {u.homeCta} <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
