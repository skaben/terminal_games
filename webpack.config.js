const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');

const path = require('path');


module.exports = (_, { mode }) => ({
  entry: './src/router/app.js',

  // not working at all
  resolve: {
    alias: {
      fonts: path.resolve(__dirname, "src/assets/fonts"),
      styles: path.resolve(__dirname, "src/assets/styles"),
      images: path.resolve(__dirname, "src/assets/images"),
      components: path.resolve(__dirname, "src/views/components"),
      pages: path.resolve(__dirname, "src/views/pages")
    },
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'js/bundle.js'
  },

  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        options: {
          presets: [
            "@babel/preset-env"
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime"
          ],
        },
      },
      // images
      {
				test: /\.(png|gif|jpg|svg)$/,
				loader: 'file-loader',
				options: {
					outputPath: "images/",
				},
      },
      // fonts
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader?name=~fonts/[name].[ext]',
            options: {
              outputPath: "fonts/", name: '[name].ttf'
            }
          },
        ],
      },
      // styles
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
    ],
  },

  plugins: [
    new CssUrlRelativePlugin(),
    new HtmlWebpackPlugin({
      title: 'Terminal Konsole',
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
    new CleanWebpackPlugin(),
  ],
  
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9000
  }
});
