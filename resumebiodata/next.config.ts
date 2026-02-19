import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Puppeteer & Chromium — server-side only, don't bundle for client
  serverExternalPackages: [
    "puppeteer-core",
    "@sparticuz/chromium",
  ],

  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    formats: ["image/avif", "image/webp"],
  },

  compress: true,
  poweredByHeader: false,

  // ⚠️  Do NOT add X-Frame-Options: DENY to pages — it causes browsers
  //     to download the page as a file instead of rendering it.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // Restrict iframes only on API / download routes
      {
        source: "/api/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
