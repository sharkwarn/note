# express 学习笔记(文档方面)


## 一、 基础应用

### 1、引入express

  ```
    var express = require ('express');
    var app = express();
    
  ```

  ### 2、静态服务

express.static 是express中唯一的内建中间件，是以server-static模块为基础开发，负责express应用内的静态资源。

参数root为静态资源的所在的根目录。


```
  express.static(root, [options])
```

## Application()

app对象一般用来表示Express程序。通过调用Express模块导出顶层的express()方法来常见：

```
  var express = require('express');
  var app = express();
  app.get('/',function(req,res){
    res.send('hello world);
  })

  app.listen(3000);
```

app对象具有一下的方法：

  + 路由HTTP 请求，
  + 配置中间件，
  + 渲染HTML视图；
  + 注册模板引擎，

### Properties（相关属性）

#### app.locals 

app.locals 对象是一个javascript对象，他的属性就是程序本地的变量。

```
  app.locals.title
  // => 'My App'
  
  app.locals.email
  // => 'me@qq.com'
```

一旦设定，app.locals的个属性值将贯穿程序的整个生命周期，与其相反的是res.locals，他只是在这次请求的生命周期中有效。

在程序中，你可以渲染模板的时候，使用这些本地变量。他们是非常有用的，可以为模板提供一些有用的方法，以及app级别的数据。通过rea.app.locals。Locals可以在中间见中使用。

```
app.locals.title = 'My App';
app.locals.strftime = require('strftime');
app.locals.email = 'me@myapp.com';
```

#### app.mountpath 

app.mountpath 属性是子程序挂载的路径模式。

+ 一个子程序是express的示例，其可以被用来作为路由句柄来处理请求。

```
  var express = require('express');
  var app = express(); // the main app
  var admin = express(); // the sub app
  admin.get('/', function(req, res) {
      console.log(admin.mountpath); // /admin
      res.send('Admin Homepage');
  });
  app.use('/admin', admin); // mount the sub app
```

它和req对象的baseUrl属性比较相似，除了req.baseUrl是匹配的URL路径，而不是匹配的模式。如果一个子程序被挂载在多条路径模式，app.mountpath就是一个关于挂载路径模式项的列表，如下面例子所示。

```
  var admin = express();
  admin.get('/', function(req, res) {
      console.log(admin.mountpath); // ['adm*n', '/manager'] 
      res.send('Admin Homepage');
  });
  var secret = express();
  secret.get('/', function(req, res) {
      console.log(secret.mountpath); // /secr*t
      res.send('Admin secret');
  });
  admin.use('/secr*t', secret); // load the 'secret' router on '/secr*t', on the 'admin' sub app
  app.use(['/adm*n', '/manager'], admin); // load the 'admin' router on '/adm*n' and  '/manager' , on the parent app
```

#### Event

app.on('mount',callBack(parent));

当子程序被挂载到父程序时，mount事件被发射。父程序对象作为参数，传递给回调方法。

```
  var admin = express();
  admin.on('mount', function(parent) {
      console.log('Admin Mounted');
      console.log(parent); // refers to the parent app
  });
  admin.get('/', function(req, res) {
      res.send('Admin Homepage');
  });
  app.use('/admin', admin);
```

#### Methods

##### app.all(path, callback[,callback ...])

app.all 方法和标准的app.METHOD()方法类似，除了匹配所有的http动词。

对伊给一个特殊前缀映射一个全局的逻辑处理。或者无条件匹配，他是有效的。

例如，如果你把下面的内容放在所有其他的路由定义的前面，他要求所有其他的路由定义的前面，他要求所有从这个点开始的路由需要认证一个自动加载一个用户。记住这些回调并不是一定是终点。 loadUser可以在完成一个任务后，调用next()方法来继续匹配随后的路由。

```
app.all('*',requireAuthentication);
```

另一个例子是全局的白名单方法。这个例子和前面的很像，然而他只是限制/api开头的路径。

```
app.all('/api/*',req);
```

##### app.delete(path, callback[,callback ...])

路由HTTP DELETE请求到有特殊回调方法的特殊路径。

你可以提供多个回调函数，他们的行为和中间件一样除了这些回调可以通过next('router')来绕过剩余的路由回调，

```
app.delete('/', function(req, res) {
    res.send('DELETE request to homepage');
});
```

##### app.engine(ext, callback)

注册给定引擎回调，用来渲染处理ext文件。

默认情况下，express 需要用来require来加载基于文件扩展，例如，如果你尝试渲染一个foo.jade文件，Express在内部调用下面的内容，同时缓存require()结果供随后的调用，来加速性能。

```
  app.engine('jade', require('jade').__express);
```

##### app.get(name)

获得设置名为name的app设置的值，此处的name是app settings table中各属性的一个。

```
app.get('title');
// => undefined
app.set('title', 'My Site');
app.get('title');
// => 'My Site'
```

##### app.get(path, callback [, callback ...])

路由HTTP GET请求到有特殊回调的特殊路径。获取更多的信息，可以查阅routing guide。 
你可以提供多个回调函数，它们的行为和中间件一样，除了这些回调可以通过调用next('router')来绕过剩余的路由回调。你可以使用这个机制来为一个路由设置一些前提条件，如果请求没能满足当前路由的处理条件，那么传递控制到随后的路由。

