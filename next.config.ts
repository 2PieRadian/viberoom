import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://localhost:3000", "192.168.1.5"],
  reactStrictMode: false,
};

export default nextConfig;
