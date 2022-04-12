/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.yad2.co.il", "img.yad2.co.il"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
