import Link from "next/link";
import { waLink } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "../WhatsAppFloat";

export function CtaBand({ service }: { service?: string }) {
  return (
    <section aria-labelledby="cta-title" className="bg-gold py-16">
      <div className="wrap flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <h2 id="cta-title" className="font-display text-[34px] leading-tight font-semibold text-ink sm:text-[42px]">
          Not sure which service fits? <em>Tell us about your day.</em>
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href={service ? `/?service=${service}#contact` : "/#contact"} className={buttonVariants({ variant: "secondary" })}>
            Send an enquiry
          </Link>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "border-ink text-ink hover:bg-ink hover:text-gold-light")}
          >
            <WhatsAppIcon size={18} /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
