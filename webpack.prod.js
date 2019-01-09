const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.base');

const prod = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        }
                    }
                ],
                include: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        }
                    }
                ],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new WebpackParallelUglifyPlugin(
            {
                uglifyJS: {
                    mangle: false,
                    output: {
                        beautify: false,
                        comments: false,
                    },
                    compress: {
                        warnings: false,
                        drop_console: false,
                        collapse_vars: true,
                        reduce_vars: true,
                    },
                },
            },
        ),
        
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),

        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /index\.[0-9a-zA-Z]+\.css/g,  //注意不要写成 /\.css$/g
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                parser: require('postcss-safe-parser'),
                autoprefixer: false
            },
            canPrint: true
        }),

        new CleanWebpackPlugin(
            // 需要删除的文件夹或文件
            [path.join(__dirname, './dist/*.*')],
            {
                // root目录
                root: path.join(__dirname, './'),
            },
        ),
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, './dist/dll', 'ui.manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, './dist/dll', 'vendor.manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, './dist/dll', 'editor.manifest.json'),
        }),
        new BundleAnalyzerPlugin(),
    ],
};

module.exports = merge(base, prod);
