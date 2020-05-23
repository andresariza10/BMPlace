import Vue from 'vue'
import VueRouter from 'vue-router'

import { auth }  from '../firebaje'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/Configuracion',
    name: 'Configuracion',
    component: () => import(/* webpackChunkName: "Configuracion" */ '../views/Configuracion.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(user){
      next()
    }else{
      next({ name: 'Login' })
    }
  }else{
    next()
  }
})

export default router
