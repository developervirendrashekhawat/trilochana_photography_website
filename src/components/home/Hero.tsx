import { heroImages } from "@/content/portfolio";
import { site, waLink } from "@/content/site";
import { img } from "@/lib/images";
import { Photo } from "../Photo";
import { WhatsAppIcon } from "../WhatsAppFloat";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  const [tall, a, b] = heroImages.map((h) => img(h.src, h.alt));
  const sizes = "(max-width: 1024px) 50vw, 300px";
  return (
    <section aria-labelledby="hero-title" className="bg-ink pt-14 pb-[88px] lg:pt-20 lg:pb-24">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="eyebrow text-gold">{site.tagline}</p>
          <h1
            id="hero-title"
            className="mt-5 font-display text-[52px] leading-[1.02] font-semibold text-cream sm:text-[68px] lg:text-[84px]"
          >
            Moments. Stories. <em className="text-gold-light">Forever.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-dark">
            Corporate event, celebration, portrait and product photography &amp; cinematic video, based in Mayur
            Vihar and covering all of Delhi NCR.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className={buttonVariants()}>
              Send an enquiry
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
              <WhatsAppIcon size={18} /> WhatsApp {site.phone.replace("+91 ", "")}
            </a>
          </div>
        </div>
        <div className="grid aspect-[5/4] grid-cols-2 grid-rows-2 gap-3">
          <div className="relative row-span-2 overflow-hidden rounded-sm bg-card-dark">
            <Photo image={tall} sizes={sizes} hero />
          </div>
          <div className="relative overflow-hidden rounded-sm bg-card-dark">
            <Photo image={a} sizes={sizes} />
          </div>
          <div className="relative overflow-hidden rounded-sm bg-card-dark">
            <Photo image={b} sizes={sizes} />
          </div>
        </div>
      </div>
    </section>
  );
}
