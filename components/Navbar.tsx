"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { motion } from 'framer-motion'

const Navbar: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // isOpen
  //   ? (document.body.style.overflow = "hidden")
  //   : (document.body.style.overflow = "auto");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);
  
  const [isMobile, setIsMobile] = useState(false);
  
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };
  
        handleResize(); // set initially
        window.addEventListener("resize", handleResize);
  
        return () => window.removeEventListener("resize", handleResize);
      }, []);
  
  const [navData, setNavData] = useState(null);

  useEffect(() => {
    fetch("https://rebar-xbackend.vercel.app/api/navbar?depth=2")
      .then((res) => res.json())
      .then((data) => setNavData(data.docs[0]));
  }, []);

  if (!navData) return;

  return (
    <div className="navbar-master sticky-navbar">
      <div
        data-animation="default"
        data-collapse="medium"
        data-duration="400"
        data-easing="ease-out"
        data-easing2="ease-in-back"
        data-doc-height="1"
        role="banner"
        className="navbar navbar-sticky w-nav"
      >
        <div className="nav-container">
          <div className="nav-left">
            {/* imp  */}
            {/* <div className="menu-button w-nav-button">
              <img
                loading="lazy"
                src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064d06_Menu.svg"
                alt=""
                className="menu-hamburger-icon"
              />
              <img
                loading="lazy"
                src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064d97_X%20(1).svg"
                alt=""
                className="menu-close-icon"
              />
            </div> */}

            <div className="menu-button w-nav-button" onClick={toggleMenu}>
              {!isOpen ? (
                <img
                  loading="lazy"
                  src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064d06_Menu.svg"
                  alt="menu"
                  className="menu-hamburger-icon"
                />
              ) : (
                <img
                  loading="lazy"
                  src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064d97_X%20(1).svg"
                  alt="close"
                  className="menu-hamburger-icon"
                />
              )}
            </div>

            <div className="brand-menu-wrap">
              {navData.logoType === "image" &&
              navData.logoImage?.cloudinaryUrl ? (
                <Link href="/" className="brand-link-navbars w-nav-brand">
                  <img
                    className="brand-navbars"
                    src={navData.logoImage.cloudinaryUrl}
                    alt="Logo"
                  />
                </Link>
              ) : (
                <Link href="/" className="brand-link-navbar w-nav-brand">
                  <p className="brand-navbar">
                    <strong>{navData.logoText}</strong>
                  </p>
                </Link>
              )}
            </div>
            <div className="nav-divider"></div>
            <div className="nav-menu-wrap">
              <nav role="navigation" className="nav-menu w-nav-menu">
                <div
                  data-delay="0"
                  data-hover="true"
                  className="nav-dropdown w-dropdown"
                >
                  <nav className="dropdown-list w-dropdown-list">
                    <div className="mega-menu-wrap">
                      <div className="mega-menu-halves">
                        <div className="mega-menu-left">
                          <div className="menu-column">
                            <div className="navigation-label-desktop">
                              <div className="label">Multi-Layout</div>
                            </div>
                            <div className="navigation-link-wrap">
                              <div className="navigation-label-mobile">
                                <div className="menu-link">Multi-Layout</div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="menu-divider"></div> */}
                          {/* <div className="menu-column">
                            <div className="navigation-label-desktop">
                              <div className="label">Multi-Layout</div>
                            </div>
                            <div className="navigation-link-wrap">
                              <div className="navigation-label-mobile">
                                <div className="menu-link">Multi-Layout</div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                        {/* <a
                          href="https://webflow.com/templates/designers/byq-studio"
                          className="megs-menu-right w-inline-block"
                        >
                          <div className="menu-page-wrap">
                            <img
                              loading="lazy"
                              src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67403e9bdd3e5c836287fccb_Menu%20Image%20(1).avif"
                              alt=""
                              className="menu-page-image"
                            />
                          </div>
                          <div className="menu-page-bottom-tile">
                            <div className="text-body serif">
                              Biology and Technology solution
                            </div>
                            <div className="text-small text-underline"></div>
                          </div>
                        </a> */}
                      </div>
                    </div>
                  </nav>
                </div>
                {navData.links?.slice(0, -1).map((link) => (
                  <Link key={link.url} href={link.url}>
                    <div
                      data-delay="0"
                      data-hover="true"
                      className="nav-small-dropdown w-dropdown"
                    >
                      <div className="dropdown-toggle w-dropdown-toggle">
                        <div className="navigation-link-hover-wrap">
                          <div>{link.label}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                {/* <div
                  data-delay="0"
                  data-hover="true"
                  className="nav-small-dropdown w-dropdown"
                >
                  <div className="dropdown-toggle w-dropdown-toggle">
                    <div className="navigation-link-hover-wrap">
                      <div>Home</div>
                    </div>
                  </div>
                </div> */}
                {/* <div
                  data-delay="0"
                  data-hover="true"
                  className="nav-small-dropdown w-dropdown"
                >
                  <div className="dropdown-toggle w-dropdown-toggle">
                    <div className="navigation-link-hover-wrap">
                      <div>Application</div>
                    </div>
                  </div>
                </div>
                <div
                  data-delay="0"
                  data-hover="true"
                  className="nav-small-dropdown w-dropdown"
                >
                  <div className="dropdown-toggle w-dropdown-toggle">
                    <div className="navigation-link-hover-wrap">
                      <div>Science</div>
                    </div>
                  </div>
                </div>
                <div
                  data-delay="0"
                  data-hover="true"
                  className="nav-small-dropdown w-dropdown"
                >
                  <div className="dropdown-toggle w-dropdown-toggle">
                    <div className="navigation-link-hover-wrap">
                      <div>Calculator</div>
                    </div>
                  </div>
                </div> */}

                <div className="menu-divider"></div>
                <div className="menu-bottom-tile">
                  <div className="menu-socials">
                    <a
                      href="http://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-menu-social w-inline-block"
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064f09_Social%20Icon.svg"
                        alt=""
                        className="menu-social-icon"
                      />
                    </a>
                    <a
                      href="http://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-menu-social w-inline-block"
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064f16_Social%20Icon-1.svg"
                        alt=""
                        className="menu-social-icon"
                      />
                    </a>
                    <a
                      href="http://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-menu-social w-inline-block"
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064ee7_Social%20Icon-2.svg"
                        alt=""
                        className="menu-social-icon"
                      />
                    </a>
                    <a
                      href="http://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-menu-social w-inline-block"
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064f0a_Social%20Icon-3.svg"
                        alt=""
                        className="menu-social-icon"
                      />
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="nav-right">
            <div className="menu-cta-wrap desktop">
              <div className="cta-small w-inline-block">
                <div className="button-animation-hide small">
                  <div className="button-animation-wrap small">
                    {navData.links && navData.links.length > 0 && (
                      <Link
                        key={navData.links[navData.links.length - 1].url}
                        href={navData.links[navData.links.length - 1].url}
                      >
                        <div
                          className="button-content-tile small"
                          style={{ color: "#fff" }}
                        >
                          <div style={{ marginTop: "-1px" }}>
                            {navData.links[navData.links.length - 1].label}
                          </div>
                          <div className="button-arrow small w-embed">
                            <svg
                              width="100%"
                              height="100%"
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
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isMobile ? (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="w-nav-overlay"
                id="w-nav-overlay-0"
                initial={{ height: 0, display: "none" }}
                animate={{ height: "100vh", display: "block" }}
                exit={{ height: 0, display: "none" }}
                transition={{ duration: 0.3 }}
              >
                <nav
                  role="navigation"
                  className="nav-menu w-nav-menu"
                  //   style="
                  //   transition: all, transform 400ms ease-out;
                  //   transform: translateY(0px) translateX(0px);
                  // "
                  data-nav-menu-open=""
                >
                  <div className="menu-divider"></div>
                  <div
                    data-delay="0"
                    data-hover="true"
                    className="nav-dropdown w-dropdown w--nav-dropdown-open"
                  >
                    <div
                      className="dropdown-toggle w-dropdown-toggle w--nav-dropdown-toggle-open"
                      id="w-dropdown-toggle-0"
                      aria-controls="w-dropdown-list-0"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      role="button"
                    >
                      <div className="navigation-link-hover-wrap">
                        {/* <div>Pages</div> */}
                      </div>
                    </div>
                    <nav
                      className="dropdown-list w-dropdown-list w--nav-dropdown-list-open"
                      id="w-dropdown-list-0"
                      aria-labelledby="w-dropdown-toggle-0"
                    >
                      <div className="mega-menu-wrap">
                        <div className="mega-menu-halves">
                          <div className="mega-menu-left">
                            <div
                              className="mega-menu-left"
                              style={{ width: "100%", marginTop: "-70px" }}
                            >
                              {navData.links.map((li, index) => (
                                <>
                                  <Link
                                    href={li.url}
                                    key={index}
                                    onClick={() => setIsOpen(!isOpen)}
                                  >
                                    <div className="menu-column">
                                      <div className="navigation-link-wrap">
                                        <div className="navigation-label-mobile">
                                          <div className="menu-link">
                                            {li.label}
                                          </div>
                                          <div className="navigation-exand-icon-wrap"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                  <div className="menu-divider"></div>
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </nav>
                  </div>

                  <div className="menu-bottom-tile">
                    <div className="menu-socials">
                      <a
                        href="http://facebook.com"
                        target="_blank"
                        className="link-menu-social w-inline-block"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064f09_Social%20Icon.svg"
                          alt=""
                          className="menu-social-icon"
                        />
                      </a>
                      <a
                        href="http://instagram.com"
                        target="_blank"
                        className="link-menu-social w-inline-block"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064f16_Social%20Icon-1.svg"
                          alt=""
                          className="menu-social-icon"
                        />
                      </a>
                      <a
                        href="http://linkedin.com"
                        target="_blank"
                        className="link-menu-social w-inline-block"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064ee7_Social%20Icon-2.svg"
                          alt=""
                          className="menu-social-icon"
                        />
                      </a>
                      <a
                        href="http://youtube.com"
                        target="_blank"
                        className="link-menu-social w-inline-block"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/67337f627413b847e2064cec/67337f627413b847e2064f0a_Social%20Icon-3.svg"
                          alt=""
                          className="menu-social-icon"
                        />
                      </a>
                    </div>
                    <div className="text-body">+91 {navData.phone }</div>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
