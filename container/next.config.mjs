/** @type {import('next').NextConfig} */
const nextConfig = {
  appDir: true,
  async rewrites() {
    return [
      {
        source: '/design/:path*',
        destination: 'http://localhost:3001/:path*',
      },
      {
        source: '/leads/:path*',
        destination: 'http://localhost:3002/:path*',
      },
      {
        source: '/nps/:path*',
        destination: 'http://localhost:3003/:path*',
      },
      {
        source: '/whapy/:path*',
        destination: 'http://localhost:3004/:path*',
      },
    ];
  },
};

export default nextConfig; 