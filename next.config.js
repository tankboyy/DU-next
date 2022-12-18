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
        destination: `${process.env.API_URL}:3001/game`,
      },
      {
        source: "/api/logs/all",
        destination: `${process.env.API_URL}:3001/logs/all`,
      },
      {
        source: "/api/users",
        destination: `${process.env.API_URL}:3001/users`,
      },
      {
        source: "/api/game/resG",
        destination: `${process.env.API_URL}:3001/game/resG`,
      },
      {
        source: "/api/game/cancelG",
        destination: `${process.env.API_URL}:3001/game/cancelG`,
      },
      {
        source: "/api/game/boardG",
        destination: `${process.env.API_URL}:3001/game/boardG`,
      },
      {
        source: "/api/logs/today",
        destination: `${process.env.API_URL}:3001/logs/today`,
      },
      {
        source: "/api/logs/addlog",
        destination: `${process.env.API_URL}:3001/logs/addlog`,
      },
      {
        source: "/api/users/idcheck",
        destination: `${process.env.API_URL}:3001/users/idcheck`,
      },
      {
        source: "/api/users/adduser",
        destination: `${process.env.API_URL}:3001/users/adduser`,
      },
      {
        source: "/api/users/updateuser",
        destination: `${process.env.API_URL}:3001/users/updateuser`,
      },
      {
        source: "/api/users/deleteuser",
        destination: `${process.env.API_URL}:3001/users/deleteuser`,
      },
      {
        source: "/api/users/login",
        destination: `${process.env.API_URL}:3001/users/login`,
      },
      {
        source: "/api/profit1",
        destination: `${process.env.API_URL}:3001/api/ss`,
      },
    ];
  },
};

module.exports = nextConfig;
