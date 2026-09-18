import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityLandingPage from "@/components/rx/CityLandingPage";
import { getCities, getCityBySlug } from "@/lib/cms";

export const revalidate = 3600;

type Params = Promise<{ city: string }>;

/** Pre-render every published city at build time. Anything added in the CMS
 * later still resolves on demand and then caches, so Kapil does not need a
 * redeploy to publish a new city. */
export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((c: any) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) return { title: "City not found | RebarX" };

  const url = `https://www.rebarx.in/gfrp-rebar-in-${slug}`;
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: city.metaTitle, description: city.metaDescription, url },
  };
}

export default async function CityPage({ params }: { params: Params }) {
  const { city: slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) notFound();

  const others = (await getCities()).filter((c: any) => c.slug !== slug);
  return <CityLandingPage city={city} others={others} />;
}
