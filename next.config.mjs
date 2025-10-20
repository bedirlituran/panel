// next.config.mjs
const nextConfig = {
  output: 'export', // ✅ bu "out" qovluğunu yaradır
  images: {
    unoptimized: true, // lazımdır, çünki export zamanı image optimization işləmir
  },
};

export default nextConfig;
