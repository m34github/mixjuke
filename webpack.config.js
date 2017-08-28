const path = require('path');

module.exports = {
    entry: './src/app.jsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public', 'js')
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js[x]?$/,
                exclude: /node_modules/,
            }
        ]
    }
};
