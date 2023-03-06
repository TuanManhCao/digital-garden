module.exports = {
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      buffer: false
    };
    return config;
  },
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/README",
        permanent: true
      }
    ]
  }
};
