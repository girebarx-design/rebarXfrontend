"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Btn } from "./ui";
import { DOWNLOADS } from "@/lib/downloads";
import { useT } from "@/lib/i18n/useT";
import LanguageToggle from "./LanguageToggle";

type NavLink = { label: string; url: string };

function DownloadsMenu({ onPick }: { onPick: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = useT();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <div className="rx-nav__dd" ref={ref}>
      <button
        className="rx-nav__link rx-nav__dd-btn"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        {t("nav.downloads")}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path
            d="m2 3.5 3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <div className="rx-nav__dd-menu" role="menu">
          {DOWNLOADS.map((d) => (
            <a
              key={d.href}
              href={d.href}
              download
              role="menuitem"
              className="rx-nav__dd-item"
              onClick={() => {
                setOpen(false);
                onPick();
              }}
            >
              <b>{d.label}</b>
              <small>{d.meta}</small>
            </a>
          ))}
          <Link
            href="/resources"
            role="menuitem"
            className="rx-nav__dd-item rx-nav__dd-item--all"
            onClick={() => {
              setOpen(false);
              onPick();
            }}
          >
            <b>{t("nav.viewAllResources")}</b>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default function Nav({
  logo,
  links,
  cta,
}: {
  logo?: string;
  links: NavLink[];
  cta?: NavLink;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="rx-nav">
      <div className="rx-wrap rx-nav__in">
        <Link href="/" className="rx-nav__brand" aria-label="RebarX home">
          {logo ? (
            <img src={logo} alt="RebarX" />
          ) : (
            <strong style={{ fontSize: "1.2rem", letterSpacing: "-0.03em" }}>
              RebarX
            </strong>
          )}
        </Link>

        {/* Lives outside .rx-nav__links so it's reachable on mobile without
            opening the burger menu — that's the primary viewing medium for
            most visitors, and a language switch buried in a submenu isn't
            a "prominent toggle". */}
        <LanguageToggle />

        <nav
          className={`rx-nav__links${open ? " rx-nav__links--open" : ""}`}
          aria-label="Primary"
        >
          {links.map((l) => (
            <Link
              key={l.url + l.label}
              href={l.url}
              className="rx-nav__link"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          {/* Desktop: dropdown. In the mobile panel the menu renders inline
              under the trigger, so the same component serves both. */}
          <DownloadsMenu onPick={() => setOpen(false)} />

          {/* The header CTA is hidden on small screens, so repeat it here. */}
          {cta ? (
            <Link
              href={cta.url}
              className="rx-nav__link rx-nav__link--cta"
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </Link>
          ) : null}
        </nav>

        {cta ? (
          <div className="rx-nav__cta">
            <Btn href={cta.url}>{cta.label}</Btn>
          </div>
        ) : null}

        <button
          className="rx-nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <path
                d="M5 5l12 12M17 5 5 17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h16M3 11h16M3 16h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
