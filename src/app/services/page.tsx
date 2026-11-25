import type { Metadata } from "next";
import { services } from "@/content/services";
import { seo } from "@/content/seo";
import { breadcrumbLd, JsonLd, servicesLd } from "@/lib/jsonld";
import { Testimonials } from "@/components/Testimonials";
import { ServiceSection } from "@/components/services/ServiceSection";
import { CtaBand } from "@/components/services/CtaBand";

export const metadata: Metadata = {
  title: { absolute: seo.services.title },
  description: seo.services.description,
  alternates: { canonical: seo.services.path },
  openGraph: { title: seo.services.title, description: seo.services.description, url: seo.services.path },
  twitter: { title: seo.services.title, description: seo.services.description },
};

export default function ServicesPage() {
  return (
    <>
      {servicesLd().map((d) => (
        <JsonLd key={d["@id"]} data={d} />
      ))}
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <main>
        <section aria-labelledby="services-hero" className="bg-ink py-[88px] lg:py-24">
          <div className="wrap">
            <p className="eyebrow text-gold">Our services</p>
            <h1
              id="services-hero"
              className="mt-5 max-w-4xl font-display text-[44px] leading-[1.05] font-semibold text-cream sm:text-[60px] lg:text-[72px]"
            >
              Every kind of moment, <em className="text-gold-light">captured with one vision.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-dark">
              Corporate events, celebrations, portraits, products and places, photographed and filmed across Delhi,
              Noida, Gurugram and the rest of the NCR.
            </p>
            <nav aria-label="Jump to a service" className="mt-10">
              <ul className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <a
                      href={`#${s.slug}`}
                      className="inline-flex min-h-11 items-center rounded-sm border border-line-dark px-5 text-sm text-muted-dark transition-colors hover:border-gold hover:text-gold-light motion-reduce:transition-none"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {services.map((s, i) => (
          <ServiceSection key={s.slug} service={s} index={i} showDetailLink />
        ))}

        <Testimonials />

        <CtaBand />
      </main>
    </>
  );
}
