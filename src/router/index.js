import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import homeview from '../views/home/homeView.vue'
import {getRoutersApi} from '@/request/api.js'
import store from '@/store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    redirect:'/home/homeView',
    beforeEnter:(to, from, next)=>{
      if(localStorage.getItem('edb-authorization-token')){
        next()
      }else{
        next('/login')
      }
    },
    children:[
      // 动态生成路由 防止没有相关跳转能力的用户 通过输入path进入到功能中
      // {
      //   path: '/customer/customer',
      //   component: () => import( '../views/customer/Customer.vue')
      // },
      // {
      //   path:'/customer/visit',
      //   component:()=> import('../views/customer/Visit.vue')
      // }
    ],
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  },
  
];



const router = new VueRouter({
  routes
})
// 设置路由守卫
router.beforeEach(async (to,from,next)=>{
  const token = localStorage.getItem('edb-authorization-token')
  // 去的路径是login 且有token 就放行
  if(to.path == '/login' && token){
    next('/')
    return
  }
  // 去的路径不是login 但是没有token 就跳转到login
  if(to.path != '/login' && !token){
    next('/login')
    return
  }
  // 判断有没有token及初始数据是不是0
  if(token && store.state.userMenuData.length==0){
  let getRouterRes = await getRoutersApi()
  // console.log(getRouterRes);
  if(!getRouterRes)return;
  // 通过请求到的数据和我们要的menuData的数据结构上不太一样
  let newMenuData = [{title:'首页',path:'/home/homeView'}]
  let ret = getRouterRes.data.map(item=>{
    // 判断有没有children
    if(item.children){
      return {
        title: item.meta.title,
        path: item.path,
        children: item.children.map(item1=>{
          return {
            title: item1.meta.title,
            path: item.path + "/" + item1.path
          }
        })
      }
    }else{
      return {
        title: item.meta.title,
        path: item.path
      }
    }
  })
  // 拼接两个数据
  newMenuData = [...newMenuData,...ret]
  store.commit('setMenuData',newMenuData)
  // console.log(newMenuData);

  // 动态生成用户可以访问的路由数据
  let newChildrenRouter = [{
      path:'/home/homeView',
      meta:{titles:['首页']},
      component:homeview
    }]
  getRouterRes.data.forEach(item=>{
    let ret = item.children.map(item1=>{
      return {
        path:item.path+ '/' +item1.path ,
        component:()=>import(`../views${item.path}/${item1.name}.vue`),
        meta:{
          titles:[item.meta.title,item1.meta.title]
        }
      }
    })
    newChildrenRouter = [...newChildrenRouter,...ret]
  })
  // console.log(newChildrenRouter)
  // 将生成好的数据添加到路由中的children中
  newChildrenRouter.forEach(item=>{
    router.addRoute('home',item)
  })
  // 如果直接放行 路由还没有完整还是个空的 不确定路由有没有这个路径
  // 加了to.path会重新走一次路由守卫 路由添加完毕可以检查出用户能不能进行跳转
  next(to.path)
  return
  }
  next()
})

export default router
