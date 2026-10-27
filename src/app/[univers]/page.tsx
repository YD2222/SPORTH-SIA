import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { bookingConditions, getUniverse, servicesOf, universes } from "@/content/services";
import { site } from "@/content/site";
import { ServiceCard } from "@/components/ServiceCard";
import { SoonFeature, SoonOffer } from "@/components/Soon";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { CharlyButton } from "@/components/Charly";
import { ImageReveal, Reveal, RevealWords } from "@/components/motion";
import { JsonLd, breadcrumbLd, faqLd, servicesLd } from "@/components/JsonLd";
import { btn, container } from "@/components/ui";

export const dynamicParams = false;
export const generateStaticParams = () => universes.map((u) => ({ univers: u.slug }));

type Props = { params: Promise<{ univers: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const u = getUniverse((await params).univers);
  if (!u) return {};
  return {
    title: u.seoTitle,
    description: u.seoDescription,
    keywords: u.keywords,
    alternates: { canonical: `/${u.slug}` },
    openGraph: {
      title: `${u.name} — ${u.title} · SPORTHESIA`,
      description: u.seoDescription,
      url: `/${u.slug}`,
      images: [{ url: u.image, alt: u.imageAlt }],
    },
  };
}

export default async function UniversePage({ params }: Props) {
  const u = getUniverse((await params).univers);
  if (!u) notFound();
  const list = servicesOf(u.slug);
  const others = universes.filter((x) => x.slug !== u.slug);
  const pageUrl = `${site.url}/${u.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: u.name, path: `/${u.slug}` },
          ]),
          faqLd(u.faq),
          ...servicesLd(list, pageUrl),
        ]}
      />

      {/* En-tête de l'univers */}
      <section className="relative overflow-hidden pt-[110px] pb-16 lg:pt-[130px] lg:pb-24">
        <div className={`${container} grid items-end gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-7">
            <nav aria-label="Fil d'Ariane" className="text-xs text-ardoise">
              <Link href="/" className="hover:text-nuit">Accueil</Link> <span className="mx-2 text-or">/</span> {u.name}
            </nav>
            <h1 className="mt-8">
              <span className="eyebrow block text-or">Univers {u.name}</span>
              <RevealWords
                as="span"
                text={u.name}
                className="font-display mt-4 block text-[clamp(3.6rem,11vw,9.5rem)] leading-[0.9] font-light"
              />
              <span className="font-display mt-3 block text-[clamp(1.6rem,3vw,2.6rem)] leading-tight font-light text-ardoise italic">{u.title}</span>
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-nuit/75">{u.hook}</p>
              <div data-cta className="mt-10 flex flex-wrap gap-3">
                <Link href="#prestations" className={btn.primary}>
                  {u.cta} <ArrowDown className="size-4" />
                </Link>
                <CharlyButton className={btn.ghost}>Parler à Charly</CharlyButton>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <ImageReveal className="relative mx-auto aspect-[4/5] max-w-[480px] overflow-hidden rounded-t-full rounded-b-[28px] bg-brume">
              <Image src={u.image} alt={u.imageAlt} fill priority sizes="(min-width:1024px) 38vw, 90vw" className="object-cover" style={{ objectPosition: u.imageFocus }} />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section className="bg-brume/70 py-16 sm:py-24 lg:py-32">
        <div className={`${container} grid gap-14 lg:grid-cols-12 lg:items-center`}>
          <div className="space-y-6 lg:col-span-6">
            {u.intro.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "font-display text-[clamp(1.7rem,2.8vw,2.4rem)] leading-snug font-light" : "text-lg leading-relaxed text-nuit/75"}>{p}</p>
              </Reveal>
            ))}
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ImageReveal
              className={`relative overflow-hidden rounded-[28px] ${u.detailImagePortrait ? "mx-auto aspect-[700/1024] max-w-[460px] bg-white" : "aspect-[4/3]"}`}
            >
              <Image
                src={u.detailImage}
                alt={u.detailImageAlt}
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className={u.detailImagePortrait ? "object-contain" : "object-cover"}
              />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section id="prestations" aria-labelledby="prestations-title" className="scroll-mt-20 py-16 sm:py-24 lg:py-32">
        <div className={container}>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-or">Prestations et tarifs</p>
              <h2 id="prestations-title" className="font-display mt-4 text-[clamp(2.2rem,4vw,3.4rem)] leading-tight font-light">
                Ce que nous proposons
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ardoise">
              Prestations non conventionnées. Un bilan ANOVATOR préalable est demandé uniquement lorsque c&apos;est indiqué. Prix publics TTC.
            </p>
          </div>
          <div>
            {list.map((s, i) => (
              <ServiceCard key={s.id} s={s} index={i} />
            ))}
            {u.soon
              ?.filter((x) => x.label === "Offre à venir")
              .map((x) => (
                <SoonOffer key={x.id} item={x} />
              ))}
          </div>

          {u.info && (
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {u.info.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.06} className="rounded-[24px] bg-brume/70 p-7">
                  <h3 className="eyebrow text-or">{b.title}</h3>
                  <ul className="mt-4 space-y-2.5 text-[0.95rem] leading-relaxed text-nuit/75">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-or" aria-hidden />
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          )}

          {u.notes.length > 0 && (
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {u.notes.map((n) => (
                <p key={n} className="rounded-2xl bg-sable/70 px-6 py-5 text-[0.95rem] leading-relaxed text-nuit/75">
                  {n}
                </p>
              ))}
            </div>
          )}

          <details className="group mt-10 rounded-2xl border border-nuit/15 px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
              Conditions de réservation, d&apos;annulation et de paiement
              <span className="text-or transition-transform duration-500 group-open:rotate-45">+</span>
            </summary>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-nuit/70">
              {bookingConditions.map((c) => (
                <li key={c}>— {c}</li>
              ))}
            </ul>
            <Link href="/conditions" className="mt-4 inline-block text-sm underline decoration-or underline-offset-4">
              Conditions générales applicables
            </Link>
          </details>
        </div>
      </section>

      {/* Prochainement chez SPORTHESIA */}
      {u.soon?.some((x) => x.label === "Prochainement") && (
        <section aria-label="Prochainement chez SPORTHESIA" className="pb-8">
          <div className={`${container} space-y-8`}>
            {u.soon
              .filter((x) => x.label === "Prochainement")
              .map((x) => (
                <SoonFeature key={x.id} item={x} />
              ))}
          </div>
        </section>
      )}

      {/* Phrase de conclusion */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className={`${container} text-center`}>
          <span aria-hidden className="mx-auto mb-10 block h-20 w-px bg-gradient-to-b from-transparent to-or" />
          <RevealWords
            as="p"
            text={u.conclusion}
            className="font-display mx-auto max-w-4xl text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.1] font-light italic"
          />
          <Reveal delay={0.3}>
            <Link href="/reserver" className={`${btn.primary} mt-12`}>
              Prendre rendez-vous <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="pb-16 sm:pb-24 lg:pb-32">
        <div className={`${container} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <p className="eyebrow text-or">Questions fréquentes</p>
            <h2 id="faq-title" className="font-display mt-4 text-[clamp(2rem,3.4vw,2.8rem)] leading-tight font-light">
              Vos questions, {u.name.toLowerCase()}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={u.faq} />
          </div>
        </div>
      </section>

      {/* Autres univers */}
      <section aria-labelledby="autres-title" className="border-t border-nuit/10 py-24">
        <div className={container}>
          <h2 id="autres-title" className="eyebrow text-or">Explorer les autres univers</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.08}>
                <Link href={`/${o.slug}`} className="group flex items-center gap-5">
                  <span className="relative block aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-t-full rounded-b-xl bg-brume">
                    <Image src={o.image} alt="" fill sizes="96px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </span>
                  <span>
                    <span className="font-display block text-2xl">{o.name}</span>
                    <span className="mt-1 block text-sm text-nuit/65">{o.cardLine}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
