import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // config for time cache data. it reload every 30 seconds
  experimental: {
    staleTimes: {
      dynamic: 30,

    }
  }
};

export default nextConfig;
