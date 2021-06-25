<template>
  <div class="mobile-allTransaction-container container-background-clor">
    <!-- 返回头部 -->
    <RetrunHeader :title="$t('title.trading_height')" />
    <!-- 详情主体 -->
    <div class="mobile-allTransaction-body">
       <Searchaddress/>

       <div class="mobile-allTransaction-search">
         <div class="mobile-allTransaction-selsect-item">
           <span class="allTransaction-selsect-label">所在链</span>
           <el-select v-model="selectChainValue" style="flex:1" size="mini">
             <el-option 
              v-for="(item, index) in selectChainData"
              :key="index"
              :value="item.chainId"
              :label="$t(item.chainName)"
            ></el-option>
           </el-select>
         </div>
         <div style="align-items: flex-start;" class="mobile-allTransaction-selsect-item">
           <span class="allTransaction-selsect-label">交易类型</span>
           <div class="select-box">
              <el-select 
                v-model="selectTransterType" 
                style="width:100%;margin-bottom:.6rem" 
                size="mini"
                @change="selectChange"
              >
                <el-option 
                  v-for="(item, index) in selectTransterTypeData"
                  :key="index"
                  :value="item.txType"
                  :label="$t(item.txTypeName)"
                ></el-option>
              </el-select>
              <el-select v-model="selectChildType"  style="width:100%" size="mini">
                <el-option 
                  v-for="(item, index) in selectChildData"
                  :key="index"
                  :value="item.txType"
                  :label="$t(item.txTypeName)"
                ></el-option>
              </el-select>
              <button @click="handeleClick">筛选</button>
           </div>
         </div>
       </div>
      <!-- 列表 -->
      <div
        class="mobile-allTransaction-body-list mobile-block"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="disabled"
        :style="{borderRadius: !currency && '.2rem'}"
      >
       <CardNav :isMore="false" title="交易信息"/>
        <TransactionBlock
          v-for="(item, index) in transactionData" 
          :key="index"
          :leftTopText="item.tradingHash"
          :leftBtmText="$t(item.parentTypeName)"
          :rightTopText="scientificCounting(item.currencyAmount)"
          :rightBtmText="$t(item.chainName)"
        />
        <Loading
          :isShowNoData="(!transactionData.length || noMore) && !trandingLoading"
          :loading="trandingLoading"
          :noDataText="$t('title.no_more')"
        />
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import { getChainList, getTradingList, getTxType } from '@/api/mobileApi';
import RetrunHeader from '../components/RetrunHeader';
import TransactionBlock from '../components/TransactionBlock';
import Searchaddress from '../components/Searchaddress';
import Loading from '../components/Loading';
import CardNav from '../components/CardNav'
import './style.scss';
export default {
  components: {
    RetrunHeader,
    TransactionBlock,
    Loading,
    Searchaddress,
    CardNav
  },
  data() {
    return {
      selectChainValue: '',
      selectChainData: [],
      selectTransterType: '',
      selectTransterTypeData: [],
      selectChildType: '',
      selectChildData: [{
        txType: "",
        txTypeName: "select.all",
      }],
      data: [],
      transactionData: [],
      total: 0,
      timeStamp: '',
      page: 1,
      tables: [],
      trandingLoading: true,
      address: '',
    };
  },
  computed: {
    disabled () {
      return this.trandingLoading || this.noMore
    },
    noMore() {
      return this.transactionData.length >= this.total
    }
  },
  async created() {
    this.currency = localStorage.currency
    this.address = _.get(this.$route, 'query.address', '');
    //获取链列表
    await getChainList().then(res => {
      this.selectChainData = res.data;
      this.selectChainData.unshift({ chainId: '', chainName: 'title.all' });
      
    });
    //获取交易列表
    this.getTransactionData();
    this.getTxTypeInfo()
  },
  methods: {
    //获取交易类型
    async getTxTypeInfo() {
      let res = await getTxType();
      this.selectTransterTypeData = res.data;
      this.selectTransterTypeData.unshift({
        txType: "",
        txTypeName: "select.all",
      });
    },
    getTransactionData() {
      const data = {
        address: this.address,
        chainId: this.selectChainValue,
        parentType: this.selectTransterType,
        childType: this.selectChildType,
        page: this.page,
        rows: 100,
        timeStamp: this.timeStamp,
        tables: this.tables,
      };
      getTradingList(data).then(res => {
        this.trandingLoading = false
        this.transactionData = [...this.transactionData, ...res.data.data];
        this.total = res.data.total;
        this.timeStamp = res.data.data[res.data.data.length - 1].timeStamp;
        this.tables = res.data.data.map(v => ({tableId: v.tableId, tableName: v.tableName }))
      });
    },
    selectChange(e) {
      this.selectChildData = []
      this.selectChildType = ''
      const item = this.selectTransterTypeData.find(v => v.txType == e)
      this.selectChildData = item.childrens
      if(item.txType == 3) {  
        this.selectChildData = JSON.parse(JSON.stringify([item.childrens[2],item.childrens[3]]))
      } else {
        this.selectChildData = JSON.parse(JSON.stringify(item.childrens))
      }
      this.selectChildData.unshift({
        txType: '',
        txTypeName: 'select.all'
      })
    },
  
    handeleClick() {
      this.trandingLoading = true
      this.transactionData = []
      this.page = 1
      this.total = 0
      this.tables = []
      this.timeStamp = ''
      this.getTransactionData()
    },
    loadMore() {
      this.page++
      this.trandingLoading = true;
     
      this.getTransactionData();
    },
  }
};
</script>
