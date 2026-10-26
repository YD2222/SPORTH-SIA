"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { createElement, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Apparition douce au défilement : montée légère + fondu. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -4% 0px" }}
      transition={{ duration: 0.7, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Titre révélé mot à mot, comme une respiration. */
export function RevealWords({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  emphasis = [],
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Mots affichés en italique doré. */
  emphasis?: string[];
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return createElement(
    as,
    { className, "aria-label": text },
    words.map((w, i) => {
      const em = emphasis.includes(w.replace(/[.,!?]/g, ""));
      return (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${em ? "italic text-or" : ""}`}
            initial={reduce ? false : { y: "105%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -4% 0px" }}
            transition={{ duration: 0.75, ease, delay: delay + i * Math.min(stagger, 0.04) }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      );
    }),
  );
}

/** Image dévoilée par un rideau qui s'ouvre de bas en haut. */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0% round 0px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      viewport={{ once: true, margin: "0px 0px -4% 0px" }}
      transition={{ duration: 0.95, ease, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
