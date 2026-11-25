import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "./SectionHeading";
import { Carousel } from "./Carousel";

export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section aria-labelledby="testimonials-title" className="section bg-ink-2">
      <div className="wrap">
        <SectionHeading id="testimonials-title" eyebrow="Kind words" title="What our clients say" dark />
        <Carousel count={testimonials.length}>
          {testimonials.map((t, i) => (
            <figure key={i} className="flex h-full flex-col rounded-sm border border-line-dark bg-card-dark p-8">
              <div role="img" aria-label="5 out of 5 stars" className="flex gap-1 text-gold">
                {Array.from({ length: 5 }, (_, s) => (
                  <svg key={s} aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.5l2.9 6.2 6.6.7-4.9 4.5 1.4 6.6L12 17.2l-5.9 3.3 1.4-6.6L2.5 9.4l6.6-.7z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-5 flex-1">
                <p className="font-display-italic text-2xl leading-snug font-medium text-cream italic">“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex size-11 items-center justify-center rounded-sm bg-gold font-cinzel text-lg font-semibold text-ink"
                >
                  {t.name.replace(/[^A-Za-z]/g, "").charAt(0) || "T"}
                </span>
                <span>
                  <span className="block font-semibold text-cream">{t.name}</span>
                  <span className="block text-sm text-muted-dark">{t.event}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
