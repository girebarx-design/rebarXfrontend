import type { Metadata } from "next";
import Link from "next/link";
import { getPage, blocksOf, slugify, getFooter, cldOptimize } from "@/lib/cms";
import Faq from "@/components/rx/Faq";
import ComparisonTable from "@/components/rx/ComparisonTable";
import SlabCalculator from "@/components/SlabCalculator";
import { Btn, Eyebrow, Star } from "@/components/rx/ui";
import { DOWNLOADS } from "@/lib/downloads";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "GFRP Rebar Manufacturer in India | RebarX — Rustfree",
  description:
    "RebarX manufactures GFRP (glass fibre reinforced polymer) rebar in India — 2x the tensile strength of steel, 80% lighter, and 100% corrosion-proof. Used in slabs, bridges, marine and water infrastructure. Pan-India delivery and export.",
  keywords: [
    "GFRP rebar",
    "GFRP rebar manufacturer India",
    "FRP rebar",
    "glass fibre reinforced polymer rebar",
    "corrosion free rebar",
    "TMT steel alternative",
    "composite rebar India",
  ],
  alternates: { canonical: "https://www.rebarx.in/" },
  openGraph: {
    type: "website",
    url: "https://www.rebarx.in/",
    siteName: "RebarX",
    title: "GFRP Rebar Manufacturer in India | RebarX",
    description:
      "Rust-free, 2x stronger GFRP rebar for slabs, bridges, marine and water infrastructure. Manufactured in India with European technology.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GFRP Rebar Manufacturer in India | RebarX",
    description:
      "Rust-free, 2x stronger GFRP rebar. Manufactured in India with European technology.",
  },
};

/* Splits "Stronger. Lighter. Rustfree." so the last word can be accented. */
function Headline({ text }: { text: string }) {
  const parts = text.trim().split(/\s+/);
  const last = parts.pop();
  return (
    <h1>
      {parts.join(" ")} <em>{last}</em>
    </h1>
  );
}

const STATS = [
  { n: "2×", l: "Tensile strength of TMT steel" },
  { n: "80%", l: "Lighter to handle and transport" },
  { n: "100yr", l: "Design service life" },
  { n: "0", l: "Corrosion, rust stains or theft value" },
];

