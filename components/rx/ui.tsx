import Link from "next/link";
import React from "react";

export function Arrow() {
  return (
    <svg
      className="rx-arw"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m3 8.5 3.2 3.2L13 5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Dot() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" fill="currentColor" />
    </svg>
  );
}

export function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 2 2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2Z" />
    </svg>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="rx-eyebrow">{children}</p>;
}

export function Btn({
  href,
  variant,
  children,
}: {
  href: string;
  variant?: "brass" | "ghost";
  children: React.ReactNode;
}) {
  const cls = `rx-btn${variant ? ` rx-btn--${variant}` : ""}`;
  const external = /^https?:\/\//.test(href) && !href.includes("rebarx.in");
  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <Arrow />
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}
