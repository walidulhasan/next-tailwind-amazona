/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify:true,
  optimizeFonts:true,
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"iili.io"
      },
    ],
    minimumCacheTTL:1500000,
  },
};

module.exports = nextConfig
