# Trilochana Photography website

Next.js 16 (App Router, Turbopack, Cache Components) · TypeScript · Tailwind CSS v4 · shadcn/ui · Zod · Resend.
Every page is statically generated. The only server code is `POST /api/enquiry`.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional in development
npm run dev                  # http://localhost:3003
```

| Script | What it does |
|---|---|
| `npm run dev` / `npm run build` | Both run `npm run images` first (see Photos below). |
| `npm run lint` | ESLint |
| `npm run smoke` | Hits `/api/enquiry` on a running server (validation, honeypot, rate limit). `BASE_URL=… npm run smoke` for another host. |
| `npm run analyze` | Turbopack bundle analyzer (`next analyze`). |

## Environment variables

| Name | Needed for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OpenGraph, JSON-LD. Set to the live domain, e.g. `https://www.example.in`. |
| `NEXT_PUBLIC_PHONE` | Phone shown on the site, `tel:` links and JSON-LD. Default `+91 98716 63624`. |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number (digits with country code). Defaults to the phone. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional public email, shown in Contact, the footer and JSON-LD. |
| `NEXT_PUBLIC_INSTAGRAM` | Instagram handle. Defaults to `trilochana_photography`; set it empty to hide Instagram. |
| `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_YOUTUBE_URL` | Optional profile links. Each one set appears in Contact, the footer icons and JSON-LD `sameAs`. |
| `RESEND_API_KEY` | Enquiry email via [Resend](https://resend.com). |
| `ENQUIRY_FROM_EMAIL` | Sender. Must be on a domain verified in Resend, e.g. `Trilochana Website <enquiries@example.in>`. |
| `ENQUIRY_TO_EMAIL` | Where enquiries go (comma-separate for several). |
| `GOOGLE_SHEETS_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` | Optional: also append each enquiry to a Google Sheet. |

If neither email nor Sheets is configured, development logs enquiries to the terminal and reports success. In
production the form shows an error and asks the visitor to call or WhatsApp instead, so it never claims
"received" when the enquiry went nowhere.

## Editing content (no JSX needed)

Phone, WhatsApp, email and social profiles are set with the `NEXT_PUBLIC_*` env vars above (in Vercel: *Settings → Environment Variables*, then redeploy). Everything else lives in `src/content/`:

- `site.ts`: name, address (NAP), service area, opening hours and map pin (`geo`), and `showRates` (set to `false` to hide the Rates section and nav link).
- `services.ts`: the service list. Order, titles, tags, descriptions, "included" items, pricing (`perDay` items or a `custom` label such as "On request") and images. The `slug` is the `#anchor` on `/services`, so keep it stable once live.
- `portfolio.ts`: portfolio tiles (`src`, `alt`, `category`, `caption`) and the three hero collage images.
- `testimonials.ts`: paste **genuine** reviews only. Placeholders are visibly marked.
- `process.ts`: the four "How booking works" steps.
- `seo.ts`: page titles and meta descriptions.

### Photos

> **Temporary stock photos.** The portfolio, hero and service sections currently use free Unsplash photos
> (Unsplash License), hotlinked from `images.unsplash.com` and credited in the lightbox. They are placeholders.
> Replace them with Trilochana's own work before launch: presenting stock photos as your portfolio misleads clients.
> Each one is listed in `src/content/portfolio.ts` and `src/content/services.ts`. Once all photos are local, remove
> `remotePatterns` from `next.config.ts`.

Drop images into `public/images/portfolio/` (and the logo at `public/brand/logo.png`), then run
`npm run images` (it also runs automatically before `dev` and `build`). The script:

1. Renames the original demo files (`ostage.jpg`, `saree.png` …) to descriptive SEO filenames (`corporate-event-stage-delhi-ncr.jpg` …), converting to JPEG.
2. Shrinks anything wider than 2000px.
3. Writes `src/content/image-meta.json` (dimensions + blur placeholder) so `next/image` shows a blur-up with zero layout shift.
4. Generates `src/app/icon.png` and `apple-icon.png` from the logo.

A file referenced in the content but not on disk renders a labelled "Photo coming soon" tile instead of breaking.
To replace a photo with a new version, use a **new filename**, because `/images` is served with a 1-year cache.

## Google Sheet (optional)

1. In [Google Cloud Console](https://console.cloud.google.com/) create a project, enable the **Google Sheets API**, and create a **service account**. Add a JSON key and download it.
2. Create a Sheet with a header row, e.g. `Timestamp | Name | Phone | Email | Shoot | Date | Venue | Message`.
3. Share the Sheet with the service account's email (Editor).
4. Set `GOOGLE_SHEETS_ID` (the long id in the Sheet URL), `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_PRIVATE_KEY` (the `private_key` value from the JSON, in double quotes, keeping the `\n`s).

Rows are appended to the first tab as plain text (`RAW`), so a typed `=formula` is never executed.

## Deploy to Vercel

1. Push this repo to GitHub and **Import** it on [vercel.com](https://vercel.com/new). The defaults are fine.
2. Add the environment variables above (Production and Preview).
3. Add your domain under *Settings → Domains*, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.

### Notes and limits

- **Rate limiting** is an in-memory token bucket (5 enquiries per 10 minutes per IP). It lives in each serverless instance and resets on cold starts, so treat it as a speed bump. If spam appears, move it to Upstash Redis or Vercel KV.
- **No Review/AggregateRating structured data** on purpose. Google treats self-published testimonials as ineligible, and marking them up risks a manual action. Get star ratings from the Google Business Profile instead.
- **Service landing pages:** every entry in `services.ts` gets a static page at `/services/<slug>` with its own `seoTitle`/`seoDescription`, OG image, `Service` + `BreadcrumbList` JSON-LD and a sitemap entry, all automatic. To target another keyword (e.g. "corporate event photographer in Gurugram"), add an entry.
- **Unknown service URLs** (e.g. `/services/weddings`) show the 404 page with `noindex`, but with HTTP status 200. Cache Components streams the static shell first ([Next.js docs](https://nextjs.org/docs/app/api-reference/file-conventions/loading#status-codes)). `noindex` keeps them out of search results. A hard 404 would need a `proxy.ts`, which isn't worth it for URLs nothing links to.
- **JS budget:** client JS is limited to small leaf components: mobile menu, portfolio filter, lightbox (loaded on first click), testimonial carousel and enquiry form. Zod loads on first submit, and the calendar (react-day-picker) loads when the date picker first opens. The form's shadcn Select and Popover use Base UI, about 50 KB gzipped. Swap them for native `<select>`/`<input type="date">` if you ever need to shave that off.

## Launch checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy.
- [ ] Send a test enquiry on the live site and confirm the email (and Sheet row) arrives.
- [ ] Google Search Console: verify the domain and submit `https://<domain>/sitemap.xml`.
- [ ] Create or claim the **Google Business Profile** with exactly the same name, address and phone as `src/content/site.ts`, and link it to the site. Copy the map pin into `site.geo`.
- [ ] Add the site link to the Instagram bio.
- [ ] Test `/` and `/services` with Google's [Rich Results Test](https://search.google.com/test/rich-results) and [PageSpeed Insights](https://pagespeed.web.dev/).
