import { Resend } from "resend";
import { enquirySchema, fieldErrors, serviceLabel, type Enquiry } from "@/lib/enquiry";
import { site } from "@/content/site";

// ---- Rate limit: in-memory token bucket per IP ------------------------------------------
// ponytail: memory is per server instance and resets on cold start, so it's a speed bump for
// spam, not a guarantee. Move to Upstash/Vercel KV if abuse shows up.
const CAPACITY = 5; // burst
const REFILL_PER_MS = 5 / (10 * 60_000); // 5 enquiries per 10 minutes
const buckets = new Map<string, { tokens: number; at: number }>();

function allow(ip: string) {
  const now = Date.now();
  const b = buckets.get(ip) ?? { tokens: CAPACITY, at: now };
  b.tokens = Math.min(CAPACITY, b.tokens + (now - b.at) * REFILL_PER_MS);
  b.at = now;
  if (buckets.size > 5000) buckets.clear();
  buckets.set(ip, b);
  if (b.tokens < 1) return false;
  b.tokens -= 1;
  return true;
}

// ---- Email -------------------------------------------------------------------------------
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(e: Enquiry): [string, string][] {
  return [
    ["Name", e.name],
    ["Phone / WhatsApp", `+91 ${e.phone}`],
    ["Email", e.email || "—"],
    ["Type of shoot", serviceLabel(e.service)],
    ["Event date", e.date || "—"],
    ["Venue / city", e.venue || "—"],
    ["Message", e.message || "—"],
  ];
}

function emailHtml(e: Enquiry) {
  const wa = `https://wa.me/91${e.phone}?text=${encodeURIComponent(`Hi ${e.name}, thanks for your enquiry with ${site.name}.`)}`;
  const tr = rows(e)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#5B564C;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:8px 12px;color:#1A1916;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Arial,sans-serif;background:#F6F1E7;padding:24px">
  <div style="max-width:560px;margin:auto;background:#FFFDF8;border-top:4px solid #C9A45C">
    <h1 style="font-size:18px;margin:0;padding:20px 12px 8px;color:#0F0F0F">New enquiry: ${esc(serviceLabel(e.service))}</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">${tr}</table>
    <p style="padding:16px 12px 24px;margin:0">
      <a href="${wa}" style="background:#C9A45C;color:#0F0F0F;padding:12px 20px;text-decoration:none;font-weight:bold;display:inline-block">Reply on WhatsApp</a>
      &nbsp; <a href="tel:+91${e.phone}" style="color:#7A5C22">Call +91 ${e.phone}</a>
    </p>
  </div></div>`;
}

async function sendEmail(e: Enquiry) {
  const { RESEND_API_KEY, ENQUIRY_FROM_EMAIL, ENQUIRY_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_FROM_EMAIL || !ENQUIRY_TO_EMAIL) return "skipped" as const;
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: ENQUIRY_FROM_EMAIL,
    to: ENQUIRY_TO_EMAIL.split(",").map((s) => s.trim()),
    replyTo: e.email || undefined,
    subject: `New enquiry: ${serviceLabel(e.service)} – ${e.name}${e.date ? ` (${e.date})` : ""}`,
    html: emailHtml(e),
    text: rows(e).map(([k, v]) => `${k}: ${v}`).join("\n"),
  });
  if (error) throw new Error(`Resend: ${error.message}`);
  return "sent" as const;
}

// ---- Google Sheets (optional) -------------------------------------------------------------
async function appendToSheet(e: Enquiry) {
  const { GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
  if (!GOOGLE_SHEETS_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) return "skipped" as const;
  // Lazy import keeps google-auth-library out of everything except this route's execution.
  const { JWT } = await import("google-auth-library");
  const auth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  await auth.request({
    // RAW (not USER_ENTERED) so a visitor typing "=SOMEFORMULA()" stays plain text.
    url: `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/A1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    method: "POST",
    data: { values: [[timestamp, ...rows(e).map(([, v]) => v)]] },
  });
  return "sent" as const;
}

// ---- Handler -------------------------------------------------------------------------------
const json = (body: object, status = 200) => Response.json(body, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (!allow(ip)) {
    return json({ ok: false, message: "Too many enquiries from your connection. Please WhatsApp us instead." }, 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, message: "Please check the highlighted fields.", errors: fieldErrors(parsed.error) }, 400);
  }
  const e = parsed.data;

  // Honeypot filled: pretend success so bots learn nothing.
  if (e.website) return json({ ok: true });

  const [mail, sheet] = await Promise.allSettled([sendEmail(e), appendToSheet(e)]);
  for (const r of [mail, sheet]) if (r.status === "rejected") console.error("[enquiry]", r.reason);

  const delivered = [mail, sheet].some((r) => r.status === "fulfilled" && r.value === "sent");
  if (delivered) return json({ ok: true });

  const nothingConfigured = [mail, sheet].every((r) => r.status === "fulfilled" && r.value === "skipped");
  if (nothingConfigured && process.env.NODE_ENV !== "production") {
    console.info("[enquiry] no RESEND_/GOOGLE_ env set; enquiry logged only:", e);
    return json({ ok: true, dev: true });
  }

  // Never tell the visitor "received" when it went nowhere.
  return json(
    { ok: false, message: "Sorry, we couldn't send your enquiry right now. Please call or WhatsApp us on " + site.phone + "." },
    502,
  );
}
