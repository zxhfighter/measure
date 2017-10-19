/**
 * @file webpack dev config
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common');
const helper = require('./helper');

module.exports = webpackMerge(webpackCommonConfig, {
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
                include: [helper.root('app/src/asset/css')]
            },

            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
                include: [helper.root('app/src/asset/css')]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
