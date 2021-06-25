<template>
  <div class="mobile-home-container">
    <RetrunHeader  :isReturn="false" title="浏览器" />
    <div class="mobile-home-container-body">  
      <div class="mobile-home-title" v-if="currency">
        <div class="block-icon block-icon-left"></div>
        <p>{{$t('title.welcome_to_Blockchain_Explorer').replace('XXX',data.logoName)}}</p>
        <div class="block-icon block-icon-right"></div>
      </div>
      <Searchaddress />
      <div class="mobile-home-chain-detail" v-if="currency">
        <CardNav :title="$t('title.chain_details')" :isMore="false">
        </CardNav>
        <div class="mobile-home-chain-detail-body">
          <div @click="goChainDetail(blockData)" class="mobile-home-main-chain">
            <div class="main-chain-title">
              <p>{{$t(blockData.chainName)}}</p>
              <div class="triangle-icon"></div>
            </div>
            <p>{{$t('title.block')}}: <span>{{blockData.blockHeight}}</span></p>
            <img src="@/assets/images/index/mainChain.png"/>
          </div>
          <img class="mobile-home-chain-center" src="@/assets/images/index/center.png" >
          <div  @click="goChainDetail(auuountChainInfo)" class="mobile-home-reward-chain">
            <div class="chain-title">
              <p>{{$t(auuountChainInfo.chainName)}}</p>
              <img src="@/assets/images/index/link.png"/>
            </div>
            <div class="chain-content">
              <div class="chain-item">
                <p>{{$t('title.block')}}</p>
                <span>{{$t(auuountChainInfo.blockHeight)}}</span>
              </div>
              <div class="chain-item">
                <p>{{$t('title.transaction')}}</p>
                <span>{{$t(auuountChainInfo.txNum)}}</span>
              </div>
            </div>
          </div>
          <div class="mobile-home-transaction-chain">
            <div @click="goChainDetail(posChainInfo)"  class="chain-title">
              <p>{{$t(posChainInfo.chainName)}}</p>
                <img src="@/assets/images/index/tradeChain.png"/>
              </div>
              <div class="chain-content">
                <div class="chain-item" style="margin-right:0.1rem">
                  <p>{{$t('title.block')}}</p>
                  <span>{{$t(posChainInfo.blockHeight)}}</span>
                </div>
                <div class="chain-item">
                  <p>{{$t('title.transaction')}}</p>
                  <span>{{$t(posChainInfo.txNum)}}</span>
                </div>
              </div>
            </div>
          <div @click="goChainDetail(eCommerceChainInfo)" class="mobile-home-e-commerce-chain">
            <div class="chain-title">
              <p>{{$t(eCommerceChainInfo.chainName)}}</p>
              <img src="@/assets/images/index/dianshang.png"/>
            </div>
            <div class="chain-content">
              <div class="chain-item">
                <p>{{$t('title.block')}}</p>
                <span>{{$t(eCommerceChainInfo.blockHeight)}}</span>
              </div>
              <div class="chain-item">
                <p>{{$t('title.transaction')}}</p>
                <span>{{$t(eCommerceChainInfo.txNum)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mobile-home-transaction">
        <CardNav :title="$t('title.trading_information')" @loadMore="loadMoreTrading"/>
        <div class="mobile-home-transaction-list">
          <TransactionBlock 
            v-for="(item, index) in tradingData" 
            :key="index"
            :leftTopText="item.tradingHash"
            :leftBtmText="$t(item.parentTypeName)"
            :rightTopText="scientificCounting(item.currencyAmount)"
            :rightBtmText="$t(item.chainName)"
          />
        </div>
      </div>
      <div  class="mobile-home-node" v-if="data.dataNode && currency">
        <CardNav :title="$t('节点信息') + '（' + $t('title.total').replace('xxx',data.dataNode.num + data.oreBasins.num + data.independentConsensusNode.num) + '）'" @loadMore="loadMoreNode"/>
        <div class="mobile-home-node-list">
         <div class="mobile-home-node-list-item">
           <p>{{$t('title.data_node_2')}}</p>
           <span>{{$t('title.total').replace('xxx',data.dataNode.num)}}</span>
         </div>
          <div class="mobile-home-node-list-item">
           <p>{{$t('title.mining_pool_node')}}</p>
           <span>{{$t('title.total').replace('xxx',data.oreBasins.num)}}</span>
         </div>
          <div class="mobile-home-node-list-item">
           <p>{{$t('title.consensus_node_2')}}</p>
           <span>{{$t('title.total').replace('xxx',data.independentConsensusNode.num)}}</span>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getHeaderData,
  blockHeightAndNumberOfTaskChains,
  getTradingList,
} from '@/api/mobileApi';

import './style.scss';
import RetrunHeader from '../components/RetrunHeader'
import Searchaddress from '../components/Searchaddress'
import CardNav from '../components/CardNav'
import TransactionBlock from '../components/TransactionBlock'
import _ from 'lodash'
export default {
  components: {
    RetrunHeader,
    Searchaddress,
    CardNav,
    TransactionBlock
  },
  data() {
    return {
      data: {},
      auuountChainInfo: {},
      posChainInfo: {},
      eCommerceChainInfo: {},
      blockData: {},
      timer: null,
      tradingData: [],
      currency: '',
    };
  },
  created() {
    this.getData()
    this.getBlockData()
    this.getTradingData()
    clearInterval(this.timer)
    if(this.currency) {
      this.timer = setInterval(() => {
        this.getBlockData()
      }, 5000)
    }
    
  },
  beforeDestroy() {
  clearInterval(this.timer)
  },
  methods: {
    async getData() {
      const { data } = await getHeaderData()
      this.data = data
       this.currency = localStorage.currency
    },
    async getBlockData() {
      const { data } = await blockHeightAndNumberOfTaskChains({chainId: 0})
       this.blockData = data
      this.auuountChainInfo = _.get(data, 'noFragmentedTaskChain[0]', {})
      this.posChainInfo = _.get(data, 'noFragmentedTaskChain[1]', {})
      this.eCommerceChainInfo = _.get(data, 'noFragmentedTaskChain[2]', {})
    },
    async getTradingData() {
      const params = {
        address: '',
        chainId: '',
        page: 1,
        rows: 4,
      }
      if(!this.currency) {
        params.rows = 15
      }
      const { data } = await getTradingList(params)
      this.tradingData = data.data
    
    },
    goChainDetail(params) {
      this.$router.push({ name: 'chainDetails', params })
    },
    loadMoreTrading() {
       this.$router.push('/allTransaction')
      
    },
    loadMoreNode() {
       this.$router.push('/homeDetails')
    }
  }
  

};
</script>
<style lang="scss" >

</style>