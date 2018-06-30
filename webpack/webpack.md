# webpack常用笔记 

### DllPlugin

这个插件是在一个额外的独立的 webpack 设置中创建一个只有 dll 的 bundle(dll-only-bundle)。 这个插件会生成一个名为 manifest.json 的文件，这个文件是用来让 DLLReferencePlugin 映射到相关的依赖上去的。

+ context (optional): manifest 文件中请求的上下文(context)(默认值为 webpack 的上下文(context))

+ name: 暴露出的 DLL 的函数名 (TemplatePaths: [hash] & [name] )

+ path: manifest json 文件的绝对路径 (输出文件)

```
new webpack.DllPlugin(options)
```

### DllReferencePlugin

这个插件是在 webpack 主配置文件中设置的， 这个插件把只有 dll 的 bundle(们)(dll-only-bundle(s)) 引用到需要的预编译的依赖。

+ context: (绝对路径) manifest (或者是内容属性)中请求的上下文
+ manifest (object): 包含 content 和 name 的对象
+ content (optional): 请求到模块 id 的映射 (默认值为 manifest.content)
+ name (optional): dll 暴露的地方的名称 (默认值为 manifest.name) (可参考 externals)
+ scope (optional): dll 中内容的前缀
+ sourceType (optional): dll 是如何暴露的 (libraryTarget)


## 单独打包第三方库

建立一个webpack.dll.js文件用来专门打包第三方库

```
var path = require('path');
var webpack = require('webpack');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: false,
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	entry: {
		/*
		shim: [
			'console-polyfill',
			'es5-shim',
			'es5-shim/es5-sham',
			'html5shiv',
		],*/
		vendor: [
			'antd',
			'codemirror',
			'echarts-for-react',
			'fixed-data-table-2',
			'history',
			'lodash.isequal',
			'mk-rc-select',
			'moment',
			'react',
			'react-codemirror2',
			'react-dom',
			'react-markdown',
			'react-redux',
			'react-resizable',
			'react-viewer',
			'redux',
			'echarts'
		],
	},
	output: {
		path: path.join(__dirname, 'vendor'),
		filename: '[name].dll.js',
		library: '[name]_[chunkhash:8]',
		// library 与 DllPlugin 中的 name 一致
	},
	plugins: [
		//new CleanWebpackPlugin(['vendor']),
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') },
		}),
		new webpack.ContextReplacementPlugin(
			/moment[\\/]locale$/i,
			/^\.\/zh-cn$/i,
		),
		// new webpack.IgnorePlugin(/^\.\/locale$/i, /moment$/i),
		new webpack.DllPlugin({
			context: __dirname,
			name: '[name]_[chunkhash:8]',
			path: path.join(__dirname, 'vendor', '[name].manifest.json'),
		}),
		new ParallelUglifyPlugin({
			cacheDir: '.cache/',
			uglifyJS: {
				output: {
					comments: false
				},
				compress: {
					warnings: false
				}
			}
		}),

	],
};
```

打包后会生成两个文件 vendor.dll.js 和vendor.manifest.json ，其中vendor.manifest.json包含了第三方库和代码的依赖关系。
然后在打包文件的过程中需要引入改文件vendor.manifest.json

```
plugins.push(new webpack.DllReferencePlugin({
    context: __dirname,
    manifest:  require('./vendor/vendor.manifest.json'),
}))
```


## 单独打包css文件

```

var ExtractTextPlugin = require("extract-text-webpack-plugin")

plugins.push(new ExtractTextPlugin('[name].[hash:8].css'))

rules: [{
            test: /\.(css|less)/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }, {
                    loader: "less-loader"
                }]
            })
        }]

```
## HtmlWebpackPlugin


```
plugins.push(new HtmlWebpackPlugin({
    title: 'ttk组件', //标题
    filename: 'index.html', //生成的html存放路径，相对于 path
    template: 'index.html', //html模板路径
    hash: false,
    inject: 'body', //允许插件修改哪些内容，包括head与body`
    minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true, //删除空白符与换行符
        removeAttributeQuotes: true
    }
}))
```

## CommonsChunkPlugin 打包公共模块

```
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['ttk-component'],
    filename: 'ttk-component.min.js',
    minChunks: Infinity
}))
```
