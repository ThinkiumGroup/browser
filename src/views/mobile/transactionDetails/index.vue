<template>
  <div class="mobile-transactionDetails-container container-background-clor">
    <!-- 返回头部 -->
    <RetrunHeader :title="$t('title.transaction_details')" />
    <!-- 详情主体 -->
    <div class="mobile-transactionDetails-body">
      <Searchaddress />
      <div class="mobile-transactionDetails-head mobile-block">
        <div>
          <p><span>{{$t('table.transaction_hash')}}: </span>
            {{ hash }}
             <img @click="copy(hash)" src="@/assets/images/address/copy.png" >
          </p>
        </div>
        <div>
          <p v-if="currency">
            <span>{{$t('table.own_chain')}}: </span>{{ $t(data.chainOfAffiliation) }}
          </p>
        </div>
      </div>
      <div class="mobile-transactionDetails-body-detail mobile-block">
        <div class="transactionDetails-body-title">
          <img src="@/assets/images/tradeDetail/trade-mark.png" />
          <p>{{$t('title.trading_information')}}</p>
        </div>
        <div class="mobile-transactionDetails-body-detail-item">
          <p>{{ $t("table.state") }}</p>
          <div v-if="data.status == 1">
            {{ $t("title.success") }}
            <img src="@/assets/images/tradeDetail/success.png" />
          </div>
          <div v-else-if="data.status == 0">
            {{ $t("title.failure") }}
            <img src="@/assets/images/tradeDetail/failure.png" />
          </div>
        </div>
        <div class="mobile-transactionDetails-body-detail-item">
          <p>{{ $t("table.ov_block") }}</p>
          <div @click="toBlockDetails" class="owned-block">
            {{ data.belongToBlock }}
          </div>
        </div>
        <div class="mobile-transactionDetails-body-detail-item">
          <p>{{ $t("table.timestamp") }}</p>
          <div style="font-weight: 500">
            {{ timestampToTime(data.timeStamp) }}
          </div>
        </div>
        <div class="mobile-transactionDetails-body-detail-item">
          <p>{{ $t("table.transaction_type") }}</p>
          <div>
            {{
              data.childrenTxTypeName
                ? $t(data.childrenTxTypeName)
                : $t(data.parentTxTypeName)
            }}
          </div>
        </div>
        <div class="mobile-transactionDetails-body-detail-item">
          <p>{{ $t("table.issuer") }}</p>
          <div @click="goAddressDetails(data.sendAddress)" class="address-detial">{{ to32Decimal(data.sendAddress) }}</div>
        </div>
        <div class="mobile-transactionDetails-body-detail-item">
          <p>{{ $t("table.recipient") }}</p>
          <div @click="goAddressDetails(data.getAddress)"  class="address-detial">{{ to32Decimal(data.getAddress) }}</div>
        </div>
        <div v-if="currency" class="mobile-transactionDetails-body-detail-item">
          <p>{{ $t("table.transfer_amount") }}</p>
          <div>
            {{ data.tradingAmount && scientificCounting(data.tradingAmount) }}
            {{ currency }}
          </div>
        </div>
        <div v-if="currency" class="mobile-transactionDetails-body-detail-item">
          <p>{{ $t("table.transaction_fee") }}</p>
          <div>
            {{
              data.tradingFeeAmount && scientificCounting(data.tradingFeeAmount)
            }}
            {{ currency }}
          </div>
        </div>
        <div class="mobile-transactionDetails-body-detail-item">
          <p>{{ $t("title.input_data") }}</p>
          <div>{{ data.inputData }}</div>
        </div>
        <div class="mobile-transactionDetails-body-detail-item" v-if="showInputTransformButton">
          <p><el-button @click="stringFrom16Decimal()"  type="primary">{{$t('title.transform')}}</el-button></p>
          <div>{{ inputDataString }}</div>
        </div>
        <div style="border-bottom:0" v-if="json" class="mobile-transactionDetails-body-detail-item">
          <p>{{ $t("title.inverse_solution") }}</p>
          <div>{{ json }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTradingDetails } from "@/api/mobileApi";
import RetrunHeader from "../components/RetrunHeader";
import Searchaddress from "../components/Searchaddress";
import CardNav from "../components/CardNav";
import "./style.scss";
import _ from "lodash";
import copyFn from '@/utils/copy.js' 
export default {
  components: {
    RetrunHeader,
    Searchaddress,
    CardNav,
  },
  data() {
    return {
      data: {},
      hash: "",
      json: "",
      showInputTransformButton: false,
      inputDataString: '',
    };
  },
  created() {
    this.currency = localStorage.currency;
    const hash =
      this.$route.query.hash
     
    this.hash = hash;
    console.log(hash, 111111);
    getTradingDetails({ hash }).then((res) => {
      this.data = res.data;
      this.json =
        res.data.inputValue && JSON.parse(res.data.inputValue).inputValueMap;
    });

      const inputTransform = this.$route.query.inputTransform;
      this.showInputTransformButton = inputTransform || hash === '0xa8d9bc621eb0a540af537505d9eafd0a54db531fe0a1108b4a7ef9b6e7088caa'
  },
  methods: {
    goAddressDetails(address) {
      this.$router.push(`/addressDetails?address=${address}&chainId=${this.data.chainId}`)
    },
    toBlockDetails() {
      this.$router.push(
        `/blockDetails?block=${this.data.belongToBlock}&chainId=${this.data.chainId}`
      );
    },
     stringFrom16Decimal() {
        let str = this.data.inputData.slice(2)
        const buffer = new Buffer.from(str,'hex').toString('utf8')
        this.inputDataString = buffer + ''
      },
    copy(val) {
      copyFn(val)
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
  },
};
</script>
