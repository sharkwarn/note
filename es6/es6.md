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

#### 描绘曲线代码
```
var arr=[25,26,26,27,29,32,36,33,30,28,27]
  function drawLine(arr,width,height){
    var box = document.getElementById('box');
    var ctx = box.getContext('2d');
    var a = getExtremum(arr);
    var scaleNum =  180/(a.max-a.min);
    
    ctx.beginPath();
    ctx.moveTo(0,200);
    ctx.lineTo(0,190);
    ctx.lineTo(100,190);
    var average ;
    var x=100;
    for( var i=1; i<arr.length ; i++ ){
      average  = x+50;
      x = x+100;
      // ctx.bezierCurveTo(average,200-(arr[i-1]-a.min)*scaleNum,average,200-(arr[i]-a.min)*scaleNum,x,200-(arr[i]-a.min)*scaleNum);
      ctx.lineTo(x,200-(arr[i]-a.min)*scaleNum)
    }
    ctx.lineTo(x+100,190);
    ctx.lineTo(x+200,200);
    ctx.lineTo(0,200);
    var grd=ctx.createLinearGradient(0,170,0,0);
    grd.addColorStop(0.3,"#20A0FF");
    grd.addColorStop(0.7,"#13CE66")
    ctx.fillStyle=grd;
    ctx.fill();
    ctx.strokeStyle="#58B7FF";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.stroke();
  }
  function getExtremum(arr){
    var max = -100 , min=100 ;
    for(var i=0 ; i< arr.length ; i++){
      max = arr[i] > max ? arr[i] : max;
      min = arr[i] < min ? arr[i] : min;
    }
    return {
      'max':max,
      'min':min
    }
  }
  drawLine(arr)
```
# class 

#### 基础用法

<b>注意</b>
1、 实例的时候必须要用new否则会报错。

2、class在实例后，class中定义的方法，在示例中都是不可枚举的属性。

3、constuctor 方法为初始方法，代表在实例的时候立即执行，同时constructor最后默认返回一个对象，即为实例对象。如果主动修改返回其他的值也可以。

4、constructor方法中的参数，即为实例过程中传递的参数。


```
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}
```
 
为了防止this指向的问题

两种方法

1、在构造方法中绑定this

```
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```

2、使用箭头函数

```
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
```

3、还可以通过proxy，自动绑定this。


##### 创建私有方法

```
class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}
```
##### 私有属性

```
class Point {
  #x;

  constructor(x = 0) {
    #x = +x; // 写成 this.#x 亦可
  }

  get x() { return #x }
  set x(value) { #x = +value }
}
```

##### Class 的取值函数（getter）和存值函数（setter）

```
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```


##### class静态方法

同样该方法依然可以在继承的方法上调用。

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

##### 另一宗静态方法

```
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

<b>class 只有静态方法，并没有静态属性<b/>

```
// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2

  // 写法二
  static prop: 2
}

Foo.prop // undefined
```

##### new.target属性

用来判断是哪个class实例的
