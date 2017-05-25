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


