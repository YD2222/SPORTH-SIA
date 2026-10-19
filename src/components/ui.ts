export const btn = {
  primary:
    "group inline-flex items-center justify-center gap-2 rounded-full bg-nuit px-6 py-3.5 text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-ivoire transition-all duration-500 ease-[var(--ease-souffle)] hover:bg-encre hover:shadow-[0_12px_30px_-12px_rgba(24,51,74,0.6)] active:scale-[0.98]",
  gold:
    "group inline-flex items-center justify-center gap-2 rounded-full bg-or px-6 py-3.5 text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-encre transition-all duration-500 ease-[var(--ease-souffle)] hover:bg-or-clair active:scale-[0.98]",
  ghost:
    "group inline-flex items-center justify-center gap-2 rounded-full border border-nuit/25 px-6 py-3.5 text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-nuit transition-all duration-500 ease-[var(--ease-souffle)] hover:border-nuit hover:bg-nuit hover:text-ivoire active:scale-[0.98]",
  ghostLight:
    "group inline-flex items-center justify-center gap-2 rounded-full border border-ivoire/30 px-6 py-3.5 text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-ivoire transition-all duration-500 ease-[var(--ease-souffle)] hover:border-ivoire hover:bg-ivoire hover:text-nuit active:scale-[0.98]",
  link: "group inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-nuit",
};

export const container = "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12";

export const euro = (n: number) => `${n.toLocaleString("fr-FR")} €`;
