// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tells Vercel to leave these packages alone during bundling
  serverExternalPackages: ["pdf-parse", "@napi-rs/canvas"],
};

export default nextConfig;

