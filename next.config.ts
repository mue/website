import type { NextConfig } from 'next';

// Content Security Policy configuration (DISABLED)
// const cspHeader = `
//   default-src 'self';
//   script-src 'self' 'unsafe-eval' 'unsafe-inline' https://static.cloudflareinsights.com https://tally.so;
//   style-src 'self' 'unsafe-inline';
//   img-src 'self' blob: data: https://cdn.muetab.com https://images.unsplash.com https://res.cloudinary.com https://*.githubusercontent.com https://raw.githubusercontent.com;
//   font-src 'self' data:;
//   connect-src 'self' https://static.cloudflareinsights.com https://cloudflareinsights.com https://tally.so;
//   frame-src 'self' https://demo.muetab.com https://tally.so https://www.youtube.com;
//   frame-ancestors 'self';
//   object-src 'none';
//   base-uri 'self';
//   form-action 'self' https://tally.so;
//   upgrade-insecure-requests;
// `
//   .replace(/\s{2,}/g, ' ')
//   .trim();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Security headers (CSP disabled for now)
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: cspHeader,
  //         },
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'SAMEORIGIN',
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'strict-origin-when-cross-origin',
  //         },
  //         {
  //           key: 'Permissions-Policy',
  //           value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
