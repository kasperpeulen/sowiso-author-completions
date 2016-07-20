module.exports = {
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: 'dist',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {test: /\.jsx$|\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
