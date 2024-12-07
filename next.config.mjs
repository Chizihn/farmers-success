/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/marketplace",
        destination: "https://marketplace.farmersuccess.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
