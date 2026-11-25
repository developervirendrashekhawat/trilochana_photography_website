import type { Social } from "@/content/site";

// Inline brand marks (lucide-react v1 has no brand icons). Outline style to match the rest.
export function SocialIcon({ name, size = 20 }: { name: Social["key"]; size?: number }) {
  const p = { "aria-hidden": true, width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;
  switch (name) {
    case "instagram":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...p}>
          <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...p}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
          <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
        </svg>
      );
  }
}
