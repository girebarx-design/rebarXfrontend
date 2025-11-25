"use client";

import Link from "next/link";
import { useEffect, useState } from "react";



export default function BlogPage() {

    const [pageData, setPageData] = useState(null);
    
      useEffect(() => {
        fetch("https://rebar-xbackend.vercel.app/api/blog-posts?depth=1&limit=100")
          .then((res) => res.json())
          .then((data) => setPageData(data.docs));
      }, []);
    
      if (!pageData) return <div>Loading...</div>;
    
    const layout = pageData.layout;

    // const blogSection = layout.find(
    //   (block) => block.blockType === "blogSection"
    // );

    // console.log(pageData, 'this is blog')

    const first = pageData[0]

    console.log(pageData,' this is irst')
    

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
                    href={`/blog/${first.slug}`}
                    className="article-tile pinned w-inline-block"
                  >
                    <div className="image-wrap-blog pinned">
                      <img
                        alt=""
                        loading="lazy"
                        src={first.mainImage.cloudinaryUrl}
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, 54vw"
                        className="image-cover"
                      />
                    </div>
                    <div className="article-info-wrap">
                      <div className="article-category-wrap">
                        <div className="text-small">{first.tag}</div>
                        <div className="text-small opacity-50">·</div>
                        <div className="text-small" style={{whiteSpace: "nowrap"}}>
                          {new Date(
                            first.date || first.createdAt
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <div className="text-h3">{first.title}</div>
                    </div>
                  </Link>
                  {/* <a
                    href="/blog/5-essential-strategies-for-sustainable-business-growth"
                    className="article-tile pinned w-inline-block"
                  >
                    <div className="image-wrap-blog pinned">
                      <img
                        alt=""
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da42b5ab54badd667406_Earth.jpg"
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, 54vw"
                        className="image-cover"
                      />
                    </div>
                    <div className="article-info-wrap">
                      <div className="article-category-wrap">
                        <div className="text-small">Welness</div>
                        <div className="text-small opacity-50">·</div>
                        <div className="text-small">November 13, 2024</div>
                      </div>
                      <div className="text-h3">
                        5 Essential Strategies for Sustainable Business Growth
                      </div>
                    </div>
                  </a> */}
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
                {pageData.slice(1).map((bb, index) => (
                  <div role="listitem" className="w-dyn-item">
                    <Link
                      href={`/blog/${bb.slug}`}
                      className="article-tile w-inline-block"
                    >
                      <div className="image-wrap-blog">
                        <img
                          alt=""
                          loading="lazy"
                          src={bb.mainImage.cloudinaryUrl}
                          sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                          className="image-cover"
                        />
                      </div>
                      <div className="article-info-wrap">
                        <div className="article-category-wrap">
                          <div className="text-small">{bb.tag}</div>
                          <div className="text-small opacity-50">·</div>
                          <div className="text-small" style={{whiteSpace: "nowrap"}}>
                            {new Date(
                              bb.date || bb.createdAt
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                        <div className="text-h5">{bb.title}</div>
                      </div>
                    </Link>
                  </div>
                ))}
                {/* <div role="listitem" className="w-dyn-item">
                  <a
                    href="/blog/5-essential-strategies-for-sustainable-business-growth"
                    className="article-tile w-inline-block"
                  >
                    <div className="image-wrap-blog">
                      <img
                        alt=""
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da42b5ab54badd667406_Earth.jpg"
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                        className="image-cover"
                      />
                    </div>
                    <div className="article-info-wrap">
                      <div className="article-category-wrap">
                        <div className="text-small">Welness</div>
                        <div className="text-small opacity-50">·</div>
                        <div className="text-small">November 13, 2024</div>
                      </div>
                      <div className="text-h5">
                        5 Essential Strategies for Sustainable Business Growth
                      </div>
                    </div>
                  </a>
                </div> */}
                {/* <div role="listitem" className="w-dyn-item">
                  <a
                    href="/blog/how-to-optimize-your-business-operations-for-maximum-efficiency-2"
                    className="article-tile w-inline-block"
                  >
                    <div className="image-wrap-blog">
                      <img
                        alt=""
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow.jpg"
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                        className="image-cover"
                      />
                    </div>
                    <div className="article-info-wrap">
                      <div className="article-category-wrap">
                        <div className="text-small">Welness</div>
                        <div className="text-small opacity-50">·</div>
                        <div className="text-small">November 13, 2024</div>
                      </div>
                      <div className="text-h5">
                        How to Optimize Your Business Operations for Maximum
                        Efficiency
                      </div>
                    </div>
                  </a>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <a
                    href="/blog/unlocking-new-markets-a-step-by-step-guide-to-expansion-2"
                    className="article-tile w-inline-block"
                  >
                    <div className="image-wrap-blog">
                      <img
                        alt=""
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da0ec2f2d5cfa12bda5d_Article%20Thumbnail%204.png"
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                        className="image-cover"
                      />
                    </div>
                    <div className="article-info-wrap">
                      <div className="article-category-wrap">
                        <div className="text-small">Welness</div>
                        <div className="text-small opacity-50">·</div>
                        <div className="text-small">November 13, 2024</div>
                      </div>
                      <div className="text-h5">
                        Unlocking New Markets: A Step-by-Step Guide to Expansion
                      </div>
                    </div>
                  </a>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <a
                    href="/blog/the-role-of-data-in-shaping-effective-business-strategies"
                    className="article-tile w-inline-block"
                  >
                    <div className="image-wrap-blog">
                      <img
                        alt=""
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d9bde5bcef035a56dcce_Leaf.jpg"
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                        className="image-cover"
                      />
                    </div>
                    <div className="article-info-wrap">
                      <div className="article-category-wrap">
                        <div className="text-small">Welness</div>
                        <div className="text-small opacity-50">·</div>
                        <div className="text-small">November 13, 2024</div>
                      </div>
                      <div className="text-h5">
                        The Role of Data in Shaping Effective Business
                        Strategies
                      </div>
                    </div>
                  </a>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <a
                    href="/blog/common-business-pitfalls-and-how-to-avoid-them"
                    className="article-tile w-inline-block"
                  >
                    <div className="image-wrap-blog">
                      <img
                        alt=""
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d99c8d43db798834ffe4_Water.jpg"
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                        className="image-cover"
                      />
                    </div>
                    <div className="article-info-wrap">
                      <div className="article-category-wrap">
                        <div className="text-small">Welness</div>
                        <div className="text-small opacity-50">·</div>
                        <div className="text-small">November 13, 2024</div>
                      </div>
                      <div className="text-h5">
                        Common Business Pitfalls and How to Avoid Them
                      </div>
                    </div>
                  </a>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <a
                    href="/blog/from-vision-to-reality-turning-strategic-plans-into-action"
                    className="article-tile w-inline-block"
                  >
                    <div className="image-wrap-blog">
                      <img
                        alt=""
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d9652d03579b00cd6cd2_Article%20Thumbnail%203.png"
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                        className="image-cover"
                      />
                    </div>
                    <div className="article-info-wrap">
                      <div className="article-category-wrap">
                        <div className="text-small">Welness</div>
                        <div className="text-small opacity-50">·</div>
                        <div className="text-small">November 13, 2024</div>
                      </div>
                      <div className="text-h5">
                        From Vision to Reality: Turning Strategic Plans into
                        Action
                      </div>
                    </div>
                  </a>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <a
                    href="/blog/why-performance-tracking-is-key-to-business-success"
                    className="article-tile w-inline-block"
                  >
                    <div className="image-wrap-blog">
                      <img
                        alt=""
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d91659c55cbec370645c_Solar.jpg"
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                        className="image-cover"
                      />
                    </div>
                    <div className="article-info-wrap">
                      <div className="article-category-wrap">
                        <div className="text-small">Welness</div>
                        <div className="text-small opacity-50">·</div>
                        <div className="text-small">November 13, 2024</div>
                      </div>
                      <div className="text-h5">
                        Why Performance Tracking Is Key to Business Success
                      </div>
                    </div>
                  </a>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <a
                    href="/blog/the-benefits-of-customized-consulting-for-your-business"
                    className="article-tile w-inline-block"
                  >
                    <div className="image-wrap-blog">
                      <img
                        alt=""
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d8f415231f69af0c740e_Windmill.jpg"
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                        className="image-cover"
                      />
                    </div>
                    <div className="article-info-wrap">
                      <div className="article-category-wrap">
                        <div className="text-small">Welness</div>
                        <div className="text-small opacity-50">·</div>
                        <div className="text-small">November 13, 2024</div>
                      </div>
                      <div className="text-h5">
                        The Benefits of Customized Consulting for Your Business
                      </div>
                    </div>
                  </a>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <a
                    href="/blog/how-to-optimize-your-business-operations-for-maximum-efficiency"
                    className="article-tile w-inline-block"
                  >
                    <div className="image-wrap-blog">
                      <img
                        alt=""
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d8d316d8ada7beae18b7_Article%20Thumbnail.png"
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                        className="image-cover"
                      />
                    </div>
                    <div className="article-info-wrap">
                      <div className="article-category-wrap">
                        <div className="text-small">Welness</div>
                        <div className="text-small opacity-50">·</div>
                        <div className="text-small">November 13, 2024</div>
                      </div>
                      <div className="text-h5">
                        How to Optimize Your Business Operations for Maximum
                        Efficiency
                      </div>
                    </div>
                  </a>
                </div> */}
              </div>
              <div
                role="navigation"
                aria-label="List"
                className="w-pagination-wrapper pagination blog-pagination"
              >
                <a
                  href="?75ce158c_page=2"
                  aria-label="Next Page"
                  className="w-pagination-next pagination-button-article"
                >
                  {/* <div className="text-h3 w-inline-block">Next</div> */}
                </a>
                <link rel="prerender" href="?75ce158c_page=2" />
              </div>
            </div>
          </div>
        </section>
      </>
    );
}
