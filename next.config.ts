import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['payload'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3002',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withPayload(nextConfig, {
  // Bundle payload in dev so client admin (Nav, etc.) can resolve payload/shared (PREFERENCE_KEYS)
  devBundleServerPackages: true,
});