export default async function Home() {
  const [page, footerData] = await Promise.all([getPage("home"), getFooter()]);
  const b = blocksOf(page);

  const hero = b.hero ?? {};
  const about = b.about ?? {};
  const carousel = b.carousel ?? {};
  const cmp = b["gfrp-vs-tmt"] ?? {};
  const prod = b["product-section"] ?? {};
  const vision = b["vision-section"] ?? {};
  const blogs = b.blogSection ?? {};
  const faq = b["faq-block"] ?? {};
  const cta = b["cta-section"] ?? {};
  const marquee = b.marquee ?? {};


  const faqItems = (faq.faqs ?? []) as { question: string; answer: string }[];

  const productImage =
    prod.products?.[0]?.image?.cloudinaryUrl ?? hero.posterImage?.cloudinaryUrl;

  const sameAs = ((footerData?.socialMedia ?? []) as { url?: string }[])
    .map((s) => s.url)
    .filter((url): url is string => Boolean(url));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.rebarx.in/#org",
        name: "RebarX",
        legalName: "Credific Ventures Private Limited",
        url: "https://www.rebarx.in/",
        description:
          "Manufacturer of GFRP (glass fibre reinforced polymer) rebar in India.",
        telephone: "+91-9530013034",
        email: "hello@rebarx.in",
        ...(sameAs.length ? { sameAs } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: "Plot Number 8B, 8C, Industrial Area - Sector 3",
          addressLocality: "Pithampur",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.rebarx.in/#site",
        url: "https://www.rebarx.in/",
        name: "RebarX",
        publisher: { "@id": "https://www.rebarx.in/#org" },
      },
      {
        "@type": "Product",
        name: "RebarX GFRP Rebar",
        brand: { "@id": "https://www.rebarx.in/#org" },
        material: "Glass Fibre Reinforced Polymer",
        description:
          "Corrosion-proof GFRP reinforcement bar with up to 2x the tensile strength of TMT steel at 80% lower weight. Available in 4–24mm diameters.",
        ...(productImage ? { image: [productImage] } : {}),
      },
      ...(faqItems.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqItems.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* ---------------- HERO ---------------- */}
        <section className="rx-hero rx-on-dark">
          <div className="rx-hero__media">
            {hero.backgroundVideoURL ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={hero.posterImage?.cloudinaryUrl}
              >
                <source src={hero.backgroundVideoURL} type="video/mp4" />
              </video>
            ) : hero.posterImage?.cloudinaryUrl ? (
              <img
                src={cldOptimize(hero.posterImage.cloudinaryUrl)}
                alt=""
                fetchPriority="high"
              />
            ) : null}
          </div>
          <div className="rx-hero__scrim" />

          <div className="rx-wrap">
            <div className="rx-hero__in">
              {hero.label ? <Eyebrow>{hero.label}</Eyebrow> : null}
              <Headline text={hero.headline ?? "Stronger. Lighter. Rustfree."} />
              {hero.subtext ? <p className="rx-hero__sub">{hero.subtext}</p> : null}
              <div className="rx-hero__cta">
                <Btn href={hero.button?.link ?? "#calculator"} variant="brass">
                  {hero.button?.text ?? "Find Savings"}
                </Btn>
                <Btn href="/contact" variant="ghost">
                  Talk to an engineer
                </Btn>
              </div>
              {hero.rating?.text ? (
                <p className="rx-hero__note">
                  <Star />
                  {hero.rating.text}
                </p>
              ) : null}
            </div>
          </div>

          <div className="rx-stats">
            {STATS.map((s) => (
              <div className="rx-stat" key={s.l}>
                <div className="rx-stat__n">{s.n}</div>
                <div className="rx-stat__l">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- MARQUEE ---------------- */}
        {marquee.items?.length ? (
          <div className="rx-marquee" aria-hidden="true">
            <div className="rx-marquee__track">
              {[...marquee.items, ...marquee.items].map((m: any, i: number) => (
                <span className="rx-marquee__item" key={i}>
                  {m.text}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* ---------------- ABOUT ---------------- */}
        <section className="rx-section rx-about" id="about">
          <div className="rx-wrap">
            <div className="rx-about__grid">
              <div>
                {about.sectionName ? <Eyebrow>{about.sectionName}</Eyebrow> : null}
                <h2 className="rx-about__h">{about.sectionTitle}</h2>
                {about.sectionDescription ? (
                  <p className="rx-about__p">{about.sectionDescription}</p>
                ) : null}
                <p className="rx-resources__readmore">
                  <Link href="/gfrp-rebar-manufacturer-madhya-pradesh">
                    Manufactured in Madhya Pradesh, near Indore →
                  </Link>
                </p>

                {about.attributes?.length ? (
                  <div className="rx-attrs">
                    {about.attributes.map((a: any, i: number) => (
                      <div className="rx-attr" key={i}>
                        {a.image?.cloudinaryUrl ? (
                          <img
                            src={cldOptimize(a.image.cloudinaryUrl)}
                            alt=""
                            loading="lazy"
                          />
                        ) : null}
                        {a.title}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="rx-about__media">
                {about.finalImage?.cloudinaryUrl ? (
                  <img
                    src={cldOptimize(about.finalImage.cloudinaryUrl)}
                    alt={
                      about.finalImage.alt ||
                      "RebarX GFRP rebar manufactured in India"
                    }
                    loading="lazy"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- APPLICATIONS ---------------- */}
        <section className="rx-section rx-apps rx-on-dark">
          <div className="rx-wrap">
            <div className="rx-head">
              <Eyebrow>Where RebarX is used</Eyebrow>
              <h2>{carousel.sectionTitle ?? "Applications"}</h2>
              <p>
                Anywhere corrosion, weight or electromagnetic interference
                limits what steel can do — from slabs and retaining walls to
                marine, water and power infrastructure.
              </p>
            </div>
            <div className="rx-apps__grid">
              {(carousel.cards ?? []).map((c: any, i: number) => (
                <article className="rx-app" key={i}>
                  <div className="rx-app__k">{c.smallHeading}</div>
                  <h3>{c.heading}</h3>
                  <p>{c.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- COMPARE ---------------- */}
        <section className="rx-section" id="compare">
          <div className="rx-wrap">
            <div className="rx-head">
              {cmp.subHeading ? <Eyebrow>{cmp.subHeading}</Eyebrow> : null}
              <h2>{cmp.heading ?? "RebarX vs TMT"}</h2>
            </div>

            <ComparisonTable sections={cmp.comparisonSections ?? []} />
          </div>
        </section>

        {/* ---------------- PRODUCTS ---------------- */}
        <section className="rx-section rx-prod">
          <div className="rx-wrap">
            <div className="rx-head">
              <Eyebrow>Product range</Eyebrow>
              <h2>{prod.sectionTitle ?? "Optimized solutions for strength"}</h2>
              <p>
                Straight bar and custom-formed shapes, cut to length so there
                is no wastage on site.
              </p>
            </div>
            <div className="rx-prod__grid">
              {(prod.products ?? []).map((p: any, i: number) => (
                <article className="rx-prod__card" key={i}>
                  <div className="rx-prod__img">
                    {p.image?.cloudinaryUrl ? (
                      <img
                        src={cldOptimize(p.image.cloudinaryUrl)}
                        alt={p.image.alt || p.title || "RebarX product"}
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="rx-prod__body">
                    <h3>{p.title}</h3>
                    <p>{p.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- VISION ---------------- */}
        {vision.description ? (
          <section className="rx-section rx-vision rx-on-dark">
            <div className="rx-wrap">
              <p>{vision.description}</p>
            </div>
          </section>
        ) : null}

        {/* ---------------- CALCULATOR ---------------- */}
        <SlabCalculator />

        {/* ---------------- BLOGS ---------------- */}
        {blogs.selectedBlogs?.length ? (
          <section className="rx-section">
            <div className="rx-wrap">
              <div className="rx-head">
                <Eyebrow>Insights</Eyebrow>
                <h2>{blogs.sectionTitle}</h2>
              </div>
              <div className="rx-blogs__grid">
                {blogs.selectedBlogs.map((p: any, i: number) => (
                  <Link className="rx-blog" href={`/blog/${slugify(p.slug)}`} key={p.slug ?? i}>
                    <div className="rx-blog__img">
                      {p.mainImage?.cloudinaryUrl ? (
                        <img
                          src={cldOptimize(p.mainImage.cloudinaryUrl)}
                          alt={p.mainImage.alt || p.title}
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <div className="rx-blog__body">
                      {p.tag ? <span className="rx-blog__tag">{p.tag}</span> : null}
                      <h3>{p.title}</h3>
                      <span className="rx-blog__more">Read article →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------------- FAQ ---------------- */}
        {faqItems.length ? (
          <section className="rx-section rx-prod">
            <div className="rx-wrap">
              <div className="rx-head">
                <Eyebrow>Questions</Eyebrow>
                <h2>{faq.sectionTitle ?? "Frequently asked questions"}</h2>
              </div>
              <Faq items={faqItems} />
            </div>
          </section>
        ) : null}

        {/* ---------------- DOWNLOADS ---------------- */}
        <section className="rx-section rx-dl" id="downloads">
          <div className="rx-wrap">
            <div className="rx-head">
              <Eyebrow>Resources</Eyebrow>
              <h2>Take RebarX with you</h2>
              <p>
                Everything your consultant or structural engineer needs to
                evaluate GFRP — in two documents.{" "}
                <Link href="/resources">
                  View the full Technical Resource Center →
                </Link>
              </p>
            </div>
            <div className="rx-dl__grid">
              {DOWNLOADS.map((d) => (
                <a className="rx-dl__card" href={d.href} download key={d.href}>
                  <span className="rx-dl__ico" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3v11m0 0 4-4m-4 4-4-4M5 20h14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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

        {/* ---------------- CTA ---------------- */}
        <section className="rx-section rx-cta rx-on-dark">
          <div className="rx-wrap">
            {cta.smallHeading ? <Eyebrow>{cta.smallHeading}</Eyebrow> : null}
            <h2>{cta.title}</h2>
            <div className="rx-cta__row">
              <Btn href={cta.button1?.link ?? "/contact"} variant="brass">
                {cta.button1?.label ?? "Contact us"}
              </Btn>
              <Btn href={cta.button2?.link ?? "#calculator"} variant="ghost">
                {cta.button2?.label ?? "Find out how"}
              </Btn>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

