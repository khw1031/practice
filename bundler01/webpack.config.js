const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CustomPlugin = require("./custom-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.js",
    // print: "./src/print.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new CustomPlugin(),
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({}),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js?[hash]",
  },
};
