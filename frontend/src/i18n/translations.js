export const languages = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिंदी' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' }
];

export const translations = {
  en: {
    // Navbar
    brandTitle: "GrainVision",
    brandSubtitle: "Identify rice types from a photo",
    smartBadge: "Smart Image Analysis",
    navHome: "Home",
    navAnalyzer: "Analyzer",
    navHowItWorks: "How It Works",
    navAbout: "About",
    ctaAnalyze: "Analyze Rice",

    // Hero
    heroBadge: "Rice Grain Classification Using Deep Learning",
    heroHeadline: "Identify Rice Types From a Photo",
    heroSupportingText: "Upload a clear photo of rice grains and GrainVision AI will analyze the image to identify the most likely variety.",
    btnAnalyzePhoto: "Analyze a Photo",
    btnHowItWorks: "How It Works",
    trustVarieties: "8 Supported Varieties",
    trustAnalysis: "Simple Photo Analysis",
    trustSpeed: "Fast Results",

    // Home - Overview
    overviewBadge: "Overview",
    overviewTitle: "Rice Grain Classification Using Deep Learning",
    overviewText: "GrainVision AI makes it simple to identify rice varieties using a photograph. Upload an image, let the system analyze the visible characteristics of the grains, and receive an estimated variety with a confidence level.",

    // Rice Varieties
    varietiesTitle: "Supported Rice Varieties",
    varietiesSubtitle: "Explore the 8 rice varieties GrainVision AI can identify.",
    btnViewAllVarieties: "View All Varieties",

    // Home - How It Works Preview
    howItWorksPreviewTitle: "Simple as 1, 2, 3",
    howItWorksPreviewSubtitle: "Three simple steps to identify your rice variety.",
    step1Title: "1. Upload a Photo",
    step1Desc: "Choose a clear image of the rice grains.",
    step2Title: "2. Let GrainVision Analyze",
    step2Desc: "The system examines visible grain characteristics.",
    step3Title: "3. Get Your Result",
    step3Desc: "See the most likely variety and confidence estimate.",
    btnSeeHowItWorks: "See How It Works",

    // Home - Why Use
    whyTitle: "Why Use GrainVision?",
    whySubtitle: "Built to be accessible, fast, and clear.",
    whyEasyTitle: "Easy to Use",
    whyEasyDesc: "Just upload a photo—no complicated setup.",
    whyQuickTitle: "Quick Results",
    whyQuickDesc: "Get an identification result within moments.",
    whyClearTitle: "Clear Results",
    whyClearDesc: "See the identified variety and how closely the image matched each supported variety.",

    // Home - Final CTA
    finalCtaTitle: "Ready to Identify Your Rice?",
    finalCtaSubtitle: "Upload a photo and discover the rice variety in just a few moments.",
    btnAnalyzeRicePhoto: "Analyze a Rice Photo",
    githubRepo: "GitHub Repository",

    // Analyzer Page
    analyzerTitle: "Which Rice Variety Is This?",
    analyzerSubtitle: "Upload a photo and let GrainVision AI take a look.",
    uploadDropText: "Drop your rice photo here",
    uploadOrText: "or choose an image from your device",
    btnChoosePhoto: "Choose Photo",
    supportedFormats: "JPG, PNG or WEBP • Up to 10 MB",
    imageReady: "Image ready",
    btnIdentifyRice: "Identify Rice",
    analyzingText: "Analyzing your photo...",
    identifiedVariety: "Identified Variety",
    matchConfidence: "Match Confidence",
    matchBreakdownHeader: "How the image matched each variety",
    supportedCount: "8 Varieties",
    disclaimerText: "Results are image-based estimates and may vary with image quality, lighting, and grain appearance.",
    btnReset: "Analyze Another Image",
    awaitingTitle: "Awaiting Image Analysis",
    awaitingSubtitle: "Select a rice grain image to begin.",
    supportedVarietiesLabel: "Supported Varieties:",
    supportedVarietiesValue: "8 Rice Types",
    analysisModeLabel: "Analysis Mode:",
    analysisModeValue: "Visual Grain Recognition",
    analysisNoticeTitle: "Analysis Notice",

    // About This Rice Section
    aboutThisRiceTitle: "About This Rice",
    whySpecialTitle: "Why It's Special",
    howGrownTitle: "How It's Commonly Grown",
    commonUsesTitle: "Common Uses",
    popularDishesTitle: "Popular Dishes",
    characteristicsTitle: "Characteristics",
    grainTypeLabel: "Grain Type",
    textureLabel: "Cooked Texture",
    aromaLabel: "Aroma Profile",

    // How It Works Page
    howItWorksPageTitle: "How It Works",
    howItWorksPageSubtitle: "Simple steps to identify your rice variety.",
    processTitle: "The Analysis Process",
    processSubtitle: "Understanding the journey from image upload to final prediction.",
    step1FullTitle: "Upload a Photo",
    step1FullDesc: "Choose a clear photo of the rice grains.",
    step2FullTitle: "Let GrainVision Take a Look",
    step2FullDesc: "The system examines the visible characteristics of the grains.",
    step3FullTitle: "Get Your Result",
    step3FullDesc: "See the most likely rice variety and confidence estimate.",
    forBetterResultsTitle: "For Better Results",
    forBetterResultsSubtitle: "Follow these simple guidelines to get the most consistent image predictions.",
    confidenceMeaningTitle: "What Does Confidence Mean?",
    confidenceMeaningDesc: "The confidence percentage shows how strongly the system's analysis matched the selected variety compared with the other supported varieties. It is an estimate, not a guarantee.",
    btnTryAnalyzer: "Try the Analyzer",

    // Guidance Tips
    tip1: "Use a clear, well-lit photo",
    tip2: "Keep the grains visible",
    tip3: "Avoid heavily blurred images",
    tip4: "Avoid extreme shadows",
    tip5: "Use images where the rice grains are easy to see",
    tip6: "Try a different photo if the result seems uncertain",

    // About Page
    aboutPageTitle: "About GrainVision AI",
    aboutPageSubtitle: "Making rice variety identification easier through image-based analysis.",
    aboutWhatTitle: "What is GrainVision AI?",
    aboutWhatDesc: "GrainVision AI is a smart image-based tool designed to identify eight rice varieties from photographs. Users can upload a rice image and receive an estimated variety along with a confidence distribution.",
    aboutWhyTitle: "Why GrainVision?",
    aboutWhyDesc: "Identifying rice varieties from appearance can be difficult when different varieties share similar visual characteristics. GrainVision AI provides a simple way to explore these differences using an image.",
    aboutSupportedTitle: "Supported Rice Varieties",
    aboutSupportedSubtitle: "Detailed overview of the eight rice varieties GrainVision AI can categorize.",
    techTitle: "Technology Behind GrainVision",
    techSubtitle: "How system components work together to deliver image analysis.",
    techCard1Title: "Image Analysis",
    techCard1Desc: "Helps examine visual characteristics in uploaded grain photos.",
    techCard2Title: "Smart Pattern Recognition",
    techCard2Desc: "Uses learned examples to compare the uploaded image with supported varieties.",
    techCard3Title: "Web-Based Experience",
    techCard3Desc: "Designed to make the analysis accessible through a simple browser interface.",
    githubTitle: "Explore Open Source Code",
    githubDesc: "Interested in learning more about the project implementation details and documentation?",
    btnViewGithub: "View Project on GitHub",

    // Variety Descriptions
    arborioDesc: "Short to medium-grain rice commonly used in creamy rice dishes.",
    basmatiDesc: "Long-grain aromatic rice known for its distinctive fragrance and widely enjoyed in India.",
    hmtDesc: "Popular medium-grain rice variety widely cultivated and consumed across India (Sona Masuri type).",
    ipsalaDesc: "Medium-grain rice variety associated with Turkish rice-growing regions.",
    jasmineDesc: "Fragrant long-grain rice commonly enjoyed in South and Southeast Asian cuisine.",
    jhiliDesc: "Short to medium-grain rice variety recognized for its compact kernel shape.",
    karacadagDesc: "Medium-grain rice variety associated with Turkey.",
    masuriDesc: "Popular commercial medium-grain rice variety widely consumed in South Asia.",

    // Variety Types
    arborioType: "Short to Medium-Grain",
    basmatiType: "Long-Grain Aromatic",
    hmtType: "Medium-Grain (Sona Masuri)",
    ipsalaType: "Medium-Grain",
    jasmineType: "Fragrant Long-Grain",
    jhiliType: "Short to Medium-Grain",
    karacadagType: "Medium-Grain",
    masuriType: "Medium-Grain",

    // Variety Origins
    arborioOrigin: "Italy",
    basmatiOrigin: "India / Pakistan",
    hmtOrigin: "India",
    ipsalaOrigin: "Turkey",
    jasmineOrigin: "Thailand",
    jhiliOrigin: "South Asia",
    karacadagOrigin: "Turkey",
    masuriOrigin: "India",

    // Errors
    errSelectImage: "Please select an image first.",
    errInvalidFormat: "Please upload a JPG, JPEG, PNG, or WEBP image.",
    errFileSize: "Image size exceeds the 10 MB limit.",
    errServerConnect: "Unable to connect to the prediction server.",

    // Footer
    footerSubtitle: "Smart rice variety identification from images."
  },

  hi: {
    // Navbar
    brandTitle: "GrainVision",
    brandSubtitle: "एक फोटो से चावल के प्रकार पहचानें",
    smartBadge: "स्मार्ट फोटो विश्लेषण",
    navHome: "होम",
    navAnalyzer: "विश्लेषण",
    navHowItWorks: "यह कैसे काम करता है",
    navAbout: "हमारे बारे में",
    ctaAnalyze: "चावल की पहचान करें",

    // Hero
    heroBadge: "डीप लर्निंग का उपयोग करके चावल दाना वर्गीकरण",
    heroHeadline: "एक फोटो से चावल की किस्म पहचानें",
    heroSupportingText: "चावल के दानों की एक साफ़ फोटो अपलोड करें और GrainVision AI उस तस्वीर का विश्लेषण करके सबसे संभावित किस्म बताएगा।",
    btnAnalyzePhoto: "एक फोटो का विश्लेषण करें",
    btnHowItWorks: "यह कैसे काम करता है",
    trustVarieties: "8 समर्थित किस्में",
    trustAnalysis: "सरल फोटो विश्लेषण",
    trustSpeed: "त्वरित परिणाम",

    // Home - Overview
    overviewBadge: "अवलोकन",
    overviewTitle: "डीप लर्निंग का उपयोग करके चावल वर्गीकरण",
    overviewText: "GrainVision AI फोटो के ज़रिए चावल की किस्मों को पहचानना आसान बनाता है। एक फोटो अपलोड करें, सिस्टम को दानों की विशेषताओं का विश्लेषण करने दें, और विश्वास स्तर के साथ अनुमानित किस्म प्राप्त करें।",

    // Rice Varieties
    varietiesTitle: "समर्थित चावल की किस्में",
    varietiesSubtitle: "जानें कि GrainVision AI किन 8 चावल किस्मों की पहचान कर सकता है।",
    btnViewAllVarieties: "सभी किस्में देखें",

    // Home - How It Works Preview
    howItWorksPreviewTitle: "1, 2, 3 जितना आसान",
    howItWorksPreviewSubtitle: "चावल की किस्म पहचानने के तीन आसान चरण।",
    step1Title: "1. फोटो अपलोड करें",
    step1Desc: "चावल के दानों की एक साफ़ फोटो चुनें।",
    step2Title: "2. GrainVision को विश्लेषण करने दें",
    step2Desc: "सिस्टम दानों की दृश्य विशेषताओं का विश्लेषण करता है।",
    step3Title: "3. परिणाम देखें",
    step3Desc: "सबसे संभावित किस्म और विश्वास स्तर देखें।",
    btnSeeHowItWorks: "यह कैसे काम करता है देखें",

    // Home - Why Use
    whyTitle: "GrainVision का उपयोग क्यों करें?",
    whySubtitle: "आसान, तेज़ और स्पष्ट अनुभव के लिए निर्मित।",
    whyEasyTitle: "उपयोग में आसान",
    whyEasyDesc: "बस एक फोटो अपलोड करें—कोई जटिल सेटअप नहीं।",
    whyQuickTitle: "त्वरित परिणाम",
    whyQuickDesc: "कुछ ही पलों में पहचान का परिणाम प्राप्त करें।",
    whyClearTitle: "स्पष्ट परिणाम",
    whyClearDesc: "पहचानी गई किस्म और अन्य समर्थित किस्मों से तुलना देखें।",

    // Home - Final CTA
    finalCtaTitle: "क्या आप अपने चावल की किस्म पहचानने के लिए तैयार हैं?",
    finalCtaSubtitle: "एक फोटो अपलोड करें और कुछ ही क्षणों में चावल की किस्म जानें।",
    btnAnalyzeRicePhoto: "चावल की फोटो का विश्लेषण करें",
    githubRepo: "GitHub Repository",

    // Analyzer Page
    analyzerTitle: "यह कौन-सी चावल की किस्म है?",
    analyzerSubtitle: "एक फोटो अपलोड करें और GrainVision AI को उसका विश्लेषण करने दें।",
    uploadDropText: "यहाँ चावल की फोटो डालें",
    uploadOrText: "या अपने डिवाइस से एक फोटो चुनें",
    btnChoosePhoto: "फोटो चुनें",
    supportedFormats: "JPG, PNG या WEBP • 10 MB तक",
    imageReady: "फोटो तैयार है",
    btnIdentifyRice: "चावल की पहचान करें",
    analyzingText: "आपकी फोटो का विश्लेषण हो रहा है...",
    identifiedVariety: "पहचानी गई किस्म",
    matchConfidence: "विश्वास स्तर",
    matchBreakdownHeader: "अन्य किस्मों से तुलना",
    supportedCount: "8 किस्में",
    disclaimerText: "परिणाम केवल फोटो-आधारित अनुमान हैं और फोटो की गुणवत्ता, रोशनी और दानों की बनावट के अनुसार भिन्न हो सकते हैं।",
    btnReset: "दूसरी फोटो का विश्लेषण करें",
    awaitingTitle: "फोटो विश्लेषण की प्रतीक्षा में",
    awaitingSubtitle: "शुरू करने के लिए एक फोटो चुनें।",
    supportedVarietiesLabel: "समर्थित किस्में:",
    supportedVarietiesValue: "8 चावल किस्मों",
    analysisModeLabel: "विश्लेषण मोड:",
    analysisModeValue: "दृश्य दाना पहचान",
    analysisNoticeTitle: "विश्लेषण सूचना",

    // About This Rice Section
    aboutThisRiceTitle: "इस चावल के बारे में",
    whySpecialTitle: "यह क्यों खास है",
    howGrownTitle: "इसकी खेती कैसे होती है",
    commonUsesTitle: "सामान्य उपयोग",
    popularDishesTitle: "लोकप्रिय व्यंजन",
    characteristicsTitle: "विशेषताएं",
    grainTypeLabel: "दाना का प्रकार",
    textureLabel: "पकाने के बाद बनावट",
    aromaLabel: "सुगंध",

    // How It Works Page
    howItWorksPageTitle: "यह कैसे काम करता है",
    howItWorksPageSubtitle: "आपके चावल की किस्म पहचानने के सरल चरण।",
    processTitle: "विश्लेषण प्रक्रिया",
    processSubtitle: "फोटो अपलोड से लेकर परिणाम तक की प्रक्रिया को समझें।",
    step1FullTitle: "फोटो अपलोड करें",
    step1FullDesc: "चावल के दानों की एक साफ़ फोटो चुनें।",
    step2FullTitle: "GrainVision को देखने दें",
    step2FullDesc: "सिस्टम दानों की दृश्य विशेषताओं का विश्लेषण करता है।",
    step3FullTitle: "परिणाम देखें",
    step3FullDesc: "सबसे संभावित चावल की किस्म और विश्वास स्तर देखें।",
    forBetterResultsTitle: "बेहतर परिणामों के लिए",
    forBetterResultsSubtitle: "सबसे सटीक परिणामों के लिए इन सरल सुझावों का पालन करें।",
    confidenceMeaningTitle: "विश्वास स्तर का क्या अर्थ है?",
    confidenceMeaningDesc: "विश्वास प्रतिशत यह बताता है कि तस्वीर अन्य उपलब्ध किस्मों की तुलना में चुनी गई किस्म से कितनी मजबूती से मेल खाती है।",
    btnTryAnalyzer: "विश्लेषण टूल आज़माएं",

    // Guidance Tips
    tip1: "एक साफ़ और अच्छी रोशनी वाली फोटो का उपयोग करें",
    tip2: "चावल के दानों को स्पष्ट रूप से दिखाई देने दें",
    tip3: "धुंधली (ब्लर) फोटो से बचें",
    tip4: "गहरी छाया या अंधेरे से बचें",
    tip5: "ऐसी फोटो का उपयोग करें जहाँ दाने आसानी से दिखें",
    tip6: "यदि परिणाम अनिश्चित लगे तो दूसरी फोटो का प्रयास करें",

    // About Page
    aboutPageTitle: "GrainVision AI के बारे में",
    aboutPageSubtitle: "फोटो विश्लेषण के माध्यम से चावल की किस्मों की पहचान आसान बनाना।",
    aboutWhatTitle: "GrainVision AI क्या है?",
    aboutWhatDesc: "GrainVision AI एक स्मार्ट फोटो-आधारित टूल है जिसे तस्वीरों से आठ चावल किस्मों को पहचानने के लिए डिज़ाइन किया गया है।",
    aboutWhyTitle: "GrainVision क्यों?",
    aboutWhyDesc: "दिखावट से चावल की किस्मों को पहचानना मुश्किल हो सकता है जब अलग-अलग किस्मों की विशेषताएं समान हों।",
    aboutSupportedTitle: "समर्थित चावल की किस्में",
    aboutSupportedSubtitle: "आठ चावल किस्मों का विस्तृत विवरण जो GrainVision AI पहचान सकता है।",
    techTitle: "GrainVision के पीछे की तकनीक",
    techSubtitle: "प्रणाली के घटक कैसे मिलकर फोटो का विश्लेषण करते हैं।",
    techCard1Title: "फोटो विश्लेषण",
    techCard1Desc: "अपलोड की गई फोटो में दानों की विशेषताओं का विश्लेषण करने में मदद करता है।",
    techCard2Title: "स्मार्ट पैटर्न पहचान",
    techCard2Desc: "अपलोड की गई फोटो की तुलना समर्थित किस्मों से करने के लिए सीखे गए उदाहरणों का उपयोग करता है।",
    techCard3Title: "वेब-आधारित अनुभव",
    techCard3Desc: "सरल ब्राउज़र इंटरफ़ेस के माध्यम से विश्लेषण को सुलभ बनाने के लिए डिज़ाइन किया गया।",
    githubTitle: "ओपन सोर्स कोड देखें",
    githubDesc: "परियोजना के कार्यान्वयन और दस्तावेज़ के बारे में अधिक जानने में रुचि रखते हैं?",
    btnViewGithub: "GitHub पर प्रोजेक्ट देखें",

    // Variety Descriptions
    arborioDesc: "छोटे से मध्यम दाने वाला चावल जो मलाईदार चावल के व्यंजनों में उपयोग किया जाता है।",
    basmatiDesc: "अपनी खास खुशबू के लिए जाना जाने वाला लंबे दाने वाला सुगंधित चावल।",
    hmtDesc: "भारत में व्यापक रूप से उगाया जाने वाला लोकप्रिय मध्यम दाने वाला चावल (सोना मसूरी)।",
    ipsalaDesc: "तुर्की के चावल उगाने वाले क्षेत्रों से जुड़ी मध्यम दाने वाली चावल की किस्म।",
    jasmineDesc: "दक्षिण और दक्षिण-पूर्व एशियाई व्यंजनों में पसंद किया जाने वाला सुगंधित लंबे दाने वाला चावल।",
    jhiliDesc: "छोटे से मध्यम दाने वाली चावल की किस्म।",
    karacadagDesc: "तुर्की क्षेत्र से जुड़ी मध्यम दाने वाली चावल की किस्म।",
    masuriDesc: "दक्षिण एशिया में व्यापक रूप से खाया जाने वाला लोकप्रिय मध्यम दाने वाला चावल।",

    // Variety Types
    arborioType: "छोटे से मध्यम दाने वाला",
    basmatiType: "लंबे दाने वाला सुगंधित",
    hmtType: "मध्यम दाने वाला (सोना मसूरी)",
    ipsalaType: "मध्यम दाने वाला",
    jasmineType: "सुगंधित लंबे दाने वाला",
    jhiliType: "छोटे से मध्यम दाने वाला",
    karacadagType: "मध्यम दाने वाला",
    masuriType: "मध्यम दाने वाला",

    // Variety Origins
    arborioOrigin: "इटली",
    basmatiOrigin: "भारत / पाकिस्तान",
    hmtOrigin: "भारत",
    ipsalaOrigin: "तुर्की",
    jasmineOrigin: "थाईलैंड",
    jhiliOrigin: "दक्षिण एशिया",
    karacadagOrigin: "तुर्की",
    masuriOrigin: "भारत",

    // Errors
    errSelectImage: "कृपया पहले एक फोटो चुनें।",
    errInvalidFormat: "कृपया JPG, JPEG, PNG या WEBP फोटो अपलोड करें।",
    errFileSize: "फोटो का आकार 10 MB की सीमा से अधिक है।",
    errServerConnect: "विश्लेषण सर्वर से कनेक्ट नहीं हो सका।",

    // Footer
    footerSubtitle: "एक फोटो से चावल के प्रकार पहचानें।"
  },

  kn: {
    // Navbar
    brandTitle: "GrainVision",
    brandSubtitle: "ಒಂದು ಫೋಟೋದಿಂದ ಅಕ್ಕಿಯ ವಿಧವನ್ನು ಗುರುತಿಸಿ",
    smartBadge: "ಸ್ಮಾರ್ಟ್ ಫೋಟೋ ವಿಶ್ಲೇಷಣೆ",
    navHome: "ಮುಖಪುಟ",
    navAnalyzer: "ವಿಶ್ಲೇಷಣೆ",
    navHowItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    navAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
    ctaAnalyze: "ಅಕ್ಕಿಯ ವಿಧ ಗುರುತಿಸಿ",

    // Hero
    heroBadge: "ಡೀಪ್ ಲರ್ನಿಂಗ್ ಬಳಸಿ ಅಕ್ಕಿ ಕಾಳುಗಳ ವರ್ಗೀಕರಣ",
    heroHeadline: "ಒಂದು ಫೋಟೋದಿಂದ ಅಕ್ಕಿಯ ವಿಧವನ್ನು ಗುರುತಿಸಿ",
    heroSupportingText: "ಅಕ್ಕಿ ಕಾಳುಗಳ ಸ್ಪಷ್ಟವಾದ ಫೋಟೋವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ. GrainVision AI ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ ಹೆಚ್ಚು ಹೊಂದಿಕೆಯಾಗುವ ಅಕ್ಕಿಯ ವಿಧವನ್ನು ಗುರುತಿಸುತ್ತದೆ.",
    btnAnalyzePhoto: "ಒಂದು ಫೋಟೋ ವಿಶ್ಲೇಷಿಸಿ",
    btnHowItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    trustVarieties: "8 ಬೆಂಬಲಿತ ವಿಧಗಳು",
    trustAnalysis: "ಸರಳ ಫೋಟೋ ವಿಶ್ಲೇಷಣೆ",
    trustSpeed: "ವೇಗದ ಫಲಿತಾಂಶ",

    // Home - Overview
    overviewBadge: "ಅವಲೋಕನ",
    overviewTitle: "ಡೀಪ್ ಲರ್ನಿಂಗ್ ಬಳಸಿ ಅಕ್ಕಿ ಕಾಳುಗಳ ವರ್ಗೀಕರಣ",
    overviewText: "GrainVision AI ಫೋಟೋ ಮೂಲಕ ಅಕ್ಕಿಯ ವಿಧಗಳನ್ನು ಗುರುತಿಸುವುದನ್ನು ಸರಳಗೊಳಿಸುತ್ತದೆ. ಒಂದು ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ, ಸಿಸ್ಟಮ್ ಕಾಳುಗಳ ಗೋಚರ ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲು ಬಿಡಿ ಮತ್ತು ವಿಶ್ವಾಸ ಮಟ್ಟದೊಂದಿಗೆ ಅಂದಾಜು ವಿಧವನ್ನು ಪಡೆಯಿರಿ.",

    // Rice Varieties
    varietiesTitle: "ಬೆಂಬಲಿತ ಅಕ್ಕಿಯ ವಿಧಗಳು",
    varietiesSubtitle: "GrainVision AI ಗುರುತಿಸಬಹುದಾದ 8 ಅಕ್ಕಿ ವಿಧಗಳನ್ನು ನೋಡಿ.",
    btnViewAllVarieties: "ಎಲ್ಲಾ ವಿಧಗಳನ್ನು ನೋಡಿ",

    // Home - How It Works Preview
    howItWorksPreviewTitle: "1, 2, 3 ರಷ್ಟೇ ಸರಳ",
    howItWorksPreviewSubtitle: "ನಿಮ್ಮ ಅಕ್ಕಿಯ ವಿಧವನ್ನು ಗುರುತಿಸಲು ಮೂರು ಸರಳ ಹಂತಗಳು.",
    step1Title: "1. ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    step1Desc: "ಅಕ್ಕಿ ಕಾಳುಗಳ ಸ್ಪಷ್ಟವಾದ ಫೋಟೋವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    step2Title: "2. GrainVision ವಿಶ್ಲೇಷಿಸಲು ಬಿಡಿ",
    step2Desc: "ಸಿಸ್ಟಮ್ ಕಾಳುಗಳ ಗೋಚರ ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.",
    step3Title: "3. ಫಲಿತಾಂಶವನ್ನು ನೋಡಿ",
    step3Desc: "ಹೆಚ್ಚು ಹೊಂದಿಕೆಯಾಗುವ ವಿಧ ಮತ್ತು ವಿಶ್ವಾಸ ಮಟ್ಟವನ್ನು ನೋಡಿ.",
    btnSeeHowItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ ಎಂದು ನೋಡಿ",

    // Home - Why Use
    whyTitle: "GrainVision ಏಕೆ ಬಳಸಬೇಕು?",
    whySubtitle: "ಸರಳ, ವೇಗದ ಮತ್ತು ಸ್ಪಷ್ಟ ಅನುಭವಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.",
    whyEasyTitle: "ಬಳಸಲು ಸುಲಭ",
    whyEasyDesc: "ಒಂದು ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ—ಯಾವುದೇ ಸಂಕೀರ್ಣ ಸೆಟಪ್ ಇಲ್ಲ.",
    whyQuickTitle: "ವೇಗದ ಫಲಿತಾಂಶ",
    whyQuickDesc: "ಕೆಲವೇ ಕ್ಷಣಗಳಲ್ಲಿ ಗುರುತಿಸುವಿಕೆಯ ಫಲಿತಾಂಶವನ್ನು ಪಡೆಯಿರಿ.",
    whyClearTitle: "ಸ್ಪಷ್ಟ ಫಲಿತಾಂಶ",
    whyClearDesc: "ಗುರುತಿಸಲಾದ ವಿಧ ಮತ್ತು ಇತರ ಬೆಂಬಲಿತ ವಿಧಗಳೊಂದಿಗೆ ಹೋಲಿಕೆಯನ್ನು ನೋಡಿ.",

    // Home - Final CTA
    finalCtaTitle: "ನಿಮ್ಮ ಅಕ್ಕಿಯ ವಿಧವನ್ನು ಗುರುತಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
    finalCtaSubtitle: "ಒಂದು ಫೋಟೋವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಕೆಲವೇ ಕ್ಷಣಗಳಲ್ಲಿ ಅಕ್ಕಿಯ ವಿಧವನ್ನು ತಿಳಿದುಕೊಳ್ಳಿ.",
    btnAnalyzeRicePhoto: "ಅಕ್ಕಿಯ ಫೋಟೋವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    githubRepo: "GitHub Repository",

    // Analyzer Page
    analyzerTitle: "ಇದು ಯಾವ ಅಕ್ಕಿಯ ವಿಧ?",
    analyzerSubtitle: "ಒಂದು ಫೋಟೋವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ ಮತ್ತು GrainVision AI ಅದನ್ನು ವಿಶ್ಲೇಷಿಸಲು ಬಿಡಿ.",
    uploadDropText: "ನಿಮ್ಮ ಅಕ್ಕಿಯ ಫೋಟೋವನ್ನು ಇಲ್ಲಿ ಹಾಕಿ",
    uploadOrText: "ಅಥವಾ ನಿಮ್ಮ ಸಾಧನದಿಂದ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ",
    btnChoosePhoto: "ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ",
    supportedFormats: "JPG, PNG ಅಥವಾ WEBP • 10 MB ವರೆಗೆ",
    imageReady: "ಚಿತ್ರ ಸಿದ್ಧವಾಗಿದೆ",
    btnIdentifyRice: "ಅಕ್ಕಿಯ ವಿಧ ಗುರುತಿಸಿ",
    analyzingText: "ನಿಮ್ಮ ಫೋಟೋವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    identifiedVariety: "ಗುರುತಿಸಲಾದ ಅಕ್ಕಿಯ ವಿಧ",
    matchConfidence: "ಹೊಂದಾಣಿಕೆಯ ವಿಶ್ವಾಸ",
    matchBreakdownHeader: "ಇತರ ವಿಧಗಳೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆ",
    supportedCount: "8 ವಿಧಗಳು",
    disclaimerText: "ಫಲಿತಾಂಶಗಳು ಚಿತ್ರ-ಆಧಾರಿತ ಅಂದಾಜುಗಳಾಗಿವೆ ಮತ್ತು ಚಿತ್ರದ ಗುಣಮಟ್ಟ, ಬೆಳಕು ಮತ್ತು ಕಾಳುಗಳ ನೋಟಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಬದಲಾಗಬಹುದು.",
    btnReset: "ಮತ್ತೊಂದು ಫೋಟೋ ವಿಶ್ಲೇಷಿಸಿ",
    awaitingTitle: "ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆಯ ನಿರೀಕ್ಷೆಯಲ್ಲಿ",
    awaitingSubtitle: "ಪ್ರಾರಂಭಿಸಲು ಒಂದು ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ.",
    supportedVarietiesLabel: "ಬೆಂಬಲಿತ ವಿಧಗಳು:",
    supportedVarietiesValue: "8 ಅಕ್ಕಿ ವಿಧಗಳು",
    analysisModeLabel: "ವಿಶ್ಲೇಷಣಾ ವಿಧಾನ:",
    analysisModeValue: "ಗೋಚರ ಕಾಳುಗಳ ಗುರುತಿಸುವಿಕೆ",
    analysisNoticeTitle: "ವಿಶ್ಲೇಷಣಾ ಸೂಚನೆ",

    // About This Rice Section
    aboutThisRiceTitle: "ಈ ಅಕ್ಕಿಯ ಬಗ್ಗೆ",
    whySpecialTitle: "ಇದು ಏಕೆ ವಿಶೇಷ",
    howGrownTitle: "ಇದನ್ನು ಸಾಮಾನ್ಯವಾಗಿ ಹೇಗೆ ಬೆಳೆಯಲಾಗುತ್ತದೆ",
    commonUsesTitle: "ಸಾಮಾನ್ಯ ಬಳಕೆಗಳು",
    popularDishesTitle: "ಜನಪ್ರಿಯ ಖಾದ್ಯಗಳು",
    characteristicsTitle: "ಲಕ್ಷಣಗಳು",
    grainTypeLabel: "ಅಕ್ಕಿ ಧಾನ್ಯದ ಮಾದರಿ",
    textureLabel: "ಬೇಯಿಸಿದ ನಂತರದ ಹದ",
    aromaLabel: "ಸುವಾಸನೆ",

    // How It Works Page
    howItWorksPageTitle: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    howItWorksPageSubtitle: "ನಿಮ್ಮ ಅಕ್ಕಿಯ ವಿಧವನ್ನು ಗುರುತಿಸಲು ಸರಳ ಹಂತಗಳು.",
    processTitle: "ವಿಶ್ಲೇಷಣಾ ಪ್ರಕ್ರಿಯೆ",
    processSubtitle: "ಚಿತ್ರ ಅಪ್ಲೋಡ್‌ನಿಂದ ಅಂತಿಮ ಫಲಿತಾಂಶದವರೆಗಿನ ಹಂತಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    step1FullTitle: "ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    step1FullDesc: "ಅಕ್ಕಿ ಕಾಳುಗಳ ಸ್ಪಷ್ಟವಾದ ಫೋಟೋವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    step2FullTitle: "GrainVision ಗೆ ನೋಡಲು ಬಿಡಿ",
    step2FullDesc: "ಸಿಸ್ಟಮ್ ಕಾಳುಗಳ ಗೋಚರ ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.",
    step3FullTitle: "ಫಲಿತಾಂಶವನ್ನು ನೋಡಿ",
    step3FullDesc: "ಹೆಚ್ಚು ಹೊಂದಿಕೆಯಾಗುವ ಅಕ್ಕಿಯ ವಿಧ ಮತ್ತು ವಿಶ್ವಾಸ ಮಟ್ಟವನ್ನು ನೋಡಿ.",
    forBetterResultsTitle: "ಉತ್ತಮ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ",
    forBetterResultsSubtitle: "ನಿಖರ ಫಲಿತಾಂಶಗಳನ್ನು ಪಡೆಯಲು ಈ ಸರಳ ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ.",
    confidenceMeaningTitle: "ವಿಶ್ವಾಸದ ಮಟ್ಟ ಎಂದರೆ ಏನು?",
    confidenceMeaningDesc: "ವಿಶ್ವಾಸದ ಶೇಕಡಾವಾರು ಚಿತ್ರವು ಲಭ್ಯವಿರುವ ಇತರ ವಿಧಗಳಿಗೆ ಹೋಲಿಸಿದರೆ ಆಯ್ಕೆಮಾಡಲಾದ ಅಕ್ಕಿಯ ವಿಧಕ್ಕೆ ಎಷ್ಟು ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ತೋರಿಸುತ್ತದೆ.",
    btnTryAnalyzer: "ವಿಶ್ಲೇಷಕವನ್ನು ಬಳಸಿ ನೋಡಿ",

    // Guidance Tips
    tip1: "ಸ್ಪಷ್ಟವಾದ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕಿರುವ ಫೋಟೋ ಬಳಸಿ",
    tip2: "ಕಾಳುಗಳು ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣಿಸುವಂತೆ ಇರಿಸಿ",
    tip3: "ಅಸ್ಪಷ್ಟ (ಬ್ಲರ್) ಚಿತ್ರಗಳನ್ನು ತಪ್ಪಿಸಿ",
    tip4: "ತೀವ್ರವಾದ ನೆರಳುಗಳನ್ನು ತಪ್ಪಿಸಿ",
    tip5: "ಕಾಳುಗಳು ಸುಲಭವಾಗಿ ಕಾಣುವ ಫೋಟೋಗಳನ್ನು ಬಳಸಿ",
    tip6: "ಫಲಿತಾಂಶ ಅನಿಶ್ಚಿತವಾಗಿದ್ದರೆ ಮತ್ತೊಂದು ಫೋಟೋ ಪ್ರಯತ್ನಿಸಿ",

    // About Page
    aboutPageTitle: "GrainVision AI ಬಗ್ಗೆ",
    aboutPageSubtitle: "ಚಿತ್ರ ಆಧಾರಿತ ವಿಶ್ಲೇಷಣೆಯ ಮೂಲಕ ಅಕ್ಕಿ ವಿಧಗಳ ಗುರುತಿಸುವಿಕೆಯನ್ನು ಸರಳಗೊಳಿಸುವುದು.",
    aboutWhatTitle: "GrainVision AI ಎಂದರೆ ಏನು?",
    aboutWhatDesc: "GrainVision AI ಎಂಬುದು ಛಾಯಾಚಿತ್ರಗಳಿಂದ ಎಂಟು ಅಕ್ಕಿ ವಿಧಗಳನ್ನು ಗುರುತಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಸ್ಮಾರ್ಟ್ ಚಿತ್ರ-ಆಧಾರಿತ ಸಾಧನವಾಗಿದೆ.",
    aboutWhyTitle: "GrainVision ಏಕೆ?",
    aboutWhyDesc: "ವಿವಿಧ ವಿಧಗಳ ಅಕ್ಕಿ ಕಾಳುಗಳು ಒಂದೇ ರೀತಿಯ ಲಕ್ಷಣಗಳನ್ನು ಹೊಂದಿದ್ದಾಗ ನೋಟದಿಂದ ಗುರುತಿಸುವುದು ಕಷ್ಟವಾಗಬಹುದು.",
    aboutSupportedTitle: "ಬೆಂಬಲಿತ ಅಕ್ಕಿಯ ವಿಧಗಳು",
    aboutSupportedSubtitle: "GrainVision AI ಗುರುತಿಸಬಹುದಾದ ಎಂಟು ಅಕ್ಕಿ ವಿಧಗಳ ವಿವರವಾದ ಮಾಹಿತಿ.",
    techTitle: "GrainVision ಹಿನ್ನೆಲೆಯ ತಂತ್ರಜ್ಞಾನ",
    techSubtitle: "ಸಿಸ್ಟಮ್ ಘಟಕಗಳು ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಹೇಗೆ ಒಟ್ಟಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತವೆ.",
    techCard1Title: "ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆ",
    techCard1Desc: "ಅಪ್ಲೋಡ್ ಮಾಡಿದ ಫೋಟೋದಲ್ಲಿ ಕಾಳುಗಳ ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    techCard2Title: "ಸ್ಮಾರ್ಟ್ ಮಾದರಿ ಗುರುತಿಸುವಿಕೆ",
    techCard2Desc: "ಅಪ್ಲೋಡ್ ಮಾಡಿದ ಚಿತ್ರವನ್ನು ಬೆಂಬಲಿತ ವಿಧಗಳೊಂದಿಗೆ ಹೋಲಿಸಲು ಕಲಿತ ಮಾದರಿಗಳನ್ನು ಬಳಸುತ್ತದೆ.",
    techCard3Title: "ವೆಬ್ ಆಧಾರಿತ ಅನುಭವ",
    techCard3Desc: "ಸರಳ ಬ್ರೌಸರ್ ಮೂಲಕ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಸುಲಭವಾಗಿ ಲಭ್ಯಗೊಳಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
    githubTitle: "ಓಪನ್ ಸೋರ್ಸ್ ಕೋಡ್ ನೋಡಿ",
    githubDesc: "ಯೋಜನೆಯ ವಿವರಗಳು ಮತ್ತು ದಾಖಲೆಗಳ ಬಗ್ಗೆ ಹೆಚ್ಚು ತಿಳಿಯಲು ಆಸಕ್ತಿ ಇದೆಯೇ?",
    btnViewGithub: "GitHub ನಲ್ಲಿ ಪ್ರಾಜೆಕ್ಟ್ ನೋಡಿ",

    // Variety Descriptions
    arborioDesc: "ಕೆನೆಭರಿತ ಅನ್ನದ ಅಡುಗೆಗಳಲ್ಲಿ ಬಳಸಲಾಗುವ ಸಣ್ಣದಿಂದ ಮಧ್ಯಮ ಕಾಳಿನ ಅಕ್ಕಿ.",
    basmatiDesc: "ತನ್ನ ವಿಶಿಷ್ಟ ಸುವಾಸನೆಗೆ ಪ್ರಸಿದ್ಧವಾದ ಸುಗಂಧಿತ ಉದ್ದನೆಯ ಕಾಳಿನ ಅಕ್ಕಿ.",
    hmtDesc: "ಭಾರತದಲ್ಲಿ ವ್ಯಾಪಕವಾಗಿ ಬೆಳೆಯಲಾಗುವ ಜನಪ್ರಿಯ ಮಧ್ಯಮ ಕಾಳಿನ ಅಕ್ಕಿ (ಸೋನಾ ಮಸೂರಿ).",
    ipsalaDesc: "ಟರ್ಕಿಯ ಅಕ್ಕಿ ಬೆಳೆಯುವ ಪ್ರದೇಶಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ಮಧ್ಯಮ ಕಾಳಿನ ಅಕ್ಕಿಯ ವಿಧ.",
    jasmineDesc: "ದಕ್ಷಿಣ ಮತ್ತು ಆಗ್ನೇಯ ಏಷ್ಯಾದ ಅಡುಗೆಗಳಲ್ಲಿ ಬಳಸಲಾಗುವ ಸುಗಂಧಿತ ಉದ್ದನೆಯ ಕಾಳಿನ ಅಕ್ಕಿ.",
    jhiliDesc: "ಸಣ್ಣದಿಂದ ಮಧ್ಯಮ ಕಾಳಿನ ಅಕ್ಕಿಯ ವಿಧ.",
    karacadagDesc: "ಟರ್ಕಿ ಪ್ರದೇಶಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಮಧ್ಯಮ ಕಾಳಿನ ಅಕ್ಕಿಯ ವಿಧ.",
    masuriDesc: "ದಕ್ಷಿಣ ಏಷ್ಯಾದಲ್ಲಿ ವ್ಯಾಪಕವಾಗಿ ಬಳಸಲಾಗುವ ಜನಪ್ರಿಯ ಮಧ್ಯಮ ಕಾಳಿನ ಅಕ್ಕಿ.",

    // Variety Types
    arborioType: "ಸಣ್ಣದಿಂದ ಮಧ್ಯಮ ಕಾಳು",
    basmatiType: "ಉದ್ದನೆಯ ಕಾಳಿನ ಸುಗಂಧಿತ",
    hmtType: "ಮಧ್ಯಮ ಕಾಳು (ಸೋನಾ ಮಸೂರಿ)",
    ipsalaType: "ಮಧ್ಯಮ ಕಾಳು",
    jasmineType: "ಸುಗಂಧಿತ ಉದ್ದನೆಯ ಕಾಳು",
    jhiliType: "ಸಣ್ಣದಿಂದ ಮಧ್ಯಮ ಕಾಳು",
    karacadagType: "ಮಧ್ಯಮ ಕಾಳು",
    masuriType: "ಮಧ್ಯಮ ಕಾಳು",

    // Variety Origins
    arborioOrigin: "ಇಟಲಿ",
    basmatiOrigin: "ಭಾರತ / ಪಾಕಿಸ್ತಾನ",
    hmtOrigin: "ಭಾರತ",
    ipsalaOrigin: "ಟರ್ಕಿ",
    jasmineOrigin: "ಥೈಲ್ಯಾಂಡ್",
    jhiliOrigin: "ದಕ್ಷಿಣ ಏಷ್ಯಾ",
    karacadagOrigin: "ಟರ್ಕಿ",
    masuriOrigin: "ಭಾರತ",

    // Errors
    errSelectImage: "ದಯವಿಟ್ಟು ಮೊದಲು ಒಂದು ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ.",
    errInvalidFormat: "ದಯವಿಟ್ಟು JPG, JPEG, PNG ಅಥವಾ WEBP ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ.",
    errFileSize: "ಚಿತ್ರದ ಗಾತ್ರವು 10 MB ಮಿತಿಯನ್ನು ಮೀರಿದೆ.",
    errServerConnect: "ವಿಶ್ಲೇಷಣಾ ಸರ್ವರ್ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",

    // Footer
    footerSubtitle: "ಒಂದು ಫೋಟೋದಿಂದ ಅಕ್ಕಿಯ ವಿಧವನ್ನು ಗುರುತಿಸಿ."
  }
};
