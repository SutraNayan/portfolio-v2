import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    cacheComponents: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
