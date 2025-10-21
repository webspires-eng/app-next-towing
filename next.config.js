const { randomUUID } = require("node:crypto");

/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId() {
    if (process.env.NEXT_BUILD_ID) {
      return process.env.NEXT_BUILD_ID;
    }
    return randomUUID().replace(/-/g, "");
  },
};

module.exports = () => nextConfig;
