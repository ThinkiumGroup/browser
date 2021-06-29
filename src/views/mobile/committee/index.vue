<template>
  <div class="committee-contianer">
    <RetrunHeader :title="$t('title.committee_information')" />
    <div class="committee-body">
      <Searchaddress />
      <div class="committee-nav committee-block">
        <div
          @click="handleClick(item)"
          v-for="item in MenuChain"
          :class="[
            'committee-nav-item',
            { 'committee-nav-item-active': item.chainId == activeId },
          ]"
          :key="item.chainId"
        >
          {{$t(item.chainName)}}
        </div>
      </div>
      <div class="committee-block committee-data-contianer">
        <CardNav
          :titleStyle="{ color: '#666 !important' }"
          :isMore="false"
          :title="$t('item.current_committee_rounds')"
        >
          <div class="title-slot" slot="title-slot">#{{runRound}}</div>
        </CardNav>
        <div class="committee-data-list">
          <div class="table-head table-rows">
            <div>序号</div>
            <div>节点ID</div>
          </div>
          <div v-for="(item, index) in runUserInfo" :key="index" class="table-rows">
            <div>1</div>
            <div style="padding-right: 1.1rem">
             {{item}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RetrunHeader from "../components/RetrunHeader";
import Searchaddress from "../components/Searchaddress";
import CardNav from "../components/CardNav";
import { blockHeightAndNumberOfTaskChains, getBlockDetails } from '@/api/mobileApi';

export default {
  components: {
    RetrunHeader,
    CardNav,
    Searchaddress,
  },
  data() {
    return {
      MenuChain: [],
      activeId: 0,
      runUserInfo: [],
      runRound: ''
    };
  },
  created() {
    this.getChainData()
  },
  methods: {
    handleClick({ chainId, blockHeight }) {
      this.activeId = chainId;
      this.getBlockData(chainId, blockHeight)
    },
    getBlockData(chainId, blockHeight) {
      const data = { 
      blockHeight,
      chainId,
    };
    getBlockDetails(data).then((res) => {
      this.runRound =  res.data.runRound
       this.runUserInfo = res.data.runUserInfo
    });
    },
    async getChainData() {
      const { data } = await blockHeightAndNumberOfTaskChains({chainId: 0})
      this.MenuChain = [
        {
          chainId: data.chainId,
          chainName: data.chainName,
          blockHeight: data.blockHeight,
        },
        ...data.noFragmentedTaskChain
      ]
     
      this.getBlockData(data.chainId, data.blockHeight)
    },
  },
};
</script>
<style lang="scss" scoped>
.committee-contianer {
  height: 100%;
  display: flex;
  flex-direction: column;
  .committee-body {
    flex: 1;
    overflow: auto;
    padding: 1.08rem 0.68rem;
    .committee-block {
      margin-top: 0.78rem;
      background-color: white;
      border-radius: 0.2rem;
      box-shadow: 0px 0.2rem 0.42rem 0.12rem rgba(186, 177, 212, 0.16);
    }
    .title-slot {
      padding-left: 10px;
      @include font-color("primary");
    }
    .committee-nav {
      display: flex;
      justify-content: space-between;
      padding: 0.4rem 0.72rem;
      margin-bottom: 0.8rem;
      .committee-nav-item {
        width: 2.44rem;
        padding: 0.26rem 0;
        border: 1px solid #d2d2d2;
        border-radius: 0.1rem;
        text-align: center;
        color: #666666;
        font-size: 0.52rem;
        font-weight: bold;
      }
      .committee-nav-item-active {
        color: white;
        @include background-color("primary");
        @include border-color("primary");
      }
    }
    .committee-data-contianer {
      .committee-data-list {
        .table-head {
          display: flex;
          padding: 0.3rem 0;
          div {
            text-align: center;
            font-size: 0.52rem;
            font-weight: bold;
            @include font-color("primary");
          }
        }
        .table-rows {
          display: flex;
          padding: 0.3rem 0;
          border-top: 1px solid #f6f4fb;
          div {
            text-align: center;
            font-size: 0.52rem;
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
        }
      }
    }
  }
}
</style>