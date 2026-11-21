import { cache } from "react";
import { LOCAL_POSTS } from "@/content/posts";

const CMS = "https://rebar-xbackend.vercel.app/api";

const postCache = new Map<string, any>();

async function safeFetch(
  url: string,
  opts: any = {},
  timeoutMs = 12000,
  retries = 2
): Promise<Response | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        ...opts,
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (res.ok) return res;
    } catch (err: any) {
      if (attempt === retries) {
        console.warn(`Fetch timed out or failed for ${url}:`, err?.message || err);
        return null;
      }
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }
  return null;
}

export type Block = Record<string, any>;

// Third-party profile URLs for the same RebarX business entity — emitted as
// schema.org `sameAs` on every page that declares the Organization/
// LocalBusiness JSON-LD (same @id: https://www.rebarx.in/#org), so Google
// and AI crawlers link this listing to the on-site entity instead of
// treating it as an unrelated business.
export const ORG_SAME_AS = [
  "https://www.indiamart.com/credificventures/",
  "https://www.facebook.com/RebarX",
  "https://www.facebook.com/profile.php?id=61583045324381",
  "https://www.instagram.com/rebarx.sariya/",
  "https://www.youtube.com/@RebarX_Fibre_Sariya",
];

/**
 * Inserts Cloudinary's auto-format/auto-quality transformation so the
 * browser gets WebP/AVIF where supported instead of whatever format was
 * uploaded, without needing a separate image pipeline. No-op for non-
 * Cloudinary URLs (icons, legacy hosts) or URLs that already carry
 * transformations.
 */
export function cldOptimize(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  if (/\/upload\/[^/]*f_auto/.test(url)) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}

/**
 * Fetched on the server so crawlers (including AI crawlers that don't run JS)
 * receive fully-rendered HTML. Revalidates hourly.
 */
export async function getPage(slug: string) {
  const res = await safeFetch(
    `${CMS}/pages?where[slug][equals]=${slug}&depth=2`,
    { next: { revalidate: 86400 } },
    12000,
    2
  );
  if (!res || !res.ok) return null;
  const data = await res.json();
  return data.docs?.[0] ?? null;
}

export async function getNav() {
  const res = await safeFetch(`${CMS}/navbar?depth=2`, {
    next: { revalidate: 86400 },
  }, 12000, 2);
  if (!res || !res.ok) return null;
  const data = await res.json();
  return data.docs?.[0] ?? null;
}

export async function getFooter() {
  const res = await safeFetch(`${CMS}/footer?depth=2`, {
    next: { revalidate: 86400 },
  }, 12000, 2);
  if (!res || !res.ok) return null;
  const data = await res.json();
  return data.docs?.[0] ?? null;
}

export function blocksOf(page: any): Record<string, Block> {
  const out: Record<string, Block> = {};
  for (const b of page?.layout ?? []) out[b.blockType] = b;
  return out;
}

/** Matches the slugs stored in the CMS, which aren't always pre-slugified. */
export function slugify(text = ""): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

/**
 * Hides auto-drafted posts awaiting approval.
 */
export const PUBLISHED_FILTER = "where[published][not_equals]=false";

// Fields needed for blog index listing cards (drops payload from 2.7MB to ~100KB)
const BLOG_CARD_SELECT =
  "select[title]=true&select[slug]=true&select[date]=true&select[createdAt]=true&select[tag]=true&select[mainImage]=true&select[metaDescription]=true";

async function fetchBlogPosts(depth: number, limit: number, selectFields = BLOG_CARD_SELECT) {
  const selectParam = selectFields ? `&${selectFields}` : "";
  const base = `${CMS}/blog-posts?depth=${depth}&limit=${limit}${selectParam}`;
  const opts = { next: { revalidate: 86400 } };

  const res = await safeFetch(`${base}&${PUBLISHED_FILTER}`, opts, 15000, 2);
  if (res && res.ok) return (await res.json()).docs ?? [];

  const fallback = await safeFetch(base, opts, 15000, 2);
  if (!fallback || !fallback.ok) return [];
  return (await fallback.json()).docs ?? [];
}

/** Blog index: local git posts first, then CMS posts (lightweight card payload) */
export async function getBlogPosts() {
  const cms = await fetchBlogPosts(1, 100);
  return [...LOCAL_POSTS, ...cms];
}

/** Single post: check local git posts first; if not found, fetch ONLY that single post from CMS */
export const getBlogPostBySlug = cache(async (slug: string) => {
  // 1. Check local posts in memory first (0ms, 0 external network, 0 CPU)
  const local =
    LOCAL_POSTS.find((p: any) => slugify(p.slug) === slug) ??
    LOCAL_POSTS.find((p: any) => p.slug === slug);
  if (local) return local;

  // 2. In-memory worker cache
  if (postCache.has(slug)) return postCache.get(slug);

  // 3. Fetch specific single post by slug from CMS (36KB instead of 2.12MB full collection fetch)
  const opts = { next: { revalidate: 86400 } };
  try {
    const res = await safeFetch(
      `${CMS}/blog-posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`,
      opts,
      12000,
      2
    );
    if (res && res.ok) {
      const data = await res.json();
      if (data.docs?.[0]) {
        postCache.set(slug, data.docs[0]);
        postCache.set(slugify(slug), data.docs[0]);
        return data.docs[0];
      }
    }

    // Try without encoded slug if different
    const slugified = slugify(slug);
    if (slugified !== slug) {
      const fallbackRes = await safeFetch(
        `${CMS}/blog-posts?where[slug][equals]=${encodeURIComponent(slugified)}&depth=2&limit=1`,
        opts,
        12000,
        2
      );
      if (fallbackRes && fallbackRes.ok) {
        const data = await fallbackRes.json();
        if (data.docs?.[0]) {
          postCache.set(slug, data.docs[0]);
          postCache.set(slugified, data.docs[0]);
          return data.docs[0];
        }
      }
    }
  } catch (err) {
    console.error(`Failed to fetch post "${slug}" from CMS:`, err);
  }

  return null;
});

/** Site albums for /applications. Newest first; CMS date is month-precision. */
export async function getApplications() {
  const res = await safeFetch(`${CMS}/applications?depth=2&limit=100&sort=-date`, {
    next: { revalidate: 86400 },
  }, 12000, 2);
  if (!res || !res.ok) return [];
  const data = await res.json();
  return data.docs ?? [];
}

/** City landing pages (/gfrp-rebar-in-<slug>). */
export async function getCities() {
  const res = await safeFetch(
    `${CMS}/cities?limit=300&sort=city&where[published][equals]=true`,
    { next: { revalidate: 86400 } },
    12000,
    2
  );
  if (!res || !res.ok) return [];
  const data = await res.json();
  return data.docs ?? [];
}

export async function getCityBySlug(slug: string) {
  const res = await safeFetch(
    `${CMS}/cities?limit=1&where[slug][equals]=${encodeURIComponent(slug)}&where[published][equals]=true`,
    { next: { revalidate: 86400 } },
    12000,
    2
  );
  if (!res || !res.ok) return null;
  const data = await res.json();
  return data.docs?.[0] ?? null;
}
