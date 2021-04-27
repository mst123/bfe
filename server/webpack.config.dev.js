const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const webpackConfig = merge(baseWebpackConfig, {
	mode: 'development',
	devtool: "eval-source-map",
	stats: {
		children: false // 关闭日志消息
	}
})
module.exports = webpackConfig;
