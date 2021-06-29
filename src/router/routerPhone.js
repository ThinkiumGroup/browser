
let routerPhone = [
  {
    path: '/', component: () =>
    import(/* webpackChunkName: "index" */ '@/views/Home'),
    name: 'routerPhone',
    children: [
      {
        name: 'routerPhone',
        path: '/',
        component: () => import('@/views/mobile/home'),

      },
      {
        name: 'transactionDetails',
        path: '/transactionDetails',
        component: () => import('@/views/mobile/transactionDetails'),
      },
      {
        name: 'addressDetails',
        path: '/addressDetails',
        component: () => import('@/views/mobile/addressDetails'),
      },
      {
        name: 'blockDetails',
        path: '/blockDetails',
        component: () => import('@/views/mobile/blockDetails'),
      },
      {
        name: 'chainDetails',
        path: '/chainDetails',
        component: () => import('@/views/mobile/chainDetails'),
      },
      {
        name: 'allBlockHeight',
        path: '/allBlockHeight',
        component: () => import('@/views/mobile/allBlockHeight'),
      },
      {
        name: 'allTransaction',
        path: '/allTransaction',
        component: () => import('@/views/mobile/allTransaction'),
      },
      {
        name: 'homeDetails',
        path: '/homeDetails',
        component: () => import('@/views/mobile/home/details'),
      },
      {
        name: 'iframe',
        path: '/iframe',
        component: () => import('@/views/mobile/iframe/index'),
      },
      {
        name: 'committee',
        path: '/committee',
        component: () => import('@/views/mobile/committee/index'),
      },
      
    ]


  },
];


export default routerPhone;
