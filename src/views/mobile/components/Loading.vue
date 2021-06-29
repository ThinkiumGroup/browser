<template>
  <div
    v-loading="loading"
    class="comon-loading"
  >
   <p v-if="loading">{{$t('title.loading')}}</p>
    <p v-if="isShowNoData">{{noDataText}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      isShowNoData: Boolean,
      noDataText: String,
      loading: Boolean,
    }
  }
</script>
<style lang="scss" scoped>
  .comon-loading{
     p {
        padding: .4rem;
        text-align:center
     }
  }
</style>