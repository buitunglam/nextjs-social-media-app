import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // config for time cache data. it reload every 30 seconds
  experimental: {
    staleTimes: {
      dynamic: 30,

    }
  },
  serverExternalPackages: ["@node-rs/argon2"],
};
// đang xem đến đoạn 1:17:45
export default nextConfig;
