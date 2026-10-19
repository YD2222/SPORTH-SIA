import Link from "next/link";

/**
 * Emblème provisoire inspiré du logo déposé (trois anneaux entrelacés,
 * silhouette centrale, cercle extérieur doré).
 * TODO : remplacer par le fichier vectoriel officiel du client.
 */
export function Emblem({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <circle cx="32" cy="32" r="30" stroke="var(--color-or)" strokeWidth="1.6" />
      <g strokeWidth="1.5" className={animated ? "origin-center animate-souffle" : undefined}>
        <circle cx="32" cy="26" r="11" stroke="#18334A" />
        <circle cx="26.5" cy="35.5" r="11" stroke="#B5463A" />
        <circle cx="37.5" cy="35.5" r="11" stroke="#D9853B" />
      </g>
      <circle cx="32" cy="22.5" r="2.3" fill="#18334A" />
      <path d="M32 25.5v12M26 29.5l6 2 6-2M32 37.5l-3.5 7M32 37.5l3.5 7" stroke="#18334A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`} aria-label="SPORTHESIA — accueil">
      <span className={`grid size-10 place-items-center rounded-full ${light ? "bg-ivoire" : ""}`}>
        <Emblem className="size-10 transition-transform duration-700 ease-[var(--ease-souffle)] group-hover:rotate-[24deg]" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.32rem] tracking-[0.14em] ${light ? "text-ivoire" : "text-nuit"}`}>SPORTHESIA</span>
        <span className={`mt-1 whitespace-nowrap text-[0.55rem] font-semibold tracking-[0.28em] uppercase ${light ? "text-or-clair" : "text-or"}`}>
          Votre corps, votre équilibre.
        </span>
      </span>
    </Link>
  );
}
