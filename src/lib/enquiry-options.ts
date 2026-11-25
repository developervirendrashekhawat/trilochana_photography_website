// Zod-free helpers the form needs at render time. The schema itself lives in ./enquiry
// and is loaded on first submit, so zod stays out of the initial JS.
import { services } from "@/content/services";
import { site, waLink } from "@/content/site";

export const shootTypes = [...services.map((s) => ({ value: s.slug, label: s.title })), { value: "other", label: "Other" }];

/** Today's date in India as YYYY-MM-DD (server runs in UTC, so don't use toISOString). */
export const todayIST = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

/** Strips spaces/dashes/brackets and a leading +91 / 91 / 0; returns 10 digits or the raw input. */
export const normalizePhone = (v: string) => {
  const d = v.replace(/[\s\-().]/g, "");
  const m = d.match(/^(?:\+91|91|0)?([6-9]\d{9})$/);
  return m ? m[1] : d;
};

export type EnquiryField = "name" | "phone" | "email" | "service" | "date" | "venue" | "message" | "website";
export type FieldErrors = Partial<Record<EnquiryField, string>>;

export const serviceLabel = (v: string) => shootTypes.find((s) => s.value === v)?.label ?? v;

/** Prefilled WhatsApp message built from whatever the visitor has typed so far. */
export function enquiryWhatsApp(e: Partial<Record<EnquiryField, string>>) {
  const lines = [
    `Hi ${site.name}, I'd like to enquire about a shoot.`,
    e.name && `Name: ${e.name}`,
    e.service && `Shoot: ${serviceLabel(e.service)}`,
    e.date && `Date: ${e.date}`,
    e.venue && `Venue/City: ${e.venue}`,
    e.message && `Details: ${e.message}`,
  ];
  return waLink(lines.filter(Boolean).join("\n"));
}
