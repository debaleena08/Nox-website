import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["192.168.0.119", "192.168.0.113", "192.168.0.1"],
};

export default nextConfig;
