const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve("babel-loader")
            }
          ]
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            {
              loader:
                argv.mode === "development"
                  ? require.resolve("style-loader")
                  : MiniCssExtractPlugin.loader
            },
            {
              loader: require.resolve("css-loader"),
              options: {
                importLoaders: 2
              }
            },
            {
              loader: require.resolve("postcss-loader")
            },
            {
              loader: require.resolve("sass-loader")
            }
          ]
        },
        {
          test: /\.(png|jpeg|jpg)$/i,
          use: [
            {
              loader: require.resolve("url-loader"),
              options: {
                limit: 8192
              }
            },
            {
              loader: require.resolve("img-loader"),
              options: {
                enabled: argv.mode === "production" ? true : false
              }
            }
          ]
        },
        {
          test: /\.(html)$/,
          use: {
            loader: require.resolve("html-loader"),
            options: {
              minimize: argv.mode === "developement" ? false : true
            }
          }
        }
      ]
    },
    devServer: {
      hot: true,
      open: true
    },
    devtool: "cheap-source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
