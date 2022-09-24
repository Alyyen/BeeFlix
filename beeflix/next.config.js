/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'default',
    domains: ['m.media-amazon.com'],
    formats: ['image/webp'],
  },
}

module.exports = nextConfig
