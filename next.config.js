/** @type {import('next').NextConfig} */

const withPwa = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: true,
});

// const nextConfig = {
//   experimental: {
//     serverActions: true,
//   },

//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'avatars.githubusercontent.com',
//         port: '',
//       },
//       {
//         protocol: 'https',
//         hostname: 'tailwindui.com',
//         port: '',
//       },
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '3000',
//       },
//     ],
//   },
// };

// module.exports = nextConfig;

module.exports = withPwa({
  experimental: {
    // serverActions: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
});
