// 导入vue、vue-router的包
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入需要匹配的组件
import Login from '@/components/MyLogin.vue'
import Home from '@/components/MyHome.vue'
import Goods from '@/components/menus/MyGoods.vue'
import Orders from '@/components/menus/MyOrders.vue'
import Rights from '@/components/menus/MyRights.vue'
import Settings from '@/components/menus/MySettings.vue'
import Users from '@/components/menus/MyUsers.vue'
import Details from '@/components/user/MyUserDetail.vue'
// 导入需要权限才能访问的路由链接数组
import preArr from '@/router/preArr.js'
// 给vue安装vue-router插件
Vue.use(VueRouter)

// 创建vue-router的实例对象
const router = new VueRouter({
  // 声明路由规则
  routes: [
    { path: '/', redirect: '/login' }, // 路由重定向
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/home/users',
      children: [
        // 嵌套路由规则
        { path: 'goods', component: Goods },
        { path: 'orders', component: Orders },
        { path: 'rights', component: Rights },
        { path: 'users', component: Users },
        { path: 'settings', component: Settings },
        { path: 'users/:id', component: Details }
      ]
    }
  ]
})
// 全局前置守卫，用于控制用户的访问权限
router.beforeEach((to, from, next) => {
  if (preArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('token')
    // 需要访问权限的页面，判断用户是否拥有权限（token）
    if (token) {
      next() // 验证通过，放行
    } else {
      next('/login') // 验证到没有token值，强制跳转到登录页面
    }
  } else {
    next() // 不需要权限的页面直接放行
  }
})
// 向外共享路由
export default router
