

#### vue生命周期

#####  生命周期

###### vue 1.0

    钩子函数：
    init           => 初始化
    created        => 实例已经创建
    beforeCompile  => 编译之前
    compiled       => 编译之后
    ready          => 插入到文档中
    beforeDestroy  => 销毁之前
    destroyed      => 销毁之后
###### vue 2.0

    钩子函数：
    beforeCreate 	 => 组件实例刚刚被创建,属性都没有
		created	       => 实例已经创建完成，属性已经绑定
		beforeMount	   => 模板编译之前
		mounted	       => 模板编译之后，代替之前ready*
		beforeUpdate	 => 组件更新之前*
		updated	       => 组件更新完毕*
		beforeDestroy	 => 组件销毁前
		destroyed	     =>组件销毁后
##### 防止看到花括号

###### v-cloak
页面在加载的过程中会出现{{}}的情况

可以选择在标签中加上v-cloadk便可以处理掉这个情况
###### v-text v-html
可以在标签中加上v-text或v-html并将数据卸载属性的后面

##### 计算属性的使用
在模版中放入过多的逻辑可能造成模板过于复杂，难以维护，因此可以采用计算属性。

    var vm = new vue({
      el:'#box',
      data:{
        msg:'hello'
      }
      computed:{
        //注意这里不可以使用箭头函数，
        //引文箭头函数的this是不会改变的
        //所以有可能造成this.msg娶不到值的可能
        reversedMessage:function(){
          return this.msg.split().reverse().join('')
        }
      }
    })

    <span>{{reversedMessage}}</span>
    // olleh

我们可以发现如果将上面的方法写在methods中一样可以达到同样的效果。

不一样的地方是：computed是根据依赖进行缓存的如果this.msg不变化的话，那么标签中的文字也不会变化的。

例如：

    computed:{
      now:function(){
        return Date.now()
      }
    }

这意味着计算属性只会计算一次，但是methods将会多次实行。

#### vue示例的方法

vm.$el =>表示元素
vm.$data => 就是data
vm.$mount => 手动挂载vue程序
vm.$options => 自定义属性
vm.$destory => 销毁对象
vm.$log => 查看现在的数据状态

#### 循环

    v-for="key in json"
    重复数据vue1.0重复数据默认不会添加上
    vue2.0将没有该限制。

    track-by="索引" 将会提高页面性能

#### 过滤器
vue2.0不在提供原生的过滤器了，但是可以设置自定义过滤器

      Vue.filter('filterHtml',{
        return input.replace(/<^<+>/g,'');
      })

      <span>{{msg|filterHtml}}</span>

#### 自定义指令

在 Vue2.0 里面，代码复用的主要形式和抽象是组件——然而，有的情况下,你仍然需要对纯 DOM 元素进行底层操作,这时候就会用到自定义指令。

    Vue.directive("指令名称",function(){
      this.el => 原生dom元素
      //
    })


自定义指令同样含有钩子函数：
<ul>
  <li>bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。</li>
  <li>inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。</li>
  <li>update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）</li>
  <li>componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。</li>
  <li>unbind: 只调用一次， 指令与元素解绑时调用。</li>
</ul>
<b>同事钩子函数含有一下参数:</b>

el:元素。

 binding：一个对象

 vnode:Vue编译的虚拟节点

 oldVnode: 上一个虚拟节点仅在 update 和 componentUpdated 钩子中可用。


 #### 自定义键盘信息:
    Vue.directive('on').keyCodes.ctrl=17;
    Vue.directive('on').keyCodes.myenter=13;

#### 监听数据变化

    vm.$el/$mount/$options/....
    vm.$watch(name,fnCb);  //浅度
    vm.$watch(name,fnCb,{deep:true});  //深度监视 

#### vue组件
slot

slot 元素可以用一个特殊的属性 name 来配置如何分发内容。多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 slot 特性的元素。

###### 子组件

    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>

###### 父组件

    <app-layout>
      <h1 slot="header">这里可能是一个页面标题</h1>
      <p>主要内容的一个段落。</p>
      <p>另一个主要段落。</p>
      <p slot="footer">这里有一些联系信息</p>
    </app-layout>

###### 渲染结果

    <div class="container">
      <header>
        <h1>这里可能是一个页面标题</h1>
      </header>
      <main>
        <p>主要内容的一个段落。</p>
        <p>另一个主要段落。</p>
      </main>
      <footer>
        <p>这里有一些联系信息</p>
      </footer>
    </div>
  
  ##### 作用域插槽

  vue2.1.0新增在子组件中，只需将数据传递到插槽，就像你将 prop 传递给组件一样：

      <div class="child">
        <slot text="hello from child"></slot>
      </div>
  
  父组件具有特殊属性 scope 的 \<template\> 元素，表示它是作用域插槽的模板。scope 的值对应一个临时变量名，此变量接收从子组件中传递的 prop 对象：


      <div class="parent">
        <child>
          <template scope="props">
            <span>hello from parent</span>
            <span>{{ props.text }}</span>
          </template>
        </child>
      </div>

渲染结果

    <div class="parent">
      <div class="child">
        <span>hello from parent</span>
        <span>hello from child</span>
      </div>
    </div>
