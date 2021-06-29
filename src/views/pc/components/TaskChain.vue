<template>
  
  <div class="page-wrap">
    <div class="main-title">{{$t(chainName)}}{{$t('title.details')}}</div>
    <div class="common-header header-wrap">
      <div>
        <div class="dot"></div>
        <span class="label">{{$t('title.current_block_height')}}</span>
        <span class="left-value">{{all_block_data[0] && all_block_data[0].blockHeight}}</span>
      </div>
      <div>
        <div class="dot"></div>
        <span class="label">{{$t('title.consensus_committee_candidate_round')}}</span>
        <span class="left-value">{{runRound}}</span>
        <span class="unit">{{$t('title.session')}}</span>
      </div>
      <div>
        <div class="dot"></div>
        <span class="label">{{$t('title.whole_network_transaction')}}</span>
        <span class="left-value">{{allTransaction}}</span>
      </div>
    </div>
    <div class="content-wrap">
      <div class="content-right">
        <div class="content-right-top common-block">
          <div class="header">
            <div class="header-left">
              <div class="bar"></div>
              <span>{{$t("title.block_information")}}</span>
            </div>
            <div class="more-wrap" @click="moreBlockInformation()">
              <span>{{$t('title.more')}}</span>
              <img  src="@/assets/images/index/more.png" alt="">
            </div>
          </div>
          <div class="row-item-wrap" v-loading="blockLoading">
            <div class="row-item" v-for="(item,index) in all_block_data" :key="index">
              <div>
                <div class="type-wrap">
                  <img src="@/assets/images/block/block2.png" alt="">
                  <span class="hash-value color-choose" @click="toBlockChainDetail(chainId,item.blockHeight)">{{item.blockHeight}}</span>
                </div>
                <span class="gasFee-value">{{item.tradingTotal}}{{$t('title.transaction')}}</span>
              </div>
              <div>
                <div style="color:#666">
                  <el-tooltip :content="item.blockHash" placement="top-start">
                    <span>{{$t('table.block_hash')}}：{{sliceHash(item.blockHash)}}</span>
                  </el-tooltip>
                </div>
                <span class="chain-name">{{timestampToTime(item.timeStamp)}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="content-right-bottom common-block">
          <div class="header">
            <div class="header-left">
              <div class="bar"></div>
              <span>{{$t('title.consensus_committee_candidate_round')}}：</span>
              <span class="special">{{runRound}}</span>
              
            </div>
            <div class="more-wrap" @click="toCommitteeList()">
              <span>{{$t('title.more')}}</span>
              <img  src="@/assets/images/index/more.png" alt="">
            </div>
          </div>
          <div class="run-round-wrap" v-loading="roundLoading">
            <div class="run-round-item" v-for="(item,index) in runUserInfo.slice(0, 5)" :key="item">
              <el-tooltip :content="item" placement="top">
                <span :class="{'highlight': index == 2}">{{sliceHash(item,8)}}</span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="content-left common-block">
        <div class="header">
          <div class="header-left">
            <div class="bar"></div>
            <span>{{$t('title.trading_information')}}</span>
          </div>
          <div class="more-wrap" @click="toTransactionInformation()">
            <span>{{$t('title.more')}}</span>
            <img  src="@/assets/images/index/more.png" alt="">
          </div>
        </div>
        <div class="total-wrap">
          <img src="@/assets/images/tradeDetail/trade-mark.png" alt=""> 
          <div class="right-wrap">{{$t('title.current_total')}}<span> {{tradeTotal}} </span>{{$t('title.transactions')}}</div>
        </div>
        <div class="table-wrap">
          <tradeInfoList v-loading="tradeLoading" :isShow="chainId == 0 ? true : false" :trData="trData" :currencyPc="currencyPc"></tradeInfoList>
        </div>
      </div>
    </div>
    
    <!-- <div class="con-title">
      {{$t("title.blockchain_details")}}:
      <span>{{$t(chainName)}}</span>
    </div> -->
      <!-- <div class="search-wrap">
        <div class="search-name-wrap">
          <div class="search-name ">{{$t("title.block_details_query")}}</div>
        </div>
        <div class="search-content">
          <div class="search-input-wrap">
            <span class="el-icon-search input-icon-search"></span>
            <el-input @input="chainId == 0 ? handInputNum() : handInput()" v-model="searchValue"
                      :placeholder="$t(chainId == 0 ? 'placeholder.placeholder_1' : 'placeholder.placeholder_3')"></el-input>
          </div>
          <el-button type="primary" @click="blockHeightQuery()">{{$t("placeholder.search")}}
          </el-button>
        </div>
      </div> -->
    <!-- <div class="con-title " style="margin-top: 30px" v-if="chainId == 0">
      {{$t("title.split_subchain")}}
    </div> -->
    
    <!-- <el-table
      v-if="chainId == 0"
      :data="chainStatA"
      style="width: 100%;margin-bottom: 30px;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
      v-loading="loading"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.subchain_id')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose" @click="toTaskChain(scope.row.taskChainId)">{{(scope.row.taskChainId)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose" @click="toBlockChainDetail(scope.row.taskChainId,scope.row.blockHeight, 0)">{{scope.row.blockHeight}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.number_of_fragments')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose">{{scope.row.fragmentedNum}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.total_share_of_its_segmented_chain')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose">{{scope.row.txCount}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="con-title " v-if="chainId == 0">
      {{$t("title.unfragmented_subchain")}}
    </div> -->
    
    <!-- <el-table
      v-if="chainId == 0"
      :data="chainStatB"
      style="width: 100%;margin-bottom: 30px;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
      v-loading="loading1"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.subchain_id')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose" @click="toTaskChain(scope.row.taskChainId)">{{(scope.row.taskChainId)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose" @click="toBlockChainDetail(scope.row.taskChainId,scope.row.blockHeight, 1)">{{scope.row.blockHeight}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.trading_volume')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose">{{scope.row.txCount}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="con-title " style="margin-top: 80px">
      {{$t("title.block_information")}}
    </div> -->
    
    <!-- <el-table
      :data="all_block_data"
      style="width: 100%;margin-bottom: 30px;min-height: 529px;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
      v-loading="loading2"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class=" color-choose" @click="toBlockChainDetail(chainId,scope.row.blockHeight)">{{scope.row.blockHeight}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_hash')"
        align="center">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.blockHash" placement="top-start">
            <span class="color-choose" @click="toBlockChainDetail(chainId,scope.row.blockHeight,scope.row.blockHash)">{{sliceHash(scope.row.blockHash)}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.timestamp')"
        align="center">
        <template slot-scope="scope">
          <span>{{timestampToTime(scope.row.timeStamp)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="width: 100%;margin-bottom: 50px;margin-top: 20px" type="primary" @click="moreBlockInformation()">
      {{$t("placeholder.view_all_blocks")}}
    </el-button>
    <div class="con-title ">
      {{$t(chainId == 0 ? "title.whole_network_transaction_information" : "title.current_chain_transaction_information")}}
    </div>
    <tradeInfoList :isShow="chainId == 0 ? true : false" :trData="trData" :currencyPc="currencyPc"></tradeInfoList>
    <el-button style="width: 100%;margin-bottom: 50px;margin-top: 20px" type="primary"
               @click="moreTransactionInformation()">
      {{$t("title.see_more_deals")}}
    </el-button> -->
  </div>

</template>

<script>
  import { notFragmentedTaskChain, fragmentedTaskChain, blockDetails, tradingList, blockHeight } from '@/api/pcApi'
  import tradeInfoList from '../components/TradeInfoList'
  export default {
    components: {tradeInfoList},
    name: 'taskChain',
    data() {
      return {
        tradeTotal: 0,
        currencyPc: '',
        pageType: 0,
        searchValue: '',
        tableData: [],
        chain_data: '',
        chainStatA: [],
        chainStatB: [],
        trData: [],
        loading: false,
        loading1: false,
        loading2: false,
        loading3: false,
        chain_list: {},
        all_block_data: [],
        chainId: '',
        chainName: '',
        runUserInfo: [],
        runRound: 0,
        allTransaction: 0,
        tradeLoading: false,
        blockLoading: false,
        roundLoading: false
      }
    },
    methods: {
      toCommitteeList() {
        this.$router.push({path: '/committee'})
      },
      /*查看更多交易信息*/
      toTransactionInformation() {
          this.$router.push({path: 'tradeList'})
      },
      //已分片任务链
      async getFragmentedTaskChain() {
        let res = await fragmentedTaskChain()
        this.chainStatA = res.data.data
      },
      //未分片任务链
      async getNotFragmentedTaskChain() {
        let res = await notFragmentedTaskChain()
        this.chainStatB = res.data.data
      },
      /*区块高度列表*/
      getBlockHeight() {
        this.blockLoading = true
        let data = {
            blockHeight: '',
            chainId: this.$route.query.chainId,
            page: 1,
            rows: 4,
          }
        blockHeight(data).then(response => {
          this.blockLoading = false
          this.all_block_data = response.data.data
          this.getBlockDetails(this.all_block_data[0].blockHeight)
        })
      },
      async getBlockDetails(blockHeight) {
        this.roundLoading = true
        let data = {
          chainId: this.$route.query.chainId,
          blockHeight: blockHeight
        }
        let res = await blockDetails(data)
        this.roundLoading = false
        this.runRound = res.data && res.data.runRound
        this.runUserInfo = res.data && res.data.runUserInfo
      },
      // 获取本链交易信息
      async getTradingList() {
        this.tradeLoading = true
        let chainId = this.chainId == 0 ? '' : this.chainId
        let data = {
          chainId: chainId,
          address: "",
          page: 1,
          rows: 6
        }
        let res = await tradingList(data)
        this.tradeLoading = false
        this.trData = res.data.data
        this.tradeTotal = res.data.total
      },
      /*点击主链跳转到任务链页面*/
      toTaskChain(val) {
        this.$router.push({
          path: 'taskChain',
          query: {
            chainId: val
          }
        })
      },
      /*只能输入数字*/
      handInputNum() {
        if (/[^\d]/.test(this.searchValue)) {
          this.searchValue = this.searchValue.replace(/[^\d]/g, '');
        }
      },
      /*只能输入数字/字母*/
      handInput() {
        if (/[^\d]/.test(this.searchValue)) {
          this.searchValue = this.searchValue.replace(/[\u0391-\uFFE5]/g, '');
        }
      },
      // 跳转至区块链详情
      toBlockChainDetail( id, h, e) {
        this.$router.push({
          path: 'blockchainDetail',
          query: {
            height: h,
            chainId: id
          }
        })
      },
      /*区块高度查询*/
      blockHeightQuery() {
        if (this.searchValue == '') {
          if (this.$store.getters.language == 'en') {
            this.$message.error('The query block height cannot be empty!');
          } else {
            this.$message.error('查询区块高度不能为空！');
          }

        } else {
          let reg = /[a-z]/i
          let data
          if (reg.test(this.searchValue) == true) {
            this.pageType = 1
            data = {
              "blockHeight": '',
              "chainId": this.chainId,
              "blockHash": this.searchValue,
            }
          } else {
            this.pageType = 2
            data = {
              "blockHeight": this.searchValue.toString(),
              "chainId": this.chainId,
            }
          }
          blockDetails(data).then(response => {
            console.log(response.data)
            if (response.data == null) {
              if (this.$store.getters.language == 'en') {
                this.$message.error('The current block height query result is empty, please check and enter again!');
              } else {
                this.$message.error('当前区块高度查询结果为空，请检查后再次输入！');
              }

            } else {
                this.$router.push({
                    path: 'blockchainDetail',
                    query: {
                      height: this.pageType == 1 ? "" : this.searchValue,
                      chainId: this.$route.query.chainId,
                      blockHash: this.pageType == 1 ? this.searchValue : ""
                    }
                  })
            }
          })
        }
      },
      /*查看更多交易信息*/
      moreTransactionInformation() {
          this.$router.push({path: 'tradeList'})
      },
      /*查看更多区块信息*/
      moreBlockInformation() {
          this.$router.push({
            path: 'blockchainList',
            query: {
              chainId: this.$route.query.chainId
            }
          })
      },
      transformChainState(value) {
        return value = value == 0 ? "title.main_chain" : (value == 1 ? "title.trading_chain" : (value == 2 ? "title.pos_reward_chain" : "title.new_ecology_business_chain"))
      },
    },
    created() {
      this.allTransaction = this.$route.query.allTransaction
      this.currencyPc = localStorage.getItem('currencyPc')
      this.chainId = this.$route.query.chainId
      this.chainName = this.transformChainState(this.chainId)
      this.getFragmentedTaskChain()
      this.getNotFragmentedTaskChain()
      this.getBlockHeight()
      this.getTradingList()
    },
  }
</script>

<style scoped lang="scss">
  .table-wrap {
    padding: 0 0.17rem;
  }
  .page-wrap .search-content .search-input-wrap input {
      text-indent: 30px;
    }
  .header-wrap {
    margin-bottom: 0.3rem;
    >div {
      display: flex;
      align-items: center;
    }
    img {
      width: 0.28rem;
      height: 0.28rem;
      cursor: pointer;
    }
    .dot {
      width: 0.05rem;
      height: 0.05rem;
      background: $themeColor;
      border-radius: 0.03rem;
    }
    .label {
      margin-left: 0.07rem;
      margin-right: 0.22rem;
    }
    .left-value,.right-value {
      color: $themeColor;
      margin-right: 0.08rem;
      font-size: 0.3rem;
    }
    .unit {
      color: $themeColor;
      font-size: 0.18rem;
    }
  }
  .content-wrap {
    width: 100%;
    height: 8rem;
    display: flex;
    .content-left {
      width: 9.93rem;
      height: 100%;
      background-color: #FFFFFF;
      // background-color: green;
      margin-left: 0.29rem;
      display: flex;
      flex-direction: column;
      .header {
          display: flex;
          height: 0.6rem;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #F6F4FB;
          .header-left {
            display: flex;
            align-items: center;
            .bar {
              width: 0.04rem;
              height: 0.27rem;
              background: $themeColor;
              border-radius: 0.02rem;
              margin: 0 0.2rem;
            }
            >span {
              font-size: 0.2rem;
              line-height: 0.2rem;
              color: $themeColor;
              font-weight: bold;
            }
            .block-value {
              font-size: 0.16rem;
              line-height: 0.16rem;
              margin-top: 0.03rem;
              margin-left: 0.05rem;
            }
          }

          .more-wrap {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding-right: 0.27rem;
            >span {
              font-size: 0.18rem;
              font-weight: bold;
              color: $themeColor;
              margin-right: 0.1rem;
            }
            >img {
              width: 0.19rem;
              height: 0.16rem;
            }
          }
        }
      .total-wrap {
        display: flex;
        align-items: center;
        height: 0.5rem;
        img {
          width: 0.29rem;
          height: 0.29rem;
          margin-left: 0.25rem;
          margin-right: 0.14rem;
        }
        .right-wrap {
          margin-right: 0.42rem;
          color: #666666;
          font-size: 0.18rem;
          span {
            color: #7139FF;
          }
        }
      }
    }
    .content-right {
      width: 6.56rem;
      // flex: 1;
      height: 100%;
      // background-color: #FFFFFF;
      // background-color: yellow;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .content-right-top, .content-right-bottom {
        .header {
          display: flex;
          height: 0.6rem;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #F6F4FB;
          .header-left {
            display: flex;
            .bar {
              width: 0.04rem;
              height: 0.27rem;
              background: $themeColor;
              border-radius: 0.02rem;
              margin: 0 0.2rem;
            }
            >span {
              font-size: 0.18rem;
              color: $themeColor;
              font-weight: bold;
            }
          }
          // >img {
          //   width: 0.28rem;
          //   height: 0.28rem;
          //   margin-right: 0.14rem;
          //   cursor: pointer;
          // }
          .more-wrap {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding-right: 0.27rem;
            >span {
              font-size: 0.18rem;
              font-weight: bold;
              color: $themeColor;
              margin-right: 0.1rem;
            }
            >img {
              width: 0.19rem;
              height: 0.16rem;
            }
          }
        }
      }
      .content-right-top {
        height: 4.5rem;
        background-color: #FFFFFF;
        // background: green;
        border-radius: 0.1rem;

        .row-item-wrap {
          padding: 0 0.16rem;
          .row-item {
            padding: 0.25rem 0.18rem 0.16rem 0.28rem;
            &:not(:last-child) {
              border-bottom: 2px solid #F6F4FB;
            }
            >div {
              display: flex;
              justify-content: space-between;
            }
            .hash-value {
              // color: $themeColor;
              font-size: 0.16rem;
              // cursor: pointer;
            }
            .gasFee-value {
              font-size: 0.14rem;
              color: #333;
            }
            .type-wrap {
              display: flex;
              align-items: center;
              color: #666666;
              >img {
                width: 0.23rem;
                height: 0.26rem;
                margin-right: 0.1rem;
              }
            }
            .chain-name {
              color: #C3C3C3;
              font-size: 0.14rem;
              word-break: break-all;
            }
          }
        }
      }
      .content-right-bottom {
        height: 3.20rem;
        // background: blue;
        background-color: #FFFFFF;
        // background-color: red;
        display: flex;
        flex-direction: column;
        .header {
          .special {
            color:#FF7054!important;
            margin-left: 0.05rem;
          }
        }
        .run-round-wrap {
          .run-round-item {
            text-align: center;
            font-size: 0.16rem;
            line-height: 0.16rem;
            color: #666666;
            margin-top: 0.33rem;
          }
          .highlight {
            color: #333333;
            font-weight: bold;
          }
        }
      }
    }
  }
  .show_color {
    color: #800080;
  }

  .input-icon-search {
    position: absolute;
    margin-left: 15px;
    margin-top: 10px;
    z-index: 1;
  }

  .search-input-wrap {
    display: flex;
    width: 70%;
  }

  .search-content {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .search-wrap {
    width: 600px;
    margin-left: 0px;
  }

  .search-name {
    line-height: 2.5;
    font-size: 16px;
  }

  .search-name-wrap {
    display: flex;
    justify-content: space-between;
  }

  .page-wrap {
   width: 100%;
    margin-bottom: 80px;
  }

  .con-title {
    height: 45px;
    font-size: 18px;
    padding-bottom: 20px;
  }
</style>
