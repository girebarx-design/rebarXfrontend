import Link from "next/link";

type L = { label: string; url: string };

export default function Footer({
  logo,
  company = [],
  legal = [],
  social = [],
  phone,
}: {
  logo?: string;
  company?: L[];
  legal?: L[];
  social?: L[];
  phone?: string;
}) {
  const year = 2026;

  return (
    <footer className="rx-foot">
      <div className="rx-wrap">
        <div className="rx-foot__top">
          <div className="rx-foot__brand">
            {logo ? <img src={logo} alt="RebarX" /> : null}
            <p>
              RebarX manufactures GFRP reinforcement bar in Central India —
              rust-free, twice the tensile strength of steel, and built for a
              hundred-year service life.
            </p>
          </div>

          {company.length ? (
            <div className="rx-foot__col">
              <h4>Company</h4>
              {company.map((l) => (
                <Link key={l.url + l.label} href={l.url}>
                  {l.label}
                </Link>
              ))}
            </div>
          ) : null}

          {legal.length ? (
            <div className="rx-foot__col">
              <h4>Legal</h4>
              {legal.map((l) => (
                <Link key={l.url + l.label} href={l.url}>
                  {l.label}
                </Link>
              ))}
            </div>
          ) : null}

          <div className="rx-foot__col">
            <h4>Get in touch</h4>
            {phone ? <a href={`tel:+91${phone}`}>+91 {phone}</a> : null}
            {social.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="rx-foot__btm">
          <span>
            © {year} Credific Ventures Private Limited. All rights reserved.
          </span>
          <span>Made in Madhya Pradesh, India</span>
        </div>
      </div>
    </footer>
  );
}
