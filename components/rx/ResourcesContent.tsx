"use client";

import Link from "next/link";
import { Eyebrow, Btn } from "@/components/rx/ui";
import { COMPANY_DOCS, REFERENCE_STUDIES, COMPLIANCE_STANDARDS } from "@/lib/resources";
import { GEO_PAGES } from "@/lib/geo-pages";
import { GEO_PAGES_HI } from "@/lib/i18n/geo-pages-hi";
import Breadcrumbs from "@/components/rx/Breadcrumbs";
import { useT, useLanguage } from "@/lib/i18n/useT";

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

export default function ResourcesContent() {
  const t = useT();
  const { lang } = useLanguage();

  return (
    <main>
      <Breadcrumbs items={[{ label: t("common.home"), href: "/" }, { label: t("resourcesPage.breadcrumb") }]} />

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>{t("resourcesPage.eyebrow")}</Eyebrow>
            <h1>{t("resourcesPage.h1")}</h1>
            <p>{t("resourcesPage.intro")}</p>
          </div>
        </div>
      </section>

      <section className="rx-section rx-dl">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>{t("resourcesPage.companyDocs")}</h2>
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
            <h2>{t("resourcesPage.referencedResearch")}</h2>
            <p>{t("resourcesPage.referencedResearchSub")}</p>
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
                {t("resourcesPage.readAnalysis")}{" "}
                <Link href={d.articleHref}>{t("resourcesPage.readAnalysisLink")}</Link>
              </p>
            ) : null
          )}
        </div>
      </section>

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>{t("resourcesPage.complianceStandards")}</h2>
            <p>{t("resourcesPage.complianceStandardsSub")}</p>
          </div>
          <div className="rx-resources__standards">
            {COMPLIANCE_STANDARDS.map((s) => (
              <div key={s.code} className="rx-resources__standard">
                <b>{s.code}</b>
                <span className="rx-resources__standard-body">{s.body}</span>
                <p>{t(`complianceCovers.${s.code}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rx-section rx-dl">
        <div className="rx-wrap">
          <div className="rx-head">
            <h2>{t("resourcesPage.whereWeDeliver")}</h2>
            <p>{t("resourcesPage.whereWeDeliverSub")}</p>
          </div>
          <ul className="rx-areas">
            {GEO_PAGES.map((g) => (
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
          <p className="rx-eyebrow">RebarX India</p>
          <h2>{t("resourcesPage.ctaHeading")}</h2>
          <div className="rx-cta__row">
            <Btn href="/contact" variant="brass">
              {t("common.talkToEngineer")}
            </Btn>
          </div>
        </div>
      </section>
    </main>
  );
}
