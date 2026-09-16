"use client";

import { Eyebrow, Btn } from "@/components/rx/ui";
import Breadcrumbs from "@/components/rx/Breadcrumbs";
import { cldOptimize } from "@/lib/cms";
import { useT } from "@/lib/i18n/useT";

const ELEMENT_LABELS: Record<string, string> = {
  slab: "Slab",
  columns: "Columns",
  beams: "Beams",
  wall: "Boundary / Retaining Wall",
  foundation: "Foundation",
  pavement: "Road / Pavement",
  other: "Other",
};

/** CMS date is month-precision, so day-of-month would be noise. */
function monthYear(value?: string | null): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

type Album = {
  id?: string;
  slug?: string;
  title?: string;
  city?: string;
  state?: string;
  date?: string;
  elements?: string[];
  summary?: string;
  photos?: any[];
};

export default function ApplicationsContent({ albums }: { albums: Album[] }) {
  const t = useT();

  return (
    <main>
      <Breadcrumbs
        items={[{ label: t("common.home"), href: "/" }, { label: t("applicationsPage.breadcrumb") }]}
      />

      <section className="rx-section">
        <div className="rx-wrap">
          <div className="rx-head">
            <Eyebrow>{t("applicationsPage.eyebrow")}</Eyebrow>
            <h1>{t("applicationsPage.h1")}</h1>
            <p>{t("applicationsPage.intro")}</p>
          </div>
        </div>
      </section>

      {albums.length === 0 ? (
        <section className="rx-section">
          <div className="rx-wrap">
            <p>{t("applicationsPage.empty")}</p>
          </div>
        </section>
      ) : (
        albums.map((album) => {
          const when = monthYear(album.date);
          const place = [album.city, album.state].filter(Boolean).join(", ");
          const photos = (album.photos ?? []).filter((p) => p && (p.cloudinaryUrl || p.url));

          return (
            <section className="rx-section rx-gal" key={album.id ?? album.slug}>
              <div className="rx-wrap">
                <div className="rx-head">
                  <h2>{album.title}</h2>
                  <p className="rx-gal__meta">
                    {place}
                    {when ? ` · ${when}` : ""}
                  </p>
                </div>

                {album.elements?.length ? (
                  <ul className="rx-areas rx-gal__tags">
                    {album.elements.map((e) => (
                      <li key={e}>
                        <span className="rx-areas__chip">{ELEMENT_LABELS[e] ?? e}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {album.summary ? <p className="rx-gal__summary">{album.summary}</p> : null}

                <div className="rx-gal__grid">
                  {photos.map((p, i) => {
                    const src = cldOptimize(p.cloudinaryUrl || p.url);
                    return (
                      <a
                        className="rx-gal__item"
                        key={p.id ?? i}
                        href={p.cloudinaryUrl || p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={src}
                          alt={p.alt || `${album.title} — RebarX GFRP rebar on site`}
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })
      )}

      <section className="rx-section rx-cta rx-on-dark">
        <div className="rx-wrap">
          <p className="rx-eyebrow">RebarX India</p>
          <h2>{t("applicationsPage.ctaHeading")}</h2>
          <div className="rx-cta__row">
            <Btn href="/contact" variant="brass">
              {t("common.talkToEngineer")}
            </Btn>
          </div>
        </div>
      </section>
    </main>
  );
}
