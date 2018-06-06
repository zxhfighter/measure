/**
 * @file webpack common config
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helper = require('./helper');

const e2eAppRoot = 'src/e2e-demo';

module.exports = {
    entry: {
        polyfills: helper.root(e2eAppRoot + '/polyfills'),
        app: [helper.root(e2eAppRoot + '/main.ts')]
    },

    output: {
        path: helper.root('dist/e2e'),
        filename: '[name].[hash:6].js'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [helper.root('src'), helper.root('node_modules')]
    },

    module: {
        rules: [
            {
                // (?:x) 非捕获括号，匹配 x 但是不记住匹配项
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack',
                exclude: [/\.(spec|e2e)\.ts$/, 'scafford', 'tools']
            },
            {
                // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                // Removing this will cause deprecation warnings to appear.
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: { system: true }
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
            chunks: 'all',
            cacheGroups: {
                polyfills: {
                    name: 'polyfills',
                    priority: -10,
                    chunks: chunk => ['polyfills'].includes(chunk.name),
                    test (module) {
                        const polyfillsIndexes = [
                            'core-js', 'zone.js', 'prismjs', 'hammerjs'
                        ];

                        if (module.resource) {
                            return polyfillsIndexes.some(v => module.resource.indexOf(`/node_modules/${v}/'`) > 0);
                        }
                        return false;
                    }
                },

                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -20
                }
            }
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/e2e-demo/index.html',
            inject: 'body',
            favicon: './src/e2e-demo/favicon.png',
            hash: true
        }),

        new webpack.DefinePlugin({
            SERVER_API: JSON.stringify(helper.getBuildConfig().apiPrefix),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
}
