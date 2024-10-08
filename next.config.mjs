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
        hostname: "nirvanacafe.ir",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.c2.liara.space",
        port: "",
        pathname: "/**",
      },
    ],
  },
  devIndicators: {
    autoPrerender: false,
  },
};

export default nextConfig;
