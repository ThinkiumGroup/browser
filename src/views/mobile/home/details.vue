<template>
  <div class="mobile-home-detail-container">
    <RetrunHeader :title="$t('title.node_information')" />
    <div class="mobile-home-detail-body">
      <Searchaddress/>
      <div class="mobile-block">
        <CardNav :isMore="false" :title="$t('title.data_node_2')"/>
        <div class="table-head table-rows ">
          <div>{{$t('table.order')}}</div>
          <div class="node-id">{{$t('table.nodeID')}}</div>
          
        </div>
        <div 
          class="table-rows" 
          v-for="(item, index) in nodeData "
          :key="index"
        >
          <div>{{index + 1}}</div>
          <div class="node-id">{{setStr(item.idStr )}}</div>
          
        </div>
      </div>
      <div class="mobile-block">
        <CardNav :isMore="false" :title="$t('title.mining_pool_2')"/>
        <div class="table-head table-rows ">
          <div>{{$t('table.order')}}</div>
          <div style="padding-left:1rem">{{$t('title.mining_pool_name')}}</div>
          <div style="width:4rem">{{$t('table.remainingAmount')}}</div>
        </div>
        <div 
          class="table-rows" 
          v-for="(item, index) in poolData "
          :key="index"
        >
          <div>{{index + 1}}</div>
          <div>{{item.idStr}}</div>
          <div>{{item.data}}</div>
        </div>
      </div>
      <div class="mobile-block">
        <CardNav :isMore="false" :title="$t('title.consensus_node_2')"/>
        <div class="table-head table-rows ">
          <div>{{$t('table.order')}}</div>
          <div class="node-id">{{$t('table.nodeID')}}</div>
          
        </div>
        <div 
          class="table-rows" 
          v-for="(item, index) in consensusData "
          :key="index"
        >
          <div>{{index + 1}}</div>
          <div  class="node-id">{{setStr(item.idStr)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getNodeOrPool } from '@/api/mobileApi';
import RetrunHeader from '../components/RetrunHeader';
import Loading from '../components/Loading';
import Searchaddress from '../components/Searchaddress';
import CardNav from '../components/CardNav'
export default {
  components: {
    RetrunHeader,
    Loading,
    Searchaddress,
    CardNav
  },
  data() {
    return {
      title: '',
      type: 0,
      nodeData: [],
      poolData: [],
      consensusData: [],
      loading: true,
    };
  },
  computed: {
    noMore() {
      return this.data.length >= this.total
    },
  },
  created() {
    this.getData();
  },
  methods: {
    setStr(item) {
      return `${item.substr(0,8)}***${item.substr(-8)}`
    },
    getData(type) {
      getNodeOrPool({ type: 1, rows: 1000 }).then((res) => {
        this.loading = false
        this.nodeData = res.data.data;
      
      });
      getNodeOrPool({ type: 2, rows: 1000 }).then((res) => {
        this.loading = false
        this.consensusData = res.data.data;
        
      });
      getNodeOrPool({ type: 3, rows: 1000 }).then((res) => {
        this.loading = false
        this.poolData = res.data.data;
       
      });
    },
  },
};
</script>

<style scoped lang="scss">
.mobile-home-detail-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .mobile-block {
    margin-top: .78rem;
    background-color: white;
    border-radius: .2rem;
    box-shadow: 0px .2rem .42rem .12rem rgba(186, 177, 212, 0.16);
  }
  .mobile-home-detail-body {
    flex: 1;
    overflow: auto;
    padding: 1.08rem .68rem;
    .table-head {
      display: flex;
       padding: 0.3rem 0;
      div {
        text-align: center;
        font-size: .52rem;
        font-weight: bold;
        @include font-color('primary')
      }
    }
    .table-rows {
      display: flex;
      padding: 0.3rem 0;
      border-top: 1px solid #F6F4FB;
      div {
       
        text-align: center;
        font-size: .52rem;
        font-weight: bold;
        color: #666;
      }
      & :nth-child(1) {
        width: 3rem;
       

      }
       & :nth-child(3) {
        width: 3rem;
        

      }
      & :nth-child(2) {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

      }
      .node-id {
        padding-right: .6rem;
      }
    }
  }
}
</style>