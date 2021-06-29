<template>
  <div class="page-wrap">
    <!-- <div class="con-title">
      {{$t('title.trading_information')}}
    </div>
      <div class="search-wrap" style="width: 650px;margin-bottom: 30px">
        <div class="search">
          <div class="input-wrap">
            <span class="el-icon-search search-input-icon"></span>
            <el-input v-model="searchTransactionValue" :placeholder="$t('placeholder.placeholder_5')"></el-input>
          </div>
          <el-button type="primary" @click="searchHash()" style="float: right">
            {{$t('placeholder.search')}}
          </el-button>
        </div>
      </div> -->
    <SearchBox></SearchBox>
    <div class="common-header header-wrap">
      <div class="around-item">
        <div class="dot"></div>
        <span class="label">{{$t('table.own_chain')}}</span>
        <el-select v-model="chainValue" :placeholder="$t('placeholder.choose')">
          <el-option
            v-for="item in chainOptions"
            :key="item.chainId"
            :label="$t(item.chainName)"
            :value="item.chainId">
          </el-option>
        </el-select>
      </div>
      <div class="around-item">
        <div class="dot"></div>
        <span class="label">{{$t('table.transaction_type')}}</span>
        <el-select v-model="txTypeValue" :placeholder="$t('placeholder.choose')" @change="selectChange">
        <el-option
          v-for="item in txTypeOptions"
          :key="item.txType"
          :label="$t(item.txTypeName)"
          :value="item.txType">
        </el-option>
      </el-select>
      <el-select style="margin-left: 40px" v-model="txChildrenTypeValue" :placeholder="$t('placeholder.choose')">
        <el-option
          v-for="item in txChildrenTypeOptions"
          :key="item.txType"
          :label="$t(item.txTypeName)"
          :value="item.txType">
        </el-option>
      </el-select>
      </div>
      <el-button type="primary" style="float: right" @click="filterData()"> {{$t('placeholder.filter')}}</el-button>
    </div>
    <div class="content-wrap common-block">
      <div class="header">
        <div class="left-wrap">
          <img src="@/assets/images/address/tradeInfo.png" alt="">
          <span>{{$t('title.transaction')}}</span>
        </div>
        <div class="right-wrap">{{$t('title.current_total')}}<span> {{total}} </span>{{$t('title.transactions')}}</div>
      </div>
      <div class="table-wrap">
        <tradeInfoList v-loading="loading" :trData="orderType != 1 ? trData.slice( (currentPage-1)*pagesize, currentPage*pagesize) : trData.slice( (myCurrentPage-2 < 0 ? 0 : ((myCurrentPage-2)*pagesize + beginRows)), (myCurrentPage-1)*pagesize + beginRows).reverse()"
                   :isShow="true" :currencyPc="currencyPc"></tradeInfoList>
        <el-pagination
        style="float:none;text-align:center"
          background
          @current-change="currentPageChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- <div class="filter-wrap" style="width: 850px" v-if="currencyPc">
      
      
      
    </div> -->
    
    
  </div>
</template>

