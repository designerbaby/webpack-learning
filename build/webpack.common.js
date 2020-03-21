const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
// const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge')
const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

const commonConfig = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        // use: [{
        //     loader: 'babel-loader'
        // }]
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
        root: path.resolve(__dirname, '../')
    }),
    // new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     _: "loadsh",
    //     _join: ['loadsh', 'join'] // 代表loadsh里面的join方法。
    // })
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
        chunks: 'all',
        cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true
            }
        }
    }
  }
//   output: {
//     filename: '[name].js',
//     chunkFilename: '[name].chunk.js',
//     path: path.resolve(__dirname, '../dist')
//   }
}

module.exports = (env) => {
    if (env && env.production) {
        return merge(commonConfig, prodConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
}