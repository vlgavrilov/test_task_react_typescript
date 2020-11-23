const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    filename: "./main.js"
  },

  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9001,
    watchContentBase: true,
    progress: true
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },

      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};