<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { circleInfo } from '@/api/pcApi'
export default {
  methods: {
    async getCircleInfo() {
      localStorage.setItem('currency', 'good')  //设置个默认;
      try{
        let res = await circleInfo()
        localStorage.setItem('currencyPc', res.data.currency)
        localStorage.setItem('logoUrl', res.data.logoUrl)
        localStorage.setItem('currency', res.data.currency || '')
      }catch(err){

      }
      
    },
  },
  created() {
    this.getCircleInfo()
  },
  // mounted() {
  //   console.log(this.$route.query.lang,'langlang')
  //   let queryLang = this.$route.query.lang
  // }
}
</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
