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
    "IMG20260202172900.jpg",
    "IMG_20250914_132635_152.jpg",
    "IMG_20250914_132635_252.jpg",
    "IMG20241220100923.jpg",
    "IMG20251125084223.jpg",
  ],
  "Ridge and ramparts": [
    "thumbnail.jpg",
    "4f9d0e7f-216f-46b2-bd36-524bbe882e95.jpg",
    "IMG_20250902_121747.jpg",
    "IMG-20250315-WA0195.jpg",
    "IMG20241225100919.jpg",
    "IMG20250201095547.jpg",
    "IMG20260211161321.jpg",
  ],
  "The Cosmic & Imperial Triad": [
    "thumbnail.jpg",
    "IMG_20241124_124121.jpg",
    "IMG_20251119_141326.jpg",
    "IMG20241108124929.jpg",
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
    "IMG20241226181247.jpg",
    "IMG20260202185502.jpg",
  ],
  "Beyond the pink": [
    "thumbnail.jpg",
    "5aab880dcc61f7b35c49547113b089a3.jpg",
    "bfdab2ecd0d338903a3c75d3e1cc1934.jpg",
    "IMG20241220132625.jpg",
    "IMG20250107173304.jpg",
    "IMG20250203161213.jpg",
    "IMG20260202172637.jpg",
  ],
  "Farm and fire": [
    "thumbnail.jpg",
    "4ac0c64e55c7d32bfd39a762565815fe.jpg",
    "964512f5746cf8dcbca5ebf28786d570.jpg",
    "ae0bd8a0c7f3ff9a21361d109d77e07e.jpg",
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
    "thumbnail.jpg",
    "701d2a0f00ce8f804108986a9c390ea7.jpg",
    "caption.jpg",
    "images.jpg",
    "IMG20241215092452.jpg",
    "temples-of-amer-town-ambikeshwar-mahadev-lord-shiva-jaipur-near-panna-meena-kund-jaipurthrumylens.webp",
  ],
  "the artisian jaipur": [
    "thumbnail.jpg",
    "7cc49185359f5a2e321013768020b06d.jpg",
    "9c46314c97cec33dd44a31e584707ff0.jpg",
    "9d72434c1eebf265fbbc6a8411d7b587.jpg",
    "a530d48f686543c4df2df98927974da3.jpg",
    "a8ab8f262cd37c768e451071e83f6f1f.jpg",
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
    inclusions: ["Expert local storyteller", "Morning street food tastings", "Traditional Rajasthani breakfast with chai", "Temple visit & morning ritual participation"],
    exclusions: ["Transportation to meeting point", "Personal purchases", "Entry fees if applicable"],
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
    inclusions: ["Expert local guide & storyteller", "Walk through Amber Town & Fort", "Panna Meena ka Kund stepwell visit", "Hidden maharaja passage to Jaigarh Fort"],
    exclusions: ["Monument entry tickets", "Meals & refreshments", "Transport to Amber"],
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
    title: "The Cosmic & Imperial Triad",
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
    inclusions: ["Expert storytelling guide", "Curated narrative walk", "Cultural & scientific insights", "Local recommendations"],
    exclusions: ["Monument entry tickets", "Optional astrologer consultation fee", "Meals & refreshments"],
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
    title: "The Blue Hour",
    subtitle: "Where the Pink City Glows After Sunset",
    question: "How does Jaipur transform after sunset?",
    tagline: "Every city has a favourite hour. Jaipur simply waits until the day grows quiet enough to reveal it.",
    theme: "Evening Jeep · Nahargarh · Illuminated Monuments · Night Jaipur",
    filters: ["Evening", "Night", "Scenic"],
    duration: "4 hrs",
    startTime: "Summers: 5:30 PM – 9:30 PM · Winters: 4:00 PM – 8:00 PM (Everyday except Sat & Sun)",
    whatIncludes: "Jeep ride + illuminated monuments",
    distance: "Drive-based with photography stops",
    difficulty: "Very Easy",
    groupSize: "Up to 8 guests",
    languages: ["English", "Spanish"],
    location: "Across Jaipur",
    meetingPoint: "Hotel pick-up within city limits",
    ...getExperienceImages("the-blue-hour"),
    idealFor: ["Couples & honeymooners", "Photography enthusiasts", "First-time Jaipur visitors", "Those who love cinematic experiences"],
    inclusions: ["Custom open-air heritage 4x4 Jeep", "Expert local storyteller", "Photography stops at all key landmarks", "Bottled water"],
    exclusions: ["Monument entry tickets", "Meals & beverages", "Personal expenses"],
    story: `There is a brief moment every evening that most travellers unknowingly miss. It arrives quietly, somewhere between the warmth of sunset and the darkness of night. The sky deepens into shades of indigo, the day's energy softens, and Jaipur transforms — forts glow gold, bazaars buzz with a different energy, and familiar landmarks take on an entirely different character.\n\nThis fleeting transition is the Blue Hour.\n\nWe created this experience for travellers who believe that the beauty of a place is not only found in its monuments, but also in its atmosphere. Rather than rushing from one attraction to another, The Blue Hour invites you to savour the changing light, discover hidden perspectives, and experience the Pink City during one of its most enchanting hours.\n\nSome moments are too beautiful to hurry through.`,
    whatYouExperience: [
      "Nahargarh Fort: Watch Jaipur spread below you as the sun sets in golden panoramic splendour",
      "Jal Mahal: Witness the Water Palace appear to float on still, dark waters like a glowing jewel",
      "Hawa Mahal by Night: See its 953 windows brilliantly backlit — a completely different monument after dark",
      "Albert Hall Museum: Jaipur's most photogenic night landmark, alive in shifting coloured light",
      "Isarlat: The historic 'Tower of Heaven' glowing elegantly against the night sky",
      "Birla Temple: Pure white marble radiating a serene, ethereal glow",
      "Patrika Gate & Toran Dwar: Jaipur's most vibrant modern landmarks as a grand finale",
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
    inclusions: ["Expert local storyteller", "Curated street food tastings (6–8 items)", "Craft workshop interaction", "Cultural context at every stop"],
    exclusions: ["Transport to/from meeting point", "Full meals", "Personal purchases"],
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
    groupSize: "Up to 80 guests",
    languages: ["English", "Spanish"],
    location: "Raah India's Countryside Farmhouse, outskirts of Jaipur",
    meetingPoint: "Hotel pick-up arranged on booking",
    ...getExperienceImages("farm-and-fire"),
    idealFor: ["Food lovers & home cooks", "Cultural immersion seekers", "Families", "Those wanting a countryside escape", "Travellers tired of restaurants"],
    inclusions: ["Return transport from city hotel", "Seasonal ingredient harvesting", "Full Rajasthani cooking masterclass", "Meal prepared by you with local hosts", "Chai & welcome refreshments"],
    exclusions: ["Personal purchases", "Additional beverages beyond what's provided"],
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
      { q: "How far is the farmhouse from the city?", a: "Approximately 45–60 minutes from central Jaipur. Return transport is included." },
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
    inclusions: ["Expert local guide", "Guided wilderness trail", "Hidden ruins exploration", "Morning chai stop"],
    exclusions: ["Personal fitness equipment", "Meals", "Transport to Amber"],
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
    inclusions: ["Expert craft storyteller", "Live workshop visits (block print, lac bangles, gems)", "Hands-on craft demonstration", "Tea with an artisan family"],
    exclusions: ["Purchases from artisans", "Transport to meeting point"],
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
    secondaryHighlights: [
      "Live artisan streets instead of staged demonstrations",
      "Traditional craft neighbourhoods",
      "Family-run workshops and generations-old businesses",
      "Stories behind Jaipur's famous handicrafts",
      "Opportunities to interact respectfully with local craftsmen",
      "Insights into techniques, tools, and materials",
      "A deeper appreciation of authentic handmade craftsmanship",
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
  {
    title: "Soul of Jaipur",
    subtitle: "Jaipur at Dawn (Morning) + Beyond the Pink (Evening)",
    description: "Experience the full soul of Jaipur in one day. Begin before sunrise with temple rituals, flower markets, and traditional breakfast as the city awakens. End with an evening walk through the illuminated walled city, exploring artisan lanes, street food, and cultural heritage as night falls. From dawn's first light to evening's warm glow — this is Jaipur at its most authentic.",
    experiences: ["jaipur-at-dawn", "beyond-the-pink"],
    tag: "Most Popular",
  },
  {
    title: "Nature & Kingdom",
    subtitle: "Lost Kingdom (Morning) + Ridge & Ramparts (Afternoon)",
    description: "A Complete Amber Experience. Venture into the forgotten wilderness of the Aravalli Hills at first light, exploring hidden trails, ancient ruins, and sacred temples beyond the tourist circuit. Continue to Amber's historic town and forts in the afternoon, discovering the royal capital's stepwells, heritage lanes, and hidden maharaja passages. One kingdom, two perspectives — wilderness and civilization intertwined.",
    experiences: ["the-lost-kingdom", "ridge-and-ramparts"],
    tag: "Adventure & Heritage · Weekend Special",
  },
  {
    title: "Jaipur Through Time",
    subtitle: "Jaipur at Dawn (Morning) + Ridge & Ramparts (Afternoon) + The Blue Hour (Evening)",
    description: "Experience Jaipur's complete story from sunrise to sunset. Start with the city's sacred morning rituals and vibrant flower markets at dawn. Journey to Amber's ancient town and forts in the afternoon, walking through centuries of royal history. End with a magical evening jeep ride through illuminated monuments as the city transforms under the Blue Hour glow. Three experiences, one unforgettable day.",
    experiences: ["jaipur-at-dawn", "ridge-and-ramparts", "the-blue-hour"],
    tag: "Epic Day · Ultimate Journey",
  },
];

// ── Journal Articles ─────────────────────────────────────────────
export const journalArticles = [
  {
    slug: "jaipur-before-sunrise",
    title: "Why Jaipur is Best Experienced Before Sunrise",
    excerpt: "There is a version of Jaipur that most visitors never see — serene, fragrant, and entirely unhurried. It exists only in the hour before the city wakes.",
    category: "Dawn Jaipur",
    readTime: "5 min read",
    image: "/images/placeholder.jpg",
  },
  {
    slug: "five-conversations",
    title: "Five Conversations I Will Never Forget as a Guide",
    excerpt: "After years of walking Jaipur with travellers from across the world, certain exchanges stay with you long after the walk ends.",
    category: "From the Curator",
    readTime: "6 min read",
    image: "/images/IMG-20251222-WA0002 (1).jpg",
  },
  {
    slug: "forgotten-stories-gates",
    title: "The Forgotten Stories Behind Jaipur's Gates",
    excerpt: "Every gate in the walled city was built with intention. Understanding what those intentions were changes how you see the entire city.",
    category: "Heritage",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
  },
  {
    slug: "flower-garland-women",
    title: "The Women Who Still Make Jaipur's Flower Garlands",
    excerpt: "Every morning before sunrise, they arrive. Every evening, the city wears what they made. Their story is older than the monuments.",
    category: "Living Heritage",
    readTime: "5 min read",
    image: "/images/65b7913d1fe17fd9f50f64c4ee8fd84a.jpg",
  },
  {
    slug: "breakfast-rajasthan",
    title: "A Breakfast That Explains Rajasthan Better Than Any Museum",
    excerpt: "Dal baati churma. Pyaz kachori. Masala chai. One meal, one table, centuries of culture. Some things cannot be learned — only tasted.",
    category: "Food & Culture",
    readTime: "6 min read",
    image: "/images/a5526d1f70ad9bc886e5c9ecacb5f7c4.jpg",
  },
];

// ── Helpers ──────────────────────────────────────────────────────
export function getExperienceBySlug(slug) {
  return experiences.find((e) => e.slug === slug) || null;
}

export function getRelatedExperiences(currentSlug, count = 3) {
  return experiences.filter((e) => e.slug !== currentSlug).slice(0, count);
}
