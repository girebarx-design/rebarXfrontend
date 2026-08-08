import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Btn } from "@/components/rx/ui";
import { WhatsAppButton } from "@/components/rx/WhatsApp";

const PHONE = "+91 95300 13034";
const PHONE_HREF = "+919530013034";
const ADDRESS =
  "Plot Number 8B, 8C, Industrial Area - Sector 3, Pithampur, Madhya Pradesh";

export const metadata: Metadata = {
  title: "GFRP Rebar Manufacturer in Madhya Pradesh — Indore, Pithampur | RebarX",
  description:
    "RebarX manufactures GFRP rebar directly from our factory in Pithampur, Madhya Pradesh — 20 minutes from Indore. Direct factory pricing, faster dispatch across MP, no long-haul freight.",
  alternates: { canonical: "https://www.rebarx.in/gfrp-rebar-manufacturer-madhya-pradesh" },
  openGraph: {
    title: "GFRP Rebar Manufacturer in Madhya Pradesh | RebarX",
    description:
      "Manufactured in Pithampur, Madhya Pradesh — near Indore. Direct factory pricing and faster dispatch across MP.",
    url: "https://www.rebarx.in/gfrp-rebar-manufacturer-madhya-pradesh",
  },
};

const AREAS = [
  "Indore",
  "Pithampur",
  "Dewas",
  "Ujjain",
  "Bhopal",
  "Dhar",
  "Mhow",
  "Khargone",
];

const FAQS = [
  {
    q: "Does RebarX manufacture GFRP rebar in Madhya Pradesh, or just sell it there?",
    a: "We manufacture it directly — our factory is in Pithampur, Madhya Pradesh, about 20 minutes from Indore. We're not reselling stock shipped in from another state.",
  },
  {
    q: "How fast can GFRP rebar be delivered around Indore and Madhya Pradesh?",
    a: "Because the factory is local, dispatch to Indore, Pithampur, Dewas and Ujjain is typically same-day to next-day, without the multi-day freight lead time of ordering from an out-of-state manufacturer.",
  },
  {
    q: "Can I visit the RebarX factory before placing an order?",
    a: "Yes — the factory is in Pithampur's Industrial Area, Sector 3. Contact us to arrange a visit or a technical discussion with our engineering team in person.",
  },
  {
    q: "Does RebarX deliver outside Madhya Pradesh too?",
    a: "Yes, we deliver pan-India and export — Madhya Pradesh is simply where we manufacture, so customers here get the shortest lead times and lowest freight cost.",
  },
];

export default function MadhyaPradeshPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "RebarX",
    legalName: "Credific Ventures Private Limited",
    url: "https://www.rebarx.in/gfrp-rebar-manufacturer-madhya-pradesh",
    telephone: PHONE_HREF,
    email: "hello@rebarx.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot Number 8B, 8C, Industrial Area - Sector 3",
      addressLocality: "Pithampur",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    areaServed: AREAS.map((a) => ({ "@type": "City", name: a })),
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
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

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

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>Madhya Pradesh</Eyebrow>
            <h1>GFRP Rebar Manufacturer in Madhya Pradesh</h1>
            <p>
              RebarX is manufactured at our own factory in Pithampur, Madhya
              Pradesh — about 20 minutes from Indore. If you&rsquo;re
              building in or around MP, that means a local factory relationship,
              not a reseller shipping stock in from another state.
            </p>
          </div>
          <div className="rx-cta__row" style={{ marginTop: "1.5rem" }}>
            <Btn href="/contact" variant="brass">
              Talk to our Pithampur team
            </Btn>
            <WhatsAppButton message="Hi RebarX, I'm looking for GFRP rebar in Madhya Pradesh.">
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>Why a local manufacturer matters</h2>
          </div>
          <div className="rx-resources__standards">
            <div className="rx-resources__standard">
              <b>Faster dispatch</b>
              <span className="rx-resources__standard-body">Local factory</span>
              <p>
                Orders for Indore, Pithampur, Dewas and Ujjain typically move
                same-day to next-day — no multi-day interstate freight
                between order and dispatch.
              </p>
            </div>
            <div className="rx-resources__standard">
              <b>No middleman markup</b>
              <span className="rx-resources__standard-body">Direct factory pricing</span>
              <p>
                You&rsquo;re buying from the manufacturer, not a stockist or
                reseller adding a margin on top of freight from another state.
              </p>
            </div>
            <div className="rx-resources__standard">
              <b>Engineering support in person</b>
              <span className="rx-resources__standard-body">Factory visits welcome</span>
              <p>
                Visit the Pithampur facility, see the manufacturing process,
                and talk sizing and specification directly with our
                engineering team.
              </p>
            </div>
            <div className="rx-resources__standard">
              <b>Same product, same standards</b>
              <span className="rx-resources__standard-body">IS 18256 compliant</span>
              <p>
                Local doesn&rsquo;t mean a different product — every bar is
                the same epoxy-based, IS 18256-tested GFRP rebar we ship
                pan-India.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rx-section rx-dl">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>Areas we serve from Pithampur</h2>
            <p>
              Pan-India delivery and export, with the shortest lead times
              closest to the factory.
            </p>
          </div>
          <div className="rx-resources__standards">
            {AREAS.map((area) => (
              <div key={area} className="rx-resources__standard">
                <b>{area}</b>
              </div>
            ))}
          </div>
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
          <p className="rx-eyebrow">RebarX Madhya Pradesh</p>
          <h2>Building in Indore or anywhere in MP? Let&rsquo;s talk sizing.</h2>
          <div className="rx-cta__row">
            <Btn href="/contact" variant="brass">
              Contact the Pithampur team
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
