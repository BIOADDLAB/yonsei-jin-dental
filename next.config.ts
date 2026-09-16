import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [{ protocol: 'https', hostname: 'firebasestorage.googleapis.com' }],
    },
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/blog',
                    destination: 'https://proxy.inblog.dev/yonseijin',
                },
                {
                    source: '/blog/:path*',
                    destination: 'https://proxy.inblog.dev/yonseijin/:path*',
                },
            ],
        };
    },
};

export default nextConfig;
