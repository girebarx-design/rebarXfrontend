"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sendEvent(name: string, params: Record<string, unknown>) {
  // The site loads gtag.js directly (Measurement ID G-BHKECRCEZM, injected
  // via the CMS's customHeadScripts field) — there is no GTM container in
  // front of it. That means gtag() is the actual send mechanism; pushing a
  // plain object onto window.dataLayer does nothing on its own, since only
  // gtag()'s own arguments-object pushes are understood by gtag.js's
  // runtime. window.gtag may not exist yet on first paint (script loads
  // async) or at all if a consent/blocker stripped it — skip quietly.
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

const SCROLL_MILESTONES = [25, 50, 75, 90, 100];

/**
 * Section-visibility and scroll-depth tracking, sent as real GA4 events
 * (section_view, scroll_depth) via gtag(). Both show up under GA4 →
 * Reports → Engagement → Events once fired; section_name and percent need
 * to be registered as custom dimensions (Admin → Custom definitions) to be
 * usable as report dimensions rather than just raw event parameters.
 *
 * Watches elements carrying data-section (added to the homepage's major
 * blocks) plus #calculator (SlabCalculator's own root id) as a fallback for
 * a component this file doesn't own. Each section fires at most once per
 * page load, at 15% visibility — sections here range from ~300px to over
 * 1500px tall, far taller than most viewports, so requiring 50% of the
 * *entire section* on-screen at once would rarely fire for the taller ones.
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
          sendEvent("section_view", {
            section_name: name,
            page_path: window.location.pathname,
          });
          observer.unobserve(el);
        }
      },
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
            sendEvent("scroll_depth", {
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
