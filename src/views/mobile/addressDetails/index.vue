<template>
  <div class="mobile-addressDetails-container container-background-clor">
    <!-- 返回头部 -->
    <RetrunHeader :title="$t('title.address_de')" v-if="!canNotBack"/>
    <div class="mobile-addressDetails-body">
      <Searchaddress/>
      <div class="mobile-addressDetails-head mobile-block">
        <div>
          <p>
            <span>{{$t('title.address')}}: </span>{{ to32Decimal(address) }}
            <img @click="copy(to32Decimal(address))" src="@/assets/images/address/copy.png" >
          </p>
        </div>
        <div>
          <p v-if="currency">
            <span>{{$t('title.holdings')}}: </span>{{taskData.currencyAmount}} {{currency}}
          </p>
        </div>
      </div>
      
      <!-- 详情头 -->
      <div 
        v-if="currency"
        class="mobile-addressDetails-body-detail mobile-block" 
      >
         <div class="addressDetails-body-title">
          <img src="@/assets/images/address/holdDetails.png" />
          <p>{{$t('title.持有详情')}}</p>
        </div>
        <div class="addressDetails-hold ">
          <div class="addressDetails-hold-item">
            <img src="@/assets/images/address/1.png" >
            <span>{{auuountChainInfo.currencyAmount || '--'}}</span>
            <p>{{$t(auuountChainInfo.taskChain)}}</p>
          </div>
           <div 
            style="border: 1px solid #F6F4FB;border-top:0;" 
            class="addressDetails-hold-item"
          >
            <img src="@/assets/images/address/2.png" >
            <span>{{posChainInfo.currencyAmount || '--'}}</span>
            <p>{{$t(posChainInfo.taskChain)}}</p>
          </div>
          <div class="addressDetails-hold-item">
            <img src="@/assets/images/address/3.png" >
            <span>{{eCommerceChainInfo.currencyAmount || '--'}}</span>
            <p>{{$t(eCommerceChainInfo.taskChain)}}</p>
          </div>
           <div style="width:50%;border-bottom:0;border-right:1px solid #F6F4FB" class="addressDetails-hold-item">
            <img src="@/assets/images/address/4.png" >
              <span>{{pocChainInfo.currencyAmount | toDivideZero}}</span>
            <p>{{$t(pocChainInfo.taskChain)}}</p> 
          </div>
           <div style="width:50%;border-bottom:0;" class="addressDetails-hold-item">
            <img src="@/assets/images/address/5.png" >
            <span>{{posLockChainInfo.currencyAmount | toDivideZero}}</span>
             <p>{{$t(posLockChainInfo.taskChain)}}</p> 
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <div
        class="mobile-addressDetails-body-list mobile-block"
      >
        <CardNav :isMore="data.length >= 5" :title="$t('title.外部交易')" @loadMore="loadMoreTrading" />
     
          <TransactionBlock
             v-for="(item, index) in data" 
            :key="index"
            :leftTopText="item.tradingHash"
            :leftBtmText="$t(item.childTypeName || item.parentTypeName)"
            :rightTopText="scientificCounting(item.currencyAmount)"
            :rightBtmText="$t(item.chainName)"
          />
       
      </div>
      <div
        class="mobile-addressDetails-body-list mobile-block"
      >
        <CardNav :isMore="blockData.length >= 5" :title="$t('title.内部交易')" @loadMore="loadMoreTrading" />
          <TransactionBlock
            type="internal"
            v-for="(item, index) in blockData" 
            :key="index"
            :leftTopText="item.transactionHash"
            :leftBtmText="item.blockNumber"
            :rightTopText="scientificCounting(item.currencyAmount)"
            :rightBtmText="to32Decimal(item.address)"
          />
       
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import { getTaskAddressDetails, getTradingList, insideTransactionList } from '@/api/mobileApi';
import RetrunHeader from '../components/RetrunHeader';
import TransactionBlock from '../components/TransactionBlock';
import Loading from '../components/Loading';
import Searchaddress from '../components/Searchaddress'
import CardNav from '../components/CardNav'
import PieceBlock from '../components/PieceBlock';
import copyFn from '@/utils/copy.js' 
import './style.scss';
export default {
  components: {
    RetrunHeader,
    TransactionBlock,
    Loading,
    Searchaddress,
    CardNav,
    PieceBlock
  },
  data() {
    return {
      data: [],
      taskData: {},
      type: 0,
      address: '',
      total: 0,
      timeStamp: '',
      page: 1,
      loading: false,
      taskLoading: false,
      parentType: '',
      childType: '',
      tables: [],
      blockData: [],
      auuountChainInfo: {},
      posChainInfo: {},
      eCommerceChainInfo: {},
      pocChainInfo: {},
      posLockChainInfo: {},
      currency: '',
      canNotBack: false,
    };
  },
  created() {
    this.currency = localStorage.currency
    this.address = _.get(this.$route, 'query.address', '');
    this.canNotBack = !!_.get(this.$route, 'query.canNotBack', '');
    getTaskAddressDetails({ address: this.address }).then(res => {
      this.taskData = res.data
      this.auuountChainInfo = _.get(res.data, 'taskChains[0]', {})
      this.posChainInfo = _.get(res.data, 'taskChains[1]', {})
      this.eCommerceChainInfo = _.get(res.data, 'taskChains[2]', {})
      this.pocChainInfo =  _.get(res.data, 'taskChains[0].taskChainChildren[0]', {})
      this.posLockChainInfo =  _.get(res.data, 'taskChains[1].taskChainChildren[0]', {})
    });
    this.getTradingData();
    this.insideTransactionList()
  },
  computed: {
    disabled() {
      return this.loading || this.noMore
    },
    noMore() {
      return this.data.length >= this.total
    }
  },
  methods: {
    getTradingData() {
      this.loading = true;
      const data = {
        timeStamp: this.timeStamp,
        address: this.address,
        parentType: this.parentType,
        childType: this.childType,
        page: this.page,
        rows: 5,
        tables: this.tables,
      };
      getTradingList(data).then(res => {
        const tradingData = res.data.data
        this.data = [...this.data, ...tradingData];
        this.total = res.data.total;
        this.loading = false;
      });
    },
    insideTransactionList() {
      const data = {
        address: this.address,
        orderType: '',
        page: 1,
        rows: 5
      };
        insideTransactionList(data).then(res => {
        this.blockData = res.data.data;
      });
    },
    copy(val) {
      copyFn(val)
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    loadMoreTrading() {
      this.$router.push(`/allTransaction?address=${this.address}`)
    }
    
  }
};
</script>