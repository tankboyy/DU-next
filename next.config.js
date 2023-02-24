/** @type {import('next').NextConfig} */

const APIURL =
	//
	process.env.NODE_ENV === "development" ? "http://localhost" : process.env.API_URL
console.log('APIURL', APIURL, process.env.NODE_ENV)
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	// async redirects() {
	//   return [{
	//     source: "/api",
	//     destination: "/form",
	//     permanent: false
	//   }]
	// },

	async rewrites() {
		return [
			{
				source: "/api/game",
				destination: `${APIURL}:3001/game`,
			},
			{
				source: "/api/logs/all",
				destination: `${APIURL}:3001/logs/all`,
			},
			{
				source: "/api/users",
				destination: `${APIURL}:3001/users`,
			},
			{
				source: "/api/game/resG",
				destination: `${APIURL}:3001/game/resG`,
			},
			{
				source: "/api/game/cancelG",
				destination: `${APIURL}:3001/game/cancelG`,
			},
			{
				source: "/api/game/boardG",
				destination: `${APIURL}:3001/game/boardG`,
			},
			{
				source: "/api/logs/today",
				destination: `${APIURL}:3001/logs/today`,
			},
			{
				source: "/api/logs/addlog",
				destination: `${APIURL}:3001/logs/addlog`,
			},
			{
				source: "/api/users/idcheck",
				destination: `${APIURL}:3001/users/idcheck`,
			},
			{
				source: "/api/users/adduser",
				destination: `${APIURL}:3001/users/adduser`,
			},
			{
				source: "/api/users/updateuser",
				destination: `${APIURL}:3001/users/updateuser`,
			},
			{
				source: "/api/users/deleteuser",
				destination: `${APIURL}:3001/users/deleteuser`,
			},
			{
				source: "/api/users/login",
				destination: `${APIURL}:3001/users/login`,
			},
			{
				source: "/api/profit1",
				destination: `${APIURL}:3001/api/ss`,
			},
			{
				source: "/api/logs/addReserveLog",
				destination: `${APIURL}:3001/api/addReserveLog`,
			},
			{
				source: "/api/logs/getRLog",
				destination: `${APIURL}:3001/api/getRLog`,
			},
			{
				source: "/api/game/resSoloG",
				destination: `${APIURL}:3001/game/resSoloGame`,
			},

		];
	},
};

module.exports = nextConfig;
