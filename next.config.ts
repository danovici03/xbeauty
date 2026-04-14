import type { NextConfig } from "next";
import path from "node:path";

const wpUrl = process.env.WORDPRESS_URL;

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      ...(wpUrl
        ? [
            {
              protocol: new URL(wpUrl).protocol.replace(":", "") as "http" | "https",
              hostname: new URL(wpUrl).hostname,
              pathname: "/wp-content/uploads/**",
            },
          ]
        : []),
      {
        protocol: "https" as const,
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
