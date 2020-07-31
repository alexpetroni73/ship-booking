let items = [
  { icon: 'mdi-view-dashboard-outline', title: 'Dashboard', to: '/'},
  { icon: 'mdi-ship-wheel', title: 'Ships', to: '/ships' },
  { icon: 'mdi-map-clock-outline', title: 'Cruises', to: '/cruises' },
  { icon: 'mdi-map-marker-path', title: 'Itineraries', to: '/itineraries' },
  // { icon: 'mdi-image-multiple', title: 'Media', to: '/media' },
  { icon: 'mdi-cash-multiple', title: 'Orders', to: '/orders' },
  { icon: 'mdi-account-multiple-outline', title: 'Clients', to: '/clients' },
  { icon: 'mdi-cogs', title: 'Settings', to: '/settings' },

  // {
  //   icon: 'mdi-view-dashboard',
  //   title: 'dashboard',
  //   to: '/',
  // },
]

if(process.env.NODE_ENV == 'development'){
  items.push(
    {
      group: '/pages',
      icon: 'mdi-image',
      title: 'pages',
      children: [
        {
          title: 'pricing',
          to: 'pricing',
        },
        {
          title: 'rtl',
          to: 'rtl',
        },
        {
          title: 'timeline',
          to: 'timeline',
        },
        {
          title: 'login',
          to: 'login',
        },
        {
          title: 'register',
          to: 'pricing',
        },
        {
          title: 'lock',
          to: 'lock',
        },
        {
          title: 'user',
          to: 'user',
        },
        {
          title: 'error',
          to: '404',
        },
      ],
    },
    {
      group: '/components',
      icon: 'mdi-view-comfy',
      title: 'components',
      children: [
        {
          title: 'multi',
          group: '',
          children: [
            {
              title: 'example',
              href: '#',
            },
          ],
        },
        {
          title: 'buttons',
          to: 'buttons',
        },
        {
          title: 'grid',
          to: 'grid-system',
        },
        {
          title: 'tabs',
          to: 'tabs',
        },
        {
          title: 'notifications',
          to: 'notifications',
        },
        {
          title: 'icons',
          to: 'icons',
        },
        {
          title: 'typography',
          to: 'typography',
        },
      ],
    },
    {
      group: '/forms',
      icon: 'mdi-clipboard-outline',
      title: 'forms',
      children: [
        {
          title: 'rforms',
          to: 'regular',
        },
        {
          title: 'eforms',
          to: 'extended',
        },
        {
          title: 'vforms',
          to: 'validation',
        },
        {
          title: 'wizard',
          to: 'wizard',
        },
      ],
    },
    {
      group: '/tables',
      icon: 'mdi-grid',
      title: 'tables',
      children: [
        {
          title: 'rtables',
          to: 'regular-tables',
        },
        {
          title: 'etables',
          to: 'extended-tables',
        },
        {
          title: 'dtables',
          to: 'data-tables',
        },
      ],
    },
    {
      group: '/maps',
      icon: 'mdi-map-marker',
      title: 'maps',
      children: [
        {
          title: 'google',
          to: 'google-maps',
        },
        {
          title: 'fullscreen',
          to: 'full-screen-map',
        },
      ],
    },
    {
      icon: 'mdi-widgets',
      title: 'widgets',
      to: '/widgets',
    },
    {
      icon: 'mdi-chart-timeline-variant',
      title: 'charts',
      to: '/charts',
    },
    {
      icon: 'mdi-calendar-range',
      title: 'calendar',
      to: '/calendar',
    },)
}

export default items
