import { toSpecs, toLines } from "@/lib/lexical";
import { Check } from "./ui";

/**
 * The CMS ships three "comparison sections": RebarX specs, TMT specs, and a
 * list of RebarX advantages. The first two share the same 8 spec labels in the
 * same order, so they belong in a single side-by-side table rather than in
 * separate cards. The third is a different kind of content (benefits, not
 * specs) and gets its own band underneath.
 */
export default function ComparisonTable({ sections }: { sections: any[] }) {
  const rebarx = sections.find((s) => s.sectionTitle === "gfrp") ?? sections[0];
  const tmt = sections.find((s) => s.sectionTitle === "tmt") ?? sections[1];
  const extra =
    sections.find((s) => s.sectionTitle === "common") ?? sections[2];

  const aSpecs = toSpecs(rebarx?.properties?.[0]?.property);
  const bSpecs = toSpecs(tmt?.properties?.[0]?.property);

  // Pair rows by label so the two columns always line up.
  const rows = aSpecs.map((a, i) => {
    const match =
      bSpecs.find(
        (b) => b.label.toLowerCase() === a.label.toLowerCase()
      ) ?? bSpecs[i];
    return { label: a.label, a: a.value, b: match?.value ?? "—" };
  });

  const advantages = toLines(extra?.properties?.[0]?.property);

  return (
    <>
      <div className="rx-spec" role="table" aria-label="RebarX compared with TMT steel rebar">
        <div className="rx-spec__head" role="row">
          <span className="rx-spec__cell rx-spec__cell--label" role="columnheader">
            Property
          </span>
          <span
            className="rx-spec__cell rx-spec__cell--a"
            role="columnheader"
          >
            <span className="rx-spec__brand">
              {rebarx?.logo?.cloudinaryUrl ? (
                <img src={rebarx.logo.cloudinaryUrl} alt="" />
              ) : null}
              {rebarx?.title ?? "RebarX"}
            </span>
            <span className="rx-spec__tag">GFRP</span>
          </span>
          <span className="rx-spec__cell rx-spec__cell--b" role="columnheader">
            {tmt?.title ?? "TMT Steel Rebar"}
          </span>
        </div>

        {rows.map((r) => (
          <div className="rx-spec__row" role="row" key={r.label}>
            <span className="rx-spec__cell rx-spec__cell--label" role="cell">
              {r.label}
            </span>
            <span className="rx-spec__cell rx-spec__cell--a" role="cell">
              <span className="rx-spec__k">RebarX</span>
              <span className="rx-spec__v">
                <Check />
                {r.a}
              </span>
            </span>
            <span className="rx-spec__cell rx-spec__cell--b" role="cell">
              <span className="rx-spec__k">TMT Steel</span>
              <span className="rx-spec__v">{r.b}</span>
            </span>
          </div>
        ))}

        <div className="rx-spec__row rx-spec__row--foot" role="row">
          <span className="rx-spec__cell rx-spec__cell--label" role="cell">
            Best suited for
          </span>
          <span className="rx-spec__cell rx-spec__cell--a" role="cell">
            <span className="rx-spec__k">RebarX</span>
            <span className="rx-spec__v">{rebarx?.bestFor}</span>
          </span>
          <span className="rx-spec__cell rx-spec__cell--b" role="cell">
            <span className="rx-spec__k">TMT Steel</span>
            <span className="rx-spec__v">{tmt?.bestFor}</span>
          </span>
        </div>
      </div>

      {advantages.length ? (
        <div className="rx-adv">
          <div className="rx-adv__intro">
            <h3>{extra?.title ?? "Why RebarX outperforms"}</h3>
            {extra?.description ? <p>{extra.description}</p> : null}
          </div>
          <ul className="rx-adv__list">
            {advantages.map((a, i) => (
              <li key={i}>
                <Check />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
