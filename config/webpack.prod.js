const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const Dotenv = require('dotenv-webpack');
const fs = require('fs');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    performance: {
        hints: "warning"
    },

    node: {
        dotenv: 'empty'
    },

    plugins: [
        new Dotenv(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false,
        })
    ]
});
