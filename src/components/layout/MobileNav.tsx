"use client";

import Link from "next/link";
import { NavLink } from "./NavLink";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="flex size-12 items-center justify-center text-gold-light"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
        </svg>
      </button>
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-[72px] border-b border-line-dark-2 bg-ink"
      >
        <ul className="wrap flex flex-col py-4">
          {links.map((l) => (
            <li key={l.href}>
              <NavLink
                href={l.href}
                onClick={close}
                className="flex min-h-12 items-center text-base text-muted-dark hover:text-gold-light aria-[current=page]:text-gold-light"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className="pt-3">
            <Link href="/#contact" onClick={close} className={cn(buttonVariants(), "w-full")}>
              Book a shoot
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
