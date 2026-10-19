import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { CharlyButton } from "@/components/Charly";
import { container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Prendre rendez-vous",
  description: "Réservez en ligne votre bilan postural, cours en petit groupe, massage bien-être ou soin silhouette chez SPORTHESIA, Paris 7e.",
  alternates: { canonical: "/reserver" },
};

type Props = { searchParams: Promise<{ prestation?: string; source?: string }> };

export default async function ReserverPage({ searchParams }: Props) {
  const { prestation, source } = await searchParams;
  return (
    <section className="pt-[110px] pb-28 lg:pt-[140px]">
      <div className={container}>
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-or">Prendre rendez-vous</p>
            <h1 className="font-display mt-4 text-[clamp(2.8rem,6vw,5rem)] leading-[1] font-light">
              Votre premier pas, <span className="text-or italic">en quelques clics.</span>
            </h1>
          </div>
          <p className="max-w-sm text-nuit/70">
            Besoin d&apos;être orienté&nbsp;?{" "}
            <CharlyButton className="font-semibold underline decoration-or underline-offset-4">Parler à Charly</CharlyButton> — ce n&apos;est jamais obligatoire pour
            réserver.
          </p>
        </div>
        <BookingFlow initialService={prestation} source={source?.slice(0, 40)} />
      </div>
    </section>
  );
}
