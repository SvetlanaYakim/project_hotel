const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')


module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].js',
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/pug/pages/_index.pug'), // pattern
            filename: 'index.html', // name outputs file
        }),
        new HtmlWebpackPugPlugin(),

        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets/img', to: 'assets/img' },
                { from: 'src/assets/fonts', to: 'assets/fonts' }
            ],
        }), // Copy images
    ],
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // fonts and SVG
            {
                test: /\.(woff(2)?|ttf|svg|eot)$/,
                type: 'asset/inline',
            },
            // styles
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            // pug
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    "pretty":true
                }
            },
        ],
    },
    mode: process.env.NODE_ENV || 'development'
}