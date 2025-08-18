// next.config.mjs or next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // ✅ should be an object, not true or boolean
    
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
 allowedDevOrigins: ["http://localhost:3000", "http://192.168.100.72:3000"]

};

export default nextConfig;
