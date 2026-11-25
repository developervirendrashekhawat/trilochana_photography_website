import { site } from "@/content/site";
import { ogSize, renderOg } from "@/lib/og";

export const alt = `${site.name}: ${site.tagline}. Event & portrait photography in Delhi NCR`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg();
}
