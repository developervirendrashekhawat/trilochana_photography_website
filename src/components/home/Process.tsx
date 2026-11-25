import { process } from "@/content/process";
import { SectionHeading } from "../SectionHeading";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section bg-cream-2">
      <div className="wrap">
        <SectionHeading id="process-title" eyebrow="How it works" title="How booking works" />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <li key={step.title} className="border-t-2 border-gold-text pt-6">
              <span aria-hidden className="font-display text-5xl font-semibold text-gold-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-text">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
