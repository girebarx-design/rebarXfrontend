export type WhyUsCard = { title: string; subtitle: string; body: string };
export type Faq = { q: string; a: string };

export type GeoPageData = {
  slug: string;
  stateName: string;
  metaTitle: string;
  metaDescription: string;
  ogDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  ctaLabel: string;
  whyHeading: string;
  whyUs: WhyUsCard[];
  areasIntro: string;
  cities: string[];
  ctaHeading: string;
  faqs: Faq[];
};

const PHONE = "+91 95300 13034";
export const PHONE_HREF = "+919530013034";
export const ADDRESS =
  "Plot Number 8B, 8C, Industrial Area - Sector 3, Pithampur, Madhya Pradesh";
export { PHONE };

// Shared across every state page — same real product/compliance facts,
// not state-specific, so it isn't duplicated per state in GEO_PAGES.
export const SHARED_FAQS: Faq[] = [
  {
    q: "Does RebarX manufacture GFRP rebar, or resell stock from elsewhere?",
    a: "We manufacture it ourselves, at our own factory in Pithampur, Madhya Pradesh. We're not a trader or reseller adding a markup on top of someone else's product.",
  },
  {
    q: "What standard is RebarX GFRP rebar tested to?",
    a: "IS 18256 — tensile strength, fiber content, and glass transition temperature are tested per batch, with 100% epoxy resin declared in writing.",
  },
];

