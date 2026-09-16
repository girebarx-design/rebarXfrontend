import type { Metadata } from "next";
import ApplicationsContent from "@/components/rx/ApplicationsContent";
import { getApplications, ORG_SAME_AS, cldOptimize } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Where RebarX GFRP Rebar Has Been Used | Site Photos",
  description:
    "Real sites where RebarX GFRP rebar went into the structure — slabs, columns and walls across India, photographed during construction.",
  alternates: { canonical: "https://www.rebarx.in/applications" },
  openGraph: {
    title: "Where RebarX GFRP Rebar Has Been Used",
    description:
      "Site photographs of RebarX GFRP rebar in slabs, columns and walls across India.",
    url: "https://www.rebarx.in/applications",
  },
};

export default async function ApplicationsPage() {
  const albums = await getApplications();

  // ImageGallery per album rather than one page-level blob, so each site can
  // surface independently in image search. Same #org @id as every other page
  // so the entity stays one business, not several.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.rebarx.in/applications#page",
        name: "Where RebarX GFRP Rebar Has Been Used",
        url: "https://www.rebarx.in/applications",
        about: { "@id": "https://www.rebarx.in/#org" },
        publisher: { "@id": "https://www.rebarx.in/#org" },
      },
      ...albums.map((a: any) => ({
        "@type": "ImageGallery",
        "@id": `https://www.rebarx.in/applications#${a.slug}`,
        name: a.title,
        description: a.summary,
        ...(a.city || a.state
          ? {
              contentLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: a.city,
                  addressRegion: a.state,
                  addressCountry: "IN",
                },
              },
            }
          : {}),
        image: (a.photos ?? [])
          .filter((p: any) => p && (p.cloudinaryUrl || p.url))
          .map((p: any) => ({
            "@type": "ImageObject",
            contentUrl: cldOptimize(p.cloudinaryUrl || p.url),
            caption: p.alt || a.title,
          })),
      })),
      {
        "@type": "Organization",
        "@id": "https://www.rebarx.in/#org",
        sameAs: ORG_SAME_AS,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ApplicationsContent albums={albums} />
    </>
  );
}
