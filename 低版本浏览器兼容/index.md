# **兼容IE8的技术总结**



## 第一步(降级)

- react降级v0.14.x
- antd降级到v1.1.x
- webpack降级到v1.x（webpack2是不支持IE8的）
- babel-loader降级v6.x
` ==webpack 1.x 对应 babel-loader <= 6.x`
- 

## 第二步(框架兼容)
- es5-shim(提供了其他的一些 ES5 语法的支持)，
- es6-promise(IE8 下没有 Promise，使用 es6-promise)
- console-polyfill(React 中使用了 console.*导致浏览器不兼容)，
- es3ify-loader（兼容es3语法的polyfill）
- fetch-ie8（IE8下的json解析问题）
- babel-polyfill（解决缺失API问题）



```
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'console-polyfill';
import 'babel-polyfill';
import 'fetch-ie8'

...


Object.assign = require('object-assign');
require('es6-promise').polyfill();
```


## 第三步（踩坑）

1. 使用webpack -d来构建开发版本。报错：
```SCRIPT1028: 缺少标识符、字符串或数字```
报错的代码如下：


```
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

这是由于default在IE8（ES3）中是保留字，不能直接出现在代码中。像上面这种代码，应该这么写才能在IE8上正确运行：

```
return obj && obj.__esModule ? obj : { 'default': obj };
```

解决方案：es3ify-loader，这个loader会帮我们把代码里面ES3的保留字、关键字使用字符串的形式引用，这样在IE8上面就不会报错了。构建后在IE8上运行正常。

2. 使用webpack -p来构建正式环境。报错如五：
```
SCRIPT1028: 缺少标识符、字符串或数字
function r(e){return e&&e.__esModule?e:{default:e}};
```
发现default的引号又丢失了（default在es3下是保留字）.

``` 
webpack -p的含义是(--optimize-minimize --optimize-occurrence-order) 
后面是选项是优化模块的Id，减小文件体积，跟我们的问题关系不大。主要是第一个选项：
--optimize-minimize resp. new webpack.optimize.UglifyJsPlugin()
这个选项相当于使用了UglifyJs来压缩源码。使用-p，意味着使用默认的参数来进行压缩、混淆。默认选项中：
output: {
  keep_quoted_props: false, // 是否保留对象字面量中的引号。
}
这个选项是false，所以default的引号自然就被去掉了。因此，如果我们需要保留这个引号，需要自己编写webpack.config.js中的plugins配置，不能使用-p来构建：
```
```
// webpack.base.config.js
module.exports = {
  ...
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        keep_quited_props: true
      }
    })
  ]
}
```
这样构建出来的代码，对象字面量的引号就不会被省略了。

3.构建提示：SCRIPT5022: 引发了异常但未捕获

```
if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
```

调试发现：t是[object(d)]，n是function d() {...}，t.constructor是function d() {...}，打印出来的东西跟n一模一样，但是！t.constructor == n竟然是false！导致t instanceof n也是false

在没有混淆的版本上打断点调试：

```
if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
```

在IE8+以及Chrome等现代浏览器，结果都是true。但是在IE8下面，就是false，因为IE8 中对命名函数表达式的实现不标准，函数内部不能访问命名函数的名称，导致instanceof失效抛出异常。而没混淆的版本保留了一致的名称，instanceof的结果为true。

解决方法：
1. 禁用混淆(webpackConfig.UglifyJsPluginConfig.mangle = false)不推荐
2. 应该编写一个webpack的插件，判断是否出现这种情况，如果出现了使用一个一致的名称来替代这个函数表达式和函数声明。幸运的是，只要在class中编写一个方法：

```
class A {
  constructor() {}
  foo() {}
}

```
  出来的代码就会变成（混淆后）：

```

var u = function() {
  function t() {
    i(this, t), console.log("initialize an XXX instance, new"), console.log("now is", (0, 
    o["default"])());
  }
  return t.prototype.foo = function() {
    console.log("foo");
  }, t;
}()

```

经过Babel出来的代码没有使用函数表达式和函数声明的混合写法，只使用了函数声明，顺利通过instanceof检测。把beautify和comments去掉，最后构建成功。

4.JSON is not undefined的问题

```
需要使用IE Standards Mode 

```

5.如果你用到了一些 HTML5 的标签，比如 <section>, <article>, <nav>, <header>, <footer> 等，那么需要引入 HTML5 shiv


```
<!--[if lt IE 9]>
  <script src=".../dist/html5shiv.js"></script>
<![endif]-->
```
6.Promise undefined
IE8 下没有 Promise，使用 es6-promise即可。


## 第四步（细节优化）

- IE低版本关于文件上传弹出下载的问题
- 

```
IE10以下(IE8、IE9)，蚂蚁金服的Upload组件上传文件失败

具体原因：蚂蚁金服的Upload组件上传文件时，无法通过Header向后端传送token
解决方案：IE8下通过URL传送token解决问题

后端接收token优先顺序：先从header中获取，然后再从form中获取，然后再从URL中获取
```

- 组件降级后功能丢失，需要基于老版本的组件扩展功能（现在使用antd@3,降级为antd@1后，需要补充组件功能）
- 样式问题，flex布局失效,需要改成position替换
- IE8不存在的事件处理函数
- 



## 第五步（效率优化）

优化TTK框架


## 第六步（打包问题）
- 封装兼容ES3的打包插件etools-build（https://github.com/thethreekingdoms/etool-build）

- 


## 包依赖相关

- 本次兼容IE8使用的依赖库版本如下


```
"devDependencies": {
  "babel-core": "^6.21.0",
  "babel-loader": "^6.2.10",
  "babel-polyfill": "^6.20.0",
  "babel-preset-es2015": "^6.18.0",
  "babel-preset-es2015-loose": "^8.0.0",
  "css-loader": "^0.26.1",
  "es3ify-loader": "^0.2.0",
  "html-webpack-plugin": "^2.26.0",
  "style-loader": "^0.13.1",
  "url-loader": "^0.5.7",
  "webpack": "^1.14.0",
  "webpack-merge": "^2.4.0"
}

```

## 后续推进：

1. IE8下的调试难用到极点。
2. 遇到最多的问题就是打包后，出现很多的兼容问题，导致难分析，后续完善etool-build来解决js错误提示不明显，错误定位难等问题。
3. 解决低版本兼容的插件不打包到非IE环境中。
4.考虑通用样式的兼容办法。


## 相关参考资料

- https://www.cnblogs.com/godghdai/p/7659033.html
- https://segmentfault.com/a/1190000005794242
- https://github.com/coder-Yin/react-redux-ie8
- https://github.com/zhoulijie/react-redux-support-ie8
- ...

## 吐槽react兼容IE8


