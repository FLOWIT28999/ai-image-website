import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'picsum.photos',  // 목업 이미지용 도메인
      'api.dicebear.com'  // 아바타 이미지용 도메인
    ],
  },
};

export default nextConfig;
