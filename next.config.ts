import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com', // Replace with your image host
        port: '',
        pathname: '/jakecloud07/image/upload/**', // Adjust the path as needed
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Replace with your image host
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
};

export default nextConfig;
