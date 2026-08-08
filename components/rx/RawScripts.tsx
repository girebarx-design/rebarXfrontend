import Script from "next/script";

/**
 * Renders a CMS-editable "paste your tracking snippet here" field safely.
 *
 * These fields are freeform HTML — an editor might paste one <script src>
 * tag, one inline <script>...</script> block, or several of each, often
 * preceded by an explanatory HTML comment. Wrapping that whole string in a
 * single outer <script dangerouslySetInnerHTML> (the previous approach) is
 * invalid: the browser's HTML parser closes the outer tag at the FIRST
 * </script> it finds inside the string, truncating everything after it and
 * throwing real parse errors — this was firing a genuine SyntaxError in
 * production. Rendering the same string via a <div dangerouslySetInnerHTML>
 * avoids the parse error but silently never executes the scripts at all
 * (browsers don't run script tags injected via innerHTML).
 *
 * This extracts each <script> block and renders it as its own managed
 * next/script element, which is the only approach that both parses
 * correctly and actually executes.
 */
export default function RawScripts({
  html,
  idPrefix,
  strategy = "afterInteractive",
}: {
  html?: string | null;
  idPrefix: string;
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload";
}) {
  if (!html) return null;

  const blocks: { src?: string; inline?: string }[] = [];
  const scriptRe = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = scriptRe.exec(html))) {
    const attrs = match[1] || "";
    const body = match[2] || "";
    const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
    if (srcMatch) {
      blocks.push({ src: srcMatch[1] });
    } else if (body.trim()) {
      blocks.push({ inline: body });
    }
  }

  if (!blocks.length) return null;

  return (
    <>
      {blocks.map((b, i) =>
        b.src ? (
          <Script key={`${idPrefix}-${i}`} id={`${idPrefix}-${i}`} src={b.src} strategy={strategy} />
        ) : (
          <Script key={`${idPrefix}-${i}`} id={`${idPrefix}-${i}`} strategy={strategy}>
            {b.inline}
          </Script>
        )
      )}
    </>
  );
}
