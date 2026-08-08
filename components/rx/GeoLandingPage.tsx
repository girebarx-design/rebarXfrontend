import Link from "next/link";
import { ORG_SAME_AS } from "@/lib/cms";
import { Eyebrow, Btn } from "@/components/rx/ui";
import { WhatsAppButton } from "@/components/rx/WhatsApp";
import Breadcrumbs from "@/components/rx/Breadcrumbs";
import {
  GEO_PAGES,
  SHARED_FAQS,
  PHONE,
  PHONE_HREF,
  ADDRESS,
  type GeoPageData,
} from "@/lib/geo-pages";

export default function GeoLandingPage({ data }: { data: GeoPageData }) {
  const url = `https://www.rebarx.in/gfrp-rebar-manufacturer-${data.slug}`;
  const faqs = [
    {
      q: `Does RebarX manufacture GFRP rebar, or resell stock from elsewhere?`,
      a: SHARED_FAQS[0].a,
    },
    ...data.faqs,
    {
      q: `Do you deliver to every pincode in ${data.stateName}, or only major cities?`,
      a: `Every pincode in the state, not just the major cities listed on this page. Those cities are our main dispatch hubs — smaller towns and rural project sites across ${data.stateName} are served too.`,
    },
    SHARED_FAQS[1],
  ];

  // Same @id as the homepage's Organization entity and every other page's
  // — one canonical RebarX entity across the site. Each state page adds
  // its own areaServed rather than declaring a second, disconnected
  // business.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": "https://www.rebarx.in/#org",
    name: "RebarX",
    legalName: "Credific Ventures Private Limited",
    url: "https://www.rebarx.in/",
    telephone: PHONE_HREF,
    email: "hello@rebarx.in",
    sameAs: ORG_SAME_AS,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot Number 8B, 8C, Industrial Area - Sector 3",
      addressLocality: "Pithampur",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    // A State-level entry is the structurally correct way to say "we
    // deliver to every pincode in this state" — schema.org has no
    // pincode-list property, and enumerating thousands of PIN codes would
    // be unverifiable and read as content-stuffing. City entries stay for
    // on-page/local-search specificity.
    areaServed: [
      { "@type": "State", name: data.stateName },
      ...data.cities.map((a) => ({ "@type": "City", name: a })),
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "GFRP Rebar",
        material: "Glass Fibre Reinforced Polymer",
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const otherStates = GEO_PAGES.filter((g) => g.slug !== data.slug);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: data.stateName }]}
      />

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h1>{data.h1}</h1>
            <p>{data.intro}</p>
          </div>
          <div className="rx-cta__row" style={{ marginTop: "1.5rem" }}>
            <Btn href="/contact" variant="brass">
              {data.ctaLabel}
            </Btn>
            <WhatsAppButton
              message={`Hi RebarX, I'm looking for GFRP rebar in ${data.stateName}.`}
            >
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>{data.whyHeading}</h2>
          </div>
          <div className="rx-resources__standards">
            {data.whyUs.map((w) => (
              <div key={w.title} className="rx-resources__standard">
                <b>{w.title}</b>
                <span className="rx-resources__standard-body">{w.subtitle}</span>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rx-section rx-dl">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>Areas we serve</h2>
            <p>{data.areasIntro}</p>
          </div>
          <ul className="rx-areas">
            {data.cities.map((area) => (
              <li key={area} className="rx-areas__chip">
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>Factory & office</h2>
          </div>
          <p>{ADDRESS}</p>
          <p>
            Phone:{" "}
            <a href={`tel:${PHONE_HREF}`} style={{ color: "var(--brass)" }}>
              {PHONE}
            </a>
          </p>
          <p>
            <Link href="/contact" style={{ color: "var(--brass)" }}>
              Get directions and full contact details →
            </Link>
          </p>
        </div>
      </section>

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>Frequently asked questions</h2>
          </div>
          <div className="rx-resources__standards">
            {faqs.map((f) => (
              <div key={f.q} className="rx-resources__standard">
                <b>{f.q}</b>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>Also serving</h2>
          </div>
          <ul className="rx-areas">
            {otherStates.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/gfrp-rebar-manufacturer-${g.slug}`}
                  className="rx-areas__chip"
                  style={{ textDecoration: "none" }}
                >
                  {g.stateName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rx-section rx-cta rx-on-dark">
        <div className="rx-wrap">
          <p className="rx-eyebrow">RebarX {data.stateName}</p>
          <h2>{data.ctaHeading}</h2>
          <div className="rx-cta__row">
            <Btn href="/contact" variant="brass">
              Contact us
            </Btn>
            <Btn href="/calculator" variant="ghost">
              Estimate your rebar needs
            </Btn>
          </div>
        </div>
      </section>
    </main>
  );
}
