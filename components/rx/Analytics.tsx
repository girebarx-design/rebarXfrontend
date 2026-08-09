"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

function push(event: Record<string, unknown>) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}

const SCROLL_MILESTONES = [25, 50, 75, 90, 100];

/**
 * Section-visibility and scroll-depth tracking, pushed to the existing GTM
 * dataLayer (see app/layout.tsx's GTM snippet) rather than calling gtag
 * directly — GTM is already the site's single script-injection point, so a
 * GA4 tag with a Custom Event trigger on "section_view" / "scroll_depth" is
 * the way to surface these in GA4 without adding a second tracking script.
 * That trigger/tag pairing is a GTM admin-side step, not something this
 * code can configure on its own.
 *
 * Watches elements carrying data-section (added to the homepage's major
 * blocks) plus #calculator (SlabCalculator's own root id) as a fallback for
 * a component this file doesn't own. Each section fires at most once per
 * page load, at 50% visibility — that's "the visitor actually saw this",
 * not "it merely entered the viewport edge".
 */
export default function Analytics() {
  const pathname = usePathname();

  // Re-runs on every client-side route change (App Router doesn't full-
  // reload on Link navigation) so each page gets its own fresh section/
  // scroll tracking instead of only firing once for whichever page loaded
  // first.
  useEffect(() => {
    const seenSections = new Set<string>();
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section], #calculator")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const name = el.dataset.section ?? el.id;
          if (!name || seenSections.has(name)) continue;
          seenSections.add(name);
          push({
            event: "section_view",
            section_name: name,
            page_path: window.location.pathname,
          });
          observer.unobserve(el);
        }
      },
      // 0.15 rather than 0.5 — sections here range from ~300px to over
      // 1500px tall, far taller than most viewports, so requiring half the
      // *entire section* on-screen at once would rarely fire at all for
      // the taller ones. 15% is "the visitor genuinely scrolled into this
      // section", not just grazed its top edge.
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));

    const seenDepths = new Set<number>();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrolled = window.scrollY + window.innerHeight;
        const total = doc.scrollHeight;
        const pct = total > 0 ? Math.round((scrolled / total) * 100) : 0;
        for (const milestone of SCROLL_MILESTONES) {
          if (pct >= milestone && !seenDepths.has(milestone)) {
            seenDepths.add(milestone);
            push({
              event: "scroll_depth",
              percent: milestone,
              page_path: window.location.pathname,
            });
          }
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
