// lib/getSEO.ts
export async function getSEO() {
  const res = await fetch(
    "https://rebar-xbackend.vercel.app/api/globals/seo",
    {
      next: { revalidate: 86400 }, // 24 hours (prevents 60-second ISR serverless re-invocation loops)
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data;
}
