import type { Metadata } from "next";
import GeoLandingPage from "@/components/rx/GeoLandingPage";
import { getGeoPage } from "@/lib/geo-pages";

const data = getGeoPage("uttar-pradesh")!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: "https://www.rebarx.in/gfrp-rebar-manufacturer-uttar-pradesh" },
  openGraph: {
    title: data.metaTitle,
    description: data.ogDescription,
    url: "https://www.rebarx.in/gfrp-rebar-manufacturer-uttar-pradesh",
  },
};

export default function UttarPradeshPage() {
  return <GeoLandingPage data={data} />;
}
