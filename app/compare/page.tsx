import type { Metadata } from "next";
import { getPage, blocksOf } from "@/lib/cms";
import { toSpecs } from "@/lib/lexical";
import ComparisonTable from "@/components/rx/ComparisonTable";
import Breadcrumbs from "@/components/rx/Breadcrumbs";
import { Eyebrow, Btn } from "@/components/rx/ui";

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

const FAQS = [
  {
    q: "Is GFRP rebar stronger than TMT steel rebar?",
    a: "By tensile strength, yes — GFRP rebar has roughly twice the tensile strength of Fe500 TMT steel, weight for weight. TMT steel still has higher stiffness (modulus of elasticity), which is why design codes size GFRP reinforcement differently rather than swapping it in at a 1:1 bar count.",
  },
  {
    q: "Does GFRP rebar rust like steel rebar?",
    a: "No. GFRP rebar is a glass-fibre-reinforced polymer with no iron content, so it has no corrosion mechanism at all — no rust staining, no spalling from expanding rust, and no chloride-induced corrosion in marine or water-contact structures.",
  },
  {
    q: "When is TMT steel still the better choice over GFRP rebar?",
    a: "For structures needing high stiffness under service loads with minimal deflection, or where local codes and consultants haven't yet approved GFRP for that specific application, TMT steel remains the conventional, more broadly specified choice. RebarX is upfront about this rather than positioning GFRP as a universal replacement.",
  },
  {
    q: "Is GFRP rebar more expensive than TMT steel?",
    a: "Per-kg pricing is typically higher than TMT steel, but GFRP's lower weight (about 80% lighter) reduces transport and handling cost, and eliminating corrosion removes a major long-term maintenance and repair cost that steel-reinforced structures carry over their service life.",
  },
];

export default async function ComparePage() {
  const page = await getPage("home");
  const b = blocksOf(page);
  const cmp = b["gfrp-vs-tmt"] ?? {};
  const sections = cmp.comparisonSections ?? [];

  const rebarx = sections.find((s: any) => s.sectionTitle === "gfrp") ?? sections[0];
  const tmt = sections.find((s: any) => s.sectionTitle === "tmt") ?? sections[1];
  const aSpecs = toSpecs(rebarx?.properties?.[0]?.property);
  const bSpecs = toSpecs(tmt?.properties?.[0]?.property);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // A live-data table check: comparing named specs is a real answer-engine
  // structure only if there are matched rows to show. If the CMS section
  // is ever emptied out, fall back to the FAQ-only content rather than
  // rendering a table with nothing in it.
  const hasSpecs = aSpecs.length > 0 && bSpecs.length > 0;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>GFRP vs TMT steel</Eyebrow>
            <h1>GFRP Rebar vs TMT Steel Rebar</h1>
            <p>
              GFRP rebar has roughly 2x the tensile strength of TMT steel by
              weight, is about 80% lighter, and does not corrode — no rust
              staining, no chloride-driven spalling, no theft value for
              scrap. TMT steel still has a higher modulus of elasticity and
              remains the more conventionally specified option for
              deflection-sensitive designs. Below is the full spec-by-spec
              comparison.
            </p>
          </div>
          <div className="rx-cta__row" style={{ marginTop: "1.5rem" }}>
            <Btn href="/contact" variant="brass">
              Talk to an engineer
            </Btn>
            <Btn href="/calculator" variant="ghost">
              Estimate your rebar needs
            </Btn>
          </div>
        </div>
      </section>

      {hasSpecs ? (
        <section className="rx-section">
          <div className="rx-wrap">
            <ComparisonTable sections={sections} />
          </div>
        </section>
      ) : null}

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>Frequently asked questions</h2>
          </div>
          <div className="rx-resources__standards">
            {FAQS.map((f) => (
              <div key={f.q} className="rx-resources__standard">
                <b>{f.q}</b>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rx-section rx-cta rx-on-dark">
        <div className="rx-wrap">
          <p className="rx-eyebrow">RebarX India</p>
          <h2>Still deciding between GFRP and TMT steel for your project?</h2>
          <div className="rx-cta__row">
            <Btn href="/contact" variant="brass">
              Talk to an engineer
            </Btn>
            <Btn href="/resources" variant="ghost">
              See compliance standards
            </Btn>
          </div>
        </div>
      </section>
    </main>
  );
}
