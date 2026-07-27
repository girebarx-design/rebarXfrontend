import Link from "next/link";



export default function CTA({ cta }) {
    return (
      <section className="section cta-section">
        <div
          className="cta-video"
          style={{ backgroundColor: cta.backgroundColor }}
        >
          <div className="w-layout-blockcontainer main-container w-container">
            <div className="cta-master">
              <div className="cta-top-tile">
                <div className="label">{cta.smallHeading}</div>
                <div className="heading-cta">
                  <div className="text-h1">{cta.title}</div>
                </div>
              </div>
              <div className="cta-button-wrap">
                <Link
                  href={cta.button1.link}
                  target="_blank"
                  className="cta-main accent w-inline-block"
                  style={{
                    backgroundColor: cta.button1.backgroundColor,
                    color: cta.button1.textColor,
                  }}
                >
                  <div className="button-animation-hide">
                    <div className="button-animation-wrap">
                      <div className="button-content-tile">
                        <div>{cta.button1.label}</div>
                        <div className="button-arrow w-embed">
                          <svg
                            width="7"
                            height="10"
                            viewBox="0 0 7 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 9L5 5L1 1"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      </div>
                      {/* <div className="button-content-tile bottom-tile">
                        <div>Contact us</div>
                        <div className="button-arrow w-embed">
                          <svg
                            width="7"
                            height="10"
                            viewBox="0 0 7 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 9L5 5L1 1"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </Link>
                <Link
                  href={cta.button2.link}
                  className="cta-booking w-inline-block"
                  style={{
                    backgroundColor: cta.button2.backgroundColor,
                    color: cta.button2.textColor,
                    alignItems: "center",
                  }}
                                
                >
                  <div className="cta-image-wrap">
                    {/* <img
                      src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064f0f_Button%20Image.webp"
                      loading="lazy"
                      alt=""
                      className="image-cover"
                    /> */}
                  </div>
                  <div
                    className="text-body semibold"
                    style={{ alignItems: "center", marginLeft: "-20px" }}
                  >
                    {cta.button2.label}
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div
            data-w-id="6d31e448-0cad-78cf-9898-37953bfbda47"
            className="cta-circle-regular"
          ></div>
          <div
            data-w-id="5705fcc2-f633-58e3-1c4e-f911fd308ab2"
            className="cta-circle-big"
          ></div>
          <div
            data-w-id="6fae3469-06b3-95c8-5c38-abda8ce051ed"
            className="cta-circle-small"
          ></div>
        </div>
      </section>
    );
}