<template>
  <div class="content-wrap">
    <!-- <div class="search-area">
      <SearchBox placeholder="请输入区块hash / 交易hash / 用户地址" @onSearch="handleSearch"/>
    </div> -->
    <div class="main-title">
      {{$t('title.transaction_details')}}
    </div>
    <div class="middle-block _block">
      <div class="middle-item">
        <div class="middle-item-title">
          {{$t('table.transaction_hash')}}
        </div>
        <div class="middle-item-content-1">
          
            <span>{{allData.tradingHash || $route.query.hash}}</span>
          
        </div>
      </div>
      <div class="middle-item">
        <div class="middle-item-title">
          {{$t('table.own_chain')}}
        </div>
        <div class="middle-item-content-2">
          {{$t(allData.chainOfAffiliation) || $t(chainName) }}
        </div>
      </div>
    </div>
    <!--<div class="con-title" v-if="currencyPc">
      {{$t('table.own_chain')}}：
      <span class=" color-choose">{{$t(allData.chainOfAffiliation)}}</span>
    </div>
    <div class="con-title" style="font-size: 17px">
      {{$t('title.transaction_details')}}
    </div>-->
    <div class="_block main-info">
      <div class="caption">
        <img src="@/assets/images/tradeDetail/trade-mark.png" class="caption-image">
        <span class="caption-text">
          {{$t('title.trading_information')}}
        </span>
      </div>
      
      <div class="item-row">
        <div class="item-title">
          {{$t('table.state')}}
        </div>
        <div class="item-content">
          <span class="el-icon-success state-success" v-show="allData.status==1"></span>
          <span class="state-success-text" v-show="allData.status==1">{{$t('title.success')}}</span>
          <span class="el-icon-error state-error" v-show="allData.status!=1"></span>
          <span class="state-error-text" v-show="allData.status!=1 && allData.status!=3">{{$t('title.failure')}}</span>
          <span v-show="allData.status == 3">{{$t('title.no_deal_found')}}</span>
        </div>
      </div>
      
      <div class="item-row">
        <div class="item-title">
          {{$t('table.ov_block')}}
        </div>
        <div class="item-content color-choose">
          <span class=" color-choose" @click="toBlockChainDetail(allData.chainId, allData.belongToBlock)"><span v-if="currencyPc">{{$t(allData.chainOfAffiliation)}} > </span>{{allData.belongToBlock}}</span>
        </div>
      </div>
      
      <div class="item-row">
        <div class="item-title">
          {{$t('table.timestamp')}}
        </div>
        <div class="item-content ">
          
          {{timestampToTime(allData.timeStamp)}}
        </div>
      </div>
      
      <div class="item-row">
        <div class="item-title">
          {{$t('table.transaction_type')}}
        </div>
        <div class="item-content">
          <span>{{$t(allData.parentTxTypeName)}} {{allData.childrenTxTypeName ? '-' : ''}} {{$t(allData.childrenTxTypeName)}}</span>
        </div>
      </div>
      
      <div class="item-row" v-if="allData.childrenTxTypeName == 'select.across_chain_trading_repeal'">
        <div class="item-title ">
          {{$t('title.return_address')}}
        </div>
        <div class="item-content color-choose" @click="toAddressDetails(allData.chainId,allData.getAddress)">
          {{sliceAddress1(allData.getAddress)}}
        </div>
      </div>
      
      <div class="item-row" v-if="allData.parentTxTypeName == 'select.contract_trading' && allData.childrenTxTypeName !='select.contract_issued'">
        <div class="item-title ">
          {{$t('table.is_user')}}
        </div>
        <div class="item-content color-choose" @click="toAddressDetails(allData.chainId,allData.sendAddress)">
          {{sliceAddress1(allData.sendAddress)}}
        </div>
      </div>
      
      <div class="item-row" v-if="allData.childrenTxTypeName == 'select.contract_issued' || allData.childrenTxTypeName == 'select.across_chain_trading_withdrawal'">
        <div class="item-title ">
          {{$t('table.initiator')}}
        </div>
        <div class="item-content color-choose" @click="toAddressDetails(allData.chainId,allData.sendAddress)">
          {{sliceAddress1(allData.sendAddress)}}
        </div>
      </div>
      
      <div class="item-row" v-if="allData.parentTxTypeName == 'select.contract_trading' || allData.childrenTxTypeName == 'select.across_chain_trading_withdrawal' || allData.childrenTxTypeName == 'select.across_chain_trading_repeal'">
        <div class="item-title">
          {{$t('table.contract')}}
        </div>
        <div class="item-content ">
          <span class="color-choose" @click="toAddressDetails(allData.chainId,allData.getAddress,allData.parentTxTypeName,'receiver')">{{sliceAddress1(allData.getAddress)}}</span>
                <div style="font-size:13px" v-for="(item,index) in allData.txlogs" :key="item.method + index">
                  <div v-if="item.method == 'Transfer'"><span>{{item.contractName}}</span> <span class="color-choose" @click="toAddressDetails(allData.chainId,item.contractAddress)">{{sliceAddress1(item.contractAddress)}}</span> <span>{{item.method}} {{item.other.value}} From </span> <span class="color-choose" @click="toAddressDetails(allData.chainId,item.other.from)">{{sliceAddress1(item.other.from) }}</span> To <span class="color-choose" @click="toAddressDetails(allData.chainId,item.other.to)">{{sliceAddress1(item.other.to) }}</span></div>
                  <div v-if="item.method != 'Transfer'">
                    <span>{{item.contractName}}</span> <span class="color-choose" @click="toAddressDetails(allData.chainId,item.contractAddress)">{{sliceAddress1(item.contractAddress)}}</span> <span>{{item.method}} </span>
                    <span v-for="(i,index) in Object.entries(item.other)" :key="index">
                      <span v-if="i[0] == 'nodeId' "><span>{{i[0]}}</span> <span>{{i[1]}} </span></span>
                      <span v-else><span>{{i[0]}}</span> <span :class="{'color-choose': /^0x/.test(i[1]) && !(/^0x/.test(sliceAddress1(i[1]))) == true }" @click="/^0x/.test(i[1]) ? toAddressDetails(allData.chainId,i[1]) : null">{{/^0x/.test(i[1]) ? sliceAddress1(i[1]) : i[1] }} </span></span>
                    </span>
                  </div>
                </div>
        </div>
      </div>
      
      <div class="item-row" v-if="allData.parentTxTypeName == 'select.contract_trading' && allData.chainId == '103'">
        <div class="item-title">
          {{$t('table.TokensTrading')}}
        </div>
        <div class="item-content ">
          <span style="margin-right:5px">{{allData.tokenTransaction && allData.tokenTransaction.num}}</span>
          <span><span class="color-choose" @click="toCurrencyDetails(allData.getAddress)">{{allData.tokenTransaction && allData.tokenTransaction.tokenName}}</span>  {{$t(allData.tokenTransaction ? 'title.from' : '')}} {{allData.tokenTransaction && sliceAddress1(allData.tokenTransaction.fromAddress)}} {{$t(allData.tokenTransaction ? 'title.transfer_to' : '')}} {{allData.tokenTransaction && sliceAddress1(allData.tokenTransaction.toAddress)}}</span>
        </div>
      </div>
      
      <div class="item-row" v-if="allData.childrenTxTypeName == 'select.across_chain_trading_deposit'">
        <div class="item-title ">
          {{$t('table.receiver')}}
        </div>
        <div class="item-content color-choose" @click="toAddressDetails(allData.chainId,allData.getAddress)">
          {{sliceAddress1(allData.getAddress)}}
          <div style="padding-left: 20px;font-size:13px" v-for="(item,index) in allData.txlogs" :key="item.method + index">
                  <div v-if="item.method == 'Transfer'"><span>{{item.contractName}}</span> <span class="color-choose" @click="toAddressDetails(allData.chainId,item.contractAddress)">{{sliceAddress1(item.contractAddress)}}</span> <span>{{item.method}} {{item.other.value}} From </span> <span class="color-choose" @click="toAddressDetails(allData.chainId,item.other.from)">{{sliceAddress1(item.other.from) }}</span> To <span class="color-choose" @click="toAddressDetails(allData.chainId,item.other.to)">{{sliceAddress1(item.other.to) }}</span></div>
                  <div v-if="item.method != 'Transfer'">
                    <span>{{item.contractName}}</span> <span class="color-choose" @click="toAddressDetails(allData.chainId,item.contractAddress)">{{sliceAddress1(item.contractAddress)}}</span> <span>{{item.method}} </span>
                    <span v-for="(i,index) in Object.entries(item.other)" :key="index">
                      <span v-if="i[0] == 'nodeId' "><span>{{i[0]}}</span> <span>{{i[1]}} </span></span>
                      <span v-else><span>{{i[0]}}</span> <span :class="{'color-choose': /^0x/.test(i[1]) && !(/^0x/.test(sliceAddress1(i[1]))) == true }" @click="/^0x/.test(i[1]) ? toAddressDetails(allData.chainId,i[1]) : null">{{/^0x/.test(i[1]) ? sliceAddress1(i[1]) : i[1] }} </span></span>
                    </span>
                  </div>
                </div>
        </div>
      </div>
      
      <div class="item-row" v-if="allData.parentTxTypeName == 'select.across_chain_trading'">
        <div class="item-title">
          {{$t('title.amount')}}
        </div>
        <div class="item-content">
         {{scientificCounting(allData.tradingAmount)}} HNW
        </div>
      </div>
      
      <div class="item-row" v-if="allData.parentTxTypeName == 'select.within_chain_trading'">
        <div class="item-title ">
          {{$t('table.issuer')}}
        </div>
        <div class="item-content color-choose" @click="toAddressDetails(allData.chainId,allData.sendAddress)">
          {{sliceAddress1(allData.sendAddress)}}
        </div>
      </div>
     
      <div class="item-row" v-if="allData.parentTxTypeName == 'select.within_chain_trading'">
        <div class="item-title ">
          {{$t('table.recipient')}}
        </div>
        <div class="item-content color-choose">
          <span class=" color-choose" @click="toAddressDetails(allData.chainId,allData.getAddress)">{{sliceAddress1(allData.getAddress)}}</span>
          <div style="" v-for="(item,index) in allData.txlogs" :key="item.method + index">
                  <div v-if="item.method == 'Transfer'"><span>{{item.method}} {{item.value}} From </span> <span class="color-choose" @click="toAddressDetails(allData.chainId,item.from)">{{sliceAddress1(item.from) }}</span> To <span class="color-choose" @click="toAddressDetails(allData.chainId,item.to)">{{sliceAddress1(item.to) }}</span></div>
                  <div v-if="item.method != 'Transfer'">
                    <span v-for="(i,index) in Object.entries(item)" :key="index">
                      <span v-if="i[0] == 'nodeId' "><span>{{i[0]}}</span> <span>{{i[1]}} </span></span>
                      <span v-else><span v-if="i[0] != 'method'">{{i[0]}}</span> <span :class="{'color-choose': /^0x/.test(i[1]) && !(/^0x/.test(sliceAddress1(i[1]))) == true }" @click="/^0x/.test(i[1]) ? toAddressDetails(allData.chainId,i[1]) : null">{{/^0x/.test(i[1]) ? sliceAddress1(i[1]) : i[1] }} </span></span>
                    </span>
                  </div>
                </div>
        </div>
      </div>
      
      <div class="item-row" v-if="allData.parentTxTypeName != 'select.across_chain_trading' && currencyPc">
        <div class="item-title">
          {{$t('table.transfer_amount')}}
        </div>
        <div class="item-content">
          {{scientificCounting(allData.tradingAmount)}} {{currencyPc}}
        </div>
      </div>
      
      <div class="item-row" v-if="currencyPc">
        <div class="item-title">
          {{$t('table.transaction_fee')}}
        </div>
        <div class="item-content ">
          {{scientificCounting(allData.tradingFeeAmount)}} {{currencyPc}}
        </div>
      </div>
      
      <div class="item-row" v-if="allData.childrenTxTypeName == 'select.across_chain_trading_withdrawal'">
        <div class="item-title cta_all_con_left_last" style="line-height: 100px">
          {{$t('title.check_content')}}
        </div>
        <div class="item-content cta_all_con_right_last">
          {{allData.input}}
        </div>
      </div>
      
       <div class="item-row" v-if="allData.parentTxTypeName == 'select.across_chain_trading'">
          <div class="item-title cta_all_con_left_last" style="line-height: 150px;height: 150px">
            {{$t('title.rpt')}}
          </div>
       </div>
      
      
      <div class="item-row">
        <div class="item-title cta_all_con_left_last" style="line-height: 100px">
          {{$t('table.input_data')}}
        </div>
        <div class="item-content cta_all_con_right_last">
          <span v-if="allData.childrenTxTypeName == 'select.poc_lock' && allData.pocTicketWeek">{{allData.pocTicketWeek}}</span>
          <span v-if="allData.childrenTxTypeName == 'select.poc_prizes' && allData.inputInverseSolution ">
            <span>{{$t('title.prize_amount')}}:  {{allData.inputInverseSolution && allData.inputInverseSolution.inputValueMap.earnRecord[0].balance / 1000000000000000000}} {{currencyPc}}</span> <br />
            <span>{{$t('title.receiving_address')}}:  {{sliceAddress1(allData.inputInverseSolution && allData.inputInverseSolution.inputValueMap.earnRecord[0].addr)}}</span>
          </span>
          <span v-if="allData.childrenTxTypeName == 'select.poc_redemption' && allData.inputInverseSolution">
            <span>{{$t('title.redemption_amount')}}:  {{allData.inputInverseSolution && allData.inputInverseSolution.inputValueMap.record.balance / 1000000000000000000}} {{currencyPc}}</span> <br />
            <span>{{$t('title.redemption_address')}}:  {{sliceAddress1(allData.inputInverseSolution && allData.inputInverseSolution.inputValueMap.record.addr)}}</span>
          </span>
          <span v-if="allData.childrenTxTypeName == 'select.pos_award' && allData.inputInverseSolution ">{{$t('title.receive_amount')}}: {{allData.inputInverseSolution && allData.inputInverseSolution.inputValueMap.value /1000000000000000000}} {{currencyPc}}</span>
          <span v-if="allData.childrenTxTypeName != 'select.poc_lock' && allData.childrenTxTypeName != 'select.poc_prizes' && allData.childrenTxTypeName != 'select.poc_redemption' && allData.childrenTxTypeName != 'select.pos_award'">{{allData.inputData}}</span>
        </div>
      </div>
      <div class="item-row" v-if="showInputTransformButton">
        <div class="item-title cta_all_con_left_last" style="line-height: 100px;">
          <el-button @click="stringFrom16Decimal()" style="margin:40px" type="primary">{{$t('title.transform')}}</el-button>
        </div>
        <div class="item-content cta_all_con_right_last">{{inputDataString}}</div>
      </div>

    </div>

    <div class="transform-content" v-if="inputDataString">{{inputDataString}}</div>
  </div>
