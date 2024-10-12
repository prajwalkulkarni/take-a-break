const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    content: "./scripts/content.js", // content script
    background: "./scripts/background.js", // background script
    middleware: "./scripts/middleware.js", // logic handler
  }, // entry point
  output: {
    path: path.join(__dirname, "/dist"), // output directory
    filename: "[name].js", // name of the generated bundle
  },
  resolve: {
    extensions: [".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.js$/, // look for .js files
        exclude: /node_modules/, // ignore node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /popup.css$/, // look for .css files
        use: [MiniCssExtractPlugin.loader, "css-loader"], // use style-loader and css-loader
      },
      {
        test: /content.css$/, // look for .css files
        use: ["style-loader", "css-loader"], // use style-loader and css-loader
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./popup/popup.html", // path to the html file
      filename: "popup.html", // name of the generated html file
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css", // name of the generated bundle
    }),
  ],
};
