/** @type {import('next').NextConfig} */
const nextConfig = {
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
