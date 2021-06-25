<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <el-button @click="toPc">啦啦</el-button> -->
    <keep-alive include="tradeList">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  methods: {
    toPc(){
      this.$router.push('/routerPc')
    }
  }
}
</script>
<style scoped>
.home {
  height: 100%;
}
</style>
