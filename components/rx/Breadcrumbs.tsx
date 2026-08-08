import Link from "next/link";

export type Crumb = { label: string; href?: string };

/**
 * Renders visible breadcrumb navigation and emits matching BreadcrumbList
 * JSON-LD. The last crumb is the current page — pass it without an href.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://www.rebarx.in${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="rx-breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {items.map((item, i) => (
            <li key={item.label}>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
              {i < items.length - 1 ? (
                <span className="rx-breadcrumbs__sep" aria-hidden="true">
                  /
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
