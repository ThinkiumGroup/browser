<template>
  <div class="mobile-comm-list" :style="tranStyle">
    <div class="mobile-comm-list-top">
     <p :style="{ width: !currency && '100%'}" @click="goTransferDetails" class="mobile-comm-hash">{{leftTopText}}</p>
     <span v-if="currency">{{rightTopText}}{{currency}}</span>
    </div>
    <div class="mobile-comm-list-bottom">
     <div v-if="type == 'external'">
       {{$t('table.transaction_type')}}：{{leftBtmText}}
      <img src="@/assets/images/index/contract.png" >
     </div>
     <div v-else-if="type == 'internal'">
       {{$t('table.block_height')}}：{{leftBtmText}}
      <img src="@/assets/images/block/block.png" >
     </div>
     <span v-if="currency">{{rightBtmText}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tranStyle: {
      default: ''
    },
    leftTopText: {
      default: "",
      
    },
    leftBtmText: {
      default: "",
      
    },
    rightTopText: {
      default: "",
     
    },
    rightBtmText: {
      default: "",
     
    },
    type: {
      default: 'external'
    }
  },
 
  data() {
    return {
      currency: '',
    };
  },
  created() {
    this.currency = localStorage.currency
  },
  methods: {
    goTransferDetails() {
      this.$router.push({ path: '/transactionDetails', query: { hash:  this.leftTopText } })
    },
  }
};
</script>
<style scoped lang="scss">
.mobile-comm-list {
  border-bottom: 1px solid#F6F4FB;
  font-size: 0.24rem;
  color: #666;
  font-weight: bolder;
  padding: .2rem .88rem;
  .mobile-comm-list-top {
    margin-bottom: .2rem;
    display: flex;
    justify-content: space-between;
    .mobile-comm-hash {
      display: inline-block;
      width: 55%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @include font-color('primary');
      font-size: .52rem;
    }
    span {
      font-weight: bold;
      color: #333;
      font-size: .48rem;

    }
  }
  .mobile-comm-list-bottom {
    margin-bottom: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .52rem;
    color: #666;
    div {
      display: flex;
      align-items: center;

      img {
        width: .48rem;
        height: .48rem;
        margin-left: .1rem;
      }
    }
    span {
      text-align: right;
      width: 40%;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      outline: none;
      font-size: .4rem;
      color: #C3C3C3;
    }
  }
}
</style>