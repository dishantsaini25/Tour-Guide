/**
 * Each entry has:
 *   id       — unique number
 *   question — the question string
 *   answer   — the answer string (plain text; keep accurate to site content)
 *   category — one of: "General" | "Experiences" | "Booking" | "Practical Information"
 */

export const faqs = [
  // ── General ──────────────────────────────────────────────────────────────
  {
    id: 1,
    category: "General",
    question: "What is Raah India?",
    answer:
      "Raah India (also known as Raah Experiences) is a boutique, curator-led experience company based in Jaipur, Rajasthan. We design and lead immersive walking tours, jeep excursions, countryside experiences, and artisan lane walks — all centred on authentic local life, heritage, and storytelling. Every experience is led by a knowledgeable local guide who brings Jaipur's history, culture, and people to life.",
  },
  {
    id: 2,
    category: "General",
    question: "Where does Raah operate?",
    answer:
      "All our experiences are currently based in and around Jaipur, Rajasthan. We cover the Old City (walled city), Amber Town, the Aravalli ridgeline, and the Jaipur countryside. Each experience has its own specific meeting point — confirmed at the time of booking.",
  },
  {
  id: 3,
  category: "General",
  question: "What languages are the experiences conducted in?",
  answer:
    "All Raah experiences are conducted in English and Spanish as standard, with no additional charge for either language. For other languages (Italian, German, Russian, or Japanese), guides can sometimes be arranged on request, subject to availability. Please reach out via the enquiry form or WhatsApp and we will do our best to accommodate your group.",
  linkText: "More on our guide's language background",
  linkHref: "/journal/best-english-spanish-guide-jaipur",
},
  {
    id: 4,
    category: "General",
    question: "How do I contact Raah?",
    answer:
      "The fastest way to reach us is via WhatsApp at +91 99299 92539 — we're available 9 AM to 9 PM IST, seven days a week. You can also fill in the enquiry form on our Contact page or email us at raahindiaexperiences@gmail.com. We respond personally to every message, usually within 24 hours.",
  },
  {
    id: 26,
    category: "General",
    question: "Who is the best tour guide or operator in Jaipur?",
    answer:
      "Rather than claim to be \"the best,\" what genuinely sets Raah apart: every experience is personally led (not outsourced to rotating guides), groups are capped at 8 people, no stop on any experience is commission-based or forced shopping, and the guide holds both Jaipur Regional and Pan India (IITG) government tourism licenses.",
  },
  {
    id: 27,
    category: "General",
    question: "Is Raah a traditional travel agency?",
    answer:
      "No — Raah is a boutique, single-guide-led experience company rather than a traditional travel agency. If you're looking for a personal, storytelling-led alternative to large group tours, this is what Raah is built around.",
  },
  {
    id: 28,
    category: "General",
    question: "Are Raah's experiences designed for international or foreign visitors?",
    answer:
      "Yes — every experience is conducted in English and Spanish, kept to small groups, and built around storytelling rather than a standard checklist of monuments. Guest reviews come from travellers across more than ten countries.",
  },

  // ── Experiences ───────────────────────────────────────────────────────────
  {
    id: 5,
    category: "Experiences",
    question: "What kind of experiences does Raah offer?",
    answer:
      "We offer a curated range of experiences: sunrise heritage walks through the Old City, a ridge and fort trek around Amber, an astronomy and royal architecture tour at Jaipur's iconic monuments, an evening jeep drive during the blue hour, an evening street food and bazaar walk, a countryside farmhouse cooking masterclass, a walled city community walk, a weekend wilderness trail in the Aravallis, and an artisan craft lane walk. We also offer combination packages for guests who want to go deeper into the city.",
  },
  {
    id: 6,
    category: "Experiences",
    question: "How long do the experiences usually last?",
    answer:
      "Duration varies by experience. Walking experiences typically run 2.5–3.5 hours. The evening jeep experience (The Blue Hour) runs approximately 4 hours. The Ridge & Ramparts trek is 4–5 hours. Exact timings are listed on each experience page and confirmed at booking.",
  },
  {
    id: 7,
    category: "Experiences",
    question: "Where does the experience start?",
    answer:
      "Each experience has its own meeting point — for example, Jaleb Chowk for Jaipur at Dawn, Maota Lake for the Ridge & Ramparts, and hotel pick-up within city limits for The Blue Hour. The exact meeting point is confirmed when you book. We recommend arriving 10 minutes early.",
  },
  {
    id: 8,
    category: "Experiences",
    question: "Is transportation included in the experiences?",
    answer:
      "Transportation is included in The Blue Hour, which is conducted in a private open-air 4x4 Jeep. Walking experiences take place entirely on foot. For Jaipur at Dawn, the route covers approximately 3–4 km at a gentle pace. Please check the individual experience page for transport details.",
  },
  {
    id: 9,
    category: "Experiences",
    question: "What is included in the price?",
    answer:
      "Inclusions vary by experience and are listed on each individual experience page. As a general guide: all experiences include expert curator-led storytelling. Jaipur at Dawn includes a local breakfast and street food tastings. The Blue Hour includes refreshments. Monument entry fees are typically not included and are noted clearly in the exclusions of each experience.",
  },
  {
    id: 10,
    category: "Experiences",
    question: "What is not included?",
    answer:
      "Monument entry tickets (where applicable), personal purchases, gratuities, and full meals are generally not included. Some experiences have specific exclusions — for example, the golf cart at Jaigarh Fort or the astrologer consultation at The Crown of Jaipur experience are optional add-ons charged separately. Full exclusions are listed on each experience page.",
  },
  {
    id: 11,
    category: "Experiences",
    question: "Are the experiences suitable for solo travellers?",
    answer:
      "Absolutely. Several guests join our experiences as solo travellers. Our small group format (up to 8 guests) makes it easy to meet other like-minded travellers while enjoying a genuinely personal experience. Solo travellers are always welcome.",
  },
  {
    id: 12,
    category: "Experiences",
    question: "Are the experiences suitable for couples?",
    answer:
      "Yes. Couples particularly enjoy The Blue Hour (our evening jeep experience), Beyond the Pink (the evening bazaar walk), and Jaipur at Dawn. Private bookings are popular with couples who prefer an exclusive, intimate experience.",
  },
  {
    id: 13,
    category: "Experiences",
    question: "Are the experiences suitable for families with children?",
    answer:
      "Yes, most experiences are family-friendly. Jaipur at Dawn is slow-paced and full of sensory discoveries, suitable for children aged 7 and above. The Crown of Jaipur (Hawa Mahal, Jantar Mantar, City Palace) is excellent for families and adapts storytelling for all ages. The Ridge & Ramparts trek is better suited to older children aged 12+ who enjoy walking and history. We recommend checking the difficulty level on each experience page before booking with young children.",
  },
  {
    id: 14,
    category: "Experiences",
    question: "Can I request a customised or private experience?",
    answer:
      "Yes. All Raah experiences can be booked as a private tour for just your group — whether you're a couple, a family, a group of friends, or a corporate party. We can also discuss customised itineraries tailored to your interests, timing, or group size. Get in touch via the enquiry form or WhatsApp to discuss what you have in mind.",
  },
  {
    id: 15,
    category: "Experiences",
    question: "What should I bring or wear?",
    answer:
      "Comfortable walking shoes are essential for all walking experiences. For morning experiences, light layers work well as Jaipur mornings can be cool, especially in winter. For the Ridge & Ramparts trek, trekking shoes and sun protection are recommended as some sections are exposed. A camera is always a good idea. Specific recommendations are listed on each experience page under 'Before You Come'.",
  },

  // ── Booking ───────────────────────────────────────────────────────────────
  {
    id: 16,
    category: "Booking",
    question: "How can I book an experience?",
    answer:
      "You can book by filling in the enquiry form on our Contact page or by clicking 'Book Now' on any experience page. You can also reach us directly on WhatsApp at +91 99299 92539. We respond personally to all enquiries within 24 hours to confirm availability and finalise your booking.",
  },
  {
    id: 17,
    category: "Booking",
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 24–48 hours in advance to ensure your preferred date and time is available, especially during peak seasons (October–March). Last-minute requests are sometimes possible — drop us a WhatsApp message and we'll do our best to accommodate you.",
  },
  {
    id: 18,
    category: "Booking",
    question: "What is the group size for each experience?",
    answer:
      "Most Raah experiences accommodate up to 8 guests per group, keeping the experience small, intimate, and personal. The Blue Hour has a minimum of 2 guests. If you have a larger group, please contact us — we may be able to arrange a dedicated booking for you.",
  },
  {
    id: 19,
    category: "Booking",
    question: "What happens if I need to cancel?",
    answer:
      "Please contact us as soon as possible if you need to cancel or reschedule. Cancellation and rescheduling terms are discussed at the time of booking. We handle each situation personally — reach out via WhatsApp or email and we'll work with you to find the best solution.",
  },
  {
    id: 20,
    category: "Booking",
    question: "What happens if the weather affects the experience?",
    answer:
      "Light rain rarely stops a Raah experience — the old city and heritage sites have their own charm in the rain. In the case of severe weather that makes the experience unsafe or impractical, we will reschedule at no charge. We will always communicate proactively if there is a weather concern.",
  },
  {
    id: 29,
    category: "Booking",
    question: "Can I get a full-day guided tour cost estimate for a foreign visitor?",
    answer:
      "Full-day combo experiences range from ₹4,050 (approximately $45) for a One Day Signature Journey up to ₹8,550 (approximately $95) for the most comprehensive Full-Day Premium Journey, which combines three experiences into a single day.",
  },

  // ── Practical Information ─────────────────────────────────────────────────
  {
    id: 21,
    category: "Practical Information",
    question: "Are the walking experiences physically demanding?",
    answer:
      "Most walking experiences are rated Easy and are suitable for most fitness levels — they are slow-paced and cover 3–4 km. The Ridge & Ramparts (Amber heritage trek) is rated Moderate, covering 5–7 km with some elevation gain, and is recommended for guests who are comfortable with moderate walking. Difficulty levels are listed on each experience page.",
  },
  {
    id: 22,
    category: "Practical Information",
    question: "Are restrooms available during the experiences?",
    answer:
      "Yes, we plan stops near facilities. Please let your guide know of any specific needs at the start of the experience.",
  },
  {
    id: 23,
    category: "Practical Information",
    question: "Is it safe for solo female travellers?",
    answer:
      "Yes. Every Raah experience is led personally by a licensed guide who stays with the group throughout, and all routes are planned through well-populated parts of the city — even during early morning and evening walks. Groups are also kept small, capped at 8 guests, so your guide can look after everyone properly. Standard precautions worth knowing regardless of destination: save local emergency numbers on arrival (100 for police, 181 for India's women's helpline), use registered transport or ride-hailing apps rather than hailing an unmarked vehicle, and keep someone informed of your day's plans. If you'd feel more comfortable with a fully private setting, private bookings are available for solo travellers too.",
  },
  {
    id: 24,
    category: "Practical Information",
    question: "Are the experiences wheelchair accessible?",
    answer:
      "Accessibility varies by experience. Major sections of Jantar Mantar and City Palace (part of The Crown of Jaipur) have wheelchair-accessible areas, though some historic doorways have steps. Walking experiences through the Old City involve narrow lanes and cobbled streets. Please contact us before booking so we can advise on the most suitable experience for your needs.",
  },
  {
    id: 25,
    category: "Practical Information",
    question: "Is food included, and can dietary requirements be accommodated?",
    answer:
      "Food is included in experiences where it is listed as an inclusion — for example, Jaipur at Dawn includes local breakfast and street food tastings. All food served on Raah experiences is vegetarian by default. If you have specific dietary requirements or allergies, please let us know at the time of booking.",
  },
  {
  id: 30,
  category: "Practical Information",
  question: "How much does a trip to Jaipur cost?",
  answer:
    "Costs vary widely by travel style. A budget traveller can expect roughly $14–18 per day, a mid-range traveller around $65–70 per day, and a luxury traveller $175 or more per day, covering accommodation, food, local transport, and one guided experience.",
  linkText: "See our full cost breakdown",
  linkHref: "/journal/how-much-does-a-jaipur-trip-cost",
},
];

/**
 * Order: General → Experiences → Booking → Practical Information
 */
const CATEGORY_ORDER = ["General", "Experiences", "Booking", "Practical Information"];

export const faqCategories = CATEGORY_ORDER.filter((cat) =>
  faqs.some((f) => f.category === cat)
);