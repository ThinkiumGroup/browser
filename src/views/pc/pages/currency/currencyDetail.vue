<template>
  <div>
    <div style="margin-bottom:10px;display:flex;align-items:center;">
      <img :src="headerData.iconUrl" width="30" height="30" alt="" style="margin-right:5px">
      {{headerData.xtoName}}
    </div>
    <div class="row">
      <div class="left">
        <span>{{$t('title.total_amount_of_tokens')}}：</span>
        <span>{{headerData.totalTokens}}</span>
      </div>
      <div class="left">
        <span>{{$t('title.contract_address')}}：</span>
        <span>{{sliceAddress1(headerData.contractAddress)}}</span>
      </div>
      <div class="left">
        <span>{{$t('title.number_of_accounts')}}：</span>
        <span>{{headerData.numberOfAccounts}}</span>
      </div>
      <div class="left">
        <span>{{$t('title.trading_count')}}：</span>
        <span>{{headerData.numberOfTransactions}}</span>
      </div>
      <div class="left">
        <span>{{$t('placeholder.search')}}：</span>
        <el-input v-model="searchValue" :placeholder="$t('placeholder.placeholder_7')" class="input-with-select" style="width: 400px">
            <el-button @click="searchClick" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <el-divider></el-divider>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('table.token_transfer_accounts')" name="tokenTransfer">
        <el-table v-loading="loading" :data="orderType != 1 ? trData.slice( (currentPage-1)*pageSize, currentPage*pageSize) : trData.slice( (myCurrentPage-2 < 0 ? 0 : ((myCurrentPage-2)*pageSize + beginRows)), (myCurrentPage-1)*pageSize + beginRows).reverse()" 
        style="width: 100%;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
        :header-cell-style="this.tableHeaderColor">
          <el-table-column prop="transHash" :label="$t('table.transaction_hash')" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.transHash" placement="top-start">
                <span class="color-choose" @click="see_transaction_information(scope.row.transHash)">{{sliceHash(scope.row.transHash)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('table.transaction_type')" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.type == 1 ? $t('table.direct_transfer') : scope.row.type == 2 ? $t('table.transfer_via_contract') : '未匹配'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('table.own_chain')" align="center">
            <template slot-scope="scope">
              <span @click="toTaskChain(scope.row.chainId)" class="color-choose">{{$t(scope.row.chainName)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="timeStamp" :label="$t('table.timestamp')" align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timeStamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="blockHeight" :label="$t('table.block_height')" align="center">
            <template slot-scope="scope">
              <span @click="toBlockChainDetail(scope.row.chainId,scope.row.blockHeight)" class="color-choose">{{scope.row.blockHeight}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('table.initiator')" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="to32Decimal(scope.row.fromAddress)" placement="top-start">
                <span @click="toAddressDetails(scope.row.chainId,scope.row.fromAddress)" class="color-choose">{{sliceAddress(scope.row.fromAddress)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('table.receiver')" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="to32Decimal(scope.row.toAddress)" placement="top-start">
                <span @click="toAddressDetails(scope.row.chainId,scope.row.toAddress)" class="color-choose">{{sliceAddress(scope.row.toAddress)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="transAmount" :label="$t('table.trading_volume')" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('title.holdings')" name="holdings">
        <el-table :data="tableData" style="width: 100%;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5" :header-cell-style="this.tableHeaderColor">
          <el-table-column :label="$t('table.order')" type='index' align="center" width='180px'></el-table-column>
          <el-table-column prop="address" :label="$t('title.address')" align="center">
            <template slot-scope="scope">
                <span>{{to32Decimal(scope.row.address)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="tokenNum" :label="$t('title.quantity')" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      v-if="activeName == 'tokenTransfer'"
      style="float:right;margin-top:20px;"
      background
      @current-change="currentPageChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    <el-pagination
      v-if="activeName == 'holdings'"
      style="float:right;margin-top:20px;"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import _ from 'lodash'
import {tokenTransfer, tokenHoldings, currencyDetails, tradingDetails} from '@/api/pcApi'
export default {
    data() {
        return {
            myCurrentPage: 1,
            beginRows: 1,
            orderType: '',
            activeName: 'tokenTransfer',
            headerData: {},
            searchValue: '',
            trData: [],
            total: 0,
            pageSize: 10,
            currentPage: 1,
            tableData: [],
            loading: false,
            tables: ''
        }
    },
    methods: {
      //持有量的分页
      handleCurrentChange(e) {
        this.currentPage = e
        this.getTokenHoldings()
      },
      //tab页面切换
      handleClick(tab, event) {
        this.activeName = tab.name
        this.trData = []
        this.currentPage = 1
        this.orderType = 0
        this.activeName == 'tokenTransfer' ? this.getTokenTransfer() : this.getTokenHoldings()
      },
      //请求代币详情列表头部信息
      async getCurrencyDetails() {
        let data = {
          contractAddress: this.transformAddress(this.$route.query.contractAddress,'0x')  
        }
        let res = await currencyDetails(data)
        this.headerData = res.data
      },
      //获取代币转账列表
      async getTokenTransfer(){
        this.loading = true
        let data = {
          contractAddress: this.transformAddress(this.$route.query.contractAddress,'0x'),
          orderType: '',
          timeStamp: '',
          accountAddress: this.to16Decimal(this.searchValue),
          transHash: '',
          page: this.currentPage,
          rows: 10
        }
        let res = await tokenTransfer(data)
        this.trData = res.data.data
        this.total = res.data.total
        this.loading = false
      },
      //获取代币持有量列表
      async getTokenHoldings() {
        let data = {
          contractAddress: this.transformAddress(this.$route.query.contractAddress,'0x'),
          accountAddress: this.to16Decimal(this.searchValue),
          page: this.currentPage,
          rows: 10
        }
        let res = await tokenHoldings(data)
        this.tableData = res.data.data
        this.total = res.data.total
      },
      /* 区块详情hash或者账户地址查询*/
      searchClick() {
          this.searchValue = this.searchValue.trim()
          if(/^TH/g.test(this.searchValue) || this.searchValue == ''){
            console.log('拉萨大家啊离开')
            this.currentPage = 1
            this.orderType = 0
             this.activeName == 'tokenTransfer' ? this.getTokenTransfer() : this.getTokenHoldings()
          }else {
            let data = {
              hash: this.searchValue,
            }
            tradingDetails(data).then(response => {
              if (response.data == 0) {
                if (this.$store.getters.language == 'en') {
                  this.$message.error('The current transaction details transaction hash/account address query result is empty, please check and enter again!');
                } else {
                  this.$message.error('当前交易详情账户详情查询结果为空，请检查后再次输入！');
                }
              } else {
                this.$router.push({
                  path: 'tradeDetail',
                  query: {
                    hash: this.searchValue
                  }
                })
              }
            })

        }
      },
      //处理分页中的tables参数
      handleTablesParams() {
        this.tables = _.cloneDeep(this.trData.slice(this.trData.length -10, this.trData.length))
            this.tables = this.tables.map(item => item = {chainId:item.chainId, tableName:item.tableName, tableId:item.tableId})
      },
      /*代币转账page切换  待优化*/
      currentPageChange(e) {
        this.currentPage = e
        //点击第一页，并且是从倒序(点击过最后一页)的页面回点第一页
        if(e == 1 && this.orderType == 1) {
          this.orderType = 0
          this.getTokenTransfer()
        }
        if(this.total <= 60) {
          return false
        }
        //当点击最后一页的时候(变成倒序的了)
        if(e == Math.ceil(this.total / 10)) {
          this.loading = true
          this.orderType = 1
          this.beginRows = (this.total % 10 == 0) ? 10 : (this.total % 10)
          //把最后一页变成第一页，倒数第二页是第二页，以此类推
          this.myCurrentPage = Math.ceil(this.total / 10) - this.currentPage + 1
          this.trData = []
          let data = {
              contractAddress: this.transformAddress(this.$route.query.contractAddress,'0x'),
              orderType: this.orderType,
              timeStamp: "",
              transHash: '',
              accountAddress: this.to16Decimal(this.searchValue),
              page: this.myCurrentPage,
              rows: 60
          }
          tokenTransfer(data).then( res => {
            this.trData = res.data.data
            this.total = res.data.total
            this.loading = false
          })
        }
        //正序，从前往后点击
        if(this.orderType != 1 && e != 1) {
          if(this.trData.length - this.currentPage * 10 < 50 && this.trData.length < this.total) {
            this.handleTablesParams()
            let data = {
              contractAddress: this.transformAddress(this.$route.query.contractAddress,'0x'),
              timeStamp: this.trData[this.trData.length-1].timeStamp,
              transHash: '',
              accountAddress: this.to16Decimal(this.searchValue),
              page: this.currentPage,
              rows: 50,
              tables: this.tables
            }
            tokenTransfer(data).then(res => {
              this.trData = [...this.trData, ...res.data.data]
              this.total = res.data.total
            })
            
          }
        }
        //倒序，从后往前点击
        if(this.orderType == 1 && e != Math.ceil(this.total / 10)) {
          this.beginRows = (this.total % 10 == 0) ? 10 : (this.total % 10)
          this.myCurrentPage = Math.ceil(this.total / 10) - this.currentPage + 1
          if(this.trData.length - this.myCurrentPage * 10 < 50 && this.trData.length < this.total) {
            this.handleTablesParams()
            let data = {
              contractAddress: this.transformAddress(this.$route.query.contractAddress,'0x'),
              timeStamp: this.trData[0] && this.trData[this.trData.length-1].timeStamp,
              transHash: '',
              accountAddress: this.to16Decimal(this.searchValue),
              page: this.myCurrentPage,
              rows: 50,
              tables: this.tables
            }
            tokenTransfer(data).then(res => {
              this.trData = [...this.trData, ...res.data.data]
              this.total = res.data.total
            })
            
          }
        }
      },
      /*点击交易信息=>交易hash=>到达几种交易详情*/
      see_transaction_information(hash) {
        this.$router.push({
          path: 'tradeDetail',
          query: {
            hash: hash
          }
        })
      },
      /*点击主链跳转到主链页面*/
      toTaskChain(val) {
        this.$router.push({
          path: 'taskChain',
          query: {
            chainId: val
          }
        })
      },
      //点击区块高度进入区块链详情
      toBlockChainDetail( id, h) {
        this.$router.push({
          path: 'blockchainDetail',
          query: {
            height: h,
            chainId: id
          }
        })
      },
      /*点击地址跳到地址详情*/
      toAddressDetails(id, address) {
        this.$router.push({
            path: 'addressDetail',
            query: {
              chainId: id,
              address
            }
        })
      },

    },
    created() {
      // this.getTokenTransfer()
      if(this.$route.query.activeName) {
        this.activeName = this.$route.query.activeName
      }
      this.activeName == 'tokenTransfer' ? this.getTokenTransfer() : this.getTokenHoldings()
      this.getCurrencyDetails()
    }
}
</script>

<style lang="scss" scoped>
.el-form-item span {
  font-size: 17px;
}

.row {
  width: 100%;
  font-size: 16px;
  .left {
    // float: left;
    display: inline-block;
    width: 600px;
    // margin-right: 200px;
    margin-bottom: 20px;
  }
}
</style>