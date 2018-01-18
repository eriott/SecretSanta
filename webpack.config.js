var path = require('path');

module.exports = {
    entry: './client/client.es6',
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
    }
};