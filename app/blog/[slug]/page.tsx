// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// // import { LexicalRichText } from "@payloadcms/richtext-lexical/react";

// import dynamic from 'next/dynamic'
// import { lexicalEditor } from "@payloadcms/richtext-lexical";

// // const LexicalRichText = dynamic(
// //   () =>
// //     import("@payloadcms/richtext-lexical").then((mod) => mod.LexicalRichText),
// //   { ssr: false }
// // );

// export default function SingleBlog() {

//     const [blogData, setBlogData] = useState(null);
//     const params = useParams();

//     useEffect(() => {
//       if (!params?.slug) return;

//         const slug = decodeURIComponent(params.slug);

//       fetch(
//         `https://rebar-xbackend.vercel.app/api/blog-posts?where[slug][equals]=${slug}&depth=2`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.docs?.length > 0) {
//             setBlogData(data.docs[0]);
//           }
//         })
//         .catch((err) => {
//           console.error("Failed to fetch blog post:", err);
//         });
//     }, [params?.slug]);

//     if (!blogData) return;

//     const formattedDate = new Date(blogData.date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//     console.log(formattedDate);

//     console.log(blogData, 'thid is data')

//     return (
//       <div>
//         <section className="section hero-article">
//           <div className="w-layout-blockcontainer main-container w-container">
//             <div className="w-layout-grid article-hero-halves">
//               <div className="article-heading-wrap">
//                 <div className="article-top-tile">
//                   <div className="article-category-wrap">
//                     <div className="text-small semibold">{blogData.tag}</div>
//                     <div className="text-small opacity-50">·</div>
//                     <div className="text-small">{formattedDate}</div>
//                   </div>
//                   <h1 className="text-h1">{blogData.title}</h1>
//                 </div>
//                 <a
//                   href="#Article"
//                   className="article-down-button w-inline-block"
//                 >
//                   <div className="icon-down-arrow w-embed">
//                     <svg
//                       width="22"
//                       height="21"
//                       viewBox="0 0 22 21"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M11 0.666992L11 19.3337"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       />
//                       <path
//                         d="M20.334 10L11.0007 19.3333L1.66732 10"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       />
//                     </svg>
//                   </div>
//                 </a>
//               </div>
//               <img
//                 src={blogData.mainImage.url}
//                 loading="lazy"
//                 id="w-node-_16eb1e1e-3eb9-d81a-e596-2ff6728d587f-e2064d69"
//                 alt=""
//                 sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, 94vw"
//                 className="article-big-thumbnail"
//               />
//             </div>
//           </div>
//         </section>
//         <section className="section body-article">
//           <div className="w-layout-blockcontainer main-container w-container">
//             <div
//               data-w-id="aa46aa4f-a776-788c-4b98-c2b87dd9e11b"
//               className="section-divider article-divider"
//             ></div>
//             <div className="w-layout-blockcontainer main-container article-container w-container">
//               <div className="article-body-wrap">
//                 <div id="Article" className="post-body w-richtext">
//                   {/* render lexi editor here  */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="section related-blog-section">
//           <div className="w-layout-blockcontainer main-container w-container">
//             <div className="headline-related">
//               <h3 className="no-margins">Latest articles</h3>
//             </div>
//             <div className="related-block w-dyn-list">
//               <div role="list" className="blog-thirds w-dyn-items">
//                 <div role="listitem" className="w-dyn-item">
//                   <a
//                     href="/blog/how-to-optimize-your-business-operations-for-maximum-efficiency-2"
//                     className="article-tile w-inline-block"
//                   >
//                     <div className="image-wrap-blog">
//                       <img
//                         alt=""
//                         loading="lazy"
//                         src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow.jpg"
//                         sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
//                         // srcset="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-500.jpg 500w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-800.jpg 800w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-1080.jpg 1080w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-1600.jpg 1600w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-2000.jpg 2000w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-2600.jpg 2600w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow-p-3200.jpg 3200w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da2880e071d8ed9bf624_Cow.jpg 3888w"
//                         className="image-cover"
//                       />
//                     </div>
//                     <div className="article-info-wrap">
//                       <div className="article-category-wrap">
//                         <div className="text-small">Welness</div>
//                         <div className="text-small opacity-50">·</div>
//                         <div className="text-small">November 13, 2024</div>
//                       </div>
//                       <div className="text-h5">
//                         How to Optimize Your Business Operations for Maximum
//                         Efficiency
//                       </div>
//                     </div>
//                   </a>
//                 </div>
//                 <div role="listitem" className="w-dyn-item">
//                   <a
//                     href="/blog/unlocking-new-markets-a-step-by-step-guide-to-expansion-2"
//                     className="article-tile w-inline-block"
//                   >
//                     <div className="image-wrap-blog">
//                       <img
//                         alt=""
//                         loading="lazy"
//                         src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da0ec2f2d5cfa12bda5d_Article%20Thumbnail%204.png"
//                         sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
//                         // srcset="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da0ec2f2d5cfa12bda5d_Article%20Thumbnail%204-p-500.png 500w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da0ec2f2d5cfa12bda5d_Article%20Thumbnail%204-p-800.png 800w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da0ec2f2d5cfa12bda5d_Article%20Thumbnail%204-p-1080.png 1080w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734da0ec2f2d5cfa12bda5d_Article%20Thumbnail%204.png 1263w"
//                         className="image-cover"
//                       />
//                     </div>
//                     <div className="article-info-wrap">
//                       <div className="article-category-wrap">
//                         <div className="text-small">Welness</div>
//                         <div className="text-small opacity-50">·</div>
//                         <div className="text-small">November 13, 2024</div>
//                       </div>
//                       <div className="text-h5">
//                         Unlocking New Markets: A Step-by-Step Guide to Expansion
//                       </div>
//                     </div>
//                   </a>
//                 </div>
//                 <div role="listitem" className="w-dyn-item">
//                   <a
//                     href="/blog/the-role-of-data-in-shaping-effective-business-strategies"
//                     className="article-tile w-inline-block"
//                   >
//                     <div className="image-wrap-blog">
//                       <img
//                         alt=""
//                         loading="lazy"
//                         src="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d9bde5bcef035a56dcce_Leaf.jpg"
//                         sizes="(max-width: 479px) 100vw, (max-width: 767px) 44vw, (max-width: 991px) 46vw, 30vw"
//                         // srcset="https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d9bde5bcef035a56dcce_Leaf-p-500.jpg 500w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d9bde5bcef035a56dcce_Leaf-p-800.jpg 800w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d9bde5bcef035a56dcce_Leaf-p-1080.jpg 1080w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d9bde5bcef035a56dcce_Leaf-p-1600.jpg 1600w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d9bde5bcef035a56dcce_Leaf-p-2000.jpg 2000w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d9bde5bcef035a56dcce_Leaf-p-2600.jpg 2600w, https://cdn.prod.website-files.com/67337f627413b847e2064d1a/6734d9bde5bcef035a56dcce_Leaf.jpg 3024w"
//                         className="image-cover"
//                       />
//                     </div>
//                     <div className="article-info-wrap">
//                       <div className="article-category-wrap">
//                         <div className="text-small">Welness</div>
//                         <div className="text-small opacity-50">·</div>
//                         <div className="text-small">November 13, 2024</div>
//                       </div>
//                       <div className="text-h5">
//                         The Role of Data in Shaping Effective Business
//                         Strategies
//                       </div>
//                     </div>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     );
// }

