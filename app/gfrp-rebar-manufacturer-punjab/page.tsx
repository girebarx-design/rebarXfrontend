import type { Metadata } from "next";
import GeoLandingPage from "@/components/rx/GeoLandingPage";
import { getGeoPage } from "@/lib/geo-pages";

const data = getGeoPage("punjab")!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: "https://www.rebarx.in/gfrp-rebar-manufacturer-punjab" },
  openGraph: {
    title: data.metaTitle,
    description: data.ogDescription,
    url: "https://www.rebarx.in/gfrp-rebar-manufacturer-punjab",
  },
};

export default function PunjabPage() {
  return <GeoLandingPage data={data} />;
}
