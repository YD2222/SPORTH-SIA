"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Défilement natif du navigateur : fluide sur tous les appareils, sans lissage JavaScript. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
