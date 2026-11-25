"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "./DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { enquiryWhatsApp, shootTypes, todayIST, type FieldErrors } from "@/lib/enquiry-options";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "../WhatsAppFloat";

type Values = Record<"name" | "phone" | "email" | "service" | "date" | "venue" | "message" | "website", string>;
const empty: Values = { name: "", phone: "", email: "", service: "", date: "", venue: "", message: "", website: "" };

const field = "min-h-12 bg-paper text-base text-foreground";

export function EnquiryForm() {
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [minDate, setMinDate] = useState<string>();

  // Pre-select the service from /?service=<slug>#contact (links on /services). Read on the
  // client so the page stays fully static.
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("service");
    const known = s && shootTypes.some((t) => t.value === s);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL / clock after hydration
    setMinDate(todayIST());
    if (known) setV((x) => ({ ...x, service: s }));
  }, []);

  const setValue = (k: keyof Values, value: string) => {
    setV((x) => ({ ...x, [k]: value }));
    if (errors[k as keyof FieldErrors]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setV((x) => ({ ...x, [k]: e.target.value }));
    if (errors[k as keyof FieldErrors]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    const { enquirySchema, fieldErrors } = await import("@/lib/enquiry"); // zod loads on first submit
    const parsed = enquirySchema.safeParse(v);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("sent");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setFormError(data.message || "Something went wrong. Please try again or WhatsApp us.");
      setStatus("error");
    } catch {
      setFormError("Couldn't reach the server. Check your connection, or WhatsApp us instead.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="py-10 text-center">
        <p className="eyebrow text-gold-text">Enquiry received</p>
        <p className="mt-4 font-display text-3xl font-semibold text-foreground">
          Thank you. We&apos;ll call or WhatsApp you within 24 hours.
        </p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setV(empty);
            setStatus("idle");
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p id={`f-${k}-err`} className="mt-1.5 text-sm text-destructive">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof FieldErrors) => ({
    id: `f-${k}`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `f-${k}-err` : undefined,
  });

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Label htmlFor="f-name" className="mb-2">
          Your name <span aria-hidden className="text-destructive">*</span>
        </Label>
        <Input {...a11y("name")} required autoComplete="name" value={v.name} onChange={set("name")} className={field} />
        {err("name")}
      </div>
      <div>
        <Label htmlFor="f-phone" className="mb-2">
          Phone / WhatsApp <span aria-hidden className="text-destructive">*</span>
        </Label>
        <Input
          {...a11y("phone")}
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          value={v.phone}
          onChange={set("phone")}
          className={field}
        />
        {err("phone")}
      </div>
      <div>
        <Label htmlFor="f-email" className="mb-2">
          Email <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Input {...a11y("email")} type="email" autoComplete="email" value={v.email} onChange={set("email")} className={field} />
        {err("email")}
      </div>
      <div>
        <Label htmlFor="f-service" className="mb-2">
          Type of shoot <span aria-hidden className="text-destructive">*</span>
        </Label>
        <Select
          items={shootTypes}
          value={v.service || null}
          onValueChange={(val) => setValue("service", (val as string | null) ?? "")}
        >
          <SelectTrigger
            {...a11y("service")}
            className="w-full bg-paper text-base data-[size=default]:h-12 data-placeholder:text-muted-foreground"
          >
            <SelectValue placeholder="Choose one" />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start" className="rounded-sm bg-paper">
            {shootTypes.map((s) => (
              <SelectItem key={s.value} value={s.value} className="min-h-11 text-base">
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {err("service")}
      </div>
      <div>
        <Label htmlFor="f-date" className="mb-2">
          Event date
        </Label>
        <DatePicker
          id="f-date"
          value={v.date}
          onChange={(d) => setValue("date", d)}
          min={minDate}
          invalid={!!errors.date}
          describedBy={errors.date ? "f-date-err" : undefined}
        />
        {err("date")}
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="f-venue" className="mb-2">
          Venue / city
        </Label>
        <Input {...a11y("venue")} autoComplete="address-level2" value={v.venue} onChange={set("venue")} className={field} />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="f-message" className="mb-2">
          Tell us about your event
        </Label>
        <Textarea {...a11y("message")} rows={4} value={v.message} onChange={set("message")} className="min-h-28 bg-paper text-base" />
      </div>
      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2">
        {formError && (
          <p role="alert" className="text-sm text-destructive">
            {formError}
          </p>
        )}
        <Button type="submit" disabled={status === "sending"} className="w-full">
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Prefer WhatsApp?{" "}
          <a
            href={enquiryWhatsApp(v)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "link", size: "sm" }), "px-1")}
          >
            <WhatsAppIcon size={16} /> Send these details on WhatsApp
          </a>
        </p>
      </div>
    </form>
  );
}
