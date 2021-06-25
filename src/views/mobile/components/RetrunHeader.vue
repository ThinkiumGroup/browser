<template>
  <div class="mobile-comm-retrunHeader" :style="styles">
    <span v-if="isReturn" :class="icon" @click="returnHistory"></span>
    <span v-else></span>
    <p>{{title}}</p>
    <span></span>
  </div>
</template>
<script>
export default {
  props: {
    styles: {
      default: function() {
        return  {background:'white'}
      },
      type: [String, Object]
    },
    icon: {
      default: 'el-icon-arrow-left',
      type: String
    },
    title: {
      default: '交易详情',
      type: String
    },
    isReturn: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    returnHistory() {
      this.$router.go(-1)
    },
  }
};
</script>
<style scoped lang="scss">
.mobile-comm-retrunHeader {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: .72rem;
  padding: .54rem .44rem;
  color: white;
  @include background_color('primary'); 
  span {
    width: 0.6rem;
    font-size: 0.8rem;
  }
  p {
    flex: 1;
    text-align: center;
   
  }
}
</style>