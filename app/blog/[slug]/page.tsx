import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/components/SingleBlog";
import { getBlogPostBySlug, getBlogPosts, slugify } from "@/lib/cms";
import Breadcrumbs from "@/components/rx/Breadcrumbs";

export const revalidate = 86400; // 24 hours (posts are also statically pre-rendered at build time)

type Params = Promise<{ slug: string }>;

/** Pre-render all blog posts into static HTML files at build time (● SSG).
 * Served directly from Vercel Edge CDN with 0 serverless CPU usage. */
export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((p: any) => ({
      slug: slugify(p.slug),
    }));
  } catch (err) {
    console.error("Failed to generate static params for blog posts:", err);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "This blog post does not exist.",
    };
  }

  const url = `https://www.rebarx.in/blog/${slugify(blog.slug)}`;

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || "",
    alternates: { canonical: blog.canonicalURL || url },
    openGraph: {
      title: blog.ogTitle || blog.metaTitle || blog.title,
      description: blog.ogDescription || blog.metaDescription || "",
      url,
      type: "article",
      images: blog.ogImage?.cloudinaryUrl
        ? [blog.ogImage.cloudinaryUrl]
        : blog.mainImage?.cloudinaryUrl
        ? [blog.mainImage.cloudinaryUrl]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.twitterTitle || blog.metaTitle || blog.title,
      description: blog.twitterDescription || blog.metaDescription || "",
      images: blog.twitterImage?.cloudinaryUrl
        ? [blog.twitterImage.cloudinaryUrl]
        : blog.mainImage?.cloudinaryUrl
        ? [blog.mainImage.cloudinaryUrl]
        : [],
    },
  };
}

export default async function Blog({ params }: { params: Params }) {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug);

  if (!blog) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    datePublished: blog.date || blog.createdAt,
    dateModified: blog.updatedAt || blog.date || blog.createdAt,
    image: blog.mainImage?.cloudinaryUrl ? [blog.mainImage.cloudinaryUrl] : undefined,
    author: { "@type": "Organization", name: "RebarX" },
    publisher: {
      "@type": "Organization",
      name: "RebarX",
      "@id": "https://www.rebarx.in/#org",
    },
    mainEntityOfPage: `https://www.rebarx.in/blog/${slugify(blog.slug)}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: blog.title },
        ]}
      />
      <BlogPost blogData={blog} />
    </>
  );
}
