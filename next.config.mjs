/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.gandimobile.ir',
                port: '8443',
                pathname: '/api/**',
            },
        ],
    },
};

export default nextConfig;
