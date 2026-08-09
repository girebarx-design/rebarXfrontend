"use client";

import ContactForm from "@/components/rx/ContactForm";
import { Eyebrow } from "@/components/rx/ui";
import { WhatsAppButton } from "@/components/rx/WhatsApp";
import Breadcrumbs from "@/components/rx/Breadcrumbs";
import { useT } from "@/lib/i18n/useT";

function Pin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6.5 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 7 8 5.5L20 7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactContent({
  smallTitle,
  description,
  address,
  email,
  phone,
  phoneHref,
  fields,
  mapQuery,
}: {
  smallTitle?: string;
  description?: string;
  address: string;
  email: string;
  phone: string;
  phoneHref: string;
  fields: any[];
  mapQuery: string;
}) {
  const t = useT();

  return (
    <main>
      <Breadcrumbs
        items={[{ label: t("common.home"), href: "/" }, { label: t("contactPage.breadcrumbContact") }]}
      />

      <section className="rx-section rx-contact">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>{smallTitle ?? t("contactPage.eyebrow")}</Eyebrow>
            <h1>{t("contactPage.h1")}</h1>
            <p>{description ?? t("contactPage.description")}</p>
          </div>

          <div className="rx-contact__grid">
            {/* ---- details ---- */}
            <aside className="rx-contact__side">
              <a
                className="rx-ccard"
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="rx-ccard__ico">
                  <Pin />
                </span>
                <span>
                  <b>{t("contactPage.factoryOffice")}</b>
                  <span className="rx-ccard__v">{address}</span>
                  <span className="rx-ccard__go">{t("contactPage.openInMaps")}</span>
                </span>
              </a>

              <a className="rx-ccard" href={`tel:${phoneHref}`}>
                <span className="rx-ccard__ico">
                  <PhoneIcon />
                </span>
                <span>
                  <b>{t("contactPage.phone")}</b>
                  <span className="rx-ccard__v">{phone}</span>
                  <span className="rx-ccard__go">{t("contactPage.phoneHours")}</span>
                </span>
              </a>

              <a className="rx-ccard" href={`mailto:${email}`}>
                <span className="rx-ccard__ico">
                  <MailIcon />
                </span>
                <span>
                  <b>{t("contactPage.email")}</b>
                  <span className="rx-ccard__v">{email}</span>
                </span>
              </a>

              <div className="rx-contact__wa">
                <p>{t("contactPage.quickAnswer")}</p>
                <WhatsAppButton message="Hi RebarX, I have a project enquiry.">
                  {t("common.chatWhatsApp")}
                </WhatsAppButton>
              </div>
            </aside>

            {/* ---- form ---- */}
            <div className="rx-contact__form">
              <h2>{t("contactPage.sendAnEnquiry")}</h2>
              <ContactForm fields={fields} />
            </div>
          </div>
        </div>
      </section>

      <section className="rx-map" aria-label="RebarX location map">
        <iframe
          title="RebarX factory location, Pithampur, Madhya Pradesh"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}
