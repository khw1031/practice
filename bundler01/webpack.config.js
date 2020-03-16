const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
// const CustomPlugin = require("./custom-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/main.js",
  },
  externals: {
    axios: "axios",
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
  devServer: {
    overlay: true,
    hot: true,
    compress: true,
    before: app => {
      app.get("/api/users", (_req, res) => {
        res.json([
          { id: 1, name: "Kim" },
          { id: 2, name: "Lee" },
          { id: 3, name: "Park" },
          { id: 4, name: "Hong" },
          { id: 5, name: "Chang" },
          { id: 6, name: "Ho" },
        ]);
      });
    },
  },
  plugins: [
    // new CustomPlugin(),
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "axios",
          entry: "dist/axios.min.js",
          append: false,
        },
      ],
      // outputPath: "vendor",
    }),
    new webpack.DefinePlugin({}),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js?[hash]",
  },
};
