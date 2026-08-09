"use client";

import Link from "next/link";
import { ORG_SAME_AS } from "@/lib/cms";
import { Eyebrow, Btn } from "@/components/rx/ui";
import { WhatsAppButton } from "@/components/rx/WhatsApp";
import Breadcrumbs from "@/components/rx/Breadcrumbs";
import { useT } from "@/lib/i18n/useT";
import { dict } from "@/lib/i18n/dict";
import { useLanguage } from "@/contexts/LanguageContext";
import { GEO_PAGES_HI } from "@/lib/i18n/geo-pages-hi";
import {
  GEO_PAGES,
  SHARED_FAQS,
  PHONE,
  PHONE_HREF,
  ADDRESS,
  type GeoPageData,
} from "@/lib/geo-pages";

export default function GeoLandingPage({ data }: { data: GeoPageData }) {
  const t = useT();
  const { lang } = useLanguage();
  const hi = GEO_PAGES_HI[data.slug];
  // English data is always the source of truth for facts (cities, phone,
  // address, slugs) — hi only supplies translated prose. If a state is
  // ever added to lib/geo-pages.ts without a matching entry here, this
  // falls back to English rather than crashing.
  const view = lang === "hi" && hi ? hi : data;

  const faqs = [
    {
      q: dict.geo.sharedFaqManufacture.q[lang] ?? dict.geo.sharedFaqManufacture.q.en,
      a: dict.geo.sharedFaqManufacture.a[lang] ?? dict.geo.sharedFaqManufacture.a.en,
    },
    ...view.faqs,
    {
      q: t("geo.pincodeFaqQ").replace("{state}", view.eyebrow),
      a: t("geo.pincodeFaqA").replace("{state}", view.eyebrow),
    },
    {
      q: dict.geo.sharedFaqStandard.q[lang] ?? dict.geo.sharedFaqStandard.q.en,
      a: dict.geo.sharedFaqStandard.a[lang] ?? dict.geo.sharedFaqStandard.a.en,
    },
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

  // JSON-LD is server-rendered per request and always reflects the
  // English content — the client-side language toggle can't retroactively
  // change what a crawler already fetched, and English is what these
  // schema queries target anyway.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: dict.geo.sharedFaqManufacture.q.en,
        acceptedAnswer: { "@type": "Answer", text: dict.geo.sharedFaqManufacture.a.en },
      },
      ...data.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
      {
        "@type": "Question",
        name: dict.geo.pincodeFaqQ.en.replace("{state}", data.stateName),
        acceptedAnswer: {
          "@type": "Answer",
          text: dict.geo.pincodeFaqA.en.replace("{state}", data.stateName),
        },
      },
      {
        "@type": "Question",
        name: dict.geo.sharedFaqStandard.q.en,
        acceptedAnswer: { "@type": "Answer", text: dict.geo.sharedFaqStandard.a.en },
      },
    ],
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
        items={[{ label: t("common.home"), href: "/" }, { label: view.eyebrow }]}
      />

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>{view.eyebrow}</Eyebrow>
            <h1>{view.h1}</h1>
            <p>{view.intro}</p>
          </div>
          <div className="rx-cta__row" style={{ marginTop: "1.5rem" }}>
            <Btn href="/contact" variant="brass">
              {view.ctaLabel}
            </Btn>
            <WhatsAppButton
              message={t("geo.whatsappMessage").replace("{state}", view.eyebrow)}
            >
              {t("common.chatWhatsApp")}
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>{view.whyHeading}</h2>
          </div>
          <div className="rx-resources__standards">
            {view.whyUs.map((w, i) => (
              <div key={data.whyUs[i]?.title ?? i} className="rx-resources__standard">
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
            <h2>{t("geo.areasWeServe")}</h2>
            <p>{view.areasIntro}</p>
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
            <h2>{t("geo.factoryOffice")}</h2>
          </div>
          <p>{ADDRESS}</p>
          <p>
            {t("geo.phone")}{" "}
            <a href={`tel:${PHONE_HREF}`} style={{ color: "var(--brass)" }}>
              {PHONE}
            </a>
          </p>
          <p>
            <Link href="/contact" style={{ color: "var(--brass)" }}>
              {t("geo.getDirections")}
            </Link>
          </p>
        </div>
      </section>

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>{t("geo.faqHeading")}</h2>
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
            <h2>{t("geo.alsoServing")}</h2>
          </div>
          <ul className="rx-areas">
            {otherStates.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/gfrp-rebar-manufacturer-${g.slug}`}
                  className="rx-areas__chip"
                  style={{ textDecoration: "none" }}
                >
                  {lang === "hi" ? GEO_PAGES_HI[g.slug]?.eyebrow ?? g.stateName : g.stateName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rx-section rx-cta rx-on-dark">
        <div className="rx-wrap">
          <p className="rx-eyebrow">RebarX {view.eyebrow}</p>
          <h2>{view.ctaHeading}</h2>
          <div className="rx-cta__row">
            <Btn href="/contact" variant="brass">
              {t("geo.contactUs")}
            </Btn>
            <Btn href="/calculator" variant="ghost">
              {t("common.estimateNeeds")}
            </Btn>
          </div>
        </div>
      </section>
    </main>
  );
}
