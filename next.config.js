/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
  transpilePackages: ['@mui/x-charts'],
  images: {
    domains: ["img.freepik.com","picsum.photos"],
  },
};


module.exports = nextConfig

