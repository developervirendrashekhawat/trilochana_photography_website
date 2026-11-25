import Link from "next/link";
import { Check } from "lucide-react";
import { inr, type Service } from "@/content/services";
import { img } from "@/lib/images";
import { buttonVariants } from "@/components/ui/button";
import { Photo } from "../Photo";

// Shared by /services (all services, alternating) and /services/[slug] (one service).
export function ServiceSection({
  service: s,
  index,
  heading = s.keyword,
  showDetailLink = false,
}: {
  service: Service;
  index: number;
  heading?: string;
  showDetailLink?: boolean;
}) {
  const flip = index % 2 === 1;
  const images = (s.images.length ? s.images : [{ src: `/images/services/${s.slug}.jpg`, alt: `${s.keyword} in Delhi NCR` }]).map(
    (i) => img(i.src, i.alt),
  );
  const [main, ...rest] = images;
  const titleId = `${s.slug}-title`;

  return (
    <section id={s.slug} aria-labelledby={titleId} className={`section ${flip ? "bg-cream-2" : "bg-cream"}`}>
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={`grid grid-cols-2 gap-3 ${flip ? "lg:order-2" : ""}`}>
          <div className={`relative overflow-hidden rounded-sm bg-card-dark ${rest.length ? "col-span-2 aspect-[3/2]" : "col-span-2 aspect-[4/3]"}`}>
            <Photo image={main} sizes="(max-width: 1024px) 100vw, 600px" />
          </div>
          {rest.slice(0, 2).map((r) => (
            <div key={r.src} className="relative aspect-square overflow-hidden rounded-sm bg-card-dark">
              <Photo image={r} sizes="(max-width: 1024px) 50vw, 300px" />
            </div>
          ))}
        </div>
        <div>
          <p className="eyebrow text-gold-text">
            {String(index + 1).padStart(2, "0")} · {s.tags.join(" · ")}
          </p>
          <h2 id={titleId} className="h2 mt-3 text-foreground">
            {heading}
          </h2>
          {s.description.map((p) => (
            <p key={p.slice(0, 20)} className="mt-4 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <h3 className="mt-8 font-cinzel text-sm font-semibold tracking-[0.2em] text-foreground">WHAT&apos;S INCLUDED</h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {s.included.map((item) => (
              <li key={item} className="flex gap-2.5 text-[15px] text-foreground">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-text" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {s.pricing.type === "perDay" ? (
              <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
                {s.pricing.items.map((p) => (
                  <li key={p.label} className={`p-4 ${p.featured ? "bg-ink text-cream" : "bg-paper text-foreground"}`}>
                    <span className={`block text-sm ${p.featured ? "text-muted-dark" : "text-muted-foreground"}`}>{p.label}</span>
                    <span className="mt-1 block font-display text-2xl font-semibold">
                      {inr(p.price)}
                      <span className={`text-sm font-normal ${p.featured ? "text-muted-dark" : "text-muted-foreground"}`}> /day</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="inline-flex border border-gold-text px-4 py-2 font-cinzel text-sm tracking-[0.2em] text-gold-text">
                PRICING: {s.pricing.label.toUpperCase()}
              </p>
            )}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={`/?service=${s.slug}#contact`} className={buttonVariants({ variant: "secondary" })}>
              Enquire about {s.title.toLowerCase()}
            </Link>
            {showDetailLink && (
              <Link
                href={`/services/${s.slug}`}
                className="inline-flex min-h-11 items-center text-[15px] font-semibold text-gold-text hover:underline"
              >
                More about {s.keyword.toLowerCase()} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
