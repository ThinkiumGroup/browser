<template>
  <div class="mobile-comm-search">
    <div class="mobile-comm-search-input">
      <input v-model="searchValue" :placeholder=" $t('placeholder.placeholder_8')" />
      <p  @click="searchClick">{{ $t('placeholder.search')}}</p>
    </div>
  </div>
</template>
<script>
import { getBlockDetails, getTradingDetails } from '@/api/mobileApi'
export default {
  props: {
    placeholder: {
      default: '',
      type: String
    },
  },
  data() {
    return {
      searchValue: '',
      btnText: '',
      currency: '',
    };
  },
  created() {
    this.currency = localStorage.getItem('currency')
  
  },
  methods: {
    searchClick() {
         if (this.searchValue == '') {
          if (this.$store.getters.language == 'en') {
            this.$message.error('Query transaction details transaction hash/account address cannot be empty!');
          } else {
            this.$message.error('查询交易详情账户详情不能为空！');
          }

        } else {
          this.searchValue = this.searchValue.trim()
          if(/^0x/g.test(this.searchValue) == false || (/^0x/g.test(this.searchValue) && this.searchValue.length === 42)){
              console.log('TH54I5XG1M0F8VK6N1Z3ISP6ZPH47M8NMRK', this.searchValue)
              let address = /^0x/g.test(this.searchValue) ? this.to32Decimal(this.searchValue) : this.searchValue;
              console.log('TH54I5XG1M0F8VK6N1Z3ISP6ZPH47M8NMRK', address)
              this.$router.push({
                path: 'addressDetails',
                query: {
                  address
                }
              })
          }else {
            let data = {
              hash: this.searchValue,
            }
            getTradingDetails(data).then(response => {
              if (response.data == null) {
                
                let data = {
                  blockHash: this.searchValue
                }
                getBlockDetails(data).then(res => {
                  if(res.data) {
                    console.log(res.data, 99999)
                    this.$router.push({
                      path: 'blockDetails',
                      query: {
                        block: res.data.blockHeight,
                        chainId: res.data.chainId
                      }
                    })
                  } else {
                    if (this.$store.getters.language == 'en') {
                      this.$message.error('The current transaction details transaction hash/account address query result is empty, please check and enter again!');
                    } else {
                      this.$message.error('当前交易详情账户详情查询结果为空，请检查后再次输入！');
                    }
                  }
                })
                
              } else {
                this.$router.push({
                  path: 'transactionDetails',
                  query: {
                    hash: this.searchValue
                  }
                })
              }
            })
          }

        }
    },
  }
};
</script>
<style scoped lang="scss">
.mobile-comm-search {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 1.2rem;
    
  .mobile-comm-search-input {
    width: 12rem;
    display: flex;
    align-items: center;
    background: white;
    border-radius: .2rem;
     box-shadow: 0px .2rem .42rem .12rem rgba(186, 177, 212, 0.16);
    input {
      flex: 1;
      height: 100%;
      border-radius: 10px;
      outline: none;
      border: 0;
      padding-left: 0.34rem;
      font-size: .48rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #A19DAA;
    }
    p {
      font-size: .52rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      width: 1.956rem;
      height: 100%;
      text-align: center;
      line-height: 1.2rem;
      border-top-right-radius: .2rem;
      border-bottom-right-radius: .2rem;
      @include background-color('primary');
    }
  }
}
</style>