import Image from "next/image";
import type { MaybeImg } from "@/lib/images";

/** Fills its (aspect-ratio) parent. Renders a labelled placeholder when the file is missing. */
export function Photo({
  image,
  sizes,
  hero = false,
  className = "",
}: {
  image: MaybeImg;
  sizes: string;
  hero?: boolean;
  className?: string;
}) {
  if ("missing" in image) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 border border-line-dark bg-card-dark p-4 text-center ${className}`}
      >
        <span aria-hidden className="font-cinzel text-xs tracking-[0.28em] text-gold">
          PHOTO COMING SOON
        </span>
        <span aria-hidden className="text-xs text-muted-dark">
          {image.src.split("/").pop()}
        </span>
      </div>
    );
  }
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      placeholder={image.blurDataURL ? "blur" : "empty"}
      blurDataURL={image.blurDataURL}
      preload={hero}
      fetchPriority={hero ? "high" : undefined}
      className={`object-cover ${className}`}
    />
  );
}
