<template>
  <div class="page-wrap">
    <div class="main-title">{{$t('title.address_de')}}</div>
    <div class="common-block header-wrap">
      <div @click="copy(is32Decimal ? getData.address : to32Decimal(getData.address))">
        <div class="dot"></div>
        <span class="label">{{$t('title.address')}}</span>
        <span class="left-value">{{ is32Decimal ? getData.address : to32Decimal(getData.address)}}</span>
        <img src="@/assets/images/address/copy.png" alt="">
      </div>
      <div v-if="currencyPc">
        <div class="dot"></div>
        <span class="label">{{$t('title.amount')}}</span>
        <span><span class="right-value">{{(accountData.currencyAmount)}}</span>{{currencyPc}}</span>
      </div>
    </div>
    <div style="marginBottom:30px" v-if="currencyPc">
      <el-button
        v-if="addressType == 1"
        type="primary"
        @click="toCurrencyDetails(getData.address)"
      >{{$t('title.contract_token_details')}}</el-button>
      <el-button
        v-if="addressType == 0"
        type="primary"
        @click="toXtoList"
      >{{$t('title.current_address_holdings_of_each_token')}}</el-button>
    </div>
    <div class="content-wrap">
      <div class="content-left common-block" v-if="currencyPc">
        <div class="header">
          <img src="@/assets/images/address/holdDetails.png" alt="">
          <span>{{$t('title.持有详情')}}</span>
        </div>
        <div class="hold-details-wrap">
          <div class="hold-details-item">
            <img src="@/assets/images/address/1.png" alt="" >
            <span class="hold-value">{{accountData.taskChains && accountData.taskChains[0].currencyAmount}}</span>
            <span>{{accountData.taskChains && $t(accountData.taskChains[0].taskChain)}}</span>
          </div>
          <div class="hold-details-item">
            <img src="@/assets/images/address/2.png" alt="">
            <span class="hold-value">{{accountData.taskChains && accountData.taskChains[1].currencyAmount}}</span>
            <span>{{accountData.taskChains && $t(accountData.taskChains[1].taskChain)}}</span>
          </div>
          <div class="hold-details-item">
            <img src="@/assets/images/address/3.png" alt="">
            <span class="hold-value">{{accountData.taskChains && accountData.taskChains[2].currencyAmount}}</span>
            <span>{{accountData.taskChains && $t(accountData.taskChains[2].taskChain)}}</span>
          </div>
        </div>
        <div class="hold-details-wrap-bottom">
          <div class="hold-details-item">
            <img src="@/assets/images/address/4.png" alt="">
            <span class="hold-value">{{scientificCounting(accountData.taskChains && accountData.taskChains[0].taskChainChildren[0].currencyAmount)}}</span>
            <span>{{accountData.taskChains && $t(accountData.taskChains[0].taskChainChildren[0].taskChain)}}</span>
          </div>
          <div class="hold-details-item">
            <img src="@/assets/images/address/5.png" alt="">
            <span class="hold-value">{{scientificCounting(accountData.taskChains && accountData.taskChains[1].taskChainChildren[0].currencyAmount)}}</span>
            <span>{{accountData.taskChains && $t(accountData.taskChains[1].taskChainChildren[0].taskChain)}}</span>
          </div>
        </div>
      </div>
      <div class="content-right common-block">
        <div class="header">
          <img src="@/assets/images/address/tradeInfo.png" alt="">
          <span>{{$t('title.trading_information')}}</span>
        </div>
        <div class="tab-wrap">
          <div class="tab-item" :class="{'active': activeName == 'externalTransaction'}" @click="selectClick('externalTransaction')">{{$t('title.外部交易')}}</div>
          <div class="tab-item" :class="{'active': activeName == 'insideTransaction'}" @click="selectClick('insideTransaction')">{{$t('title.内部交易')}}</div>
        </div>
        <div class="table-wrap">
          <tradeInfoList
            v-if="activeName == 'externalTransaction'"
            v-loading="loading"
            :currencyPc="currencyPc"
            :isShow="true"
            :pageType="'addressDetail'"
            :trData="orderType != 1 ? trData.slice( (currentPage-1)*pagesize, currentPage*pagesize) : trData.slice( (myCurrentPage-2 < 0 ? 0 : ((myCurrentPage-2)*pagesize + beginRows)), (myCurrentPage-1)*pagesize + beginRows).reverse()"
          ></tradeInfoList>

          <el-table
          v-if="activeName == 'insideTransaction'"
          v-loading="loading"
          :data="orderType != 1 ? tableData.slice( (currentPage-1)*pagesize, currentPage*pagesize) : tableData.slice( (myCurrentPage-2 < 0 ? 0 : ((myCurrentPage-2)*pagesize + beginRows)), (myCurrentPage-1)*pagesize + beginRows).reverse()"
          style="width: 100%;margin-bottom: 30px;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
          :header-cell-style="this.tableHeaderColor"
          :row-class-name="$tableRowClassName"
        >
          <el-table-column :label="$t('table.transaction_hash')" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.transactionHash" placement="top-start">
                <span
                  class="color-choose"
                  @click="seeTransactionInformation(scope.row.chainId,scope.row.txType,scope.row.transactionHash)"
                >{{sliceHash(scope.row.transactionHash)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.own_chain')" align="center">
            <template slot-scope="scope">
              <span
                class="to_tr color-choose"
                @click="toTaskChain(scope.row.chainId)"
              >{{$t(scope.row.chainName)}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.timestamp')" align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timestamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('title.block_height')" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.blockNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('title.address')" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="to32Decimal(scope.row.address)" placement="top-start">
                <span>{{sliceAddress(scope.row.address)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </div>
    </div>
    <el-pagination
          v-if="activeName == 'externalTransaction'"
          background
          @current-change="currentPageChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
    <el-pagination
          v-if="activeName == 'insideTransaction'"
          background
          @current-change="currentPageChange_2"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
    <!-- 根据发起方还是接收方点进来的，和交易类型来区分展示不展示 -->
    <!-- <div class="con-title">{{$t(currencyPc ? 'title.blockchain_details' : 'title.address_de')}}</div>
    <div class="con-title" style="font-size: 17px">
      {{$t(currencyPc ? 'title.address_de' : 'title.address')}}：
      <span
        style="color: #82848a;margin-left: 20px"
      >{{ is32Decimal ? getData.address : to32Decimal(getData.address)}}</span>
    </div>
    <div v-if="currencyPc">
      <div class="con-title" style="font-size: 17px">
        {{$t('title.amount')}}：
        <span style="color: #82848a;margin-left: 50px">
          {{(accountData.currencyAmount)}}
          <span>{{currencyPc}}</span>
        </span>
      </div>
      <div
        class="con-title"
        style="font-size: 17px;padding-bottom: 0"
      >{{$t('title.amount_detail')}}：</div>
      <div style="paddingLeft:40px">
        <div class="amount-detail" v-for="item in accountData.taskChains" :key="item.taskChain">
          <span style="display:inline-block;width:350px">
            <span class>{{$t(item.taskChain)}}:</span>
            <span
              style="marginLeft: 30px;marginRight:30px"
            >{{item.currencyAmount + ' ' + currencyPc}}</span>
          </span>
          <span>{{item.taskChainChildren && $t(item.taskChainChildren[0].taskChain) + ':'}}</span>
          <span
            style="marginLeft: 30px"
          >{{item.taskChainChildren && item.taskChainChildren[0].currencyAmount/1000000000000000000 + ' ' + currencyPc}}</span>
        </div>
      </div>
    </div>
    <div>
      <el-button
        v-if="addressType == 1"
        type="primary"
        style="margin-left:20px;"
        @click="toCurrencyDetails(getData.address)"
      >{{$t('title.contract_token_details')}}</el-button>
      <el-button
        v-if="addressType == 0"
        type="primary"
        style="margin-left:20px;"
        @click="toXtoList"
      >{{$t('title.current_address_holdings_of_each_token')}}</el-button>
    </div>
    <el-row v-if="currencyPc && activeName == 'externalTransaction'">
      <div style="display: inline-block;float:right">
        <el-select
          style="margin-right: 40px"
          v-model="txTypeValue"
          :placeholder="$t('placeholder.choose')"
          @change="selectChange"
        >
          <el-option
            v-for="item in txTypeOptions"
            :key="item.txType"
            :label="$t(item.txTypeName)"
            :value="item.txType"
          ></el-option>
        </el-select>
        <el-select
          style="margin-right: 40px"
          v-model="txChildrenTypeValue"
          :placeholder="$t('placeholder.choose')"
        >
          <el-option
            v-for="item in txChildrenTypeOptions"
            :key="item.txType"
            :label="$t(item.txTypeName)"
            :value="item.txType"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          style="float: right"
          @click="searchClick()"
        >{{$t('placeholder.filter')}}</el-button>
      </div>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 30px">
      <el-tab-pane :label="$t('title.外部交易')" name="externalTransaction">
        <tradeInfoList
          v-loading="loading"
          :currencyPc="currencyPc"
          :isShow="true"
          :pageType="'addressDetail'"
          :trData="orderType != 1 ? trData.slice( (currentPage-1)*pagesize, currentPage*pagesize) : trData.slice( (myCurrentPage-2 < 0 ? 0 : ((myCurrentPage-2)*pagesize + beginRows)), (myCurrentPage-1)*pagesize + beginRows).reverse()"
        ></tradeInfoList>
        <el-pagination
          background
          @current-change="currentPageChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane :label="$t('title.内部交易')" name="insideTransaction">
        <el-table
          v-loading="loading"
          :data="orderType != 1 ? tableData.slice( (currentPage-1)*pagesize, currentPage*pagesize) : tableData.slice( (myCurrentPage-2 < 0 ? 0 : ((myCurrentPage-2)*pagesize + beginRows)), (myCurrentPage-1)*pagesize + beginRows).reverse()"
          style="width: 100%;margin-bottom: 30px;min-height: 529px;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column :label="$t('table.transaction_hash')" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.transactionHash" placement="top-start">
                <span
                  class="color-choose"
                  @click="seeTransactionInformation(scope.row.chainId,scope.row.txType,scope.row.transactionHash)"
                >{{sliceHash(scope.row.transactionHash)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.own_chain')" align="center">
            <template slot-scope="scope">
              <span
                class="to_tr color-choose"
                @click="toTaskChain(scope.row.chainId)"
              >{{$t(scope.row.chainName)}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.timestamp')" align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timestamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('title.block_height')" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.blockNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('title.address')" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="to32Decimal(scope.row.address)" placement="top-start">
                <span>{{sliceAddress(scope.row.address)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          @current-change="currentPageChange_2"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import {
  tradingList,
  addressDetails,
  getTxType,
  checkAddress,
  insideTransactionList,
} from "@/api/pcApi";
import tradeInfoList from "../components/TradeInfoList";
import _ from 'lodash'
import copyFn from '@/utils/copy.js' 

export default {
  components: { tradeInfoList },
  name: 'addressDetails',
  data() {
    return {
      activeName: 'externalTransaction',
      chainId: 0,
      myCurrentPage: 1,
      beginRows: 1,
      orderType: '',
      trData: [],
      txTypeValue: '',
      txTypeOptions: [],
      txChildrenTypeValue: '',
      txChildrenTypeOptions: [
        {
          txType: '',
          txTypeName: 'select.all',
        },
      ],
      currentPage: 1,
      // pagesize: 10,
      pagesize: 7,
      total: 0,
      tableData: [],
      chain_data: '',
      loading: false,
      chain_list: {},
      getData: '',
      accountData: '',
      pageType: 'addressDetail',
      currencyPc: '',
      xtoName: '',
      addressType: '',
      tables: '',
      is32Decimal: true
    };
  },
  methods: {
    copy(val) {
            copyFn(val)
            this.$message({
                message: '复制成功',
                type: 'success'
            })
        },
    toTaskChain(val) {
        this.$router.push({
          path: 'taskChain',
          query: {
            chainId: val
          }
        })
      },
    /*点击交易信息=>交易hash=>到达几种交易详情*/
    seeTransactionInformation(id, type, hash) {
      this.$router.push({
        path: "tradeDetail",
        query: {
          type: type,
          hash: hash,
        },
      });
    },
    async getInsideTransactionList() {
      this.loading = true;
      let data = {
        orderType: "",
        timeStamp: "",
        chainId: "",
        address: this.transformAddress(this.getData.address,'0x'),
        page: this.currentPage,
        rows: 60,
      };
      let res = await insideTransactionList(data);
      this.tableData = res.data.data;
      this.total = res.data.total;
      this.loading = false;
    },
    selectClick(val) {
      this.activeName = val
      this.orderType = "";
      this.currentPage = 1
      this.total = 0;
      this.activeName == "insideTransaction" ? this.getInsideTransactionList() : this.getTradingList();
    },
    handleClick(tab, event) {
      this.orderType = "";
      this.currentPage = 1
      this.total = 0;
      tab.name == "insideTransaction"
        ? this.getInsideTransactionList()
        : this.getTradingList();
    },

    //内部交易切换页面
    currentPageChange_2(e) {
      this.currentPage = e;
      //点击第一页，并且是从倒序(点击过最后一页)的页面回点第一页
      if (e == 1 && this.orderType == 1) {
        this.orderType = "";
        this.getInsideTransactionList();
      }
      //当点击最后一页的时候(变成倒序的了)
      if (e == Math.ceil(this.total / this.pagesize)) {
        this.loading = true;
        this.orderType = 1;
        this.beginRows = this.total % this.pagesize == 0 ? this.pagesize : this.total % this.pagesize;
        //把最后一页变成第一页，倒数第二页是第二页，以此类推
        this.myCurrentPage = Math.ceil(this.total / this.pagesize) - this.currentPage + 1;
        this.tableData = [];
        let data = {
          orderType: this.orderType,
          timeStamp: "",
          address: this.transformAddress(this.getData.address,'0x'),
          page: this.myCurrentPage,
          rows: 60,
        };
        insideTransactionList(data).then((res) => {
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.loading = false;
        });
      }
      //正序，从前往后点击
      if (this.orderType != 1) {
        if (this.tableData.length - this.currentPage * this.pagesize < 50) {
          let data = {
            orderType: this.orderType,
            timeStamp: this.tableData[this.tableData.length - 1].timestamp,
            address: this.transformAddress(this.getData.address,'0x'),
            page: this.currentPage,
            rows: 50,
          };
          console.log("正序，从前往后点击");
          insideTransactionList(data).then((res) => {
            this.tableData = [...this.tableData, ...res.data.data];
            this.total = res.data.total;
          });
        }
      }
      //倒序，从后往前点击
      if (this.orderType == 1 && e != Math.ceil(this.total / this.pagesize)) {
        this.beginRows = this.total % this.pagesize == 0 ? this.pagesize : this.total % this.pagesize;
        this.myCurrentPage = Math.ceil(this.total / this.pagesize) - this.currentPage + 1;
        if (this.tableData.length - this.myCurrentPage * this.pagesize < 50) {
          console.log(
            "倒序，从后往前点击",
            this.tableData.length,
            this.myCurrentPage
          );
          let data = {
            orderType: this.orderType,
            timeStamp:
              this.tableData[0] &&
              this.tableData[this.tableData.length - 1].timestamp,
            address: this.transformAddress(this.getData.address,'0x'),
            page: this.myCurrentPage,
            rows: 50,
          };
          insideTransactionList(data).then((res) => {
            this.tableData = [...this.tableData, ...res.data.data];
            this.total = res.data.total;
          });
        }
      }
    },
    //跳转到xto列表
    toXtoList() {
      this.$router.push({
        path: "/xtoList",
        query: {
          accAddress: this.getData.address,
        },
      });
    },
    /* 跳转到币种详情页 */

    toCurrencyDetails(val) {
      this.$router.push({
        path: "currencyDetail",
        query: {
          contractAddress: val,
          activeName: "holdings",
        },
      });
    },
    //获取地址详情列表
    async getTradingList() {
      this.loading = true;
      let data = {
        address: this.transformAddress(this.getData.address,'0x'),
        parentType: this.txTypeValue,
        childType: this.txChildrenTypeValue,
        page: this.currentPage,
        rows: 60,
      };
      let res = await tradingList(data);
      this.trData = res.data.data;
      this.total = res.data.total;
      this.loading = false;
      //为了考虑通过地址搜索的时候无法传类型过来
      // this.getData.type = res.data.data[0] && res.data.data[0].parentTypeName
    },
    //获取地址详情中的金额和金额明细等信息
    async getAddressDetails() {
      let data = {
        address: this.transformAddress(this.getData.address,'0x'),
      };
      let res = await addressDetails(data);
      this.accountData = res.data;
      if (this.getData.address) {
        this.checkAddress();
      }
    },
    checkAddress() {
      let data = {
        address: this.transformAddress(this.getData.address,'0x'),
      };
      checkAddress(data).then((res) => {
        console.log(res);
        this.xtoName = res.data.xtoName;
        this.addressType = res.data.type;
      });
    },
    //获取交易类型
    async getTxTypeInfo() {
      let res = await getTxType();
      this.txTypeOptions = res.data;
      this.txTypeOptions.unshift({
        txType: "",
        txTypeName: "select.all",
      });
    },
    //当交易类型变化时候对应子交易类型变化
    selectChange() {
      this.txChildrenTypeValue = "";
      this.txChildrenTypeOptions = [];
      let item = this.txTypeOptions.find(
        (item) => item.txType == this.txTypeValue
      );
      if (item.txType == 3) {
        this.txChildrenTypeOptions = JSON.parse(
          JSON.stringify([item.childrens[2], item.childrens[3]])
        );
      } else {
        this.txChildrenTypeOptions = JSON.parse(JSON.stringify(item.childrens));
      }
      this.txChildrenTypeOptions.unshift({
        txType: "",
        txTypeName: "select.all",
      });
    },
    //处理分页中的tables参数
      handleTablesParams() {
        this.tables = _.cloneDeep(this.trData.slice(this.trData.length -10, this.trData.length))
            this.tables = this.tables.map(item => item = {chainId:item.chainId, tableName:item.tableName, tableId:item.tableId})
      },
    /*page切换  待优化*/
    currentPageChange(e) {
      this.currentPage = e;
      //点击第一页，并且是从倒序(点击过最后一页)的页面回点第一页
      if (e == 1 && this.orderType == 1) {
        this.orderType = "";
        this.getTradingList();
      }
      if(this.total <= 60) {
        return false
      }
      //当点击最后一页的时候(变成倒序的了)
      if (e == Math.ceil(this.total / this.pagesize)) {
        console.log('善良大方就了的')
        this.loading = true;
        this.orderType = 1;
        this.beginRows = this.total % this.pagesize == 0 ? this.pagesize : this.total % this.pagesize;
        console.log(this.beginRows,'this.beginRows')
        //把最后一页变成第一页，倒数第二页是第二页，以此类推
        this.myCurrentPage = Math.ceil(this.total / this.pagesize) - this.currentPage + 1;
        console.log(this.myCurrentPage,'this.myCurrentPage')
        this.trData = [];
        let data = {
          orderType: this.orderType,
          timeStamp: "",
          parentType: this.txTypeValue,
          childType: this.txChildrenTypeValue,
          address: this.transformAddress(this.getData.address,'0x'),
          page: this.myCurrentPage,
          rows: 60,
        };
        tradingList(data).then((res) => {
          this.trData = res.data.data;
          this.total = res.data.total;
          this.loading = false;
        });
        return
      }
      //正序，从前往后点击
      if (this.orderType != 1) {
        if (this.trData.length - this.currentPage * this.pagesize < 50 && this.trData.length < this.total) {
          this.handleTablesParams()
          let data = {
            orderType: this.orderType,
            timeStamp: this.trData[this.trData.length - 1].timeStamp,
            parentType: this.txTypeValue,
            childType: this.txChildrenTypeValue,
            address: this.transformAddress(this.getData.address,'0x'),
            page: this.currentPage,
            rows: 50,
            tables: this.tables
          };
          console.log("正序，从前往后点击");
          tradingList(data).then((res) => {
            this.trData = [...this.trData, ...res.data.data];
            this.total = res.data.total;
          });
        }
      }
      //倒序，从后往前点击
      if (this.orderType == 1 && e != Math.ceil(this.total / this.pagesize)) {
        this.beginRows = this.total % this.pagesize == 0 ? this.pagesize : this.total % this.pagesize;
        this.myCurrentPage = Math.ceil(this.total / this.pagesize) - this.currentPage + 1;
        if (this.trData.length - this.myCurrentPage * this.pagesize < 50 && this.trData.length < this.total) {
          console.log(
            "倒序，从后往前点击"
          );
          this.handleTablesParams()
          let data = {
            orderType: this.orderType,
            timeStamp:
              this.trData[0] &&
              this.trData[this.trData.length - 1].timeStamp,
            parentType: this.txTypeValue,
            childType: this.txChildrenTypeValue,
            address: this.transformAddress(this.getData.address,'0x'),
            page: this.myCurrentPage,
            rows: 50,
            tables: this.tables
          };
          tradingList(data).then((res) => {
            this.trData = [...this.trData, ...res.data.data];
            this.total = res.data.total;
          });
        }
      }
    },
    //搜索
    searchClick() {
      this.currentPage = 1;
      this.orderType = "";
      this.getTradingList();
    }
  },
  created() {
    this.currencyPc = localStorage.getItem("currencyPc");
    this.getData = this.$route.query;
    this.is32Decimal = /^TH/g.test(this.$route.query.address)
    this.getTxTypeInfo();
    this.getAddressDetails();
    this.getTradingList();
  }
};
</script>

<style scoped lang="scss">
  /deep/ .el-table .cell {
    line-height: 0.18rem;
  }
  /deep/ .el-table {
    font-size: 0.14rem;
  }
  /deep/ .el-table td, .el-table th {
    padding: 0.12rem 0;
  }
  .header-wrap {
    display: flex;
    height: 0.9rem;
    // justify-content: space-between;
    justify-content: space-around;
    align-items: center;
    color: #666666;
    font-size: 0.18rem;
    font-weight: bold;
    // padding-left: 2.02rem;
    // padding-right: 2.08rem;
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
    }
    .left-value {
      font-size: 0.24rem;
      cursor: pointer;
    }
    .right-value {
      font-size: 0.3rem;
    }
  }

  .content-wrap {
    display: flex;
    justify-content: space-between;
    .content-left {
      // width: 6.56rem;
      width: 4.56rem;
      height: 6.73rem;
      background: #ffffff;
      margin-right: 0.28rem;
      .hold-details-wrap,.hold-details-wrap-bottom {
        display: flex;
        .hold-details-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #666666;
          font-weight: bold;
          font-size: 0.14rem;
          &:not(:last-child) {
            border-right: 0.02rem solid #F6F4FB;
          }
          .hold-value {
            margin-top: 0.14rem;
            margin-bottom: 0.1rem;
            color: $themeColor;
            font-size: 0.2rem;
            font-weight: 400;
          }
        }
      }
      .hold-details-wrap {
        height: 3.01rem;
        border-bottom: 0.02rem solid #F6F4FB;
      }
      .hold-details-wrap-bottom {
        height: 3.07rem;
      }
    }
    .content-right {
      // width: 9.93rem;
      flex: 1;
      height: 6.73rem;
      background: #ffffff;
      // background: red;
      .tab-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 0.66rem;
        .tab-item {
          padding: 0 0.19rem;
          cursor: pointer;
          color: #666666;
          font-size: 0.18rem;
          font-weight: bold;
          position: relative;
          &.active {
            color: $themeColor;
            &::after {
              content: "";
              display: inline-block;
              width: 0.42rem;
              height: 0.02rem;
              background: $themeColor;
              border-radius: 0.01rem;
              position: absolute;
              left: calc(50% - 0.21rem);
              bottom: -0.06rem;
            }
          }
        }
      }
      .table-wrap {
        // width:;
        height: 5.45rem;
        // background-color: red;
        overflow-y: auto;
      }
    }
    .content-left,.content-right {
      >.header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 0.61rem;
        border-bottom: 0.02rem solid #F6F4FB;
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
.amount-detail {
  font-size: 17px;
  margin-bottom: 10px;
  color: #82848a;
}
.el-pagination {
  position: relative;
  float: right;
  margin-top: 30px;
}

.page-wrap {
  width: 100%;
  margin-bottom: 180px;
}

.con-title {
  height: 45px;
  font-size: 18px;
  padding-bottom: 20px;
}
</style>
