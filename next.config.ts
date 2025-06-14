import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '100mb' // Adjust based on your needs
    }
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ax342x9abb.ufs.sh",
        port: "",
      },
    ],
  },
};

export default nextConfig;
