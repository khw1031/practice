const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/app.tsx",
  },
  devtool: "eval-cheap-source-map",
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: ["ts-loader"] }],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
};
