const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack')

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
        hot: true,
        hotOnly: true
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
            // options: {
            //     // presets: [['@babel/preset-env', {
            //     //     targets: {
            //     //         chrome: '67'
            //     //     },
            //     //     useBuiltIns: 'usage'
            //     // }]]
            //     plugins: [['@babel/plugin-transform-runtime', {
            //         'corejs': 2,
            //         'helpers': true,
            //         'regenerator': true,
            //         'useESModules': false
            //     }]]
            // }
        }, {
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
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                'scss-loader',
                'postcss-loader'
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, 'dist')
            ]
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}