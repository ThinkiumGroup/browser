import request from '@/utils/request'

// 获取首页圈圈里的信息
export function circleInfo() {
  return request({
    url: '/v1/getHeader',
    method: 'get',
    params: {}
  })
}

// 数据节点/共识节点/矿池--详情
export function nodeOrPoolDetail(data) {
  return request({
    url: '/v1/getNodeOrPool',
    method: 'post',
    data
  })
}

//区块高度和任务链
export function blockHeightAndNumberOfTaskChains(data) {
  return request({
    url: '/v1/blockHeightAndNumberOfTaskChains',
    method: 'post',
    data
  })
}

// 已分片任务链
export function fragmentedTaskChain() {
  return request({
    url: '/v1/fragmentedTaskChain',
    method: 'get',
    params: {}
  })
}

// 未分片任务链
export function notFragmentedTaskChain() {
  return request({
    url: '/v1/notFragmentedTaskChain',
    method: 'get',
    params: {}
  })
}

//获取区块高度
export function blockHeight(data) {
  return request({
    url: '/v1/blockHeight',
    method: 'post',
    data
  })
}


//一个块高列表
export function blockHeightOne(data) {
  return request({
    url: '/v1/blockHeightOne',
    method: 'post',
    data
  })
}

//交易详情
export function tradingDetails(data) {
  return request({
    url: '/v1/tradingDetails',
    method: 'post',
    data
  })
}

//区块详情
export function blockDetails(data) {
  return request({
    url: '/v1/blockDetails',
    method: 'post',
    data
  })
}

//获取交易类型
export function getTxType() {
  return request({
    url: '/v1/getTxType',
    method: 'get',
    params: {}
  })
}

//链的列表数据
export function chainList() {
  return request({
    url: '/v1/chainList',
    method: 'get',
    params: {}
  })
}

//交易信息列表
export function tradingList(data) {
  return request({
    url: '/v1/tradingList',
    method: 'post',
    data
  })
}

//地址详情任务链数据
export function addressDetails(data) {
  return request({
    url: '/v1/addressDetails',
    method: 'post',
    data
  })
}

//代币转账列表
export function tokenTransfer(data) {
  return request({
    url: '/v1/tokenTransfer',
    method: 'post',
    data
  })
}

//代币持有列表
export function tokenHoldings(data) {
  return request({
    url: '/v1/tokenHoldings',
    method: 'post',
    data
  })
}

//请求代币详情列表头
export function currencyDetails(data) {
  return request({
    url: '/v1/currencyDetails',
    method: 'post',
    data
  })
}

//地址详情列表展示xto列表
export function xtoList(data) {
  return request({
    url: '/v1/tokenHoldingsByAddress',
    method: 'post',
    data
  })
}

//校验地址类型
export function checkAddress(data) {
  return request({
    url: '/v1/checkAddress',
    method: 'post',
    data
  })
}

//查看内部交易记录
export function insideTransactionList(data) {
  return request({
    url: '/v1/getTxLogList',
    method: 'post',
    data
  })
}

//103转账记录
export function traingListInOneZeroThree(data) {
  return request({
    url: '/v1/traingListInOneZeroThree',
    method: 'post',
    data
  })
}

//通过块高查询交易
/**
 * 
 * @param {Number} chainId
 * @param {Number} blockHeight
 */
export function tradingListInBlockHeight(data) {
  return request({
    url: '/v1/tradingListInBlockHeight',
    method: 'post',
    data
  })
}