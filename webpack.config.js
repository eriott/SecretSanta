var path = require('path');

module.exports = {
    entry: './client/client.jsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public/javascripts')
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".json", ".jsx", ".es6"]
    }
};