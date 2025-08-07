// next.config.mjs or next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}  // ✅ should be an object, not true or boolean
  }
};

export default nextConfig;
