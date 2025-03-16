import type { NextConfig } from "next";

// const withPWA = require("next-pwa")({
//   dest: "public",
// });

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/manifest.json",
  //       headers: [
  //         {
  //           key: "Content-Type",
  //           value: "application/json",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
// module.exports = withPWA(nextConfig);
