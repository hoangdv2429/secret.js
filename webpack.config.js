const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");

module.exports = {
  entry: {
    "browser": path.resolve(__dirname, "src", "index.ts"),
    "light/light": path.resolve(__dirname, "src", "light.ts")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin({
      excludeAliases: ["stream"]
    }),
    new BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/wordlists\/(?!english)/,
      contextRegExp: /bip39\/src$/,
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },

  mode: "production",
  devtool: false,
  output: {
    library: "secretjs",
    libraryTarget: "umd",
    globalObject: "this",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
};
