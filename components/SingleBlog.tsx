"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import "../app/globals.css"
// Lexical Content Renderer
const LexicalContentRenderer = ({ content, className = "" }) => {
  if (!content?.root?.children) {
    return <div className={className}>No content available</div>;
  }

  const renderNode = (node, index) => {
    node.children?.map((child,index)=>{
      //  child?.children.map((item,index)=>{
      //  })
      // if(child.type=="listitem "){
      //    console.log(child,'karishma')
      // }
      // child?.children.map((item,i)=>{
      //   console.log(item)
      // })
    })
    switch (node.type) {
      case "paragraph":
        if (!node.children || node.children.length === 0) {
          return <br key={index} />;
        }
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {node.children.map((child, childIndex) =>
              renderTextNode(child, childIndex)
            )}
          </p>
        );

      case "heading":
        if (!node.children || node.children.length === 0) return null;
        const level = node.tag || 2;
        const HeadingTag = `h${level}`;
      const headingClasses = {
  1: "article-h1",
  2: "article-h2",
  3: "article-h3",
  4: "article-h4",
  5: "article-h5",
  6: "article-h6",
};

        return React.createElement(
          HeadingTag,
          { key: index, className: headingClasses[level] || headingClasses[2] },
          node.children.map((child, childIndex) =>
            renderTextNode(child, childIndex)
          )
        );

      // list
      case "list":
        const ListTag = node.listType === "number" ? "ol" : "ul";
        const listClasses =
          node.listType === "number"
            ? "list-decimal list-inside mb-4 ml-4 space-y-2"
            : "list-disc list-inside mb-4 ml-4 space-y-2";

        return (
          <ListTag key={index} className={listClasses}>
            {node.children?.map((child, childIndex) =>
              renderNode(child, childIndex)
            )}
          </ListTag>
        );

      // listitem
    case "listitem":
  return (
    <li key={index} className="mb-2">
      {node.children?.map((child, childIndex) => {
        // If child is paragraph, render as paragraph
        if (child.type === "paragraph") {
          return (
            <p key={childIndex} className="m-0">
              {child.children?.map((textChild, textIndex) =>
                renderTextNode(textChild, textIndex)
              )}
            </p>
          );
        }

        // If child is text directly, render it
        if (child.type === "text") {
          return renderTextNode(child, childIndex);
        }

        // fallback: render any nested nodes recursively
        return renderNode(child, childIndex);
      })}
    </li>
  );


      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-blue-500 pl-6 italic mb-6 bg-gray-50 py-4"
          >
            {node.children?.map((child, childIndex) =>
              renderNode(child, childIndex)
            )}
          </blockquote>
        );

      case "upload":
        if (node.value?.cloudinaryUrl) {
          return (
            <div key={index} className="mb-8">
              <img
                src={node.value.cloudinaryUrl}
                alt={node.value.alt || ""}
                className="w-full h-auto rounded-lg"
              />
              {node.value.caption && (
                <p className="text-small text-center mt-3 italic">
                  {node.value.caption}
                </p>
              )}
            </div>
          );
        }
        return null;

      case "horizontalrule":
        return <hr key={index} className="my-8 border-gray-300" />;

      case "link":
        return (
          <a
            key={index}
            href={node.url}
            className="text-blue-600 hover:text-blue-800 underline"
            target={node.newTab ? "_blank" : undefined}
            rel={node.newTab ? "noopener noreferrer" : undefined}
          >
            {node.children?.map((child, childIndex) =>
              renderTextNode(child, childIndex)
            )}
          </a>
        );

      default:
        if (node.children) {
          return (
            <div key={index}>
              {node.children.map((child, childIndex) =>
                renderNode(child, childIndex)
              )}
            </div>
          );
        }
        return null;
    }
  };

  const renderTextNode = (node, index) => {
    if (typeof node === "string") {
      return node;
    }

    if (!node.text && node.text !== "") {
      return null;
    }

    let text = node.text;
    let element = <span key={index}>{text}</span>;

    if (node.bold) {
      element = (
        <strong key={index} className="semibold">
          {element}
        </strong>
      );
    }
    if (node.italic) {
      element = <em key={index}>{element}</em>;
    }
    if (node.underline) {
      element = <u key={index}>{element}</u>;
    }
    if (node.strikethrough) {
      element = <s key={index}>{element}</s>;
    }
    if (node.code) {
      element = (
        <code key={index} className="bg-gray-100 px-2 py-1 rounded text-small">
          {element}
        </code>
      );
    }

    return element;
  };

  return (
    <div className={className}>
      {content.root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
};

// Related Blog Card Component
const RelatedBlogCard = ({ blog }) => {
  if (!blog) return null;

  const formattedDate = new Date(
    blog.date || blog.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <a href={`/blog/${blog.slug}`} className="article-tile w-inline-block">
      {blog.mainImage?.cloudinaryUrl && (
        <div className="image-wrap-blog">
          <img
            src={blog.mainImage.cloudinaryUrl}
            loading="lazy"
            alt={blog.mainImage.alt || blog.title}
            sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
            className="image-cover"
          />
        </div>
      )}
      <div className="article-info-wrap">
        <div className="article-category-wrap">
          <div className="text-small">{blog.tag}</div>
          <div className="text-small opacity-50">·</div>
          <div className="text-small">{formattedDate}</div>
        </div>
        <div className="text-h5">{blog.title}</div>
      </div>
    </a>
  );
};

// Main Blog Post Component
const BlogPost = () => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (!params?.slug) {
      setLoading(false);
      return;
    }

    const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

    // const fetchBlogPost = async () => {
    //   try {
    //     setLoading(true);
    //     setError(null);

    //     const slug = decodeURIComponent(params.slug);
    //     console.log(slug, "yeh hi bhai");
    //     const response = await fetch(
    //       `https://rebar-xbackend.vercel.app/api/blog-posts?where[slug][equals]=${slug}&depth=2`
    //       // `http://localhost:3000/api/blog-posts?where[slug][equals]=${slug}&depth=2`
    //     );

    //     // https://rebar-xbackend.vercel.app/api/blog-posts?where[slug][equals]=${slug}&depth=2

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     const data = await response.json();

    //     if (data.docs?.length > 0) {
    //       setBlogData(data.docs[0]);
    //     } else {
    //       setError("Blog post not found");
    //     }
    //   } catch (err) {
    //     console.error("Failed to fetch blog post:", err);
    //     setError(err.message || "Failed to fetch blog post");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchBlogPost = async () => {
  try {
    setLoading(true);
    setError(null);

    const urlSlug = params.slug; // already clean
    console.log(urlSlug, "URL SLUG");

    // ⛔ DO NOT filter by slug here
    const response = await fetch(
      `https://rebar-xbackend.vercel.app/api/blog-posts?depth=2&limit=100`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const matchedPost = data.docs?.find(
      (post) => slugify(post.slug) === urlSlug
    );

    if (matchedPost) {
      setBlogData(matchedPost);
    } else {
      setError("Blog post not found");
    }
  } catch (err) {
    console.error("Failed to fetch blog post:", err);
    setError(err.message || "Failed to fetch blog post");
  } finally {
    setLoading(false);
  }
};
    fetchBlogPost();
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="section hero-article">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="w-layout-grid article-hero-halves">
            <div className="article-heading-wrap">
              <div className="article-top-tile">
                <div className="article-category-wrap">
                  <div className="text-small semibold animate-pulse bg-gray-200 h-4 w-20"></div>
                  <div className="text-small opacity-50">·</div>
                  <div className="text-small animate-pulse bg-gray-200 h-4 w-32"></div>
                </div>
                <div className="text-h1 animate-pulse bg-gray-200 h-12 w-3/4"></div>
              </div>
            </div>
            <div className="article-big-thumbnail animate-pulse bg-gray-200 h-64"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section hero-article">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="text-center">
            <div className="text-small text-red-600 mb-4">Error: {error}</div>
            <a href="/blog" className="article-tile w-inline-block">
              ← Back to Blog
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="section hero-article">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="text-center">
            <div className="text-small mb-4">Blog post not found</div>
            <a href="/blog" className="article-tile w-inline-block">
              ← Back to Blog
            </a>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(
    blogData.date || blogData.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log(blogData, "this is blogdata");

  return (
    <div>
    <section className="blog-hero-modern">
  {blogData.mainImage?.cloudinaryUrl && (
    <div className="blog-hero-bg">
      <img
        src={blogData.mainImage.cloudinaryUrl}
        alt={blogData.mainImage.alt || blogData.title}
      />
    </div>
  )}

  <div className="blog-hero-inner">
    <div className="blog-hero-meta">
      <span>{blogData.tag}</span>
      <span>·</span>
      <span>{formattedDate}</span>
    </div>

    <h1 className="blog-hero-title">
      {blogData.title}
    </h1>
  </div>
</section>


     <section className="blog-body">
  <div className="blog-container">

    {/* Article Content */}
    <article id="Article" className="blog-content">
      <LexicalContentRenderer content={blogData.content} />
    </article>

  </div>
</section>

      <br />
      <br />
      <br />

      {/* {blogData.relatedBlogs && blogData.relatedBlogs.length > 0 && ( */}
      <section className="section related-blog-section">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="headline-related">
            <h3 className="no-margins">Latest articles</h3>
          </div>
          <div className="related-block w-dyn-list">
            <div role="list" className="blog-thirds w-dyn-items">
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
                        srcset="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-500.jpg 500w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-800.jpg 800w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-1080.jpg 1080w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-1600.jpg 1600w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-2000.jpg 2000w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-2600.jpg 2600w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-3200.jpg 3200w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow.jpg 3888w"
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
              {/* {blogData.relatedBlogs &&
                  blogData.relatedBlogs.length > 0 &&
                  blogData.relatedBlogs.map((bb, index) => (
                    <div role="listitem" className="w-dyn-item">
                      <Link
                        href={bb.slug}
                        className="article-tile w-inline-block"
                      >
                        <div className="image-wrap-blog">
                          <img
                            alt=""
                            loading="lazy"
                            src={bb.mainImage.url}
                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                            className="image-cover"
                          />
                        </div>
                        <div className="article-info-wrap">
                          <div className="article-category-wrap">
                                      <div className="text-small">{ bb.tag}</div>
                            <div className="text-small opacity-50">·</div>
                            <div className="text-small">November 13, 2024</div>
                          </div>
                          <div className="text-h5">
                           {bb.title}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))} */}

              {blogData.relatedBlogs &&
                blogData.relatedBlogs.length > 0 &&
                blogData.relatedBlogs.map((bb, index) => (
                  <div
                    key={bb.id || index}
                    role="listitem"
                    className="w-dyn-item"
                  >
                    <Link
                      href={`/blog/${encodeURIComponent(bb.slug)}`}
                      className="article-tile w-inline-block"
                    >
                      <div className="image-wrap-blog">
                        <img
                          alt={bb.mainImage?.alt || bb.title}
                          loading="lazy"
                          src={bb.mainImage?.cloudinaryUrl}
                          sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
                          className="image-cover"
                        />
                      </div>
                      <div className="article-info-wrap">
                        <div className="article-category-wrap">
                          <div className="text-small">{bb.tag}</div>
                          <div className="text-small opacity-50">·</div>
                          <div className="text-small">
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
            </div>
          </div>
        </div>
      </section>
      {/* )} */}
    </div>
  );
};

export default BlogPost;
