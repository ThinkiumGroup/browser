import request from '@/utils/request'

// 首页获取头部数据
export function getHeaderData(data) {
  return request({
    url: '/v1/getHeader',
    method: 'get',
    data,
  })
}

// 数据节点/共识节点/矿池--详情
export function getNodeOrPool(data) {
  return request({
    url: '/v1/getNodeOrPool',
    method: 'post',
    data,
  })
}

//区块高度
export function getBlockHeight(data) {
 
  return request({
    url: '/v1/blockHeight',
    method: 'post',
    data,
  })
}

//链的列表数据
export function getChainList() {
  return request({
    url: '/v1/chainList',
    method: 'get',
  })
}


//区块详情
export function getBlockDetails(data) {
  return request({
    url: '/v1/blockDetails',
    method: 'post',
    data,
  })
}
//地址详情任务链数据
export function getTaskAddressDetails(data) {
  return request({
    url: '/v1/addressDetails',
    method: 'post',
    data,
  })
}
//地址详情列表
export function getaddressDetails(data) {
  return request({
    url: '/v1/tradingListOfAddressDetails',
    method: 'post',
    data,
  })
}

//交易列表
export function getTransactionList(data) {
  return request({
    url: '/v1/transactionList',
    method: 'post',
    data,
  })
}
//交易列表 和地址详情列表接口
export function getTradingList(data) {
  return request({
    url: '/v1/tradingList',
    method: 'post',
    data,
  })
}

//交易详情
export function getTradingDetails(data) {
  return request({
    url: '/v1/tradingDetails',
    method: 'post',
    data,
  })
}

//获取交易类型
export function getTxType() {
  return request({
    url: '/v1/getTxType',
    method: 'get',
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

//查看内部交易记录
export function insideTransactionList(data) {
  return request({
    url: '/v1/getTxLogList',
    method: 'post',
    data
  })
}
