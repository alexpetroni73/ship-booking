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
    path: '/ship-edit/:id?',
    name: 'ship-edit',
    component: () => import('../views/Ship.vue')
  },

  {
    path: '/cruises',
    name: 'cruises',
    component: () => import('../views/Cruises.vue')
  },

  {
    path: '/cruise-edit/:id?',
    name: 'cruise-edit',
    component: () => import('../views/Cruise.vue')
  },

  {
    path: '/itineraries',
    name: 'itineraries',
    component: () => import('../views/Itineraries.vue')
  },

  {
    path: '/itinerary-edit/:id?',
    name: 'itinerary-edit',
    component: () => import('../views/Itinerary.vue')
  },

  {
    path: '/media',
    name: 'media',
    component: () => import('../views/AttachmentsList.vue')
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
