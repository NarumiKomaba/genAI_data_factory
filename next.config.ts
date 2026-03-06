import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination:
          "https://genai-data-factory-api-622188047085.asia-northeast1.run.app/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
