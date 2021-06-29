<template>
  <div>
    <div class="main-title">{{$t('title.node_information')}}</div>
    <div class="tab-wrap">
      <div class="tab-item" :class="{'active': activeName == 'dataNode'}" @click="handleClick('dataNode')">{{$t('title.data_node_2')}}</div>
      <div class="tab-item" :class="{'active': activeName == 'mineNumber'}" @click="handleClick('mineNumber')">{{$t('title.mining_pool_2')}}</div>
      <div class="tab-item" :class="{'active': activeName == 'consensusNode'}" @click="handleClick('consensusNode')">{{$t('title.consensus_node_2')}}</div>
    </div>
    <div class="common-block" v-loading="loading">
      <el-table  :data="tableData" style="width: 100%" border v-show="activeName == 'dataNode'">
        <el-table-column width="250px" type="index" :label="$t('table.order')"  align="center" ></el-table-column>
        <el-table-column prop="idStr" :label="$t('table.nodeID')"  align="center"></el-table-column>
        <!--
        <el-table-column width="250px" prop="data" :label="$t('table.own_chain')" align="center">
          <template slot-scope="scope">
            <span>{{$t(scope.row.data)}}</span>
          </template>
        </el-table-column>
        -->
      </el-table>
      <el-table  :data="tableData" style="width: 100%" border v-show="activeName == 'mineNumber'">
        <el-table-column width="250px" type="index" :label="$t('table.order')"  align="center"></el-table-column>
        <el-table-column prop="idStr" :label="$t('table.mineID')" align="center"></el-table-column>
        <el-table-column width="250px" prop="data" :label="$t('table.remainingAmount')" align="center"></el-table-column>
      </el-table>
      <el-table  :data="tableData" style="width: 100%" border v-show="activeName == 'consensusNode'">
        <el-table-column width="250px" type="index" :label="$t('table.order')"  align="center"></el-table-column>
        <el-table-column prop="idStr" :label="$t('table.nodeID')" align="center"></el-table-column>
      </el-table>
    </div>
    <!-- <el-tabs v-model="activeName" >
    <el-tab-pane :label="$t('title.data_node')" name="dataNode">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column width="100px" type="index" :label="$t('table.order')"  align="center" ></el-table-column>
        <el-table-column prop="idStr" :label="$t('table.nodeID')"  align="center"></el-table-column>
        <el-table-column width="250px" prop="data" :label="$t('table.own_chain')" align="center">
          <template slot-scope="scope">
            <span>{{$t(scope.row.data)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="$t('title.consensus_node')" name="consensusNode">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column width="100px" type="index" :label="$t('table.order')"  align="center"></el-table-column>
        <el-table-column prop="idStr" :label="$t('table.nodeID')" align="center"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="$t('title.mine_number')" name="mineNumber">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column width="100px" type="index" :label="$t('table.order')"  align="center"></el-table-column>
        <el-table-column prop="idStr" :label="$t('table.mineID')" align="center"></el-table-column>
        <el-table-column width="250px" prop="data" :label="$t('table.pitManagementFee')" align="center"></el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs> -->
  </div>
</template>

<script>
import { nodeOrPoolDetail} from '@/api/pcApi'
export default {
  name: 'nodeDetail',
  data() {
    return {
      activeName: 'mineNumber',
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      loading: false
    };
  },
  methods: {
    //点击页数
    handleCurrentChange(e) {
      this.currentPage = e
      this.getData()
    },
    //切换上面的tab选项
    handleClick(val) {
      this.activeName = val
      this.getData()
    },
    //获取列表数据 
    async getData() {
        this.tableData = []
        this.loading = true
        let data = {
          type: this.activeName == 'dataNode' ? 1 : this.activeName == 'consensusNode' ? 2 : 3,
          rows: 10,
          page: this.currentPage
        }
        let res = await nodeOrPoolDetail(data)
        this.loading = false
        this.tableData = res.data.data
        this.total = res.data.total
      }
  },
  mounted() {
    this.activeName = this.$route.query.type || 'dataNode';
    this.getData()
  }
};
</script>

<style scoped lang="scss">
  .tab-wrap {
    width: 100%;
    height: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #ffffff;
    box-shadow: 0px 10px 21px 6px rgba(186, 177, 212, 0.16);
    border-radius: 0.1rem;
    margin-bottom: 0.3rem;
    .tab-item {
      padding: 0 0.3rem;
      min-width: 1.6rem;
      height: 0.4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #D2D2D2;
      border-radius: 0.05rem;
      color: #666666;
      font-size: 0.24rem;
      font-weight: bold;
      cursor: pointer;
    }
    .active {
      background: $themeColor;
      color: #FFFFFF;
    }
  }
  /deep/ .el-table th>.cell {
    color: $themeColor;
    font-size: 0.2rem;
  }
</style>