import { MetadataRoute } from "next";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_URL || "https://rebar-xbackend.vercel.app";
const FRONTEND_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rebarx.in";

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // ==================== FETCH ALL COLLECTIONS ====================

    // 1. Fetch Blog Posts
    const blogsRes = await fetch(`${BACKEND_URL}/api/blog-posts?limit=1000`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    const blogsData = await blogsRes.json();

    // 2. Fetch Pages (dynamic pages from your Pages collection)
    const pagesRes = await fetch(`${BACKEND_URL}/api/pages?limit=1000`, {
      next: { revalidate: 3600 },
    });
    const pagesData = await pagesRes.json();

    // 3. Fetch Contact components (if they have public-facing URLs)
    const contactRes = await fetch(`${BACKEND_URL}/api/contact?limit=1000`, {
      next: { revalidate: 3600 },
    });
    const contactData = await contactRes.json();

    // ==================== STATIC PAGES ====================
    const staticPages: SitemapEntry[] = [
      {
        url: FRONTEND_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0, // Homepage has highest priority
      },
      {
        url: `${FRONTEND_URL}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${FRONTEND_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${FRONTEND_URL}/blogs`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9, // Blog listing page
      },
      {
        url: `${FRONTEND_URL}/products`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9, // Products listing page
      },
    ];

    // ==================== BLOG POSTS ====================
    const blogPages: SitemapEntry[] =
      blogsData?.docs?.map((blog: any) => ({
        url: `${FRONTEND_URL}/blogs/${blog.slug}`,
        lastModified: new Date(blog.updatedAt || blog.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })) || [];

    // ==================== DYNAMIC PAGES ====================
    // Pages created through your Pages collection
    const dynamicPages: SitemapEntry[] =
      pagesData?.docs
        ?.filter((page: any) => page.slug !== "home") // Exclude home if it's in Pages
        ?.map((page: any) => ({
          url: `${FRONTEND_URL}/${page.slug}`,
          lastModified: new Date(page.updatedAt || page.createdAt),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })) || [];

    // ==================== CONTACT PAGES (if applicable) ====================
    // Only include if your contact components have individual URLs
    const contactPages: SitemapEntry[] =
      contactData?.docs
        ?.filter((contact: any) => contact.isActive && contact.componentType)
        ?.map((contact: any) => ({
          url: `${FRONTEND_URL}/contact/${contact.slug || contact.name.toLowerCase().replace(/\s+/g, "-")}`,
          lastModified: new Date(contact.updatedAt || contact.createdAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })) || [];

    // ==================== COMBINE ALL ENTRIES ====================
    const allEntries = [
      ...staticPages,
      ...blogPages,
      ...dynamicPages,
      // ...contactPages, // Uncomment if contact components have individual pages
    ];

    // Remove duplicates (in case of overlapping URLs)
    const uniqueEntries = allEntries.filter(
      (entry, index, self) =>
        index === self.findIndex((e) => e.url === entry.url)
    );

    console.log(`✅ Generated sitemap with ${uniqueEntries.length} URLs`);

    return uniqueEntries;
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);

    // Return minimal sitemap in case of error
    return [
      {
        url: FRONTEND_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
    ];
  }
}
