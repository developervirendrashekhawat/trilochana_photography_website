import { Mail, MapPin, Phone } from "lucide-react";
import { addressLine, site, waLink } from "@/content/site";
import { SocialIcon } from "../SocialIcon";
import { WhatsAppIcon } from "../WhatsAppFloat";
import { EnquiryForm } from "./EnquiryForm";

export function Contact() {
  const row = "flex min-h-12 items-center gap-4 text-cream hover:text-gold-light";
  const icon = "flex size-11 shrink-0 items-center justify-center rounded-sm border border-line-dark text-gold";
  return (
    <section id="contact" aria-labelledby="contact-title" className="section bg-ink">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <p className="eyebrow text-gold">Let&apos;s capture your story</p>
          <h2 id="contact-title" className="h2 mt-3 text-cream">
            Check your date
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted-dark">
            Send us a few details and we&apos;ll reply with availability and a quotation within 24 hours.
          </p>
          <address className="mt-10 flex flex-col gap-3 not-italic">
            <a href={site.phoneHref} className={row}>
              <span className={icon}>
                <Phone aria-hidden className="size-5" strokeWidth={1.5} />
              </span>
              <span>
                <span className="sr-only">Call </span>
                {site.phone}
              </span>
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={row}>
              <span className={icon}>
                <WhatsAppIcon size={20} />
              </span>
              WhatsApp {site.phone}
            </a>
            {site.email && (
              <a href={`mailto:${site.email}`} className={row}>
                <span className={icon}>
                  <Mail aria-hidden className="size-5" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="sr-only">Email </span>
                  {site.email}
                </span>
              </a>
            )}
            {site.socials.map((s) => (
              <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className={row}>
                <span className={icon}>
                  <SocialIcon name={s.key} />
                </span>
                <span>
                  <span className="sr-only">{s.label} </span>
                  {s.display ?? s.label}
                </span>
              </a>
            ))}
            <p className={row}>
              <span className={icon}>
                <MapPin aria-hidden className="size-5" strokeWidth={1.5} />
              </span>
              <span>
                {site.name}, {addressLine}
                <span className="block text-sm text-muted-dark">Serving all of {site.serviceArea}</span>
              </span>
            </p>
          </address>
        </div>
        <div className="rounded-sm border-t-4 border-gold bg-cream p-6 sm:p-10">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
