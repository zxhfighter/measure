/**
 * @file webpack prod config
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

// const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const helper = require('./helper');

module.exports = webpackMerge(webpackCommonConfig, {

    devtool: 'source-map',

    output: {
        filename: '[name].[chunkhash:6].bundle.js',
        sourceMapFilename: '[name].[chunkhash:6].bundle.map',
        chunkFilename: '[id].[chunkhash:6].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
                include: [helper.root('src/asset/less')]
            },

            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                }),
                include: [helper.root('src/asset/less')]
            }
        ]
    },

    plugins: [
        new UglifyJsPlugin({
            beautify: false,
            output: {
              comments: false
            },
            mangle: {
              screw_ie8: true
            },
            compress: {
              screw_ie8: true,
              warnings: false,
              conditionals: true,
              unused: true,
              comparisons: true,
              sequences: true,
              dead_code: true,
              evaluate: true,
              if_return: true,
              join_vars: true,
              negate_iife: false
            }
        }),

        new ExtractTextPlugin('[name].[contenthash:6].css'),

        new NormalModuleReplacementPlugin(
            /angular2-hmr/,
            helper.root('config/empty.js')
        ),

        new NormalModuleReplacementPlugin(
            /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
            helper.root('config/empty.js')
        )
    ]
});
