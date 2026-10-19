import type { ReactNode } from "react";
import { container } from "./ui";

export function ProsePage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section className="pt-[120px] pb-28 lg:pt-[150px]">
      <div className={`${container} max-w-[900px]`}>
        <p className="eyebrow text-or">{eyebrow}</p>
        <h1 className="font-display mt-4 text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02] font-light">{title}</h1>
        {intro && <p className="mt-6 text-lg leading-relaxed text-nuit/70">{intro}</p>}
        <div className="mt-14 space-y-10 leading-relaxed text-nuit/80 [&_a]:underline [&_a]:decoration-or [&_a]:underline-offset-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-nuit [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-1.5">
          {children}
        </div>
      </div>
    </section>
  );
}

/** Mention visible des informations restant à fournir par le client. */
export function Todo({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-or-clair/40 px-1.5 py-0.5 text-nuit">{children}</mark>;
}
