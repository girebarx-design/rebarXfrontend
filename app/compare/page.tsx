import type { Metadata } from "next";
import { getPage, blocksOf } from "@/lib/cms";
import { toSpecs } from "@/lib/lexical";
import CompareContent from "@/components/rx/CompareContent";
import { dict } from "@/lib/i18n/dict";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "GFRP Rebar vs TMT Steel Rebar — Full Comparison | RebarX",
  description:
    "GFRP rebar has roughly 2x the tensile strength of TMT steel, is about 80% lighter, and does not corrode. See the full spec-by-spec comparison, including where TMT steel is still the better fit.",
  alternates: { canonical: "https://www.rebarx.in/compare" },
  openGraph: {
    title: "GFRP Rebar vs TMT Steel Rebar — Full Comparison | RebarX",
    description:
      "Tensile strength, weight, corrosion resistance, service life and cost — GFRP rebar compared spec-by-spec against TMT steel.",
    url: "https://www.rebarx.in/compare",
  },
};

export default async function ComparePage() {
  const page = await getPage("home");
  const b = blocksOf(page);
  const cmp = b["gfrp-vs-tmt"] ?? {};
  const sections = cmp.comparisonSections ?? [];

  const rebarx = sections.find((s: any) => s.sectionTitle === "gfrp") ?? sections[0];
  const tmt = sections.find((s: any) => s.sectionTitle === "tmt") ?? sections[1];
  const aSpecs = toSpecs(rebarx?.properties?.[0]?.property);
  const bSpecs = toSpecs(tmt?.properties?.[0]?.property);

  // FAQPage JSON-LD stays English-only — it's server-rendered per request
  // regardless of the client-side language toggle, and English is what the
  // English-language search/AI queries this schema targets actually match.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.comparePage.faqs.map((f) => ({
      "@type": "Question",
      name: f.q.en,
      acceptedAnswer: { "@type": "Answer", text: f.a.en },
    })),
  };

  // A live-data table check: comparing named specs is a real answer-engine
  // structure only if there are matched rows to show. If the CMS section
  // is ever emptied out, fall back to the FAQ-only content rather than
  // rendering a table with nothing in it.
  const hasSpecs = aSpecs.length > 0 && bSpecs.length > 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CompareContent sections={sections} hasSpecs={hasSpecs} />
    </>
  );
}
