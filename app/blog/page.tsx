import type { Metadata } from "next";
import BlogPage from "@/components/BlogPage";
import { getBlogPosts } from "@/lib/cms";
import Breadcrumbs from "@/components/rx/Breadcrumbs";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog | RebarX — GFRP Rebar Insights & Guides",
  description:
    "Guides and insights on GFRP rebar, corrosion-free reinforcement, and construction cost savings from the RebarX team.",
  alternates: { canonical: "https://www.rebarx.in/blog" },
  openGraph: {
    title: "RebarX Blog",
    description:
      "Guides and insights on GFRP rebar, corrosion-free reinforcement, and construction cost savings.",
    url: "https://www.rebarx.in/blog",
  },
};

export default async function Blog() {
  const posts = await getBlogPosts();
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <BlogPage posts={posts} />
    </>
  );
}
