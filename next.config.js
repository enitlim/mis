/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    URLSECRETKEY: process.env.URLSECRETKEY,
  },
};

module.exports = nextConfig
