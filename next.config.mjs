/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
	  serverActions: {
		allowedOrigins: ["localhost:3000"]
	  },
	},
	images: {
	  domains: ['anothercoolpic.s3.us-east-2.amazonaws.com'],
	  minimumCacheTTL: 60,
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
		{
		  protocol: 'https',
		  hostname: '*.app.github.dev',
		  port: '',
		  pathname: '/**'
		}
	  ],
	},
	async rewrites() {
	  return [
		{
		  source: '/s3-image/:path*',
		  destination: 'https://anothercoolpic.s3.us-east-2.amazonaws.com/:path*',
		},
	  ];
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