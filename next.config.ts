// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   typescript: {
//     // 👇 This is what disables type checking at build
//     ignoreBuildErrors: true,
//   },
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // next/image is never used anywhere in this app (all images render as
    // plain <img> tags direct from Cloudinary, which already does its own
    // format/quality optimization — see lib/cms.ts cldOptimize). Disabling
    // this also fully closes off Next's built-in image-optimization route,
    // which is the only runtime path that invokes the vulnerable bundled
    // `sharp`/libvips versions in next@15.5.23 (CVE-2026-333xx/355xx) —
    // removes that attack surface without needing the Next 16 major bump.
    unoptimized: true,
    domains: [
      "i.postimg.cc",
      "cdn.prod.website-files.com",
      "images.unsplash.com",
      "composite-tech.com",
      "127.0.0.1",
      "gfrp-india.onrender.com",
      "payload-back.onrender.com",
    ],
  },
  async redirects() {
    return [
      // Footer CMS data links to /about as a standalone page, but it's a
      // homepage section — the page itself never existed (404).
      // /compare used to redirect to the homepage's #compare anchor; it's
      // now a real indexable page (app/compare/page.tsx) with its own
      // direct-answer content and FAQ, so the redirect is gone.
      { source: "/about", destination: "/#about", permanent: true },
      // /slab-calculator and /calculator were byte-identical duplicate
      // pages (duplicate-content SEO issue) — /calculator is the one
      // actually linked (footer), so consolidate onto it.
      { source: "/slab-calculator", destination: "/calculator", permanent: true },
    ];
  },
  async headers() {
    // Only in production: Next.js dev mode (HMR/fast refresh) needs
    // 'unsafe-eval' and other allowances that would just add noise locally.
    if (process.env.NODE_ENV !== "production") return [];

    // The CMS lets editors paste raw <script> tags into a few SEO-global
    // fields (customHeadScripts, analytics IDs), rendered via RawScripts
    // (components/rx/RawScripts.tsx) as inline next/script elements — that
    // still needs 'unsafe-inline' on script-src since there's no CSP nonce
    // wired through Next's script injection here. So this is a real
    // hardening step (blocks cross-origin script/frame/object injection)
    // but not a fully strict nonce-based one.
    //
    // google-analytics/googletagmanager/google.com/google.co.in/doubleclick
    // are wildcarded rather than pinned to exact hosts: GA4 + Google Ads
    // conversion tracking legitimately hits many subdomains (collect
    // endpoints, conversion pixels, audience beacons) that differ by
    // region/config and aren't practical to enumerate — verified against
    // a production build locally; a narrower list silently broke real
    // conversion tracking on the contact page (ads_conversion_Contact_1).
    // cdn.prod.website-files.com is the legacy Webflow asset host the old
    // globals.css still references (also already in images.domains above).
    const googleHosts =
      "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.google.com https://*.google.co.in https://*.g.doubleclick.net";
    const legacyAssetHosts =
      "https://cdn.prod.website-files.com https://i.postimg.cc https://images.unsplash.com https://composite-tech.com https://gfrp-india.onrender.com https://payload-back.onrender.com";
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' ${googleHosts}`,
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: https://res.cloudinary.com ${googleHosts} ${legacyAssetHosts}`,
      `font-src 'self' data: https://cdn.prod.website-files.com`,
      // hero.backgroundVideoURL is a freeform CMS text field (an editor
      // can paste any video URL) — this broke silently in production
      // because media-src wasn't set at all, so it fell back to
      // default-src 'self' and blocked the hero background video
      // (a Pexels stock clip). res.cloudinary.com covers CMS-native
      // uploads; *.pexels.com covers this and any future Pexels URL an
      // editor picks, since exact subdomains vary by clip.
      "media-src 'self' https://res.cloudinary.com https://*.pexels.com",
      `connect-src 'self' https://rebar-xbackend.vercel.app ${googleHosts}`,
      `frame-src 'self' https://www.google.com`,
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://rebar-xbackend.vercel.app",
      "frame-ancestors 'self'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;