</template>

<script>
  import { tradingDetails} from '@/api/pcApi'
  import SearchBox from "../../components/SearchBox";

  export default {
    name: 'tradeDetail',
    components: { SearchBox },
    data() {
      return {
        allData: {
          status: 1
        },
        type: '',
        currencyPc: '',
        inputDataString: '',
        chainName: '',
        showInputTransformButton: false,
      }
    },
    methods: {
      transformChainState(value) {
        return value = value == 0 ? "title.main_chain" : (value == 1 ? "title.trading_chain" : (value == 2 ? "title.pos_reward_chain" : value == 103 ? "title.new_ecology_business_chain" : ''))
      },
      handleSearch(e){
        console.log(e);
      },
      async getData() {
        let data = {
          hash: this.$route.query.hash
        }
        let res = await tradingDetails(data)
        this.allData = res.data
        if(res.code == 508) {
          console.log('拉萨大家发了受到激发动力')
          this.allData = {}
          this.allData.status = 3
        }
        if(this.allData.inputInverseSolution) {
          this.allData.inputInverseSolution = JSON.parse(this.allData.inputInverseSolution)
          console.log(this.allData.inputInverseSolution)
        }
      },
      stringFrom16Decimal() {
        let str = this.allData.inputData.slice(2)
        const buffer = new Buffer.from(str,'hex').toString('utf8')
        this.inputDataString = buffer + ''
      },
       /* 跳转到币种详情页 */
    toCurrencyDetails (val) {
        this.$router.push({
            path: 'currencyDetail',
            query: {
              contractAddress: this.to32Decimal(val)
            }
        })
    },
      /*查看区块详情*/
      toBlockChainDetail( id, h, e) {
        this.$router.push({
          path: 'blockchainDetail',
          query: {
            height: h,
            chainId: id
          }
        })
      },
      /*点击地址跳到地址详情*/
      toAddressDetails(id, address, type, peo) {
        address = this.sliceAddress1(address)
        //address是地址的话会变成TH，还是ox说明这不是地址，所以不让跳转
        if(/^0x/.test(address)) return
        let query = {
                chainId: id,
                address: this.to32Decimal(address),
                type,
                peo
              }
        this.$router.push({
            path: 'addressDetail',
            query: query,
        })
      }
    },
    created() {
      this.type = 1
      this.currencyPc = localStorage.getItem('currencyPc')
      this.chainName = this.transformChainState(this.$route.query.chainId)
      this.getData();


      const hash = this.$route.query.hash;
      const inputTransform = this.$route.query.inputTransform;
      this.showInputTransformButton = inputTransform || hash === '0xa8d9bc621eb0a540af537505d9eafd0a54db531fe0a1108b4a7ef9b6e7088caa'
    }
  }
