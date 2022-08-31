const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack  = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index:'./src/index.tsx',
        // content:'./src/chromeServices/content.ts',
        background:'./src/chromeServices/background.ts',
    },
    mode: 'production',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    }
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/',
                            publicPath: 'assets/',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
        }),
        new webpack.ProvidePlugin({
            'React':'react',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'manifest.json',
                    to: 'manifest.json',
                }
            ],
        }),
        new CopyPlugin({
            patterns: [ { from: './manifest.json', to: 'manifest.json' },]
        }),
        new CopyPlugin({
            patterns: [ { from: './logo192.png', to: path.join(__dirname,'dist') },]
        }),
        new MiniCssExtractPlugin()
        
    ]
};
