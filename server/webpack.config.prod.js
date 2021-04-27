const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const TerserPlugin = require('terser-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	stats: {
		children: false, // 关闭日志消息
		warnings: false
	},
	optimization: {
		minimizer: [new TerserPlugin({
			terserOptions: {
				compress: {
					warnings: false,
					drop_console: false, //注释掉console
					dead_code: true,
					drop_debugger: true //注释掉debugger
				},
				output: { // 最新的貌似没这属性
					comments: false,
					beautify: false
				},
				mangle: true // 混淆
			},
			parallel: true // 并行化执行
		})],
		splitChunks: { // 视频里配的不太好，仅做示例吧
      cacheGroups: {
        commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 3,
					enforce: true
        }
      }
    }
	},
})

module.exports = webpackConfig;