export const GEO_PAGES: GeoPageData[] = [
  {
    slug: "madhya-pradesh",
    stateName: "Madhya Pradesh",
    metaTitle: "GFRP Rebar Manufacturer in Madhya Pradesh — Indore, Pithampur | RebarX",
    metaDescription:
      "RebarX manufactures GFRP rebar directly from our factory in Pithampur, Madhya Pradesh — 20 minutes from Indore. Direct factory pricing, faster dispatch across MP, no long-haul freight.",
    ogDescription:
      "Manufactured in Pithampur, Madhya Pradesh — near Indore. Direct factory pricing and faster dispatch across MP.",
    eyebrow: "Madhya Pradesh",
    h1: "GFRP Rebar Manufacturer in Madhya Pradesh",
    intro:
      "RebarX is manufactured at our own factory in Pithampur, Madhya Pradesh — about 20 minutes from Indore. If you're building in or around MP, that means a local factory relationship, not a reseller shipping stock in from another state.",
    ctaLabel: "Talk to our Pithampur team",
    whyHeading: "Why a local manufacturer matters",
    whyUs: [
      {
        title: "Faster dispatch",
        subtitle: "Local factory",
        body: "Orders for Indore, Pithampur, Dewas and Ujjain typically move same-day to next-day — no multi-day interstate freight between order and dispatch.",
      },
      {
        title: "No middleman markup",
        subtitle: "Direct factory pricing",
        body: "You're buying from the manufacturer, not a stockist or reseller adding a margin on top of freight from another state.",
      },
      {
        title: "Engineering support in person",
        subtitle: "Factory visits welcome",
        body: "Visit the Pithampur facility, see the manufacturing process, and talk sizing and specification directly with our engineering team.",
      },
      {
        title: "Same product, same standards",
        subtitle: "IS 18256 compliant",
        body: "Local doesn't mean a different product — every bar is the same epoxy-based, IS 18256-tested GFRP rebar we ship pan-India.",
      },
    ],
    areasIntro:
      "We deliver to every pincode across Madhya Pradesh — the cities below are our major hubs, not the limit of where we ship. Beyond MP, it's pan-India delivery and export, with the shortest lead times closest to the factory.",
    cities: [
      "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas",
      "Satna", "Ratlam", "Rewa", "Katni", "Singrauli", "Burhanpur", "Khandwa",
      "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur",
      "Damoh", "Mandsaur", "Khargone", "Neemuch", "Pithampur", "Itarsi",
      "Sehore", "Morena", "Betul", "Seoni", "Balaghat", "Narmadapuram",
      "Shahdol", "Dhar", "Anuppur", "Datia", "Mandla", "Tikamgarh",
      "Ashoknagar", "Harda", "Raisen", "Dindori", "Umaria", "Panna", "Sidhi",
      "Alirajpur", "Jhabua", "Barwani", "Sheopur", "Niwari", "Agar Malwa",
      "Rajgarh", "Mhow", "Maihar", "Nagda",
    ],
    ctaHeading: "Building in Indore or anywhere in MP? Let's talk sizing.",
    faqs: [
      {
        q: "How fast can GFRP rebar be delivered around Indore and Madhya Pradesh?",
        a: "Because the factory is local, dispatch to Indore, Pithampur, Dewas and Ujjain is typically same-day to next-day, without the multi-day freight lead time of ordering from an out-of-state manufacturer.",
      },
      {
        q: "Can I visit the RebarX factory before placing an order?",
        a: "Yes — the factory is in Pithampur's Industrial Area, Sector 3. Contact us to arrange a visit or a technical discussion with our engineering team in person.",
      },
      {
        q: "Does RebarX deliver outside Madhya Pradesh too?",
        a: "Yes, we deliver pan-India and export — Madhya Pradesh is simply where we manufacture, so customers here get the shortest lead times and lowest freight cost.",
      },
    ],
  },
  {
    slug: "maharashtra",
    stateName: "Maharashtra",
    metaTitle: "GFRP Rebar Supplier in Maharashtra — Mumbai, Pune, Nagpur | RebarX",
    metaDescription:
      "RebarX ships GFRP rebar direct from our Madhya Pradesh factory to Maharashtra — Mumbai, Pune, Nagpur and every district. IS 18256 compliant, corrosion-proof, no reseller markup.",
    ogDescription:
      "Direct-from-manufacturer GFRP rebar for Maharashtra, shipped from our Madhya Pradesh factory. IS 18256 compliant, corrosion-proof.",
    eyebrow: "Maharashtra",
    h1: "GFRP Rebar Supplier in Maharashtra",
    intro:
      "RebarX manufactures GFRP rebar at our own factory in Pithampur, Madhya Pradesh, and ships direct to projects across Maharashtra — Mumbai, Pune, Nagpur and every district in between. We're honest about the logistics: we don't have a depot in Maharashtra, so you're buying factory-direct from another state, not from a local warehouse. What that buys you is the same IS 18256-tested bar, with no reseller sitting between you and the manufacturer.",
    ctaLabel: "Talk to an engineer",
    whyHeading: "Why RebarX for Maharashtra construction",
    whyUs: [
      {
        title: "Built for coastal exposure",
        subtitle: "Corrosion-proof",
        body: "Mumbai's salt air, the Konkan coastline, and Maharashtra's monsoon humidity are exactly the conditions that corrode steel reinforcement over time. GFRP doesn't rust — there's no corrosion mechanism to accelerate in the first place.",
      },
      {
        title: "Direct from the manufacturer",
        subtitle: "No reseller markup",
        body: "You're ordering from the factory that makes the bar, not a trader or stockist adding a margin on freight from somewhere else.",
      },
      {
        title: "Same compliance, every state",
        subtitle: "IS 18256 tested",
        body: "The bar that ships to Maharashtra is tested to the identical standard as the bar we sell in Madhya Pradesh — tensile strength, fiber content, and resin declared in writing.",
      },
      {
        title: "Honest about logistics",
        subtitle: "No fictitious local depot",
        body: "We won't claim a Maharashtra warehouse we don't have. Dispatch is interstate from Pithampur — factor that into your project timeline, and we'll give you a real lead time up front.",
      },
    ],
    areasIntro:
      "We deliver to every pincode across Maharashtra — the cities below are where most of our project inquiries come from, not the limit of where we ship. Beyond Maharashtra, it's pan-India delivery and export.",
    cities: [
      "Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Chhatrapati Sambhajinagar",
      "Solapur", "Kolhapur", "Amravati", "Nanded", "Sangli", "Akola", "Latur",
      "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Jalgaon", "Bhiwandi",
      "Jalna", "Panvel", "Satara", "Beed", "Yavatmal", "Gondia", "Dharashiv",
      "Nandurbar", "Wardha", "Malegaon", "Vasai-Virar", "Navi Mumbai",
      "Pimpri-Chinchwad", "Alibag", "Ratnagiri", "Sindhudurg", "Buldhana",
      "Washim", "Hingoli", "Gadchiroli", "Bhandara", "Palghar", "Karad",
      "Ichalkaranji", "Baramati",
    ],
    ctaHeading: "Building in Maharashtra? Let's talk sizing and lead times.",
    faqs: [
      {
        q: "How long does delivery take from your factory to Maharashtra?",
        a: "It's an interstate dispatch from Pithampur, Madhya Pradesh, so lead time depends on your district. We quote a specific dispatch-to-delivery window against your actual order rather than a single blanket number for the whole state.",
      },
      {
        q: "Does RebarX have a depot or warehouse in Maharashtra?",
        a: "No — we're straightforward about that. Every order ships interstate from the Pithampur factory. There's no local Maharashtra stock to draw from, so build the transit time into your project schedule.",
      },
      {
        q: "Can I visit the factory or talk to an engineer before ordering?",
        a: "The factory is in Pithampur, Madhya Pradesh, so an in-person visit means travel — but we regularly do technical calls and video walkthroughs for customers in Maharashtra, and an in-person visit is always welcome if it's convenient for you.",
      },
    ],
  },
  {
    slug: "uttar-pradesh",
    stateName: "Uttar Pradesh",
    metaTitle: "GFRP Rebar Supplier in Uttar Pradesh — Lucknow, Noida, Kanpur | RebarX",
    metaDescription:
      "RebarX ships GFRP rebar direct from our Madhya Pradesh factory to projects across Uttar Pradesh. IS 18256 compliant, 2x tensile strength of steel, no reseller markup.",
    ogDescription:
      "Direct-from-manufacturer GFRP rebar for Uttar Pradesh, shipped from our Madhya Pradesh factory. IS 18256 compliant.",
    eyebrow: "Uttar Pradesh",
    h1: "GFRP Rebar Supplier in Uttar Pradesh",
    intro:
      "Uttar Pradesh is India's most populous state and one of the largest ongoing infrastructure buildouts — expressways, urban housing, water and civic infrastructure. RebarX manufactures GFRP rebar at our factory in Pithampur, Madhya Pradesh, and ships direct to projects across UP. We don't have a depot in the state — every order is an interstate dispatch from the factory, and we'd rather say that plainly than imply a local presence we don't have.",
    ctaLabel: "Talk to an engineer",
    whyHeading: "Why RebarX for Uttar Pradesh construction",
    whyUs: [
      {
        title: "Built for large-scale work",
        subtitle: "80% lighter than steel",
        body: "On highway, expressway, and large urban housing pours, GFRP's weight advantage over steel means faster handling and less crane/labor time per tonne of reinforcement moved.",
      },
      {
        title: "Direct from the manufacturer",
        subtitle: "No reseller markup",
        body: "You're ordering from the factory, not a trader or stockist adding a margin on freight from another state.",
      },
      {
        title: "Same compliance, every project",
        subtitle: "IS 18256 tested",
        body: "Every batch shipped to UP is tested to the same standard as the bar we sell at the factory gate — tensile strength, fiber content, resin declared in writing.",
      },
      {
        title: "Honest about logistics",
        subtitle: "No fictitious local depot",
        body: "We ship interstate from Pithampur, Madhya Pradesh. Ask us for a real lead time for your specific district before you plan around it.",
      },
    ],
    areasIntro:
      "We deliver to every pincode across Uttar Pradesh — the cities below are where most of our project inquiries come from, not the limit of where we ship. Beyond UP, it's pan-India delivery and export.",
    cities: [
      "Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi",
      "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur",
      "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura",
      "Rampur", "Shahjahanpur", "Farrukhabad", "Ayodhya", "Ghazipur",
      "Ballia", "Basti", "Sultanpur", "Fatehpur", "Pratapgarh", "Raebareli",
      "Unnao", "Hardoi", "Sitapur", "Bahraich", "Gonda", "Etawah", "Mainpuri",
      "Etah", "Budaun", "Bijnor", "Amroha", "Hapur", "Bulandshahr", "Hathras",
      "Kasganj", "Deoria", "Azamgarh", "Mau", "Jaunpur", "Chandauli",
      "Mirzapur", "Sonbhadra", "Banda", "Hamirpur", "Jalaun", "Lalitpur",
      "Barabanki", "Pilibhit", "Shamli",
    ],
    ctaHeading: "Building in UP? Let's talk sizing and lead times.",
    faqs: [
      {
        q: "How long does delivery take from your factory to Uttar Pradesh?",
        a: "It's an interstate dispatch from Pithampur, Madhya Pradesh, so lead time depends on your district. We quote a specific dispatch-to-delivery window against your actual order rather than a single blanket number for the whole state.",
      },
      {
        q: "Does RebarX have a depot or warehouse in Uttar Pradesh?",
        a: "No — every order ships interstate from the Pithampur factory. There's no local UP stock to draw from, so factor transit time into your project schedule.",
      },
      {
        q: "Can I visit the factory or talk to an engineer before ordering?",
        a: "The factory is in Pithampur, Madhya Pradesh, so an in-person visit means travel — but we regularly run technical calls and video walkthroughs for customers in UP, and an in-person visit is welcome if it's convenient for you.",
      },
    ],
  },
  {
    slug: "punjab",
    stateName: "Punjab",
    metaTitle: "GFRP Rebar Supplier in Punjab — Ludhiana, Amritsar, Jalandhar | RebarX",
    metaDescription:
      "RebarX ships GFRP rebar direct from our Madhya Pradesh factory to Punjab — Ludhiana, Amritsar, Jalandhar and beyond. IS 18256 compliant, corrosion-proof for agri and water infrastructure.",
    ogDescription:
      "Direct-from-manufacturer GFRP rebar for Punjab, shipped from our Madhya Pradesh factory. IS 18256 compliant, corrosion-proof.",
    eyebrow: "Punjab",
    h1: "GFRP Rebar Supplier in Punjab",
    intro:
      "Punjab's canal networks, irrigation structures, and grain storage infrastructure sit in constant contact with moisture and chemical exposure — exactly where corrosion eats into steel reinforcement fastest. RebarX manufactures GFRP rebar at our factory in Pithampur, Madhya Pradesh, and ships direct to projects across Punjab. We don't have a depot in the state; every order is an interstate dispatch, priced factory-direct with no reseller in between.",
    ctaLabel: "Talk to an engineer",
    whyHeading: "Why RebarX for Punjab construction",
    whyUs: [
      {
        title: "Built for agri and water infrastructure",
        subtitle: "Corrosion-proof",
        body: "Canal linings, irrigation structures, and grain storage in Punjab sit in near-constant moisture and chemical exposure — conditions that corrode steel over years. GFRP has no corrosion mechanism to begin with.",
      },
      {
        title: "Direct from the manufacturer",
        subtitle: "No reseller markup",
        body: "You're ordering from the factory that makes the bar, not a trader or stockist adding a margin on freight from another state.",
      },
      {
        title: "Same compliance, every state",
        subtitle: "IS 18256 tested",
        body: "The bar shipped to Punjab is tested to the identical standard as the bar sold at the factory gate — tensile strength, fiber content, resin declared in writing.",
      },
      {
        title: "Honest about logistics",
        subtitle: "No fictitious local depot",
        body: "We ship interstate from Pithampur, Madhya Pradesh. Ask us for a real lead time for your district before you plan a project timeline around it.",
      },
    ],
    areasIntro:
      "We deliver to every pincode across Punjab — the cities below are where most of our project inquiries come from, not the limit of where we ship. Beyond Punjab, it's pan-India delivery and export.",
    cities: [
      "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali",
      "Hoshiarpur", "Batala", "Moga", "Malerkotla", "Khanna", "Muktsar",
      "Barnala", "Firozpur", "Kapurthala", "Faridkot", "Sangrur", "Gurdaspur",
      "Rajpura", "Phagwara", "Abohar", "Pathankot", "Zirakpur", "Nabha",
      "Rupnagar", "Fazilka", "Tarn Taran", "Mansa", "Fatehgarh Sahib",
      "Jagraon", "Ajnala", "Malout", "Nawanshahr", "Sardulgarh", "Kot Kapura",
    ],
    ctaHeading: "Building in Punjab? Let's talk sizing and lead times.",
    faqs: [
      {
        q: "How long does delivery take from your factory to Punjab?",
        a: "It's an interstate dispatch from Pithampur, Madhya Pradesh, so lead time depends on your district. We quote a specific dispatch-to-delivery window against your actual order rather than a single blanket number for the whole state.",
      },
      {
        q: "Does RebarX have a depot or warehouse in Punjab?",
        a: "No — every order ships interstate from the Pithampur factory. There's no local Punjab stock to draw from, so factor transit time into your project schedule.",
      },
      {
        q: "Can I visit the factory or talk to an engineer before ordering?",
        a: "The factory is in Pithampur, Madhya Pradesh, so an in-person visit means travel — but we regularly run technical calls and video walkthroughs for customers in Punjab, and an in-person visit is welcome if it's convenient for you.",
      },
    ],
  },
];

export function getGeoPage(slug: string): GeoPageData | undefined {
  return GEO_PAGES.find((g) => g.slug === slug);
}
