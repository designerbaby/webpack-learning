const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: './src/index.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    // placeholder 占位符
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 10240,
                    mimetype: 'image/png'
                }
            }
        }, {
            test: /\.vue$/,
            use: {
                loader: 'vue-loader'
            }
        }, {
            test: /\.(eot|ttf|svg|otf)$/,
            use: {
                loader: 'file-loader'
            }
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    importLoaders: 2,
                    modules: true
                }
            }, {
                loader: 'sass-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    config: {
                        path: 'postcss.config.js'
                    }
                }
            }]
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
    }), new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
            path.resolve(__dirname, 'dist')
        ]
    })]
}