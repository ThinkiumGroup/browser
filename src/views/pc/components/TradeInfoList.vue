<template>
  <!-- 这个是交易信息那一表格模块 -->
  <div>
    <!--交易信息列表-->
    <el-table
      border
      :data="trData"
      style="width: 100%;margin-bottom: 30px;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5"
      :header-cell-style="this.tableHeaderColor"
      :row-class-name="$tableRowClassName"
    >
      <el-table-column :label="$t('table.transaction_hash')" align="center">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.tradingHash" placement="top-start">
            <span
            class="color-choose"
            @click="seeTransactionInformation(scope.row.chainId,scope.row.txType,scope.row.tradingHash)"
          >{{sliceHash(scope.row.tradingHash)}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.own_chain')" align="center" v-if="isShow && currencyPc">
        <template slot-scope="scope">
          <span
            class="color-choose"
            @click="toTaskChain(scope.row.chainId)"
          >{{$t(scope.row.chainName)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.timestamp')" align="center" >
        <template slot-scope="scope">
          <span>{{timestampToTime(scope.row.timeStamp)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.transaction_type')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{$t(scope.row.parentTypeName)}} {{scope.row.childTypeName && scope.row.parentTypeName != 'select.within_chain_trading' ? '-' : ''}} {{$t(scope.row.parentTypeName == 'select.within_chain_trading' ? '' : scope.row.childTypeName)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.initiator')" align="center">
        <template slot-scope="scope">
          <el-tooltip :content="to32Decimal(scope.row.fromAddress)" placement="top-start">
            <span
            :class="pageType == 'addressDetail' ? '' : 'color-choose'"
            @click="toAddressDetails('Initiator',scope.row.chainId,scope.row.fromAddress,scope.row.parentTypeName)"
          >{{sliceAddress(scope.row.fromAddress)}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.receiver')" align="center">
        <template slot-scope="scope">
          <el-tooltip :content="to32Decimal(scope.row.toAddress)" placement="top-start">
            <span
            :class="pageType == 'addressDetail' ? '' : 'color-choose'"
            @click="toAddressDetails('receiver',scope.row.chainId,scope.row.toAddress,scope.row.parentTypeName)"
          >{{sliceAddress(scope.row.toAddress)}}</span>
          </el-tooltip>
          
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.transfer_amount')" align="center" v-if="currencyPc">
        <template slot-scope="scope">
          <span>{{scientificCounting(scope.row.currencyAmount)}} {{currencyPc}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.transaction_fee')" align="center" v-if="currencyPc">
        <template slot-scope="scope">
          <span>{{scientificCounting(scope.row.gasFee)}} {{currencyPc}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name: 'tradeInfoModule',
    props: ['trData','pageType','isShow','currencyPc'],
    data() {
        return {
            chainId: 0,
        }
    },
    methods: {
      /*点击交易信息=>交易hash=>到达几种交易详情*/
      seeTransactionInformation(id, type, hash) {
        this.$router.push({
          path: 'tradeDetail',
          query: {
            chianId: id,
            type: type,
            hash: hash
          }
        })
      },
      /*点击地址跳到地址详情  peo Initiator表示发起方，receiver表示接收方*/
      toAddressDetails(peo, id, address, type) {
        let query = {
                chainId: id,
                address: this.to32Decimal(address),
                type,
                peo
              }
        this.$router.push({
            path: 'addressDetail',
            query: query,
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
    }
}
</script>

<style lang="scss" scoped>
  /deep/ .el-table {
    color: #7A828C;
  }
</style>
