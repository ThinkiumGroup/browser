

let routerPc = [
  {
    path: '/', 
    name: 'pcHome',
    // redirect: '/index',
    component: () => import(/* webpackChunkName: "index" */ '@/views/pc/pcHome'),
    children: [
      {
        path: '/',
        name: 'pcHome',
        component: () => import('@/views/pc/pages/index')
      },
      /*数据节点，共识节点和矿池数量的详情页*/
      {
        path: 'nodeDetail',
        name: 'nodeDetail',
        component: () => import('@/views/pc/pages/nodeDetail')
      },
      /*交易信息主页*/
      {
        path: 'tradeList',
        name: 'tradeList',
        component: () => import('@/views/pc/pages/tradeInfo/tradeList')
      },
      /*交易详情页*/
      {
        path: 'tradeDetail',
        name: 'tradeDetail',
        component: () => import('@/views/pc/pages/tradeInfo/tradeDetail')
      },
      // 币种详情页
      {
        path: 'currencyDetail',
        name: 'currencyDetail',
        component: () => import('@/views/pc/pages/currency/currencyDetail')
      },
      //区块链列表
      {
        path: 'blockchainList',
        name: 'blockchainList',
        component: () => import('@/views/pc/pages/blockchain/blockchainList')
      },
      // 区块链详情页
      {
        path: 'blockchainDetail',
        name: 'blockchainDetail',
        component: () => import('@/views/pc/pages/blockchain/blockchainDetail')
      },
      // 任务链页面
      {
        path: 'taskChain',
        name: 'taskChain',
        component: () => import('@/views/pc/pages/blockchain/taskChain')
      },
      // 主链页面
      {
        path: 'mainChain',
        name: 'mainChain',
        component: () => import('@/views/pc/pages/blockchain/mainChain')
      },
      // 地址详情页
      {
        path: 'addressDetail',
        name: 'addressDetail',
        component: () => import('@/views/pc/pages/addressDetail')
      },
      // 合约详情页
      // {
      //   path: 'contractDetail',
      //   name: 'contractDetail',
      //   component: () => import('@/views/pc/pages/contractDetail')
      // },
      // 跨链合约详情页
      // {
      //   path: 'crossChainContractDetail',
      //   name: 'crossChainContractDetail',
      //   component: () => import('@/views/pc/pages/crossChainContractDetail')
      // },
      // 区块高度
      {
        path: 'blockHeight',
        name: 'blockHeight',
        component: () => import('@/views/pc/pages/blockHeight')
      },
      //xto列表
      {
        path: 'xtoList',
        name: 'xtoList',
        component: () => import('@/views/pc/pages/xtoInfo/xtoList')
      },
      //xto详情
      {
        path: 'xtoDetail',
        name: 'xtoDetail',
        component: () => import('@/views/pc/pages/xtoInfo/xtoDetail')
      },
      {
        path: 'committee',
        name: 'committee',
        component: () => import('@/views/pc/pages/committee/committeeList')
      }
    ]
  },
];


export default routerPc;