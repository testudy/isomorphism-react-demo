var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    resolve: {
        alias: {
        }
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, 'static/js'),
                path.resolve(__dirname, 'common')
            ],
            exclude: /node_modules/,
            loaders: [
                'babel-loader',
                'eslint'
            ]
        }, {
            test: /\.sass$/,
            include: [
                path.resolve(__dirname, 'static/sass'),
            ],
            loaders: [
                'style',
                'css',
                'parker?filename=./parker-reports/[name].md',
                'csslint?failWarning=false&failOnError=false',
                'postcss-loader',
                'less'
            ]
        }, {
            test: /\.(png|jpg)$/,
            include: [
                path.resolve(__dirname, 'static/img'),
            ],
            loaders: [
                'url?limit=1000'
            ]
        }]
    },
    entry: {
        frontend: ['./static/js/frontend.js'],
        backend: ['./static/js/backend.js'],
        vendors: ['babel-polyfill', 'react', 'react-dom', 'redux', 'react-redux', 'keymirror', 'classnames']
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].js',
        publicPath: "/"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', '[name].js')
    ],
    postcss: function () {
        return [autoprefixer({browsers: ['Android >= 4', 'iOS >= 7', 'last 2 ChromeAndroid versions']})];
    },
    csslint: {
        failWarning: false,
        failOnError: false
    }
};
