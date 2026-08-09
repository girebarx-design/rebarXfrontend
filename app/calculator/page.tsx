import type { Metadata } from "next";
import CalculatorContent from "@/components/rx/CalculatorContent";

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
  return <CalculatorContent />;
}
