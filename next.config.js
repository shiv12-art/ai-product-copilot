/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Ensure public assets are served
  assetPrefix: process.env.ASSET_PREFIX || '',
  // Allow access to public files
  compress: true,
  // Redirect root to artifact if needed
  async rewrites() {
    return [
      {
        source: '/product-artifacts-enhanced.html',
        destination: '/product-artifacts-enhanced.html',
      },
    ]
  },
}

module.exports = nextConfig
