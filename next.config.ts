import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
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
