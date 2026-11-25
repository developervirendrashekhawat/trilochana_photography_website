// Paste GENUINE client reviews only (e.g. copied from Google reviews with permission).
// Never invent reviews. Placeholders below are visibly marked so they can't be mistaken for real ones.
// Note: we intentionally do NOT emit Review/AggregateRating JSON-LD for these. See src/lib/jsonld.ts.

export type Testimonial = { quote: string; name: string; event: string };

export const testimonials: Testimonial[] = Array.from({ length: 5 }, (_, i) => ({
  quote: "[Paste a genuine client review]",
  name: `[Client name ${i + 1}]`,
  event: "[Event type]",
}));
