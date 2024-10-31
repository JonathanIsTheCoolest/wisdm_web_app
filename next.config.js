/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  env: {
    BASE_API_URL_DEV: 'http://127.0.0.1:5000/api',
  },
  images: {
    domains: ['localhost'],
    domains: ['lh3.googleusercontent.com'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;