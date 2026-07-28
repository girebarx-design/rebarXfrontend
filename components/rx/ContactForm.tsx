"use client";

import { useState } from "react";
import { Arrow } from "./ui";

type Field = { label: string; name: string; type: string; required?: boolean };

export default function ContactForm({ fields }: { fields: Field[] }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  const set = (name: string, v: string) =>
    setValues((p) => ({ ...p, [name]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch(
        "https://rebar-xbackend.vercel.app/api/contact-submissions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData: values }),
        }
      );
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      setValues({});
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rx-form rx-form--done" role="status">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="m7 12.5 3.2 3.2L17 9"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3>Thank you — we&rsquo;ve got your enquiry.</h3>
        <p>
          Our team typically responds within one working day. For anything
          urgent, message us on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form className="rx-form" onSubmit={submit} noValidate={false}>
      {fields.map((f) => {
        const isArea =
          f.type === "textarea" && f.name.toLowerCase().includes("message");
        const type =
          f.name.toLowerCase().includes("mobile") ||
          f.name.toLowerCase().includes("phone")
            ? "tel"
            : f.type === "textarea"
            ? "text"
            : f.type;
        return (
          <div
            className={`rx-field${isArea ? " rx-field--wide" : ""}`}
            key={f.name}
          >
            <label htmlFor={f.name}>
              {f.label}
              {f.required ? <span aria-hidden="true"> *</span> : null}
            </label>
            {isArea ? (
              <textarea
                id={f.name}
                name={f.name}
                rows={5}
                required={f.required}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder="Tell us about your project — element type, quantity, and location."
              />
            ) : (
              <input
                id={f.name}
                name={f.name}
                type={type}
                required={f.required}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                autoComplete={
                  type === "email"
                    ? "email"
                    : type === "tel"
                    ? "tel"
                    : f.name.toLowerCase().includes("name")
                    ? "name"
                    : "on"
                }
              />
            )}
          </div>
        );
      })}

      <div className="rx-field rx-field--wide rx-form__foot">
        <button className="rx-btn" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send enquiry"}
          <Arrow />
        </button>
        {state === "error" ? (
          <p className="rx-form__err" role="alert">
            Something went wrong. Please try WhatsApp or email us directly.
          </p>
        ) : null}
      </div>
    </form>
  );
}
