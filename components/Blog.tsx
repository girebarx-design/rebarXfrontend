import Link from "next/link";


export default function Blog({ blogSection }) {
  return (
    <section className="section home-b-cases-section" id="blog">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="headline-cases-home-b">
          <div className="section-divider"></div>
          <div className="label">Our blogs</div>
          <div className="limit-640">
            <h2 className="no-margins">{blogSection.sectionTitle}</h2>
          </div>  
        </div>
        <div className="w-layout-grid case-halves-home-b">
          {blogSection.selectedBlogs.map((blo, index) => (
            <Link
              key={blo.slug || blo.id || index}
              id="w-node-d3fc33a7-4793-5f6e-7bc4-31a4856e0ae8-e2064dc4"
              data-w-id="d3fc33a7-4793-5f6e-7bc4-31a4856e0ae8"
              href={`blog/${blo.slug}`}
              className="case-card-home-b long w-inline-block"
            >
              <div className="case-card-image">
                <img
                  src={blo.mainImage.cloudinaryUrl}
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 81vw, (max-width: 991px) 85vw, 89vw"
                  alt=""
                  className="image-cover"
                />
              </div>
              <div className="case-home-b-bottom-tile">
                <h3 className="no-margins">{blo.title}</h3>
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
            </Link>
          ))}
          {/* <Link
            id="w-node-d3fc33a7-4793-5f6e-7bc4-31a4856e0ae8-e2064dc4"
            data-w-id="d3fc33a7-4793-5f6e-7bc4-31a4856e0ae8"
            href="/about/about-c"
            className="case-card-home-b long w-inline-block"
          >
            <div className="case-card-image">
              <img
                src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/6734f06f9f734cc9c75f9cd7_Article%20Thumbnail%204.avif"
                loading="lazy"
                sizes="(max-width: 479px) 100vw, (max-width: 767px) 81vw, (max-width: 991px) 85vw, 89vw"
                alt=""
                className="image-cover"
              />
            </div>
            <div className="case-home-b-bottom-tile">
              <h3 className="no-margins">
                Revolutionizing gfrp research with rebarX
              </h3>
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
          {/* <a
            id="w-node-d3fc33a7-4793-5f6e-7bc4-31a4856e0ae8-e2064dc4"
            data-w-id="d3fc33a7-4793-5f6e-7bc4-31a4856e0ae8"
            href="/about/about-c"
            className="case-card-home-b long w-inline-block"
          >
            <div className="case-card-image">
              <img
                src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/6734f06f9f734cc9c75f9cd7_Article%20Thumbnail%204.avif"
                loading="lazy"
                sizes="(max-width: 479px) 100vw, (max-width: 767px) 81vw, (max-width: 991px) 85vw, 89vw"
                alt=""
                className="image-cover"
              />
            </div>
            <div className="case-home-b-bottom-tile">
              <h3 className="no-margins">
                Revolutionizing gfrp research with rebarX
              </h3>
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
          </a> */}
        </div>
      </div>
    </section>
  );
}