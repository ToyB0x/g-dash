import './src/env.mjs'

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@g-dash/database', '@g-dash/ui'],
}

export default nextConfig
