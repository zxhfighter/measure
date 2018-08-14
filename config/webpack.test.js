/**
 * @file webpack test config
 * @author wanlingfeng
 */

const webpack = require('webpack');
const helper = require('./helper');

module.exports = function () {
    return {
        devtool: 'inline-source-map',

        resolve: {
            extensions: ['.ts', '.js'],
            modules: [helper.root('src'), 'node_modules']
        },

        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    use: 'source-map-loader',
                    exclude: [
                        helper.root('node_modules/rxjs'),
                        helper.root('node_modules/@angular')
                    ]
                },

                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'awesome-typescript-loader',
                            query: {
                                sourceMap: false,
                                inlineSourceMap: true,
                                compilerOptions: {
                                    removeComments: true
                                }
                            },
                        },
                        'angular2-template-loader'
                    ],
                    exclude: [/\.e2e\.ts$/]
                },

                {
                    test: /\.css$/,
                    use: [
                        'to-string-loader',
                        'style-loader',
                        'css-loader'
                    ],
                    include: [helper.root('src/asset/less')]
                },

                {
                    test: /\.less/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ],
                    include: [helper.root('src/asset/less')]
                },

                {
                    test: /\.html$/,
                    use: 'raw-loader',
                    exclude: [helper.root('src/index.html')]
                },

                {
                    enforce: 'post',
                    test: /\.(js|ts)$/,
                    use: 'istanbul-instrumenter-loader',
                    include: helper.root('src'),
                    exclude: [
                        /\.(e2e|spec)\.ts$/,
                        /node_modules/
                    ]
                }

            ]
        },

        plugins: [
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)@angular/,
                helper.root('src'),
                {}
            )
        ]
    };
};
