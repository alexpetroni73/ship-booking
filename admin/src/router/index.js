import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/ships',
    name: 'ships',
    component: () => import('../views/Ships.vue')
  },

  {
    path: '/ship/:id?',
    name: 'ship',
    component: () => import('../views/Ship.vue')
  },

  {
    path: '/cruises',
    name: 'cruises',
    component: () => import('../views/Cruises.vue')
  },

  {
    path: '/itineraries',
    name: 'itineraries',
    component: () => import('../views/Itineraries.vue')
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

  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
