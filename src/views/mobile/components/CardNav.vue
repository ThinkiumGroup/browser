<template>
 <div class="com-card-nav">
  <p :style="titleStyle">{{title}} <slot name="title-slot"></slot></p>
  <More v-if="isMore" @click="loadMore">更多</More>
 </div>
</template>
<script>
import More from './More'
export default {
  props: {
    title: {
      default: '链详情'
    },
    isMore: {
      default: true
    },
    titleStyle: {
      default: () => ({})
    }
  },
  components: {
    More
  },
  methods: {
    loadMore() {
      this.$emit('loadMore')
    }
  }
}
</script>
<style lang="scss" scoped>
  .com-card-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .4rem .34rem;
    border-bottom: 1px solid #F6F4FB;
    p {
      font-size: .56rem;
      font-weight: bold;
      margin-left: .42rem;
      @include font-color('primary');
      display: flex;
      align-items: flex-end;
      position: relative;
      &::before {
        content: '';
        width: .08rem;
        height: .54rem;
        @include background-color('primary');
        position: absolute;
        top: 0.13rem;
        left: -0.38rem;
        border-radius: .04rem;
      }
    }
    
  }
</style>