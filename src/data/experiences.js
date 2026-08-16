/**
 * experiences.js — Raah India Experiences
 * Central data source for all experience pages and cards.
 *
 * ── Image folder location ─────────────────────────────────────────
 * public/experiances/<folder>/thumbnail.jpg   → hero & card image
 * public/experiances/<folder>/<file>          → gallery images
 *
 * All paths are served from the public root, so they begin with
 * /experiances/... (no URL-encoding needed for spaces — Next.js
 * handles encoding automatically when the string is used as an href).
 */

// ── Slug → public folder name ─────────────────────────────────────
const FOLDER_MAP = {
  "jaipur-at-dawn":        "Jaipur at down",
  "ridge-and-ramparts":    "Ridge and ramparts",
  "cosmic-imperial-triad": "The Cosmic & Imperial Triad",
  "the-blue-hour":         "The blue hour",
  "beyond-the-pink":       "Beyond the pink",
  "farm-and-fire":         "Farm and fire",
  "living-walled-city":    "The living walled city",
  "the-lost-kingdom":      "The lost kingdom",
  "artisans-jaipur":       "the artisian jaipur",
};

// ── Ground-truth image inventory (filenames verified against disk) ─
// thumbnail.jpg is always first and used as heroImage / cardImage.
// All other entries populate the gallery (thumbnail excluded).
const IMAGE_INVENTORY = {
  "Jaipur at down": [
    "thumbnail.jpg",
    "image1.jpeg",
    "IMG_20250914_132635_152.jpg",
    "IMG_20250914_132635_252.jpg",
    "IMG20251125084223.jpg",
  ],
  "Ridge and ramparts": [
    "thumbnail.jpg",
    "IMG-20250315-WA0195.jpg",
    "IMG20241225100919.jpg",
    "IMG20250201095547.jpg",
    "IMG20260211161321.jpg",
  ],
  "The Cosmic & Imperial Triad": [
    "thumbnail.jpg",
    "IMG20251009153818.jpg",
    "IMG20251009160204.jpg",
    "IMG20251009160807.jpg",
  ],
  "The blue hour": [
    "thumbnail.jpg",
    "213039bef03f1dadfc0916266d707085.jpg",
    "IMG_20260123_141626.jpg",
    "IMG_20260323_133304.jpg",
    "IMG_20260323_133423.jpg",
    "IMG20260202185502.jpg",
  ],
  "Beyond the pink": [
    "thumbnail.jpg",
    "5aab880dcc61f7b35c49547113b089a3.jpg",
    "bfdab2ecd0d338903a3c75d3e1cc1934.jpg",
    "IMG20250203161213.jpg",
    "IMG20260202172637.jpg",
  ],
  "Farm and fire": [
    "thumbnail.jpg",
    "4ac0c64e55c7d32bfd39a762565815fe.jpg",
    "IMG20241231193438.jpg",
    "IMG20260108172109 13.jpg",
  ],
  "The living walled city": [
    "thumbnail.jpg",
    "39b952ecb7714efa76ca7338b05d6f38.jpg",
    "7c9cd63b6ca2f0a402c01768a32822d3.jpg",
    "ef0d31548ed88c0be44085fc235aa9a7.jpg",
    "image.jpg",
    "IMG20251002174332.jpg",
    "IMG20251003103022.jpg",
  ],
  "The lost kingdom": [
    "thumbnail.JPG",
    "IMG_20260124_161109.JPG",
    "IMG_20260124_161756.JPG",
    "IMG_20260606_111700.jpg",
    "IMG20250722192821.jpg",
  ],
  "the artisian jaipur": [
    "thumbnail.jpg",
    "IMG20251004115634.jpg",
    "IMG20251004115720.jpg",
    "IMG20251120111217.jpg",
    "IMG20260206173707.jpg",
    "IMG20260415180143.jpg",
  ],
};

// ── Path generator ────────────────────────────────────────────────
/**
 * Returns heroImage, cardImage, and gallery for a given slug.
 * Falls back to /images/placeholder.jpg for any missing config.
 */
function getExperienceImages(slug) {
  const PLACEHOLDER = "/images/placeholder.jpg";
  const folderName  = FOLDER_MAP[slug];

  if (!folderName || !IMAGE_INVENTORY[folderName]) {
    console.warn(`[experiences.js] No image config for slug: "${slug}"`);
    return { heroImage: PLACEHOLDER, cardImage: PLACEHOLDER, gallery: [] };
  }

  // Encode folder name for URL (handles spaces and & correctly)
  const encodedFolder = encodeURIComponent(folderName);
  const basePath      = `/experiances/${encodedFolder}`;
  const files         = IMAGE_INVENTORY[folderName];
  const thumbnail     = files.includes("thumbnail.jpg")
    ? `${basePath}/thumbnail.jpg`
    : PLACEHOLDER;

  const gallery = files
    .filter(f => f !== "thumbnail.jpg")
    .map(f => ({
      src: `${basePath}/${encodeURIComponent(f)}`,
      alt: `${slug} — ${f.replace(/\.[^.]+$/, "")}`,
    }));

  return { heroImage: thumbnail, cardImage: thumbnail, gallery };
}

