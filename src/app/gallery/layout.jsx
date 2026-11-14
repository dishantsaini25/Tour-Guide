// Gallery page is a client component, so its metadata lives here.
// Without this, /gallery inherited the homepage title and description and had no canonical.
export const metadata = {
  title: { absolute: "Jaipur Photo Gallery | Raah Experiences" },
  description: "Photos from our Jaipur walking tours: sunrise in the old city, Amber Fort, the Blue Hour, local food and the craftspeople of Jaipur.",
  alternates: {
    canonical: "https://www.raahexperiences.in/gallery",
  },
};

export default function GalleryLayout({ children }) {
  return children;
}
