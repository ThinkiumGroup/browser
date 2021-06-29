import request from '@/utils/request'


export function circleInfo() {
  return request({
    url: '/v1/getHeader',
    method: 'get',
    params: {}
  })
}


export function nodeOrPoolDetail(data) {
  return request({
    url: '/v1/getNodeOrPool',
    method: 'post',
    data
  })
}


export function blockHeightAndNumberOfTaskChains(data) {
  return request({
    url: '/v1/blockHeightAndNumberOfTaskChains',
    method: 'post',
    data
  })
}


export function fragmentedTaskChain() {
  return request({
    url: '/v1/fragmentedTaskChain',
    method: 'get',
    params: {}
  })
}


export function notFragmentedTaskChain() {
  return request({
    url: '/v1/notFragmentedTaskChain',
    method: 'get',
    params: {}
  })
}


export function blockHeight(data) {
  return request({
    url: '/v1/blockHeight',
    method: 'post',
    data
  })
}



export function blockHeightOne(data) {
  return request({
    url: '/v1/blockHeightOne',
    method: 'post',
    data
  })
}


export function tradingDetails(data) {
  return request({
    url: '/v1/tradingDetails',
    method: 'post',
    data
  })
}


export function blockDetails(data) {
  return request({
    url: '/v1/blockDetails',
    method: 'post',
    data
  })
}


export function getTxType() {
  return request({
    url: '/v1/getTxType',
    method: 'get',
    params: {}
  })
}


export function chainList() {
  return request({
    url: '/v1/chainList',
    method: 'get',
    params: {}
  })
}


export function tradingList(data) {
  return request({
    url: '/v1/tradingList',
    method: 'post',
    data
  })
}


export function addressDetails(data) {
  return request({
    url: '/v1/addressDetails',
    method: 'post',
    data
  })
}


export function tokenTransfer(data) {
  return request({
    url: '/v1/tokenTransfer',
    method: 'post',
    data
  })
}


export function tokenHoldings(data) {
  return request({
    url: '/v1/tokenHoldings',
    method: 'post',
    data
  })
}


export function currencyDetails(data) {
  return request({
    url: '/v1/currencyDetails',
    method: 'post',
    data
  })
}


export function xtoList(data) {
  return request({
    url: '/v1/tokenHoldingsByAddress',
    method: 'post',
    data
  })
}


export function checkAddress(data) {
  return request({
    url: '/v1/checkAddress',
    method: 'post',
    data
  })
}


export function insideTransactionList(data) {
  return request({
    url: '/v1/getTxLogList',
    method: 'post',
    data
  })
}


export function traingListInOneZeroThree(data) {
  return request({
    url: '/v1/traingListInOneZeroThree',
    method: 'post',
    data
  })
}


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