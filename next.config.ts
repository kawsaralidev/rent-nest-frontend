import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      // Pexels
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },

      // Pixabay
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },

      // Freepik
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },

      // iStock
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },

      // Shutterstock
      {
        protocol: "https",
        hostname: "image.shutterstock.com",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
    ],
  },
};

export default nextConfig;
