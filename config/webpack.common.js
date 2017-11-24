/**
 * @file webpack common config
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
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
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: isAOT
                                ? helper.root('tsconfig-aot.json')
                                : helper.root('src/demo/tsconfig.json')
                        }
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
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader?limit=10000'
            },

            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader?limit=10000'
            }
        ]
    },

    plugins: [
        new CheckerPlugin(),

        new CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
        }),

        new CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['app'],
            minChunks: module => /node_modules/.test(module.resource)
        }),

        new CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),

        new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helper.root('app/src'),
            {}
        ),

        // Fix Angular 2
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)async/,
            helper.root('node_modules/@angular/core/src/facade/async.js')
        ),
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)collection/,
            helper.root('node_modules/@angular/core/src/facade/collection.js')
        ),
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)errors/,
            helper.root('node_modules/@angular/core/src/facade/errors.js')
        ),
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)lang/,
            helper.root('node_modules/@angular/core/src/facade/lang.js')
        ),
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)math/,
            helper.root('node_modules/@angular/core/src/facade/math.js')
        ),

        new HtmlWebpackPlugin({
            template: './src/demo/index.html',
            inject: 'body',
            favicon: './src/demo/favicon.png',
            hash: true
        }),

        new LoaderOptionsPlugin({}),

        new DefinePlugin({
            SERVER_API: JSON.stringify(helper.getBuildConfig().apiPrefix),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),

        new ngcWebpack.NgcWebpackPlugin({
            disabled: !isAOT,
            tsConfig: isAOT ? helper.root('tsconfig-aot.json') : helper.root('src/demo/tsconfig.json'),
            resourceOverride: helper.root('config/resource-override.js')
        })
    ]
}