export const experiences = [
  // ── 1. Jaipur at Dawn ───────────────────────────────────────────
  {
    slug: "jaipur-at-dawn",
    priceUSD: 30,
    priceINR: 2500,
    priceNote: null,
    title: "Jaipur at Dawn",
    subtitle: "Jaipur Whispers Before It Speaks",
    question: "How does Jaipur wake up?",
    tagline: "Discover the city in its quietest, most authentic hours—before the streets awaken and the stories begin.",
    theme: "Sunrise · Temples · Flower Market · Local Breakfast",
    filters: ["Morning", "Heritage", "Food"],
    duration: "3 hrs",
    startTime: "5:00 AM – 8:00 AM",
    whatIncludes: "Peaceful sunrise + heritage walk",
    distance: "Approx. 3–4 km",
    difficulty: "Easy",
    groupSize: "Up to 8 guests",
    languages: ["English", "Spanish"],
    location: "Old City, Jaipur",
    meetingPoint: "Confirmed on booking (central Old City landmark)",
    ...getExperienceImages("jaipur-at-dawn"),
    idealFor: ["Photography lovers", "Slow travellers", "Culture seekers", "Early risers", "Those who prefer culture over shopping"],
    inclusions: [
      "Experience devotion & spirituality at Govind Dev Ji Temple — Jaipur's most revered temple",
      "Savour scrumptious breakfast & masala chai at the legendary local eateries",
      "Morning street food tastings along heritage lanes",
      "Temple visit & morning ritual participation",
    ],
    exclusions: [
      "Involves moderate walking — comfortable walking shoes recommended",
      "Monument entry fee (if applicable) is not covered",
      "Personal shopping (optional)",
      "Full meals",
      "Gratuities (only at your discretion)",
    ],
    glancePoints: [
      "Morning devotion at Govind Dev Ji Temple — temple bells, prayers, devotional songs",
      "Experience Jaipur before sunrise when it completely belongs to its people",
      "Immerse yourself in the morning flower market — a sensory symphony of colours, fragrances, and vibrant energy",
      "Watch Jaipur's soul come alive as milkmen, florists, street vendors & local eateries begin their daily routines",
      "Marvel at Hawa Mahal as the rising sun transforms its majestic façade into a surreal spectacle",
      "Discover the old city in its most tranquil hour — quiet streets, golden façades and the first gentle movement of the day",
      "Indulge in Jaipur's morning flavours — sipping chai & tasting local breakfast at local eateries",
    ],
    beforeYouCome: {
      duration: "2.5–3 hrs",
      startTime: "Before Sunrise (around 5:00 AM)",
      distance: "3–4 km",
      difficulty: "Easy — slow paced walking",
      groupSize: "Small & Intimate (up to 8 guests)",
      languages: "English & Spanish",
      experienceType: "Culture · Spiritual · Local Life · Heritage",
      meetingPoint: "Jaleb Chowk, City Palace Complex",
    },
    story: `Some cities announce themselves with noise. Jaipur begins with whispers.\n\nBefore the markets awaken and before the streets fill with footsteps, there is a fleeting hour when prayer, preparation, and quiet rituals shape the city's true character. Most visitors arrive after Jaipur has already put on its daytime face — bustling, magnificent, and performative. We wanted to offer something rarer.\n\nThis walk was created after years of watching visitors miss Jaipur's most magical hours. Before sunrise, the city belongs to its people — not to tourists. Flower sellers arrange vibrant marigold garlands by lamplight, milkmen make their rounds through empty lanes, temple bells echo softly through ancient streets, and the first fires of the day are lit in legendary eateries that have fed Jaipur for generations.\n\nWe invite you to experience that Jaipur.`,
    whatYouExperience: [
      "Witness the morning aarti at Govind Dev Ji — Jaipur's most revered temple",
      "Wander through the wholesale flower market as vendors arrange marigolds and jasmine by hand",
      "Watch farmers arrive from surrounding villages with fresh produce at the vegetable market",
      "Stroll through quiet heritage lanes where the city slowly comes alive",
      "Begin your day with an act of kindness — feeding stray cows and scattering grain for pigeons",
      "Savour pyaz kachori and masala chai at a legendary local eatery that has fed Jaipur for generations",
    ],
    highlights: [
      { icon: "🌅", text: "Sunrise photography opportunity" },
      { icon: "🌸", text: "Flower & vegetable market" },
      { icon: "🛕", text: "Morning temple rituals" },
      { icon: "🍽️", text: "Local breakfast included" },
      { icon: "👣", text: "Hidden street & alleyways" },
      { icon: "📖", text: "Cultural storytelling" },
      { icon: "🏃", text: "Easy walking route" },
      { icon: "👥", text: "Small group experience" },
    ],
    curatorNote: "This walk was created after years of watching visitors miss Jaipur's most magical hours. Before sunrise, the city belongs to its people — not to tourists. I wanted guests to experience the Jaipur I grew up knowing.",
    faqs: [
      { q: "Can I book privately?", a: "Yes, all Raah experiences can be booked as a private tour for just your group — couples, families, or small parties." },
      { q: "Is breakfast vegetarian?", a: "Yes, entirely. All food on this walk is vegetarian by default." },
      { q: "What if it rains?", a: "Light rain rarely stops us — the old city in the rain has its own charm. In case of heavy rain, we reschedule at no charge." },
      { q: "Is it suitable for children?", a: "Yes, children aged 7 and above generally enjoy this walk enormously. It's slow-paced and full of sensory discoveries." },
      { q: "Are restrooms available?", a: "Yes, we plan stops near facilities. Please inform your guide of any specific needs at the start." },
    ],
  },

  // ── 2. The Ridge & Ramparts ──────────────────────────────────────
  {
    slug: "ridge-and-ramparts",
    priceUSD: 30,
    priceINR: 2500,
    priceNote: null,
    title: "The Ridge & Ramparts",
    subtitle: "Beyond the Fort, Into the Kingdom",
    question: "What made Amber a kingdom, not just a fort?",
    tagline: "Journey through the heart of Amber — its forgotten town, sacred temples, hidden passages, and stories that shaped a royal capital.",
    theme: "Amber · Jaigarh · Heritage Trek · Royal History",
    filters: ["Morning", "Heritage", "Hiking", "History"],
    duration: "2.5 hrs",
    startTime: "9:00 AM – 11:30 AM",
    whatIncludes: "Fort trails + royal history",
    distance: "Approx. 5–6 km (with elevation)",
    difficulty: "Hard",
    groupSize: "Up to 8 guests",
    languages: ["English", "Spanish"],
    location: "Amber Town & Fort, Jaipur",
    meetingPoint: "Maota Lake, Amber",
    ...getExperienceImages("ridge-and-ramparts"),
    idealFor: ["History enthusiasts", "Trekkers & hikers", "Architecture lovers", "Photographers", "Those seeking depth beyond the obvious"],
    inclusions: [
      "Curated walking experience by expert local storyteller",
      "Traverse through the hidden passage connecting Amber to Jaigarh Fort",
      "Visits to lesser-known landmarks — temples, stepwells & havelis",
      "Journey through Amber Fort & Town with Jaigarh Fort visit",
      "Secrets of the Amber Wall",
    ],
    exclusions: [
      "Gratuities (only at guest's disposal)",
      "Monument entry fee (if applicable)",
      "Golf Cart charges back & forth to Jaigarh Fort",
      "Personal purchases",
    ],
    glancePoints: [
      "Explore the wider landscape of Amber Kingdom beyond the fort — temples, pathways, havelis & defensive ridges",
      "Discover lesser-known temples & shrines tucked into landscapes",
      "Understand Amber's dramatic geography as part of its defence against invasions",
      "Marvel at the engineering of a kingdom with forgotten water systems, reservoirs & stepwells",
      "Walk through the historic tunnel — an escape route for Maharajas",
      "Witness military brilliance at the formidable Jaigarh Fort — home to one of the most efficient cannons of its time",
      "Uncover the stories, legends, and tales that shaped the legacy of Amber",
    ],
    beforeYouCome: {
      duration: "4–5 hrs",
      startTime: "Morning 9:00 AM / Early Afternoon 4:00 PM (exact timing at booking)",
      distance: "5–7 km",
      difficulty: "Moderate — hiking through cobbled pathway",
      groupSize: "Small & Intimate (up to 8 guests)",
      languages: "English & Spanish",
      experienceType: "History · Heritage · Hiking · Adventure",
      meetingPoint: "Amber Fort View Point, Maota Lake",
    },
    story: `Long before Jaipur became the Pink City, there was Amber. A kingdom embraced by rugged hills, protected by towering ramparts, nourished by tranquil waters, and crowned by magnificent forts that watched over generations of rulers.\n\nWhile countless visitors arrive to admire Amber Fort's famous palace, few venture further to discover the remarkable town that once flourished beneath it — a living royal capital where warriors, artisans, priests, merchants, and royalty shaped a remarkable legacy.\n\nWe created The Ridge & Ramparts for travellers who believe that the soul of a place lies not just in its grandest monument, but in its forgotten pathways, weathered temples, and the everyday lives that gave a kingdom its true character.\n\nWalk beyond the palace gates. The real Amber is waiting.`,
    whatYouExperience: [
      "Begin beside the tranquil Maota Lake — understanding Amber as a planned royal capital, not just a fort",
      "Wander through historic Amber Town: weathered havelis, ancient temples, and centuries-old guild streets",
      "Discover Panna Meena ka Kund — one of Rajasthan's finest examples of stepwell architecture",
      "Visit Ambikeshwar Mahadev, Bihari Ji, and Jagat Shiromani temples — each with extraordinary stories",
      "Ascend to Amber Fort and experience it from a completely different perspective",
      "Follow the ancient maharaja's passage — the hidden route connecting Amber to Jaigarh Fort",
      "Understand the strategic brilliance of twin forts and the enduring relationship between power and protection",
    ],
    highlights: [
      { icon: "🏰", text: "Amber Fort & Jaigarh Fort" },
      { icon: "🪜", text: "Panna Meena ka Kund stepwell" },
      { icon: "🛕", text: "Ancient temples of Amber Town" },
      { icon: "👑", text: "Royal hidden passage" },
      { icon: "🏔️", text: "Aravalli ridge panoramic views" },
      { icon: "📖", text: "Living kingdom storytelling" },
      { icon: "🏘️", text: "Historic Amber Town lanes" },
      { icon: "👥", text: "Small group experience" },
    ],
    curatorNote: "Most people spend two hours at Amber Fort and leave satisfied. Those who stay longer — who walk the town, climb the ridge, follow the hidden passage — leave transformed. That difference is what The Ridge & Ramparts was built for.",
    faqs: [
      { q: "How fit do I need to be?", a: "Moderate fitness is recommended. There is elevation gain on the ridge walk. Those with mobility concerns should check with us before booking." },
      { q: "Can I book privately?", a: "Yes, private bookings are available for any group size." },
      { q: "Is the hidden passage safe?", a: "Entirely. The passage is a defined historic route, not an off-trail adventure. We walk it with care and full knowledge of the terrain." },
      { q: "Is it suitable for children?", a: "Older children (12+) who enjoy walking and history do very well on this experience." },
      { q: "What should I wear?", a: "Comfortable trekking shoes, light layers, and sun protection. The ridge sections are exposed." },
    ],
  },

  // ── 3. The Cosmic & Imperial Triad ──────────────────────────────
  {
    slug: "cosmic-imperial-triad",
    priceUSD: null,
    priceINR: null,
    priceNote: null,
    title: "The Crown of Jaipur — The Royal Heart of Pink City",
    subtitle: "Where Science, Royalty & Architecture Converge",
    question: "What kind of mind could imagine a city like Jaipur?",
    tagline: "Three extraordinary landmarks. One remarkable story. Discover the vision that shaped Jaipur.",
    theme: "Hawa Mahal · Jantar Mantar · City Palace · Royal Vision",
    filters: ["Morning", "Evening", "Heritage", "Architecture", "History"],
    duration: "3–3.5 hrs",
    startTime: "Morning or late afternoon",
    whatIncludes: "Astronomy + royal architecture",
    distance: "Approx. 1.5–2 km",
    difficulty: "Easy",
    groupSize: "Up to 8 guests",
    languages: ["English", "Spanish"],
    location: "Royal Precinct, Jaipur",
    meetingPoint: "Main Entry Gate, Hawa Mahal",
    ...getExperienceImages("cosmic-imperial-triad"),
    idealFor: ["History enthusiasts", "Architecture lovers", "Astronomy enthusiasts", "Photographers", "Families", "Intellectually curious travellers"],
    inclusions: [
      "Professionally curated guided walk",
      "Detailed interpretation of Jantar Mantar",
      "City Palace Museum curated narrative walk",
      "Outside visit of iconic Hawa Mahal",
      "Local recommendations",
    ],
    exclusions: [
      "Entry to any monuments (Hawa Mahal, City Palace & Jantar Mantar)",
      "Personal purchases",
      "Astrologer consultation fee (optional add-on, charged extra)",
      "City Palace Royal Tour (available as extra — includes Museum & Royal Palace)",
      "Gratuities (only at guest's discretion)",
    ],
    optionalAddOns: [
      "Astrologer Consultation (on appointment basis only — charged extra)",
      "City Palace Royal Tour (includes Museum & Royal Palace — charged extra)",
    ],
    glancePoints: [
      "Discover the visionary ruler behind the conception of Jaipur",
      "Unveil the mystery of Hawa Mahal — the Palace of Winds",
      "Royal rituals & living traditions of the Pink City",
      "Explore the remarkable layers of City Palace and its courtyards",
      "Understand Jaipur's meticulous planning & urbanisation",
      "Uncover the untold stories of the Maharajas while exploring City Palace",
      "Experience astronomical observations at UNESCO's Jantar Mantar",
    ],
    beforeYouCome: {
      duration: "2.5–3 hrs",
      startTime: "11:00 AM & 3:00 PM",
      distance: "2–3 km",
      difficulty: "Easy",
      groupSize: "Small & Intimate (up to 8 guests)",
      languages: "English & Spanish",
      experienceType: "Heritage · Architecture · Astronomy · Royal History",
      meetingPoint: "Chandni Chowk, City Palace Complex",
    },
    story: `Some rulers built palaces. Others built forts. Maharaja Sawai Jai Singh II built an idea.\n\nAn idea where astronomy shaped architecture, science guided urban planning, and royal vision gave birth to one of India's most extraordinary planned cities. Millions of visitors admire Hawa Mahal, wander through the City Palace, and photograph Jantar Mantar — yet many leave without understanding the remarkable thread that binds these three landmarks together.\n\nAt Raah India Experiences, we created The Cosmic & Imperial Triad to change that. Rather than presenting isolated facts, we invite you to explore the ideas behind the architecture — the scientific brilliance hidden within the observatory, the royal traditions preserved inside the palace, and the extraordinary curiosity that inspired one of India's greatest planned capitals.\n\nWhen these three monuments are experienced together, Jaipur begins to tell a completely different story.`,
    whatYouExperience: [
      "Hawa Mahal: Discover the architectural genius behind 953 windows — climate, privacy, culture, and royal life intertwined",
      "Jantar Mantar: Stand before the world's largest stone sundial and understand how mathematics became architecture",
      "City Palace: Explore elegant courtyards, royal gateways, and ceremonial spaces revealing a dynasty's living heritage",
      "Learn how astronomy influenced every aspect of Jaipur's design and urban planning",
      "Understand Maharaja Sawai Jai Singh II as scientist, astronomer, and visionary city planner",
      "Optional: Consult a traditional astrologer for a personalised horoscope experience",
    ],
    highlights: [
      { icon: "🏛️", text: "Three UNESCO-era landmarks, one story" },
      { icon: "🔭", text: "World's largest stone sundial" },
      { icon: "🪟", text: "Secrets of Hawa Mahal's 953 windows" },
      { icon: "👑", text: "Royal courtyards of City Palace" },
      { icon: "🌟", text: "Optional astrologer consultation" },
      { icon: "📐", text: "Astronomy meets architecture" },
      { icon: "📸", text: "Premium photography opportunities" },
      { icon: "👥", text: "Small group storytelling" },
    ],
    curatorNote: "Most people remember Jaipur for its beautiful buildings. I hope this experience helps you remember it for the remarkable ideas that created them. Once you understand the vision of Sawai Jai Singh II, you'll realise that Jaipur isn't simply a city to admire — it's a city to understand.",
    faqs: [
      { q: "Is the astrologer consultation included?", a: "It is an optional add-on, not included in the base experience. We can arrange it on request." },
      { q: "Is this suitable for children?", a: "Yes — families enjoy this walk enormously. We adapt our storytelling for all ages." },
      { q: "Is wheelchair access available?", a: "Major sections of Jantar Mantar and City Palace are wheelchair accessible. Some historic doorways have steps." },
      { q: "Can I book privately?", a: "Yes, private bookings are available and particularly popular for families and couples." },
      { q: "What should I bring?", a: "Comfortable shoes, sun protection (Jantar Mantar has minimal shade), a camera, and curiosity." },
    ],
  },

  // ── 4. The Blue Hour ────────────────────────────────────────────
  {
    slug: "the-blue-hour",
    priceUSD: 70,
    priceINR: 6300,
    priceNote: "Minimum 2 pax",
    title: "The Blue Hour",
    subtitle: "Where the Pink City Glows After Sunset",
    question: "How does Jaipur transform after sunset?",
    tagline: "Every city has a favourite hour. Jaipur simply waits until the day grows quiet enough to reveal it.",
    theme: "Evening Jeep · Nahargarh · Illuminated Monuments · Night Jaipur",
    filters: ["Evening", "Night", "Scenic"],
    duration: "4 hrs",
    startTime: "Summers: 5:30 PM – 9:30 PM · Winters: 4:00 PM – 8:00 PM",
    whatIncludes: "Jeep ride + illuminated monuments",
    distance: "Drive-based with photography stops",
    difficulty: "Very Easy",
    groupSize: "Up to 8 guests",
    languages: ["English", "Spanish"],
    location: "Across Jaipur",
    meetingPoint: "Hotel pick-up within city limits",
    ...getExperienceImages("the-blue-hour"),
    idealFor: ["Couples & honeymooners", "Photography enthusiasts", "First-time Jaipur visitors", "Those who love cinematic experiences"],
    inclusions: [
      "Scenic drive in a private open-air Jeep",
      "Sunset & visit at Nahargarh Fort",
      "Photo stops at iconic monuments",
      "Glimpses of the enchanting Sound & Light Show at Amber Fort",
      "Refreshments at the end of the tour",
    ],
    exclusions: ["Monument entry tickets", "Meals & beverages", "Personal expenses", "Gratuities (only at guest's discretion)"],
    glancePoints: [
      "Cruise through Jaipur as it begins to reveal its magical character after dark",
      "Experience spectacular sunset & panoramic views of the Pink City from Nahargarh Fort",
      "Pause at Jal Mahal for stunning pictures",
      "Witness the illuminated Pink City at night",
      "Pass through Jaipur's iconic monuments including Hawa Mahal, Albert Hall & Birla Temple",
      "Enjoy breathtaking views of Amber Fort & serene Maota Lake",
      "Pause for glimpses of the Sound & Light Show at Amber Fort",
      "Experience local night life of Jaipur through its bustling bazaars & vibrant streets",
    ],
    beforeYouCome: {
      duration: "Approximately 3.5–4 hrs",
      startTime: "Before Sunset (exact time on booking)",
      distance: "Drive-based with photography stops",
      difficulty: "Easy — limited walking at selected stops",
      groupSize: "Small & Intimate (minimum 2, maximum 8 guests)",
      languages: "English & Spanish",
      experienceType: "Night Tourism · Heritage · Culture · Photography",
      meetingPoint: "Air Force Station, Jal Mahal",
      transport: "Private open-air Jeep",
    },
    story: `There is a brief moment every evening that most travellers unknowingly miss. It arrives quietly, somewhere between the warmth of sunset and the darkness of night. The sky deepens into shades of indigo, the day's energy softens, and Jaipur transforms — forts glow gold, bazaars buzz with a different energy, and familiar landmarks take on an entirely different character.\n\nThis fleeting transition is the Blue Hour.\n\nWe created this experience for travellers who believe that the beauty of a place is not only found in its monuments, but also in its atmosphere. Rather than rushing from one attraction to another, The Blue Hour invites you to savour the changing light, discover hidden perspectives, and experience the Pink City during one of its most enchanting hours.\n\nSome moments are too beautiful to hurry through.`,
    whatYouExperience: [
      "Nahargarh Fort: Watch Jaipur spread below you as the sun sets in golden panoramic splendour",
      "Jal Mahal: Witness the Water Palace appear to float on still, dark waters like a glowing jewel",
      "Hawa Mahal by Night: See its 953 windows brilliantly backlit — a completely different monument after dark",
      "Albert Hall Museum: Jaipur's most photogenic night landmark, alive in shifting coloured light",
      "Isarlat: The historic 'Tower of Heaven' glowing elegantly against the night sky",
      "Birla Temple: Pure white marble radiating a serene, ethereal glow",
      "Patrika Gate & Toran Dwar: Jaipur's most vibrant modern landmarks as a grand finale",
      "Glimpses of the enchanting Sound & Light Show at Amber Fort",
    ],
    highlights: [
      { icon: "🌅", text: "Sunset from Nahargarh Fort" },
      { icon: "🚙", text: "Open-air heritage 4x4 Jeep" },
      { icon: "💎", text: "Jal Mahal on still dark waters" },
      { icon: "🌃", text: "Hawa Mahal illuminated at night" },
      { icon: "📸", text: "Premium photography stops" },
      { icon: "🏛️", text: "Albert Hall & Birla Temple" },
      { icon: "🎨", text: "Patrika Gate grand finale" },
      { icon: "☕", text: "Optional chai pause mid-drive" },
    ],
    curatorNote: "Jaipur during the day is beautiful. Jaipur during the Blue Hour is unforgettable. I designed this experience because I wanted visitors to see the city the way I have always loved it — glowing, unhurried, and extraordinarily alive.",
    faqs: [
      { q: "What happens if it rains?", a: "The jeep can be covered in case of sudden rain. In severe weather, we arrange enclosed transport or reschedule." },
      { q: "Is this suitable for elderly guests?", a: "Absolutely. This is a drive-based experience — very comfortable for guests of all ages." },
      { q: "Can we stop for dinner after?", a: "Yes — we finish near excellent restaurants and can recommend the best spots for the evening." },
      { q: "Can I book privately?", a: "Yes, and private bookings are particularly popular for couples and families." },
      { q: "What camera settings work best?", a: "Night mode or manual low-light settings work best. We time our stops to Up to 8ise the best light at each location." },
    ],
  },

  // ── 5. Beyond the Pink ──────────────────────────────────────────
  {
    slug: "beyond-the-pink",
    priceUSD: 30,
    priceINR: 2500,
    priceNote: null,
    title: "Beyond the Pink",
    subtitle: "Where Every Street Tells a Story",
    question: "How do people truly live in the Pink City?",
    tagline: "Step past the postcards into the living, breathing heart of a 300-year-old walled city.",
    theme: "Evening Heritage · Street Food · Old City Bazaars · Living Culture",
    filters: ["Evening", "Heritage", "Food"],
    duration: "2.5 hrs",
    startTime: "Winters: 4:00 PM – 6:30 PM · Summers: 5:00 PM – 7:30 PM",
    whatIncludes: "Street food + local culture",
    distance: "Approx. 3–4 km",
    difficulty: "Moderate",
    groupSize: "Up to 8 guests",
    languages: ["English", "Spanish"],
    location: "Walled City, Jaipur",
    meetingPoint: "Main Entry Gate, Hawa Mahal",
    ...getExperienceImages("beyond-the-pink"),
    idealFor: ["Food enthusiasts", "Culture & heritage travellers", "Street photography lovers", "Those seeking authentic over touristic", "Return visitors wanting depth"],
    inclusions: [
      "Professionally curated walking experience by local storyteller & cultural host",
      "Carefully curated street food tasting (6–8 items)",
      "Exploration of historical old city bazaars",
      "Visits to centuries-old artisan lanes",
      "Capture unfiltered & real moments on lively streets",
      "Complimentary water bottle",
      "Glimpses into Pink City's living markets",
    ],
    exclusions: [
      "Personal purchases",
      "Full meals besides the included tastings",
      "Transport to/from meeting point",
      "Gratuities (entirely at guest's discretion)",
    ],
    glancePoints: [
      "Discover the city beyond the monuments",
      "Walk through bustling bazaars and vibrant streets",
      "Encounter generation-old family businesses — from metalworkers & marble craftsmen to lac bangle makers & traditional traders",
      "Taste carefully selected local delicacies (6–8 tastings)",
      "Discover more about Jaipur over chai at a local tea stall",
      "Step into living kitchens of Jaipur to savour century-old family recipes",
      "Witness how locals work, worship, commute, eat and interact within the lanes of the old city",
      "Evening temple rituals at revered temples of Jaipur",
    ],
    beforeYouCome: {
      duration: "2.5–3 hrs",
      startTime: "Afternoon — Winters: 4:00 PM–6:30 PM · Summers: 5:00 PM–7:30 PM",
      distance: "Approximately 3–4 km",
      difficulty: "Easy — leisurely walking",
      groupSize: "Small & Intimate (up to 8 guests)",
      languages: "English & Spanish",
      experienceType: "Heritage · Bazaars · Local Life · Street Food",
      meetingPoint: "Chandni Chowk, City Palace Complex",
    },
    story: `Jaipur is often introduced through its forts, palaces, and pink façades. But the city reveals its true character in the evening — when shops glow under warm lights, prayers echo through temples, streets fill with conversation, and legendary food stalls signal the end of a working day.\n\nBeyond the Pink was created for travellers who want to understand Jaipur as a living city, not just a historic one. Every day, thousands of visitors photograph the same iconic landmarks. Very few step sideways into the lanes where lac bangle makers have worked for centuries, where master brass craftsmen shape metal by lamplight, and where the same families have served pyaz kachori from the same spot for generations.\n\nThis experience moves through those lanes. Slowly. With intention.`,
    whatYouExperience: [
      "Hawa Mahal by evening light — understanding its architecture beyond the famous façade",
      "Navigate past Tripoliya Darwaza and Isarlat as the walled city illuminates",
      "Enter the guild lanes: fiery workshops of lac bangle makers and brass & copper craftsmen",
      "Taste the culinary timeline: pani puri, pyaz kachori, artisanal lassi, rabri, and kulfi in clay pots",
      "Witness evening rituals at neighbourhood temples as dusk settles on the city",
      "Discover hidden courtyards and havelis that most tourists walk past without noticing",
    ],
    highlights: [
      { icon: "🏮", text: "Old City illuminated by evening" },
      { icon: "💍", text: "Lac bangle maker workshops" },
      { icon: "🥘", text: "6–8 curated street food tastings" },
      { icon: "🫖", text: "Masala chai at a heritage eatery" },
      { icon: "🛕", text: "Evening temple rituals" },
      { icon: "📸", text: "Street photography magic hour" },
      { icon: "🏘️", text: "Hidden lanes & havelis" },
      { icon: "👥", text: "Small intimate group" },
    ],
    curatorNote: "I designed this walk because I kept meeting visitors who had spent three days in Jaipur and still hadn't tasted a pyaz kachori. Or walked down Maniharon ka Rasta. Or watched a lac bangle being made. Beyond the Pink was built to fix that.",
    faqs: [
      { q: "Is the street food safe?", a: "We personally vet every vendor for hygiene, ingredient freshness, and water quality. Safety is non-negotiable." },
      { q: "Can vegetarian & vegan needs be accommodated?", a: "Yes. This walk is vegetarian-friendly by default. Inform us of specific allergies in advance." },
      { q: "How much walking is involved?", a: "Approximately 3–4 km at a relaxed pace with many stops. Comfortable shoes are strongly recommended." },
      { q: "Is it suitable for children?", a: "Yes — children who enjoy exploring and trying new foods tend to love this walk." },
      { q: "Can I book privately?", a: "Yes, private bookings are available and highly recommended for a more personalised experience." },
    ],
  },

  // ── 6. The Farm & Fire ──────────────────────────────────────────
  {
    slug: "farm-and-fire",
    priceUSD: 45,
    priceINR: 4000,
    priceNote: null,
    title: "The Farm & Fire",
    subtitle: "A Taste of Rajasthan, From Soil to Soul",
    question: "How does Rajasthan tell its story through food?",
    tagline: "Leave the city behind. Cook over wood-fired stoves. Eat what you make. Remember it forever.",
    theme: "Countryside Farmhouse · Rajasthani Cooking · Farm-to-Table · Local Family",
    filters: ["Morning", "Evening", "Food", "Rural", "Immersive"],
    duration: "3 hrs",
    startTime: "Summers: 6:00 PM – 9:00 PM · Winters: 5:00 PM – 8:00 PM",
    whatIncludes: "Farm visit + Rajasthani cooking",
    distance: "Minimal walking at farmhouse",
    difficulty: "Easy",
    groupSize: "Up to 8 guests",
    languages: ["English", "Spanish"],
    location: "Raah India's Countryside Farmhouse, outskirts of Jaipur",
    meetingPoint: "RAAH's Farm House (Sri Sri Villa)",
    ...getExperienceImages("farm-and-fire"),
    idealFor: ["Food lovers & home cooks", "Cultural immersion seekers", "Families", "Those wanting a countryside escape", "Travellers tired of restaurants"],
    inclusions: [
      "Hosted by a local family",
      "Traditional vegetarian meal",
      "Cultural conversation over masala chai",
      "Introduction to Indian Masala Box",
      "Traditional wood-fired stove (Chulha) demonstration",
      "A small souvenir from Raah",
      "Hands-on cooking experience",
    ],
    exclusions: [
      "Gratuities (entirely at guest's discretion)",
      "Personal purchases",
      "Alcoholic beverages",
    ],
    glancePoints: [
      "A countryside escape away from the chaos of the city",
      "An invitation into an Indian home",
      "Small & intimate groups",
      "Countryside farmhouse setting",
      "Experience traditional cooking over a wood-fired chulha",
      "Enjoy a vegetarian feast, prepared together and shared with your host family",
      "Farm-table ingredients",
      "Understand the secrets of Indian spices — their traditional uses, role and balance in a cuisine",
    ],
    beforeYouCome: {
      duration: "Half-day / approximately 4–5 hours",
      startTime: "Summers: 6:00 PM–9:00 PM · Winters: 5:00 PM–8:00 PM",
      distance: "Minimal walking at farmhouse",
      difficulty: "Easy — no prior cooking experience required",
      groupSize: "Small & Intimate (8–10 guests)",
      languages: "English & Spanish",
      experienceType: "Culinary · Cultural · Family Experience",
      meetingPoint: "RAAH's Farm House (Sri Sri Villa)",
      host: "Local Indian Family",
      cuisine: "Traditional Rajasthani & Indian Vegetarian",
    },
    story: `Food in Rajasthan is not just sustenance. It is memory, hospitality, history, and identity — all served on one plate.\n\nThe Farm & Fire was created as a genuine invitation into that world. Not a demonstration. Not a tourist kitchen. A real family kitchen, real wood-fired stoves, real recipes passed down through generations — and a meal that you cook yourself, with your own hands, using ingredients harvested that same morning.\n\nHosted at Raah India's private countryside farmhouse, this experience escapes the city's pace entirely. There are no crowds, no schedules that rush you, and no performance. Just the smell of wood smoke, the rhythm of a stone grinder, the warmth of a local family's hospitality, and food that will ruin restaurant dining for you forever.`,
    whatYouExperience: [
      "Arrive at the countryside farmhouse — breathe, settle, and leave the city behind",
      "Harvest seasonal vegetables and herbs from the farm with your host",
      "Learn the philosophy of Rajasthani cooking: spice logic, dal traditions, and regional variation",
      "Cook a full Rajasthani meal over traditional wood-fired chulhas (stoves)",
      "Learn family recipes passed down through generations — dal baati churma, sabzis, pickles, chai",
      "Sit together and eat the meal you prepared — in the shade of trees, as the afternoon slows",
    ],
    highlights: [
      { icon: "🌾", text: "Farm-to-table ingredient harvesting" },
      { icon: "🔥", text: "Traditional wood-fired cooking" },
      { icon: "👩‍🍳", text: "Family recipes, generations old" },
      { icon: "🍛", text: "Full Rajasthani meal you cook" },
      { icon: "🌿", text: "Countryside farmhouse setting" },
      { icon: "🚐", text: "Hotel pick-up & drop included" },
      { icon: "🫖", text: "Welcome chai & refreshments" },
      { icon: "👥", text: "Intimate small group" },
    ],
    curatorNote: "After years of guiding visitors through Jaipur's markets and monuments, I kept noticing the same thing: the moments guests remembered most were always around food. Not restaurants — real kitchens. The Farm & Fire was built to create that memory deliberately.",
    faqs: [
      { q: "Do I need cooking experience?", a: "None whatsoever. Our hosts guide every step — from harvesting to plating. Beginners love this experience." },
      { q: "Is this suitable for vegetarians?", a: "Yes, entirely. The full menu is vegetarian and reflects traditional Rajasthani home cooking." },
      { q: "How far is the farmhouse from the city?", a: "It's 30 minutes away from central Jaipur. Return transport can be arranged on prior request." },
      { q: "Can children participate?", a: "Absolutely — children are natural participants in cooking experiences and tend to be our best students." },
      { q: "Can I book privately?", a: "Yes. Private bookings allow us to fully customise the menu and pace for your group." },
    ],
  },

  // ── 7. The Living Walled City ───────────────────────────────────
  {
    slug: "living-walled-city",
    title: "The Living Walled City",
    subtitle: "Beyond the Markets, Into the Soul of Jaipur",
    question: "How do people truly live inside the Pink City?",
    tagline: "Beyond monuments and markets lies a city still shaped by tradition, craft, faith, and community.",
    theme: "Old City · People · Traditions · Craft · Living Heritage",
    filters: ["Morning", "Evening", "Heritage", "Culture", "Immersive"],
    duration: "2.5–3 hrs",
    startTime: "Morning or evening (flexible)",
    whatIncludes: "Artisan lanes + living heritage",
    distance: "Approx. 3 km",
    difficulty: "Easy to Moderate",
    groupSize: "Up to 8 guests",
    languages: ["English", "Spanish"],
    location: "Walled City, Jaipur",
    meetingPoint: "Confirmed on booking",
    ...getExperienceImages("living-walled-city"),
    idealFor: ["Deep culture seekers", "Repeat Jaipur visitors", "Documentary & street photographers", "Those who have done the monuments and want more"],
    inclusions: ["Expert local storyteller", "Neighbourhood exploration", "Craft interaction stops", "Tea/chai at a local spot"],
    exclusions: ["Transport to/from meeting point", "Purchases at markets"],
    story: `Every street in the old city has a story. Every doorway holds a memory. Every neighbourhood carries traditions that have shaped Jaipur for three centuries.\n\nThe Living Walled City was designed for travellers who have already seen the monuments and want to go deeper — into the neighbourhoods, the communities, the crafts, and the daily rhythms that give those monuments their context and meaning.\n\nThis is not a walk through history. It is a walk through the present — where history is still alive, practiced, and very much at home.`,
    whatYouExperience: [
      "Explore neighbourhoods organised by ancient guild traditions — each with its own character",
      "Visit working artisans: block printers, marble carvers, textile dyers, and jewellers",
      "Discover religious diversity within the old city — temples, mosques, and Jain shrines side by side",
      "Walk through hidden residential mohallas (quarters) where daily life continues unchanged",
      "Understand Jaipur's extraordinary urban planning through the grid of the walled city",
      "Share chai with local shopkeepers and hear stories that no guidebook contains",
    ],
    highlights: [
      { icon: "🏘️", text: "Residential mohallas & hidden lanes" },
      { icon: "🖨️", text: "Working artisan workshops" },
      { icon: "🕌", text: "Multi-faith heritage sites" },
      { icon: "📐", text: "Jaipur's urban planning revealed" },
      { icon: "🫖", text: "Chai with local voices" },
      { icon: "📸", text: "Authentic street photography" },
      { icon: "📖", text: "Community storytelling" },
      { icon: "👥", text: "Small intimate group" },
    ],
    curatorNote: "This walk was born from a conversation with a guest who said: 'I've seen all the monuments — now I want to meet the city.' The Living Walled City is exactly that.",
    faqs: [
      { q: "Is this different from Beyond the Pink?", a: "Yes. Beyond the Pink is focused on the evening food trail and illuminated old city. The Living Walled City is a deeper daytime exploration of communities, crafts, and neighbourhoods." },
      { q: "Can I book privately?", a: "Yes, and private groups get a fully customised routing based on their interests." },
      { q: "Is it suitable for children?", a: "Yes — the craft visits and neighbourhood exploration are excellent for curious children." },
      { q: "What should I wear?", a: "Comfortable shoes and modest clothing, as you'll be entering residential and religious spaces." },
      { q: "Are restrooms available en route?", a: "Yes — we plan stops near facilities." },
    ],
  },

  // ── 8. The Lost Kingdom ─────────────────────────────────────────
  {
    slug: "the-lost-kingdom",
    priceUSD: 40,
    priceINR: 3500,
    priceNote: null,
    title: "The Lost Kingdom",
    subtitle: "Trails Through Amber's Forgotten Wilderness",
    question: "What secrets lie hidden in the hills beyond the fort?",
    tagline: "Where the Kingdom Returns to Nature",
    theme: "Amber Hills · Nature Trail · Hidden Ruins · Weekend Special",
    filters: ["Morning", "Hiking"],
    duration: "4 hrs",
    startTime: "6:00 AM – 10:00 AM (Saturdays & Sundays only)",
    whatIncludes: "Wilderness trail + Amber ruins",
    distance: "Approx. 6–8 km (with elevation)",
    difficulty: "Moderate",
    groupSize: "Up to 8 guests",
    languages: ["English", "Spanish"],
    location: "Amber Hills, Jaipur",
    meetingPoint: "Confirmed on booking (Amber area landmark)",
    ...getExperienceImages("the-lost-kingdom"),
    idealFor: ["Trekkers & hikers", "Nature lovers", "History enthusiasts", "Photographers", "Weekend adventurers"],
    inclusions: [
      "A well-designed hiking experience by local Raah expert",
      "Exploration of centuries-old ruins, sacred shrines, fortifications, water reservoirs, and heritage sites beyond usual trails",
      "Panoramic viewpoints overlooking Amber Fort, Sagar & Maota Lake, Jaigarh Fort, and other shrines",
      "Scenic photography spots",
      "Complimentary bottled water",
      "Experience serenity, nature & peaceful surroundings away from the chaos of the city",
      "Insight into Amber's ecology, wildlife, and history of Amber Valley",
    ],
    exclusions: [
      "Personal hiking equipment",
      "Donations to temples",
      "Gratuities (optional)",
      "Meals",
    ],
    glancePoints: [
      "Experience surreal Amber beyond the tourist trail",
      "Follow natural trails through rugged hills, vegetation & dramatic landscapes",
      "Discover forgotten remains hidden in the heart of the valley",
      "Unveil forgotten stories & legends associated with landscapes, settlements & kingdoms that flourished here",
      "Visit secluded shrines nestled in the quiet heart of Amber Valley",
      "Immerse yourself in nature alongside the trail — encountering native birds, seasonal flora, and the delicate rhythms that bring the landscape to life",
      "Marvel at sweeping vistas of Amber Fort & rugged hills from secret hilltop viewpoints",
    ],
    beforeYouCome: {
      duration: "4–5 hrs",
      startTime: "Early Morning 6:00 AM & Late Afternoon 3:00 PM",
      distance: "6–8 km",
      difficulty: "Moderate — walking on rugged terrain",
      groupSize: "Small & Intimate (up to 8 guests)",
      languages: "English & Spanish",
      experienceType: "Nature · Hiking · Adventure · History",
      meetingPoint: "Kheri Gate (Near Anokhi Museum, Amber)",
    },
    story: `Long before roads connected the hills of Amber, these winding trails carried kings, soldiers, priests, and pilgrims across a kingdom protected by forests, watchtowers, and towering fortifications.\n\nToday, much of that landscape has quietly disappeared from the maps of modern travellers.\n\nThe Lost Kingdom invites you to leave the familiar monuments behind and step into the untouched wilderness that once formed the outer heart of the Kingdom of Amber. Following ancient pathways through the Aravalli Hills, this immersive hiking experience uncovers hidden shrines, forgotten ruins, abandoned defensive structures, and breathtaking viewpoints that reveal a side of Jaipur few visitors ever imagine exists.\n\nAs you journey through forests, rocky ridges, and peaceful valleys, you'll discover how nature has slowly reclaimed places that once echoed with the footsteps of royalty, warriors, and wandering ascetics. Along the way, stories of forgotten temples, sacred landscapes, military strategy, and local legends breathe new life into the stones that remain.\n\nThis is not simply a hike.\n\nIt is an expedition through a kingdom that history almost forgot — where every trail leads to another story, every ruin sparks the imagination, and every summit offers a new perspective on the remarkable legacy of Amber.\n\nSome kingdoms are preserved behind palace walls. Others are waiting to be rediscovered beneath open skies.`,
    whatYouExperience: [
      "Begin beside the tranquil waters of Sagar Lake, where the bustling city gradually fades into the quiet landscapes that once surrounded the Kingdom of Amber",
      "Follow ancient trails winding through the Aravalli Hills, revealing a side of Jaipur known mainly to local residents and passionate explorers",
      "Visit the peaceful shrine of Lord Hanuman, tucked away among the hills and revered by the local community for generations",
      "Encounter the weathered remains of forgotten fortifications, hidden gateways, and historic structures that once protected the kingdom from approaching armies",
      "Discover the secluded Lord Shiva Temple, where the sounds of the forest replace the noise of the city — surrounded by rocky cliffs and native woodland",
      "Appreciate the remarkable biodiversity of the Aravalli landscape and pause at panoramic viewpoints showcasing Amber's forts, walls, and lakes from perspectives rarely seen by visitors",
      "Hear stories of forgotten rulers, hidden pathways, local legends, and the resilience of nature that accompany every step",
      "Conclude where the kingdom and the wilderness meet — with the feeling of having explored a forgotten chapter of Rajasthan's remarkable story",
    ],
    highlights: [
      { icon: "🏔️", text: "Hike through hidden valleys and forest trails surrounding the historic Kingdom of Amber" },
      { icon: "🌊", text: "Begin your journey beside the tranquil waters of Sagar Lake" },
      { icon: "🐒", text: "Visit the secluded Lord Hanuman temple, known mainly to local residents" },
      { icon: "🛕", text: "Explore the peaceful Lord Shiva Temple, nestled within the Aravalli Hills" },
      { icon: "🏚️", text: "Discover forgotten ruins, ancient fortifications, and abandoned pathways beyond the tourist trail" },
      { icon: "📖", text: "Learn how the surrounding landscape protected and sustained the Kingdom of Amber" },
      { icon: "🌄", text: "Enjoy breathtaking viewpoints overlooking Amber Fort, Jaigarh Fort, the defensive walls, and surrounding valleys" },
      { icon: "🗺️", text: "Hear stories of local legends, military strategy, sacred sites, and forgotten history hidden within the hills" },
      { icon: "🌿", text: "Experience the natural beauty and biodiversity of one of the world's oldest mountain ranges" },
      { icon: "👥", text: "Escape the crowds and discover an adventurous side of Jaipur that few travellers ever experience" },
    ],
    curatorNote: "I stumbled upon these trails years ago while following a local shepherd. What I found above Amber — the fallen towers, the wild landscape, the absolute silence — felt like a secret the city had been keeping. The Lost Kingdom exists to share that secret.",
    faqs: [
      { q: "Why only on weekends?", a: "The trail requires a small, focused group and extra guide preparation. We run it exclusively on Saturdays and Sundays to maintain quality." },
      { q: "How fit do I need to be?", a: "Moderate fitness is recommended. There is elevation gain and uneven terrain. Those with knee or mobility concerns should check with us before booking." },
      { q: "What should I wear?", a: "Sturdy trekking shoes, full-length trousers (for undergrowth), a light jacket for the early morning, and sun protection." },
      { q: "Can I book privately?", a: "Yes — private weekend bookings are available for groups of 2 to 8." },
      { q: "Is it suitable for children?", a: "Older children (14+) who are comfortable with moderate hiking do very well on this experience." },
    ],
  },

  // ── 9. The Artisan's Jaipur ──────────────────────────────────────
  {
    slug: "artisans-jaipur",
    priceUSD: 30,
    priceINR: 2500,
    priceNote: null,
    title: "The Artisan's Jaipur",
    subtitle: "Beyond Souvenirs, Into Craftsmanship",
    question: "Who are the hands that shaped the Pink City?",
    tagline: "Where Hands Still Remember",
    theme: "Craft Workshops · Block Print · Gems · Lac Bangles · Living Traditions",
    filters: ["Morning", "Evening"],
    duration: "2.5 hrs",
    startTime: "1:00 PM – 3:30 PM",
    whatIncludes: "Visit Jaipur's streets + meet master artists",
    distance: "Approx. 2–3 km",
    difficulty: "Easy",
    groupSize: "Up to 8 guests",
    languages: ["English", "Spanish"],
    location: "Walled City Craft Lanes, Jaipur",
    meetingPoint: "Confirmed on booking (craft district landmark)",
    ...getExperienceImages("artisans-jaipur"),
    idealFor: ["Design enthusiasts", "Shopping-conscious travellers", "Culture seekers", "Those tired of tourist markets", "Families with older children"],
    inclusions: [
      "Professionally designed Artisan Heritage Walk",
      "Local expert & storyteller",
      "Discover Jaipur's timeless crafts — lac bangles, marble carving, utensil makers, jewellers",
      "Live artisan workshops & dedicated craft streets",
      "Insights into every craft that shaped Jaipur",
      "Capture Jaipur in its raw, living element",
      "Hands-on experience wherever artisans invite you",
    ],
    exclusions: [
      "Personal purchases from artisans",
      "Gratuities (only at guest's discretion)",
      "Shopping stops",
    ],
    glancePoints: [
      "Discover Jaipur's timeless craft traditions in their living context",
      "Walk through dedicated artisan streets where each lane tells its own story",
      "Watch master craftsmen at work — lac bangle makers, marble carvers, jewellers, utensil makers",
      "Understand the patience, precision and artistry behind each handmade creation",
      "Hear the stories of family businesses that have survived for generations",
      "Experience hands-on moments wherever artisans invite you to try",
      "Capture Jaipur in its most raw, authentic and living element",
    ],
    beforeYouCome: {
      duration: "2.5–3 hrs",
      startTime: "Mid-afternoon 1:00 PM",
      distance: "4–5 km",
      difficulty: "Easy — slow paced",
      groupSize: "Small & Intimate (up to 8 guests)",
      languages: "English & Spanish",
      experienceType: "Craft · Culture · Local Life · Heritage",
      meetingPoint: "Jaleb Chowk, City Palace Complex",
    },
    story: `Behind Jaipur's colourful bazaars lies another city — one that many visitors never notice. A city where narrow lanes echo with the rhythmic tapping of metal, where marble slowly transforms into sculpture, where delicate bangles are still shaped by hand, and where families continue crafts that have defined Jaipur for centuries.\n\nThe Artisan's Jaipur is not a shopping tour. It is a journey into the living workshops of the city — not hidden behind museum glass, but woven into the streets where artisans continue to create, repair, and perfect their craft every day.\n\nRather than focusing on finished products, this experience celebrates the people behind them. Meet the makers, witness traditional techniques, understand the stories behind each craft, and discover how Jaipur's artistic identity continues to thrive in an increasingly modern world.\n\nBecause true craftsmanship isn't something you buy. It's something you experience.`,
    whatYouExperience: [
      "Walk beyond the storefronts and into the quieter lanes where Jaipur's artistic traditions are still alive",
      "Witness skills refined over generations — from lac bangle shaping and intricate jewellery to marble carving, miniature painting, metalwork, wood carving, and time-honoured textiles",
      "Observe real artisans during their working day — not a scheduled demonstration, but a genuine window into daily craft life",
      "Understand the patience behind every handmade object and why these crafts remain essential to Jaipur's cultural fabric",
      "Hear stories of family businesses that have survived for decades — sometimes centuries — despite changing markets and modern manufacturing",
      "Learn how apprentices inherit knowledge, how traditions evolve without losing their essence, and why craftsmanship is one of Jaipur's greatest living legacies",
      "Leave seeing these objects not as souvenirs, but as the result of countless hours of skill, dedication, and heritage",
    ],
    highlights: [
      { icon: "🏘️", text: "Wander through Jaipur's historic artisan lanes and traditional craft districts" },
      { icon: "👁️", text: "Observe craftsmen at work in their natural surroundings" },
      { icon: "📖", text: "Discover the stories behind family-run trades and generational businesses" },
      { icon: "🏆", text: "Learn how Jaipur became one of India's most celebrated craft capitals" },
      { icon: "🔨", text: "Understand traditional techniques rather than simply admiring finished products" },
      { icon: "✨", text: "Appreciate the patience, precision, and artistry behind handmade creations" },
      { icon: "🤝", text: "Meet the people who continue to preserve Jaipur's living heritage through their craft" },
    ],
    curatorNote: "I grew up watching my neighbours practice crafts that the rest of the world has largely forgotten. Every time I see a visitor buy a mass-produced souvenir two streets away from where the real thing is being made, I feel we've failed them. The Artisan's Jaipur is my attempt to fix that.",
    faqs: [
      { q: "Can I buy directly from artisans?", a: "Yes — you're welcome to purchase directly. We never take commissions from artisans, so every purchase goes entirely to the maker." },
      { q: "Is this suitable for children?", a: "Yes — children are often the most engaged visitors in craft workshops. The hands-on demonstrations are particularly memorable for younger guests." },
      { q: "Can I try making something?", a: "In most workshops, yes. Artisans are happy to guide you through a short hands-on attempt. Let us know in advance if this is a priority." },
      { q: "Can I book privately?", a: "Yes — private bookings allow us to tailor the craft stops to your specific interests." },
      { q: "What if I have no interest in shopping?", a: "This experience is not about shopping — it is about understanding. Many guests who have no intention of buying anything find it among the most memorable experiences of their trip." },
    ],
  },
];

