const path = require("path")
const nodeExcternals = require("webpack-node-externals")
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpackConfig = {
	target: "node",
	entry: {
		server: path.join(__dirname, "./bin/www")
	},
	output: {
		filename: "[name].bundle.js",
		path: path.join(__dirname, "./dist")
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: "babel-loader"
				},
				exclude: [path.join(__dirname, "/node-modules")]
			}
		]
	},
	externals: [nodeExcternals()],
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: String(process.env.NODE_ENV) // (就算是字符串还是需要)类似于“‘production’”
      }
		})
	],
	node: {
    global: true,
    __filename: true,
    __dirname: true
	}
}
module.exports = webpackConfig;