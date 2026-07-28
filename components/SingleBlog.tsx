import Link from "next/link";
import { slugify } from "@/lib/cms";

// Lexical Content Renderer
const LexicalContentRenderer = ({ content, className = "" }: any) => {
  if (!content?.root?.children) {
    return <div className={className}>No content available</div>;
  }

  const renderTextNode = (node: any, index: number) => {
    if (typeof node === "string") return node;
    if (!node.text && node.text !== "") return null;

    let element = <span key={index}>{node.text}</span>;
    if (node.bold)
      element = (
        <strong key={index} className="semibold">
          {element}
        </strong>
      );
    if (node.italic) element = <em key={index}>{element}</em>;
    if (node.underline) element = <u key={index}>{element}</u>;
    if (node.strikethrough) element = <s key={index}>{element}</s>;
    if (node.code)
      element = (
        <code key={index} className="bg-gray-100 px-2 py-1 rounded text-small">
          {element}
        </code>
      );
    return element;
  };

  const renderNode = (node: any, index: number): any => {
    switch (node.type) {
      case "paragraph":
        if (!node.children || node.children.length === 0) {
          return <br key={index} />;
        }
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {node.children.map((child: any, i: number) => renderTextNode(child, i))}
          </p>
        );

      case "heading": {
        if (!node.children || node.children.length === 0) return null;
        // The CMS stores the full tag ("h2", "h3", ...), not just the level.
        const raw = String(node.tag || "h2");
        const Tag = (/^h[1-6]$/.test(raw) ? raw : "h2") as any;
        const headingClasses: Record<string, string> = {
          h1: "article-h1",
          h2: "article-h2",
          h3: "article-h3",
          h4: "article-h4",
          h5: "article-h5",
          h6: "article-h6",
        };
        return (
          <Tag key={index} className={headingClasses[Tag] || headingClasses.h2}>
            {node.children.map((child: any, i: number) => renderTextNode(child, i))}
          </Tag>
        );
      }

      case "list": {
        const ListTag = node.listType === "number" ? "ol" : "ul";
        const listClasses =
          node.listType === "number"
            ? "list-decimal list-inside mb-4 ml-4 space-y-2"
            : "list-disc list-inside mb-4 ml-4 space-y-2";
        const Tag = ListTag as any;
        return (
          <Tag key={index} className={listClasses}>
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </Tag>
        );
      }

      case "listitem":
        return (
          <li key={index} className="mb-2">
            {node.children?.map((child: any, i: number) => {
              if (child.type === "paragraph") {
                return (
                  <p key={i} className="m-0">
                    {child.children?.map((tc: any, ti: number) => renderTextNode(tc, ti))}
                  </p>
                );
              }
              if (child.type === "text") return renderTextNode(child, i);
              return renderNode(child, i);
            })}
          </li>
        );

      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-blue-500 pl-6 italic mb-6 bg-gray-50 py-4"
          >
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
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
              {node.value.caption ? (
                <p className="text-small text-center mt-3 italic">
                  {node.value.caption}
                </p>
              ) : null}
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
            {node.children?.map((child: any, i: number) => renderTextNode(child, i))}
          </a>
        );

      default:
        if (node.children) {
          return (
            <div key={index}>
              {node.children.map((child: any, i: number) => renderNode(child, i))}
            </div>
          );
        }
        return null;
    }
  };

  return (
    <div className={className}>
      {content.root.children.map((node: any, index: number) => renderNode(node, index))}
    </div>
  );
};

export default function BlogPost({ blogData }: { blogData: any }) {
  const formattedDate = new Date(
    blogData.date || blogData.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <section className="blog-hero-modern">
        {blogData.mainImage?.cloudinaryUrl ? (
          <div className="blog-hero-bg">
            <img
              src={blogData.mainImage.cloudinaryUrl}
              alt={blogData.mainImage.alt || blogData.title}
            />
          </div>
        ) : null}

        <div className="blog-hero-inner">
          <div className="blog-hero-meta">
            <span>{blogData.tag}</span>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>
          <h1 className="blog-hero-title">{blogData.title}</h1>
        </div>
      </section>

      <section className="blog-body">
        <div className="blog-container">
          <article id="Article" className="blog-content">
            <LexicalContentRenderer content={blogData.content} />
          </article>
        </div>
      </section>

      <br />
      <br />
      <br />

      {blogData.relatedBlogs && blogData.relatedBlogs.length > 0 ? (
        <section className="section related-blog-section">
          <div className="w-layout-blockcontainer main-container w-container">
            <div className="headline-related">
              <h3 className="no-margins">Latest articles</h3>
            </div>
            <div className="related-block w-dyn-list">
              <div role="list" className="blog-thirds w-dyn-items">
                {blogData.relatedBlogs.map((bb: any, index: number) => (
                  <div key={bb.id || index} role="listitem" className="w-dyn-item">
                    <Link
                      href={`/blog/${slugify(bb.slug)}`}
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
                            {new Date(bb.date || bb.createdAt).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "short", day: "numeric" }
                            )}
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
      ) : null}
    </div>
  );
}
