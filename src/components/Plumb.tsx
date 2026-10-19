"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Le fil à plomb — signature du site.
 * Un fil et un poids doré qui oscillent au gré du curseur et du défilement,
 * puis reviennent toujours à la verticale : l'équilibre retrouvé.
 */
export function Plumb({ length = 520, className = "" }: { length?: number; className?: string }) {
  const arm = useRef<SVGGElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let theta = 0.22; // départ légèrement décalé : il « cherche » son axe
    let omega = 0;
    let impulse = 0;
    let lastX: number | null = null;
    let lastY = window.scrollY;
    let raf = 0;
    let last = performance.now();
    const started = last + 1500; // laisse le temps à l'entrée en scène

    const onMove = (e: PointerEvent) => {
      if (lastX !== null) impulse += Math.max(-40, Math.min(40, e.clientX - lastX)) * 0.0009;
      lastX = e.clientX;
    };
    const onScroll = () => {
      const y = window.scrollY;
      impulse += Math.max(-60, Math.min(60, y - lastY)) * 0.0005;
      lastY = y;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      if (now > started) {
        const k = 9; // rappel vers la verticale
        const c = 1.1; // amortissement
        const breath = Math.sin(now / 2300) * 0.006; // respiration ambiante
        omega += (-k * theta - c * omega) * dt + impulse;
        theta += omega * dt;
        impulse = 0;
        theta = Math.max(-0.5, Math.min(0.5, theta));
        if (arm.current) arm.current.setAttribute("transform", `rotate(${((theta + breath) * 180) / Math.PI} 60 0)`);
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce]);

  const bob = length - 34;

  return (
    <svg viewBox={`0 0 120 ${length + 20}`} className={className} aria-hidden="true" style={{ overflow: "visible" }}>
      {/* point d'attache */}
      <circle cx="60" cy="0" r="3.2" fill="var(--color-or)" />
      <g ref={arm} transform={reduce ? undefined : "rotate(12.6 60 0)"}>
        <motion.line
          x1="60"
          y1="0"
          x2="60"
          y2={bob}
          stroke="var(--color-or)"
          strokeWidth="1"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
        />
        <motion.g
          initial={reduce ? false : { opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1], delay: 1.2 }}
        >
          {/* poids : une goutte inversée, comme un vrai plomb de maçon */}
          <path
            d={`M60 ${bob} C 50 ${bob + 8}, 49 ${bob + 18}, 60 ${bob + 34} C 71 ${bob + 18}, 70 ${bob + 8}, 60 ${bob} Z`}
            fill="url(#plomb)"
          />
          <circle cx="60" cy={bob} r="2.4" fill="var(--color-or)" />
        </motion.g>
      </g>
      <defs>
        <linearGradient id="plomb" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#E6CF9F" />
          <stop offset="0.55" stopColor="#B0894F" />
          <stop offset="1" stopColor="#7A5A2C" />
        </linearGradient>
      </defs>
    </svg>
  );
}
