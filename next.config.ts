import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'assets.nintendo.com',
      'image.api.playstation.com',
      'cdn.cloudflare.steamstatic.com',
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'shared.fastly.steamstatic.com'
    ],
  },
};

export default nextConfig;
