const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

module.exports = {

    entry: {
        index: './src/index.tsx',
        content: './src/chromeServices/content.ts',
    },
    mode: 'production',
    output:{
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/static/',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
                
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        new CopyPlugin({
            patterns: [ { from: './public/manifest.json', to: 'manifest.json' },]
        }),
        new CopyPlugin({
            patterns: [ { from: './public/logo192.png', to: path.join(__dirname,'dist') },]
        }),
        new webpack.ProvidePlugin({
            'React':'react',
        })
     
    ],
   
    resolve:{
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
       
    },

    externals:{
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom":{
            commonjs:"react-dom",
            commonjs2:"react-dom",
            amd:"ReactDOM",
            root:"ReactDOM"
        }
    }
}