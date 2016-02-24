module.exports = {
  entry: ['./src/main'],
  output: {
    path: './dist',
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      // make sure to exclude 3rd party code in node_modules
      exclude: /node_modules/
    }, {
      // edit this for additional asset file types
      test: /\.(png|jpg|gif|eot|woff|ttf|svg)$/,
      loader: 'url',
      query: {
        // inline files smaller then 10kb as base64 dataURL
        limit: 10000,
        // fallback to file-loader with this naming scheme
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }]
  },
  // vue-loader config:
  // lint all JavaScript inside *.vue files with ESLint
  // make sure to adjust your .eslintrc
  vue: {
    loaders: {
      js: 'babel'
    }
  },

  externals: {
    'wx': 'window.wx',
    'flexible': 'window.lib'
  },

  // configure babel-loader (for both .js and .vue files).
  // see https://babeljs.io/docs/usage/options/
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  },

  plugins: []
}
