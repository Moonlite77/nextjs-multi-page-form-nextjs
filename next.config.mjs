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
		  {
			protocol: 'https',
			hostname: 'anothercoolpic.s3.us-east-2.amazonaws.com',
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
	  webpack: (config) => {
		config.externals.push("pino-pretty");
		return config;
	  },
};
export default nextConfig;
