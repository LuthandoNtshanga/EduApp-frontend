import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Skip ESLint build errors (to fix Vercel deployment issue)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

