import { cacheLife } from "next/cache";
import { site, addressLine } from "@/content/site";
import { Wordmark } from "./Header";
import { SocialIcon } from "../SocialIcon";

// ponytail: year is fixed at build time (Cache Components forbids new Date() in a static shell); every deploy refreshes it.
async function Year() {
  "use cache";
  cacheLife("max");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-t border-line-dark-2 bg-ink py-12 text-center">
      <div className="wrap flex flex-col items-center gap-4">
        <Wordmark />
        <p className="font-cinzel text-[13px] tracking-[0.28em] text-gold">{site.footerLine.toUpperCase()}</p>
        <p className="text-sm text-muted-dark">
          {site.name} · {addressLine} · {site.phone}
          {site.email && (
            <>
              {" · "}
              <a href={`mailto:${site.email}`} className="hover:text-gold-light">
                {site.email}
              </a>
            </>
          )}
        </p>
        {site.socials.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-2">
            {site.socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${s.label}`}
                  className="flex size-11 items-center justify-center rounded-sm border border-line-dark text-gold hover:border-gold hover:text-gold-light"
                >
                  <SocialIcon name={s.key} />
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="text-sm text-muted-dark">
          © <Year /> {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
