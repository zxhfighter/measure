/**
 * @file webpack common config
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

const helper = require('./helper');
const isAOT = helper.isAOT();

module.exports = {
    entry: {
        polyfills: helper.root('src/demo/polyfills'),
        app: isAOT ? [helper.root('src/demo/main-aot.ts')] : [helper.root('src/demo/main.ts')]
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
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                use: [
                    {
                        loader: 'ng-router-loader',
                        options: {
                            loader: 'async-import',
                            genDir: 'compiled',
                            aot: isAOT
                        }
                    },
                    '@ngtools/webpack',
                    'angular2-template-loader'
                ],
                exclude: [/\.(spec|e2e)\.ts$/, 'scafford', 'tools', 'src/demo/main-aot.ts']
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
            chunks: 'initial',
            cacheGroups: {
                default: false,
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10
                },
                // polyfills: {
                //     name: 'polyfills',
                //     test(module, chunks) {
                //         console.log(module, chunks);
                //         return true;
                //     }
                // }
            }
        }
    },

    plugins: [
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

        new AngularCompilerPlugin({
            tsConfigPath: helper.root('src/demo/tsconfig.json'),
            mainPath: helper.root('src/demo/main.ts'),
            sourceMap: true
        })
    ]
}
