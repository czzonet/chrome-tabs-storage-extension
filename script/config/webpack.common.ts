import { Configuration } from "webpack";
import { projectName, projectRoot, resolvePath } from "../env";
import webpackBar from "webpackbar";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import webpackBuildNotifier from "webpack-build-notifier";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

export const commonConfig: Configuration = {
  context: projectRoot,
  entry: resolvePath(projectRoot, "./src/index.tsx"),
  output: {
    // publicPath: "/",
    path: resolvePath(projectRoot, "./dist"),
    filename: "js/[name]-[fullhash].bundle.js",
    hashSalt: projectName,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: "babel-loader",
        options: {},
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: false,
              sourceMap: true,
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: "sass-loader",
            options: {
              // 中间每个 loader 都要开启 sourcemap，才能生成正确的 soucemap
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpackBar({
      name: "react-template",
      color: "#61dafb",
    }),
    new FriendlyErrorsWebpackPlugin({}),
    new webpackBuildNotifier(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolvePath(projectRoot, "./public/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          context: resolvePath(projectRoot, "./public"),
          from: "*",
          to: resolvePath(projectRoot, "./dist"),
          filter: (resourcePath) =>
            resourcePath != resolvePath(projectRoot, "./public/index.html"),
        },
        {
          context: resolvePath(projectRoot, "./"),
          from: resolvePath(projectRoot, "./assets"),
          to: resolvePath(projectRoot, "./dist/assets"),
        },
        {
          context: resolvePath(projectRoot, "./"),
          from: resolvePath(projectRoot, "./manifest.json"),
          to: resolvePath(projectRoot, "./dist"),
        },
      ],
    }),
  ],
};
