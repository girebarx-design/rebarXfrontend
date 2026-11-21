import type { Metadata } from "next";
import Breadcrumbs from "@/components/rx/Breadcrumbs";
import { Eyebrow } from "@/components/rx/ui";

export const metadata: Metadata = {
  title: "Terms & Conditions | RebarX — Credific Ventures",
  description:
    "Terms of Service and commercial supply terms for RebarX GFRP rebars manufactured by Credific Ventures Private Limited.",
  alternates: { canonical: "https://www.rebarx.in/terms" },
  openGraph: {
    title: "Terms & Conditions | RebarX",
    description: "Terms and conditions for RebarX GFRP rebar supply and website use.",
    url: "https://www.rebarx.in/terms",
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions — RebarX",
    url: "https://www.rebarx.in/terms",
    publisher: {
      "@type": "Organization",
      name: "RebarX",
      legalName: "Credific Ventures Private Limited",
      url: "https://www.rebarx.in/",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]} />

        <section className="rx-section">
          <div className="rx-wrap" style={{ maxWidth: "820px" }}>
            <div className="rx-head" style={{ textAlign: "left", marginBottom: "2.5rem" }}>
              <Eyebrow>Legal & Compliance</Eyebrow>
              <h1 style={{ fontSize: "2.25rem", fontWeight: 700, margin: "0.5rem 0 1rem" }}>
                Terms &amp; Conditions
              </h1>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                Effective Date: November 2026 · Credific Ventures Private Limited
              </p>
            </div>

            <div className="blog-content" style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
              <h2>1. Commercial Identity &amp; Manufacturing Scope</h2>
              <p>
                These terms govern the use of the RebarX website and the commercial procurement of Glass Fiber Reinforced Polymer (GFRP) reinforcement products manufactured by <strong>Credific Ventures Private Limited</strong> at its plant located in Sector 3, Pithampur, Madhya Pradesh, India.
              </p>

              <h2>2. Material Specifications &amp; Conformance</h2>
              <p>
                All structural GFRP rebar dispatched by Credific Ventures is manufactured strictly in conformance with the Bureau of Indian Standards specification <strong>IS 18256:2023</strong> (and tested per <strong>IS 18255:2023</strong>):
              </p>
              <ul>
                <li><strong>Matrix Standard:</strong> 100% thermosetting structural epoxy resin declared per production lot. No polyester resin is blended into structural reinforcement bars.</li>
                <li><strong>Reinforcement:</strong> Continuous high-strength ECR boron-free glass rovings with minimum fibre mass content ≥75%.</li>
                <li><strong>Guaranteed Tensile Capacity:</strong> Minimum guaranteed ultimate tensile force meets or exceeds IS 18256 Table 1 across all diameters (4 mm to 20 mm).</li>
                <li><strong>Batch Documentation:</strong> Every dispatch consignment is accompanied by an IS 18256 factory test certificate specifying diameter, tensile load, resin system, and lot number.</li>
              </ul>

              <h2>3. Engineering Disclaimer &amp; Role of Record</h2>
              <p>
                <strong>Credific Ventures Private Limited is the material manufacturer, not the Engineer of Record (EOR).</strong>
              </p>
              <p>
                Quantity estimations, preliminary structural sizing suggestions provided by our online Slab Calculator, technical datasheets, and reference comparison tables are intended solely for preliminary feasibility and material budgeting. Final bar schedules, development lap lengths, and reinforcement layouts must be verified and approved by the project&apos;s licensed Structural Engineer or Consultant in accordance with applicable design codes (IS 18256 / ACI 440.11-22).
              </p>

              <h2>4. Site Handling &amp; Material Limitations</h2>
              <p>
                Purchasers and site contractors must adhere to standard composite handling discipline:
              </p>
              <ul>
                <li><strong>No Field Bending:</strong> GFRP rebars utilize a cured thermosetting polymer matrix and cannot be bent on site by heating or cold-bending. All bent shapes, stirrups, and links must be factory pre-formed.</li>
                <li><strong>Cutting &amp; Tying:</strong> Bars must be cut using high-speed abrasive cutting discs or fine diamond masonry blades. Tie with plastic zip-ties, plastic-coated tie wire, or dedicated clips. <em>Do not weld GFRP.</em></li>
                <li><strong>Unloading &amp; Storage:</strong> Lift bundles using fabric slings; do not use steel crane chains directly on bare bars. Store flat on timber dunnage to prevent concentrated point loading.</li>
              </ul>

              <h2>5. Quotations, Pricing &amp; Payment Terms</h2>
              <p>
                Written quotations issued by Credific Ventures specify factory-gate pricing or landed freight terms with a defined validity period. Because raw materials (ECR glass roving and epoxy resins) are subject to commodity indexing, quotations expire after their stated date unless confirmed in writing.
              </p>
              <p>
                Standard commercial supply terms require confirmed payment before dispatch, unless alternative written credit terms are formally approved by Credific Ventures management.
              </p>

              <h2>6. Intellectual Property</h2>
              <p>
                The trademark &quot;RebarX&quot;, proprietary decoiler patents, logos, technical datasheets, and website content are the intellectual property of Credific Ventures Private Limited. Unauthorized reproduction or misleading trade representation is prohibited.
              </p>

              <h2>7. Governing Law &amp; Jurisdiction</h2>
              <p>
                All commercial agreements, supply contracts, and disputes arising out of the purchase or use of RebarX products are governed by the laws of India, subject to the exclusive jurisdiction of the competent courts in Dhar / Indore, Madhya Pradesh.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
