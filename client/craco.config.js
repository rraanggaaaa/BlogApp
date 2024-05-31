const path = require('path');

module.exports = {
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "timers": require.resolve("timers-browserify")
      };
      return webpackConfig;
    },
  },
};
