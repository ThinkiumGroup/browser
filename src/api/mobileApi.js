import request from '@/utils/request'


export function getHeaderData(data) {
  return request({
    url: '/v1/getHeader',
    method: 'get',
    data,
  })
}


export function getNodeOrPool(data) {
  return request({
    url: '/v1/getNodeOrPool',
    method: 'post',
    data,
  })
}


export function getBlockHeight(data) {
 
  return request({
    url: '/v1/blockHeight',
    method: 'post',
    data,
  })
}


export function getChainList() {
  return request({
    url: '/v1/chainList',
    method: 'get',
  })
}



export function getBlockDetails(data) {
  return request({
    url: '/v1/blockDetails',
    method: 'post',
    data,
  })
}

export function getTaskAddressDetails(data) {
  return request({
    url: '/v1/addressDetails',
    method: 'post',
    data,
  })
}

export function getaddressDetails(data) {
  return request({
    url: '/v1/tradingListOfAddressDetails',
    method: 'post',
    data,
  })
}


export function getTransactionList(data) {
  return request({
    url: '/v1/transactionList',
    method: 'post',
    data,
  })
}

export function getTradingList(data) {
  return request({
    url: '/v1/tradingList',
    method: 'post',
    data,
  })
}


export function getTradingDetails(data) {
  return request({
    url: '/v1/tradingDetails',
    method: 'post',
    data,
  })
}


export function getTxType() {
  return request({
    url: '/v1/getTxType',
    method: 'get',
  })
}


export function blockHeightAndNumberOfTaskChains(data) {
  return request({
    url: '/v1/blockHeightAndNumberOfTaskChains',
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
