import Link from "next/link";
import { slugify, cldOptimize } from "@/lib/cms";

export default function BlogPage({ posts }: { posts: any[] }) {
  if (!posts?.length) {
    return (
      <section className="section hero-blog">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="headline-blog">
            <div className="label">BLOG</div>
            <h1 className="text-h1">News &amp; Articles</h1>
          </div>
          <p className="text-body">
            No articles published yet — check back soon.
          </p>
        </div>
      </section>
    );
  }

  const [first, ...rest] = posts;

  const dateOf = (p: any) =>
    new Date(p.date || p.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <>
      <section className="section hero-blog">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="headline-blog">
            <div className="label">BLOG</div>
            <h1 className="text-h1">News &amp; Articles</h1>
          </div>
          <div className="related-block w-dyn-list">
            <div role="list" className="w-dyn-items">
              <div role="listitem" className="w-dyn-item">
                <Link
                  href={`/blog/${slugify(first.slug)}`}
                  className="article-tile pinned w-inline-block"
                >
                  <div className="image-wrap-blog pinned">
                    {first.mainImage?.cloudinaryUrl ? (
                      <img
                        alt={first.mainImage.alt || first.title || ""}
                        loading="lazy"
                        src={cldOptimize(first.mainImage.cloudinaryUrl)}
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, 54vw"
                        className="image-coverforblogs"
                      />
                    ) : null}
                  </div>
                  <div className="article-info-wrap">
                    <div className="article-category-wrap">
                      <div className="text-small">{first.tag}</div>
                      <div className="text-small opacity-50">·</div>
                      <div className="text-small" style={{ whiteSpace: "nowrap" }}>
                        {dateOf(first)}
                      </div>
                    </div>
                    <div className="text-h3">{first.title}</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="section-divider blog-divider"></div>
          <div className="headline-related">
            <div className="text-h3">Latest articles</div>
          </div>
          <div className="related-block w-dyn-list">
            <div role="list" className="blog-thirds w-dyn-items">
              {rest.map((bb: any, index: number) => (
                <div role="listitem" className="w-dyn-item" key={bb.id || index}>
                  <Link
                    href={`/blog/${slugify(bb.slug)}`}
                    className="article-tile w-inline-block"
                  >
                    <div className="image-wrap-blog">
                      {bb.mainImage?.cloudinaryUrl ? (
                        <img
                          alt={bb.mainImage.alt || bb.title || ""}
                          loading="lazy"
                          src={cldOptimize(bb.mainImage.cloudinaryUrl)}
                          sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                          className="image-coverforblogs"
                        />
                      ) : null}
                    </div>
                    <div className="article-info-wrap">
                      <div className="article-category-wrap">
                        <div className="text-small">{bb.tag}</div>
                        <div className="text-small opacity-50">·</div>
                        <div className="text-small" style={{ whiteSpace: "nowrap" }}>
                          {dateOf(bb)}
                        </div>
                      </div>
                      <div className="text-h5">{bb.title}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
