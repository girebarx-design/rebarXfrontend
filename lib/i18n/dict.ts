// Translation dictionary for the code-controlled pages/chrome (Nav, Footer,
// Contact, Resources, Compare, Calculator intro). CMS-driven content (nav
// link labels, footer link labels, contact form field labels, comparison
// spec table values, most of the homepage) is out of scope — it stays
// English until Payload localization is set up separately.
//
// Style: full Devanagari throughout, the way Hindi business/tech writing
// actually reads (Dainik Bhaskar business desk, not a textbook) — English
// loanwords are transliterated into Devanagari (फैक्ट्री, इंजीनियर,
// डिलीवरी) rather than left in Latin script, since switching scripts
// mid-sentence is what makes mixed copy feel uncomfortable to read. Only
// genuine acronyms/codes/brand names that have no Hindi form at all —
// GFRP, TMT, IS 18256, RebarX, measurement units — stay as-is.

export type DictEntry = { en: string; hi: string };

export const dict = {
  common: {
    contactUs: { en: "Contact us", hi: "संपर्क करें" },
    talkToEngineer: { en: "Talk to an engineer", hi: "इंजीनियर से बात करें" },
    chatWhatsApp: { en: "Chat on WhatsApp", hi: "व्हाट्सएप पर बात करें" },
    estimateNeeds: { en: "Estimate your rebar needs", hi: "अपनी रीबार ज़रूरत का अंदाज़ा लगाएं" },
    home: { en: "Home", hi: "होम" },
  },

  nav: {
    downloads: { en: "Downloads", hi: "डाउनलोड" },
    viewAllResources: { en: "View all resources →", hi: "सभी रिसोर्स देखें →" },
  },

  footer: {
    tagline: {
      en: "RebarX manufactures GFRP reinforcement bar in Central India — rust-free, twice the tensile strength of steel, and built for a hundred-year service life.",
      hi: "RebarX मध्य भारत में अपनी फैक्ट्री में GFRP रीबार बनाता है — जंग-रहित, स्टील से दुगुनी मज़बूती, और सौ साल तक चलने के लिए बनाया गया।",
    },
    company: { en: "Company", hi: "कंपनी" },
    legal: { en: "Legal", hi: "कानूनी जानकारी" },
    downloads: { en: "Downloads", hi: "डाउनलोड" },
    getInTouch: { en: "Get in touch", hi: "संपर्क करें" },
    madeIn: { en: "Made in Madhya Pradesh, India", hi: "मध्य प्रदेश, भारत में निर्मित" },
    rightsReserved: { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" },
  },

  contactForm: {
    sendEnquiry: { en: "Send enquiry", hi: "पूछताछ भेजें" },
    sending: { en: "Sending…", hi: "भेजा जा रहा है…" },
    messagePlaceholder: {
      en: "Tell us about your project — element type, quantity, and location.",
      hi: "अपने प्रोजेक्ट के बारे में बताएं — किस तरह का एलिमेंट, कितनी मात्रा, और कहाँ के लिए।",
    },
    errorMsg: {
      en: "Something went wrong. Please try WhatsApp or email us directly.",
      hi: "कुछ गड़बड़ हो गई। कृपया व्हाट्सएप पर या सीधे ईमेल करके संपर्क करें।",
    },
    doneTitle: { en: "Thank you — we've got your enquiry.", hi: "धन्यवाद — आपकी पूछताछ हमें मिल गई है।" },
    doneBody: {
      en: "Our team typically responds within one working day. For anything urgent, message us on WhatsApp.",
      hi: "हमारी टीम आमतौर पर एक कार्यदिवस के भीतर जवाब देती है। किसी जल्दी वाले काम के लिए व्हाट्सएप पर मैसेज करें।",
    },
  },

  contactPage: {
    eyebrow: { en: "Contact", hi: "संपर्क" },
    h1: { en: "Talk to our GFRP team", hi: "हमारी GFRP टीम से बात करें" },
    description: {
      en: "Tell us about your project and we'll come back with sizing, quantities and a delivered price.",
      hi: "अपने प्रोजेक्ट के बारे में बताएं, हम साइज़, मात्रा और डिलीवरी सहित कीमत के साथ जवाब देंगे।",
    },
    factoryOffice: { en: "Factory & office", hi: "फैक्ट्री और ऑफिस" },
    openInMaps: { en: "Open in Maps →", hi: "मैप्स में खोलें →" },
    phone: { en: "Phone", hi: "फ़ोन" },
    phoneHours: { en: "Mon–Sat, 9:30am–6:30pm IST", hi: "सोमवार–शनिवार, सुबह 9:30 – शाम 6:30" },
    email: { en: "Email", hi: "ईमेल" },
    quickAnswer: { en: "Need a quick answer? Message us — we reply in minutes.", hi: "जल्दी जवाब चाहिए? हमें मैसेज करें — कुछ ही मिनटों में जवाब मिलेगा।" },
    sendAnEnquiry: { en: "Send an enquiry", hi: "पूछताछ भेजें" },
    breadcrumbContact: { en: "Contact", hi: "संपर्क" },
  },

  resourcesPage: {
    breadcrumb: { en: "Resources", hi: "रिसोर्स" },
    eyebrow: { en: "Resources", hi: "रिसोर्स" },
    h1: { en: "Technical Resource Center", hi: "टेक्निकल रिसोर्स सेंटर" },
    intro: {
      en: "Everything a consultant, structural engineer, or procurement team needs to evaluate GFRP rebar — company documents, the research we cite, and the standards every RebarX bar is manufactured and tested to.",
      hi: "किसी भी कंसल्टेंट, स्ट्रक्चरल इंजीनियर या खरीद टीम को GFRP रीबार परखने के लिए जो कुछ चाहिए — कंपनी के दस्तावेज़, वो रिसर्च जिसका हम हवाला देते हैं, और वो मानक जिनके अनुसार हर RebarX बार बनाई और जांची जाती है।",
    },
    companyDocs: { en: "Company Documents", hi: "कंपनी दस्तावेज़" },
    referencedResearch: { en: "Referenced Research", hi: "संदर्भित रिसर्च" },
    referencedResearchSub: {
      en: "Independent, peer-reviewed studies we cite in our own technical writing — not marketing material, the actual source documents.",
      hi: "स्वतंत्र, पीयर-रिव्यूड अध्ययन जिनका हवाला हम अपने तकनीकी लेखन में देते हैं — ये मार्केटिंग सामग्री नहीं, असली मूल दस्तावेज़ हैं।",
    },
    readAnalysis: { en: "Read our analysis:", hi: "हमारा विश्लेषण पढ़ें:" },
    readAnalysisLink: {
      en: "Does GFRP Rebar Degrade Over Time? What 20 Years of Real Bridges Show →",
      hi: "क्या GFRP रीबार समय के साथ कमज़ोर होता है? 20 साल पुराने असली पुलों का डेटा →",
    },
    complianceStandards: { en: "Compliance Standards", hi: "अनुपालन मानक" },
    complianceStandardsSub: {
      en: "Every RebarX bar is manufactured and tested against these.",
      hi: "हर RebarX बार इन्हीं मानकों के अनुसार बनाई और जांची जाती है।",
    },
    whereWeDeliver: { en: "Where we deliver", hi: "हम कहाँ-कहाँ डिलीवरी करते हैं" },
    whereWeDeliverSub: {
      en: "State-specific manufacturing and delivery details, including our honest logistics for states outside Madhya Pradesh.",
      hi: "हर राज्य के लिए निर्माण और डिलीवरी की पूरी जानकारी, मध्य प्रदेश के बाहर की सच्ची लॉजिस्टिक्स सहित।",
    },
    ctaHeading: { en: "Need a specific test certificate or compliance document?", hi: "किसी खास टेस्ट सर्टिफिकेट या अनुपालन दस्तावेज़ की ज़रूरत है?" },
  },

  complianceCovers: {
    "IS 18256": {
      en: "GFRP bars for concrete reinforcement — the primary Indian material standard RebarX is manufactured to.",
      hi: "कंक्रीट रीइन्फोर्समेंट के लिए GFRP बार — वो मुख्य भारतीय मटीरियल मानक जिसके अनुसार RebarX बनाई जाती है।",
    },
    "ACI 440.11-22": {
      en: "Design code for structural concrete reinforced with GFRP bars.",
      hi: "GFRP बार से रीइन्फोर्स्ड स्ट्रक्चरल कंक्रीट के लिए डिज़ाइन कोड।",
    },
    "ASTM D7957": {
      en: "Standard specification for GFRP bars — tensile strength, fiber content, glass transition temperature.",
      hi: "GFRP बार के लिए मानक विशिष्टता — मज़बूती, फाइबर मात्रा, ग्लास ट्रांज़िशन तापमान।",
    },
    "ASTM D7205": {
      en: "Test method for tensile properties of FRP bars.",
      hi: "FRP बार की मज़बूती जांचने की टेस्ट पद्धति।",
    },
  },

  comparePage: {
    breadcrumb: { en: "Compare", hi: "तुलना" },
    eyebrow: { en: "GFRP vs TMT steel", hi: "GFRP बनाम TMT स्टील" },
    h1: { en: "GFRP Rebar vs TMT Steel Rebar", hi: "GFRP रीबार बनाम TMT स्टील रीबार" },
    intro: {
      en: "GFRP rebar has roughly 2x the tensile strength of TMT steel by weight, is about 80% lighter, and does not corrode — no rust staining, no chloride-driven spalling, no theft value for scrap. TMT steel still has a higher modulus of elasticity and remains the more conventionally specified option for deflection-sensitive designs. Below is the full spec-by-spec comparison.",
      hi: "वज़न के हिसाब से GFRP रीबार की मज़बूती TMT स्टील से लगभग दुगुनी है, यह करीब 80% हल्का है, और इसमें जंग नहीं लगती — न जंग के दाग, न नमी से टूटन, न चोरी होकर बिकने का खतरा। TMT स्टील की कठोरता (मोड्युलस ऑफ इलास्टिसिटी) अभी भी ज़्यादा है, इसलिए झुकाव-संवेदनशील डिज़ाइन में यह ज़्यादा आम रहता है। नीचे पूरी तुलना विस्तार से दी गई है।",
    },
    readFull: { en: "Read the full GFRP vs TMT comparison →", hi: "पूरी GFRP बनाम TMT तुलना पढ़ें →" },
    faqHeading: { en: "Frequently asked questions", hi: "अक्सर पूछे जाने वाले सवाल" },
    ctaHeading: { en: "Still deciding between GFRP and TMT steel for your project?", hi: "अभी भी तय नहीं कर पाए कि अपने प्रोजेक्ट के लिए GFRP लें या TMT स्टील?" },
    seeStandards: { en: "See compliance standards", hi: "अनुपालन मानक देखें" },
    faqs: [
      {
        q: { en: "Is GFRP rebar stronger than TMT steel rebar?", hi: "क्या GFRP रीबार, TMT स्टील रीबार से ज़्यादा मज़बूत है?" },
        a: {
          en: "By tensile strength, yes — GFRP rebar has roughly twice the tensile strength of Fe500 TMT steel, weight for weight. TMT steel still has higher stiffness (modulus of elasticity), which is why design codes size GFRP reinforcement differently rather than swapping it in at a 1:1 bar count.",
          hi: "मज़बूती के हिसाब से, हाँ — वज़न के हिसाब से GFRP रीबार की मज़बूती Fe500 TMT स्टील से लगभग दुगुनी है। TMT स्टील की कठोरता अभी भी ज़्यादा है, इसलिए डिज़ाइन कोड GFRP रीइन्फोर्समेंट को अलग तरीके से नापते हैं, सीधे बराबर संख्या में बदलते नहीं।",
        },
      },
      {
        q: { en: "Does GFRP rebar rust like steel rebar?", hi: "क्या GFRP रीबार में भी स्टील रीबार की तरह जंग लगती है?" },
        a: {
          en: "No. GFRP rebar is a glass-fibre-reinforced polymer with no iron content, so it has no corrosion mechanism at all — no rust staining, no spalling from expanding rust, and no chloride-induced corrosion in marine or water-contact structures.",
          hi: "नहीं। GFRP रीबार एक ग्लास-फाइबर-रीइन्फोर्स्ड पॉलिमर है जिसमें लोहा होता ही नहीं, इसलिए इसमें जंग लगने का कोई तरीका ही नहीं है — न जंग के दाग, न फैलती जंग से टूटन, और न ही समुद्री या पानी के संपर्क वाले ढांचों में नमक से होने वाला क्षरण।",
        },
      },
      {
        q: { en: "When is TMT steel still the better choice over GFRP rebar?", hi: "GFRP रीबार की जगह TMT स्टील कब बेहतर विकल्प रहता है?" },
        a: {
          en: "For structures needing high stiffness under service loads with minimal deflection, or where local codes and consultants haven't yet approved GFRP for that specific application, TMT steel remains the conventional, more broadly specified choice. RebarX is upfront about this rather than positioning GFRP as a universal replacement.",
          hi: "जिन ढांचों में ज़्यादा भार सहने के साथ कम-से-कम झुकाव चाहिए, या जहाँ स्थानीय कोड और कंसल्टेंट ने अभी उस खास इस्तेमाल के लिए GFRP को मंज़ूरी नहीं दी है, वहाँ TMT स्टील ही ज़्यादा आम और पारंपरिक विकल्प रहता है। RebarX इस बारे में साफ़ बात करता है, GFRP को हर जगह के लिए एक जैसा विकल्प नहीं बताता।",
        },
      },
      {
        q: { en: "Is GFRP rebar more expensive than TMT steel?", hi: "क्या GFRP रीबार, TMT स्टील से महंगा है?" },
        a: {
          en: "Per-kg pricing is typically higher than TMT steel, but GFRP's lower weight (about 80% lighter) reduces transport and handling cost, and eliminating corrosion removes a major long-term maintenance and repair cost that steel-reinforced structures carry over their service life.",
          hi: "प्रति-किलो कीमत आमतौर पर TMT स्टील से ज़्यादा होती है, लेकिन GFRP का कम वज़न (लगभग 80% हल्का) ढुलाई और संभालने की लागत घटाता है, और जंग न लगने से वो बड़ा दीर्घकालिक रखरखाव और मरम्मत खर्च भी बचता है जो स्टील-रीइन्फोर्स्ड ढांचों में सालों तक चलता रहता है।",
        },
      },
    ],
  },

  geo: {
    whatsappMessage: {
      en: "Hi RebarX, I'm looking for GFRP rebar in {state}.",
      hi: "नमस्ते RebarX, मुझे {state} में GFRP रीबार चाहिए।",
    },
    areasWeServe: { en: "Areas we serve", hi: "हम कहाँ-कहाँ सेवा देते हैं" },
    factoryOffice: { en: "Factory & office", hi: "फैक्ट्री और ऑफिस" },
    phone: { en: "Phone:", hi: "फ़ोन:" },
    getDirections: { en: "Get directions and full contact details →", hi: "रास्ता और पूरी संपर्क जानकारी पाएं →" },
    faqHeading: { en: "Frequently asked questions", hi: "अक्सर पूछे जाने वाले सवाल" },
    alsoServing: { en: "Also serving", hi: "यहाँ भी सेवा देते हैं" },
    contactUs: { en: "Contact us", hi: "संपर्क करें" },
    sharedFaqManufacture: {
      q: { en: "Does RebarX manufacture GFRP rebar, or resell stock from elsewhere?", hi: "क्या RebarX खुद GFRP रीबार बनाता है, या कहीं और से मंगाकर बेचता है?" },
      a: {
        en: "We manufacture it ourselves, at our own factory in Pithampur, Madhya Pradesh. We're not a trader or reseller adding a markup on top of someone else's product.",
        hi: "हम इसे खुद अपनी फैक्ट्री में बनाते हैं, पीथमपुर, मध्य प्रदेश में। हम किसी और के प्रोडक्ट पर मुनाफ़ा जोड़ने वाले व्यापारी या रीसेलर नहीं हैं।",
      },
    },
    sharedFaqStandard: {
      q: { en: "What standard is RebarX GFRP rebar tested to?", hi: "RebarX GFRP रीबार किस मानक के अनुसार जांचा जाता है?" },
      a: {
        en: "IS 18256 — tensile strength, fiber content, and glass transition temperature are tested per batch, with 100% epoxy resin declared in writing.",
        hi: "IS 18256 — हर बैच में मज़बूती, फाइबर मात्रा, और ग्लास ट्रांज़िशन तापमान जांचा जाता है, और 100% एपॉक्सी रेज़िन लिखित रूप से घोषित किया जाता है।",
      },
    },
    pincodeFaqQ: {
      en: "Do you deliver to every pincode in {state}, or only major cities?",
      hi: "क्या आप {state} के हर पिनकोड पर डिलीवरी करते हैं, या सिर्फ़ बड़े शहरों में?",
    },
    pincodeFaqA: {
      en: "Every pincode in the state, not just the major cities listed on this page. Those cities are our main dispatch hubs — smaller towns and rural project sites across {state} are served too.",
      hi: "इस पेज पर बताए गए बड़े शहरों तक सीमित नहीं — हम {state} के हर पिनकोड पर डिलीवरी करते हैं। ये शहर हमारे मुख्य डिस्पैच हब हैं, छोटे कस्बे और ग्रामीण प्रोजेक्ट साइट भी शामिल हैं।",
    },
  },

  calculatorPage: {
    eyebrow: { en: "Free tool", hi: "मुफ़्त टूल" },
    h1: { en: "GFRP Rebar Calculator", hi: "GFRP रीबार कैलकुलेटर" },
    intro: {
      en: "Enter your slab dimensions — or just the span and load if you haven't sized it yet — and get the bar diameter, spacing, total length, weight, and estimated savings versus TMT steel.",
      hi: "अपने स्लैब का माप डालें — या अगर अभी साइज़ तय नहीं की है तो सिर्फ़ स्पैन और लोड डालें — और बार का व्यास, दूरी, कुल लंबाई, वज़न, और TMT स्टील के मुकाबले होने वाली बचत का अंदाज़ा पाएं।",
    },
    calculatorNote: {
      en: "This calculator's interactive labels are shown in English for now — a full Hindi version is a separate follow-up.",
      hi: "इस कैलकुलेटर के अंदर के लेबल अभी अंग्रेज़ी में हैं — पूरा हिंदी वर्शन अलग से किया जाएगा।",
    },
  },
} as const;
