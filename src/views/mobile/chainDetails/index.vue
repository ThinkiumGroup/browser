<template>
  <div class="mobile-chainDetails-container">
    
    <RetrunHeader :title="`${$t(routeParams.chainName)}${$t('title.details')}`" />
    
    <div class="mobile-chainDetails-body">
      
      
      <Searchaddress 
        :placeholder="$t('placeholder.placeholder_4')"
        :chainId="routeParams.chainId"
      />
      <div class="block-total-details">
        <div class="totla-details-item">
          <span>{{$t('title.current_block_height')}}</span>
          <p>{{blockData.length && blockData[0].blockHeight}}</p>
        </div>
        <div class="totla-details-item">
          <span>{{$t('title.consensus_committee_candidate_round')}}</span>
          <p>{{blockInfo.runRound}}{{$t('title.session')}}</p>
        </div>
        <div class="totla-details-item">
          <span>{{$t('title.whole_network_transaction')}}</span>
          <p>{{routeParams.txNum}}</p>
        </div>
      </div>
      
      <div class="mobile-chainDetails-block">
        <CardNav @loadMore="loadMoreBlock" :title="$t('title.block_information')"/>
        <div class="mobile-chainDetails-block-body">
          <PieceBlock
            :leftTopText="item.blockHeight"
            :leftBtmText="item.blockHash"
            :rightTopText="item.tradingTotal"
            :rightBtmText="item.timeStamp"
            :chainId="routeParams.chainId"
            v-for="(item, index) in blockData"
            :key="index"
            :blockStyle="index == blockData.length -1 ? 'border-bottom:0' : ''"
          />
        </div>
      </div>
      
      <div class="mobile-chainDetails-block">
        <CardNav @loadMore="loadMorecommittee" :title="$t('title.consensus_committee_candidate_round')">
          <div slot="title-slot" class="title-content">
            <span>{{blockInfo.runRound}}</span>
          
          </div>
        </CardNav>
        <div class="committee-box">
          <p 
            v-for="(item, index) in blockInfo.runUserInfo"
            :key="index"
          >
            {{`${item.substr(0,15)}***${item.substr(-15)}`}}
          </p>
        </div>
      </div>
      
      <div class="mobile-chainDetails-block">
       <CardNav @loadMore="loadMoreTrading" :title="$t('title.trading_information')"/>
        <div class="mobile-home-block-body">
          <TransactionBlock 
            v-for="(item, index) in transactionData" 
            :key="index"
            :leftTopText="item.tradingHash"
            :leftBtmText="$t(item.childTypeName || item.parentTypeName)"
            :rightTopText="scientificCounting(item.currencyAmount)"
            :rightBtmText="$t(item.chainName)"
          />
        </div>
      </div>
    
    </div>
  </div>
</template>
<script>
import {
  getTradingList,
  getBlockHeight,
  getBlockDetails
} from '@/api/mobileApi';
import RetrunHeader from '../components/RetrunHeader';
import Searchaddress from '../components/Searchaddress';
import PieceBlock from '../components/PieceBlock';
import Navigation from '../components/Navigation';
import TransactionBlock from '../components/TransactionBlock';
import CardNav from '../components/CardNav'
import _ from 'lodash'
import './style.scss';
export default {
  components: {
    RetrunHeader,
    Searchaddress,
    PieceBlock,
    Navigation,
    TransactionBlock,
    CardNav
  },
  created() {
   if( _.isEmpty(this.$route.params)) {
        this.routeParams = JSON.parse(localStorage.getItem('chainDetailData'))
   } else {
      this.routeParams = this.$route.params
      localStorage.setItem('chainDetailData', JSON.stringify(this.$route.params))
   }
    this.getData();
  },
  data() {
    return {
      selectValue: '',
      selectData: [],
      blockData: [],
      transactionData: [],
      routeParams: {},
      blockInfo: {},
    };
  },
  methods: {
    getData() {
     
      const data = {
        chainId: this.routeParams.chainId,
        page: 1,
        rows: 4
      };
      //获取区块列表
      getBlockHeight(data).then(res => {
        this.blockData = res.data.data;
        this.getBlockDetailsData(res.data.data[0].blockHeight)
      });
      //获取交易列表
      getTradingList(data)
        .then(res => {
          if(res.data == null) {
            this.transactionData = [];
          } else {
            this.transactionData = res.data.data;
          }
          
        })
    },
    async getBlockDetailsData(blockHeight) {
      const params = {
        chainId: this.routeParams.chainId,
        blockHeight
      };
      const { data } = await getBlockDetails(params)
      this.blockInfo = data

    },
    loadMoreBlock() {
      this.$router.push(
        `/allBlockHeight?chainId=${this.routeParams.chainId}`
      ); 
    },
    loadMorecommittee() {
       this.$router.push(
        `/committee`
      );
    },
    loadMoreTrading() {
       this.$router.push('/allTransaction')
      
    },
  }
};
</script>
