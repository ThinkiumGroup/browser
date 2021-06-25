<template>
  <div class="search-box">
    <input type="text" class="search-input" :placeholder="$t('placeholder.placeholder_8')" v-model="search_transaction"/>
    <div class="search-btn" @click="goSearchData">
      {{$t('title.inquire') }}
    </div>
  </div>
</template>

<script>
import { tradingDetails, blockDetails} from '@/api/pcApi'
  export default {
    name: "SearchBox",
    props: {
      placeholder: {
        type: String,
        default: '',
      },
      searchBtnName: {
        type: String,
        default: '查询',
      },
    },
    data() {
      return {
        search_transaction: '',
      }
    },
    methods: {
      handleSearch(){
        this.$emit('onSearch', this.search_transaction)
      },
      /* 区块详情hash或者账户地址查询*/
      goSearchData() {
        if (this.search_transaction == '') {
          if (this.$store.getters.language == 'en') {
            this.$message.error('Query transaction details transaction hash/account address cannot be empty!');
          } else {
            this.$message.error('查询交易详情账户详情不能为空！');
          }

        } else {
          // if(this.search_transaction.length != 66){
          this.search_transaction = this.search_transaction.trim()
          if(/^0x/g.test(this.search_transaction) == false){
             let address = this.to16Decimal(this.search_transaction)
              this.$router.push({
                path: 'addressDetail',
                query: {
                  address: this.to32Decimal(address)
                }
              })
          }else {
            let data = {
              hash: this.search_transaction,
            }
            tradingDetails(data).then(response => {
              if (response.data == null && response.code !== 508) {
                
                let data = {
                  blockHash: this.search_transaction
                }
                blockDetails(data).then(res => {
                  if(res.data) {
                    this.$router.push({
                      path: 'blockChainDetail',
                      query: {
                        blockHash: this.search_transaction
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
                
              } else if(response.code !== 508){
                // let type = response.data.transactionsList.dataList[0].txType
                this.$router.push({
                  path: 'tradeDetail',
                  query: {
                    hash: this.search_transaction
                  }
                })
              }
            })
          }

        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .search-box{
    height: 0.7rem;
    width: 6rem;
    border-radius: 0.1rem;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-shadow: 0 0.1rem 0.9rem 0 rgba(207, 207, 207, 0.09);
    display: flex;
    overflow: hidden;
    margin-bottom: 0.3rem;
    .search-input{
      height: 100%;
      flex: 1;
      border: none;
      font-size: 0.2rem;
      padding-left: 0.45rem;
      font-weight: 400;
      outline: none;
    }
    input::-webkit-input-placeholder{
      color:#A19DAA;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
      color:#A19DAA;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
      color:#A19DAA;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
      color:#A19DAA;
    }

    .search-btn{
      height: 100%;
      width:0.97rem;
      background: $themeColor;
      color: #fff;
      font-weight: 400;
      font-size: 0.2rem;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
</style>
