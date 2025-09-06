const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  outputFileTracingRoot: path.join(__dirname, '../../'),
  turbopack: {
    root: path.join(__dirname, '../../'),
  },
};

module.exports = nextConfig;
