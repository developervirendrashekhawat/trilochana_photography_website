import type { NextConfig } from "next";

const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    // Temporary stock photos (see src/content/portfolio.ts). Remove once all photos are local.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" }],
  },
  // /_next/static is already immutable (Next sets it). Explicit for public assets on any host.
  // ponytail: /brand and /images are cached for a year, so rename a file when you replace it.
  async headers() {
    return [
      { source: "/brand/:path*", headers: immutable },
      { source: "/images/:path*", headers: immutable },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
