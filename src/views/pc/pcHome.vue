<template>
  <div class="home-wrap">
    <header-view />
    <el-main>
          <router-view />
    </el-main>
  </div>
</template>

<script>
  import HeaderView from './components/GlobalHeader'

  export default {
    name: 'pcHome',
    components: {HeaderView},
    data() {
      return {}
    }
  }
</script>

<style scoped >
  .home-wrap {
    /* height: 100%; */
    background: #FAFAFA;
    min-height: 100%;
  }
  .el-main {
    color: #333;
    width: 100%;
    padding: 84px 120px 30px 120px;
    font-size: 16px;
    margin-top: 100px;
  } 
</style>
