/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
  transpilePackages: ['@mui/x-charts'],
  images: {
    domains: ["img.freepik.com"],
  },
  experimental: {
    // …
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  },
};


module.exports = nextConfig

