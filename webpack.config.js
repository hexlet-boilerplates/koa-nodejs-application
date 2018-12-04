const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const common = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  stats: {
    warnings: false,
    children: false,
    modules: false,
  },
};


if (process.env.NODE_ENV === 'production') {
  module.exports = merge(common, {
    mode: 'production',
  });
} else {
  module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
  });
}
