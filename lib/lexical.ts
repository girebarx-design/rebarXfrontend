/**
 * Payload stores rich text as a Lexical tree. The comparison block packs
 * every spec into ONE rich-text field as separate paragraphs, so flattening
 * to a single string runs them together. These helpers keep paragraphs apart.
 */

function textOf(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (typeof node.text === "string") return node.text;
  return (node.children ?? []).map(textOf).join("");
}

/** Returns each paragraph / list-item as its own trimmed line. */
export function toLines(node: any): string[] {
  const out: string[] = [];
  const walk = (n: any) => {
    if (!n) return;
    const kids = n.children ?? n.root?.children ?? [];
    for (const k of kids) {
      if (k?.type === "paragraph" || k?.type === "listitem" || k?.type === "heading") {
        const t = textOf(k).replace(/ /g, " ").trim();
        if (t) out.push(t);
      } else {
        walk(k);
      }
    }
  };
  walk(node);
  return out;
}

/** Splits "Tensile Strength: 250-500 MPa" into label + value. */
export function toSpecs(node: any): { label: string; value: string }[] {
  return toLines(node).map((line) => {
    const i = line.indexOf(":");
    if (i === -1) return { label: line, value: "" };
    return {
      label: line.slice(0, i).trim(),
      value: line.slice(i + 1).trim(),
    };
  });
}