// "use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";


import { Metadata } from "next";
import BlogPost from "@/components/SingleBlog";

export async function generateMetadata({ params }): Promise<Metadata> {
  const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");


  // const res = await fetch(
  //   `https://rebar-xbackend.vercel.app/api/blog-posts?where[slug][equals]=${params.slug}&depth=2`
  // );

  // const data = await res.json();
  // const blog = data.docs?.[0];

  // if (!blog) {
  //   return {
  //     title: "Blog Not Found",
  //     description: "This blog post does not exist.",
  //   };
  // }

   const res = await fetch(
    `https://rebar-xbackend.vercel.app/api/blog-posts?depth=2&limit=100`
  );

   const data = await res.json();

  const blog = data.docs?.find(
    (post) => slugify(post.slug) === params.slug
  );

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "This blog post does not exist.",
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || "",
    openGraph: {
      title: blog.ogTitle || blog.metaTitle || blog.title,
      description: blog.ogDescription || blog.metaDescription || "",
      url: `https://rebar-xbackend.vercel.app/blog/${blog.slug}`,
      images: blog.ogImage?.cloudinaryUrl
        ? [blog.ogImage.cloudinaryUrl]
        : blog.mainImage?.cloudinaryUrl
          ? [blog.mainImage.cloudinaryUrl]
          : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.twitterTitle || blog.metaTitle || blog.title,
      description: blog.twitterDescription || blog.metaDescription || "",
      images: blog.twitterImage?.cloudinaryUrl
        ? [blog.twitterImage.cloudinaryUrl]
        : blog.mainImage?.cloudinaryUrl
          ? [blog.mainImage.cloudinaryUrl]
          : [],
    },
    alternates: {
      canonical:
        blog.canonicalURL ||
        `https://rebar-xbackend.vercel.app/blog/${blog.slug}`,
    },
  };
}

export default function Blog() {
  return (
    <BlogPost />
  )
}