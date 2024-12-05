module.exports = {
  basePath: "",
  images: {
    remotePatterns: [
      {
        hostname: "farmer-success.sfo3.cdn.digitaloceanspaces.com",
      },
      {
        hostname: "digitaloceanspaces.com",
      },
      {
        hostname: "ibb.co",
      },
    ],
  },

  swcMinify: true,
};

// async redirects() {
//   return [
//     {
//       source: '/modal/:path*', // Matches any route under /modal
//       destination: '/404',     // Redirects to a 404 page
//       permanent: false,
//     },
//   ];
// },
