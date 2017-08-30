var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var os = require('os');

var config = {
    entry: path.resolve(__dirname, 'index.js'),
    externals: {
        "react": "React",
        "antd": "antd",
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter"
    },
    output: {
        path: path.resolve(__dirname, 'Dist'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: [
                    'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader?sourceMap"]
            },
            {
                test: /\.less$/,
                loaders: ["style-loader", "css-loader?sourceMap", "less-loader?sourceMap"]
            },
            {
                test: /\.scss/,
                loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=10000&name=/images/[name].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(woff|woff2|otf|eot|ttf|svg)(\?.*$|$)/,
                loader: 'url-loader?name=[name].[ext]'
            },
            {
                test: /\.yml$/,
                loader: 'yamljs',
            },
        ]
    },

    //别名，例如：require('elements/logo/component')//等价于public/js/elements/logo/component
    resolve: {
        alias: {
            'Component': __dirname + '/components',
            'Action': __dirname + '/actions',
            'Store': __dirname + '/stores',
            'Sass': __dirname + '/sass',
            'Images': __dirname + '/images/index.js',
            'Modules': __dirname + '/modules'
        },
        //后缀自动补全功能
        extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less', '.png', '.jpg']
    },
    //单独打包 css 到 style.css 样式文件里面 (* 异步加载的模块内用到的css不会独立 *)
    plugins: [
        // new HappyPack({threads: 6, id: 'js'}),
        // ExtractTextPlugin("main.css"),
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
        new webpack.HotModuleReplacementPlugin(),
        // removes a lot of debugging code in React
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            // favicon: './favicon.ico',
            favicon: path.resolve(__dirname, 'favicon.ico'),
            title: 'ICRM',
            cache: true,
            // filename: 'index.html',
            template: './index.html',
            inject: true,
            hash: false,
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeRedundantAttributes: true,
            //     removeScriptTypeAttributes: true,
            //     removeStyleLinkTypeAttributes: true
            // }
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};


module.exports = config;
