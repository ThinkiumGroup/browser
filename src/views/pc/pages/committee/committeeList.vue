<template>
  <div>
    <div class="main-title">{{$t('title.委员会信息')}}</div>
    <div class="common-header tab-wrap">
      <div class="tab-item" :class="{'active': activeChainId == item.chainId}" @click="handleClick(item.chainId, item.blockHeight)" v-for="(item,index) in tabList" :key="index">{{$t(item.chainName)}}</div>
    </div>
    <div class="content-wrap common-block">
      <div class="header">
        <span>{{$t('title.当前委员会参选轮次')}}：</span>
        <span class="value">#{{runRound}}</span>
      </div>
      <el-table style="width: 100%" border :data="runUserInfo">
        <el-table-column width="250px" type="index" :label="$t('table.order')"  align="center" ></el-table-column>
        <el-table-column prop="data" :label="$t('table.nodeID')"  align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { blockHeightAndNumberOfTaskChains, blockDetails } from '@/api/pcApi.js'
export default {
  name: 'committee',
  data() {
    return {
      tabList: [],
      activeChainId: 0,
      runUserInfo: [],
      runRound: 0
    }
  },
  created() {
    this.getBlockHeightAndNumberOfTaskChains()
  },
  methods: {
    handleClick(chainId,blockHeight) {
      this.activeChainId = chainId
      this.getBlockDetails(blockHeight)
    },
    // 区块高度和任务链
    async getBlockHeightAndNumberOfTaskChains() {
      let data = {
        chainId: 0
      }
      let res = await blockHeightAndNumberOfTaskChains(data)
      let chain_data = res.data
      let resultArr = res.data.noFragmentedTaskChain
      resultArr.unshift({
        chainId: chain_data.chainId,
        chainName: chain_data.chainName,
        blockHeight: chain_data.blockHeight,
      })
      console.log(resultArr)
      this.tabList = resultArr
      this.getBlockDetails(this.tabList[0].blockHeight)
    },
    async getBlockDetails(blockHeight) {
      this.runUserInfo = []
      let data = {
        chainId: this.$route.query.chainId,
        blockHeight: blockHeight
      }
      let res = await blockDetails(data)
      this.runRound = res.data && res.data.runRound
      this.runUserInfo = res.data && res.data.runUserInfo
      this.runUserInfo = this.runUserInfo.map(item => item = {data: item})
      console.log(this.runUserInfo,'this.runUserInfo')
    },
  }
}
</script>

<style lang="scss" scoped>
  .tab-wrap {
    margin-bottom: 0.3rem;
    .tab-item {
      padding: 0 0.3rem;
      min-width: 1.6rem;
      height: 0.4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #D2D2D2;
      border-radius: 0.05rem;
      color: #666666;
      font-size: 0.24rem;
      font-weight: bold;
      cursor: pointer;
    }
    .active {
      background: $themeColor;
      color: #FFFFFF;
    }
  }

  .content-wrap {
    .header {
      padding-left: 0.36rem;
      height: 0.61rem;
      display: flex;
      align-items: center;
      color: #666666;
      font-size: 0.24rem;
      font-weight: bold;
      .value {
        color: $themeColor;
      }
    }
  }

  /deep/ .el-table th>.cell {
    color: $themeColor;
    font-size: 0.2rem;
  }
</style>