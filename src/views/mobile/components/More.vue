<template>
 <div class="com-more" @click="handleClick">
    <slot></slot>
    <img src="@/assets/images/index/more.png" >
 </div>
</template>
<script>
export default {
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
  .com-more {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: .48rem;
    @include font-color('primary');
    img {
      width: .38rem;
      height: .32rem;
      margin-left: .16rem;
      
    }
  }
</style>