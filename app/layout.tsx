import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


import Footer from "@/components/Footer";

import { getSEO } from "@/components/getSEO";
import WhatsAppFab from "@/components/rx/WhatsApp";
import Nav from "@/components/rx/Nav";
import RxFooter from "@/components/rx/Footer";
import { getNav, getFooter } from "@/lib/cms";
import "./rx.css";


/** Display face: tight, engineered, editorial — carries the headlines. */
const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/** Body face: neutral and highly legible at small sizes. */
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});


// export async function generateMetadata(): Promise<Metadata> {
//   const seo = await getSEO();

//   return {
//     title: seo?.siteTitle || "RebarX",
//     description: seo?.metaDescription || "Default description for my site.",
//     metadataBase: new URL(seo?.canonicalURL || "http://localhost:3000"),
//     openGraph: {
//       title: seo?.ogTitle || seo?.siteTitle,
//       description: seo?.ogDescription || seo?.metaDescription,
//       url: seo?.canonicalURL || "http://localhost:3000",
//       images: seo?.ogImage?.url ? [seo.ogImage.url] : [],
//     },
//     twitter: {
//       card: seo?.twitterCardType || "summary_large_image",
//       site: seo?.twitterHandle || undefined,
//       title: seo?.twitterTitle || seo?.siteTitle,
//       description: seo?.twitterDescription || seo?.metaDescription,
//       images: seo?.twitterImage?.url ? [seo.twitterImage.url] : [],
//     },
//     icons: {
//       icon: seo?.favicon?.url || undefined,
//     },
//     other: {
//       "google-site-verification": seo?.googleSiteVerification || "",
//       "bing-site-verification": seo?.bingSiteVerification || "",
//       robots: seo?.robotsDirectives || "index, follow",
//     },
//   };
// }


export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO();

  console.log(seo, 'this i')

  return {
    title: seo?.siteTitle || "RebarX",
    description: seo?.metaDescription || "Default description for my site.",
    metadataBase: new URL(seo?.canonicalURL || "http://localhost:3000"),
    openGraph: {
      title: seo?.ogTitle || seo?.siteTitle,
      description: seo?.ogDescription || seo?.metaDescription,
      url: seo?.canonicalURL || "http://localhost:3000",
      images: seo?.ogImage?.cloudinaryUrl ? [seo.ogImage.cloudinaryUrl] : [],
    },
    twitter: {
      card: seo?.twitterCardType || "summary_large_image",
      site: seo?.twitterHandle || undefined,
      title: seo?.twitterTitle || seo?.siteTitle,
      description: seo?.twitterDescription || seo?.metaDescription,
      images: seo?.twitterImage?.cloudinaryUrl
        ? [seo.twitterImage.cloudinaryUrl]
        : [],
    },
    icons: {
      icon: seo?.favicon?.cloudinaryUrl || undefined,
    },
    other: {
      "google-site-verification": seo?.googleSiteVerification || "",
      "bing-site-verification": seo?.bingSiteVerification || "",
      "pinterest-site-verification": seo?.pinterestVerification || "",
      "yandex-verification": seo?.yandexVerification || "",
      robots: seo?.robotsDirectives || "index, follow",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [seo, navData, footerData] = await Promise.all([
    getSEO(),
    getNav(),
    getFooter(),
  ]);
  const navLinks = (
    (navData?.links ?? []) as { label: string; url: string }[]
  ).filter(
    // The brochure now lives on the site itself (see Downloads menu).
    (l) => !/brochure/i.test(l.label)
  );
  return (
    // <html lang="en">
    //   <head>

    //     {seo?.customHeadScripts && (
    //       <script dangerouslySetInnerHTML={{ __html: seo.customHeadScripts }} />
    //     )}
    //   </head>
    //   <body className={`${geistSans.variable} ${geistMono.variable}`}>
    //     {seo?.customBodyStartScripts && (
    //       <div
    //         dangerouslySetInnerHTML={{ __html: seo.customBodyStartScripts }}
    //       />
    //     )}
    //     <Navbar />

    //     {children}
    //     <Footer />

    //     {seo?.customBodyEndScripts && (
    //       <div dangerouslySetInnerHTML={{ __html: seo.customBodyEndScripts }} />
    //     )}
    //   </body>
    // </html>

    <html lang={seo?.siteLanguage || "en"}>
      <head>
        {/* Favicons & App Icons */}
        {/* {seo?.appIcons?.map((icon: any, idx: number) => (
          <link key={idx} rel="icon" href={icon.url} />
        ))} */}

        {seo?.favicon?.cloudinaryUrl && (
          <link rel="icon" href={seo.favicon.cloudinaryUrl} />
        )}

        {/* App Icons (PWA) */}
        {seo?.appIcons?.map((icon: any, idx: number) => (
          <link key={idx} rel="icon" href={icon.cloudinaryUrl} />
        ))}

        {/* JSON-LD Structured Data */}
        {seo?.structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: seo.structuredData }}
          />
        )}

        {/* Google Analytics */}
        {seo?.googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${seo.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${seo.googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager */}
        {seo?.googleTagManagerId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){
                  w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                  f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${seo.googleTagManagerId}');
              `,
            }}
          />
        )}

        {/* Facebook Pixel */}
        {seo?.facebookPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${seo.facebookPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

        {/* Hotjar */}
        {seo?.hotjarId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:${seo.hotjarId},hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `,
            }}
          />
        )}

        {/* Social Links */}
        {seo?.socialLinks?.map((link: any, idx: number) => (
          <link key={idx} rel="me" href={link.url} title={link.platform} />
        ))}

        {/* Custom <head> Scripts from CMS */}
        {seo?.customHeadScripts && (
          <script dangerouslySetInnerHTML={{ __html: seo.customHeadScripts }} />
        )}
      </head>
      <body className={`${archivo.variable} ${inter.variable}`}>
        {/* Custom Scripts Immediately After <body> */}
        {seo?.customBodyStartScripts && (
          <div
            dangerouslySetInnerHTML={{ __html: seo.customBodyStartScripts }}
          />
        )}

        {/* GTM <noscript> fallback */}
        {seo?.googleTagManagerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${seo.googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}

        <div className="rx">
          <Nav
            logo={navData?.logoImage?.cloudinaryUrl}
            links={navLinks.slice(0, -1)}
            cta={navLinks[navLinks.length - 1]}
          />
          {children}
          <RxFooter
            logo={navData?.logoImage?.cloudinaryUrl}
            company={footerData?.companyLinks ?? []}
            legal={footerData?.legalLinks ?? []}
            social={(footerData?.socialMedia ?? []).map((s: any) => ({
              label: s.icon?.alt ?? "Social",
              url: s.url,
            }))}
            phone={navData?.phone}
          />
        </div>

        <WhatsAppFab />

        {/* Custom Scripts Before </body> */}
        {seo?.customBodyEndScripts && (
          <div dangerouslySetInnerHTML={{ __html: seo.customBodyEndScripts }} />
        )}
      </body>
    </html>
  );
}
