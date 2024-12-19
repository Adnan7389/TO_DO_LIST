const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map", // Add source maps for debugging
  output: {
    filename: "main.[contenthash].js", // Cache busting for JS
    clean: true, // Clean the output directory before each build
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Extract CSS into files
      },

    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // Cache busting for CSS
    }),

    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // Minify JavaScript
      new CssMinimizerPlugin(), // Minify CSS
    ],
    splitChunks: {
      chunks: "all", // Optimize shared modules
    },
  },
});
