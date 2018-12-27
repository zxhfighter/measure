/**
 * @file webpack prod config
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackCommonConfig = require('./webpack.common');
const helper = require('./helper');

module.exports = webpackMerge(webpackCommonConfig, {
    mode: 'production',
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
        // remove docs
        new CleanWebpackPlugin([helper.root('docs')], {
            root: helper.root('.')
        }),

        new ExtractTextPlugin('[name].css'),

        new webpack.NormalModuleReplacementPlugin(
            /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
            helper.root('config/empty.js')
        ),

        new AngularCompilerPlugin({
            tsConfigPath: helper.root('src/demo/tsconfig.json'),
            mainPath: helper.root('src/demo/main.ts'),
            sourceMap: true
        })
    ],

    optimization: {
        minimizer: [new UglifyJsPlugin({
            cache: true,
            sourceMap: true,
            parallel: true
        })]
    }
});
