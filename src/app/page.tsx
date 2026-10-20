import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Doors } from "@/components/home/Doors";
import { Philosophy } from "@/components/home/Philosophy";
import { NewsCards } from "@/components/NewsCards";
import { FinalCta } from "@/components/FinalCta";
import { CharlyButton } from "@/components/Charly";
import { ImageReveal, Reveal, RevealWords } from "@/components/motion";
import { btn, container } from "@/components/ui";
import { activeNews } from "@/content/news";
import { getService } from "@/content/services";
import { site, signatures } from "@/content/site";

export const revalidate = 3600;

const pillars = [
  { title: "Une expertise SPORTHESIA by PhysioGym", text: "Le savoir-faire PhysioGym au service du concept SPORTHESIA, à Paris 7e, avec des intervenants identifiés selon leur statut." },
  { title: "Un accompagnement alimentaire", text: "Des conseils d'alimentation adaptés à vos objectifs, pour compléter le mouvement et la récupération, à votre rythme." },
  { title: "Cours de gym à quatre maximum", text: "Nos cours de gymnastique en petit groupe accueillent quatre personnes au plus : chacun est suivi et peut avancer à son rythme." },
  { title: "Un point de départ clair", text: "Le bilan ANOVATOR Découverte pour faire le point ; la plupart des prestations restent accessibles sans bilan préalable." },
];

