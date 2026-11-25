import meta from "@/content/image-meta.json";

export type Img = { src: string; alt: string; blurDataURL?: string };
type Meta = Record<string, { width: number; height: number; blurDataURL: string }>;

/** Resolves a /public path to dimensions + blur placeholder, or `null` if the file isn't there yet. */
export function img(src: string, alt: string): Img | { src: string; alt: string; missing: true } {
  if (/^https?:\/\//.test(src)) return { src, alt }; // remote (Unsplash): no local blur
  const m = (meta as Meta)[src];
  return m ? { src, alt, ...m } : { src, alt, missing: true };
}

export type MaybeImg = ReturnType<typeof img>;
