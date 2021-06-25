<template>
  <div class="page-wrap">
    <div class="main-title">{{$t('title.block_details')}}</div>
    <div class="common-header header-wrap">
      <div>
        <div class="dot"></div>
        <span class="label">{{$t('title.block_height')}}#</span>
        <span class="left-value">{{allData.blockHeight==undefined?currentHeight:allData.blockHeight}}</span>
      </div>
      <div v-if="currencyPc">
        <div class="dot"></div>
        <span class="label">{{$t('table.own_chain')}}</span>
        <span class="left-value">{{$t(allData.belongToChain)}}</span>
      </div>
    </div>
    <div class="content-wrap">
      <div class="content-left common-block">
        <div class="header">
          <img src="@/assets/images/block/block.png" alt="">
          <span>{{$t('title.block_information')}}</span>
        </div>
        <div class="item-wrap">
      <div class="item-row">
        <div class="item-title">
          {{$t('title.block_height')}}
        </div>
        <div class="item-content" style="  user-select: none;">
          <div class="special">
            {{allData.blockHeight==undefined?currentHeight:allData.blockHeight}}
            <div>
              <img src="@/assets/images/block/qiehuan.png" @click="blockSwitching(0)" alt="">
            <img class="next-img" src="@/assets/images/block/qiehuan.png" @click="blockSwitching(1)" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="item-row" v-if="currencyPc">
        <div class="item-title">
          {{$t('table.own_chain')}}
        </div>
        <div class="item-content ">
          <span>{{$t(allData.belongToChain)}}</span>
        </div>
      </div>
      <div class="item-row">
        <div class="item-title">
          {{$t('table.timestamp')}}
        </div>
        <div class="item-content">
          {{timestampToTime(allData.timeStamp)}}
        </div>
      </div>
      <div class="item-row" v-if="chainId != 0">
        <div class="item-title">
          {{$t('title.trading_information')}}
        </div>
        <div class="item-content " >
          <span>{{allData.txNum}}</span>
        </div>
      </div>
      <div class="item-row">
        <div class="item-title">
          Hash
        </div>
        <div class="item-content">
          {{allData.blockHash}}
        </div>
      </div>
      <div class="item-row">
        <div class="item-title">
          {{$t('title.parent_block_hash')}}
        </div>
        <div class="item-content color-choose" @click="blockSwitching(0)">
          {{allData.parentBlockHash}}
        </div>
      </div>
      <div class="item-row" >
        <div class="item-title">
          {{$t('title.participation_round')}}
        </div>
        <div class="item-content">
          {{allData.runRound}}
        </div>
      </div>
      <div class="item-row" v-if="currencyPc">
        <div class="item-title con-left-last" style="line-height: 100px">
          {{$t('title.participant_member_details')}}
        </div>
        <div class="item-content con-right-last ">
          <div v-for=" item in allData.runUserInfo" :key="item">
            {{item}}；&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </div>
      </div>
      <div class="content-right common-block">
        <div class="header">
          <img src="@/assets/images/tradeDetail/trade-mark.png" alt="">
          <span>{{$t('title.块内交易')}}</span>
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
    </div>
    
    <!-- <div class="con-title" v-if="currencyPc">
      {{$t('table.own_chain')}}：
      <span>{{$t(allData.belongToChain)}}</span>
    </div>
    <div class="con-title con1 " style="margin-top:20px">
      {{$t('title.blockchain_details')}} #{{allData.blockHeight==undefined?currentHeight:allData.blockHeight}}
    </div> -->
   
    <!-- <div class="item-wrap">
      <div class="item-row">
        <div class="item-title">
          {{$t('title.block_height')}}
        </div>
        <div class="item-content" style="  user-select: none;">
          {{allData.blockHeight==undefined?currentHeight:allData.blockHeight}}
          <span class="el-icon-caret-left mcd-icon" @click="blockSwitching(0)"></span>
          <span class=" el-icon-caret-right mcd-icon" @click="blockSwitching(1)"></span>
        </div>
      </div>
      <div class="item-row" v-if="currencyPc">
        <div class="item-title">
          {{$t('table.own_chain')}}
        </div>
        <div class="item-content ">
          <span>{{$t(allData.belongToChain)}}</span>
        </div>
      </div>
      <div class="item-row">
        <div class="item-title">
          {{$t('table.timestamp')}}
        </div>
        <div class="item-content">
          {{timestampToTime(allData.timeStamp)}}
        </div>
      </div>
      <div class="item-row" v-if="chainId != 0">
        <div class="item-title">
          {{$t('title.trading_information')}}
        </div>
        <div class="item-content " >
          <span>{{allData.txNum}}</span>
        </div>
      </div>
      <div class="item-row">
        <div class="item-title">
          Hash
        </div>
        <div class="item-content">
          {{allData.blockHash}}
        </div>
      </div>
      <div class="item-row">
        <div class="item-title">
          {{$t('title.parent_block_hash')}}
        </div>
        <div class="item-content color-choose" @click="blockSwitching(0)">
          {{allData.parentBlockHash}}
        </div>
      </div>
      <div class="item-row" >
        <div class="item-title">
          {{$t('title.participation_round')}}
        </div>
        <div class="item-content">
          {{allData.runRound}}
        </div>
      </div>
      <div class="item-row" v-if="currencyPc">
        <div class="item-title con-left-last" style="line-height: 100px">
          {{$t('title.participant_member_details')}}
        </div>
        <div class="item-content con-right-last ">
          <div v-for=" item in allData.runUserInfo" :key="item">
            {{item}}；&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
  import { blockDetails, tradingList } from '@/api/pcApi'
  import tradeInfoList from '../../components/TradeInfoList'

  export default {
    components: {tradeInfoList},
    name: 'sliceChainBlockDetails',
    data() {
      return {
        currencyPc: '',
        allData: '',
        memberdetails: '',
        is_zh: true,
        chain_list: {},
        currentHeight: '',
        transaction_data: [],
        data_length: 0,
        chainId: '',
        total: 0,
        currentPage: 1,
        pagesize: 5,
        myCurrentPage: 1,
        beginRows: 1,
        orderType: '',
        trData: [],
        loading: false
      }
    },
    methods: {
      /*初始化获取数据*/
      getInitData() {
        let data = {
            blockHeight: this.currentHeight,
            chainId: this.$route.query.chainId,
            blockHash: this.$route.query.blockHash
          }
          blockDetails(data).then( res => {
            this.currentHeight = res.data && res.data.blockHeight
            this.currentHeight = res.data == null ? this.currentHeight-1 : this.currentHeight
            this.allData = res.data
            this.chainId = res.data.chainId
            this.getData()
          })
      },
      /*切换=>点击父块hash等同于切换上一块*/
      blockSwitching(e) {
        if (e == 0) {
          this.currentHeight = Number(this.currentHeight) - 1
        } else {
          this.currentHeight = Number(this.currentHeight) + 1
        }
        this.getInitData()
      },
      // 获取交易信息列表
        async getData(val) {
            this.loading = true
            let data = {
                orderType: this.orderType,
                timeStamp: "",
                chainId: this.chainId,
                blockHeight: this.currentHeight,
                parentType: '',
                childType: '',
                page: val ? val : this.currentPage,
                rows: 60
            }
            let res = await tradingList(data)
            this.trData = []
            this.trData = res.data.data
            this.total = res.data.total
            this.loading = false
        },
        updateData(val) {
             let data = {
              orderType: this.orderType,
              timeStamp: this.trData[0] && this.trData[this.trData.length-1].timeStamp,
              chainId: this.chainId,
              blockHeight: this.currentHeight,
              parentType: '',
              childType: '',
              page: val,
              rows: 50,
              tables: this.tables
            }
            tradingList(data).then(res => {
              this.trData = [...this.trData, ...res.data.data]
              this.total = res.data.total
            })
        },
        //处理分页中的tables参数
      handleTablesParams() {
        this.tables = _.cloneDeep(this.trData.slice(this.trData.length -10, this.trData.length))
            this.tables = this.tables.map(item => item = {chainId:item.chainId, tableName:item.tableName, tableId:item.tableId})
      },
      /*page切换*/
      currentPageChange(e) {
        this.currentPage = e
        //点击第一页，并且是从倒序(点击过最后一页)的页面回点第一页
        if(e == 1 && this.orderType == 1) {
          this.orderType = ''
          this.getData()
        }
        if(this.total <= 60) {
          return false
        }
        //当点击最后一页的时候(变成倒序的了)
        if(e == Math.ceil(this.total / this.pagesize)) {
          this.loading = true
          this.orderType = 1
          this.beginRows = (this.total % this.pagesize == 0) ? this.pagesize : (this.total % this.pagesize)
          //把最后一页变成第一页，倒数第二页是第二页，以此类推
          this.myCurrentPage = Math.ceil(this.total / this.pagesize) - this.currentPage + 1
          this.getData(this.myCurrentPage)
        }
        //正序，从前往后点击
        if(this.orderType != 1) {
          if(this.trData.length - this.currentPage * this.pagesize < 50 && this.trData.length < this.total) {
            this.handleTablesParams()
            this.updateData(this.currentPage)
          }
        }
        //倒序，从后往前点击
        if(this.orderType == 1 && e != Math.ceil(this.total / this.pagesize)) {
          this.beginRows = (this.total % this.pagesize == 0) ? this.pagesize : (this.total % this.pagesize)
          this.myCurrentPage = Math.ceil(this.total / this.pagesize) - this.currentPage + 1
          if(this.trData.length - this.myCurrentPage * this.pagesize < 50 && this.trData.length < this.total) {
            this.handleTablesParams()
            this.updateData(this.myCurrentPage)
          }
        }
      },
    },
    created() {
      this.currencyPc = localStorage.getItem('currencyPc')
      this.currentHeight = this.$route.query.height
      this.chainId = this.$route.query.chainId
      this.getInitData()
    }
  }
