"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


export default function Footer() {
  const [footerData, setFooterData] = useState(null);
  //https://rebar-xbackend.vercel.app/api/footer

  https: useEffect(() => {
    fetch(`https://rebar-xbackend.vercel.app/api/footer`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.docs) && data.docs.length > 0) {
          setFooterData(data.docs[0]);
        }
      })
      .catch((err) => console.error("Failed to fetch footer:", err));
  }, []);

  console.log(footerData, "this is footerdata");

  if (!footerData) return null;

  // const { logo, newsletter, companyLinks, legalLinks, socialMedia } =
  //     footerData;

  return (
    <section className="footer">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="w-layout-grid footer-halves">
          <div className="footer-left">
            <a href="/" className="brand-link w-inline-block">
              <img
                loading="lazy"
                src={footerData.logo.image.cloudinaryUrl}
                alt=""
                className="brand-navbar"
              />
              {/* <p>
                <strong>{footerData.logo.text}</strong>
              </p> */}
            </a>
            <div className="newsletter-form-block w-form">
              {/* <form
                id="email-form"
                name="email-form"
                data-name="Email Form"
                method="get"
                className="newsletter-form"
                data-wf-page-id="67337f627413b847e2064dc4"
                data-wf-element-id="0cd23656-5bb2-adc0-9378-f277e86f1fe2"
              >
                <div className="newsletter-form-top">
                  <div className="label">{footerData.newsletter.title}</div>
                  <div className="newsletter-field-master">
                    <input
                      className="text-field w-input"
                      name="Email"
                      data-name="Email"
                      placeholder="Email"
                      type="email"
                      id="Email"
                      required
                    />
                    <div className="submit-button-wrap">
                      <input
                        type="submit"
                        data-wait="Please wait..."
                        className="submit-button w-button"
                        value=""
                      />
                      <div className="cta-arrow w-embed">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 12L18 12"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="square"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13 6L19 12"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="square"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13 18L19 12"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="square"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-small opacity-50">
                  {footerData.newsletter.warning}
                </div>
              </form> */}
              <div className="success-message-newsletter w-form-done">
                <div>Thank you! Your submission has been received!</div>
              </div>
              <div className="error-message-2 w-form-fail">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
          <div
            id="w-node-_0cd23656-5bb2-adc0-9378-f277e86f1ff3-c5ff4adf"
            className="footer-right"
          >
            {/* <!-- <div className="footer-column">
              <div className="label opacity-50">MAIN pages</div>
              <div className="footer-links-column">
                <a href="/homepage/home-a" className="footer-link">Homepage 1</a>
                <a
                  href="/homepage/home-b"
                  aria-current="page"
                  className="footer-link w--current"
                  >Homepage 2</a
                >
                <a href="/homepage/home-c" className="footer-link">Homepage 3</a>
                <a href="/about/about-a" className="footer-link">About 1</a>
                <a href="/about/about-b" className="footer-link">About 2</a>
                <a href="/about/about-c" className="footer-link">About 3</a>
                <a href="/pricing" className="footer-link">Pricing</a>
                <a href="/product/essentials" className="footer-link">Product</a>
                <a href="/template/licenses" className="footer-link">Licenses</a>
              </div>
            </div> --> */}
            <div className="footer-column">
              <div className="label opacity-50">Company</div>
              <div className="footer-links-column">
                {footerData.companyLinks.map((com, index) => (
                  <Link href={com.url} className="footer-link" key={index}>
                    {com.label}
                  </Link>
                ))}
                {/* <a href="" className="footer-link">
                    Home
                  </a>
                  <a href="" className="footer-link">
                    Product
                  </a>
                  <a href="" className="footer-link">
                    Application
                  </a>
                  <a href="" className="footer-link">
                    Calculator
                  </a>
                  <a href="" className="footer-link">
                    Blog
                  </a> */}
                {/* <!-- <a href="" className="footer-link">Privacy Policy</a> --> */}
              </div>
            </div>
            <div className="footer-column">
              <div className="label opacity-50">Legal</div>
              <div className="footer-links-column">
                {footerData.legalLinks.map((com, index) => (
                  <Link href={com.url} className="footer-link" key={index}>
                    {com.label}
                  </Link>
                ))}
                {/* <a href="" className="footer-link">
                    Privacy Policy
                  </a>
                  <a href="" className="footer-link">
                    Terms
                  </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom-tile">
          <div className="footer-bottom-wrap">
            <div className="footer-last-block">
              <div className="footer-rights-wrap">
                <div className="footer-social-wrap">
                  {footerData.socialMedia.map((com, index) => (
                    <Link
                      href={com.url}
                      className="social-link w-inline-block"
                      key={index}
                    >
                      <div className="icon-social w-embed">
                        {/* <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_2001_2292)">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.9617 0.36377C14.1251 0.388457 16.0796 0.920165 17.825 1.95889C19.5497 2.97688 20.9843 4.42031 21.9918 6.15114C23.0242 7.90712 23.5527 9.87341 23.5773 12.05C23.516 15.0281 22.5767 17.5718 20.7594 19.6808C18.942 21.7899 16.6144 23.0948 14.2049 23.595V15.2452H16.4829L16.9981 11.964H13.5487V9.81485C13.5295 9.36932 13.6704 8.93164 13.9459 8.58095C14.2218 8.2293 14.7075 8.04448 15.4032 8.02648H17.4862V5.15218C17.4563 5.14256 17.1727 5.10454 16.6354 5.0381C16.0261 4.96681 15.4133 4.92873 14.7998 4.92403C13.4113 4.93043 12.3131 5.32211 11.5054 6.09906C10.6976 6.87579 10.285 7.99956 10.2675 9.47035V11.964H7.64246V15.2452H10.2675V23.595C7.30895 23.0948 4.98137 21.7899 3.16402 19.6808C1.34668 17.5718 0.407399 15.0281 0.346077 12.05C0.370611 9.87331 0.899105 7.90702 1.93156 6.15114C2.93903 4.42031 4.3737 2.97689 6.09836 1.95889C7.84378 0.920365 9.79822 0.388657 11.9617 0.36377Z"
                                fill="currentColor"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2001_2292">
                                <rect
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                />
                              </clipPath>
                            </defs>
                          </svg> */}
                        <img width="24" height="24" src={com.icon.url} alt="" />
                      </div>
                    </Link>
                  ))}
                  {/* <a
                      href="http://facebook.com"
                      target="_blank"
                      className="social-link w-inline-block"
                    >
                      <div className="icon-social w-embed">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_2001_2292)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.9617 0.36377C14.1251 0.388457 16.0796 0.920165 17.825 1.95889C19.5497 2.97688 20.9843 4.42031 21.9918 6.15114C23.0242 7.90712 23.5527 9.87341 23.5773 12.05C23.516 15.0281 22.5767 17.5718 20.7594 19.6808C18.942 21.7899 16.6144 23.0948 14.2049 23.595V15.2452H16.4829L16.9981 11.964H13.5487V9.81485C13.5295 9.36932 13.6704 8.93164 13.9459 8.58095C14.2218 8.2293 14.7075 8.04448 15.4032 8.02648H17.4862V5.15218C17.4563 5.14256 17.1727 5.10454 16.6354 5.0381C16.0261 4.96681 15.4133 4.92873 14.7998 4.92403C13.4113 4.93043 12.3131 5.32211 11.5054 6.09906C10.6976 6.87579 10.285 7.99956 10.2675 9.47035V11.964H7.64246V15.2452H10.2675V23.595C7.30895 23.0948 4.98137 21.7899 3.16402 19.6808C1.34668 17.5718 0.407399 15.0281 0.346077 12.05C0.370611 9.87331 0.899105 7.90702 1.93156 6.15114C2.93903 4.42031 4.3737 2.97689 6.09836 1.95889C7.84378 0.920365 9.79822 0.388657 11.9617 0.36377Z"
                              fill="currentColor"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2001_2292">
                              <rect
                                width="24"
                                height="24"
                                fill="currentColor"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      className="social-link w-inline-block"
                    >
                      <div className="icon-social w-embed">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_2001_2294)">
                            <g clip-path="url(#clip1_2001_2294)">
                              <path
                                d="M10.5053 14.248L14.4088 11.9999L10.5053 9.75171V14.248Z"
                                fill="currentColor"
                              />
                              <path
                                d="M12 0C5.3736 0 0 5.3736 0 12C0 18.6264 5.3736 24 12 24C18.6264 24 24 18.6264 24 12C24 5.3736 18.6264 0 12 0ZM19.4982 12.0123C19.4982 12.0123 19.4982 14.4459 19.1895 15.6194C19.0164 16.2618 18.5099 16.7682 17.8676 16.9411C16.6941 17.25 12 17.25 12 17.25C12 17.25 7.31818 17.25 6.13239 16.9288C5.49005 16.756 4.98358 16.2493 4.81055 15.607C4.50165 14.4459 4.50165 12 4.50165 12C4.50165 12 4.50165 9.56653 4.81055 8.39301C4.9834 7.75067 5.50232 7.23175 6.13239 7.0589C7.30591 6.75 12 6.75 12 6.75C12 6.75 16.6941 6.75 17.8676 7.07117C18.5099 7.24402 19.0164 7.75067 19.1895 8.39301C19.5106 9.56653 19.4982 12.0123 19.4982 12.0123Z"
                                fill="currentColor"
                              />
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_2001_2294">
                              <rect
                                width="24"
                                height="24"
                                fill="currentColor"
                              />
                            </clipPath>
                            <clipPath id="clip1_2001_2294">
                              <rect
                                width="24"
                                height="24"
                                fill="currentColor"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </a>
                    <a
                      href="http://linkedin.com"
                      target="_blank"
                      className="social-link w-inline-block"
                    >
                      <div className="icon-social w-embed">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_2001_2298)">
                            <g clip-path="url(#clip1_2001_2298)">
                              <path
                                d="M12 0C5.3736 0 0 5.3736 0 12C0 18.6264 5.3736 24 12 24C18.6264 24 24 18.6264 24 12C24 5.3736 18.6264 0 12 0ZM8.51294 18.1406H5.59039V9.34808H8.51294V18.1406ZM7.05176 8.14746H7.03271C6.052 8.14746 5.41772 7.47235 5.41772 6.6286C5.41772 5.76581 6.07141 5.10938 7.07117 5.10938C8.07092 5.10938 8.68616 5.76581 8.7052 6.6286C8.7052 7.47235 8.07092 8.14746 7.05176 8.14746ZM19.051 18.1406H16.1288V13.4368C16.1288 12.2547 15.7057 11.4485 14.6483 11.4485C13.8409 11.4485 13.3601 11.9923 13.1488 12.5173C13.0715 12.7051 13.0527 12.9677 13.0527 13.2305V18.1406H10.1303C10.1303 18.1406 10.1686 10.173 10.1303 9.34808H13.0527V10.593C13.441 9.9939 14.1359 9.14172 15.6865 9.14172C17.6093 9.14172 19.051 10.3984 19.051 13.099V18.1406Z"
                                fill="currentColor"
                              />
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_2001_2298">
                              <rect
                                width="24"
                                height="24"
                                fill="currentColor"
                              />
                            </clipPath>
                            <clipPath id="clip1_2001_2298">
                              <rect
                                width="24"
                                height="24"
                                fill="currentColor"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </a> */}
                </div>
                <div className="text-small">
                  © RebarX 2025, All Rights Reserved
                </div>
              </div>
              {/* <!-- <div className="text-small">
                Designed by
                <a href="http://arieljedrzejczak.com/" className="text-underline"
                  >Ariel</a
                >
                for BYQ.
              </div> --> */}
            </div>
          </div>
        </div>
        {/* <!-- <div className="footer-bottom-message">
          <p className="text-small opacity-50">
            terra–tory™ is crafted by a registered company in the United States,
            operating under California, USA (Registration No. CA-987654).
            Authorized and regulated by the California Department of Business
            and Professional Regulation in accordance with the Bio-Technology
            Consulting Services Act (License No. BT-123456), terra–tory™ adheres
            to state and federal standards, ensuring compliance with ethical
            practices and the highest standards of responsibility in sustainable
            design and technology integration.
          </p>
        </div> --> */}
      </div>
    </section>
  );
}