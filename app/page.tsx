import type { Metadata } from "next";
import Link from "next/link";
import { getPage, blocksOf, slugify, getFooter, cldOptimize, ORG_SAME_AS } from "@/lib/cms";
import Faq from "@/components/rx/Faq";
import ComparisonTable from "@/components/rx/ComparisonTable";
import SlabCalculator from "@/components/SlabCalculator";
import { Btn, Eyebrow, Star } from "@/components/rx/ui";
import { DOWNLOADS } from "@/lib/downloads";

export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  title: "RebarX — GFRP Rebar Manufacturer in India | Rust-Free Composite Reinforcement",
  description:
    "RebarX manufactures GFRP (glass fibre reinforced polymer) rebar in India per IS 18256:2023. Up to 2x tensile strength of TMT steel, 4x lighter (75% less weight), and 100% corrosion-proof. Pan-India dispatch from Pithampur, MP.",
  keywords: [
    "RebarX",
    "RebarX GFRP",
    "RebarX India",
    "RebarX Sariya",
    "GFRP rebar",
    "GFRP rebar manufacturer India",
    "FRP rebar India",
    "glass fibre reinforced polymer rebar",
    "corrosion free rebar",
    "IS 18256 GFRP rebar",
    "TMT steel alternative",
    "composite rebar India",
  ],
  alternates: { canonical: "https://www.rebarx.in/" },
  openGraph: {
    type: "website",
    url: "https://www.rebarx.in/",
    siteName: "RebarX",
    title: "RebarX — GFRP Rebar Manufacturer in India",
    description:
      "Rust-free, up to 2x stronger GFRP rebar conforming to IS 18256:2023. 4x lighter than steel with 80+ years design service life.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RebarX — GFRP Rebar Manufacturer in India",
    description:
      "Rust-free, up to 2x stronger GFRP rebar. Manufactured in Pithampur, MP per IS 18256:2023.",
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
  { n: "2×", l: "Tensile strength (up to 1000 MPa per size)" },
  { n: "4×", l: "Lighter to handle & transport (75% less weight)" },
  { n: "80+yr", l: "Design service life in concrete" },
  { n: "0", l: "Corrosion, rust spalling or scrap theft risk" },
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

  // Sanitize savings claim to "Up to 30% savings on reinforcement costs"
  const heroSubtext =
    "Up to 30% savings on reinforcement costs with zero corrosion over an 80+ year design life.";

  // Sanitize marquee items to align claims
  const marqueeItems = [
    { text: "2x Tensile Strength of Steel" },
    { text: "4× Lighter (75% Weight Reduction)" },
    { text: "Zero Corrosion & Rust-Proof" },
    { text: "Up to 30% Reinforcement Savings" },
    { text: "No Scrap Theft Risk" },
    { text: "80+ Year Design Life" },
    { text: "IS 18256:2023 Compliant" },
  ];

  // Sanitize about attributes (replace "Globally Certified" with exact standard)
  const rawAttrs = (about.attributes ?? []) as any[];
  const aboutAttrs = rawAttrs.map((a) => {
    if (/globally|certified/i.test(a.title)) {
      return { ...a, title: "IS 18256 & ACI 440" };
    }
    return a;
  });

  // Sanitize products to true manufactured range (3–20mm straight, 6–16mm bents)
  const rawProducts = (prod.products ?? []) as any[];
  const sanitizedProducts = rawProducts.map((p) => {
    if (/straight|rebar/i.test(p.title) && !/bent/i.test(p.title)) {
      return {
        ...p,
        title: "RebarX Straight Rebars",
        bio: "Manufactured in 3 mm to 20 mm nominal diameters (structural sizes: 6 mm to 20 mm). Available in custom cut-to-length bundles to ensure zero site wastage.",
      };
    }
    if (/bent/i.test(p.title)) {
      return {
        ...p,
        title: "RebarX Factory Bents & Stirrups",
        bio: "Factory pre-formed stirrups, links, and L-bends in 6 mm to 16 mm diameters. Pre-cured during factory pultrusion; no field bending required.",
      };
    }
    return p;
  });

  // Sanitize FAQs
  const rawFaqs = (faq.faqs ?? []) as { question: string; answer: string }[];
  const sanitizedFaqs = rawFaqs.map((f) => {
    if (/plastic/i.test(f.question)) {
      return {
        question: "Is GFRP rebar plastic?",
        answer:
          "Not a thermoplastic. GFRP (Glass Fiber Reinforced Polymer) consists of continuous high-strength ECR glass fibers bound in a rigid, hot-cured thermosetting epoxy resin matrix. Unlike ordinary plastics, it does not melt, creep, or deform under ambient heat, and delivers guaranteed structural tensile strength exceeding standard steel.",
      };
    }
    let ans = f.answer;
    if (/80%\s*lighter/i.test(ans)) {
      ans = ans.replace(/up to 80%\s*lighter/gi, "4x lighter (~75% lighter)");
      ans = ans.replace(/80%\s*lighter/gi, "4x lighter (~75% lighter)");
    }
    if (/2x\s*stronger/i.test(ans) && !ans.includes("IS 18256")) {
      ans = ans.replace(/2x\s*stronger/gi, "up to 2x tensile strength per IS 18256");
    }
    return { ...f, answer: ans };
  });

  const ctaTitle =
    "Let us connect to discuss how RebarX delivers better concrete construction at up to 30% lower reinforcement costs.";

  const productImage =
    prod.products?.[0]?.image?.cloudinaryUrl ?? hero.posterImage?.cloudinaryUrl;

  const sameAs = [
    ...ORG_SAME_AS,
    ...((footerData?.socialMedia ?? []) as { url?: string }[])
      .map((s) => s.url)
      .filter((url): url is string => Boolean(url)),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "Manufacturer"],
        "@id": "https://www.rebarx.in/#org",
        name: "RebarX",
        alternateName: [
          "RebarX GFRP",
          "RebarX India",
          "RebarX Sariya",
          "RebarX GFRP Rebar",
          "Credific Ventures"
        ],
        legalName: "Credific Ventures Private Limited",
        url: "https://www.rebarx.in/",
        logo: "https://res.cloudinary.com/dpdq6pwvr/image/upload/v1752335490/payload-media/logo__11.1_transparent.png",
        image: "https://res.cloudinary.com/dpdq6pwvr/image/upload/v1752335490/payload-media/logo__11.1_transparent.png",
        description:
          "Manufacturer of GFRP (glass fibre reinforced polymer) composite reinforcement rebars in India conforming to IS 18256:2023.",
        telephone: "+91-9530013034",
        email: "hello@rebarx.in",
        founder: {
          "@type": "Person",
          name: "Kapil Agrawal",
          jobTitle: "Founder & Director",
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Indian Institute of Technology Kharagpur"
          }
        },
        knowsAbout: [
          "GFRP Rebar",
          "Glass Fiber Reinforced Polymer",
          "IS 18256:2023",
          "IS 18255:2023",
          "ACI 440.11-22",
          "Corrosion-Free Concrete Reinforcement"
        ],
        ...(sameAs.length ? { sameAs } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: "Plot Number 8B, 8C, Industrial Area - Sector 3",
          addressLocality: "Pithampur",
          addressRegion: "Madhya Pradesh",
          postalCode: "454774",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.rebarx.in/#site",
        url: "https://www.rebarx.in/",
        name: "RebarX",
        alternateName: ["RebarX GFRP Rebar", "RebarX India"],
        publisher: { "@id": "https://www.rebarx.in/#org" },
      },
      {
        "@type": "Product",
        name: "RebarX GFRP Rebar",
        brand: { "@id": "https://www.rebarx.in/#org" },
        material: "Glass Fibre Reinforced Polymer (100% Epoxy Matrix)",
        description:
          "Corrosion-proof GFRP reinforcement bar with up to 2x the tensile strength of TMT steel at one-fourth the weight (4x lighter). Straight bars 3–20mm; factory pre-formed bends 6–16mm.",
        ...(productImage ? { image: [productImage] } : {}),
      },
      ...(sanitizedFaqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: sanitizedFaqs.map((f) => ({
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
        <section className="rx-hero rx-on-dark" data-section="hero">
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
              <Eyebrow>{hero.label ?? "RebarX® GFRP Reinforcement"}</Eyebrow>
              <Headline text={hero.headline ?? "Stronger. Lighter. Rustfree."} />
              <p className="rx-hero__sub">{heroSubtext}</p>
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
        <div className="rx-marquee" aria-hidden="true">
          <div className="rx-marquee__track">
            {[...marqueeItems, ...marqueeItems].map((m: any, i: number) => (
              <span className="rx-marquee__item" key={i}>
                {m.text}
              </span>
            ))}
          </div>
        </div>

        {/* ---------------- ABOUT ---------------- */}
        <section className="rx-section rx-about" id="about" data-section="about">
          <div className="rx-wrap">
            <div className="rx-about__grid">
              <div>
                {about.sectionName ? <Eyebrow>{about.sectionName}</Eyebrow> : null}
                <h2 className="rx-about__h">{about.sectionTitle}</h2>
                {about.sectionDescription ? (
                  <p className="rx-about__p">{about.sectionDescription}</p>
                ) : null}

                {aboutAttrs.length ? (
                  <div className="rx-attrs">
                    {aboutAttrs.map((a: any, i: number) => (
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
        <section className="rx-section rx-apps rx-on-dark" data-section="applications">
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
        <section className="rx-section" id="compare" data-section="compare">
          <div className="rx-wrap">
            <div className="rx-head">
              {cmp.subHeading ? <Eyebrow>{cmp.subHeading}</Eyebrow> : null}
              <h2>{cmp.heading ?? "RebarX vs TMT"}</h2>
            </div>

            <ComparisonTable sections={cmp.comparisonSections ?? []} />
            <p className="rx-resources__readmore">
              <Link href="/compare">Read the full GFRP vs TMT comparison →</Link>
            </p>
          </div>
        </section>

        {/* ---------------- STANDARDS & TECHNICAL COMPLIANCE ---------------- */}
        <section className="rx-section rx-on-dark" data-section="standards">
          <div className="rx-wrap">
            <div className="rx-head">
              <Eyebrow>Quality &amp; Compliance</Eyebrow>
              <h2>Engineered Strictly to Indian &amp; Global Standards</h2>
              <p>
                Every consignment manufactured at our Pithampur (MP) facility is dispatched
                with a lot-specific test certificate verifying physical dimensions, guaranteed
                tensile capacity, and 100% structural epoxy matrix declaration.
              </p>
            </div>
            <div
              className="rx-apps__grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "24px",
              }}
            >
              <article className="rx-app">
                <div className="rx-app__k">BIS Specification</div>
                <h3>IS 18256:2023</h3>
                <p>
                  Full material conformance for Glass Fibre Reinforced Polymer bars in concrete reinforcement. 
                  Guaranteed tensile force per Table 1; minimum fibre content ≥75%; glass transition temp Tg ≥100°C.
                </p>
              </article>
              <article className="rx-app">
                <div className="rx-app__k">Test Methodology</div>
                <h3>IS 18255:2023</h3>
                <p>
                  Standard testing procedures for tensile properties, bond strength, immersion cross-sectional area, 
                  and chemical resistance against alkaline concrete attack.
                </p>
              </article>
              <article className="rx-app">
                <div className="rx-app__k">Highways &amp; Bridges</div>
                <h3>IRC 137:2022 / MoRTH</h3>
                <p>
                  Indian Roads Congress and Ministry of Road Transport guidelines for FRP bars in bridge decks, 
                  box culverts, crash barriers, and coastal highway drainage.
                </p>
              </article>
              <article className="rx-app">
                <div className="rx-app__k">Precast &amp; Drainage</div>
                <h3>IS 458 Inclusion</h3>
                <p>
                  Standardization and technical committee adoption work is actively underway for precast 
                  concrete pipes, storm water culverts, and municipal drainage.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ---------------- PRODUCTS ---------------- */}
        <section className="rx-section rx-prod" data-section="products">
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
              {sanitizedProducts.map((p: any, i: number) => (
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
          <section className="rx-section rx-vision rx-on-dark" data-section="vision">
            <div className="rx-wrap">
              <p>{vision.description}</p>
            </div>
          </section>
        ) : null}

        {/* ---------------- CALCULATOR ---------------- */}
        <SlabCalculator />

        {/* ---------------- BLOGS ---------------- */}
        {blogs.selectedBlogs?.length ? (
          <section className="rx-section" data-section="blog">
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
        {sanitizedFaqs.length ? (
          <section className="rx-section rx-prod" data-section="faq">
            <div className="rx-wrap">
              <div className="rx-head">
                <Eyebrow>Questions</Eyebrow>
                <h2>{faq.sectionTitle ?? "Frequently asked questions"}</h2>
              </div>
              <Faq items={sanitizedFaqs} />
            </div>
          </section>
        ) : null}

        {/* ---------------- DOWNLOADS ---------------- */}
        <section className="rx-section rx-dl" id="downloads" data-section="downloads">
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
        <section className="rx-section rx-cta rx-on-dark" data-section="cta">
          <div className="rx-wrap">
            {cta.smallHeading ? <Eyebrow>{cta.smallHeading}</Eyebrow> : null}
            <h2>{ctaTitle}</h2>
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

