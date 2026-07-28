const CMS = "https://rebar-xbackend.vercel.app/api";

export type Block = Record<string, any>;

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
