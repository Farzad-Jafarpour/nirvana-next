/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "http://nirvanacafe.ir/api",
      },
    ];
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "f1.haizenberg.xyz",
        port: "",
        pathname: "/menu/**",
      },
    ],
  },
  devIndicators: {
    autoPrerender: false,
  },
};

export default nextConfig;
