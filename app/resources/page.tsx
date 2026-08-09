import type { Metadata } from "next";
import ResourcesContent from "@/components/rx/ResourcesContent";

export const metadata: Metadata = {
  title: "Technical Resource Center | RebarX GFRP Rebar",
  description:
    "Company documents, referenced research, and the compliance standards RebarX GFRP rebar is manufactured to — IS 18256, ACI 440.11-22, ASTM D7957.",
  alternates: { canonical: "https://www.rebarx.in/resources" },
  openGraph: {
    title: "Technical Resource Center | RebarX",
    description:
      "Company documents, referenced research, and the standards RebarX GFRP rebar is built to.",
    url: "https://www.rebarx.in/resources",
  },
};

export default function ResourcesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RebarX Technical Resource Center",
    url: "https://www.rebarx.in/resources",
    description:
      "Company documents, referenced research, and compliance standards for RebarX GFRP rebar.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResourcesContent />
    </>
  );
}
