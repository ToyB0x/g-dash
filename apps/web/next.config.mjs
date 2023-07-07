import './src/env.mjs'

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@g-dash/ui', '@g-dash/database'],
}

export default nextConfig
