

export default function Science({ science  }) {
  return (
    <section
      className="section features-section"
      style={{ backgroundColor: science.bgColor }}
    >
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="w-layout-grid feature-halves-home-b">
          <div className="feature-left-home-b">
            <div className="headline-features-home-b">
              <div className="section-divider"></div>
              <div className="label">{science.subheading}</div>
              <div className="heading-features-home-b">
                <div className="text-h1">{science.heading}</div>
                {/* <div className="text-h1">behind</div> */}
                {/* <!-- <div className="heading-line-semi-light"></div> -->
                <div className="text-h1">better</div>
                <!-- <div className="text-h1">a</div> --> */}
                {/* <div className="text-h1">building</div> */}
              </div>
            </div>
            <div className="features-list-home-b">
              {science.facts.map((fac, index) => (
                <div className="feature-item-home-b" key={fac.id || index}>
                  <div className="feature-top-tile">
                    <div className="tick-features w-embed">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="text-h6">{fac.title}</div>
                  </div>
                  <div className="feature-bottom-text">
                    <p className="text-big text-semi-light">
                      {fac.description}
                    </p>
                  </div>
                </div>
              ))}
              {/* <div className="feature-item-home-b">
                <div className="feature-top-tile">
                  <div className="tick-features w-embed">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="text-h6">How is it made?</div>
                </div>
                <div className="feature-bottom-text">
                  <p className="text-big text-semi-light">
                    Glass fibers are impregnated with resin and cured in a
                    pultrusion process, then sand-coated for better bonding with
                    concrete.
                  </p>
                </div>
              </div>
              <div className="feature-item-home-b">
                <div className="feature-top-tile">
                  <div className="tick-features w-embed">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="text-h6">Key Properties</div>
                </div>
                <div className="feature-bottom-text">
                  <p className="text-big text-semi-light">
                    High tensile strength, corrosion resistance,
                    non-conductivity, and long-term durability (up to 100
                    years).
                  </p>
                </div>
              </div> */}
            </div>
          </div>
          <div className="features-image-home-b">
            <img
              src={science.mainImage.cloudinaryUrl}
              loading="lazy"
              sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 991px) 94vw, 95vw"
              alt=""
              className="image-cover"
            />
          </div>
        </div>
      </div>
      <div
        data-w-id="e76f6309-de15-99f8-8a53-e3fac52f7a1a"
        className="circle-features"
      ></div>
    </section>
  );
}