<template>
    <div class="header-wrap">
      <span class="logo" v-if="currencyPc && logoUrl" :style="{background: 'url( '+ logoUrl +')'}" ></span>
      <span class="header-title" v-if="!currencyPc">THINKIUM</span>
      <div class="header-right" v-if="currencyPc">
        <div class="tab-item" :class="{'active': activeIndex == 1}">
          <router-link to="/" exact>{{$t('header.header_home')}}</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/tradeList" >{{$t('title.transaction')}}</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/nodeDetail" >{{$t('title.node')}}</router-link>
        </div>
        
      </div>
    </div>

</template>

<script>
  export default {
    name: 'globalHeader',
    data() {
      return {
        language: '',
        showLogo: '',
        activeIndex: 1,
        currencyPc: '',
        logoUrl: ''
      }
    },
    methods: {
      languageSwitching(e) {
        this.$i18n.locale = e
        this.$store.dispatch('app/setLanguage', e)
      },
      language_is() {
        this.language = 'En'
      },
      goHome() {
        this.$router.push({path: '/'})
      }
    },
    created() {
      this.language_is()
      this.currencyPc = localStorage.getItem('currencyPc')
      if(!this.currencyPc) {
        this.languageSwitching('zh')
      }
      this.logoUrl = localStorage.getItem('logoUrl')
      console.log(this.currencyPc,'this.currencyPc')
      let queryLang = this.$route.query.lang
      if(queryLang) {
        this.languageSwitching(queryLang)
      }
    },
    computed: {
      languageChange() {
        return this.$i18n.locale;
      }
    },
    watch: {
      languageChange(e) {
        this.language_is()
      }
    }
  }
</script>

<style scoped lang="scss">
  .header-title {
    display: inline-block;
    height: 100px;
    line-height: 100px;
    color: #FFFFFF;
    font-size: 25px;
    font-weight: bold;
  }
  .header-right {
    height: 100%;
    display: flex;
    align-items: center;
    float: right;
    .tab-item {
      // width: 108px;
      padding: 0 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 24px;
      font-weight: 400;
      cursor: pointer;
    }
    .router-link-active {
      font-weight: bold;
      position: relative;
      &::after {
        content: "";
        display: inline-block;
        width: 25px;
        height: 2px;
        background: #FFFFFF;
        border-radius: 1px;
        position: absolute;
        bottom: -6px;
        left: calc(50% - 12px);
      }
    }
  }
  .el-icon--right {
    margin-left: 5px;
  }
  .el-header {
    background-color: #ffffff;
    color: #333;
    height: 80px;
    font-weight: 400;
    box-shadow:0px 4px 7px 0px rgba(224,229,238,0.42);
  }

  .logo {
    display: inline-block;
    width: 250px;
    height: 68px;
    position: relative;
    top: 20px;
    background-size: 100%
  }

  .header-wrap {
    padding: 0 80px;
    widows: 100%;
    height: 100px;
    font-size: 14px;
    /* background-color: #ffffff; */
    background-image: url('../../../assets/images/headerBg.png');
    background-size: 100%;
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    box-shadow:0.5px 2px 3.5px 0px rgba(224,230,238,0.42);
  }

  .go-home-wrap {
    display: inline-block;
    position: relative;
    right: 0;
    height: 100px;
    line-height: 100px;
  }

  .tab-select-wrap {
    width: 34px;
    height: 34px;
    background:rgba(245,247,249,1);
    border-radius:5px;
    line-height: 26px;
    .el-dropdown {
      width: 100%;
      height: 100%;
    }
  }
  .go-home {
    font-size: 18px;
    cursor: pointer;
    margin-right: 20px;
    padding: 0 20px;
    user-select: none;
  }

  .el-dropdown-link {
    cursor: pointer;
    color:  $themeColor;
    user-select: none;
    font-size: 18px;
    font-weight: bold;
    line-height: 34px;
    display: inline-block;
    width: 100%;
    height: 100%;
  }


  .triangle {
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 10px solid #9DA5AE;
    border-left: 6.5px solid transparent;
    border-right: 6.5px solid transparent;
  }
</style>
