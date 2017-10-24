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


### 响应路由参数的变化

提醒一下，当使用路由参数时，例如从 /user/foo 导航到 user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象：

```
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```
### 嵌套路由

现在初始节点上设置<router-view></router-view>

```
<div id="app">
  <router-view></router-view>
</div>
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

一个被渲染组件也可以包含自己的嵌套 <router-view>

同时需要在vueRouter中设置children配置：

```
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径




#使用vue-cli 创建一个项目

vue init webpack-simple '项目名称'

##### 使用element-ui

```
npm i element-ui -S
```



