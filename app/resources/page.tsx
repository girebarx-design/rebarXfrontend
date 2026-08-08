import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Btn } from "@/components/rx/ui";
import { COMPANY_DOCS, REFERENCE_STUDIES, COMPLIANCE_STANDARDS } from "@/lib/resources";
import Breadcrumbs from "@/components/rx/Breadcrumbs";

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

function DownloadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v11m0 0 4-4m-4 4-4-4M5 20h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>Resources</Eyebrow>
            <h1>Technical Resource Center</h1>
            <p>
              Everything a consultant, structural engineer, or procurement
              team needs to evaluate GFRP rebar — company documents, the
              research we cite, and the standards every RebarX bar is
              manufactured and tested to.
            </p>
          </div>
        </div>
      </section>

      <section className="rx-section rx-dl">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>Company Documents</h2>
          </div>
          <div className="rx-dl__grid">
            {COMPANY_DOCS.map((d) => (
              <a key={d.href} className="rx-dl__card" href={d.href} download>
                <span className="rx-dl__ico" aria-hidden="true">
                  <DownloadIcon />
                </span>
                <span className="rx-dl__body">
                  <b>{d.label}</b>
                  <span>{d.blurb}</span>
                  <small>{d.meta}</small>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="rx-section rx-dl">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>Referenced Research</h2>
            <p>
              Independent, peer-reviewed studies we cite in our own technical
              writing — not marketing material, the actual source documents.
            </p>
          </div>
          <div className="rx-dl__grid">
            {REFERENCE_STUDIES.map((d) => (
              <a key={d.href} className="rx-dl__card" href={d.href} download>
                <span className="rx-dl__ico" aria-hidden="true">
                  <DownloadIcon />
                </span>
                <span className="rx-dl__body">
                  <b>{d.label}</b>
                  <span>{d.blurb}</span>
                  <small>{d.meta}</small>
                </span>
              </a>
            ))}
          </div>
          {REFERENCE_STUDIES.map((d) =>
            d.articleHref ? (
              <p key={d.articleHref} className="rx-resources__readmore">
                Read our analysis:{" "}
                <Link href={d.articleHref}>
                  Does GFRP Rebar Degrade Over Time? What 20 Years of Real
                  Bridges Show →
                </Link>
              </p>
            ) : null
          )}
        </div>
      </section>

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>Compliance Standards</h2>
            <p>Every RebarX bar is manufactured and tested against these.</p>
          </div>
          <div className="rx-resources__standards">
            {COMPLIANCE_STANDARDS.map((s) => (
              <div key={s.code} className="rx-resources__standard">
                <b>{s.code}</b>
                <span className="rx-resources__standard-body">{s.body}</span>
                <p>{s.covers}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rx-section rx-cta rx-on-dark">
        <div className="rx-wrap">
          <p className="rx-eyebrow">RebarX India</p>
          <h2>Need a specific test certificate or compliance document?</h2>
          <div className="rx-cta__row">
            <Btn href="/contact" variant="brass">
              Talk to an engineer
            </Btn>
          </div>
        </div>
      </section>
    </main>
  );
}
