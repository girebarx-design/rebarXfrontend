"use client";

import SlabCalculator from "@/components/SlabCalculator";
import { Eyebrow } from "@/components/rx/ui";
import Breadcrumbs from "@/components/rx/Breadcrumbs";
import { useT, useLanguage } from "@/lib/i18n/useT";

export default function CalculatorContent() {
  const t = useT();
  const { lang } = useLanguage();

  return (
    <main>
      <Breadcrumbs items={[{ label: t("common.home"), href: "/" }, { label: "Calculator" }]} />
      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>{t("calculatorPage.eyebrow")}</Eyebrow>
            <h1>{t("calculatorPage.h1")}</h1>
            <p>{t("calculatorPage.intro")}</p>
            {lang === "hi" ? (
              <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "var(--tx-soft)" }}>
                {t("calculatorPage.calculatorNote")}
              </p>
            ) : null}
          </div>
        </div>
      </section>
      <SlabCalculator />
    </main>
  );
}
