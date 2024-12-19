const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
    static: "./dist",
    port: 3000,
    open: true, // Automatically opens the browser
    hot: true, // Enable hot module replacement
  },
});
