const path = require('path');

const mode = process.env.NODE_ENV || "development";

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = mode === "development"

const target = devMode ? "web" : "browserslist";

const devtool = devMode ? "source-map" : undefined;

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        port: 3000,
        open:true,
        hot:true,
    },
    entry: ["@babel/polyfill", path.resolve(__dirname, 'src', 'index.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: "index.[contenthash].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html")
    }),
        new MiniCssExtractPlugin({
            filename: "index.[contenthash].css"
        }),
    ],
    module: {
        rules: [
            {
            test: /\.html$/i,
            loader: "html-loader",
        },
            {
            test: /\.(sa|sc|c)ss$/i,
            use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [require("postcss-preset-env")],
                }
            }},
            "sass-loader",
        ],
          },
          {
            test: /\.(woff|eot|ttf|otf)$/i,
            type: "asset/resource",
            generator: {
                filename: "fonts/[name][ext]"
            }
          },
          {
            test: /\.mp3$/i,
            type: "asset/resource",
            generator: {
                filename: "sounds/[name][ext]"
            }
          },
          {
            test: /\.(jpe?g|svg|ico|png)$/i,
            type: "asset/resource",
            generator: {
                filename: "img/[name][ext]"
            },
            use: [{
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                      progressive: true,
                    },
                    // optipng.enabled: false will disable optipng
                    optipng: {
                      enabled: false,
                    },
                    pngquant: {
                      quality: [0.65, 0.90],
                      speed: 4
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    // the webp option will enable WEBP
                    webp: {
                      quality: 75
                    }
                  }
            }]
          },
          {
            test: /\.json$/i,
            type: "asset/resource",
            generator: {
                filename: "data/[name][ext]"
            }
          },
          {
            test: /\.m?js$/i,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          },
        ]
    }
}