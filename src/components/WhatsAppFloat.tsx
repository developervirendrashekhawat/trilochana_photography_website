import { waLink } from "@/content/site";

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44M20.1 3.9A11.32 11.32 0 0 0 12.05.55C5.77.55.66 5.66.66 11.94c0 2.01.52 3.97 1.52 5.7L.56 23.55l6.04-1.58a11.4 11.4 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.4 0-3.04-1.18-5.9-3.34-8.06" />
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Trilochana Photography on WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-sm bg-gold text-ink shadow-lg shadow-black/40 transition-colors hover:bg-gold-light motion-reduce:transition-none sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
