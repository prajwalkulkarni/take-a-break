const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    content: "./scripts/content.ts", // content script
    logicHandler: "./scripts/logicHandler.ts", // logic handler
  }, // entry point
  output: {
    path: path.join(__dirname, "/dist"), // output directory
    filename: "[name].js", // name of the generated bundle
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // look for .js files
        exclude: /node_modules/, // ignore node_modules
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/, // look for .css files
        use: [MiniCssExtractPlugin.loader, "css-loader"], // use style-loader and css-loader
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
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
      filename: "popup.css", // name of the generated css file
    }),
  ],
};
