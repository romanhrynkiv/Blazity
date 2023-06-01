import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";
import { env } from "./env.mjs";

const config = {
  reactStrictMode: true,
  experimental: { instrumentationHook: true },
  rewrites() {
    return [
      { source: "/healthz", destination: "/api/health" },
      { source: "/api/healthz", destination: "/api/health" },
      { source: "/health", destination: "/api/health" },
      { source: "/ping", destination: "/api/health" },
    ];
  },
};

config.headers = () => {
  return [
    {
      source: "/_next/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "no-cache, no-store, must-revalidate",
        },
      ],
    },
  ];
};


const withBundleAnalyzerConfig = withBundleAnalyzer({ enabled: env.ANALYZE });

const plugins = [[withBundleAnalyzerConfig]];
const finalConfig = withPlugins(plugins, config);

export default finalConfig;
