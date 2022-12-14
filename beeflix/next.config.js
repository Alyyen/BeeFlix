/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['m.media-amazon.com'],
    formats: ['image/webp'],
  },
}

module.exports = nextConfig
