import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_API_URL || "https://path-to-peace-server.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
