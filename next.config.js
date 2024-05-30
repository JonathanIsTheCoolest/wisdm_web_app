/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {}

module.exports = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}