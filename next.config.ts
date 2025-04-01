import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    STRIPE_API_SECRET: process.env.STRIPE_API_SECRET,
  },
};

export default nextConfig;

