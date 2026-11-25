"use client";

import { useEffect, useRef, useState } from "react";
import { Photo } from "../Photo";
import type { GridItem } from "./PortfolioGrid";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Native <dialog> + showModal(): the browser traps focus, makes the page inert,
// handles Esc and restores focus to the clicked tile on close.
export default function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: GridItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  // Captured once at mount (before showModal moves focus), restored on unmount.
  const [trigger] = useState(() => document.activeElement as HTMLElement | null);
  const item = items[index];
  const go = (d: number) => onIndex((index + d + items.length) % items.length);

  useEffect(() => {
    // No close() in cleanup: unmounting removes it from the top layer, and a close
    // event would re-fire onClose under StrictMode's double effect run.
    if (!ref.current!.open) ref.current!.showModal();
    return () => trigger?.focus();
  }, [trigger]);

  return (
    <dialog
      ref={ref}
      aria-label={`Photo ${index + 1} of ${items.length}: ${item.caption}`}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-cream backdrop:bg-ink/80"
    >
      <div className="flex h-full flex-col p-4 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-dark" aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · {item.caption}
            {item.credit && (
              <>
                {" · Photo: "}
                <a href={item.credit.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-light">
                  {item.credit.name}
                </a>{" "}
                / Unsplash
              </>
            )}
          </p>
          <button type="button" onClick={onClose} className={cn(buttonVariants({ variant: "outline" }), "min-w-12 px-4")} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="relative my-4 flex-1">
          <Photo key={item.src} image={item.image} sizes="100vw" className="object-contain!" />
        </div>
        <div className="flex justify-center gap-3">
          <button type="button" onClick={() => go(-1)} className={buttonVariants({ variant: "outline" })} aria-label="Previous photo">
            ← Prev
          </button>
          <button type="button" onClick={() => go(1)} className={buttonVariants({ variant: "outline" })} aria-label="Next photo">
            Next →
          </button>
        </div>
      </div>
    </dialog>
  );
}
