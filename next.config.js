/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    GOOGLE_MAPS_MAP_ID: process.env.GOOGLE_MAPS_MAP_ID,
    PROJECT_ID: process.env.PROJECT_ID,
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
