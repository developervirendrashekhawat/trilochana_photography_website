// Shared by the form (client, lazy-loaded on submit) and /api/enquiry (server).
import * as z from "zod/mini";
import { normalizePhone, shootTypes, todayIST, type FieldErrors } from "./enquiry-options";

export * from "./enquiry-options";

const text = (max: number) => z.pipe(z.optional(z.string()), z.transform((v) => (v ?? "").trim().slice(0, max)));

export const enquirySchema = z.object({
  name: z.string().check(
    z.trim(),
    z.minLength(2, "Please enter your name"),
    z.maxLength(80, "That name is too long"),
  ),
  phone: z.string().check(
    z.overwrite(normalizePhone),
    z.regex(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number, e.g. 98716 63624"),
  ),
  email: z.optional(
    z.union([z.literal(""), z.string().check(z.trim(), z.email("Enter a valid email address"), z.maxLength(120))]),
  ),
  service: z.enum(
    shootTypes.map((s) => s.value) as [string, ...string[]],
    "Please choose a type of shoot",
  ),
  date: z.optional(
    z.string().check(
      z.refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Pick a valid date"),
      z.refine((v) => v === "" || v >= todayIST(), "The date can't be in the past"),
    ),
  ),
  venue: text(120),
  message: text(2000),
  website: z.optional(z.string()), // honeypot: real users never see or fill this
});

export type Enquiry = z.output<typeof enquirySchema>;

export function fieldErrors(error: z.core.$ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const k = issue.path[0] as keyof FieldErrors;
    if (k && !out[k]) out[k] = issue.message;
  }
  return out;
}
