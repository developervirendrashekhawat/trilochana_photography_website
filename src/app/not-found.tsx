import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found | Trilochana Photography" };

export default function NotFound() {
  return (
    <>
      <main className="bg-ink">
        <section aria-labelledby="nf-title" className="wrap flex min-h-[60vh] flex-col items-start justify-center py-24">
          <p className="eyebrow text-gold">Error 404</p>
          <h1 id="nf-title" className="mt-4 font-display text-[48px] leading-tight font-semibold text-cream sm:text-[64px]">
            This frame is <em className="text-gold-light">out of focus.</em>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-dark">
            The page you&apos;re looking for has moved or never existed. Let&apos;s get you back to the good shots.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className={buttonVariants()}>
              Back to the home page
            </Link>
            <Link href="/services" className={buttonVariants({ variant: "outline" })}>
              See our photography services
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
