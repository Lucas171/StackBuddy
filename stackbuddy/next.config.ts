import type { NextConfig } from "next";

// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb', // or '20mb' depending on your needs
    },
  },
}

module.exports = nextConfig


export default nextConfig;
