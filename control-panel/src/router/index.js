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
    path: '/translations',
    name: 'translations',
    component: () => import('../views/Translations.vue')
  },

  {
    path: '/operators',
    name: 'operators',
    component: () => import('../views/Operators.vue')
  },

  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue')
  },

  {
    path: '/ship-features',
    name: 'ship-features',
    component: () => import('../views/ShipFeatures.vue')
  },

  {
    path: '/cabin-features',
    name: 'cabin-features',
    component: () => import('../views/CabinFeatures.vue')
  },

  {
    path: '/countries',
    name: 'countries',
    component: () => import('../views/Countries.vue')
  },

  {
    path: '/courencies',
    name: 'courencies',
    component: () => import('../views/Courencies.vue')
  },

  {
    path: '/media',
    name: 'media',
    component: () => import('../views/Media.vue')
  },

  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/Orders.vue')
  },

  {
    path: '/clients',
    name: 'clients',
    component: () => import('../views/Clients.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
