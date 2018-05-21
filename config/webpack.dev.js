/**
 * @file webpack dev config
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common');
const helper = require('./helper');

module.exports = webpackMerge(webpackCommonConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',

    output: {
        library: 'ac_[name]',
        libraryTarget: 'var'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                include: [helper.root('src/asset/less')]
            },

            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { sourceMap: true }},
                    { loader: "less-loader", options: { sourceMap: true }}
                ],
                include: [helper.root('src/asset/less')]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
