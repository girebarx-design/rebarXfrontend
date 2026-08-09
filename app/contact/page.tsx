import type { Metadata } from "next";
import ContactContent from "@/components/rx/ContactContent";
import { ORG_SAME_AS } from "@/lib/cms";

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

export default async function ContactPage() {
  const c = await getContact();

  const address =
    c?.address ??
    "Credific Ventures Private Limited, Plot Number 8B, 8C, Industrial Area - Sector 3, Pithampur, Madhya Pradesh";
  const email = c?.email ?? "hello@rebarx.in";
  const fields = c?.formFields ?? [];

  const mapQuery = encodeURIComponent(address);

  // Same @id as the homepage's Organization entity (app/page.tsx) —
  // referencing it here instead of declaring a fresh, disconnected
  // LocalBusiness lets Google/AI systems merge this page's facts (hours,
  // contact card) into the one canonical RebarX entity rather than seeing
  // two separate, unlinked businesses.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": "https://www.rebarx.in/#org",
    name: "RebarX",
    legalName: "Credific Ventures Private Limited",
    url: "https://www.rebarx.in/",
    email,
    telephone: PHONE_HREF,
    sameAs: ORG_SAME_AS,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot Number 8B, 8C, Industrial Area - Sector 3",
      addressLocality: "Pithampur",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    openingHours: "Mo-Sa 09:30-18:30",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactContent
        smallTitle={c?.smallTitle}
        description={c?.description}
        address={address}
        email={email}
        phone={PHONE}
        phoneHref={PHONE_HREF}
        fields={fields}
        mapQuery={mapQuery}
      />
    </>
  );
}
