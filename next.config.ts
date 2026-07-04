import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // HTML/dinamik rotalar taze kalsın; statik varlıklar (_next/static, _next/image)
        // Next'in immutable cache'ini korusun ki sayfa geçişlerinde jank olmasın.
        source: '/((?!_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
