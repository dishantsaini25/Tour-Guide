/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/experiences/cosmic-imperial-triad",
        destination: "/experiences/the-crown-of-jaipur",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;