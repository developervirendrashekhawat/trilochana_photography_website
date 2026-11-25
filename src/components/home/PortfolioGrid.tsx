"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { PortfolioItem } from "@/content/portfolio";
import type { MaybeImg } from "@/lib/images";
import { Badge } from "@/components/ui/badge";
import { Photo } from "../Photo";

// Fetched only when a tile is first clicked.
const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

export type GridItem = PortfolioItem & { image: MaybeImg };

export function PortfolioGrid({ items, categories }: { items: GridItem[]; categories: string[] }) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter portfolio" className="mb-8 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className="min-h-11 rounded-sm border border-line-dark px-5 text-sm text-muted-dark transition-colors hover:border-gold hover:text-gold-light aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-ink motion-reduce:transition-none"
          >
            {c}
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
        {shown.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-sm bg-card-dark text-left"
            >
              <Photo
                image={item.image}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              <Badge className="absolute top-3 left-3 h-6 bg-ink/85 px-2.5 font-cinzel text-[11px] tracking-[0.2em] text-gold-light">
                {item.category.toUpperCase()}
              </Badge>
              <span className="absolute inset-x-0 bottom-0 bg-ink/80 px-4 py-3 text-sm text-cream">{item.caption}<span className="sr-only"> (open larger photo)</span></span>
            </button>
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox items={shown} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
