const webpack = require('webpack');
const glob = require('glob');
const path = require('path');

const testFiles = glob.sync('./src/**/*__tests__*/**/*spec.browser.js')
	.concat(glob.sync('./src/**/*__tests__*/**/*spec.jsx.js'))
	.concat(glob.sync('./src/**/*__tests__*/**/*spec.ssr.js'));

module.exports = {
	watch: true,
	entry: testFiles,
	output: {
		filename: '__spec-build.js'
	},
	// devtool: 'inline-source-map',
	// *optional* babel options: isparta will use it as well as babel-loader
	babel: {
		presets: ['es2015']
	},
	module: {
		loaders: [
			// Perform babel transpiling on all non-source, test files.
			{
				test: /\.[jt]s$/,
				exclude: [
					path.resolve('node_modules/')
				],
				loaders: ['babel-loader', 'ts-loader'],
				cacheDirectory: true
			}
		]
	},
	devServer: {
		contentBase: './',
		port: 8080,
		noInfo: false,
		hot: true,
		inline: true
	
	},
	resolve: {
		extensions: ['', '.js', '.ts']
	},
	plugins: [
		// By default, webpack does `n=>n` compilation with entry files. This concatenates
		// them into a single chunk.
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};