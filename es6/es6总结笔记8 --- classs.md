### class


+ 先来个普通的写法
```
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```


+ constructor

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。


+ Class 的静态方法

```
class Foo {
  static bar () {
    this.baz();
  }
  static baz () {
    console.log('hello');
  }
  baz () {
    console.log('world');
  }
}

Foo.bar()
```

+ extends 集成
```
class Point {
}

class ColorPoint extends Point {
}
```

+ super 记住在使用集成的时候如果写consructor一定要写super(),否则会报错，其实是语法规定。因为es6的类之间的集成关系是先实例父类，然后再把子类的东西绑定到父类上。而且super的作用就是实例父类，所以没有实例父类的话就调用this肯定出问题


```
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```
