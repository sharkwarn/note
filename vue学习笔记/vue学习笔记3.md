### 过渡动画
<hr/>
vue2.0之后的组件动画的方式

    <transition name="fade">
      <p>动画</p>
    </transitio>

class定义

      .fade-enter => 初始状态
      .fade-enter-active => 变化成什么样子 -> 当元素出来时的样子

      .fade-leave => 
      .fade-leave-active => 变化成什么样子 -> 当元素消失的时候变化成样子

      appear-class => 初始渲染时
      appear-active-class 

配合animate.css配合使用

      <transition enter-active-class="animated zoomInLeft" leave-active-leave="animated zoomOutRight">
        <p>动画</p>
      </transition>

多个元素运动时

    <transition-group enter-active-class="" leave-active-class="">
      <p :key=""></p>
      <p :key=""></p>
    </transition-group>

同时tansition还定义了钩子函数:

    before-enter
    enter
    after-enter
    before-leave
    leave
    after-leave
    before-appear
    appear
    after-appea


<hr/>

### vue的组件

####注册一个全局的组件

    html:

    <div id="example">
      <my-component></my-component>
    </div>

    js:
    //注册
    Vue.component('my-component', {
      template: '<div>A custom component!</div>'
    })

    // 创建根实例
    new Vue({
      el: '#example'
    })

#### 局部组件

    var Child = {
      template: '<div>A custom component!</div>'
    }
    new Vue({
      // ...
      components: {
        // <my-component> 将只在父模板可用
        'my-component': Child
      }
    })

<b>注意：</b>子组件中的data必须是一个函数。

##### prop同样是用来父组件向子组件传递数据

    Vue.component('child', {
      // 声明 props
      props: ['message'],
      // 就像 data 一样，prop 可以用在模板内
      // 同样也可以在 vm 实例中像 “this.message” 这样使用
      template: '<span>{{ message }}</span>'
    })

    父组件：

    <template>
      <child :message="msg"></child>
    </template>

    如果不添加引号的代表的是一个静态的值。


<b>vue 组件数据的传递也是单向流</b>


vue也支持检验prop的传值是否规范

    Vue.component('example', {
      props: {
        // 基础类型检测 （`null` 意思是任何类型都可以）
        propA: Number,
        // 多种类型
        propB: [String, Number],
        // 必传且是字符串
        propC: {
          type: String,
          required: true
        },
        // 数字，有默认值
        propD: {
          type: Number,
          default: 100
        },
        // 数组／对象的默认值应当由一个工厂函数返回
        propE: {
          type: Object,
          default: function () {
            return { message: 'hello' }
          }
        },
        // 自定义验证函数
        propF: {
          validator: function (value) {
            return value > 10
          }
        }
      }
    })

当 prop 验证失败，Vue会在抛出警告 (如果使用的是开发版本)。

### 自定义事件

  使用 $on(eventName) 监听事件
  使用 $emit(eventName) 触发事件