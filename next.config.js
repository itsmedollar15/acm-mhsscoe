/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: { serverActions: true },
  images: {
    domains: ["files.mhsscoe.hosting.acm.org"],
  },
  redirects: async () => [
    {
      source: "/webathon",
      destination: "https://webathon.mhsscoe.acm.org",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
