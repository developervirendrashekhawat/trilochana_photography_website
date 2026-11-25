import { categories, portfolio } from "@/content/portfolio";
import { instagramUrl, site } from "@/content/site";
import { img } from "@/lib/images";
import { SectionHeading } from "../SectionHeading";
import { PortfolioGrid } from "./PortfolioGrid";
import { buttonVariants } from "@/components/ui/button";

export function Portfolio() {
  const items = portfolio.map((p) => ({ ...p, image: img(p.src, p.alt) }));
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="section bg-ink">
      <div className="wrap">
        <SectionHeading id="portfolio-title" eyebrow="Portfolio" title="Recent work" dark>
          Corporate get-togethers, festive celebrations, portraits and landscapes from around Delhi NCR.
        </SectionHeading>
        <PortfolioGrid items={items} categories={[...categories]} />
        {instagramUrl && <p className="mt-12 text-center">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            See more on Instagram @{site.instagram}
          </a>
        </p>}
      </div>
    </section>
  );
}
