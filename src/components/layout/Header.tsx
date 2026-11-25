import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import meta from "@/content/image-meta.json";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";
import { buttonVariants } from "@/components/ui/button";

export const navLinks = [
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  ...(site.showRates ? [{ href: "/#rates", label: "Rates" }] : []),
  { href: "/#process", label: "How it works" },
];

const hasLogo = "/brand/logo.png" in meta;

export function Wordmark() {
  return (
    <span className="flex flex-col font-cinzel leading-none text-gold-light">
      <span className="text-[17px] font-semibold tracking-[0.2em]">TRILOCHANA</span>
      <span className="mt-1 text-[10px] font-medium tracking-[0.42em] text-gold">PHOTOGRAPHY</span>
    </span>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-dark-2 bg-ink/95 backdrop-blur">
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex min-h-11 items-center gap-3">
          <Image
            src={hasLogo ? "/brand/logo.png" : "/icon.svg"}
            alt=""
            width={44}
            height={44}
            className="size-11"
            unoptimized={!hasLogo}
          />
          <Wordmark />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-[15px] text-muted-dark transition-colors hover:text-gold-light aria-[current=page]:text-gold-light motion-reduce:transition-none"
            >
              {l.label}
            </NavLink>
          ))}
          <Link href="/#contact" className={buttonVariants()}>
            Book a shoot
          </Link>
        </nav>
        <MobileNav links={navLinks} />
      </div>
    </header>
  );
}
