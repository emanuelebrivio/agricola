import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'app.agricolabrivio.com',
          },
        ],
        destination: '/app/:path*',
      },
    ]
  },
};

export default nextConfig;
