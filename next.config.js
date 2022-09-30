/** @type {import('next').NextConfig} */
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
        destination: "http://52.79.98.159:3001/game",
      },
      {
        source: "/api/logs/all",
        destination: "http://52.79.98.159:3001/logs/all",
      },
      {
        source: "/api/users",
        destination: "http://52.79.98.159:3001/users",
      },
      {
        source: "/api/game/resG",
        destination: "http://52.79.98.159:3001/game/resG",
      },
      {
        source: "/api/game/cancelG",
        destination: "http://52.79.98.159:3001/game/cancelG",
      },
      {
        source: "/api/game/boardG",
        destination: "http://52.79.98.159:3001/game/boardG",
      },
      {
        source: "/api/logs/today",
        destination: "http://52.79.98.159:3001/logs/today",
      },
      {
        source: "/api/logs/addlog",
        destination: "http://52.79.98.159:3001/logs/addlog",
      },
      {
        source: "/api/users/idcheck",
        destination: "http://52.79.98.159:3001/users/idcheck",
      },
      {
        source: "/api/users/adduser",
        destination: "http://52.79.98.159:3001/users/adduser",
      },
      {
        source: "/api/users/updateuser",
        destination: "http://52.79.98.159:3001/users/updateuser",
      },
      {
        source: "/api/users/deleteuser",
        destination: "http://52.79.98.159:3001/users/deleteuser",
      },
    ];
  },
};

module.exports = nextConfig;
