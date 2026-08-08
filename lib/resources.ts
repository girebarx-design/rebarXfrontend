/** Single source of truth for the Technical Resource Center page. */

export const COMPANY_DOCS = [
  {
    href: "/downloads/RebarX-Company-Profile.pdf",
    label: "Company Profile",
    blurb: "Who we are, our technology partners, and projects delivered.",
    meta: "PDF · 2.1 MB",
  },
  {
    href: "/downloads/RebarX-GFRP-Technical-Datasheet.pdf",
    label: "RebarX Technical Datasheet",
    blurb: "Mechanical properties, sizes, tolerances and compliance data.",
    meta: "PDF · 0.5 MB",
  },
] as const;

export const REFERENCE_STUDIES = [
  {
    href: "/downloads/ACI-Durability-of-GFRP-Bars-Extracted-from-Bridges.pdf",
    label: "Durability of GFRP Bars Extracted from Bridges with 15–20 Years of Service Life",
    blurb:
      "ACI Strategic Development Council study — GFRP rebar cored from 11 US bridges and lab-tested for real long-term degradation.",
    meta: "PDF · ACI SDC, 2019",
    articleHref: "/blog/does-gfrp-rebar-degrade-over-time-real-bridge-data",
  },
] as const;

export const COMPLIANCE_STANDARDS = [
  {
    code: "IS 18256",
    body: "Bureau of Indian Standards",
    covers: "GFRP bars for concrete reinforcement — the primary Indian material standard RebarX is manufactured to.",
  },
  {
    code: "ACI 440.11-22",
    body: "American Concrete Institute",
    covers: "Design code for structural concrete reinforced with GFRP bars.",
  },
  {
    code: "ASTM D7957",
    body: "ASTM International",
    covers: "Standard specification for GFRP bars — tensile strength, fiber content, glass transition temperature.",
  },
  {
    code: "ASTM D7205",
    body: "ASTM International",
    covers: "Test method for tensile properties of FRP bars.",
  },
] as const;
