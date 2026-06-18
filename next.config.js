/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Lets us `import config from "@/config/whatever.yaml"` and get a
  // parsed JS object, bundled at build time (Edge-runtime safe — no
  // runtime fs reads, so this also works from middleware.ts).
  turbopack: {
    rules: {
      "*.yaml": {
        loaders: ["yaml-loader"],
        as: "*.js",
      },
      "*.yml": {
        loaders: ["yaml-loader"],
        as: "*.js",
      },
    },
  },
};

module.exports = nextConfig;
