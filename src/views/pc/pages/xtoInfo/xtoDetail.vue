<template>
  <div>
    <div class="header-wrap">
      <img
        :src="tokenInfo.iconUrl"
        width="30"
        height="30"
        alt=""
        style="margin-right: 5px"
      />
      <span style="margin-right:40px">{{ tokenInfo.tokenName }}</span>
      <div class="item-wrap">
        <span>{{ $t("title.holdings") }}：</span>
        <span>{{ scientificCounting(tokenInfo.amount) }}</span>
      </div>
    </div>
    <div class="header-wrap">
      <div class="item-wrap">
        <span>{{ $t("title.address") }}：</span>
        <span>{{ transformAddress(tokenInfo.accountAddress,'TH') }}</span>
      </div>
      <div class="item-wrap">
        <span>{{ $t("title.contract_address") }}：</span>
        <span>{{ transformAddress(tokenInfo.contractAddress,'TH') }}</span>
      </div>
    </div>
    <el-table v-loading="loading" :data="orderType != 1 ? trData.slice( (currentPage-1)*pagesize, currentPage*pagesize) : trData.slice( (myCurrentPage-2 < 0 ? 0 : ((myCurrentPage-2)*pagesize + beginRows)), (myCurrentPage-1)*pagesize + beginRows).reverse()" 
        style="width: 100%;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
        :header-cell-style="this.tableHeaderColor">
          <el-table-column prop="tradingHash" :label="$t('table.transaction_hash')" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.tradingHash" placement="top-start">
                <span class="color-choose" @click="seeTransactionInformation(scope.row.tradingHash)">{{sliceHash(scope.row.tradingHash)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('table.own_chain')" align="center">
            <template slot-scope="scope">
              <span>{{$t(scope.row.belongtoChain)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="timeStamp" :label="$t('table.timestamp')" align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timeStamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="blockHeight" :label="$t('table.block_height')" align="center">
            <template slot-scope="scope">
              <span >{{scope.row.blockHeight}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('table.initiator')" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="to32Decimal(scope.row.fromAddress)" placement="top-start">
                <span >{{sliceAddress(scope.row.fromAddress)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('table.receiver')" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="to32Decimal(scope.row.toAddress)" placement="top-start">
                <span>{{sliceAddress(scope.row.toAddress)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="tokenNum" :label="$t('table.trading_volume')" align="center">
            <template slot-scope="scope">
              
              <span :class=" scope.row.transferType == 1 ? 'transfer-in-class' : 'transfer-out-class'">{{scope.row.transferType == 0 ? '-' : '+'}} {{scientificCounting(scope.row.tokenNum)}}</span> 
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('table.transaction_type')" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.status == 1 ? $t('title.success') : $t('title.failure') }}</span>
            </template>
          </el-table-column>
        </el-table>

    <el-pagination
      background
      @current-change="currentPageChange"
      :current-page="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import _ from 'lodash'
import tradeInfoList from "../../components/TradeInfoList";
import { traingListInOneZeroThree } from "@/api/pcApi.js";
export default {
  components: { tradeInfoList },
  data() {
    return {
      tokenInfo: {},
      beginRows: 1,
      orderType: "",
      trData: [],
      currentPage: 1,
      pagesize: 10,
      myCurrentPage: 1,
      total: 0,
      tables: "",
      currencyPc: "",
      loading: false,
    };
  },
  created() {
    this.currencyPc = localStorage.getItem("currencyPc");
    this.tokenInfo = this.$route.query
    this.getData()
  },
  methods: {
    /*点击交易信息=>交易hash=>到达几种交易详情*/
      seeTransactionInformation(hash) {
        this.$router.push({
          path: 'tradeDetail',
          query: {
            hash: hash
          }
        })
      },
    // 获取交易信息列表
    async getData(val) {
      this.loading = true;
      let data = {
        orderType: this.orderType,
        timeStamp: "",
        address: this.transformAddress(this.tokenInfo.accountAddress,'0x'),
        contractAddresss: [this.transformAddress(this.tokenInfo.contractAddress,'0x')],
        page: val ? val : this.currentPage,
        rows: 60,
      };
      let res = await traingListInOneZeroThree(data);
      this.trData = [];
      this.trData = res.data.data;
      this.total = res.data.total;
      this.loading = false;
    },
    updateData(val) {
      let data = {
        orderType: this.orderType,
        timeStamp: this.trData[0] && this.trData[this.trData.length - 1].timeStamp,
        address: this.transformAddress(this.tokenInfo.accountAddress,'0x'),
        contractAddresss: [this.transformAddress(this.tokenInfo.contractAddress,'0x')],
        page: val,
        rows: 50,
        tables: this.tables,
      };
      traingListInOneZeroThree(data).then((res) => {
        this.trData = [...this.trData, ...res.data.data];
        this.total = res.data.total;
      });
    },
    //处理分页中的tables参数
    handleTablesParams() {
      this.tables = _.cloneDeep(
        this.trData.slice(this.trData.length - 10, this.trData.length)
      );
      this.tables = this.tables.map(
        (item) =>
          (item = {
            chainId: item.chainId,
            tableName: item.tableName,
            tableId: item.tableId,
          })
      );
    },
    /*page切换*/
    currentPageChange(e) {
      this.currentPage = e;
      //点击第一页，并且是从倒序(点击过最后一页)的页面回点第一页
      if (e == 1 && this.orderType == 1) {
        this.orderType = "";
        this.getData();
      }
      if (this.total <= 60) {
        return false;
      }
      //当点击最后一页的时候(变成倒序的了)
      if (e == Math.ceil(this.total / 10)) {
        this.loading = true;
        this.orderType = 1;
        this.beginRows = this.total % 10 == 0 ? 10 : this.total % 10;
        //把最后一页变成第一页，倒数第二页是第二页，以此类推
        this.myCurrentPage = Math.ceil(this.total / 10) - this.currentPage + 1;
        this.getData(this.myCurrentPage);
      }
      //正序，从前往后点击
      if (this.orderType != 1) {
        if (
          this.trData.length - this.currentPage * 10 < 50 &&
          this.trData.length < this.total
        ) {
          this.handleTablesParams();
          this.updateData(this.currentPage);
        }
      }
      //倒序，从后往前点击
      if (this.orderType == 1 && e != Math.ceil(this.total / 10)) {
        this.beginRows = this.total % 10 == 0 ? 10 : this.total % 10;
        this.myCurrentPage = Math.ceil(this.total / 10) - this.currentPage + 1;
        if (
          this.trData.length - this.myCurrentPage * 10 < 50 &&
          this.trData.length < this.total
        ) {
          this.handleTablesParams();
          this.updateData(this.myCurrentPage);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header-wrap {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .item-wrap {
    margin-right: 40px;
  }
}

.el-pagination {
  position: relative;
  float: right;
  margin-right: 3%;
  margin-top: 30px;
}

.transfer-in-class {
  color: #0a8d0a;
}
.transfer-out-class {
  color: red;
}
</style>

