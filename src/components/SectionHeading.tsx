export function SectionHeading({
  id,
  eyebrow,
  title,
  dark = false,
  center = false,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  dark?: boolean;
  center?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${dark ? "text-gold" : "text-gold-text"}`}>{eyebrow}</p>
      <h2 id={id} className={`h2 mt-3 ${dark ? "text-cream" : "text-text"}`}>
        {title}
      </h2>
      {children && <p className={`mt-4 text-base leading-relaxed ${dark ? "text-muted-dark" : "text-muted-foreground"}`}>{children}</p>}
    </div>
  );
}
