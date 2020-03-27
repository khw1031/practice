const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/app.ts",
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: ["ts-loader"] }],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
};
