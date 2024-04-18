/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "cdn.intra.42.fr"
			},
			{
				hostname: "avatars.githubusercontent.com"
			}
		]
	}
};

export default nextConfig;
