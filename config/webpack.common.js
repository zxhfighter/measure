/**
 * @file webpack common config
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');
const helper = require('./helper');

const isAOT = helper.isAOT();
const isBuild = helper.isBuild();

module.exports = {
    entry: {
        app: isAOT ? [helper.root('src/demo/main-aot.ts')] : [helper.root('src/demo/main.ts')],
        polyfills: helper.root('src/demo/polyfills')
    },

    output: {
        path: helper.root('docs'),
        filename: '[name].[hash:6].js'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [helper.root('src'), helper.root('node_modules')]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ng-router-loader',
                        options: {
                            loader: 'async-import',
                            genDir: 'compiled',
                            aot: isAOT
                        }
                    },
                    {
                        loader: '@ngtools/webpack'
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ],
                exclude: [/\.(spec|e2e)\.ts$/, 'scafford', 'tools', 'src/demo/main-aot.ts']
            },

            {
                test: /\.css$/,
                use: [
                    'to-string-loader',
                    'css-loader'
                ],
                exclude: [helper.root('src/asset/less')]
            },

            {
                test: /\.less$/,
                use: [
                    'to-string-loader',
                    'css-loader',
                    'less-loader'
                ],
                exclude: [helper.root('src/asset/less')]
            },

            {
                test: /\.(htm|html)$/,
                loader: 'html-withimg-loader?min=false'
            },

            {
                test: /\.(htm|html)$/,
                loader: helper.root('tools/docs/docs-loader'),
                include: [helper.root('src/demo')]
            },

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader?limit=10000'
            },

            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader?limit=10000'
            }
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                // 创建一个 commons 块，用于包含所有入口模块共用的代码
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                    priority: 9
                }
            }
        }
    },

    plugins: [
        new CheckerPlugin(),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helper.root('app/src'),
            {}
        ),

        // Fix Angular 2
        new webpack.NormalModuleReplacementPlugin(
            /facade(\\|\/)async/,
            helper.root('node_modules/@angular/core/src/facade/async.js')
        ),
        new webpack.NormalModuleReplacementPlugin(
            /facade(\\|\/)collection/,
            helper.root('node_modules/@angular/core/src/facade/collection.js')
        ),
        new webpack.NormalModuleReplacementPlugin(
            /facade(\\|\/)errors/,
            helper.root('node_modules/@angular/core/src/facade/errors.js')
        ),
        new webpack.NormalModuleReplacementPlugin(
            /facade(\\|\/)lang/,
            helper.root('node_modules/@angular/core/src/facade/lang.js')
        ),
        new webpack.NormalModuleReplacementPlugin(
            /facade(\\|\/)math/,
            helper.root('node_modules/@angular/core/src/facade/math.js')
        ),

        new HtmlWebpackPlugin({
            template: './src/demo/index.html',
            inject: 'body',
            favicon: './src/demo/favicon.png',
            hash: true
        }),

        new webpack.DefinePlugin({
            SERVER_API: JSON.stringify(helper.getBuildConfig().apiPrefix),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),

        new ngcWebpack.NgcWebpackPlugin({
            AOT: isAOT,
            tsConfigPath: isAOT ? helper.root('tsconfig-aot.json') : helper.root('src/demo/tsconfig.json'),
            resourceOverride: helper.root('config/resource-override.js')
        })
    ]
}
