<template>
  <div class="content-wrap">
    <div class="title-wrap" v-if="currencyPc">
      <div class="title"><div class="square square-left"></div>{{$t('title.welcome_to_Blockchain_Explorer').replace('XXX',codeName)}}<div class="square square-right"></div></div>
    </div>
    <div class="search-wrap">
      <div class="search">
        <el-input type="text" v-model="search_transaction" :placeholder="$t('placeholder.placeholder_8')"></el-input>
      </div>
      <div class="search-btn" @click="goSearchData()">{{$t('title.inquire')}}</div>
    </div>
    <div class="content-info-wrap" v-if="currencyPc">
      <div class="content-left">
        <div class="header">
          <div class="header-left">
            <div class="bar"></div>
            <span>{{$t('title.chain_details')}}</span>
            <!-- <span class="block-value">78754</span> -->
          </div>
          <!-- <div class="more-wrap" @click="toBlockList">
            <span>{{$t('title.more')}}</span>
            <img  src="@/assets/images/index/more.png" alt="">
          </div> -->
        </div>
        <div class="chain-info-wrap">
          <!-- <img class="center-img" src="@/assets/images/index/center.png" alt=""> -->
          <div class="center-img">
            <div class="upper-left" @click='toMainChain(0)'>
              <div class="main-chain-label"><span>{{$t("title.main_chain")}}</span><div class="triangle"></div></div>
              <span><span class="block-label">{{$t('title.block')}}: </span>{{chain_data.blockHeight||0}}</span>
              <img src="@/assets/images/index/mainChain.png" alt="">
            </div>
            <div class="upper-right" @click="toTaskChain(chainStatB[1] && chainStatB[1].chainId)">
              <div class="box-wrap">
                <div class="box-one">
                  <span>{{$t(chainStatB[1] && chainStatB[1].chainName)}}</span>
                  <img src="@/assets/images/index/link.png" alt="">
                </div>
                <div class="box-two">
                  <span class="has-width">{{$t('title.block')}}</span>
                  <span>{{$t('title.transaction')}}</span>
                </div>
                <div class="box-three">
                  <span class="has-width">{{(chainStatB[1] && chainStatB[1].blockHeight)}}</span>
                  <span>{{(chainStatB[1] && chainStatB[1].txNum)}}</span>
                </div>
              </div>
            </div>
            <div class="lower-right" @click="toTaskChain(chainStatB[2] && chainStatB[2].chainId)">
              <div class="box-wrap">
                <div class="box-one">
                  <span>{{$t(chainStatB[2] && chainStatB[2].chainName)}}</span>
                  <img src="@/assets/images/index/dianshang.png" alt="">
                </div>
                <div class="box-two">
                  <span class="has-width">{{$t('title.block')}}</span>
                  <span>{{$t('title.transaction')}}</span>
                </div>
                <div class="box-three">
                  <span class="has-width">{{(chainStatB[2] && chainStatB[2].blockHeight)}}</span>
                  <span>{{(chainStatB[2] && chainStatB[2].txNum)}}</span>
                </div>
              </div>
            </div>
            <div class="lower-left" @click="toTaskChain(chainStatB[0] && chainStatB[0].chainId)">
              <div class="box-wrap">
                <div class="box-one">
                  <span>{{$t(chainStatB[0] && chainStatB[0].chainName)}}</span>
                  <img src="@/assets/images/index/tradeChain.png" alt="">
                </div>
                <div class="box-two">
                  <span class="has-width">{{$t('title.block')}}</span>
                  <span>{{$t('title.transaction')}}</span>
                </div>
                <div class="box-three">
                  <span class="has-width">{{(chainStatB[0] && chainStatB[0].blockHeight)}}</span>
                  <span>{{(chainStatB[0] && chainStatB[0].txNum)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="content-right-top">
          <div class="header">
            <div class="header-left">
              <div class="bar"></div>
              <span>{{$t('title.trading_information')}}</span>
            </div>
            <div class="more-wrap" @click="toTransactionInformation()">
              <i class="el-icon-more icon-more"/>
            </div>
          </div>
          <div class="row-item-wrap" v-loading="tradeLoading">
            <div class="row-item" v-for="(item,index) in trData" :key="index">
              <div>
                <el-tooltip :content="item.tradingHash" placement="top-start">
                  <span class="hash-value color-choose" @click="seeTransactionInformation(item.chainId,item.txType,item.tradingHash)">{{sliceHash(item.tradingHash)}}</span>
                </el-tooltip>
                <span class="gasFee-value">{{scientificCounting(item.currencyAmount)}}{{currencyPc}}</span>
              </div>
              <div>
                <div class="type-wrap">
                  <!-- <span>交易类型：</span> -->
                  <span>{{$t('table.transaction_type')}}：{{$t(item.parentTypeName)}} {{item.childTypeName && item.parentTypeName != 'select.within_chain_trading' ? '-' : ''}} {{$t(item.parentTypeName == 'select.within_chain_trading' ? '' : item.childTypeName)}}</span>
                  <img src="@/assets/images/index/contract.png" alt="">
                </div>
                <span class="chain-name">{{$t(item.chainName)}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="content-right-bottom">
          <div class="header">
            <div class="header-left">
              <div class="bar"></div>
              <span>{{$t('title.node_information')}}（{{$t('title.total').replace('xxx',chainInfo.dataNode.num + chainInfo.oreBasins.num + chainInfo.independentConsensusNode.num)}}）</span>
            </div>
            <div class="more-wrap" @click="lookOver('dataNode')">
              <i class="el-icon-more icon-more"/>
            </div>
          </div>
          <ul class="node-info-list">
              <li class="node-info-item">
                 <div class="left">{{$t('title.data_node_2')}}</div>
                 <div class="right">{{$t('title.total').replace('xxx',chainInfo.dataNode.num)}}</div>
              </li>
              <li class="node-info-item">
                 <div class="left">{{$t('title.mining_pool_node')}}</div>
                 <div class="right">{{$t('title.total').replace('xxx', chainInfo.oreBasins.num)}}</div>
              </li>
              <li class="node-info-item">
                 <div class="left">{{$t('title.consensus_node_2')}}</div>
                 <div class="right">{{$t('title.total').replace('xxx', chainInfo.independentConsensusNode.num)}}</div>
              </li>
          </ul>
          <!--
          <div class="node-info-wrap">
            <div class="tab-item-content" v-if="nodeIndex == 1">
              <img width="138px" height="123px" src="@/assets/images/index/poolIcon.png" alt="">
              <div class="tab-item-right">
                <div>{{nodeInfo[0] && nodeInfo[0].idStr}}</div>
                <div>{{$t('title.management_fee')}} {{nodeInfo[0] && nodeInfo[0].data}}</div>
              </div>
            </div>
            <div class="tab-item-content" v-if="nodeIndex == 2">
              <img width="115px" height="126px" src="@/assets/images/index/mainChainIcon.png" alt="">
              <div class="tab-item-right">
                <div>
                  <el-tooltip :content="nodeInfo[0] && nodeInfo[0].idStr" placement="top-start">
                    <span>{{sliceHash(nodeInfo[0] && nodeInfo[0].idStr)}}</span>
                  </el-tooltip>
                </div>
                <div>{{$t(nodeInfo[0] && nodeInfo[0].data)}}</div>
              </div>
            </div>
            <div class="tab-item-content" v-if="nodeIndex == 3">
              <img width="123px" height="94px" src="@/assets/images/index/consensusNodeIcon.png" alt="">
              <div class="tab-item-right">
                <div>
                  <el-tooltip :content="nodeInfo[0] && nodeInfo[0].idStr" placement="top-start">
                    <span>{{sliceHash(nodeInfo[0] && nodeInfo[0].idStr)}}</span>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="tab-wrap">
              <span class="tab-item" :class="{'active': nodeIndex == 1}" @click="changeNodeClick(1)">{{$t('title.mining_pool_node')}}</span>
              <span class="tab-item" :class="{'active': nodeIndex == 2}" @click="changeNodeClick(2)">{{$t('title.data_node_2')}}</span>
              <span class="tab-item" :class="{'active': nodeIndex == 3}" @click="changeNodeClick(3)">{{$t('title.consensus_node_2')}}</span>
            </div>
          </div>
          -->
        </div>
      </div>
    </div>
    <!-- <div class="con-title">
      {{$t("title.blockchain_details")}}
    </div> -->
    <!-- <div class="search-wrap">
      <div class="search-left-wrap">
        <div class="search-name-wrap">
          <div class="search-name"> {{$t("title.block_details_query")}}</div>
        </div>
        <div class="search-content">
          <span v-if="!currencyPc"><span>{{$t('title.block_height')}}：</span> <span class="color-choose" style="margin-right:50px">{{currentBlockHeight}}</span>
          <span>{{$t('title.trading_count')}}：</span> <span class="color-choose" style="margin-right:50px">{{currentNum}}</span></span>
          <div class="search-input-wrap">
            <el-input style="width: 350px;margin-right:35px;" @input="handInput" v-model="searchHeightValue"
                      :placeholder="$t(currencyPc ? 'placeholder.placeholder_1' : 'placeholder.placeholder_6')"></el-input>
          </div>
          <el-button style="width:150px;margin-right:130px" type="primary" class="search-submit" @click="goSearchHeight()">{{$t("placeholder.search")}}
          </el-button>
        </div>
      </div>
      <div class="search-right-wrap" v-if="currencyPc">
        <div class="search-name-wrap">
          <div class="search-name">{{$t("title.transaction_details_inquiry")}}</div>
          <div>
          </div>
        </div>
        <div class="search-content">
          <div class="search-input-wrap">
            <el-input style="width: 350px;margin-right:35px;" v-model="search_transaction" :placeholder="$t('placeholder.placeholder_2')"></el-input>
          </div>
          <el-button style="width:150px" type="primary" class="search-submit" @click="goSearchData()">{{$t("placeholder.search")}}
          </el-button>
        </div>
      </div>
    </div> -->

    <!-- <div class="chain-part" v-if="currencyPc">
      <div class="my-tip">
        {{$t("prompt.prompt_1")}}
      </div> -->
       <!-- 主链 -->
      <!-- <div class="chain-part-item">
        <div class="chain-part-item-img">
            {{chainInfo.mainChain && chainInfo.mainChain.num}}
        </div>
        <div class="chain-part-item-title">
            {{$t("title.main_chain")}}
          </div>
      </div> -->

      <!-- 任务链 -->
      <!-- <div class="chain-part-item">
        <div class="chain-part-item-img-1">
            {{chainInfo.businessChain && chainInfo.businessChain.num}}
        </div>
        <div class="chain-part-item-title">
            {{$t("title.task_chain")}}
          </div>
      </div> -->

      <!-- 数据节点 -->
      <!-- <div class="chain-part-item">
        <div class="chain-part-item-img-2">
            {{chainInfo.dataNode && chainInfo.dataNode.num}}
        </div>
        <div class="chain-part-item-title">
            <span class="color-choose" @click="lookOver('dataNode')">{{$t("title.data_node")}}</span>
          </div>
      </div> -->

      <!-- 共识节点 -->
      <!-- <div class="chain-part-item">
        <div class="chain-part-item-img-3">
            {{chainInfo.independentConsensusNode && chainInfo.independentConsensusNode.num }}
        </div>
        <div class="chain-part-item-title">
          <span class="color-choose" @click="lookOver('consensusNode')">{{$t("title.consensus_node")}}</span>
        </div>
      </div> -->

      <!-- 矿池数量 -->
      <!-- <div class="chain-part-item">
        <div class="chain-part-item-img-4">
            {{chainInfo.oreBasins && chainInfo.oreBasins.num }}
        </div>
        <div class="chain-part-item-title">
            <span class="color-choose nowrap" @click="lookOver('mineNumber')">{{$t("title.mine_number")}}</span>
          </div>
      </div> -->
    <!-- </div> -->


    <!-- <div class="main-chain main-chain-1" v-if="currencyPc">
      <div>
        <span style="display: inline-block;line-height: 80px;font-size: 18px" class="color-choose"
              @click='toMainChain(0)'>{{$t("title.main_chain")}}</span>
      </div>
      <div>
        <span class="main-chain-name">{{$t("title.block_height")}}</span><br/>
        <br/>
        <span class="color-choose"
              @click="toBlockChainDetail(0,chain_data.blockHeight)">{{chain_data.blockHeight||0}}</span>
      </div>

      <div>
        <span
          class="main-chain-name">{{$t("title.number_of_sub_chains")}}</span>
        <br/>
        <br/>
        <span class="">{{chain_data.taskChainNum||0}}</span>
      </div>
    </div> -->
    <!-- <div class="con-title " v-if="currencyPc">
      {{$t("title.split_subchain")}}
    </div> -->
    <!--已分片子链列表-->
    <!-- <el-table
      v-if="currencyPc"
      :data="chainStatA"
      style="width: 100%;margin-bottom: 30px;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.subchain_id')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose"  @click="toTaskChain(scope.row.taskChainId)">{{ $t(scope.row.chainName)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose" @click="toBlockChainDetail(scope.row.chainId,scope.row.blockHeight,0)">{{scope.row.blockHeight}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.number_of_fragments')"
        align="center">
        <template slot-scope="scope">
          <span class="">{{scope.row.fragmentedNum}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.total_share_of_its_segmented_chain')"
        align="center"
        width="350"
      >
        <template slot-scope="scope">
          <span class="">{{scope.row.txCount}}</span>
        </template>
      </el-table-column>
    </el-table> -->
    <!-- <div class="con-title " v-if="currencyPc">
      {{$t("title.unfragmented_subchain")}}
    </div> -->
    <!--未分片子链列表-->
    <!-- <el-table
      v-if="currencyPc"
      :data="chainStatB"
      style="width: 100%;margin-bottom: 30px;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.subchain_id')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose" @click="toTaskChain(scope.row.chainId)">{{$t(scope.row.chainName)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose" @click="toBlockChainDetail(scope.row.chainId,scope.row.blockHeight,1)">{{scope.row.blockHeight}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.trading_volume')"
        align="center">
        <template slot-scope="scope">
          <span class="">{{scope.row.txNum}}</span>
        </template>
      </el-table-column>
    </el-table> -->
    <!--区块信息-->
    <!-- <div v-if="!currencyPc">
      <div class="con-title " style="margin-top: 80px">
      {{$t("title.block_information")}}
      </div>
    <el-table
      :data="all_block_data"
      style="width: 100%;margin-bottom: 30px;min-height: 529px;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
      v-loading="loading"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose" @click="toBlockChainDetail(scope.row.chainId,scope.row.blockHeight)">{{scope.row.blockHeight}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_hash')"
        align="center">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.blockHash" placement="top-start">
            <span class="color-choose" @click="toBlockChainDetail(scope.row.chainId,scope.row.blockHeight,scope.row.blockHash)">{{sliceHash(scope.row.blockHash)}}</span>
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
    </div> -->
    <!--交易信息列表-->
    <!-- <div class="con-title ">
      {{$t("title.trading_information")}}
    </div>
    <tradeInfoList :isShow="true" :trData="trData" :currencyPc="currencyPc" v-if="showTable"></tradeInfoList>
    <el-button style="width: 100%;margin-bottom: 50px;margin-top: 20px" type="primary"
               @click="toTransactionInformation()">
      {{$t("title.see_more_deals")}}
    </el-button> -->
  </div>

</template>
<script>
  import { tradingDetails, circleInfo, tradingList, blockHeightOne, fragmentedTaskChain, blockHeightAndNumberOfTaskChains, notFragmentedTaskChain, blockHeight, blockDetails} from '@/api/pcApi'
  import echarts from 'echarts'
  import '../../../filters/index'
  import tradeInfoList from '../components/TradeInfoList'
  import { nodeOrPoolDetail} from '@/api/pcApi'

  export default {
    components: {tradeInfoList},
    name: 'index',
    data() {
      return {
        nodeInfo: [],
        nodeIndex: 2,
        currentBlockHeight: '',
        currentNum: '',
        all_block_data: [], //区块信息
        showTable: '',
        currencyPc: '',
        searchHeightValue: '',
        search_transaction: '',
        marke: '',
        chain_data: {},
        chainStatA: [],
        chainStatB: [],
        trData: [],
        loading: false,
        loading1: false,
        chain_list: {},
        is_zh: true,
        setTimer: '',
        chainInfo: '',
        chain_market_info: [],
        NewTickers_1:0,
        NewTickers_2:0,
        codeName: '',
        tradeLoading: false
      }
    },
    methods: {
      //获取列表数据
      async getNodeData() {
        let data = {  //nodeIndex 2数据节点 3共识节点 1矿池
          type: this.nodeIndex == 2 ? 1 : this.nodeIndex == 3 ? 2 : 3,
          rows: 1,
          page: 1
        }
        let res = await nodeOrPoolDetail(data)
        this.nodeInfo = res.data && res.data.data || []
      },
      changeNodeClick(index) {
        this.nodeInfo = []
        this.nodeIndex = index
        this.getNodeData()
      },
      /*点击交易信息=>交易hash=>到达几种交易详情*/
      seeTransactionInformation(id, type, hash) {
        this.$router.push({
          path: 'tradeDetail',
          query: {
            chainId: id,
            type: type,
            hash: hash
          }
        })
      },
      toBlockList() {
        this.$router.push({
          path: '/blockchainList'
        })
      },
      /*区块详情查询*/
      goSearchHeight() {
        if (this.searchHeightValue == '') {
            this.$store.getters.language == 'en' ? this.$message.error(this.currencyPc ? 'The query block height cannot be empty!' : 'Input value cannot be empty') : this.$message.error(this.currencyPc ? '查询区块高度不能为空！' : '输入值不能为空')
        } else {
          if(this.currencyPc) {
            let data = {
            blockHeight: this.searchHeightValue,
            chainId: '',
            page: 1,
            rows: 10,
          }
          blockHeightOne(data).then(response => {
            if (response.data.data.length == 0) {
              this.$store.getters.language == 'en' ? this.$message.error('The current block height query result is empty, please check and enter again!') : this.$message.error('当前区块高度查询结果为空，请检查后再次输入！')
            } else {
                this.$router.push({
                  path: 'blockHeight',
                  query: {
                    height: this.searchHeightValue
                  }
                })
            }
          })
          } else {
            let reg = /^[0-9]+.?[0-9]*$/
            let data = {
              blockHeight: reg.test(this.searchHeightValue) ? this.searchHeightValue : '',
              chainId: 1,
              blockHash: reg.test(this.searchHeightValue) ? '' : this.searchHeightValue,
            }
            blockDetails(data).then( res => {
              if(res.data) {
                this.$router.push({
                  path: 'blockChainDetail',
                  query: {
                    height: reg.test(this.searchHeightValue) ? this.searchHeightValue : '',
                    chainId: 1,
                    blockHash: reg.test(this.searchHeightValue) ? '' : this.searchHeightValue,
                  }
                })
              } else {
                let data = {
                  hash: this.searchHeightValue
                }
                tradingDetails(data).then( res => {
                  this.$router.push({
                    path: 'tradeDetail',
                    query: {
                      hash: this.searchHeightValue
                    }
                  })
                })
              }
            })
          }
        }

      },
      //获取首页圈圈里的信息
      async getCircleInfo() {
        let res = await circleInfo()
        this.chainInfo = res.data
        this.showTable = true  //传死的 为了处理异步导致表格渲染错误的问题
        this.currentBlockHeight = res.data.blockAndTradings && res.data.blockAndTradings[0].blockHeight
        this.currentNum = res.data.blockAndTradings && res.data.blockAndTradings[0].tradingTotal
        this.codeName = res.data.logoName
        localStorage.setItem('codeName', this.codeName)
        if(!this.currencyPc) {
          this.getBlockHeight()
        }
      },
      // 跳转到数据节点等的查看详情
      lookOver(val) {
        this.$router.push({
          name: 'nodeDetail',
          query: {
            type: val
          }
        })
      },
      // 区块高度和任务链
      async getBlockHeightAndNumberOfTaskChains() {
        let data = {
          chainId: 0
        }
        let res = await blockHeightAndNumberOfTaskChains(data)
        this.chain_data = res.data
        this.chainStatA = res.data.fragmentedTaskChain
        this.chainStatB = res.data.noFragmentedTaskChain
      },
      /*区块高度列表*/
      getBlockHeight() {
        this.loading = true
        let data = {
            blockHeight: '',
            chainId: 1,
            page: 1,
            rows: 10,
          }
        blockHeight(data).then(response => {
          this.loading = false
          this.all_block_data = response.data.data
        })
      },
      /*查看更多区块信息*/
      moreBlockInformation() {
          this.$router.push({
            path: 'blockchainList',
            query: {
              chainId: 1
            }
          })
      },
      // 获取交易信息
      async getTradingList() {
        this.tradeLoading = true
        let data = {
          chainId: "",
          address: "",
          page: 1,
          rows: 4
        }
        let res = await tradingList(data)
        this.tradeLoading = false
        this.trData = res.data.data
      },
      /* 区块详情hash或者账户地址查询*/
      goSearchData() {
        if (this.search_transaction == '') {
          if (this.$store.getters.language == 'en') {
            this.$message.error('Query transaction details transaction hash/account address cannot be empty!');
          } else {
            this.$message.error('查询交易详情账户详情不能为空！');
          }

        } else {
          // if(this.search_transaction.length != 66){
          this.search_transaction = this.search_transaction.trim()
          if(/^0x/g.test(this.search_transaction) == false){
             let address = this.to16Decimal(this.search_transaction)
              this.$router.push({
                path: 'addressDetail',
                query: {
                  address: this.to32Decimal(address)
                }
              })
          }else {
            let data = {
              hash: this.search_transaction,
            }
            tradingDetails(data).then(response => {
              if (response.data == null && response.code !== 508) {
                
                let data = {
                  blockHash: this.search_transaction
                }
                blockDetails(data).then(res => {
                  if(res.data) {
                    this.$router.push({
                      path: 'blockChainDetail',
                      query: {
                        blockHash: this.search_transaction
                      }
                    })
                  } else {
                    if (this.$store.getters.language == 'en') {
                      this.$message.error('The current transaction details transaction hash/account address query result is empty, please check and enter again!');
                    } else {
                      this.$message.error('当前交易详情账户详情查询结果为空，请检查后再次输入！');
                    }
                  }
                })
                
              } else if(response.code !== 508){
                // let type = response.data.transactionsList.dataList[0].txType
                this.$router.push({
                  path: 'tradeDetail',
                  query: {
                    hash: this.search_transaction
                  }
                })
              }
            })
          }

        }
      },
      /*只能输入数字*/
      handInput() {
        if(this.currencyPc) {
          if (/[^\d]/.test(this.searchHeightValue)) {
            this.searchHeightValue = this.searchHeightValue.replace(/[^\d]/g, '');
          }
        }
      },
      /*点击主链跳转到主链页面*/
      toMainChain(val) {
        this.$router.push({
          path: 'MainChain',
          query: {
            chainId: val,
            allTransaction: this.chain_data.txNum
          }
        })
      },
      /*点击主链跳转到任务链页面*/
      toTaskChain(val) {
        this.$router.push({
          path: 'taskChain',
          query: {
            chainId: val,
            allTransaction: this.chain_data.txNum
          }
        })
      },
      /*查看更多交易信息*/
      toTransactionInformation() {
          this.$router.push({path: 'tradeList'})
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
      /*定时刷新数据,5s一次*/
      timedRefresh() {
        this.setTimer = setInterval( () => {
          this.getBlockHeightAndNumberOfTaskChains()
        },5000)
      },
    }
    ,
    created() { 
      this.currencyPc = localStorage.getItem('currencyPc')
      this.logoUrl = localStorage.getItem('logoUrl')
      if( !this.currencyPc ) {
        this.$router.push({path: '/tradeList'})
        return false
      }
      this.getCircleInfo()
      this.getBlockHeightAndNumberOfTaskChains()
      this.getTradingList()
      this.timedRefresh()
      this.getNodeData()
    },
    beforeDestroy() {
      let _this = this
      clearInterval(_this.setTimer)
    }
  }
</script>

<style scoped lang="scss">
  .title-wrap {
    display: flex;
    justify-content: center;
    .title {
      font-size: 0.4rem;
      line-height: 0.4rem;
      color: $themeColor;
      position: relative;
      .square {
        width: 19px;
        height: 19px;
        background: #F7F5FB;
        border: 3px solid $themeColor;
        border-radius: 5px;
      }
      .square-left {
        position: absolute;
        left: -37px;
        top: -8px;
      }
      .square-right {
        position: absolute;
        right: -34px;
        bottom: -20px;
      }
    }
  }

  .search-wrap {
    margin: 0.72rem auto;
    width: 11rem;
    height: 0.8rem;
    background-color: #ffffff;
    display: flex;
    .search {
      flex: 1;
      // background-color: red;
      display: flex;
      justify-content: center;
      align-items: center;
      /deep/ .el-input {
        height: 100%;
      }
      /deep/ .el-input__inner {
        border: 0;
        height: 100%;
        text-align: center;
        font-size: 20px;
      }
    }
    .search-btn {
      width: 1.58rem;
      height: 0.80rem;
      background: $themeColor;
      border-radius: 0 0.10rem 0.10rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
      font-size: 0.24rem;
      cursor: pointer;
    }
  }

  .content-info-wrap {
    width: 100%;
    height: 8.15rem;
    // background-color: red;
    display: flex;
    // justify-content: space-between;
    .content-left {
      width: 9.88rem;
      height: 100%;
      background-color: #FFFFFF;
      // background-color: green;
      margin-right: 0.36rem;
      display: flex;
      flex-direction: column;
      .header {
          display: flex;
          height: 0.8rem;
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
        .chain-info-wrap {
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          .center-img {
            width: 5.61rem;
            height: 3.98rem;
            background-image: url(../../../assets/images/index/center.png);
            background-size: 100%;
            position: relative;
          }
          .upper-left {
            width: 1.50rem;
            height: 1.50rem;
            background: #FFFFFF;
            border: 0.02rem dashed $themeColor;
            box-shadow: 0px 0px 16px 0px rgba(15, 41, 87, 0.1);
            border-radius: 0.04rem;
            // background-image: url(../../../assets/images/index/centerRightBg.png);
            position: absolute;
            left: -0.75rem;
            top: -0.75rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            .main-chain-label {
              margin-top: 0.18rem;
              color: $themeColor;
              font-size: 0.2rem;
              font-weight: bold;
              display: flex;
              align-items: center;
              position: relative;
              .triangle {
                margin-left: 0.08rem;
                width: 0;
                height: 0;
                border-top: 0.05rem solid transparent;
                border-right: 0.11rem solid $themeColor;
                border-bottom: 0.05rem solid transparent;
                // position: absolute;
                // right: -0.18rem;
                // top: 0.08rem;
              }
            }
            >span {
              margin: 0.14rem 0;
              color: #333333;
              font-size: 0.18rem;
              .block-label {
                color: #9EA3AE;
                font-size: 0.16rem;
              }
            }
            >img {
              width: 0.28rem;
              height: 0.28rem;
            }
          }
          .upper-right, .lower-right, .lower-left {
            .box-wrap {
              margin-top: 0.38rem;
              margin-left: 0.48rem;
              .box-one {
                display: flex;
                align-items: center;
                >span {
                  color: $themeColor;
                  font-size: 0.16rem;
                  font-weight: bold;
                  display: inline-block;
                  width: 1.88rem;
                }
                >img {
                  // margin-left: 1.38rem;
                  width: 0.28rem;
                  height: 0.28rem;
                }
              }
              .box-two {
                margin-top: 0.12rem;
                margin-bottom: 0.14rem;
                color: #9EA3AE;
                font-size: 0.14rem;
                line-height: 0.14rem;
              }
              .has-width {
                display: inline-block;
                width: 1.08rem;
              }
              .box-three {
                color: #384151;
                font-size: 0.20rem;
              }
            }
          }
          .lower-left {
            width: 2.4rem;
            height: 1.54rem;
            background-image: url(../../../assets/images/index/centerLeftBg.png);
            background-size: 100%;
            position: absolute;
            left: -1.85rem;
            bottom: -0.98rem;
            .box-wrap {
              margin-top: 0.32rem;
              margin-left: 0.31rem;
              .box-one {
                >span {
                  display: inline-block;
                  width: 1.52rem;
                }
                // >img {
                //   margin-left: 0.92rem;
                // }
              }
              .box-two {
                margin-top: 0.12rem;
                margin-bottom: 0.14rem;
                color: #9EA3AE;
                font-size: 0.14rem;
                line-height: 0.14rem;
              }
              .has-width {
                display: inline-block;
                width: 0.90rem;
              }
              .box-three {
                color: #384151;
                font-size: 0.16rem;
              }
            }
          }
          .upper-right {
            width: 2.87rem;
            height: 1.57rem;
            background-image: url(../../../assets/images/index/centerRightBg.png);
            background-size: 100%;
            position: absolute;
            right: -1.9rem;
            top: -0.19rem;
          }
          .lower-right {
            width: 2.87rem;
            height: 1.57rem;
            background-image: url(../../../assets/images/index/centerRightBg.png);
            background-size: 100%;
            position: absolute;
            right: -1.8rem;
            bottom: -0.52rem;
          }
          .upper-left, .lower-left, .upper-right, .lower-right {
            cursor: pointer;
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
              font-size: 0.2rem;
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
            padding-right: 0.15rem;
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
          min-height: 3.8rem;
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
            }
            .type-wrap {
              display: flex;
              align-items: center;
              color: #666666;
              >img {
                width: 0.24rem;
                height: 0.24rem;
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
        height: 3.3rem;
        // background: blue;
        background-color: #FFFFFF;
        // background-color: red;
        display: flex;
        flex-direction: column;
        .node-info-wrap {
          flex: 1;
          // background-color: red;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .tab-item-content {
            height: 1.28rem;
            display: flex;
            align-items: center;
            .tab-item-right {
              >div:first-child {
                margin-bottom: 0.12rem;
              }
            }
          }
          .tab-wrap {
            width: 100%;
            text-align: center;
            margin-top: 0.16rem;
            .tab-item {
              color: #BDBDBD;
              font-size: 0.14rem;
              display: inline-block;
              width: 1.06rem;
              cursor: pointer;
            }
            .active {
              color: #666666;
              font-size: 0.18rem;
              font-weight: bold;
              position: relative;
              &::after {
                content: "";
                display: inline-block;
                width: 0.36rem;
                height: 0.03rem;
                background: $themeColor;
                border-radius: 0.02px;
                position: absolute;
                bottom: -0.08rem;
                left: calc(50% - 0.18rem);
              }
            }
          }
          
        }
        .node-info-list{
            padding-left: .44rem;
            padding-top: .12rem;
            .node-info-item{
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: .67rem;
              padding-right: .3rem;
              font-size: .20rem;
              .left{
                color: #666;
              }
              .right{
                color: #FF7054;
              }
            }
            .node-info-item+.node-info-item{
              border-top: 2px solid #F6F4FB;
            }
          }
      }
    }
  }
  .nowrap {
    white-space: nowrap;
  }

  .chain-part-item-img {
    background: url("../../../assets/images/circle_1.png") no-repeat;
    width: 63px;
    height: 63px;
    line-height: 63px;
    text-align: center;
    background-size: 100%;
    margin: 20px auto 0;
  }

  .chain-part-item-img-1 {
    background: url("../../../assets/images/circle_2.png") no-repeat;
    width: 63px;
    height: 63px;
    line-height: 63px;
    text-align: center;
    background-size: 100%;
    margin: 20px auto 0;
  }

  .chain-part-item-img-2 {
    background: url("../../../assets/images/circle_3.png") no-repeat;
    width: 63px;
    height: 63px;
    line-height: 63px;
    text-align: center;
    background-size: 100%;
    margin: 20px auto 0;
  }

  .chain-part-item-img-3 {
    background: url("../../../assets/images/circle_4.png") no-repeat;
    width: 63px;
    height: 63px;
    line-height: 63px;
    text-align: center;
    background-size: 100%;
    margin: 20px auto 0;
  }

  .chain-part-item-img-4 {
    background: url("../../../assets/images/circle_5.png") no-repeat;
    width: 63px;
    height: 63px;
    line-height: 63px;
    text-align: center;
    background-size: 100%;
    margin: 20px auto 0;
  }

  .chain-part-item-img-6 {
    background: url("../../../assets/images/circle_bg.png") no-repeat;
    width: 63px;
    height: 63px;
    line-height: 63px;
    text-align: center;
    background-size: 100%;
    margin: 20px auto 0;
  }

  .chain-part-item-title {
    height: 57px;
    font-size: 18px;
    text-align: center;
    line-height: 57px;
  }

  .chain-part {
    width: 100%;
    padding-bottom: 40px;
  }


  .chain-part-item {
    display: inline-block;
    width: 200px;
    height: 140px;
    background:rgba(249,250,251,1);
    border-radius:20px;
    margin-right: 35px;
  }

  .main-chain-name {
    display: inline-block;
    height: 22px;
  }

  .main-chain {
    width: 100%;
    display: flex;
    border: 1px solid #EBEEF5;
    background-color: #ffffff;
  }

  .main-chain div {
    width: 33.33%;
    height: 140px;
    text-align: center;
    padding: 30px 0;
  }

  .main-chain-1 div {
    width: 33.3%;
    text-align: center;
    padding: 25px 0;

  }

  .main-chain-1 {
    margin-bottom: 30px;
  }

  .main-chain div:nth-child(2) {
    border-left: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;
  }

  .my-tip {
    height: 15px;
    font-size: 12px;
    margin: 20px 0 30px 0;
    color: #AAAAAA;
  }

  .hc_search2_1_input_icon {
    position: absolute;
    margin-left: 15px;
    margin-top: 12px;
    z-index: 1;
  }

  .search-input-wrap {
    display: flex;
  }

  .search-content {
    display: flex;
    margin-top: 20px;
    line-height: 40px;
  }

  .search-name {
    line-height: 2.5;
    font-size: 15px;
    font-weight: 400;
    color: #444444;
  }

  .search-name-wrap {
    display: flex;
    justify-content: space-between;
  }

  .content-wrap {
    width: 100%;
    margin-bottom: 80px;
  }

  .con-title {
    height: 45px;
    font-size: 20px;
    color: #343434;
    font-weight: 500;
    padding-bottom: 20px;
  }

  // .search-wrap {
  //   display: flex;
  //   margin-bottom: 20px;
  // }

  .search-submit {
    width: 100px;
    border: none;
  }

  .el-icon-more.icon-more{
      font-size: .26rem;
      transform: rotate(90deg);
      color: #7D4AFF;
  } 

</style>
