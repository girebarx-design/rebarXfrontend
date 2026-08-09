"use client";

import Link from "next/link";
import { DOWNLOADS } from "@/lib/downloads";
import { useT } from "@/lib/i18n/useT";

type L = { label: string; url: string };

export default function Footer({
  logo,
  company = [],
  legal = [],
  social = [],
  phone,
}: {
  logo?: string;
  company?: L[];
  legal?: L[];
  social?: L[];
  phone?: string;
}) {
  const year = 2026;
  const t = useT();

  return (
    <footer className="rx-foot">
      <div className="rx-wrap">
        <div className="rx-foot__top">
          <div className="rx-foot__brand">
            {logo ? <img src={logo} alt="RebarX" /> : null}
            <p>{t("footer.tagline")}</p>
          </div>

          {company.length ? (
            <div className="rx-foot__col">
              <h4>{t("footer.company")}</h4>
              {company.map((l) => (
                <Link key={l.url + l.label} href={l.url}>
                  {l.label}
                </Link>
              ))}
            </div>
          ) : null}

          {legal.length ? (
            <div className="rx-foot__col">
              <h4>{t("footer.legal")}</h4>
              {legal.map((l) => (
                <Link key={l.url + l.label} href={l.url}>
                  {l.label}
                </Link>
              ))}
            </div>
          ) : null}

          <div className="rx-foot__col">
            <h4>{t("footer.downloads")}</h4>
            {DOWNLOADS.map((d) => (
              <a key={d.href} href={d.href} download>
                {d.label}
              </a>
            ))}
          </div>

          <div className="rx-foot__col">
            <h4>{t("footer.getInTouch")}</h4>
            {phone ? <a href={`tel:+91${phone}`}>+91 {phone}</a> : null}
            {social.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="rx-foot__btm">
          <span>
            © {year} Credific Ventures Private Limited. {t("footer.rightsReserved")}
          </span>
          <span>{t("footer.madeIn")}</span>
        </div>
      </div>
    </footer>
  );
}
