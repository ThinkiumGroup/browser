
import moment from 'moment'
import BigNumber from "bignumber.js"
import Iban from '@/assets/web3-eth-iban/src/index'
export default {
  install(Vue, opt) {
    Vue.prototype.$tableRowClassName = function ({ row, rowIndex}) {
      if(rowIndex %2 == 1) {
        return 'eventRowBg'
      }
    }
    /*table=>header颜色*/
    Vue.prototype.tableHeaderColor = function ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #8758FF;color: #FFFFFF;font-weight: 600;font-size: 0.15rem;height:58px;'
      }
    }
    /*地址正常截取*/
    Vue.prototype.sliceHash = function (e, num = 4) {
      if (e == '' || e == null || e == undefined) {
        return ''
      } else {
        let a = e.slice(0, num)
        let b = e.substring(e.length - num)
        let c = a + ' *** ' + b
        return c
      }
    }
    /*地址转32后正常截取*/
    Vue.prototype.sliceAddress = function (e) {
      if (e == '' || e == null || e == undefined) {
        return ''
      } else {
        e = this.to32Decimal(e)
        let a = e.slice(0, 4)
        let b = e.substring(e.length - 4)
        let c = a + ' *** ' + b
        return c
      }
    }
    /*地址转32*/
    Vue.prototype.sliceAddress1 = function (e) {

      if (e == '' || e == null || e == undefined) {
        return ''
      } else {
        let c = this.to32Decimal(e)
        return c
      }
    }
    /*链列表*/
    Vue.prototype.getChainInfoStruct = function (e) {
      let chain_list = {}
      chain_list.zh_chain_arr = [
        { 'label': '全部', 'value': '', 'is_have': true },
      ]
      chain_list.en_chain_arr = [
        { 'label': 'All', 'value': '', 'is_have': true },
      ]
      getChainInfoStruct().then(response => {
        chain_list.zh_chain_arr.push({ 'label': '主链', 'value': 0, 'is_have': true })
        chain_list.en_chain_arr.push({ 'label': 'Main chain', 'value': 0, 'is_have': true })
        if (response.data.childrens.length == 0 || response.data.childrens == null) {
        } else {
          response.data.childrens.forEach((item, index, self) => {
            if (item.childrens.length == 0) {
              chain_list.zh_chain_arr.push({
                'label': '任务链' + (index + 1) + '(' + item.chainId + '#)',
                'value': item.chainId,
                'is_have': false
              })
              chain_list.en_chain_arr.push({
                'label': 'Task chain' + (index + 1) + '(' + item.chainId + '#)',
                'value': item.chainId,
                'is_have': false
              })
            } else {
              chain_list.zh_chain_arr.push({
                'label': '任务链' + (index + 1) + '(' + item.chainId + '#)',
                'value': item.chainId,
                'is_have': true
              })
              chain_list.en_chain_arr.push({
                'label': 'Task chain' + (index + 1) + '(' + item.chainId + '#)',
                'value': item.chainId,
                'is_have': true
              })
              item.childrens.forEach((item1, index1, self1) => {
                chain_list.zh_chain_arr.push({
                  'label': '任务链' + (index + 1) + '(' + item.chainId + '#) / 账户链' + (index1 + 1) + '(' + item1.chainId + '#)',
                  'value': item1.chainId,
                  'is_have': false
                })
                chain_list.en_chain_arr.push({
                  'label': 'Task chain' + (index + 1) + '(' + item.chainId + '#) / Trading chain' + (index1 + 1) + '(' + item1.chainId + '#)',
                  'value': item1.chainId,
                  'is_have': false
                })
              })
            }
          })
        }

      })
      return chain_list
    }
    /*时间戳转换=>moment*/
    Vue.prototype.timestampToTime = function (timestamp) {
      let time = ''
      if (timestamp == '' || timestamp == null || timestamp == undefined) {
        time = ''
      } else {
        time = moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
      }
      return time
    }
    /*金额转换*/
    Vue.prototype.scientificCounting = function (e) {
      let num = 0
      if (e == 0 || e == '' || e == null || e == undefined || e == NaN) {
        num = 0
      } else {
        num = new BigNumber(`${e}`).div("1e+18").toString(10);
        // if(num.indexOf('.') !== -1 && num.split('.')[1].length > 6){
        //   num = parseFloat(num).toFixed(6)
        // }
      }
      return num
    }
    /*16进制转32进制*/
    Vue.prototype.to32Decimal = function (e) {
      let ban = ''

      if (e == '' || e == undefined) {
        ban = ''
      } else {
        ban = Iban.toIban(e);
      }
      return ban
    }
    /*32进制转16进制*/
    Vue.prototype.to16Decimal = function (e) {
      let ban;

      if(e === 'TH48000000000000000000000000001EKI'){
        return '0x0000000000000000000000000000000000010002';
      }
      if (e == '' || e == undefined) {
        ban = ''
      } else {
        ban = Iban.toAddress(e).toLowerCase()
        // ban= Iban.default.toAddress(e)
      }
      return ban
    },
    Vue.prototype.transformAddress = function(val, type) {  //type值必须传TH或者0x哦
      let is32Decimal = /^TH/g.test(val)
      if(type == 'TH' && !is32Decimal) {
          val = this.to32Decimal(val)
          console.log('我把他转成了TH')
      }
      if(type == '0x' && is32Decimal) {
          val = this.to16Decimal(val)
          console.log('我把他转成了0x')
      }
      return val
    }
  }
}
