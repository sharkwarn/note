### Generator 

+ 先来个简单的例子


```
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

Generator 函数并不会主动执行而是通过调用next()方法来执行。


next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。


+ yield 表达式 两个Generator函数嵌套


###### 这个调用方法是没效果的

```
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  foo();
  yield 'y';
}
```

###### 这个调用是有用的
```
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}
```

+ co函数

因为Generator 是通过调用next才会执行，而不是自己主动执行。所以在实际工作很很不方便，接下来写个可以是Generator 主动执行的函数。

```
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

run(gen);
```

其实dva的effect就是使用了这个函数方法，这样便可以达到主动调用的目的了。


### 当然为了达到主动调用的目的，在es8中变出现了async函数

async函数对 Generator 函数的改进，体现在下面几点。

+ （1）内置执行器。


我们写的co函数就相当于是外置的执行器，而 async就自带有这个功能

```
// 请求返回后立马继续往下执行。
const getData = async () => {
    const res = await get()
}
```

+ （2）返回值是 Promise


```
// 不管你有没有返回值， 直接调用异步函数返回的就是一个promise
const a = getData() 

console.log(a) // Promise {<pending>}
```

+ 当然还有其他优点 (就当记住有的说吧)
    + 更好的语义。
    + 更广的适用性。

