const path = require("path")

module.exports = {
  entry: "./client/src/index.js", // Adjust according to your entry point
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      url: require.resolve("url"),
      buffer: require.resolve("buffer/"),
      util: require.resolve("util/"),
      http: require.resolve("stream-http"),
      fs: false, // fs is not available in the browser
      net: false, // net is not available in the browser
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
}
