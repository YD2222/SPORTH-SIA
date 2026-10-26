import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { body360, servicesOf } from "@/content/services";
import { site } from "@/content/site";
import { ServiceCard } from "@/components/ServiceCard";
import { AnovatorTable } from "@/components/AnovatorTable";
import { PhotoSlot } from "@/components/Soon";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { CharlyButton } from "@/components/Charly";
import { ImageReveal, Reveal, RevealWords } from "@/components/motion";
import { JsonLd, breadcrumbLd, faqLd, servicesLd } from "@/components/JsonLd";
import { btn, container } from "@/components/ui";

export const metadata: Metadata = {
  title: body360.seoTitle,
  description: body360.seoDescription,
  alternates: { canonical: "/body-360" },
  openGraph: { title: `${body360.fullName} · Paris 7e`, description: body360.seoDescription, url: "/body-360" },
};

export default function Body360Page() {
  const list = servicesOf("body-360");
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: body360.name, path: "/body-360" },
          ]),
          faqLd(body360.faq),
          ...servicesLd(list, `${site.url}/body-360`),
        ]}
      />

      <section className="relative overflow-hidden pt-[110px] pb-12 lg:pt-[130px] lg:pb-16">
        <div className={container}>
          <nav aria-label="Fil d'Ariane" className="text-xs text-ardoise">
            <Link href="/" className="hover:text-nuit">Accueil</Link> <span className="mx-2 text-or">/</span> {body360.name}
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <h1 className="lg:col-span-7">
              <span className="eyebrow block text-or">Évaluations corporelles</span>
              <span className="font-display mt-4 block text-[clamp(1.4rem,2.4vw,2rem)] font-light tracking-[0.18em] text-ardoise">SPORTHESIA</span>
              <RevealWords as="span" text="BODY 360" className="font-display block text-[clamp(3.6rem,11vw,9.5rem)] leading-[0.9] font-light" />
            </h1>
            <Reveal delay={0.4} className="lg:col-span-5">
              <p className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-snug font-light">{body360.hook}</p>
              <p className="mt-4 text-lg leading-relaxed text-nuit/70">{body360.intro}</p>
              <div data-cta className="mt-8 flex flex-wrap gap-3">
                <Link href="#bilan-anovator" className={btn.primary}>
                  Découvrir le bilan ANOVATOR <ArrowDown className="size-4" />
                </Link>
                <Link href="#bilan-body-360" className={btn.ghost}>
                  Découvrir BODY 360
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Visuel principal — photo A */}
      <section className="pb-20">
        <figure className={container}>
          {body360.image ? (
            <ImageReveal className="relative mx-auto aspect-[4/5] max-w-[1100px] overflow-hidden rounded-[32px] sm:aspect-[16/10]">
              <Image src={body360.image} alt={body360.imageAlt} fill priority sizes="(min-width:1100px) 1100px, 100vw" className="object-cover object-[30%_50%] sm:object-center" />
            </ImageReveal>
          ) : (
            <PhotoSlot caption="Photographie en cours de réalisation" className="aspect-[4/3] rounded-[32px] sm:aspect-[16/7]" />
          )}
          <figcaption className="mx-auto mt-3 max-w-[1100px] text-sm text-ardoise">{body360.imageCaption}</figcaption>
        </figure>
      </section>

      {/* Deux offres */}
      <section id="offres" aria-labelledby="offres-title" className="scroll-mt-20 pb-20">
        <div className={container}>
          <p className="eyebrow text-or">Deux offres distinctes</p>
          <h2 id="offres-title" className="font-display mt-4 mb-6 text-[clamp(2.2rem,4vw,3.4rem)] leading-tight font-light">
            Choisissez votre évaluation
          </h2>
          <div>
            {list.map((s, i) => (
              <ServiceCard key={s.id} s={s} index={i} />
            ))}
          </div>

          <Reveal className="mt-10 rounded-[24px] bg-sable/70 p-7 sm:p-9">
            <h3 className="eyebrow text-or">À ne pas confondre</h3>
            <ul className="mt-4 space-y-2.5 leading-relaxed text-nuit/75">
              <li>
                Le <Link href="/posture" className="underline decoration-or underline-offset-4">bilan postural AeroCore™</Link> (200 €) est une prestation
                distincte, centrée sur la posture. Avec le bilan BODY 360, l&apos;option AeroCore™ est proposée à 40 € et reste
                facultative.
              </li>
              <li>En dehors de la cryolipolyse, de BODY 360 et des parcours silhouette, aucun bilan ANOVATOR n&apos;est demandé avant les autres prestations.</li>
              <li>Les suivis BODY 360 seront proposés après validation de leurs modalités et de leurs tarifs.</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="prestations-anovator" aria-labelledby="anovator-title" className="scroll-mt-20 pb-24">
        <div className={container}>
          <p className="eyebrow text-or">Bilan ANOVATOR</p>
          <h2 id="anovator-title" className="font-display mt-4 mb-10 max-w-3xl text-[clamp(2.2rem,4vw,3.4rem)] leading-tight font-light">
            Pour quelles prestations&nbsp;?
          </h2>
          <AnovatorTable />
        </div>
      </section>

      <section aria-labelledby="faq-title" className="pb-16 sm:pb-24 lg:pb-32">
        <div className={`${container} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <p className="eyebrow text-or">Questions fréquentes</p>
            <h2 id="faq-title" className="font-display mt-4 text-[clamp(2rem,3.4vw,2.8rem)] leading-tight font-light">
              Vos questions, BODY 360
            </h2>
            <p className="mt-6 text-nuit/70">
              Une autre question&nbsp;? <CharlyButton className="font-semibold underline decoration-or underline-offset-4">Parler à Charly</CharlyButton>
            </p>
          </div>
          <div className="lg:col-span-8">
            <Faq items={body360.faq} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
