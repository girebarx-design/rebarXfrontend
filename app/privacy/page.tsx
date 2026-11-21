import type { Metadata } from "next";
import Breadcrumbs from "@/components/rx/Breadcrumbs";
import { Eyebrow } from "@/components/rx/ui";

export const metadata: Metadata = {
  title: "Privacy Policy | RebarX — Credific Ventures",
  description:
    "Privacy Policy for RebarX (Credific Ventures Private Limited). How we collect, handle, and protect your project and contact details.",
  alternates: { canonical: "https://www.rebarx.in/privacy" },
  openGraph: {
    title: "Privacy Policy | RebarX",
    description: "Privacy Policy for RebarX (Credific Ventures Private Limited).",
    url: "https://www.rebarx.in/privacy",
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy — RebarX",
    url: "https://www.rebarx.in/privacy",
    publisher: {
      "@type": "Organization",
      name: "RebarX",
      legalName: "Credific Ventures Private Limited",
      url: "https://www.rebarx.in/",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />

        <section className="rx-section">
          <div className="rx-wrap" style={{ maxWidth: "820px" }}>
            <div className="rx-head" style={{ textAlign: "left", marginBottom: "2.5rem" }}>
              <Eyebrow>Legal & Compliance</Eyebrow>
              <h1 style={{ fontSize: "2.25rem", fontWeight: 700, margin: "0.5rem 0 1rem" }}>
                Privacy Policy
              </h1>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                Effective Date: November 2026 · Credific Ventures Private Limited
              </p>
            </div>

            <div className="blog-content" style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
              <h2>1. Overview</h2>
              <p>
                Credific Ventures Private Limited (&quot;Credific Ventures&quot;, &quot;RebarX&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website <strong>https://www.rebarx.in</strong>. This Privacy Policy outlines our transparent practices regarding the collection, processing, and safeguarding of information provided by contractors, consulting engineers, EPC firms, and website visitors.
              </p>

              <h2>2. Information We Collect</h2>
              <p>We only collect information required to assist you with technical inquiries, structural sizing, sample dispatches, and material quotations:</p>
              <ul>
                <li><strong>Contact Inquiries:</strong> Name, phone number, email address, company name, and project specifications submitted via our contact forms.</li>
                <li><strong>Slab Calculator Estimations:</strong> Slab dimensions, estimated tonnage, preferred bar diameters, and site city/place submitted to unlock customized reinforcement takeoffs.</li>
                <li><strong>Direct Communications:</strong> Records of communications initiated by you via phone calls (+91 9530013034), official WhatsApp chat, or direct emails.</li>
                <li><strong>Technical Usage Data:</strong> Standard anonymous server telemetry (browser type, referral URL, and aggregated page visits) used solely to maintain site speed and prevent abuse.</li>
              </ul>

              <h2>3. Purpose and Use of Collected Information</h2>
              <p>Your data is used strictly for legitimate commercial and engineering purposes:</p>
              <ul>
                <li>Preparing commercial quotations, freight calculations, and Bar Bending Schedule (BBS) takeoffs.</li>
                <li>Providing technical clarifications regarding IS 18256:2023 conformance and factory test certificates.</li>
                <li>Coordinating sample dispatches and direct dispatches from our Pithampur (MP) manufacturing plant.</li>
                <li>Following up on active lead requests via our sales and technical support team.</li>
              </ul>

              <h2>4. Protection and Confidentiality</h2>
              <p>
                <strong>Zero Third-Party Data Sales:</strong> Credific Ventures does not sell, rent, lease, or monetize your contact details, project drawings, or bill-of-quantities with any third-party marketing brokers or advertisers.
              </p>
              <p>
                Data access is restricted solely to authorized engineering, dispatch, and administrative personnel who require it to fulfill your order or inquiry.
              </p>

              <h2>5. Customer Site Confidentiality</h2>
              <p>
                We adhere strictly to industrial confidentiality norms. Commercial terms, structural design drawings, and specific site details shared for review remain confidential and are never shared publicly without express client consent.
              </p>

              <h2>6. Contact Us</h2>
              <p>For any questions or requests regarding your information, contact our corporate office:</p>
              <div style={{ background: "#f8fafc", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0", marginTop: "1rem" }}>
                <p style={{ margin: "0 0 0.5rem", fontWeight: 600 }}>Credific Ventures Private Limited</p>
                <p style={{ margin: "0 0 0.25rem" }}>Plant &amp; Registered Works: Plot No. 8B &amp; 8C, Sector 3, Industrial Area, Pithampur, Dhar, Madhya Pradesh – 454774, India</p>
                <p style={{ margin: "0 0 0.25rem" }}>Direct Phone: <a href="tel:+919530013034" style={{ color: "var(--accent)" }}>+91 95300 13034</a></p>
                <p style={{ margin: 0 }}>Official Email: <a href="mailto:hello@rebarx.in" style={{ color: "var(--accent)" }}>hello@rebarx.in</a> / <a href="mailto:kapil@rebarx.in" style={{ color: "var(--accent)" }}>kapil@rebarx.in</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
