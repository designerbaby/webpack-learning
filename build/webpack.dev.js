const path = require('path');
const webpack = require('webpack')

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        usedExports: true
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js'
    }
}

module.exports = devConfig