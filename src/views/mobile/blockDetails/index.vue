<template>
  <div class="mobile-blockDetails-container container-background-clor">
    
    <RetrunHeader :title="$t('title.block_details')" />
    
    <div class="mobile-blockDetails-body">
      <Searchaddress />
      <div class="mobile-blockDetails-head mobile-block">
        <div class="block-height-row">
          <p><span>{{$t('title.block_height')}}: </span>{{ data.blockHeight }}</p>
          <div class="change-btn">
            <img  @click="handeleClick(-1)" src="@/assets/images/block/qiehuan.png" >
            <img @click="handeleClick(1)" class="next-icon" src="@/assets/images/block/qiehuan.png" >
          </div>
        </div>
        <div>
          <p v-if="currency">
            <span>{{$t('table.own_chain')}}: </span>{{ $t(data.belongToChain) }}
          </p>
        </div>
      </div>
      <div class="mobile-blockDetails-body-detail mobile-block">
        <div class="blockDetails-body-title">
          <img src="@/assets/images/block/block.png" />
          <p>{{$t('title.block_information')}}</p>
        </div>
        <div class="mobile-blockDetails-body-detail-item">
          <p>{{ $t("table.block_hash") }}</p>
          <div>{{ data.blockHash }}</div>
        </div>
        <div class="mobile-blockDetails-body-detail-item">
          <p>{{ $t("table.timestamp") }}</p>
          <div>
            {{ timestampToTime(data.timeStamp) }}
          </div>
        </div>
        <div class="mobile-blockDetails-body-detail-item">
          <p>{{ $t("title.trading_count") }}</p>
          <div >{{ data.txNum }}</div>
        </div>
        <div class="mobile-blockDetails-body-detail-item">
          <p>{{ $t("title.parent_block_hash") }}</p>
          <div>{{ data.parentBlockHash }}</div>
        </div>
        <div class="mobile-blockDetails-body-detail-item">
          <p>{{ $t("title.unpack_node") }}</p>
          <div> {{data.packageAddress}}  </div>
        </div>
        <div class="mobile-blockDetails-body-detail-item">
          <p>{{ $t("title.participation_round") }}</p>
          <div>{{ data.runRound }}</div>
        </div>
        <div
          v-if="currency"
          class="mobile-blockDetails-body-detail-item"
          style="margin-bottom: 0"
        >
          <p>{{ $t("title.participant_member_details") }}</p>
          <div class="member-info">
            <div v-for="(item, index) in data.runUserInfo" :key="index">{{
              item
            }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import RetrunHeader from "../components/RetrunHeader";
import Searchaddress from "../components/Searchaddress";
import CardNav from "../components/CardNav";
import { getBlockDetails } from "@/api/mobileApi";
import "./style.scss";
export default {
  components: {
    RetrunHeader,
    Searchaddress,
    CardNav,
  },
  created() {
    this.currency = localStorage.currency;
    console.log(this.$route, 11111)
    this.blockHeight = _.get(this.$route, "query.block", "");
    this.chainId = _.get(this.$route, "query.chainId", "");
    this.getBlockData()
  },
  data() {
    return {
      data: {
        blockHeight: '',
        chainId: ''
      },
    };
  },
  methods: {
    getBlockData() {
      const data = { 
      blockHeight: this.blockHeight,
      chainId: this.chainId,
    };
    getBlockDetails(data).then((res) => {
      this.data = res.data;
    });
    },
    handeleClick(num) {
      console.log(num,11111)
      this.blockHeight = Number(this.blockHeight) + num
      this.getBlockData()
    }
  },
};
</script>
