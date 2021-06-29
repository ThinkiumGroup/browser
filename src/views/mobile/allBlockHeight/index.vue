<template>
  <div class="mobile-allBlockHeight-container container-background-clor">
    
    <RetrunHeader :title="$t('title.block_height')" />
    
    <div class="mobile-allBlockHeight-body">
      <Searchaddress/>
      
      <div
        class="mobile-allBlockHeight-body-list"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="disabled"
        :style="{borderRadius: !currency && '.2rem'}"
      >
         <CardNav :isMore="false" title="主链块高">
           <div style="padding-left:0.2rem" slot="title-slot">33434</div>
          </CardNav>
          <PieceBlock
           :leftTopText="item.blockHeight"
            :leftBtmText="item.blockHash"
            :rightTopText="item.tradingTotal"
            :rightBtmText="item.timeStamp"
            :chainId="chainId"
            v-for="(item, index) in blockData"
            :key="index"
            :blockStyle="index == blockData.length -1 ? 'border-bottom:0' : ''"
          />
        <Loading
          :isShowNoData="(!blockData.length || noMore) && !blockLoading"
          :loading="blockLoading"
          :noDataText="$t('title.no_more')"
        />
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import RetrunHeader from '../components/RetrunHeader';
import PieceBlock from '../components/PieceBlock';
import Loading from '../components/Loading';
import Searchaddress from '../components/Searchaddress';
import { getChainList, getBlockHeight } from '@/api/mobileApi';
import CardNav from '../components/CardNav'
import './style.scss';
export default {
  components: {
    RetrunHeader,
    PieceBlock,
    Loading,
    Searchaddress,
    CardNav
    
  },
  async created() {
    this.currency = localStorage.currency
    this.blockHeight = _.get(this.$route, 'query.block', '')
    this.chainId = _.get(this.$route, 'query.chainId', '')
    //获取下拉框的数据
    await getChainList().then(res => {
      this.selectData = res.data;
      this.selectValue =res.data[0].chainId
    });
    //获取区块列表
    this.getBlockHeightData();
  },
  data() {
    return {
      selectValue: 0,
      selectData: [],
      chainId: 9,
      blockData: [],
      blockHeight: 0,
      page: 1,
      total: 0,
      currency: '',
      blockLoading: true,
    };
  },
  computed: {
    disabled () {
      return this.blockLoading || this.blockData.length > this.total
    },
    noMore() {
      return this.blockData.length >= this.total
    }
  },
  methods: {
    getBlockHeightData() {
      const data = {
        chainId: this.chainId || 0,
        blockHeight: this.blockHeight || 13050813,
        page: this.page,
        rows: 20,
      };
      getBlockHeight(data).then(res => {
        this.blockLoading = false
        this.blockData = [...this.blockData, ...res.data.data]
        this.total = res.data.total
        this.blockHeight = res.data.data[9].blockHeight
      });
    },
    handleChange() {
      this.chainId = this.selectValue
      this.page = 1
      this.total = 0
      this.blockData = []
      this.blockHeight = ''
      this.blockLoading = true
      this.getBlockHeightData()
    },
    loadMore() {
      this.page++
      this.blockLoading = true
      this.getBlockHeightData()
      
    },
  }
};
</script>