</script>

<style scoped lang="scss">
  .table-wrap {
    padding: 0.09rem 0.17rem 0 0.17rem;
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
  }
  .content-wrap {
    display: flex;
    .content-left {
      width: 6.56rem;
      height: 6.16rem;
      margin-right: 0.3rem;
    }
    .content-right {
      flex: 1;
      >.header {
        border-bottom: 0.02rem solid #F6F4FB;
      }
    }
    .content-left,.content-right {
      >.header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 0.61rem;
        color: $themeColor;
        font-size: 0.24rem;
        font-weight: bold;
        img {
          width: 0.28rem;
          height: 0.28rem;
          margin-left: 0.2rem;
          margin-right: 0.16rem;
        }
      }
    }
  }

  .item-wrap {
    width: 100%;
    // border: 1px solid #DCDFE6;
    border-bottom: 0px;
    font-size: 0.18rem;
    .item-row {
      display: flex;
      // border-bottom: 1px solid #DCDFE6;
      // padding: 0 0.15rem;
      .item-title {
        width: 30%;
        // line-height: 2;
        border-top: 0.01rem solid #F6F4FB;
        border-right: 0.01rem solid #F6F4FB;
        // text-align: center;
        padding-left: 0.15rem;
        display: flex;
        align-items: center;
      }

      .item-content {
        border-top: 0.01rem solid #F6F4FB;
        word-break: break-all;
        width: 70%;
        // line-height: 2;
        padding: 0.14rem 0.15rem;
        .special {
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            width: 0.27rem;
            height: 0.27rem;
            cursor: pointer;
          }
          .next-img {
            transform: rotate(180deg);
            margin-left: 0.26rem;
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
  .mcd-icon {
    font-size: 30px;
    padding: 0 10px;
    margin-left: 30px;
    cursor: pointer;
    color: $themeColor;
    position: relative;
    top: 6px;
  }

  .con-right-last::-webkit-scrollbar { /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .con-right-last::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
    background: #b5b5b5;
  }

  .con-right-last::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: #ffffff;
  }

  .con-right-last {
    height: 100px;
    overflow: auto;
  }

  .con-left-last {
    height: 100px;
  }

  

  

  

  .con-title {
    height: 45px;
    font-size: 18px;
    /* color: #800080; */
    padding-bottom: 20px;
  }

  .con1 {
    font-size: 17px;
  }

  .page-wrap {
    width: 100%;
    margin-bottom: 80px;
  }
</style>
