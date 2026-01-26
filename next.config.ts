import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['cartridges.koks.mak', '172.17.4.43', 'localhost:3000'],
    },
  },
};

export default nextConfig;
