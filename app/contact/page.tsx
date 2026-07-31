import type { Metadata } from "next";
import ContactForm from "@/components/rx/ContactForm";
import { Eyebrow } from "@/components/rx/ui";
import { WhatsAppButton, WA_NUMBER } from "@/components/rx/WhatsApp";

export const revalidate = 3600;

const PHONE = "+91 95300 13034";
const PHONE_HREF = "+919530013034";

export const metadata: Metadata = {
  title: "Contact RebarX | GFRP Rebar Manufacturer, Pithampur, Madhya Pradesh",
  description:
    "Talk to the RebarX team about GFRP rebar for your project. Factory at Pithampur, Madhya Pradesh. Call +91 95300 13034, message us on WhatsApp, or email hello@rebarx.in.",
  alternates: { canonical: "https://www.rebarx.in/contact" },
  openGraph: {
    title: "Contact RebarX",
    description:
      "Talk to the RebarX team about GFRP rebar for your project. Pithampur, Madhya Pradesh.",
    url: "https://www.rebarx.in/contact",
  },
};

async function getContact() {
  const res = await fetch(
    "https://rebar-xbackend.vercel.app/api/globals/contact-page?depth=2",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

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

export default async function ContactPage() {
  const c = await getContact();

  const address =
    c?.address ??
    "Credific Ventures Private Limited, Plot Number 8B, 8C, Industrial Area - Sector 3, Pithampur, Madhya Pradesh";
  const email = c?.email ?? "hello@rebarx.in";
  const fields = c?.formFields ?? [];

  const mapQuery = encodeURIComponent(address);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "RebarX",
    legalName: "Credific Ventures Private Limited",
    url: "https://www.rebarx.in/contact",
    email,
    telephone: PHONE_HREF,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot Number 8B, 8C, Industrial Area - Sector 3",
      addressLocality: "Pithampur",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="rx-section rx-contact">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>{c?.smallTitle ?? "Contact"}</Eyebrow>
            <h1>Talk to our GFRP team</h1>
            <p>
              {c?.description ??
                "Tell us about your project and we'll come back with sizing, quantities and a delivered price."}
            </p>
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
                  <b>Factory &amp; office</b>
                  <span className="rx-ccard__v">{address}</span>
                  <span className="rx-ccard__go">Open in Maps →</span>
                </span>
              </a>

              <a className="rx-ccard" href={`tel:${PHONE_HREF}`}>
                <span className="rx-ccard__ico">
                  <PhoneIcon />
                </span>
                <span>
                  <b>Phone</b>
                  <span className="rx-ccard__v">{PHONE}</span>
                  <span className="rx-ccard__go">Mon–Sat, 9:30am–6:30pm IST</span>
                </span>
              </a>

              <a className="rx-ccard" href={`mailto:${email}`}>
                <span className="rx-ccard__ico">
                  <MailIcon />
                </span>
                <span>
                  <b>Email</b>
                  <span className="rx-ccard__v">{email}</span>
                </span>
              </a>

              <div className="rx-contact__wa">
                <p>Need a quick answer? Message us — we reply in minutes.</p>
                <WhatsAppButton message="Hi RebarX, I have a project enquiry.">
                  Chat on WhatsApp
                </WhatsAppButton>
              </div>
            </aside>

            {/* ---- form ---- */}
            <div className="rx-contact__form">
              <h2>Send an enquiry</h2>
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