<script>
  import _ from 'lodash'
  import { tradingDetails, tradingList, getTxType, chainList } from '@/api/pcApi'
  import tradeInfoList from '../../components/TradeInfoList'
  import SearchBox from '../../components/SearchBox'

  export default {
    components: {
      tradeInfoList,
      SearchBox
    },
    name: 'tradeList',
    data() {
      return {
        currencyPc: '',
        myCurrentPage: 1,
        beginRows: 1,
        orderType: '',
        trData: [],
        chainOptions: [{
          chainId: '',
          chainName: 'select.all'
        }],
        txTypeOptions: [],
        txChildrenTypeOptions: [{
          txType: '',
          txTypeName: 'select.all'
        }],
        chain_list: {},
        searchTransactionValue: '',
        chainValue: '',
        txTypeValue: '',
        txChildrenTypeValue: '',
        tableData: [],
        loading: false,
        currentPage: 1,
        pagesize: 10,
        total: 0,
        all_data: '',
        is_click: false,
        tables: ''
      }
    },
    methods: {
      //当交易类型变化时候对应子交易类型变化
      selectChange() {
        this.txChildrenTypeValue = ''
        this.txChildrenTypeOptions = []
        let item = this.txTypeOptions.find(item => item.txType == this.txTypeValue)
        
        if(item.txType == 3) {  
          this.txChildrenTypeOptions = JSON.parse(JSON.stringify([item.childrens[2],item.childrens[3]]))
        } else {
          this.txChildrenTypeOptions = JSON.parse(JSON.stringify(item.childrens))
        }
        this.txChildrenTypeOptions.unshift({
            txType: '',
            txTypeName: 'select.all'
        })
      },
      // 获取交易信息列表
      async getData() {
        this.loading = true
        let data = {
          chainId: this.chainValue,
          parentType: this.txTypeValue,
          childType: this.txChildrenTypeValue,
          address: "",
          page: this.currentPage,
          rows: 60
        }
        let res = await tradingList(data)
        this.trData = []
        this.trData = res.data.data
        this.total = res.data.total
        this.loading = false
      },
      //获取交易类型
      async getTxTypeInfo() {
        let res = await getTxType()
        this.txTypeOptions = res.data
        this.txTypeOptions.unshift({
          txType: '',
          txTypeName: 'select.all'
        })
      },
      //获取链的列表数据
      async getChainList() {
        let res = await chainList()
        this.chainOptions = [...this.chainOptions, ...res.data]
      },
      //处理分页中的tables参数
      handleTablesParams() {
        this.tables = _.cloneDeep(this.trData.slice(this.trData.length -10, this.trData.length))
            this.tables = this.tables.map(item => item = {chainId:item.chainId, tableName:item.tableName, tableId:item.tableId})
      },
      /*page切换  待优化*/
      currentPageChange(e) {
        this.currentPage = e
        //点击第一页，并且是从倒序(点击过最后一页)的页面回点第一页
        if(e == 1 && this.orderType == 1) {
          this.orderType = 0
          this.getData()
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
              orderType: this.orderType,
              timeStamp: "",
              chainId: this.chainValue,
              parentType: this.txTypeValue,
              childType: this.txChildrenTypeValue,
              address: "",
              page: this.myCurrentPage,
              rows: 60
          }
          tradingList(data).then( res => {
            this.trData = res.data.data
            this.total = res.data.total
            this.loading = false
          })
        }
        //正序，从前往后点击
        if(this.orderType != 1) {
          if(this.trData.length - this.currentPage * 10 < 50 && this.trData.length < this.total) {
            this.handleTablesParams()
            // let tables = JSON.parse(JSON.stringify(this.trData.slice(this.trData.length -10, this.trData.length)))
            console.log(this.tables,'tables')
            let data = {
              timeStamp: this.trData[this.trData.length-1].timeStamp,
              chainId: this.chainValue,
              parentType: this.txTypeValue,
              childType: this.txChildrenTypeValue,
              address: "",
              page: this.currentPage,
              rows: 50,
              tables: this.tables
            }
            tradingList(data).then(res => {
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
              orderType: this.orderType,
              timeStamp: this.trData[0] && this.trData[this.trData.length-1].timeStamp,
              chainId: this.chainValue,
              parentType: this.txTypeValue,
              childType: this.txChildrenTypeValue,
              address: "",
              page: this.myCurrentPage,
              rows: 50,
              tables: this.tables
            }
            tradingList(data).then(res => {
              this.trData = [...this.trData, ...res.data.data]
              this.total = res.data.total
            })
            
          }
        }
      },
      /*根据hash查询=>跳转至地址详情界面*/
      searchHash() {
        if (this.searchTransactionValue == '') {
          this.$store.getters.language == 'en' ? this.$message.error('Query transaction details transaction hash/account address cannot be empty!') : this.$message.error('查询交易详情交易哈希不能为空！')
        } else {
          let data = {
            'hash': this.searchTransactionValue.trim(),
          }
          tradingDetails(data).then(response => {
            if (response.data == null) {
              if (this.$store.getters.language == 'en') {
                this.$message.error('The current transaction details transaction hash/account address query result is empty, please check and enter again!');
              } else {
                this.$message.error('当前交易详情交易哈希查询结果为空，请检查后再次输入！');
              }
            } else {
              // let type = response.data.transactionsList.dataList[0].txType
              this.$router.push({
                  path: 'tradeDetail',
                  query: {
                    hash: this.searchTransactionValue.trim()
                  }
                })
            }
          })
        }
      },
      /*根据链和类型筛选数据*/
      filterData() {
        this.currentPage = 1
        this.orderType = 0
        this.getData()
      }
    },
    created() {
      this.currencyPc = localStorage.getItem('currencyPc')
      this.getData()
      this.getChainList()
      this.getTxTypeInfo()
    }
  }
</script>

<style scoped lang="scss">
  .page-wrap .search .input-wrap input {
    text-indent: 30px;
  }
  .header-wrap {
    .around-item {
      display: flex;
      align-items: center;
      .dot {
        width: 0.05rem;
        height: 0.05rem;
        background: $themeColor;
        border-radius: 0.03rem;
      }
      .label {
        margin-left: 0.12rem;
        margin-right: 0.11rem;
        color: #666666;
        font-size: 0.24rem;
        font-weight: bold;
      }
    }
  }
  .content-wrap {
    margin-top: 0.4rem;
    .header {
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0.02rem solid #F6F4FB;
      .left-wrap {
        display: flex;
        align-items: center;
        img {
          margin-left: 0.17rem;
          margin-right: 0.12rem;
        }
        span {
          color: $themeColor;
          font-size: 0.26rem;
          font-weight: bold;
        }
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
    .table-wrap {
      padding: 0.2rem 0.28rem;
    }
  }
  .filter-wrap {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .el-pagination {
    position: relative;
    float: right;
    margin-right: 3%;
    margin-top: 30px;
  }

  .search-input-icon {
    position: absolute;
    margin-left: 15px;
    margin-top: 10px;
    z-index: 1;
  }

  .input-wrap {
    display: flex;
    width: 70%;
  }

  .search {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .search-wrap {
    width: 650px;
    margin-left: 0px;
  }

  .page-wrap {
    width: 100%;
    margin-bottom: 180px;
  }

  .con-title {
    height: 25px;
    font-size: 18px;
    padding-bottom: 20px;
  }
</style>
