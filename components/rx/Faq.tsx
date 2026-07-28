"use client";

import { useState } from "react";

export default function Faq({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="rx-faq__list">
      {items.map((f, i) => (
        <div className="rx-faq__item" key={i} data-open={open === i}>
          <h3 style={{ margin: 0 }}>
            <button
              className="rx-faq__q"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {f.question}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M9 3v12M3 9h12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </h3>
          <div className="rx-faq__a">
            <div>
              <p>{f.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