export default function Home() {
  const news = activeNews().slice(0, 3);
  return (
    <>
      <Hero />

      {/* Présentation courte */}
      <section aria-label="Notre démarche" className="pt-10 pb-4 lg:pt-16">
        <div className={`${container} grid gap-6 lg:grid-cols-12`}>
          <Reveal className="lg:col-span-8 lg:col-start-3">
            <p className="font-display text-center text-[clamp(1.6rem,3vw,2.5rem)] leading-snug font-light">
              Une démarche individualisée associant <span className="text-or italic">évaluation</span>, mouvement, récupération et silhouette — pour avancer à
              votre rythme.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quatre univers */}
      <section id="univers" aria-labelledby="univers-title" className="scroll-mt-24 py-24 lg:py-32">
        <div className={container}>
          <div className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-or">Quatre univers, quatre intentions</p>
              <RevealWords
                as="h2"
                text="Choisissez votre porte d'entrée."
                emphasis={["porte"]}
                className="font-display mt-5 max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] font-light"
              />
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-sm text-lg leading-relaxed text-nuit/70">{signatures.renouer}</p>
            </Reveal>
          </div>
          <Doors />
        </div>
      </section>

      {/* Mieux comprendre son corps — BODY 360 */}
      <section aria-labelledby="bilans-title" className="pb-24 lg:pb-32">
        <div className={container}>
          <div className="grain relative grid gap-10 overflow-hidden rounded-[32px] bg-nuit px-7 py-12 text-ivoire sm:px-12 lg:grid-cols-12 lg:items-center lg:py-16">
            <div className="lg:col-span-6">
              <p className="eyebrow text-or-clair">SPORTHESIA BODY 360</p>
              <h2 id="bilans-title" className="font-display mt-4 text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.04] font-light">
                Mieux comprendre <span className="text-or-clair italic">son corps</span>
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ivoire/75">
                Mieux comprendre son corps pour avancer avec des repères concrets. Découvrez nos évaluations corporelles, du bilan ANOVATOR Découverte à
                l&apos;accompagnement personnalisé SPORTHESIA BODY 360.
              </p>
              <Link href="/body-360#prestations-anovator" className="mt-6 inline-flex items-center gap-2 border-b border-or-clair pb-1 text-sm text-ivoire/85">
                Le bilan ANOVATOR est demandé avant une cryolipolyse : pour quelles prestations&nbsp;? <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
              {[
                { s: getService("bilan-anovator"), href: "/reserver?prestation=bilan-anovator", cta: "Réserver mon bilan découverte" },
                { s: getService("bilan-body-360"), href: "/body-360#bilan-body-360", cta: "Découvrir BODY 360" },
              ].map(({ s, href, cta }, i) =>
                s ? (
                  <Reveal key={s.id} delay={i * 0.1}>
                    <Link href={href} className="group flex h-full flex-col rounded-[24px] border border-ivoire/15 bg-ivoire/5 p-6 transition-colors duration-500 hover:border-or-clair hover:bg-ivoire/10">
                      <span className="font-display text-4xl">
                        {s.regularPrice && <s className="mr-2 text-xl text-ivoire/40">{s.regularPrice} €</s>}
                        {s.priceLabel}
                      </span>
                      <span className="mt-3 font-semibold">{s.name}</span>
                      <span className="mt-1 text-sm text-ivoire/60">{s.durationLabel}</span>
                      {s.options?.map((o) => (
                        <span key={o.name} className="mt-1 text-sm text-ivoire/60">
                          {o.name} facultative : + {o.price} €
                        </span>
                      ))}
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.72rem] font-semibold tracking-[0.16em] text-or-clair uppercase">
                        {cta} <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                  </Reveal>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </section>

      <Philosophy />

      {/* L'accompagnement humain */}
      <section aria-labelledby="accomp-title" className="bg-brume/70 py-24 lg:py-36">
        <div className={`${container} grid items-center gap-14 lg:grid-cols-12`}>
          <div className="relative lg:col-span-6">
            <ImageReveal className="relative mx-auto aspect-[4/5] max-w-[520px] overflow-hidden rounded-t-full rounded-b-[28px]">
              <Image
                src="/images/expertise-posture.jpg"
                alt="Jeune homme assis le dos droit sur un tapis, détendu et attentif à sa posture"
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover object-[66%_50%]"
              />
            </ImageReveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow text-or">Notre expertise</p>
            <RevealWords
              as="h2"
              text="Un accompagnement qui s'adapte à vous"
              emphasis={["vous"]}
              className="font-display mt-5 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.04] font-light"
            />
            <Reveal delay={0.15}>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-nuit/75">
                <p>Chez SPORTHESIA, chaque personne possède son histoire, ses attentes et son rythme.</p>
                <p>
                  Notre approche associe différentes compétences pour vous proposer un accompagnement personnalisé, qu&apos;il s&apos;agisse de posture,
                  d&apos;activité physique, de récupération ou de bien-être.
                </p>
                <p>
                  Des professionnels indépendants pourront intervenir dans leurs domaines de compétence, notamment en activité physique adaptée et en
                  kinésiologie de bien-être.
                </p>
                <p className="text-base text-nuit/60">
                  SPORTHESIA® est une marque et un concept. Son site pilote parisien est exploité par PhysioGym, Paris 7e ; chaque prestation est vendue par le
                  professionnel identifié sur sa fiche.
                </p>
              </div>
              <Link href="/expertise" className={`${btn.link} mt-8`}>
                Notre expertise <ArrowUpRight className="size-4 text-or" />
              </Link>
            </Reveal>
            <dl className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={0.1 + i * 0.07}>
                  <dt className="flex items-center gap-3 font-semibold">
                    <span className="size-1.5 rounded-full bg-or" />
                    {p.title}
                  </dt>
                  <dd className="mt-2 pl-[18px] text-[0.95rem] leading-relaxed text-nuit/65">{p.text}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Kinésiologie de bien-être */}
      <section aria-labelledby="kine-title" className="py-24 lg:py-32">
        <div className={`${container} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <p className="eyebrow text-or">Accompagnement complémentaire</p>
            <h2 id="kine-title" className="font-display mt-5 text-[clamp(2rem,3.4vw,3rem)] leading-[1.08] font-light">
              Votre équilibre émotionnel
            </h2>
          </div>
          <Reveal className="space-y-5 text-lg leading-relaxed text-nuit/75 lg:col-span-6 lg:col-start-7">
            <p>Notre vécu, nos émotions et les événements de la vie peuvent influencer notre façon de nous sentir et d&apos;aborder le quotidien.</p>
            <p>
              La kinésiologie de bien-être propose un espace d&apos;écoute et d&apos;accompagnement, dans une démarche non médicale, pour explorer certains
              ressentis et favoriser une meilleure attention à soi.
            </p>
            <p className="border-l-2 border-or pl-5 text-base text-nuit/60">
              Elle ne remplace ni un diagnostic médical, ni un traitement, ni un suivi psychologique lorsqu&apos;ils sont nécessaires. Prestations et tarifs
              communiqués prochainement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Besoin d'être orienté */}
      <section className="pb-24 lg:pb-32">
        <div className={container}>
          <Reveal className="relative grid items-center gap-8 overflow-hidden rounded-[32px] bg-sable px-7 py-12 sm:px-12 lg:grid-cols-12 lg:py-16">
            <div className="lg:col-span-7">
              <p className="eyebrow text-or">Besoin d&apos;être orienté&nbsp;?</p>
              <p className="font-display mt-4 text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">
                Une question sur une prestation, un tarif ou votre rendez-vous&nbsp;? Charly vous aide à trouver l&apos;information et vous oriente vers la
                réservation adaptée.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <CharlyButton className={btn.primary}>Parler à Charly</CharlyButton>
              <Link href="/reserver" className={btn.ghost}>
                Réserver directement
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Actualités et offres */}
      <section aria-labelledby="news-title" className="border-t border-nuit/10 py-24 lg:py-28">
        <div className={container}>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-or">En ce moment</p>
              <h2 id="news-title" className="font-display mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-tight font-light">
                Nos actualités et offres du moment
              </h2>
            </div>
            <Link href="/actualites" className={btn.link}>
              Toutes les actualités <ArrowUpRight className="size-4 text-or" />
            </Link>
          </div>
          <NewsCards items={news} />
        </div>
      </section>

      <FinalCta />

      {/* Informations pratiques */}
      <section aria-label="Informations pratiques" className="bg-ivoire py-14">
        <div className={`${container} grid gap-8 text-sm sm:grid-cols-3`}>
          <div>
            <p className="eyebrow text-or">Adresse</p>
            <p className="mt-3 text-base">
              {site.address.street}, {site.address.postalCode} {site.address.city}
            </p>
          </div>
          <div>
            <p className="eyebrow text-or">Horaires</p>
            <ul className="mt-3 text-base">
              {site.hours.map((h) => (
                <li key={h.days}>
                  {h.days} · {h.hours}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-or">Contact</p>
            <p className="mt-3 text-base">
              <a href={`mailto:${site.email}`} className="underline decoration-or underline-offset-4">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
