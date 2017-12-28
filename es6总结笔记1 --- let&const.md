
## let & const

let 和 const 共性：
+ 声明过的变量不可以重复声明。
```
let a = 1
let a = 1  //Uncaught SyntaxError 报错
```

+ 存在块级作用域
```
{
    let a = 10
    var b = 10
}
console.log(b) // ===> 10
console.log(a) // ===> Uncaught SyntaxError
```

+ 不存在声明提升
```
console.log(a) // ===> undefined 这叫声明提升
var a = 1
console.log(a) // ===> 1 

//如果是let的话
console.log( b ) // ===> Uncaught SyntaxError:b is not defined
let b = 1
```

+ for循环定义的变量只在for循环中
```
for( let i = 0; i < 10 ; i++ ){
    
}
console.log(i) // 直接报错，因为外面没有声明i
```


##### 以上是let和const基本用法一定要记住

+ 块级作用域 

```
function f1() {
  let n = 5;
  if (true) {
    let n = 10; //这里声明的n=10仅在该{}内起作用。
  }
  console.log(n); // 5 
}
//如果全部改为var 则变成了10
```

甚至这样
```
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};
```

+ 暂时性死区

只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
```
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

#### let 和const 不同点

+ const声明一个只读的常量。一旦声明，常量的值就不能改变。

什么叫不能改变，不是指值变化
```
const a = []
a.push(1)
a.push(2)
//任然不报错，这里的‘不能改变’说的是指针的不能改变 
//记住一点就行，不要用 ‘=’ , 所以这里说的不能改变说的是指针不变

a = [1,2,3] // 这样就会报错。这是const 和let 唯一的区别
// 因为用 = 表示改变了指针

```
