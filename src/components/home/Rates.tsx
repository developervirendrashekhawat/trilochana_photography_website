import { services, inr } from "@/content/services";
import { SectionHeading } from "../SectionHeading";

export function Rates() {
  const perDay = services.flatMap((s) => (s.pricing.type === "perDay" ? s.pricing.items : []));
  return (
    <section id="rates" aria-labelledby="rates-title" className="section bg-cream">
      <div className="wrap">
        <SectionHeading id="rates-title" eyebrow="Rates" title="Simple per-day pricing" center>
          For corporate events, parties and celebrations anywhere in Delhi NCR.
        </SectionHeading>
        <ul className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
          {perDay.map((r) => (
            <li
              key={r.label}
              className={`flex flex-col items-center rounded-sm border p-8 text-center ${
                r.featured ? "border-ink bg-ink text-cream" : "border-cream-2 bg-paper text-text"
              }`}
            >
              <h3 className={`font-cinzel text-sm tracking-[0.2em] ${r.featured ? "text-gold" : "text-gold-text"}`}>
                {r.label.toUpperCase()}
              </h3>
              <p className="mt-4 font-display text-5xl font-semibold">{inr(r.price)}</p>
              <p className={`mt-1 text-sm ${r.featured ? "text-muted-dark" : "text-muted-foreground"}`}>per day</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-[15px] text-muted-foreground">
          All raw data included with every booking. 50% advance confirms your date.
        </p>
      </div>
    </section>
  );
}