</script>
<style lang="scss" scoped>
  .transform-content {
    max-height: 500px;
    overflow: hidden;
    overflow-y: auto;
    border: 1px solid #333333;
    padding: 20px;
  }
  .state-success {
    color: #6DC542;
    font-size: 25px;
    position: relative;
    top: 3px;
  }

  .state-error {
    color: #F56C6C;
    font-size: 25px;
    position: relative;
    top: 3px;
  }

  .state-success-text {
    color: #6DC542
    /*font-size: 25px;*/
  }

  .state-error-text {
    color: #F56C6C;
  }

  .content-wrap {
    width: 100%;
    margin-bottom: 80px;
  }

  .con-title {
    height: 45px;
    font-size: 18px;
    /* color: #800080; */
    padding-bottom: 20px;
  }

  .cta_all_con_right_last::-webkit-scrollbar { /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .cta_all_con_right_last::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
    background: #b5b5b5;
  }

  .cta_all_con_right_last::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: #ffffff;
  }

  .cta_all_con_right_last {
    height: 100px;
    overflow: auto;
  }

  .cta_all_con_left_last {
    height: 100px;
  }

  .item-row {
    display: flex;
    border-bottom: 2px solid #F6F4FB;
    line-height: 0.68rem;
  }

  .item-title {
    padding-left: 3.56rem;
    /* width: 20%; */
    width: 9.98rem;
    /*line-height: 3;*/
    /*border-right: 1px solid #DCDFE6;*/
  }

  .item-content {
    word-break: break-all;
    width: 75%;
    /*line-height: 3;*/
    padding: 0 15px;
  }

  .item-wrap {
    width: 100%;
    border: 1px solid #DCDFE6;
    border-bottom: 0px;
    /*display: flex;*/
  }
  .search-area{
    display: flex;
    justify-content: flex-end;
    /*width: 16.82rem;*/
    margin: 0 auto;
  }
  

  ._block{
    /*width: 15.1rem;*/
    border-radius: 0.1rem;
    background: #FFF;
    box-shadow: 0 0.1rem 0.21rem 0.06rem rgba(186, 177, 212, 0.16);
    margin: 0 auto;
    .caption{
      line-height: 0.62rem;
      border-bottom: 2px solid #F6F4FB;
      display: flex;
      align-items: center;
      padding-left: 0.17rem;
      .caption-image{
        width: 0.288rem;
        height: 0.289rem;
      }
      .caption-text{
        color: $themeColor;
        font-size: 0.24rem;
        margin-left: 0.16rem;
        font-weight: bold;
      }
    }

  }


  .middle-block{
    height: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .middle-item{
      display: flex;
      align-items: center;
      // width: 50%;
      // padding-left: 2.24rem;
      // padding-left: 1.12rem;
      .middle-item-title{
        color: #666;
        font-size: 0.18rem;
        margin-right: 0.24rem;
        position: relative;
        &:before{
          content: '';
          display: inline-block;
          width: 0.05rem;
          height: 0.05rem;
          border-radius: 50%;
          background: $themeColor;
          transform: translate(0, -50%);
          position: absolute;
          top: 50%;
          left: -0.19rem;

        }
      }
      .middle-item-content-1{
        color: $themeColor;
        font-size: 0.20rem;
      }
      .middle-item-content-2{
        color: $themeColor;
        font-size: 0.3rem;
      }
    }
  }
  .main-info{
    margin-top: 0.3rem;
  }

</style>
