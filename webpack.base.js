const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, './src/main.js'),
        // vendor: ['react', 'react-dom', 'react-router-dom'],
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.join(__dirname, './dist'),
        publicPath: './',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            components: path.resolve(__dirname, './src/components/'),
            assets: path.resolve(__dirname, './src/assets/'),
        },
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                query: {
                    presets: ['env', 'react', 'stage-0'],
                    plugins: [
                        ['import', {
                            libraryName: 'antd',
                            libraryDirectory: 'es',
                            style: 'css',
                        }],
                        'transform-class-properties',
                        'transform-runtime',
                    ],
                },
                exclude: /node_modules/,
            }, {
                test: /\.(png|jpg|gif|ttf|eot)$/,
                loader: 'url-loader',
                options: {
                    limit: '5000',
                    name: 'images/[name]_[hash:7].[ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/templet.html',
            filename: 'index.html',
            title: 'index',
            hash: true,
            minify: {
                removeAttributeQuotes: true,
            },
        }),
    ],
};
