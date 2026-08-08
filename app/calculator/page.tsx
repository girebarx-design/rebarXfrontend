import type { Metadata } from "next";
import SlabCalculator from "@/components/SlabCalculator";
import { Eyebrow } from "@/components/rx/ui";
import Breadcrumbs from "@/components/rx/Breadcrumbs";

export const metadata: Metadata = {
  title: "GFRP Rebar Calculator — Quantity & Cost Savings | RebarX",
  description:
    "Free GFRP rebar calculator for slabs. Enter your dimensions or span and load to get bar size, spacing, total length, weight, and estimated savings versus TMT steel.",
  alternates: { canonical: "https://www.rebarx.in/calculator" },
  openGraph: {
    title: "GFRP Rebar Calculator | RebarX",
    description:
      "Work out the GFRP rebar quantity, weight and cost savings for your next slab in seconds.",
    url: "https://www.rebarx.in/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Calculator" }]} />
      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>Free tool</Eyebrow>
            <h1>GFRP Rebar Calculator</h1>
            <p>
              Enter your slab dimensions — or just the span and load if you
              haven&rsquo;t sized it yet — and get the bar diameter, spacing,
              total length, weight, and estimated savings versus TMT steel.
            </p>
          </div>
        </div>
      </section>
      <SlabCalculator />
    </main>
  );
}
