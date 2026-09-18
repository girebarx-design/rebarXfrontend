import Link from "next/link";
import { ORG_SAME_AS } from "@/lib/cms";
import { PHONE, PHONE_HREF, ADDRESS } from "@/lib/geo-pages";
import { Eyebrow, Btn } from "@/components/rx/ui";
import { WhatsAppButton } from "@/components/rx/WhatsApp";
import Breadcrumbs from "@/components/rx/Breadcrumbs";

type City = {
  city: string; state: string; slug: string; tier?: string;
  intro: string; localContext: string; logistics: string;
  projects?: { name: string; note: string }[];
  applications?: { title: string; body: string }[];
  faqs?: { question: string; answer: string }[];
};

export default function CityLandingPage({ city, others }: { city: City; others: City[] }) {
  const url = `https://www.rebarx.in/gfrp-rebar-in-${city.slug}`;

  // Same #org @id as every other page, so these stay facets of one business
  // rather than dozens of disconnected LocalBusiness entities — which is what
  // makes a city-page set read as a real service area instead of doorways.
  // areaServed is the city; the address stays Pithampur, because that is
  // where the factory actually is.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
        areaServed: { "@type": "City", name: city.city, containedInPlace: { "@type": "State", name: city.state } },
        makesOffer: {
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: "GFRP Rebar", material: "Glass Fibre Reinforced Polymer" },
        },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: `GFRP Rebar in ${city.city}`,
        about: { "@id": "https://www.rebarx.in/#org" },
      },
      ...(city.faqs?.length
        ? [{
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: city.faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }]
        : []),
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: city.city }]} />

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>{city.city}, {city.state}</Eyebrow>
            <h1>GFRP Rebar in {city.city}</h1>
            <p>{city.intro}</p>
          </div>
          <div className="rx-cta__row" style={{ marginTop: "1.5rem" }}>
            <Btn href="/contact" variant="brass">Talk to an engineer</Btn>
            <WhatsAppButton message={`Hi RebarX, I'm looking for GFRP rebar in ${city.city}.`}>
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head"><h2>Why GFRP matters in {city.city}</h2></div>
          <p>{city.localContext}</p>
        </div>
      </section>

      {city.projects?.length ? (
        <section className="rx-section rx-dl">
          <div className="rx-wrap">
            <div className="rx-head">
              <h2>Infrastructure around {city.city}</h2>
              <p>Project types in and near the city where corrosion-free reinforcement is directly relevant.</p>
            </div>
            <div className="rx-resources__standards">
              {city.projects.map((p) => (
                <div key={p.name} className="rx-resources__standard">
                  <b>{p.name}</b>
                  <p>{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {city.applications?.length ? (
        <section className="rx-section">
          <div className="rx-wrap">
            <div className="rx-head"><h2>Where it gets used</h2></div>
            <div className="rx-resources__standards">
              {city.applications.map((a) => (
                <div key={a.title} className="rx-resources__standard">
                  <b>{a.title}</b>
                  <p>{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="rx-section rx-dl">
        <div className="rx-wrap">
          <div className="rx-head"><h2>Getting it to {city.city}</h2></div>
          <p>{city.logistics}</p>
          <p style={{ marginTop: "1rem" }}>{ADDRESS}</p>
          <p>
            Phone:{" "}
            <a href={`tel:${PHONE_HREF}`} style={{ color: "var(--brass)" }}>{PHONE}</a>
          </p>
        </div>
      </section>

      {city.faqs?.length ? (
        <section className="rx-section">
          <div className="rx-wrap">
            <div className="rx-head"><h2>Questions from {city.city} buyers</h2></div>
            <div className="rx-resources__standards">
              {city.faqs.map((f) => (
                <div key={f.question} className="rx-resources__standard">
                  <b>{f.question}</b>
                  <p>{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {others.length ? (
        <section className="rx-section">
          <div className="rx-wrap">
            <div className="rx-head"><h2>We also deliver to</h2></div>
            <ul className="rx-areas">
              {others.map((c) => (
                <li key={c.slug}>
                  <Link href={`/gfrp-rebar-in-${c.slug}`} className="rx-areas__chip" style={{ textDecoration: "none" }}>
                    {c.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="rx-section rx-cta rx-on-dark">
        <div className="rx-wrap">
          <p className="rx-eyebrow">RebarX {city.city}</p>
          <h2>Building in {city.city}? Let&rsquo;s talk sizing and lead times.</h2>
          <div className="rx-cta__row">
            <Btn href="/contact" variant="brass">Contact us</Btn>
            <Btn href="/calculator" variant="ghost">Estimate your rebar needs</Btn>
          </div>
        </div>
      </section>
    </main>
  );
}
