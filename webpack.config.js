var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var plugins = [new MiniCssExtractPlugin({
  filename: 'styles.css',
  chunkFilename: '[id].css'
})];

module.exports = {
  entry: ['babel-polyfill', './client/client.jsx'],
  plugins,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1'},
      {
        test: /\.jsx$/,
        exclude: [/node_modules/, /public/],
        loader: 'babel-loader',
        query: {
          presets: ["es2015", 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ["*", ".webpack.js", ".web.js", ".js", ".json", ".jsx", ".es6"]
  }
};