import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Standalone, self-contained experiment served at a clean URL.
      { source: "/planet-jumping", destination: "/planet-jumping.html" },
    ];
  },
};

export default nextConfig;
