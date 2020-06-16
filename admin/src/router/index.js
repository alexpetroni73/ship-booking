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
    name: 'Ships',
    component: () => import('../views/ShipsList.vue')
  },

  {
    path: '/ship-edit/:id?',
    name: 'Ship Editor',
    component: () => import('../views/Ship.vue')
  },

  {
    path: '/cruises',
    name: 'Cruises',
    component: () => import('../views/Cruises.vue')
  },

  {
    path: '/cruise-edit/:id?',
    name: 'Cruise Editor',
    component: () => import('../views/Cruise.vue')
  },

  {
    path: '/itineraries',
    name: 'itineraries',
    component: () => import('../views/ItinerariesList.vue')
  },

  {
    path: '/itinerary-edit/:id?',
    name: 'Itinerary Editor',
    component: () => import('../views/Itinerary.vue')
  },

  {
    path: '/media',
    name: 'Media',
    component: () => import('../views/AttachmentsList.vue')
  },

  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue')
  },

  {
    path: '/clients',
    name: 'Clients',
    component: () => import('../views/Clients.vue')
  },

  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },

]

if(process.env.NODE_ENV == 'development'){
  routes.push(
    {
      path: '/pages',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'Lock',
          path: 'lock',
          component: () => import('@/views/pages/Lock'),
        },
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/pages/Login'),
        },
        {
          name: 'Pricing',
          path: 'pricing',
          component: () => import('@/views/pages/Pricing'),
        },
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/pages/Register'),
        },
      ],
    },


    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
      // Pages
      {
        name: 'RTL',
        path: 'pages/rtl',
        component: () => import('@/views/dashboard/pages/Rtl'),
      },
      {
        name: 'User Profile',
        path: 'pages/user',
        component: () => import('@/views/dashboard/pages/UserProfile'),
      },
      {
        name: 'Timeline',
        path: 'pages/timeline',
        component: () => import('@/views/dashboard/pages/Timeline'),
      },
      // Components
      {
        name: 'Buttons',
        path: 'components/buttons',
        component: () => import('@/views/dashboard/component/Buttons'),
      },
      {
        name: 'Grid System',
        path: 'components/grid-system',
        component: () => import('@/views/dashboard/component/Grid'),
      },
      {
        name: 'Tabs',
        path: 'components/tabs',
        component: () => import('@/views/dashboard/component/Tabs'),
      },
      {
        name: 'Notifications',
        path: 'components/notifications',
        component: () => import('@/views/dashboard/component/Notifications'),
      },
      {
        name: 'Icons',
        path: 'components/icons',
        component: () => import('@/views/dashboard/component/Icons'),
      },
      {
        name: 'Typography',
        path: 'components/typography',
        component: () => import('@/views/dashboard/component/Typography'),
      },
      // Forms
      {
        name: 'Regular Forms',
        path: 'forms/regular',
        component: () => import('@/views/dashboard/forms/RegularForms'),
      },
      {
        name: 'Extended Forms',
        path: 'forms/extended',
        component: () => import('@/views/dashboard/forms/ExtendedForms'),
      },
      {
        name: 'Validation Forms',
        path: 'forms/validation',
        component: () => import('@/views/dashboard/forms/ValidationForms'),
      },
      {
        name: 'Wizard',
        path: 'forms/wizard',
        component: () => import('@/views/dashboard/forms/Wizard'),
      },
      // Tables
      {
        name: 'Regular Tables',
        path: 'tables/regular-tables',
        component: () => import('@/views/dashboard/tables/RegularTables'),
      },
      {
        name: 'Extended Tables',
        path: 'tables/extended-tables',
        component: () => import('@/views/dashboard/tables/ExtendedTables'),
      },
      {
        name: 'Data Tabels',
        path: 'tables/data-tables',
        component: () => import('@/views/dashboard/tables/DataTables'),
      },
      // Maps
      {
        name: 'Google Maps',
        path: 'maps/google-maps',
        component: () => import('@/views/dashboard/maps/GoogleMaps'),
      },
      {
        name: 'Full Screen Map',
        path: 'maps/full-screen-map',
        component: () => import('@/views/dashboard/maps/FullScreenMap'),
      },
      // Root level
      {
        name: 'Widgets',
        path: 'widgets',
        component: () => import('@/views/dashboard/Widgets'),
      },
      {
        name: 'Charts',
        path: 'charts',
        component: () => import('@/views/dashboard/Charts'),
      },
      {
        name: 'Calendar',
        path: 'calendar',
        component: () => import('@/views/dashboard/Calendar'),
      },
    ]}
  )
}

routes.push(    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error'),
        },
      ],
    },)


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
