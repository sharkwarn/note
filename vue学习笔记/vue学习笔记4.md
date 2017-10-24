# vuex 学习笔记

### view层面

view层面首先需要做的有两件事情。

1、获取state 

因为store已经是全局的对象了所以可以这样直接获取。但是官方不推荐次方法。如果将该方法卸载computed中同样达到相同的效果。

      store.state.count
Vue.use(Vuex)这种方法可以将状态注入到每个子组件当中因此还可以通过这种方式获得state

      this.$store.state.count

#### mapState 辅助函数

    computed: mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    })

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。

    computed: mapState([
      // 映射 this.count 为 store.state.count
      'count'
    ])

当需要和局部属性混合使用的时候，需要注意的是，这个写法需要用到babel-preset-es2015，同时还需要在 babelrc 加入


    computed: {
      localComputed () { /* ... */ },
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState({
        // ...
      })
    }

    .babelrc
    "presets":[
        ["es2015", { "modules": false }]
    ]
    "plugins":[
       "transform-object-rest-spread"
    ]


2、获取触发事件的函数,分发函数。

Action 通过 store.dispatch 方法触发：

    store.dispatch('increment')


在组件中分发Action

    methods: {
      ...mapActions([
        'increment' // 映射 this.increment() 为 this.$store.dispatch('increment')
      ]),
      ...mapActions({
        add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
      })
    }

在actions.js 接受分发的事件

    actions: {
      incrementAsync ({ commit }) {
        setTimeout(() => {
          commit('increment')
        }, 1000)
      },
      actionA ({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('someMutation')
            resolve()
          }, 1000)
        })
      }
    }

#### Mutations

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。

    mutations: {
      increment (state) {
        // 变更状态
        state.count++
      }
    }

mutations 像是一个注册处理机制，你不可以直接调用这里的函数，需要通过store.commit('increment')这种方式去调用。

    store.commit('increment', 10)

一条重要的原则就是要记住 mutation 必须是同步函数。因此如果有异步请在mutations之前处理。


### Modules

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

  const moduleA = {
    state: { ... },
    mutations: { ... },
    actions: { ... },
    getters: { ... }
  }

  const moduleB = {
    state: { ... },
    mutations: { ... },
    actions: { ... }
  }

  const store = new Vuex.Store({
    modules: {
      a: moduleA,
      b: moduleB
    }
  })

  store.state.a // -> moduleA 的状态
  store.state.b // -> moduleB 的状态



