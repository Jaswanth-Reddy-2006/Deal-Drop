/** @type {import('next').NextConfig} */
// Force dev server restart to clear stale module resolution cache
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
