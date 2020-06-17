import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/search/:destination/:departure?',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },

  {
    path: '/cruise/:shipSlug/:destination/:departure?',
    name: 'Cruise',
    component: () => import('../views/Cruise.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