// ── Combo Experiences ────────────────────────────────────────────
export const combos = [

  // ── Collection 1: One Day Signature Journeys ────────────────────
  {
    collection: "signature",
    title:       "The Soul of Jaipur",
    subtitle:    "Jaipur at Dawn (Sunrise) + The Blue Hour (Sunset)",
    description: "Experience the full soul of Jaipur in one perfect day. Begin before sunrise with temple rituals, flower markets, and traditional breakfast as the city awakens in golden light. Return in the evening for an open-jeep journey through illuminated monuments, from Nahargarh's sunset panorama to the city's glowing landmarks after dark. From dawn's first whisper to the Blue Hour's last glow — this is Jaipur at its most authentic.",
    experiences: ["jaipur-at-dawn", "the-blue-hour"],
    tag:         "Most Popular",
    priceINR:    4050,
    priceUSD:    45,
  },
  {
    collection: "signature",
    title:       "Nature & Kingdom",
    subtitle:    "The Lost Kingdom (Wildlife & Trekking) + The Ridge & Ramparts (Historic & Royal Legacy)",
    description: "A Complete Amber Experience. Venture into the forgotten wilderness of the Aravalli Hills at first light, exploring hidden trails, ancient ruins, and sacred temples beyond the tourist circuit. Continue to Amber's historic town and forts in the afternoon, discovering the royal capital's stepwells, heritage lanes, and the hidden maharaja passage to Jaigarh Fort. One kingdom, two perspectives — wilderness and civilisation intertwined.",
    experiences: ["the-lost-kingdom", "ridge-and-ramparts"],
    tag:         "Complete Amber Experience",
    priceINR:    4500,
    priceUSD:    50,
  },
  {
    collection: "signature",
    title:       "Jaipur Through Time",
    subtitle:    "The Heart of the Pink City (Afternoon) + Beyond the Pink (Evening)",
    description: "Trace Jaipur's royal story from its grandest monuments to its living streets. Explore Hawa Mahal, Jantar Mantar, and the City Palace through the lens of the king who imagined them — understanding how astronomy shaped architecture and science guided governance. As evening falls, step into the walled city's illuminated bazaars, artisan lanes, and legendary food stops. Science, sovereignty, and street life — all in one day.",
    experiences: ["cosmic-imperial-triad", "beyond-the-pink"],
    tag:         "Heritage & Culture",
    priceINR:    4050,
    priceUSD:    45,
  },
  {
    collection: "signature",
    title:       "Makers of Jaipur",
    subtitle:    "The Artisan's Jaipur (Afternoon) + The Farm & Fire (Late Evening)",
    description: "Celebrate the hands that built Jaipur. Spend the afternoon walking through workshops of master block printers, gem cutters, blue pottery artists, and lac bangle makers — the artisans who have shaped the city's identity for centuries. End the day at a countryside farmhouse, cooking a traditional Rajasthani meal over wood-fired stoves alongside a local family. Craft, culture, and the warmth of a shared table.",
    experiences: ["artisans-jaipur", "farm-and-fire"],
    tag:         "Craft & Cuisine",
    priceINR:    4950,
    priceUSD:    55,
  },

  // ── Collection 2: Full-Day Premium Journeys ──────────────────────
  {
    collection: "premium",
    title:       "Jaipur at Dawn + The Heart of Pink City + Beyond the Pink",
    subtitle:    "Morning Rituals · Royal Monuments · Evening Bazaars",
    description: "The most complete one-day journey through Jaipur. Begin before sunrise in the living streets of the Old City — temple rituals, flower markets, and a legendary breakfast. Continue to the royal precinct in the afternoon, uncovering the science, astronomy, and vision behind Jaipur's greatest monuments. As the city lights up at dusk, walk through the walled city's illuminated lanes, artisan workshops, and iconic street food stops. Three experiences. One extraordinary day.",
    experiences: ["jaipur-at-dawn", "cosmic-imperial-triad", "beyond-the-pink"],
    tag:         "The Complete Jaipur",
    priceINR:    5850,
    priceUSD:    65,
  },
  {
    collection: "premium",
    title:       "The Heart of Pink City + Artisan's Jaipur + Blue Hour",
    subtitle:    "Royal Architecture · Living Crafts · Evening Illumination",
    description: "A full day dedicated to Jaipur's visual and intellectual brilliance. Begin at the royal precinct — Hawa Mahal, Jantar Mantar, and City Palace through a connected narrative. Move into the artisan quarters in the afternoon, meeting master craftspeople whose skills have defined Jaipur's identity for generations. As evening arrives, board an open jeep for the Blue Hour — watching the city's monuments glow against the darkening sky from Nahargarh to Patrika Gate.",
    experiences: ["cosmic-imperial-triad", "artisans-jaipur", "the-blue-hour"],
    tag:         "Art, Science & Light",
    priceINR:    8550,
    priceUSD:    95,
  },
  {
    collection: "premium",
    title:       "Lost Kingdom + Ridge & Ramparts + Farm & Fire",
    subtitle:    "Aravalli Wilderness · Royal Heritage · Countryside Kitchen",
    description: "A full day that takes you from wilderness to history to hearth. Begin at first light in the Aravalli Hills — hiking forgotten trails, discovering hidden temples, and exploring the valley's ancient secrets. Journey to Amber's historic town in the afternoon, walking the maharaja's hidden passage between Amber and Jaigarh Fort. End the day at a countryside farmhouse, cooking a traditional Rajasthani meal with local hosts over wood-fired stoves. Nature, history, and fire.",
    experiences: ["the-lost-kingdom", "ridge-and-ramparts", "farm-and-fire"],
    tag:         "Nature, History & Hearth",
    priceINR:    6750,
    priceUSD:    75,
  },
  {
    collection: "premium",
    title:       "Jaipur at Dawn + Ridge & Ramparts + Blue Hour",
    subtitle:    "Sacred Morning · Royal Kingdom · Illuminated Night",
    description: "Three defining layers of Jaipur — its spiritual morning, its royal heritage, and its illuminated night. Begin before sunrise in the living Old City, where temples, flower markets, and legendary eateries reveal the city's quiet soul. Journey to Amber in the afternoon, walking through the ancient royal capital from Maota Lake to Jaigarh Fort via the maharaja's hidden passage. Return to the city at sunset for the Blue Hour — an open-jeep journey through monuments bathed in amber light.",
    experiences: ["jaipur-at-dawn", "ridge-and-ramparts", "the-blue-hour"],
    tag:         "Epic Day · Ultimate Journey",
    priceINR:    8550,
    priceUSD:    95,
  },
];

