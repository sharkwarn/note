# vue-router 学习笔记

### 开始

和redux一样需要先定义，渲染的路径。然后挂载到vue上面。

```
1、 第一路由组件。
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
2、定义路由
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
 3、创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

4、创建实力和挂载
const app = new Vue({
  router
}).$mount('#app')

```

### 路由传递参数

```
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
```

一个路径参数使用冒号：标记，当匹配到一个路由时，参数值将被设置到this.$route.params,可以在每个组件内使用。

```
template: '<div>User {{ $route.params.id }}</div>'
```

当在一个路由中设置了多端的路径参数对应的值都会设置到$route.params中，例如：

| 模式  　　　　　　　| 匹配路径 　　　　　| $route.params|

|　------ 　　　　| :-------: 　　　| ------:　　　|

| /user/:username　|/user/evan　　　　| { username: 'evan' }|

| /user/:username/post/:post_id | /user/evan/post/123 | { username: 'evan', post_id: 123 } |

