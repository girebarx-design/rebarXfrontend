const CMS = "https://rebar-xbackend.vercel.app/api";

export type Block = Record<string, any>;

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
  const res = await fetch(
    `${CMS}/pages?where[slug][equals]=${slug}&depth=2`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`CMS ${res.status} for page "${slug}"`);
  const data = await res.json();
  return data.docs?.[0] ?? null;
}

export async function getNav() {
  const res = await fetch(`${CMS}/navbar?depth=2`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.docs?.[0] ?? null;
}

export async function getFooter() {
  const res = await fetch(`${CMS}/footer?depth=2`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
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

/** Blog index: light payload (depth=1) is enough for cards. */
export async function getBlogPosts() {
  const res = await fetch(`${CMS}/blog-posts?depth=1&limit=100`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.docs ?? [];
}

/** Single post: depth=2 to populate content + related posts. */
export async function getBlogPostsFull() {
  const res = await fetch(`${CMS}/blog-posts?depth=2&limit=100`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.docs ?? [];
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPostsFull();
  return (
    posts.find((p: any) => slugify(p.slug) === slug) ??
    posts.find((p: any) => p.slug === slug) ??
    null
  );
}
