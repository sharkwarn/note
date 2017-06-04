# vue学习笔记

### 一、认识vue
#### 1、基础用法
html

    <div id="box">
      {{msg}}
    </div>
script

    var vm = new vue({
      el:'#box',
      data:{
        msg:'welcome vue'
      }
    })

#### 2、常用指令

html标签功能属性

##### v-model 
一般和表单元素input绑定在一起，实现数据的双向绑定。

##### 循环：

v-for="name in arr"  name

v-for="value in json"  value

v-for="(key,value) in json" key ,value

##### 事件

v-on:click="函数"

v-on:click/mouseout/mouseover/dbclick/mousedown....

简写方式 @click

    new vue({
      el:'#box',
      data:{
        msg:'vue'
      },
      methods:{
        get:function(){
          alert('执行了')
        }
      }
    })

##### 显示隐藏
v-show="false/true"

#### 3、事件

v-on:click/mouseover/....

简写 @:click/mouseover/...

##### 事件对象
@click:"show($event)"
##### 阻止冒泡
a). ev.cancelBubble=true

b). @click.stop 推荐

##### 默认行为（阻止默认行为）

a). ev.preventDefault();

b). @click.stop 推荐

##### 键盘事件

@keyup $event ev.keyCode

###### 常用键盘事件
回车：

    @keyup.13
    @keyup.enter

上下左右

    @keyup.up
    @keyup.down
    @keyup.left
    @keyup.right

#### 4、属性

v-bind:src=""/width/height/title/

简写：

:src=""推荐

    <img :src="url" title="" />  效果可以出来并且不会报错
    <img src={{url}} title="" /> 效果可以出来但是会报一个404错误

#### 5、class和style
    :class="" v-bind:class=""
    :style="" v-bind:style=""
    :class="[red,b,c]" red 是数据
    :class="{red:a,blue:false}"
    :class="json"
    data:{
      json:{red:a,blue:false}
    }

    style:
    :style="[c,b]"
    :style="json" //注意：复合样式采用驼峰命名方式

#### 6、模板
    {{msg}} //数据更新模板变化
    {{*msg}} //数据只绑定一次
    {{{msg}}} //会进行转义

#### 7、过滤器

vue2.0删除了所有的自带过滤器，只能通过自定义过滤器

      {{msg | filterA}}

#### 8、交互 $http(ajax)

引入vue-resouce

    get:

    this.$http.get(url).then(function(res){
      alert(res.data)
    },function(res){
      alert(res.status)
    })

    post:

    this.$http.post(url,{
      a:1,
      b:2
    },{
      emulate:true
    }).then(function(res){
      console.log(res)
    },function(res){
      console.log(res.status)
    })

    jsonp:

    this.$http(url,{
      a:1,
      b:2
    },{
      jsonp:'callback' //约定好的回调方法名称
    }).then(function(res){
      console.log(res)
    },function(res){
      console.log(res.status)
    })


