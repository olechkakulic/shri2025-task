const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");

module.exports = {
  // для генерации сжатых файлов достаточно production
  mode: "production",

  // не бандлим код, просто копируем файлы «как есть»
  entry: {},

  output: {
    path: path.resolve(__dirname, "dist"),
    // по сути не используется, т.к. нет JS-бандлов
    filename: "[name].js",
    publicPath: "/",
  },
  devServer: {
    static: { directory: path.resolve(__dirname, "dist") },
    compress: true,
    port: 5500,
    historyApiFallback: true,
  },
  plugins: [
    // очищает dist
    new CleanWebpackPlugin(),

    // копируем все нужные статики
    new CopyPlugin({
      patterns: [
        { from: "index.html", to: "index.html" },
        { from: "reset.css", to: "reset.css" },
        { from: "fonts.css", to: "fonts.css" },
        { from: "styles.css", to: "styles.css" },
        { from: "vendors", to: "vendors" },
        { from: "assets", to: "assets" },
      ],
    }),

    // создаём gzip-версии
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg|json)$/,
      threshold: 0,
      minRatio: 0.8,
      compressionOptions: { level: 9 }, // Максимальное сжатие
      deleteOriginalAssets: false, // Не удалять оригиналы
    }),
    // создаём brotli-версии
    new BrotliPlugin({
      test: /\.(js|css|html|svg|json)$/,
      threshold: 0,
      minRatio: 0.8,
      quality: 11, // Максимальное качество Brotli
    }),
  ],
};
