/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@velo/agent", "react-map-gl", "mapbox-gl"],
};

module.exports = nextConfig;
