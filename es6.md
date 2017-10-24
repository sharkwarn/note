# es6 常见api及问题总结

### 数组扩展
Array.from可以将两类对象转化成真正的数组
1、类似数组的对象。
2、可遍历的对象。
<b>注意：</b>‘ ...’（扩展运算符,器原理是调用的遍历接口Symbol.iterator）也可以将某些数据转化成数组
exp:<em>Nodelist集合，arguments、string、</em>
```
Array.from
```
接受第二个参数，作用类似map将返回值放到数组中
```
Array.from(arrlike,x => x+1)
```
如果第二参数中用到了this，还可以传入第三个参数用来指定this。<br/>
来点高级的用法
```
Array.from({length:3}, x => 'jace')
//['jack','jack','jack']
```
<hr/>

### Array.of
用于将一组值转化成数组<br/>
exp:
```
Array.of(1,2,3)
//[1,2,3]
```
如果没有参数的话将会返回一个空数组。
<br/>

### copyWithin()
数组实例的方法,在当前数组内部,将指定的成员复制到其他位置(会覆盖原有的成员)，然后返回当前的数组。
```
Array.prototype.copyWithin(target, start = 0, end = this.length)
[1,2,3,4,5].copyWithin(1,3,4)
// [1,4,5,4,5]
```
这三个参数都应该是数值，如果不是，会自动转为数值。

### 数组实例的find()和findIndex()方法

<b>find</b>是一个回调函数所有的成员执行该回调函数,找到一个符合该条件的对象并返回，同时结束遍历。
find方法的回调函数接受三个参数分别是但前的值，当前的位置，当前的数组。
```
Array.find((value,index,arr) => value > 0)
```

数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。<br/>
这两个方法都支持第二个参数this,用来绑定对调函数的对象。
### fill

fill方法使用给定的值，填充一个数组。<br/>
```
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]

```
fill方法用于初始化数组，非常方便。数组中原有的元素会被全部抹去。<br/>
fill方法还接受第二和三个参数。用于指定的其实位置和结束位置。
```
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']

```
### 数组的示例方法entries()、keys()、values()
这三个方法均是用书遍历数组。他们都返回一个遍历对象，可以用for...of进行遍历。<br/>
<b>区别</b>
<p>keys()是对键名的遍历</p>
<p>values()是对键值的遍历</p>
<p>entries是对键值对的遍历</p>
<b>注意是和for...of组合的遍历</b>

```
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
不是用for...of的话
```
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```
### includes()示例方法

```
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true
```
该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。


# functions

### 几点重要的用法
1、 默认参数,这些参数是默认声明的，所以不能使用let和const

2、结构赋值和默认参数混合使用。




# Iterator


```
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```



# co函数封装
```
function run (gen) {
  const a = gen();
  function next(data){
    var result = a.next(data);
    console.log(result);
    if (result.done){
      return data;
    }
    result.value.then(function(data){
      console.log(data);
      next(data);
    })
  }
  next();
}

function* get(){
  console.log('yes1111');
  const a = yield new Promise(function(resolve, reject){
    setTimeout(()=>{
      resolve(11111111);
    },2000)
  })
  console.log(a);
}

run(get);

//输出结果
// yes1111

// {value: Promise, done: false}
// 两秒后触发
//11111111
// {value: undefined, done: true}
// 11111111
```