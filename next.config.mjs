/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_NAME: process.env.FIREBASE_PROJECT_NAME,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    RAPID_API_KEY: process.env.RAPID_API_KEY,
    RAPID_API_HOST: process.env.RAPID_API_HOST,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    STREAM_API_CALLKEY: process.env.STREAM_API_CALLKEY,
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
    ANDROID_RAPID_API_KEY: process.env.ANDROID_RAPID_API_KEY,
    PAYMONGO_SECRET_KEY: process.env.PAYMONGO_SECRET_KEY,
    PAYMONGO_PUBLIC_KEY: process.env.PAYMONGO_PUBLIC_KEY,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    GMAP_GEOCODING_KEY: process.env.GMAP_GEOCODING_KEY,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "csassets.nintendo.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