// ── Journal Articles ─────────────────────────────────────────────
export const journalArticles = [
  {
    slug: "why-i-created-raah",
    title: "Why I Created Raah",
    excerpt: "Sometimes, the right path appears only when you choose to leave the familiar one. A journey beyond the monuments into the living streets of the Pink City.",
    category: "From the Curator",
    readTime: "4 min read",
    image: "/journal Images/why raah.png",
    body: `Sometimes, the right path appears only when you choose to leave the familiar one.

For years, I have walked alongside travellers through Jaipur's magnificent forts, palaces, and several monuments. Like many journeys, our days were carefully planned, every stop accounted for, every place visited.

Yet, I couldn't ignore the moment when the day came to an end and guests would request me — "What else is there to see in Jaipur besides historical sites?" That simple question took me beyond the monumental trail.

I began taking them through the Jaipur I was curious for — old city back lanes, bustling bazaars, hidden temples, family-run businesses, and everyday things taking place in the living streets of Pink City. We wandered calmly, paused for conversations, discovered forgotten corners, and experienced the city as a true Jaipurite does in everyday life.

Those unplanned moments soon became the most memorable part of every journey.

That journey of exploration eventually became Raah.

The appreciation & praise of each guest as "This is the Jaipur every tourist would wish to experience" influenced me to create unique experiences in Jaipur. Their words inspired me to keep exploring Jaipur beyond monuments — not just for myself, but for every traveller who wanted to feel the city as if it actually belonged to them.

With every walk, I discovered new stories, hidden places, and meaningful encounters that deserved to be shared.

In Hindi, Raah means "a path." For me, it represents a different way of discovering Jaipur — not through a checklist of attractions, but through its people, traditions, hidden corners, and the stories that bring them to life.`,
  },
  {
    slug: "hidden-temples-amber-valley",
    title: "The Hidden Temples of Amber Valley",
    excerpt: "Long before tourists arrived to admire Amber Fort, the kingdom awoke not to the sound of cameras, but to the ringing of temple bells.",
    category: "Heritage",
    readTime: "6 min read",
    image: "/journal Images/hidden valleys.png",
    body: `"Long before tourists arrived to admire Amber Fort, the kingdom awoke not to the sound of cameras, but to the ringing of temple bells."

Most visitors leave Amber with the feeling of having seen its greatest treasure — the Amber Fort. Yet behind these magnificent forts & palace lies a different world: the world of quiet shrines, centuries-old temples, forgotten rituals, and local devotion that has continued uninterrupted for generations.

By walking through the old streets of Amber, you'll come across places that rarely appear in guidebooks but remain deeply woven into the lives of the community.

**Ambikeshwar Temple**

Hidden beneath the shadow of Amber Fort, Ambikeshwar Temple remains one of the kingdom's oldest living places of worship. While thousands pass nearby on their way to the palace, few pause to notice the quiet devotion that continues here every single day. The temple gets flooded with water in monsoon season, making it inaccessible even for locals. Ambikeshwar temple dates back to the 10th century, supposedly built by King Kakil Dev, one of the earliest rulers of the Kachhawaha Dynasty.

**Bihari Ji Temple**

A stone's throw away from Ambikeshwar Temple lies this forgotten temple — one of the kingdom's hidden architectural treasures. Allegedly home to Lord Vishnu and his consort Goddess Lakshmi, it now stands abandoned yet captivating, with its mysterious open-domed roof and the silent echoes of Amber's forgotten past.

**Badri Narayan Temple (Silawaton Ka Mandir)**

Perched gracefully on the hillside overlooking Amber, the Laxmi Narayan Temple is one of those landmarks that almost every visitor notices, yet surprisingly few take the time to explore. Known locally as Silawaton Ka Mandir — the Temple of the Stone Carvers — it quietly stands as a testament to the devotion and craftsmanship of the community that shaped much of Amber's architectural heritage.

**Jagat Shiromani Temple**

Beyond Amber's bustling palace lies a sanctuary where history, art, and devotion come together in perfect harmony. The Jagat Shiromani Temple — fondly called the Meera Temple — is not merely a place of worship; it is a monument to a mother's love, built by Queen Kanakwati in honour of Prince Jagat Singh. Its beautifully sculpted gateways, delicate marble work, and centuries-old legends surrounding Meera Bai's idol make it one of Amber's greatest architectural treasures.

**Narsingh Ji Temple**

Hidden within the original 13th century palace of Amber stands the temple of Narsingh Ji — a revered black stone idol of Lord Narsingh, the man-lion incarnation of Lord Vishnu. For centuries, the deity has been regarded as the divine guardian of the Kachhawaha rulers. A well-known local saying reflects this belief: "Jab tak Narsingh gaddi mein, tab tak raaj hatheli main."

"Amber's greatest stories are often found far away from its most celebrated monuments."`,
  },
  {
    slug: "why-jaipur-was-built",
    title: "Why Jaipur Was Built",
    excerpt: "Most people believe Jaipur was built simply because Amber had become overcrowded. The true story is far more extraordinary.",
    category: "History",
    readTime: "5 min read",
    image: "/journal Images/why jaipur built.png",
    body: `A City Born from the Vision of a King Who Looked Beyond His Time.

Most people believe Jaipur was built simply because Amber had become overcrowded or faced a growing shortage of water. While these challenges certainly influenced the decision, they tell only part of the story.

The true inspiration behind Jaipur was Sawai Jai Singh II — a remarkable ruler, scholar, astronomer, and visionary whose ambitions extended far beyond building another royal capital.

The title "Sawai," meaning "one and a quarter" (or 1¼ times greater than an ordinary man), was bestowed upon him in recognition of his exceptional intellect and abilities.

Unlike many kings of his time, Jai Singh II was deeply fascinated by science, mathematics, architecture, astronomy, and urban planning. He dreamed of creating a city that would not only serve as the new capital of his kingdom but also become a centre of learning, trade, innovation, and scientific exploration.

His greatest passion was astronomy. Unsatisfied with the inaccuracies of existing astronomical tables, he commissioned the construction of five astronomical observatories — known today as the Jantar Mantars — in Delhi, Jaipur, Ujjain, Varanasi, and Mathura. These monumental instruments reflected his relentless pursuit of precision.

Jaipur became the canvas upon which he brought all these ideas together. Designed according to the ancient principles of Vastu Shastra and planned on a rational grid unlike any other Indian city of its time, Jaipur was conceived as a city where science, commerce, governance, culture, and spirituality could coexist in perfect harmony.

More than three centuries later, Jaipur continues to embody the vision of the extraordinary king who dared to imagine a city a century ahead of its time.

Jaipur was never built simply to replace Amber. It was built to realise the vision of a ruler who believed that knowledge, planning, and progress could shape the future of an entire kingdom.`,
  },
  {
    slug: "why-jaigarh-was-never-conquered",
    title: "Why Jaigarh Was Never Conquered",
    excerpt: "Crowning the hills above Amber Fort, Jaigarh isn't remembered for the battles it fought — but for the battles it never lost.",
    category: "Heritage",
    readTime: "5 min read",
    image: "/journal Images/why jaigarh.png",
    body: `Crowning the rugged Aravalli Hills, the fortress was designed to be practically impregnable. Its strategic position allowed soldiers to spot approaching armies long before they reached the gates, while the surrounding hills formed a natural ring of defence.

Yet Jaigarh's greatest strength lay within its walls. Decades before sustainable construction entered mainstream thinking, the fortress was engineered to withstand lengthy sieges. An ingenious network of aqueducts, filtration tanks, and massive rainwater reservoirs ensured a dependable water supply throughout the year. Many reservoirs were even covered to prevent evaporation under Rajasthan's scorching sun, allowing the fort to remain self-sufficient for prolonged periods.

Though the foundations of Jaigarh are attributed to Raja Kakil Dev in the 11th century, it was Sawai Jai Singh II who transformed it into one of India's greatest military fortresses. A visionary ruler with a passion for science, engineering, and astronomy, he strengthened its defences and established it as the kingdom's military headquarters.

Jaigarh also became the principal cannon foundry of the Mughal Empire, where skilled craftsmen forged some of the finest artillery of their time. Its most celebrated creation, the Jaivana Cannon, remains one of the largest wheeled cannons ever built — with a reputed firing range of nearly 22 miles (35 km). A remarkable engineering achievement that still captures the imagination.

Perhaps that is why Jaigarh was never conquered. It wasn't simply protected by towering walls or mighty cannons — it was protected by exceptional planning, self-reliance, and a strategic vision that was centuries ahead of its time.`,
  },
  {
    slug: "why-cows-are-sacred",
    title: "Why Cows are Sacred in India",
    excerpt: "In Hinduism, the cow is highly revered and associated with a mother and the gods. It is strongly believed that all gods reside within the body of a cow.",
    category: "Culture",
    readTime: "4 min read",
    image: "/journal Images/cow.png",
    body: `In Hinduism, the cow is highly revered and associated with a mother and the gods. It is strongly believed that all gods reside within the body of a cow. Hence, it is the responsibility of every Hindu to accord her respect — and everyone abides by this. For most religious ceremonies, the cow is essential.

As per ancient texts, cows are pure and auspicious animals. Looking after a cow and doing all the daily chores for her — like bathing, feeding, and providing water — are considered commendable acts. In fact, cow dung and urine are said to have medicinal properties. Whosoever offers a morsel of food to a cow before having a meal is said to attain salvation. With respect to this, every Hindu household prepares at least two chapatis to offer to a cow before any meal.

Besides, the charity of a cow benefits the whole family in all disciplines. The touch and care of her absolves one's sins. The produce of a cow — milk, ghee, curd, and butter — are used in religious ceremonies.

In the Atharva Veda, it is mentioned: "The cow is the mother of Rudras, daughter of the Vasus and sister of Surya. She is the producer of ghee which acts like a celestial nectar."

It is also said that cow's milk helps overcome infirmity and regain lost mental and physical health. It stimulates the intellect.

In ancient times, cows were offered to gods and given as gifts as a sign of esteem. They were considered a symbol of wealth and prosperity, and one's status would be determined by the number of cows one possessed.

In another religious text, it is said that the world depends upon the cow. The back is identical to Rig-Veda, the body of Yajur-Veda, the mouth of Sam-Veda, the neck of good deeds, and the soft body hair are like Mantras.

Hence, the cow — known as Gau-Mata — holds a revered position in Hinduism, symbolising wealth, prosperity, intellect, nutrition, and abundance. The sacred animal is linked with Hindu deities like Lord Krishna, further deepening its significance in Hindu beliefs and rituals.`,
  },
  {
    slug: "jaipur-before-sunrise",
    title: "Why Jaipur is Best Experienced Before Sunrise",
    excerpt: "If anyone would ask me which is the best time to experience Jaipur, I would certainly mention: at Dawn, before anyone wakes up.",
    category: "Dawn Jaipur",
    readTime: "4 min read",
    image: "/journal Images/sunset.png",
    body: `Jaipur At Dawn: A City That Awakens in Gold

If anyone would ask me which is the best time to experience Jaipur, I would certainly mention: at Dawn, before anyone wakes up. Jaipur before sunrise belongs to a different world — it seems to be peaceful, slow-paced, and even more beautiful than at its usual hours.

Mornings in Jaipur are different from any other city. It doesn't appear to be a city — rather a canvas that glows before the world wakes up. Watching the sun climbing over Amber Fort, or Hawa Mahal blushing in soft shades of rose and amber, is something that once seen, is never forgotten. When you step out onto the streets, the air is cool, fresh, and crisp — filled with devotion, temple bells, the aroma of incense, fresh flowers, and a delicious morning chai.

Experiencing Jaipur in its genuine form is possible only in the early morning, where we witness it in its most vulnerable and authentic state — before the tourist rush, the honking of vehicles, and the chaos of daily life.

Watching the everyday scenes of locals setting up generations-old eateries, hearing the echoes of temple bells, seeing farmers moving fresh vegetables and flowers piled on motorbikes and commercial vehicles, pigeons fluttering across courtyards — all these moments become a surreal experience for first-time travellers.

The beauty of Jaipur does not lie only in its magnificent forts and palaces, vibrant culture, and rich architecture — it lies in these delicate and timeless moments. Experiencing Jaipur before sunrise is not about sightseeing. It is all about intimacy — where you feel the city literally belongs to you.

Hence, if you ever come to Jaipur, do not forget to explore it in its golden hours.`,
  },
  {
    slug: "conversations-as-a-guide",
    title: "Few Conversations That I Will Never Forget as a Guide",
    excerpt: "Leading a tour through Jaipur is always joyful, but there are few unplanned conversations that stay with me forever.",
    category: "From the Curator",
    readTime: "5 min read",
    image: "/journal Images/few conversation.png",
    body: `Leading a tour through Jaipur is always joyful — full of stories, laughter, and memorable moments that we both cherish at the end of the tour. But there are a few conversations that stay with me forever, ones I still think of. Those conversations were never planned — yet they happened in fleeting moments, leaving a lasting imprint on my heart.

**The Voices of Wonder**

One day, when we were wandering through the narrow streets of Jaipur, a couple travelling with me paused in the middle of the street and asked: "Why does Jaipur have so many temples in every corner?" After a detailed explanation of the spiritual importance in the life of an individual, he said something that stayed with me — that instead of appearing to be a commercial city, Jaipur made him feel more like a spiritual centre.

In that moment, I no longer saw Jaipur merely as the capital city, but as a living sanctuary — a place where devotion, connection, and belonging flow through people gathered in worship, binding the city's soul together.

**"I Will Remember the Walk, Not the Fort"**

I met a family from France at Amber Fort who could also speak Spanish and were looking for a guide. I stumbled upon them looking lost and ended up introducing myself to help out. As they were new to the town and hadn't seen much yet, after the fort visit I gently asked if they'd like me to show them something beyond the fort — something they would probably like.

The magical experience they had was expressed in their gratitude, a warm hug, and a thank-you note that read: "Perhaps we could forget the dates and history of the fort, but we'll never forget the experience you gave us."

That line stayed with me ever since. I began to show everyone something beyond the forts and palaces. That is how the idea of Raah was born.

**Banter Over Chai**

One evening, after our walk ended in the old city, we sat together at an old tea stall. It was a group of young friends from the USA. The conversation started from the experience we'd shared throughout the day — and it drifted from culture, food, and family traditions to some genuinely funny moments.

Though a guide would never become too familiar due to professional ethics, that day they drew me into the conversation in such a way that we ended up becoming real friends — and they are still in touch with me.

We laughed over unusual things we encountered in everyday life, grew serious on some topics, and shared our honest opinions on each other's personal interests. Those moments remind me: travelling is not about visiting a place — it is about building a connection with the people around you.`,
  },
];

// ── Helpers ──────────────────────────────────────────────────────
export function getExperienceBySlug(slug) {
  return experiences.find((e) => e.slug === slug) || null;
}

export function getRelatedExperiences(currentSlug, count = 3) {
  return experiences.filter((e) => e.slug !== currentSlug).slice(0, count);
}
