// // lib/getSEO.ts
// export async function getSEO() {
//   const res = await fetch(
//     "https://rebar-xbackend.vercel.app/api/globals/seo",
//     {
//       next: { revalidate: 60 }, // or `cache: 'no-store'` for no caching
//     }
//   );

//   if (!res.ok) return null;

//   console.log(res, 'this is ressss')

//   const data = await res.json();
//   return data;
// }


// lib/getSEO.ts
export async function getSEO() {
  const res = await fetch(
    "https://rebar-xbackend.vercel.app/api/globals/seo",
    {
      next: { revalidate: 60 }, // or `cache: 'no-store'` for no caching
    }
  );

  if (!res.ok) return null;

  // console.log(res, 'this is ressss')

  const data = await res.json();
  return data;
}
