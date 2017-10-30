var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    devtool: 'eval',
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    resolve: {
        alias: {
            'jquery.easing': path.resolve(__dirname, 'node_modules/jquery.easing/jquery.easing.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.sass$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'file-loader?name=img/[name].[ext]'
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'url-loader?limit=100000',
                    options: {
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            Util: 'exports-loader?Util!bootstrap/js/dist/util',
            Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/util'
        }),
        new CopyWebpackPlugin([
            { from: 'static/**/*', to: './' },
            { context: './public', from: '**/*', to: './' }
        ]),
        new BrowserSyncPlugin({
            server: {
                baseDir: ['dist']
            },
            port: 3000,
            host: 'localhost',
            open: false
        }),
    ]
}
