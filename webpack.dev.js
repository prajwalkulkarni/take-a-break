const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development", // set mode option, 'development' or 'production'
  devtool: "source-map", // enable source maps
  devServer: {
    static: "./dist", // serve content from the dist directory
  },
});
