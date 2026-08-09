"use client";

import ComparisonTable from "@/components/rx/ComparisonTable";
import Breadcrumbs from "@/components/rx/Breadcrumbs";
import { Eyebrow, Btn } from "@/components/rx/ui";
import { useT } from "@/lib/i18n/useT";
import { dict } from "@/lib/i18n/dict";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CompareContent({
  sections,
  hasSpecs,
}: {
  sections: any[];
  hasSpecs: boolean;
}) {
  const t = useT();
  const { lang } = useLanguage();
  const faqs = dict.comparePage.faqs;

  return (
    <main>
      <Breadcrumbs items={[{ label: t("common.home"), href: "/" }, { label: t("comparePage.breadcrumb") }]} />

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>{t("comparePage.eyebrow")}</Eyebrow>
            <h1>{t("comparePage.h1")}</h1>
            <p>{t("comparePage.intro")}</p>
          </div>
          <div className="rx-cta__row" style={{ marginTop: "1.5rem" }}>
            <Btn href="/contact" variant="brass">
              {t("common.talkToEngineer")}
            </Btn>
            <Btn href="/calculator" variant="ghost">
              {t("common.estimateNeeds")}
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
            <h2>{t("comparePage.faqHeading")}</h2>
          </div>
          <div className="rx-resources__standards">
            {faqs.map((f) => (
              <div key={f.q.en} className="rx-resources__standard">
                <b>{f.q[lang] ?? f.q.en}</b>
                <p>{f.a[lang] ?? f.a.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rx-section rx-cta rx-on-dark">
        <div className="rx-wrap">
          <p className="rx-eyebrow">RebarX India</p>
          <h2>{t("comparePage.ctaHeading")}</h2>
          <div className="rx-cta__row">
            <Btn href="/contact" variant="brass">
              {t("common.talkToEngineer")}
            </Btn>
            <Btn href="/resources" variant="ghost">
              {t("comparePage.seeStandards")}
            </Btn>
          </div>
        </div>
      </section>
    </main>
  );
}
