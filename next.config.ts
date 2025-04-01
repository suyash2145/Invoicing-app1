// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// module.exports = {
//   env: {
//     RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
//     RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
//     STRIPE_API_SECRET: process.env.STRIPE_API_SECRET
//   },
// };

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    STRIPE_API_SECRET: process.env.STRIPE_API_SECRET,
  },
};

export default nextConfig;

