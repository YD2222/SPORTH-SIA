import { site } from "@/content/site";
import type { Faq, Service } from "@/content/services";

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const businessLd = () => ({
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  image: `${site.url}/images/hero.jpg`,
  logo: `${site.url}/icon.svg`,
  email: site.email,
  ...(site.phone ? { telephone: site.phone } : {}),
  priceRange: "35 € – 250 €",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: "Île-de-France",
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: { "@type": "City", name: "Paris" },
  parentOrganization: { "@type": "Organization", name: "PhysioGym" },
  knowsAbout: ["Posture", "Posturologie", "Bilan postural", "Clinique OPS", "Composition corporelle", "Activité physique adaptée", "Bilan mobilité équilibre force", "Kinésiologie", "Massage bien-être", "Luminothérapie", "Récupération physique", "Cryolipolyse", "Soins esthétiques du visage"],
});

export const servicesLd = (list: Service[], pageUrl: string) =>
  list
    .filter((s) => s.price !== null && s.priceStatus === "confirmé")
    .map((s) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      description: s.summary,
      provider: { "@id": `${site.url}/#business` },
      areaServed: "Paris 7e",
      url: `${pageUrl}#${s.id}`,
      offers: {
        "@type": "Offer",
        price: s.price,
        priceCurrency: "EUR",
        availability: s.bookable ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
        url: `${site.url}/reserver?prestation=${s.id}`,
      },
    }));

export const faqLd = (faq: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
});
