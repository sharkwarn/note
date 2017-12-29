
## promise

+ promise 包含三种状态
    + pending(进行中)、fulfilled(已经成功)、rejectd(失败)

+ 想来个简单写法


##### 注意： 
当你使用new Promise的时候，promise中的方法就已经执行了。
```
const promise = new Promise(function(resolve, reject) {

  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

+ 实例后第一个then是允许传入两个函数的，分别代表成功或者失败的回调

```
promise.then(function(){

    //success成功的回调函数 
    
},function(){
    
    // filure 失败的回调函数
    
})
```

+ 支持链式调用

##### 需要注意下catch只有发生错误的时候才会执行

```
Promise.resolve()
.then((res)=>{
    
    
    console.log(res)
    
})
.catch(function(error) { 
    // 注意这个catch如果没有报错的会跳过该环节。
    //只有上面的出现报错之后才会调用该方法
    
    console.log('oh no', error);
})
.then(function() {
    console.log('carry on');
});
```

### 以上是基本用法，再记几个api

+ Promise.all()

###### Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
```
const p = Promise.all([p1, p2, p3]);

```

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。


#### 给你说个使用场景

比如某个后端借口仅支持请求的是单个的id，而不是一个数组，所以你可以封装下，比如这样
```

// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});

```

+ 再记住一个 Promise.race()

###### 这个和promise.all()差不多区别是，promise.all所有的实例状态全部改变，all才会进入下一个状态。但是promise.race 中有一个的状态改变promise.race就会进入下一个状态。


+ Promise.resolve && Promise.reject

### 这两个还是很有用的比如你想得到一个链式调用的对象
```
Promise.resolve(111).then().then()
```

比如你想得到一个resolve的promise对象可以直接这样
```
Promise.resolve()

Promise.reject()  //得到一个reject的同样可以。
```
