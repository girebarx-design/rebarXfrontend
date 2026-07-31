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
      // Footer CMS data links to these as standalone pages, but they're
      // homepage sections — the pages themselves never existed (404).
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/compare", destination: "/#compare", permanent: true },
      // /slab-calculator and /calculator were byte-identical duplicate
      // pages (duplicate-content SEO issue) — /calculator is the one
      // actually linked (footer), so consolidate onto it.
      { source: "/slab-calculator", destination: "/calculator", permanent: true },
    ];
  },
};

export default nextConfig;