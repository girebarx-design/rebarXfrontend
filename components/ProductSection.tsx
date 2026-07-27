import Link from "next/link";



export default function ProductSection({ productSection }) {
  return (
    <section
      className="section home-b-about-template"
      style={{ backgroundColor: productSection.sectionBgColor }}
    >
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="heading-home-b-about">
          <div className="text-h1">{productSection.sectionTitle}</div>
          {/* <div className="text-h1">solutions</div>
          <div className="heading-line-semi-dark"></div>
          <div className="text-h1">for</div>
          <div className="text-h1">strength</div> */}
        </div>
        <div className="w-layout-grid home-b-about-b-grid">
          {/* <div
            id="w-node-e106a09e-d9b8-b472-a1fe-00f18e4443c8-e2064dc4"
            className="home-b-about-image"
          >
            <img
              src={productSection.imageOne.cloudinaryUrl}
              loading="lazy"
              sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 991px) 94vw, 95vw"
              alt=""
              className="image-cover"
            />
          </div>
          <div className="home-b-about-image">
            <img
              src={productSection.imageTwo.cloudinaryUrl}
              loading="lazy"
              sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 991px) 94vw, 95vw"
              alt=""
              className="image-cover"
            />
          </div> */}
        </div>
        <div className="w-layout-grid case-halves-home-b">
          {/* {productSection.products.map((pr, index) => (
            <div className="home-b-about-tile">
              <div className="icon-home-b-about w-embed">
                
                <img src={pr.logo.cloudinaryUrl} alt="" />
              </div>
              <div className="about-tile-text-wrap">
                <div className="text-h6">
                  <strong>{pr.title}</strong>
                </div>
                <div className="text-body">{pr.bio}</div>
              </div>
            </div>
          ))} */}

          {productSection.products.map((pr, index) => (
            <div
              key={pr.id || index}
              id="w-node-d3fc33a7-4793-5f6e-7bc4-31a4856e0ae8-e2064dc4"
              data-w-id="d3fc33a7-4793-5f6e-7bc4-31a4856e0ae8"
              // href={`blog/`}
              className="case-card-home-b long w-inline-block"
              style={{ backgroundColor: pr.bgColor }}
            >
              <div className="case-card-image">
                <img
                  // src={blo.mainImage.cloudinaryUrl}
                  src={pr.image.cloudinaryUrl}
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 81vw, (max-width: 991px) 85vw, 89vw"
                  alt=""
                  className="image-cover"
                />
              </div>
              <div className="case-home-b-bottom-tile">
                <h3 className="no-margins">{pr.title}</h3>
                <div className="text-body">{pr.bio}</div>
                {/* <div className="cta-main light">
                  <div className="button-animation-hide">
                    <div className="button-animation-wrap">
                      <div className="button-content-tile">
                        <div>Read case study</div>
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
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          ))}

          {/* <Link
            id="w-node-d3fc33a7-4793-5f6e-7bc4-31a4856e0ae8-e2064dc4"
            data-w-id="d3fc33a7-4793-5f6e-7bc4-31a4856e0ae8"
            href={`blog/`}
            className="case-card-home-b long w-inline-block"
            style={{ backgroundColor: "" }}
          >
            <div className="case-card-image">
              <img
                // src={blo.mainImage.cloudinaryUrl}
                loading="lazy"
                sizes="(max-width: 479px) 100vw, (max-width: 767px) 81vw, (max-width: 991px) 85vw, 89vw"
                alt=""
                className="image-cover"
              />
            </div>
            <div className="case-home-b-bottom-tile">
              <h3 className="no-margins"></h3>
              <div className="cta-main light">
                <div className="button-animation-hide">
                  <div className="button-animation-wrap">
                    <div className="button-content-tile">
                      <div>Read case study</div>
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
                  </div>
                </div>
              </div>
            </div>
          </Link> */}

          {/* <div className="home-b-about-tile">
            <div className="icon-home-b-about w-embed">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_10002_225)">
                  <path
                    d="M20 6H22C23.103 6 24 5.103 24 4V2C24 0.897 23.103 0 22 0H20C18.897 0 18 0.897 18 2H6C6 0.897 5.103 0 4 0H2C0.897 0 0 0.897 0 2V4C0 5.103 0.897 6 2 6V18C0.897 18 0 18.897 0 20V22C0 23.103 0.897 24 2 24H4C5.103 24 6 23.103 6 22H18C18 23.103 18.897 24 20 24H22C23.103 24 24 23.103 24 22V20C24 18.897 23.103 18 22 18H20C19.763 18 19.536 18.042 19.325 18.118L15.513 14.306C15.816 13.955 16 13.499 16 13V11C16 10.501 15.816 10.045 15.513 9.694L19.325 5.882C19.536 5.958 19.763 6 20 6ZM19 2C19 1.449 19.449 1 20 1H22C22.551 1 23 1.449 23 2V4C23 4.551 22.551 5 22 5H20C19.449 5 19 4.551 19 4V2ZM1 4V2C1 1.449 1.449 1 2 1H4C4.551 1 5 1.449 5 2V4C5 4.551 4.551 5 4 5H2C1.449 5 1 4.551 1 4ZM5 22C5 22.551 4.551 23 4 23H2C1.449 23 1 22.551 1 22V20C1 19.449 1.449 19 2 19H4C4.551 19 5 19.449 5 20V22ZM6 21V20C6 18.897 5.103 18 4 18H3V6H4C5.103 6 6 5.103 6 4V3H18V4C18 4.499 18.184 4.955 18.487 5.306L14.675 9.118C14.464 9.042 14.237 9 14 9H12C10.897 9 10 9.897 10 11V13C10 14.103 10.897 15 12 15H14C14.237 15 14.464 14.958 14.675 14.882L18.487 18.694C18.184 19.045 18 19.501 18 20V21H6ZM15 11V13C15 13.551 14.551 14 14 14H12C11.449 14 11 13.551 11 13V11C11 10.449 11.449 10 12 10H14C14.551 10 15 10.449 15 11ZM22 19C22.551 19 23 19.449 23 20V22C23 22.551 22.551 23 22 23H20C19.449 23 19 22.551 19 22V20C19 19.449 19.449 19 20 19H22Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10002_225">
                    <rect width="100%" height="100%" fill="currentColor" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="about-tile-text-wrap">
              <div className="text-h6">GFRP Rebars</div>
              <div className="text-body">
                GFRP rebars available in 4–32mm diameters, up to 12m lengths,
                with 1000 MPa tensile strength and sand-coated for strong
                bonding.
              </div>
            </div>
          </div>
          <div className="home-b-about-tile">
            <div className="icon-home-b-about w-embed">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_10002_225)">
                  <path
                    d="M20 6H22C23.103 6 24 5.103 24 4V2C24 0.897 23.103 0 22 0H20C18.897 0 18 0.897 18 2H6C6 0.897 5.103 0 4 0H2C0.897 0 0 0.897 0 2V4C0 5.103 0.897 6 2 6V18C0.897 18 0 18.897 0 20V22C0 23.103 0.897 24 2 24H4C5.103 24 6 23.103 6 22H18C18 23.103 18.897 24 20 24H22C23.103 24 24 23.103 24 22V20C24 18.897 23.103 18 22 18H20C19.763 18 19.536 18.042 19.325 18.118L15.513 14.306C15.816 13.955 16 13.499 16 13V11C16 10.501 15.816 10.045 15.513 9.694L19.325 5.882C19.536 5.958 19.763 6 20 6ZM19 2C19 1.449 19.449 1 20 1H22C22.551 1 23 1.449 23 2V4C23 4.551 22.551 5 22 5H20C19.449 5 19 4.551 19 4V2ZM1 4V2C1 1.449 1.449 1 2 1H4C4.551 1 5 1.449 5 2V4C5 4.551 4.551 5 4 5H2C1.449 5 1 4.551 1 4ZM5 22C5 22.551 4.551 23 4 23H2C1.449 23 1 22.551 1 22V20C1 19.449 1.449 19 2 19H4C4.551 19 5 19.449 5 20V22ZM6 21V20C6 18.897 5.103 18 4 18H3V6H4C5.103 6 6 5.103 6 4V3H18V4C18 4.499 18.184 4.955 18.487 5.306L14.675 9.118C14.464 9.042 14.237 9 14 9H12C10.897 9 10 9.897 10 11V13C10 14.103 10.897 15 12 15H14C14.237 15 14.464 14.958 14.675 14.882L18.487 18.694C18.184 19.045 18 19.501 18 20V21H6ZM15 11V13C15 13.551 14.551 14 14 14H12C11.449 14 11 13.551 11 13V11C11 10.449 11.449 10 12 10H14C14.551 10 15 10.449 15 11ZM22 19C22.551 19 23 19.449 23 20V22C23 22.551 22.551 23 22 23H20C19.449 23 19 22.551 19 22V20C19 19.449 19.449 19 20 19H22Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10002_225">
                    <rect width="100%" height="100%" fill="currentColor" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="about-tile-text-wrap">
              <div className="text-h6">GFRP Mesh</div>
              <div className="text-body">
                Mesh in 50–200mm sizes, customizable, ideal for slabs,
                pavements, and walls in structural builds.
              </div>
            </div>
          </div>
          <div className="home-b-about-tile">
            <div className="icon-home-b-about w-embed">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_10002_225)">
                  <path
                    d="M20 6H22C23.103 6 24 5.103 24 4V2C24 0.897 23.103 0 22 0H20C18.897 0 18 0.897 18 2H6C6 0.897 5.103 0 4 0H2C0.897 0 0 0.897 0 2V4C0 5.103 0.897 6 2 6V18C0.897 18 0 18.897 0 20V22C0 23.103 0.897 24 2 24H4C5.103 24 6 23.103 6 22H18C18 23.103 18.897 24 20 24H22C23.103 24 24 23.103 24 22V20C24 18.897 23.103 18 22 18H20C19.763 18 19.536 18.042 19.325 18.118L15.513 14.306C15.816 13.955 16 13.499 16 13V11C16 10.501 15.816 10.045 15.513 9.694L19.325 5.882C19.536 5.958 19.763 6 20 6ZM19 2C19 1.449 19.449 1 20 1H22C22.551 1 23 1.449 23 2V4C23 4.551 22.551 5 22 5H20C19.449 5 19 4.551 19 4V2ZM1 4V2C1 1.449 1.449 1 2 1H4C4.551 1 5 1.449 5 2V4C5 4.551 4.551 5 4 5H2C1.449 5 1 4.551 1 4ZM5 22C5 22.551 4.551 23 4 23H2C1.449 23 1 22.551 1 22V20C1 19.449 1.449 19 2 19H4C4.551 19 5 19.449 5 20V22ZM6 21V20C6 18.897 5.103 18 4 18H3V6H4C5.103 6 6 5.103 6 4V3H18V4C18 4.499 18.184 4.955 18.487 5.306L14.675 9.118C14.464 9.042 14.237 9 14 9H12C10.897 9 10 9.897 10 11V13C10 14.103 10.897 15 12 15H14C14.237 15 14.464 14.958 14.675 14.882L18.487 18.694C18.184 19.045 18 19.501 18 20V21H6ZM15 11V13C15 13.551 14.551 14 14 14H12C11.449 14 11 13.551 11 13V11C11 10.449 11.449 10 12 10H14C14.551 10 15 10.449 15 11ZM22 19C22.551 19 23 19.449 23 20V22C23 22.551 22.551 23 22 23H20C19.449 23 19 22.551 19 22V20C19 19.449 19.449 19 20 19H22Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10002_225">
                    <rect width="100%" height="100%" fill="currentColor" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="about-tile-text-wrap">
              <div className="text-h6">Bent Elements</div>
              <div className="text-body">
                Pre-formed bends, U-bars, and stirrups made to spec, perfect for
                beams, columns, and tunnels.
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}