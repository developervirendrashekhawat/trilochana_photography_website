import { site } from "@/content/site";
import { services, type Service } from "@/content/services";
import meta from "@/content/image-meta.json";

// NOTE: no Review / AggregateRating markup here, on purpose. Google treats reviews a
// business publishes about itself ("self-serving reviews") as ineligible for review
// rich results, and marking them up can lead to a manual action. Real ratings
// should come from the Google Business Profile instead.

const abs = (p: string) => new URL(p, site.url).toString();
const businessId = abs("/#business");

export function businessLd() {
  const hasLogo = "/brand/logo.png" in meta;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": businessId,
    name: site.name,
    slogan: site.tagline,
    url: abs("/"),
    logo: abs(hasLogo ? "/brand/logo.png" : "/icon.svg"),
    image: abs("/opengraph-image"),
    telephone: site.phone.replace(/\s/g, ""),
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    ...(site.email && { email: site.email }),
    ...(site.socials.length && { sameAs: site.socials.map((s) => s.url) }),
    ...(site.geo && {
      geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    }),
    ...(site.openingHours.length && {
      openingHoursSpecification: site.openingHours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    }),
  };
}

export function servicesLd(list: Service[] = services) {
  return list.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(`/services/${s.slug}#service`),
    name: s.keyword,
    serviceType: s.title,
    description: s.seoDescription,
    url: abs(`/services/${s.slug}`),
    provider: { "@id": businessId },
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    ...(s.pricing.type === "perDay" && {
      offers: s.pricing.items.map((i) => ({
        "@type": "Offer",
        name: i.label,
        price: i.price,
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: i.price,
          priceCurrency: "INR",
          unitCode: "DAY",
        },
      })),
    }),
  }));
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
