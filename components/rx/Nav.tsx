"use client";

import Link from "next/link";
import { useState } from "react";
import { Btn } from "./ui";

type NavLink = { label: string; url: string };

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
