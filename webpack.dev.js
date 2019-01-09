const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base');

const dev = {
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 8080,
        publicPath: '/',
        overlay: true,
        compress: true,
        open: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        progress: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' }
            }
        }
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
                include: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[name]-[hash:base64:5]',
                ],
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 2,
                    name: 'common',
                },
            },
        },
    },
};

module.exports = merge(base, dev);
