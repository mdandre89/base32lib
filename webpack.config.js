const path = require('path');

module.exports = {
  entry: {
    "base32": "./lib/index.js",
    "base32.min": "./lib/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin');
        new TerserPlugin({
          include: /\.min\.js$/,
          terserOptions: {
            compress: {
              passes: 2,
            },
          },
        }).apply(compiler);
      },
    ],
  },
};