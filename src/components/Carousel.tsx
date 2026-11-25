"use client";

import { Children, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const pad = (n: number) => String(n).padStart(2, "0");

// Hand-built: one CSS transform, no carousel library. 1 slide per view on mobile, 2 from md.
// On desktop the transform is clamped with CSS min() so the last view is never half empty.
export function Carousel({ count, children }: { count: number; children: React.ReactNode }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true); // assume reduced until we know: no autoplay flash
  const autoplay = !paused && !reduced && count > 1;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => setI((x) => (x + 1) % count), 7000);
    return () => clearInterval(t);
  }, [autoplay, count]);

  const go = (d: number) => setI((x) => (x + d + count) % count);
  const arrow = cn(buttonVariants({ variant: "outline", size: "icon" }));

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          aria-live={autoplay ? "off" : "polite"}
          style={{ "--i": i, "--max": Math.max(count - 2, 0) } as React.CSSProperties}
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none [transform:translateX(calc(var(--i)*-100%))] md:[transform:translateX(calc(min(var(--i),var(--max))*-50%))]"
        >
          {Children.map(children, (child, n) => (
            <div
              role="group"
              aria-roledescription="slide"
              aria-label={`${n + 1} of ${count}`}
              className="shrink-0 basis-full px-2 md:basis-1/2"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 px-2">
        <p className="font-cinzel text-sm tracking-[0.2em] text-gold-light">
          {pad(i + 1)} / {pad(count)}
        </p>
        <div className="flex items-center">
          {Array.from({ length: count }, (_, n) => (
            <button
              key={n}
              type="button"
              aria-label={`Go to testimonial ${n + 1}`}
              aria-current={n === i ? "true" : undefined}
              onClick={() => setI(n)}
              className="group flex size-11 items-center justify-center"
            >
              <span className="block h-0.5 w-6 bg-line-dark transition-colors group-hover:bg-gold-light group-aria-[current=true]:bg-gold motion-reduce:transition-none" />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={arrow}>
            <span aria-hidden>←</span>
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={arrow}>
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
