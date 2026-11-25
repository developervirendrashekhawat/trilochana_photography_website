import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbLd, JsonLd, servicesLd } from "@/lib/jsonld";
import { buttonVariants } from "@/components/ui/button";
import { Testimonials } from "@/components/Testimonials";
import { Process } from "@/components/home/Process";
import { ServiceSection } from "@/components/services/ServiceSection";
import { CtaBand } from "@/components/services/CtaBand";
import { ServiceIcon } from "@/components/ServiceIcon";

// One static landing page per service, all driven by src/content/services.ts.
// To target a new keyword (e.g. "corporate event photographer in Gurugram"), add an entry there.
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const find = (slug: string) => services.find((s) => s.slug === slug);

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = find((await params).slug);
  if (!s) return {};
  const path = `/services/${s.slug}`;
  return {
    title: { absolute: s.seoTitle },
    description: s.seoDescription,
    alternates: { canonical: path },
    openGraph: { title: s.seoTitle, description: s.seoDescription, url: path },
    twitter: { title: s.seoTitle, description: s.seoDescription },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const s = find((await params).slug);
  if (!s) notFound();
  const index = services.indexOf(s);
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      {servicesLd([s]).map((d) => (
        <JsonLd key={d["@id"]} data={d} />
      ))}
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: s.title, path: `/services/${s.slug}` },
        ])}
      />
      <main>
        <section aria-labelledby="service-hero" className="bg-ink py-[88px] lg:py-24">
          <div className="wrap">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-dark">
                <li>
                  <Link href="/" className="inline-flex min-h-11 min-w-11 items-center hover:text-gold-light">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/services" className="inline-flex min-h-11 items-center hover:text-gold-light">
                    Services
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-gold-light">
                  {s.title}
                </li>
              </ol>
            </nav>
            <p className="eyebrow mt-6 text-gold">{s.tags.join(" · ")}</p>
            <h1
              id="service-hero"
              className="mt-5 max-w-4xl font-display text-[42px] leading-[1.05] font-semibold text-cream sm:text-[58px] lg:text-[68px]"
            >
              {s.keyword} <em className="text-gold-light">in {site.serviceArea}</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-dark">
              {s.blurb} Based in Mayur Vihar, covering {site.areaServed.join(", ")}.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/?service=${s.slug}#contact`} className={buttonVariants()}>
                Check your date
              </Link>
              <Link href="/services" className={buttonVariants({ variant: "outline" })}>
                All photography services
              </Link>
            </div>
          </div>
        </section>

        <ServiceSection service={s} index={index} heading={`What’s included in our ${s.keyword.toLowerCase()}`} />

        <Process />

        <Testimonials />

        <section aria-labelledby="other-services" className="section bg-cream">
          <div className="wrap">
            <p className="eyebrow text-gold-text">More from Trilochana</p>
            <h2 id="other-services" className="h2 mt-3 text-foreground">
              Other photography services
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/services/${o.slug}`}
                    className="flex h-full flex-col rounded-sm border border-cream-2 bg-paper p-7 transition-colors hover:border-gold-text motion-reduce:transition-none"
                  >
                    <ServiceIcon name={o.icon} className="size-8 text-gold-text" />
                    <span className="mt-4 font-display text-2xl font-semibold text-foreground">{o.keyword}</span>
                    <span className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{o.blurb}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand service={s.slug} />
      </main>
    </>
  );
}
