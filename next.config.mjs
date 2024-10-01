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
			hostname: '*.amazonaws.com',
			port: '',
			pathname: '/**',
		  },
<<<<<<< HEAD
		  {
			protocol: 'https',
			hostname: '*.app.github.dev',
			port: '',
			pathname: '/**'
		  }
=======
>>>>>>> 6d3ed94c11bef62d1676d2b603ae4c3927cca1bf
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
