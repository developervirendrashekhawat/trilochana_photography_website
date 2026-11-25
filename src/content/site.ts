// Single source of truth for NAP (name, address, phone). Keep it identical to the
// Google Business Profile: every page, the footer and the JSON-LD read from here.
//
// Contact + social details come from NEXT_PUBLIC_* env vars (see .env.example). They are
// baked in at build time, so redeploy after changing them. Each process.env.NEXT_PUBLIC_*
// must be written out literally (no dynamic keys) or Next.js can't inline it.

const clean = (v: string | undefined) => v?.trim() || "";

// Phone shown on the site, e.g. "+91 98716 63624".
const phone = clean(process.env.NEXT_PUBLIC_PHONE) || "+91 98716 63624";
// WhatsApp number, digits only with country code. Defaults to the phone number.
const whatsapp = (clean(process.env.NEXT_PUBLIC_WHATSAPP) || phone).replace(/\D/g, "");
// Instagram handle without "@". TODO(client): confirm "trilochana_photography" vs "trilochana_photographer".
// Set NEXT_PUBLIC_INSTAGRAM= (empty) to hide Instagram everywhere.
const instagram = (process.env.NEXT_PUBLIC_INSTAGRAM ?? "trilochana_photography").trim().replace(/^@/, "");

/** Optional profiles: any left blank is simply not shown. */
const socials = [
  { key: "instagram", label: "Instagram", url: instagram ? `https://www.instagram.com/${instagram}/` : "", display: `@${instagram}` },
  { key: "facebook", label: "Facebook", url: clean(process.env.NEXT_PUBLIC_FACEBOOK_URL) },
  { key: "youtube", label: "YouTube", url: clean(process.env.NEXT_PUBLIC_YOUTUBE_URL) },
] as const;

export type Social = { key: (typeof socials)[number]["key"]; label: string; url: string; display?: string };

export const site = {
  name: "Trilochana Photography",
  tagline: "Three Eyes | One Vision",
  footerLine: "Capture | Create | Cherish",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003",

  phone,
  phoneHref: `tel:+${phone.replace(/\D/g, "")}`,
  whatsapp,
  whatsappText: "Hi Trilochana Photography, I'd like to enquire about a shoot.",
  // Public contact email shown on the site (not where enquiries are sent: that's ENQUIRY_TO_EMAIL).
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  instagram,
  socials: socials.filter((s) => s.url) as Social[],

  address: {
    street: "13/485 Mayur Vihar Phase 1",
    locality: "Delhi",
    region: "Delhi",
    postalCode: "110091", // TODO(client): confirm PIN
    country: "IN",
  },
  serviceArea: "Delhi NCR",
  areaServed: ["Delhi", "Noida", "Gurugram", "Ghaziabad", "Faridabad"],

  // TODO(client): add exact coordinates from the Google Business Profile pin, e.g. { lat: 28.6, lng: 77.29 }
  geo: null as { lat: number; lng: number } | null,
  // TODO(client): confirm hours. Schema.org format, e.g. [{ days: ["Monday", ...], opens: "09:00", closes: "20:00" }]
  openingHours: [] as { days: string[]; opens: string; closes: string }[],

  showRates: true,
};

export const addressLine = `${site.address.street}, ${site.address.locality} ${site.address.postalCode}`;
export const instagramUrl = site.socials.find((s) => s.key === "instagram")?.url ?? "";
export const waLink = (text: string = site.whatsappText) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
