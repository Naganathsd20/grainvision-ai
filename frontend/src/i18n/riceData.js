/**
 * GrainVision AI — Educational Rice Variety Information Data
 * 
 * Provides localized educational details for the 8 supported rice classes:
 * Arborio, Basmati, Ipsala, Jasmine, Jhili, Karacadag, Massori, SonaMasoori.
 * 
 * Complies with strict health & non-medical accuracy guidelines:
 * - No medical or disease cure/prevention claims
 * - Focuses on culinary, agricultural, texture, and cultural characteristics
 * - Full support for English (en), Hindi (hi), and Kannada (kn)
 */

export const riceInformation = {
  Arborio: {
    en: {
      about: "Arborio is a classic Italian short-to-medium grain rice famous for its plump, rounded shape and high amylopectin starch content.",
      whySpecial: "Releases surface starch slowly while simmering, producing a rich, creamy sauce while maintaining a firm, 'al dente' central core.",
      growing: "Primarily cultivated in the fertile Po Valley region of Piedmont and Lombardy in Northern Italy, nourished by alpine river basins.",
      commonUses: ["Creamy Italian risottos", "Classic rice pudding", "Arancini (stuffed rice croquettes)", "Baked rice dishes"],
      popularDishes: ["Mushroom Risotto", "Risotto alla Milanese", "Italian Arancini", "Creamy Vanilla Rice Pudding"],
      characteristics: {
        grainType: "Short to Medium Plump Grain",
        texture: "Rich & Creamy with firm center",
        aroma: "Mild & Absorbent"
      }
    },
    hi: {
      about: "अरबोरियो इटली का एक प्रसिद्ध छोटा-मध्यम दाने वाला चावल है जो अपने गोल आकार और प्राकृतिक स्टार्च सामग्री के लिए जाना जाता है।",
      whySpecial: "पकाने के दौरान यह धीरे-धीरे स्टार्च छोड़ता है, जिससे चावल में मलाईदार (क्रीमी) बनावट आती है और बीच का दाना हल्का सख्त रहता है।",
      growing: "यह मुख्य रूप से उत्तरी इटली के पीडमोंट और लोम्बार्डी के पो घाटी क्षेत्र की उपजाऊ नदी मैदान मिट्टी में उगाया जाता है।",
      commonUses: ["क्रीमी इतालवी रिसोट्टो", "चावल की खीर/पुडिंग", "अरनचिनी (चावल के स्नैक्स)", "बेक्ड राइस डिश"],
      popularDishes: ["मशरूम रिसोट्टो", "रिसोट्टो अल्ला मिलामीज़", "इतालवी अरनचिनी", "क्रीमी राइस पुडिंग"],
      characteristics: {
        grainType: "छोटा और मोटा गोल दाना",
        texture: "मलाईदार, नरम और क्रीमी",
        aroma: "हल्की और सौम्य"
      }
    },
    kn: {
      about: "ಆರ್ಬೋರಿಯೊ ಇಟಲಿಯ ಸಣ್ಣ-ಮಧ್ಯಮ ಗಾತ್ರದ ಅಕ್ಕಿಯಾಗಿದ್ದು, ತನ್ನ ದುಂಡಗಿನ ಆಕಾರ ಮತ್ತು ಹೆಚ್ಚಿನ ಪಿಷ್ಟದ ಅಂಶಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.",
      whySpecial: "ಬೇಯಿಸುವಾಗ ಇದು ನಿಧಾನವಾಗಿ ಪಿಷ್ಟವನ್ನು ಬಿಡುಗಡೆ ಮಾಡುತ್ತದೆ, ಇದು ಕ್ರೀಮಿ ಹದವನ್ನು ನೀಡುತ್ತದೆ ಮತ್ತು ಒಳಗಿನ ಧಾನ್ಯವು ಗಟ್ಟಿಯಾಗಿರುತ್ತದೆ.",
      growing: "ಇದನ್ನು ಪ್ರಧಾನವಾಗಿ ಉತ್ತರ ಇಟಲಿಯ ಪೀಡ್‌ಮಾಂಟ್ ಮತ್ತು ಲೊಂಬಾರ್ಡಿಯ ಪೋ ಕಣಿವೆ ಪ್ರದೇಶದ ಫಲವತ್ತಾದ ಮಣ್ಣಿನಲ್ಲಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ.",
      commonUses: ["ಕ್ರೀಮಿ ರಿಸೊಟ್ಟೊ", "ರೈಸ್ ಪುಡಿಂಗ್", "ಅರನ್ಚಿನಿ (ಸ್ಟಫ್ಡ್ ರೈಸ್ ಬಾಲ್ಸ್)", "ಬೆಕ್ಡ್ ರೈಸ್"],
      popularDishes: ["ಮಶ್ರೂಮ್ ರಿಸೊಟ್ಟೊ", "ರಿಸೊಟ್ಟೊ ಅಲ್ಲಾ ಮಿಲಾನೀಸ್", "ಇಟಾಲಿಯನ್ ಅರನ್ಚಿನಿ", "ಕ್ರೀಮಿ ರೈಸ್ ಪುಡಿಂಗ್"],
      characteristics: {
        grainType: "ಸಣ್ಣ ಮತ್ತು ದಪ್ಪ ಧಾನ್ಯ",
        texture: "ಕ್ರೀಮಿ ಮತ್ತು ಮೆದು",
        aroma: "ಸಾಮಾನ್ಯ ಸುವಾಸನೆ"
      }
    }
  },

  Basmati: {
    en: {
      about: "Basmati is a world-renowned long, slender-grained aromatic rice traditionally grown in the Himalayan foothills of South Asia.",
      whySpecial: "Elongates to over twice its raw length upon cooking, remaining light, fluffy, non-sticky, and infused with a distinctive fragrant aroma.",
      growing: "Cultivated in the fertile Indo-Gangetic plains of Northern India and Pakistan, watered by snow-fed Himalayan river networks.",
      commonUses: ["Festive biryanis", "Aromatic pulaos", "Steamed table rice alongside curries and dal", "Jeera (cumin) rice"],
      popularDishes: ["Hyderabadi Biryani", "Vegetable Pulao", "Jeera Rice", "Kashmiri Pulao"],
      characteristics: {
        grainType: "Extra Long Slender Grain",
        texture: "Fluffy, Light & Non-sticky",
        aroma: "Rich Pandan & Nutty Fragrance"
      }
    },
    hi: {
      about: "बासमती दुनिया भर में प्रसिद्ध लंबा, पतला और सुगंधित चावल है जो पारंपरिक रूप से हिमालय की तलहटी में उगाया जाता है।",
      whySpecial: "पकने पर यह अपने कच्चे आकार से दोगुना लंबा हो जाता है, बिल्कुल भी नहीं चिपकता और मनमोहक सुगंध देता है।",
      growing: "यह उत्तर भारत और पाकिस्तान के उपजाऊ भारत-गंगा के मैदानों में उगाया जाता है, जो हिमालय की नदियों से सिंचित होते हैं।",
      commonUses: ["शाही बिरयानी", "त्योहारों के पुलाव", "दाल और करी के साथ सादा भात", "जीरा राइस"],
      popularDishes: ["हैदराबादी बिरयानी", "वेजीटेबल पुलाव", "जीरा राइस", "कश्मीरी पुलाव"],
      characteristics: {
        grainType: "अत्यधिक लंबा और पतला दाना",
        texture: "हल्का, खिला-खिला और अलग",
        aroma: "विशेष मनमोहक सुगंध"
      }
    },
    kn: {
      about: "ಬಾಸುಮತಿ ಪ್ರಪಂಚದಾದ್ಯಂತ ಪ್ರಸಿದ್ಧವಾದ ಉದ್ದನೆಯ, ತೆಳುವಾದ ಮತ್ತು ಸುವಾಸನಾಯುಕ್ತ ಅಕ್ಕಿಯಾಗಿದ್ದು, ಹಿಮಾಲಯದ ಪಾದಬೆಟ್ಟಗಳಲ್ಲಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ.",
      whySpecial: "ಬೇಯಿಸಿದಾಗ ಇದು ತನ್ನ ಮೂಲ ಉದ್ದಕ್ಕಿಂತ ಎರಡರಷ್ಟು ಉದ್ದವಾಗುತ್ತದೆ, ಹಗುರವಾಗಿ, ಪ್ರತ್ಯೇಕವಾಗಿ ಮತ್ತು ಅತ್ಯುತ್ತಮ ಸುವಾಸನೆಯಿಂದ ಕೂಡಿರುತ್ತದೆ.",
      growing: "ಉತ್ತರ ಭಾರತ ಮತ್ತು ಪಾಕಿಸ್ತಾನದ ಫಲವತ್ತಾದ ಸಿಂಧೂ-ಗಂಗಾ ಮೈದಾನಗಳಲ್ಲಿ ಹಿಮಾಲಯದ ನದಿಗಳ ನೀರಿನಿಂದ ಬೆಳೆಯಲಾಗುತ್ತದೆ.",
      commonUses: ["ಶಾಹಿ ಬಿರಿಯಾನಿ", "ಹಬ್ಬದ ಪುಲಾವ್", "ಸಾಂಬಾರ್/ದಾಲ್ ಜೊತೆ ಸೇವಿಸುವ ಅನ್ನ", "ಜೀರಾ ರೈಸ್"],
      popularDishes: ["ಹೈದರಾಬಾದಿ ಬಿರಿಯಾನಿ", "ವೆಜಿಟೇಬಲ್ ಪುಲಾವ್", "ಜೀರಾ ರೈಸ್", "ಕಾಶ್ಮೀರಿ ಪುಲಾವ್"],
      characteristics: {
        grainType: "ಅತ್ಯಂತ ಉದ್ದ ಮತ್ತು ತೆಳುವಾದ ಧಾನ್ಯ",
        texture: "ಹಗುರ ಮತ್ತು ಉದುರು ಉದುರಾದ ಹದ",
        aroma: "ಉತ್ತಮ ಸುಗಂಧ ಭರಿತ"
      }
    }
  },

  Ipsala: {
    en: {
      about: "Ipsala is a Turkish premium medium-grain rice variety named after the Ipsala agricultural district in Edirne province.",
      whySpecial: "Offers exceptional water absorption capacity, producing plump, tender cooked grains that readily absorb rich broths and spices.",
      growing: "Extensively cultivated in the humid river basin of the Meriç (Maritsa) River in Northwestern Turkey under controlled paddy irrigation.",
      commonUses: ["Traditional Turkish pilafs", "Stuffed grape leaves and peppers (Dolma & Sarma)", "Soups and side dishes"],
      popularDishes: ["Turkish Butter Pilaf (Sade Pilav)", "Stuffed Grape Leaves (Yaprak Sarma)", "Stuffed Peppers (Biber Dolma)"],
      characteristics: {
        grainType: "Medium Plump Grain",
        texture: "Soft, Tender & Moist",
        aroma: "Subtle & Savory Absorbent"
      }
    },
    hi: {
      about: "इप्सला एक तुर्की प्रीमियम मध्यम-दाने वाला चावल है जिसका नाम एडिरने प्रांत के इप्सला कृषि क्षेत्र के नाम पर रखा गया है।",
      whySpecial: "यह पानी और स्वादों को बहुत अच्छी तरह सोखता है, जिससे पकने पर दाने नरम, रसीले और स्वादिष्ट बनते हैं।",
      growing: "यह उत्तर-पश्चिम तुर्की की मेरीक (मारित्सा) नदी घाटी के उपजाऊ क्षेत्रों में बड़े पैमाने पर उगाया जाता है।",
      commonUses: ["पारंपरिक तुर्की पुलाव", "भरवा सब्जियां (डोलमा और सरमा)", "सूप और साइड डिश"],
      popularDishes: ["तुर्की बटर पुलाव (सादे पिलाव)", "स्टफ्ड ग्रेप लीव्स (सरमा)", "स्टफ्ड पेपर्स (डोलमा)"],
      characteristics: {
        grainType: "मध्यम गोल दाना",
        texture: "नरम, कोमल और स्वादिष्ट",
        aroma: "सौम्य सुगंध"
      }
    },
    kn: {
      about: "ಇಪ್ಸಾಲಾ ಟರ್ಕಿಯ ಪ್ರೀಮಿಯಂ ಮಧ್ಯಮ ಗಾತ್ರದ ಅಕ್ಕಿಯಾಗಿದ್ದು, ಎಡಿರ್ನೆ ಪ್ರಾಂತ್ಯದ ಇಪ್ಸಾಲಾ ಕೃಷಿ ಪ್ರದೇಶದ ಹೆಸರನ್ನು ಇಡಲಾಗಿದೆ.",
      whySpecial: "ಇದು ಹೆಚ್ಚಿನ ನೀರನ್ನು ಹೀರಿಕೊಳ್ಳುವ ಸಾಮರ್ಥ್ಯವನ್ನು ಹೊಂದಿದೆ, ಬೇಯಿಸಿದಾಗ ಮೆದುವಾದ ಮತ್ತು ರುಚಿಕರವಾದ ಅನ್ನವನ್ನು ನೀಡುತ್ತದೆ.",
      growing: "ವಾಯುವ್ಯ ಟರ್ಕಿಯ ಮೆರಿಕ್ (ಮರಿಟ್ಸಾ) ನದಿ ಕಣಿವೆಯ ಆರ್ದ್ರ ವಾತಾವರಣದಲ್ಲಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ.",
      commonUses: ["ಸಾಂಪ್ರದಾಯಿಕ ಟರ್ಕಿಶ್ ಪುಲಾವ್", "ಸ್ಟಫ್ಡ್ ತರಕಾರಿಗಳು (ಡೋಲ್ಮಾ ಮತ್ತು ಸರ್ಮಾ)", "ಸೂಪ್ ಮತ್ತು ಸೈಡ್ ಡಿಶ್"],
      popularDishes: ["ಟರ್ಕಿಶ್ ಬಟರ್ ಪುಲಾವ್ (ಸಾಡೆ ಪಿಲಾವ್)", "ಸ್ಟಫ್ಡ್ ವೈನ್ ಲೀವ್ಸ್ (ಸರ್ಮಾ)", "ಸ್ಟಫ್ಡ್ ಪೆಪ್ಪರ್ಸ್ (ಡೋಲ್ಮಾ)"],
      characteristics: {
        grainType: "ಮಧ್ಯಮ ದಪ್ಪ ಧಾನ್ಯ",
        texture: "ಮೆದು ಮತ್ತು ತೇವಯುಕ್ತ ಹದ",
        aroma: "ಸಾಮಾನ್ಯ ಸುವಾಸನೆ"
      }
    }
  },

  Jasmine: {
    en: {
      about: "Jasmine rice (Hom Mali) is an aromatic long-grain rice variety originating from Thailand, celebrated for its subtle pandan floral aroma.",
      whySpecial: "Naturally fragranced with a sweet floral scent and a soft, slightly clingy texture when steamed to perfection.",
      growing: "Mainly cultivated in the high plateau regions of Northeastern Thailand (Isan) using traditional rain-fed agriculture.",
      commonUses: ["Southeast Asian curries", "Thai fried rice dishes", "Steamed table rice", "Sweet mango sticky rice desserts"],
      popularDishes: ["Thai Green Curry Rice", "Pineapple Fried Rice", "Khao Pad (Thai Fried Rice)", "Mango Sticky Rice"],
      characteristics: {
        grainType: "Long Slender Grain",
        texture: "Soft, Moist & Slightly Clingy",
        aroma: "Floral & Pandan-like Fragrance"
      }
    },
    hi: {
      about: "जैस्मिन राइस (होम माली) थाईलैंड का एक प्रसिद्ध सुगंधित लंबा चावल है, जो अपनी मीठी पंडा की पत्ती जैसी सुगंध के लिए जाना जाता है।",
      whySpecial: "भाप में पकने पर यह प्राकृतिक रूप से मनमोहक खुशबू और हल्का चिपचिपा, बहुत ही नरम टेक्सचर देता है।",
      growing: "यह मुख्य रूप से उत्तर-पूर्वी थाईलैंड के पठारी क्षेत्रों में प्राकृतिक बारिश के पानी से उगाया जाता है।",
      commonUses: ["दक्षिण-पूर्व एशियाई करी", "थाई फ्राइड राइस", "स्टीम राइस", "मैंगो स्टिकी राइस"],
      popularDishes: ["थाई ग्रीन करी राइस", "पाइनएप्पल फ्राइड राइस", "खाओ पैड (थाई फ्राइड राइस)", "मैंगो स्टिकी राइस"],
      characteristics: {
        grainType: "लंबा और सुंदर दाना",
        texture: "नरम, हल्का चिपचिपा",
        aroma: "मीठी फूलों जैसी सुगंध"
      }
    },
    kn: {
      about: "ಜಾಸ್ಮಿನ್ ಅಕ್ಕಿ (ಹೋಮ್ ಮಾಲಿ) ಥೈಲ್ಯಾಂಡ್ ಮೂಲದ ಸುವಾಸನಾಯುಕ್ತ ಉದ್ದನೆಯ ಅಕ್ಕಿಯಾಗಿದ್ದು, ತನ್ನ ಸಿಹಿ ಸುಗಂಧಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.",
      whySpecial: "ಆವಿಯಲ್ಲಿ ಬೇಯಿಸಿದಾಗ ಇದು ನೈಸರ್ಗಿಕ ಹೂವಿನ ಸುವಾಸನೆ ಮತ್ತು ಸ್ವಲ್ಪ ಅಂಟಿಕೊಳ್ಳುವ ಮೆದುವಾದ ಹದವನ್ನು ನೀಡುತ್ತದೆ.",
      growing: "ಈಶಾನ್ಯ ಥೈಲ್ಯಾಂಡ್‌ನ ಎತ್ತರದ ಪ್ರಸ್ಥಭೂಮಿ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸಾಂಪ್ರದಾಯಿಕ ಮಳೆ ಆಧಾರಿತ ಕೃಷಿಯಿಂದ ಬೆಳೆಯಲಾಗುತ್ತದೆ.",
      commonUses: ["ಆಗ್ನೇಯ ಏಷ್ಯಾದ ಕರಿಗಳು", "ಥಾಯ್ ಫ್ರೈಡ್ ರೈಸ್", "ಸ್ಟೀಮ್ ರೈಸ್", "ಮ್ಯಾಂಗೋ ಸ್ಟಿಕಿ ರೈಸ್"],
      popularDishes: ["ಥಾಯ್ ಗ್ರೀನ್ ಕರಿ ರೈಸ್", "ಪೈನಾಪಲ್ ಫ್ರೈಡ್ ರೈಸ್", "ಖಾವೊ ಪ್ಯಾಡ್", "ಮ್ಯಾಂಗೋ ಸ್ಟಿಕಿ ರೈಸ್"],
      characteristics: {
        grainType: "ಉದ್ದನೆಯ ತೆಳುವಾದ ಧಾನ್ಯ",
        texture: "ಮೆದು ಮತ್ತು ಸ್ವಲ್ಪ್ ಅಂಟುವ ಹದ",
        aroma: "ಸುಗಂಧ ಭರಿತ"
      }
    }
  },

  Jhili: {
    en: {
      about: "Jhili is a traditional regional rice variety grown in Eastern India, prized for its robust quality and wholesome staple meals.",
      whySpecial: "Holds its structural integrity during boiling, yielding firm grains that stay intact without turning mushy in gravies.",
      growing: "Cultivated in fertile alluvial river plains across Odisha and neighboring Eastern Indian states under tropical monsoon conditions.",
      commonUses: ["Everyday household table rice", "Traditional fermented rice (Pakhala Bhata)", "Steamed rice with dal and vegetable curries"],
      popularDishes: ["Odia Pakhala Bhata", "Steamed Jhili with Dalma", "Kanika (Sweet Festive Rice)", "Regional Rice Bowls"],
      characteristics: {
        grainType: "Medium to Long Grain",
        texture: "Firm, Non-mushy & Wholesome",
        aroma: "Earthy & Natural"
      }
    },
    hi: {
      about: "झिली पूर्वी भारत में उगाया जाने वाला एक पारंपरिक क्षेत्रीय चावल है, जिसे अपनी मजबूत गुणवत्ता और सुपाच्य आहार के लिए सराहा जाता है।",
      whySpecial: "उबलते समय इसका दाना गलता नहीं है, जिससे यह गीली या तरी वाली डिशेस में भी मजबूत और साबुत रहता है।",
      growing: "यह ओडिशा और पड़ोसी पूर्वी राज्यों की उपजाऊ नदी घाटी मिट्टी में मानसून की परिस्थितियों में उगाया जाता है।",
      commonUses: ["दैनिक घरेलू भोजन", "पारंपरिक पखाला भात", "दाल और सब्जी करी के साथ सादा भात"],
      popularDishes: ["ओडिया पखाला भात", "डालमा के साथ झिली चावल", "कनिका (मीठा चावल)", "क्षेत्रीय थाली भात"],
      characteristics: {
        grainType: "मध्यम से लंबा दाना",
        texture: "मजबूत, बिना गला हुआ",
        aroma: "प्राकृतिक और सौम्य"
      }
    },
    kn: {
      about: "ಝಿಲಿ ಪೂರ್ವ ಭಾರತದಲ್ಲಿ ಬೆಳೆಯಲಾಗುವ ಸಾಂಪ್ರದಾಯಿಕ ಪ್ರಾದೇಶಿಕ ಅಕ್ಕಿಯಾಗಿದ್ದು, ತನ್ನ ಉತ್ತಮ ಗುಣಮಟ್ಟಕ್ಕೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.",
      whySpecial: "ಕುದಿಯುವಾಗ ಧಾನ್ಯಗಳು ಹದಗೆಡುವುದಿಲ್ಲ, ಬೇಯಿಸಿದ ನಂತರವೂ ಗಟ್ಟಿಯಾದ ಮತ್ತು ಉತ್ತಮ ಆಕಾರವನ್ನು ಕಾಯ್ದುಕೊಳ್ಳುತ್ತವೆ.",
      growing: "ಒಡಿಶಾ ಮತ್ತು ನೆರೆಯ ಪೂರ್ವ ಭಾರತೀಯ ರಾಜ್ಯಗಳ ಫಲವತ್ತಾದ ನದಿ ಪಾತ್ರಗಳಲ್ಲಿ ಮಳೆಗಾಲದ ವಾತಾವರಣದಲ್ಲಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ.",
      commonUses: ["ದೈನಂದಿನ ಗೃಹ ಊಟ", "ಸಾಂಪ್ರದಾಯಿಕ ಪಖಾಲಾ ಭಾತ್", "ಬೇಳೆ ಸಾರು ಮತ್ತು ಪಲ್ಯದೊಂದಿಗೆ ಸೇವಿಸುವ ಅನ್ನ"],
      popularDishes: ["ಒಡಿಯಾ ಪಖಾಲಾ ಭಾತ್", "ದಾಲ್ಮಾ ಜೊತೆ ಝಿಲಿ ಅನ್ನ", "ಕನಿಕಾ (ಸಿಹಿ ಅನ್ನ)", "ಪ್ರಾದೇಶಿಕ ಅನ್ನದ ಖಾದ್ಯಗಳು"],
      characteristics: {
        grainType: "ಮಧ್ಯಮದಿಂದ ಉದ್ದನೆಯ ಧಾನ್ಯ",
        texture: "ಗಟ್ಟಿ ಮತ್ತು ಉತ್ತಮ ಹದ",
        aroma: "ನೈಸರ್ಗಿಕ ಸುವಾಸನೆ"
      }
    }
  },

  Karacadag: {
    en: {
      about: "Karacadag is an heirloom landrace rice native to the volcanic slopes of Mount Karacadağ in Southeastern Anatolia, Turkey.",
      whySpecial: "Irrigated by cold basaltic spring waters, producing exceptionally resilient, flavorful grains with a rich earthy profile.",
      growing: "Cultivated in mineral-rich volcanic soils irrigated exclusively by cold mountain spring water in the Diyarbakır region.",
      commonUses: ["Authentic hearth-cooked pilafs", "Rich meat stews", "Hearty regional soups", "Traditional stuffed dishes"],
      popularDishes: ["Diyarbakır Meaty Pilaf", "Karacadag Hearth Rice", "Traditional Anatolian Stew Rice"],
      characteristics: {
        grainType: "Medium Oval Grain",
        texture: "Firm, Chewy & Flavorful",
        aroma: "Earthy & Nutty Volcanic Profile"
      }
    },
    hi: {
      about: "काराकादाग दक्षिण-पूर्वी अनातोलिया, तुर्की में काराकादाग पर्वत के ज्वालामुखीय ढलानों पर उगाया जाने वाला एक प्राचीन चावल है।",
      whySpecial: "ठंडे ज्वालामुखीय झरनों के पानी में उगने के कारण इसके दाने बेहद मजबूत, स्वादिष्ट और पौष्टिक गुणों से भरपूर होते हैं।",
      growing: "यह दियारबकिर क्षेत्र में खनिज समृद्ध ज्वालामुखीय मिट्टी और पहाड़ के ठंडे प्राकृतिक पानी से उगाया जाता है।",
      commonUses: ["पारंपरिक आंच पर पका पुलाव", "मांस के साथ स्वादिष्ट स्ट्यू", "क्षेत्रीय पौष्टिक सूप"],
      popularDishes: ["दियारबकिर मीट पिलाव", "काराकादाग हार्थ राइस", "अनातोलियन स्ट्यू राइस"],
      characteristics: {
        grainType: "मध्यम ओवल दाना",
        texture: "मजबूत, चबाने योग्य और स्वादिष्ट",
        aroma: "सोंधी ज्वालामुखीय मिट्टी की महक"
      }
    },
    kn: {
      about: "ಕಾರಾಕಾಡಾಗ್ ಆಗ್ನೇಯ ಅನಾಟೋಲಿಯಾದ ಕಾರಾಕಾಡಾಗ್ ಪರ್ವತದ ಜ್ವಾಲಾಮುಖಿ ಪ್ರದೇಶದಲ್ಲಿ ಬೆಳೆಯಲಾಗುವ ಸಾಂಪ್ರದಾಯಿಕ ಅಕ್ಕಿಯಾಗಿದೆ.",
      whySpecial: "ತಣ್ಣನೆಯ ಜ್ವಾಲಾಮುಖಿ ಬುಗ್ಗೆಗಳ ನೀರಿನಲ್ಲಿ ಬೆಳೆಯುವುದರಿಂದ, ಅತ್ಯಂತ ಗಟ್ಟಿಯಾದ ಮತ್ತು ರುಚಿಕರವಾದ ಧಾನ್ಯಗಳನ್ನು ನೀಡುತ್ತದೆ.",
      growing: "ದಿಯಾರ್ಬಕಿರ್ ಪ್ರದೇಶದ ಖನಿಜಯುಕ್ತ ಜ್ವಾಲಾಮುಖಿ ಮಣ್ಣು ಮತ್ತು ಪರ್ವತದ ತಣ್ಣನೆಯ ನೈಸರ್ಗಿಕ ನೀರಿನಲ್ಲಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ.",
      commonUses: ["ಸಾಂಪ್ರದಾಯಿಕ ಪುಲಾವ್", "ಮಾಂಸದ ಸ್ಟ್ಯೂಗಳು", "ಪ್ರಾದೇಶಿಕ ಸೂಪ್‌ಗಳು"],
      popularDishes: ["ದಿಯಾರ್ಬಕಿರ್ ಮೀಟ್ ಪಿಲಾವ್", "ಕಾರಾಕಾಡಾಗ್ ಹಾರ್ಥ್ ರೈಸ್", "ಅನಾಟೋಲಿಯನ್ ಸ್ಟ್ಯೂ ರೈಸ್"],
      characteristics: {
        grainType: "ಮಧ್ಯಮ ಓವಲ್ ಧಾನ್ಯ",
        texture: "ಗಟ್ಟಿ ಮತ್ತು ರುಚಿಕರವಾದ ಹದ",
        aroma: "ಮಣ್ಣಿನ ನೈಸರ್ಗಿಕ ಸುವಾಸನೆ"
      }
    }
  },

  Massori: {
    en: {
      about: "Massori (Masuri) is a widely cultivated medium-grain rice variety immensely popular across Central and Southern India.",
      whySpecial: "Light on digestion with a balanced starch profile that cooks quickly into tender, palatable grains for daily dining.",
      growing: "Extensively grown in irrigated canal basins of Andhra Pradesh, Telangana, Karnataka, and Maharashtra.",
      commonUses: ["Daily family lunches and dinners", "Curd rice (Mosaranna)", "Sambar and Rasam rice bowls", "Lemon rice"],
      popularDishes: ["Steamed Massori with Sambar", "Curd Rice (Mosaranna)", "Lemon Rice", "Tomato Rice"],
      characteristics: {
        grainType: "Medium Slender Grain",
        texture: "Light, Soft & Palatable",
        aroma: "Mild & Comforting"
      }
    },
    hi: {
      about: "मसूरी (मासुरी) मध्य और दक्षिण भारत में अत्यधिक लोकप्रिय एक मध्यम-दाने वाला चावल है जो दैनिक भोजन के लिए प्रयोग किया जाता है।",
      whySpecial: "यह पचाने में हल्का होता है और जल्दी पककर दैनिक भोजन के लिए बहुत ही नरम और स्वादिष्ट दाने प्रदान करता है।",
      growing: "यह आंध्र प्रदेश, तेलंगाना, कर्नाटक और महाराष्ट्र के सिंचित नदी घाटी क्षेत्रों में बड़े पैमाने पर उगाया जाता है।",
      commonUses: ["दैनिक पारिवारिक दोपहर और रात का भोजन", "दही चावल (मोसरन्ना)", "सांभर और रसम चावल", "लेमन राइस"],
      popularDishes: ["सांभर के साथ स्टीम मसूरी चावल", "दही चावल (मोसरन्ना)", "लेमन राइस", "टोमैटो राइस"],
      characteristics: {
        grainType: "मध्यम पतला दाना",
        texture: "हल्का, नरम और सुपाच्य",
        aroma: "हल्की और सुहावनी"
      }
    },
    kn: {
      about: "ಮಸೂರಿ (ಮಸೀರಿ) ಮಧ್ಯ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದಲ್ಲಿ ಅತ್ಯಂತ ಜನಪ್ರಿಯವಾದ ಮಧ್ಯಮ ಗಾತ್ರದ ಅಕ್ಕಿಯಾಗಿದ್ದು, ದೈನಂದಿನ ಊಟಕ್ಕೆ ಬಳಸಲಾಗುತ್ತದೆ.",
      whySpecial: "ಜೀರ್ಣಿಸಿಕೊಳ್ಳಲು ಹಗುರವಾಗಿದ್ದು, ಬೇಗನೆ ಬೇಯುತ್ತದೆ ಮತ್ತು ದೈನಂದಿನ ಊಟಕ್ಕೆ ಮೆದುವಾದ ಅನ್ನವನ್ನು ನೀಡುತ್ತದೆ.",
      growing: "ಆಂಧ್ರಪ್ರದೇಶ, ತೆಲಂಗಾಣ, ಕರ್ನಾಟಕ ಮತ್ತು ಮಹಾರಾಷ್ಟ್ರದ ನದಿ ನೀರಾವರಿ ಪ್ರದೇಶಗಳಲ್ಲಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ.",
      commonUses: ["ದೈನಂದಿನ ಕೌಟುಂಬಿಕ ಊಟ", "ಮೊಸರನ್ನ (Curd Rice)", "ಸಾಂಬಾರ್ ಮತ್ತು ರಸಂ ಅನ್ನ", "ಚಿತ್ರಾನ್ನ/ನಿಂಬೆಹಣ್ಣಿನ ಅನ್ನ"],
      popularDishes: ["ಸಾಂಬಾರ್ ಜೊತೆ ಬಿಸಿ ಅನ್ನ", "ಮೊಸರನ್ನ", "ಚಿತ್ರಾನ್ನ (Lemon Rice)", "ಟೊಮೇಟೊ ಬಾತ್"],
      characteristics: {
        grainType: "ಮಧ್ಯಮ ತೆಳುವಾದ ಧಾನ್ಯ",
        texture: "ಹಗುರ ಮತ್ತು ಮೆದುವಾದ ಹದ",
        aroma: "ಸಾಮಾನ್ಯ ಸುವಾಸನೆ"
      }
    }
  },

  SonaMasoori: {
    en: {
      about: "SonaMasoori is a premium lightweight, aromatic medium-grain rice variety widely consumed across South India.",
      whySpecial: "Low in starch, highly digestible, and cooks into light, fluffy, separate grains ideal for conscious daily diets.",
      growing: "Primarily cultivated in the rich river basins of the Krishna and Tungabhadra rivers in Andhra Pradesh, Telangana, and Karnataka.",
      commonUses: ["Daily healthy table rice", "Variety rice (Bisi Bele Bath, Tamarind Rice)", "Biryani base", "Idli/Dosa batter"],
      popularDishes: ["Bisi Bele Bath", "Puliyogare (Tamarind Rice)", "Steamed Sona Masoori Table Rice", "Vangi Bath"],
      characteristics: {
        grainType: "Medium Thin Grain",
        texture: "Light, Airy & Non-sticky",
        aroma: "Delicate & Pleasing"
      }
    },
    hi: {
      about: "सोना मसूरी एक प्रीमियम हल्का, सुगंधित मध्यम-दाने वाला चावल है जो पूरे दक्षिण भारत में बड़े पैमाने पर खाया जाता है।",
      whySpecial: "इसमें स्टार्च की मात्रा कम होती है, यह आसानी से पचता है और पकने पर खिला-खिला, बिल्कुल गैर-चिपचिपा दाना बनता है।",
      growing: "यह मुख्य रूप से आंध्र प्रदेश, तेलंगाना और कर्नाटक में कृष्णा और तुंगभद्रा नदियों के उपजाऊ क्षेत्रों में उगाया जाता है।",
      commonUses: ["दैनिक स्वस्थ थाली भात", "वैरायटी राइस (बीसी बेले भात, इमली चावल)", "इडली/डोसा बैटर", "पुलाव"],
      popularDishes: ["बीसी बेले भात", "पुलियोधराई (इमली चावल)", "सोना मसूरी स्टीम राइस", "वांगी भात"],
      characteristics: {
        grainType: "मध्यम पतला दाना",
        texture: "हल्का, खिला-खिला, गैर-चिपचिपा",
        aroma: "हल्की और मनभावन"
      }
    },
    kn: {
      about: "ಸೋನಾ ಮಸೂರಿ ದಕ್ಷಿಣ ಭಾರತದಾದ್ಯಂತ ವ್ಯಾಪಕವಾಗಿ ಬಳಸಲಾಗುವ ಪ್ರೀಮಿಯಂ ಹಗುರವಾದ, ಸುವಾಸನಾಯುಕ್ತ ಮಧ್ಯಮ ಗಾತ್ರದ ಅಕ್ಕಿಯಾಗಿದೆ.",
      whySpecial: "ಕಡಿಮೆ ಪಿಷ್ಟವನ್ನು ಹೊಂದಿದ್ದು, ಸುಲಭವಾಗಿ ಜೀರ್ಣವಾಗುತ್ತದೆ ಮತ್ತು ಬೇಯಿಸಿದಾಗ ಹಗುರವಾದ, ಉದುರು ಉದುರಾದ ಅನ್ನವನ್ನು ನೀಡುತ್ತದೆ.",
      growing: "ಆಂಧ್ರಪ್ರದೇಶ, ತೆಲಂಗಾಣ ಮತ್ತು ಕರ್ನಾಟಕದ ಕೃಷ್ಣಾ ಮತ್ತು ತುಂಗಭದ್ರಾ ನದಿ ಪಾತ್ರಗಳಲ್ಲಿ ಪ್ರಮುಖವಾಗಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ.",
      commonUses: ["ದೈನಂದಿನ ಆರೋಗ್ಯಕರ ಅನ್ನ", "ಚಿತ್ರಾನ್ನ/ಪುಳಿಯೋಗರೆ/ಬಿಸಿಬೇಳೆಬಾತ್", "ಇಡ್ಲಿ/ದೋಸೆ ಹಿಟ್ಟು", "ಪುಲಾವ್"],
      popularDishes: ["ಬಿಸಿಬೇಳೆ ಬಾತ್", "ಪುಳಿಯೋಗರೆ", "ಸೋನಾ ಮಸೂರಿ ಬಿಸಿ ಅನ್ನ", "ವಾಂಗಿ ಬಾತ್"],
      characteristics: {
        grainType: "ಮಧ್ಯಮ ತೆಳುವಾದ ಧಾನ್ಯ",
        texture: "ಹಗುರ ಮತ್ತು ಉದುರು ಉದುರಾದ ಹದ",
        aroma: "ಉತ್ತಮ ಸುವಾಸನೆ"
      }
    }
  }
};

/**
 * Safely resolves localized rice details for a given class name and language.
 * Handles class name variations (e.g., Masuri -> Massori, HMT -> SonaMasoori).
 */
export function getRiceInfo(clsName, lang = 'en') {
  if (!clsName) return null;

  let key = clsName;
  if (key === 'Masuri') key = 'Massori';
  if (key === 'HMT' || key === 'HMT (Sona Masuri)') key = 'SonaMasoori';

  const entry = riceInformation[key];
  if (!entry) return null;

  return entry[lang] || entry.en;
}
