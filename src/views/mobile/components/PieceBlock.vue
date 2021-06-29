<template>
  <div class="mobile-comm-list" :style="blockStyle">
    <div class="mobile-comm-list-top">
      <div class="mobile-comm-block">
        <img src="@/assets/images/block/block2.png" />
        <span @click="goBlockDetail">{{ leftTopText }}</span>
      </div>
      <p>
        {{ rightTopText }}{{ $t("title.transaction") }}
      </p>
    </div>
    <div class="mobile-comm-list-bottom" v-if="currency">
      <div class="mobile-comm-hash" @click="goBlockDetail">
        区块hash：{{ hiddentText }}
      </div>
      <p>
       {{timestampToTime(rightBtmText)}}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    leftTopText: {
      default: "",
      type: Number,
    },
    leftBtmText: {
      default: "",
      type: String,
    },
    rightTopText: {
      default: "",
      type: Number,
    },
    rightBtmText: {
       default: "",
    },
    chainId: {
      default: 0,
      type: [Number, String],
    },
    blockStyle: "",
  },
  data() {
    return {
      hiddentText: "",
      currency: "",
    };
  },
  created() {
    this.currency = localStorage.currency;
    // this.hiddentText = this.to32Decimal(this.leftBtmText);
    this.hiddentText = `${this.leftBtmText.substr(
      0,
      3
    )}***${this.leftBtmText.substr(-3)}`;
  },
  methods: {
    goBlockDetail() {
      this.$router.push(
        `/blockDetails?block=${this.leftTopText}&chainId=${this.chainId}`
      );
    },
  },
};
</script>
<style scoped lang="scss">
.mobile-comm-list {
  border-bottom: 1px solid#F6F4FB;
  font-size: 0.24rem;
  color: #666;
  font-weight: bolder;
  padding: 0.2rem 0.88rem;
  .mobile-comm-list-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .mobile-comm-block {
      span {
        font-size: 0.52rem;
        @include font-color("primary");
      }
      img {
        width: 0.46rem;
        height: 0.52rem;
        margin-right: 0.2rem;
      }
    }
    p {
      color: #333333;
      font-size: .48rem;
    }
  }
  .mobile-comm-list-bottom {
    margin-bottom: 0.2rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.52rem;
    color: #666;
    .mobile-comm-hash {
      // width: 55%;
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
    }
    p {
      color: #C3C3C3;
    }
  }
}
</style>