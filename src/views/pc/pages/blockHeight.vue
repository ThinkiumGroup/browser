<template>
  <div class="content-wrap">
    <div class="con-title">
      {{$t('title.blockchain_details')}}
    </div>
    <div class="con-title" style="font-size: 17px">
      {{$t('table.block_height')}}：#{{$route.query.height}}
    </div>
    <div class="search-wrap" style="width: 550px ">
      <el-select v-model="chainValue" :placeholder="$t('placeholder.choose')">
        <el-option
          v-for="item in options"
          :key="item.chainId"
          :label="$t(item.chainName)"
          :value="item.chainId">
        </el-option>
      </el-select>
      <el-button type="primary" style="float: right" @click="searchClick()"> {{$t('placeholder.filter')}}
      </el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-bottom: 30px;margin-top: 30px"
      v-loading="loading"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.own_chain')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose" @click="toChain(scope.row.belongtoChain, scope.row)">{{$t(scope.row.chainName)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_hash')"
        align="center">
        <template slot-scope="scope">
          <span class="color-choose" @click="toBlockChainDetail(scope.row.belongtoChain, scope.row.blockHash)">{{sliceHash(scope.row.blockHash)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.timestamp')"
        align="center">
        <template slot-scope="scope">
          <span  >{{timestampToTime(scope.row.timeStamp)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.trading_volume')"
        align="center">
        <template slot-scope="scope">
          <span >{{scope.row.txNum}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="currentPageChange"
      :current-page="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import { blockHeightOne, chainList} from '@/api/pcApi'

  export default {
    name: 'searchBlockheight',
    data() {
      return {
        options: [],
        chainValue: '',
        tableData: [],
        value1: '',
        search_transaction: '',
        loading: false,
        currentPage: 1,
        pagesize: 10,
        total: 0,
      }
    },
    methods: {
      currentPageChange(e) {
        this.currentPage = e
        this.getData()
      },
      /*区块高度列表*/
      getData() {
        this.loading = true
        let data = {
            blockHeight: this.$route.query.height,
            chainId: this.chainValue,
            page: this.currentPage,
            rows: 10,
          }
        blockHeightOne(data).then(response => {
          this.total = response.data.total
          this.loading = false
          this.tableData = response.data.data
          if(response.data.total == 0) {
            this.$message({
              type: 'warning',
              message: '暂无数据'
            })
          }
        })

      },
      //获取链的列表数据
      async getChainList() {
        let res = await chainList()
        this.options = res.data
        this.options.unshift({
          chainId: this.chainValue,
          chainName: 'select.all'
        })
      },
      //搜索
      searchClick() {
        this.currentPage = 1
        this.getData()
      },
      /*点击跳转到链页面*/
      toChain(val) {
        if( val == 0) {
            this.$router.push({
                path: 'mainChain',
                query: {
                    chainId: val
                }
             })
        } else {
            this.$router.push({
                path: 'taskChain',
                query: {
                    chainId: val
                }
            })
        }
      },
      // 跳转至区块链详情
        toBlockChainDetail( id, blockHash) {
          console.log(id)
            this.$router.push({
            path: 'blockchainDetail',
            query: {
                chainId: id,
                blockHash: blockHash
            }
            })
        },
    },
    created() {
      this.getData()
      this.getChainList()
    },
  }
</script>
<style scoped>
  .search-wrap {
    margin-top: 30px;
  }

  .el-pagination {
    position: relative;
    float: right;
    margin-right: 3%;
    margin-top: 30px;
  }
  
  .content-wrap {
    width: 100%;
    margin-bottom: 180px;
  }

  .con-title {
    height: 45px;
    font-size: 18px;
    padding-bottom: 20px;
  } 
</style>
