/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains:["firebasestorage.googleapis.com"],
  },
  typescript:{
    ignoreBuildErrors:true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
