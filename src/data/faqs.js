/**
 * faqs.js — Raah India FAQ Data
 * Central data source for the FAQ page.
 *
 * Each entry has:
 *   id       — unique number
 *   question — the question string
 *   answer   — the answer string (plain text; keep accurate to site content)
 *   category — one of: "General" | "Experiences" | "Booking" | "Practical Information"
 *
 * Policy note: answers are intentionally directed toward enquiry/contact wherever
 * exact policies (pricing, cancellation terms, payment methods) are not publicly
 * committed to on the website, to avoid inventing details.
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
      "All Raah experiences are conducted in English and Spanish. If you require a different language, please reach out to us via the enquiry form or WhatsApp and we will do our best to accommodate your group.",
  },
  {
    id: 4,
    category: "General",
    question: "How do I contact Raah?",
    answer:
      "The fastest way to reach us is via WhatsApp at +91 99299 92539 — we're available 9 AM to 9 PM IST, seven days a week. You can also fill in the enquiry form on our Contact page or email us at raahindiaexperiences@gmail.com. We respond personally to every message, usually within 24 hours.",
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
      "Yes. Your guide accompanies the group throughout, and all routes stay within well-populated areas of the city — even during the early morning experiences. We take the comfort and safety of all guests seriously.",
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
];

/**
 * Returns a deduplicated, sorted list of all categories present in the faqs array.
 * Order: General → Experiences → Booking → Practical Information
 */
const CATEGORY_ORDER = ["General", "Experiences", "Booking", "Practical Information"];

export const faqCategories = CATEGORY_ORDER.filter((cat) =>
  faqs.some((f) => f.category === cat)
);
