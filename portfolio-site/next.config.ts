import type { NextConfig } from "next";
const nextConfig: NextConfig = { images: { formats: ["image/avif", "image/webp"], remotePatterns: [{ protocol: "https", hostname: "hxppdwwsfukoavfcsdtu.supabase.co", pathname: "/storage/v1/object/public/IMAGES/**" }] } };
export default nextConfig;