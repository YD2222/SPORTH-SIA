import type { Metadata } from "next";
import { NewsCards } from "@/components/NewsCards";
import { container } from "@/components/ui";
import { activeNews } from "@/content/news";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Actualités et offres du moment",
  description: "Offres découverte, forfaits, événements et nouvelles prestations chez SPORTHESIA, Paris 7e.",
  alternates: { canonical: "/actualites" },
};

export default function Page() {
  return (
    <section className="pt-[120px] pb-28 lg:pt-[150px]">
      <div className={container}>
        <p className="eyebrow text-or">En ce moment</p>
        <h1 className="font-display mt-4 mb-14 max-w-3xl text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02] font-light">Actualités et offres du moment</h1>
        <NewsCards items={activeNews()} />
      </div>
    </section>
  );
}
