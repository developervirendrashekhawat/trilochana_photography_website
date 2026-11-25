import Link from "next/link";
import { services } from "@/content/services";
import { SectionHeading } from "../SectionHeading";
import { ServiceIcon } from "../ServiceIcon";
import { buttonVariants } from "@/components/ui/button";

export function ServicesGrid() {
  return (
    <section id="services" aria-labelledby="services-title" className="section bg-cream">
      <div className="wrap">
        <SectionHeading id="services-title" eyebrow="What we shoot" title="Photography for every occasion">
          Events, people, products and places across Delhi NCR, all shot with the same eye for detail.
        </SectionHeading>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug} className="flex flex-col rounded-sm border border-cream-2 bg-paper p-7">
              <ServiceIcon name={s.icon} className="size-9 text-gold-text" />
              <h3 className="mt-5 font-display text-[28px] leading-tight font-semibold text-text">{s.title}</h3>
              <p className="mt-2 font-cinzel text-xs tracking-[0.18em] text-muted-foreground">{s.tags.join(" · ").toUpperCase()}</p>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted-foreground">{s.blurb}</p>
              <Link
                href={`/services#${s.slug}`}
                className="mt-6 inline-flex min-h-11 items-center text-[15px] font-semibold text-gold-text hover:underline"
              >
                Explore {s.title.toLowerCase()} →
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Link href="/services" className={buttonVariants({ variant: "secondary" })}>
            Explore all services
          </Link>
        </div>
      </div>
    </section>
  );
}
