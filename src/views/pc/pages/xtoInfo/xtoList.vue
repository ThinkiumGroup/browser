<template>
  <div>
      <div class="search">
         {{$t('title.token_name')}}： <el-input style="width:200px;margin-right:25px" v-model="xtoName"></el-input>
         {{$t('title.contract_address')}}： <el-input style="width:200px;margin-right:25px" v-model="contractAddress"></el-input>
         <el-button type="primary" style="" @click="searchClick"> {{$t('placeholder.filter')}}</el-button>
      </div>
    <el-table 
      v-loading="loading"
      :data="tableData" 
      style="width: 100%;margin-bottom: 30px;min-height: 529px;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
      :header-cell-style="this.tableHeaderColor">
      <el-table-column prop="tokenName" :label="$t('title.token_name')" align="center"></el-table-column>
      <el-table-column prop="iconUrl" :label="$t('title.icon')" align="center">
          <template slot-scope="scope">
              <img v-if="scope.row.iconUrl" :src="scope.row.iconUrl" alt="" width="50" height="50">
              <span v-else style="display:inline-block;width:50px;height:50px"></span>
          </template>
      </el-table-column>
      <el-table-column :label="$t('title.contract_address')" align="center">
        <template slot-scope="scope">
          <el-tooltip :content="to32Decimal(scope.row.contractAddress)" placement="top-start">
            <span>{{sliceAddress(scope.row.contractAddress)}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="$t('title.address')" align="center">
        <template slot-scope="scope">
          <el-tooltip :content="to32Decimal(scope.row.accountAddress)" placement="top-start">
            <span>{{sliceAddress(scope.row.accountAddress)}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="$t('title.quantity')" align="center">
        <template slot-scope="scope" >
            <span class="color-choose" @click="toXtoDetail(scope.row)">{{ scientificCounting(scope.row.amount)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float:right;margin-top:20px;"
      background
      @current-change="currentPageChange"
      :current-page.sync="currentPage"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import {xtoList} from '@/api/pcApi.js'
export default {
    name: 'XtoList',
    data() {
        return {
            tableData: [],
            currentPage: 1,
            total: 0,
            xtoName: '',
            contractAddress: '',
            loading: false
        }
    },
    methods: {
        toXtoDetail(row) {
          this.$router.push({
              path: '/xtoDetail',
              query: {
                accountAddress: this.to32Decimal(row.accountAddress),
                contractAddress: this.to32Decimal(row.contractAddress),
                tokenName: row.tokenName,
                amount: row.amount,
                iconUrl: row.iconUrl
              }
            })
        },
        async getData() {
            this.loading = true
            let contractAddress = this.to16Decimal(this.contractAddress)
            let data = {
                accountAddress: this.transformAddress(this.$route.query.accAddress,'0x'),
                contractAddress: contractAddress,
                xtoName: this.xtoName,
                page: this.currentPage,
                rows: 10
            }
            let res = await xtoList(data)
            this.loading = false
            this.tableData = res.data.data
            this.total = res.data.total
        },
        currentPageChange(e) {
            this.currentPage = e
            this.getData()
        },
        searchClick() {
            this.currentPage = 1
            this.xtoName = this.xtoName.trim()
            this.contractAddress = this.contractAddress.trim()
            this.getData()
        }
    },
    created() {
        this.getData()
    }
}
</script>

<style lang="scss" scoped>
.search {
    margin-bottom: 20px;
}
</style>