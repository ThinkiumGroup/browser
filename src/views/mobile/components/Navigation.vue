<template>
  <div class="mobile-comm-navigation">
    <div class="mobile-comm-nav-Copywriting">
      <p>{{copyWriting}}</p>
      <div class="mobile-comm-nav-select">
       <select v-if="selectShow" v-model="selectValue " @change="handleChange" ref="selects">
         <option :value="item.chainId" v-for="item in selectData" :key="item.chainId">{{$t(item.chainName)}}</option>
       </select>
      </div>
    </div>
    <div class="mobile-comm-nav-btn" @click="handeleClick" v-if="isMore">
       {{btnText}}
       <span :class="btnIcon"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    copyWriting: String,
    btnText: String,
    btnIcon: String,
    selectShow: String,
    /**
     * selectData
     * @param chainName
     * @param chainId
     */
    selectData: Array,
    defaultValue: Number,
    isMore: Number,
  },
  data() {
    return {
      selectValue: '',
    }
  },
  created() {
    this.selectValue = this.defaultValue
  },
 
  methods: {
    handleChange() {
      const data = this.selectData.filter( v => v.chainId == this.selectValue )[0]
      this.$emit('change', data)
    },
    handeleClick() {
      this.$emit('click')
    }
  }
  
}
</script>
<style scoped lang="scss">
  .mobile-comm-navigation {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: .24rem;
     margin-bottom: .54rem;
    .mobile-comm-nav-Copywriting {
      color: #666;
      font-weight: bolder;
      
      .mobile-comm-nav-select {
       
        select {
          appearance:none;
          -moz-appearance:none;
          -webkit-appearance:none;
          width:1.8rem;  
          height:.5rem;
          margin-top: .48rem;
          border: 0;
          padding-left: .34rem;
          background:rgba(245,247,249,1) url(../../../assets/images/sanjiao.png) no-repeat 90% ;
          background-size: 10%;
          border-radius: .1rem;
          outline: none;
          font-size: .22rem;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
       
      }
    }
    .mobile-comm-nav-btn {
     color:rgba(51,51,51,1);
      padding-right: .2rem;
    }
  }
</style>