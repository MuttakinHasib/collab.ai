import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  // Optimize for production builds
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // Server external packages (moved from experimental)
  serverExternalPackages: [],

  // Turbopack configuration (now stable)
  turbopack: {},

  // Additional optimizations
  compress: true,

  // Enable static optimization
  trailingSlash: false,

  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui.shadcn.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/health",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
