import type { Metadata } from "next";
import GeoLandingPage from "@/components/rx/GeoLandingPage";
import { getGeoPage } from "@/lib/geo-pages";

const data = getGeoPage("maharashtra")!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: "https://www.rebarx.in/gfrp-rebar-manufacturer-maharashtra" },
  openGraph: {
    title: data.metaTitle,
    description: data.ogDescription,
    url: "https://www.rebarx.in/gfrp-rebar-manufacturer-maharashtra",
  },
};

export default function MaharashtraPage() {
  return <GeoLandingPage data={data} />;
}
