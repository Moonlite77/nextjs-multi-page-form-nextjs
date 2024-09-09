/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
		serverActions: {
			allowedOrigins: ["localhost:3000"]
			},
	},
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'oaidalleapiprodscus.blob.core.windows.net',
			port: '',
		  },
		],
	  },
	  typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	  },
};
export default nextConfig;
