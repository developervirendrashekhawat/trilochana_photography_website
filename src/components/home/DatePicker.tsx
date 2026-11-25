"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// react-day-picker is only fetched when the popover first opens.
const Calendar = dynamic(() => import("@/components/ui/calendar").then((m) => m.Calendar), {
  ssr: false,
  loading: () => <div className="h-[372px] w-[324px]" aria-hidden />,
});

/** "YYYY-MM-DD" <-> local Date, with no timezone shifting. */
const toDate = (s: string) => (s ? new Date(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10)) : undefined);
const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function DatePicker({
  id,
  value,
  onChange,
  min,
  invalid,
  describedBy,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  min?: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = toDate(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          "flex min-h-12 w-full items-center justify-between gap-2 rounded-sm border border-input bg-paper px-3 text-left text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive",
          !selected && "text-muted-foreground",
        )}
      >
        {selected
          ? selected.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" })
          : "Pick a date"}
        <CalendarIcon aria-hidden className="size-4 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto rounded-sm bg-paper p-0">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected}
          disabled={min ? { before: toDate(min)! } : undefined}
          onSelect={(d) => {
            onChange(d ? toISO(d) : "");
            setOpen(false);
          }}
          className="bg-paper [--cell-size:--spacing(11)]"
        />
        {selected && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="min-h-11 w-full border-t border-border text-sm text-gold-text hover:bg-muted"
          >
            Clear date
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}
