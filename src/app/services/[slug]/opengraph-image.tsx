import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Trilochana Photography service in Delhi NCR";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  return renderOg(`${s.keyword} · Delhi NCR`);
}
