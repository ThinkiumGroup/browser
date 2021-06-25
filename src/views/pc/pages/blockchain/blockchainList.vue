<template>
  <div class="page-wrap">
    <!-- <div class="con-title">
      {{$t("title.blockchain_details")}}:
    </div>
      <div class="search-wrap">
        <div class="search-content">
          <div class="input-wrap">
            <span class="el-icon-search input-search-icon"></span>
            <el-input
              @input="handinput()"
              v-model="searchHeightValue"
              :placeholder="$t('placeholder.placeholder_1')"
            ></el-input>
          </div>
          <el-button
            type="primary"
            @click="blockDetailsQuery()"
          >{{$t("placeholder.search")}}</el-button>
        </div>
      </div> -->
    <div class="content-wrap common-block">
      <div class="header">
        <div class="left-wrap">
          <img src="@/assets/images/block/block.png" alt="">
          <span class="label">{{$t(chainName)}}{{$t('title.块高')}}： {{trData[0] && trData[0].blockHeight}}</span>
        </div>
      </div>
      <div class="table-wrap">
        <el-table
      :data="orderType != 1 ? trData.slice( (currentPage-1)*pageSize, currentPage*pageSize) : trData.slice( (myCurrentPage-2 < 0 ? 0 : ((myCurrentPage-2)*pageSize + beginRows)), (myCurrentPage-1)*pageSize + beginRows).reverse()"
      style="width: 100%;margin-bottom: 30px;min-height: 500px;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
      v-loading="loading"
      :header-cell-style="this.tableHeaderColor"
      :row-class-name="$tableRowClassName"
    >
      <el-table-column :label="$t('table.block_height')" align="center">
        <template slot-scope="scope">
          <span
            class=" color-choose"
            @click="toBlockChainDetail(scope.row.blockHeight)"
          >{{scope.row.blockHeight}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.block_hash')" align="center">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.blockHash" placement="top-start">
            <span
              class=" color-choose"
              @click="toBlockChainDetail(chainId,scope.row.blockHeight,scope.row.blockHash)"
            >{{sliceHash(scope.row.blockHash)}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.timestamp')" align="center">
        <template slot-scope="scope">
          <span>{{timestampToTime(scope.row.timeStamp)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.trading_volume')" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.tradingTotal}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    style="float:none;text-align:center"
      background
      @current-change="currentPageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
      </div>
    </div>
    <!-- <div class="con-title" style="margin-top:80px">{{$t("title.block_information")}}</div> -->
    
  </div>
</template>

<script>
import { blockHeight, blockDetails } from "@/api/pcApi";

export default {
  name: 'blockchainList',
  data() {
    return {
      searchHeightValue: '',
      allData: {},
      trData: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      chainName: '',
      pageType: '',
      myCurrentPage: 1,
			beginRows: 1,
      orderType: '',
    };
  },
  methods: {
    transformChainState(value) {
        return value = value == 0 ? "title.main_chain" : (value == 1 ? "title.trading_chain" : (value == 2 ? "title.pos_reward_chain" : "title.new_ecology_business_chain"))
      },
    /*区块高度列表*/
    getBlockHeight() {
      this.loading = true;
      let data = {
        blockHeight: "",
        chainId: this.$route.query.chainId,
        page: this.currentPage,
        rows: 10
      };
      blockHeight(data).then(response => {
        this.loading = false;
        this.trData = response.data.data;
        this.total = response.data.total;
      });
    },
    // 跳转至区块链详情
    toBlockChainDetail(h) {
      this.$router.push({
        path: "blockchainDetail",
        query: {
          height: h,
          chainId: this.$route.query.chainId
        }
      });
    },
    /*区块详情查询*/
    blockDetailsQuery() {
      if (this.searchHeightValue == "") {
        if (this.$store.getters.language == "en") {
          this.$message.error("The query block height cannot be empty!");
        } else {
          this.$message.error("查询区块高度不能为空！");
        }
      } else {
        let data = {
          blockHeight: this.searchHeightValue,
          chainId: this.$route.query.chainId
        };
        blockDetails(data).then(response => {
          if (response.data == null) {
            if (this.$store.getters.language == "en") {
              this.$message.error(
                "The current block height query result is empty, please check and enter again!"
              );
            } else {
              this.$message.error(
                "当前区块高度查询结果为空，请检查后再次输入！"
              );
            }
          } else {
            this.$router.push({
              path: "blockchainDetail",
              query: {
                height: this.searchHeightValue,
                chainId: this.$route.query.chainId
              }
            });
          }
        });
      }
    },
    /*只能输入数字*/
    handinput() {
      if (/[^\d]/.test(this.searchHeightValue)) {
        this.searchHeightValue = this.searchHeightValue.replace(/[^\d]/g, "");
      }
    },
    /*区块高度列表*/
    getData(val) {
      this.loading = true;
      let data = {
				orderType: this.orderType,
        blockHeight: "",
        chainId: this.chainId,
        page: val ? val : this.currentPage,
        rows: 60,
      };
      blockHeight(data).then((response) => {
				this.loading = false;
				this.trData = []
        this.trData = response.data.data;
        this.total = response.data.total;
      });
		},
		updateData(val) {
			let data = {
				orderType: this.orderType,
        blockHeight: this.trData[0] && this.trData[this.trData.length-1].blockHeight,
        chainId: this.chainId,
        page: val ? val : this.currentPage,
        rows: 50,
      };
      blockHeight(data).then((response) => {
				this.trData = [...this.trData, ...response.data.data]
        this.total = response.data.total;
      });
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
        if(e == Math.ceil(this.total / 10)) {
          this.loading = true
          this.orderType = 1
          this.beginRows = (this.total % 10 == 0) ? 10 : (this.total % 10)
          //把最后一页变成第一页，倒数第二页是第二页，以此类推
          this.myCurrentPage = Math.ceil(this.total / 10) - this.currentPage + 1
          this.getData(this.myCurrentPage)
        }
        //正序，从前往后点击
        if(this.orderType != 1) {
          if(this.trData.length - this.currentPage * 10 < 50 && this.trData.length < this.total) {
            // this.handleTablesParams()
            this.updateData(this.currentPage)
          }
        }
        //倒序，从后往前点击
        if(this.orderType == 1 && e != Math.ceil(this.total / 10)) {
          this.beginRows = (this.total % 10 == 0) ? 10 : (this.total % 10)
          this.myCurrentPage = Math.ceil(this.total / 10) - this.currentPage + 1
          if(this.trData.length - this.myCurrentPage * 10 < 50 && this.trData.length < this.total) {
            // this.handleTablesParams()
            this.updateData(this.myCurrentPage)
          }
        }
      },
  },
  created() {
    this.chainId = this.$route.query.chainId
      this.chainName = this.transformChainState(this.chainId)
    //  this.getBlockHeight();
    this.getData()
  }
};
</script>
<style scoped lang="scss">
.page-wrap .search-content .input-wrap input {
  text-indent: 30px;
}
.content-wrap {
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
          margin-left: 0.28rem;
          margin-right: 0.28rem;
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
.el-pagination {
  position: relative;
  float: right;
  margin-right: 3%;
  margin-top: 30px;
}

.input-search-icon {
  position: absolute;
  margin-left: 15px;
  margin-top: 10px;
  z-index: 1;
}

.input-wrap {
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
