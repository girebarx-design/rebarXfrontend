// pages/index.tsx
"use client";

import AboutSection from "@/components/About";
import Blog from "@/components/Blog";
import SlabCalculator from "@/components/SlabCalculator";
import CTA from "@/components/CTA_Section";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/Marque";
import ProductSection from "@/components/ProductSection";
import Science from "@/components/Science";
import FeatureSlider from "@/components/Slider";
import SS from "@/components/SS";
import VisionSection from "@/components/VisionSection";
import { useEffect, useState } from "react";

export default function Home() {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetch("https://rebar-xbackend.vercel.app/api/pages?where[slug][equals]=home&depth=2")
      .then((res) => res.json())
      .then((data) => setPageData(data.docs[0]));
  }, []);

  if (!pageData) return <div>Loading...</div>;

  const layout = pageData.layout;

  console.log(layout, 'this is layout')

  const hero = layout.find((block) => block.blockType === "hero");
  const marquee = layout.find((block) => block.blockType === "marquee");
  const about = layout.find((block) => block.blockType === "about");

  const carousel = layout.find((block) => block.blockType === "carousel");

  const productSection = layout.find(
    (block) => block.blockType === "product-section"
  );
  const visionSection = layout.find(
    (block) => block.blockType === "vision-section"
  );

  const blogSection = layout.find(
    (block) => block.blockType === "blogSection"
  );

  const science = layout.find((block) => block.blockType === "science-block");

  const faq = layout.find((block) => block.blockType === "faq-block");

  const cta = layout.find((block) => block.blockType === "cta-section");

  const gmfr = layout.find((block) => block.blockType === "gfrp-vs-tmt");

  // console.log(about, 'this is about')

  return (
    // <>
    //   {pageData.layout.map((block, index) => {
    //     switch (block.blockType) {
    //       case "hero":
    //         return <Hero key={index} hero={block} />;
    //       case "marquee":
    //         return <MarqueeSection key={index} marquee={block} />;
    //       case "about":
    //         return <AboutSection key={index} about={block} />;
    //       case "carousel":
    //         return <FeatureSlider key={index} carousel={block} />;
    //       case "product-section":
    //         return <ProductSection key={index} productSection={block} />;
    //       case "gfrp-vs-tmt":
    //         return <SS key={index} gmfr={block} />;
    //       case "vision-section":
    //         return <VisionSection key={index} visionSection={block} />;
    //       case "blogSection":
    //         return <Blog key={index} blogSection={block} />;
    //       case "science-block":
    //         return <Science key={index} science={block} />;
    //       case "faq-block":
    //         return <FAQ key={index} faq={block} />;
    //       case "cta-section":
    //         return <CTA key={index} cta={block} />;
    //       default:
    //         return null;
    //     }
    //   })}

    //   <Calculators />

    // </>

    <>
      
      {pageData.layout.map((block, index) => {
        const elements = [];

        switch (block.blockType) {
          case "hero":
            // elements.push(<Calculatorss key={`calculator-${index}`} />);
            elements.push(<Hero key={index} hero={block} />);
            break;
          case "marquee":
            elements.push(<MarqueeSection key={index} marquee={block} />);
            break;
          case "about":
            elements.push(<AboutSection key={index} about={block} />);
            break;
          case "carousel":
            elements.push(<FeatureSlider key={index} carousel={block} />);
            break;
          case "product-section":
            elements.push(
              <ProductSection key={index} productSection={block} />
            );
            break;
          case "gfrp-vs-tmt":
            elements.push(<SS key={index} gmfr={block} />);
            break;
          case "vision-section":
            elements.push(<VisionSection key={index} visionSection={block} />);
            break;
          case "calculator":
            elements.push(<SlabCalculator key={`calculator-${index}`} />);
            break;
          case "blogSection":
            
            elements.push(<Blog key={index} blogSection={block} />);
            break;
          case "science-block":
            // elements.push(<Calculatorss key={`calculator-${index}`} />);
            elements.push(<Science key={index} science={block} />);
            // ✅ Inject Calculator right after science block

            break;
          case "faq-block":
            elements.push(<FAQ key={index} faq={block} />);
            break;
          case "cta-section":
            elements.push(<CTA key={index} cta={block} />);
            break;
          default:
            break;
        }

        return elements;
      })}
    </>
  );
}
