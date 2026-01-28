import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['cartridges.esmet.store', '91.201.114.180', 'localhost:3002'],
    },
  },
};

export default nextConfig;
