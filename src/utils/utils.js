import moment from 'moment'
import BigNumber from "bignumber.js"
import md5 from 'js-md5'
export default {
    install(Vue, opt) {
        Vue.prototype.timestampToTime = function (timestamp) {
            let time = ''
            if (timestamp == '' || timestamp == null || timestamp == undefined) {
                time = ''
            } else {
                time = moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
            }
            return time
        }
        Vue.prototype.timestampToTime_1 = function (timestamp) {
            let time = ''
            if (timestamp == '' || timestamp == null || timestamp == undefined) {
                time = ''
            } else {
                time = moment(timestamp * 1000).format('YYYY-MM-DD')
            }
            return time
        }
        Vue.prototype.md5Password = function (e) {
            // let cipherText = CryptoJS.HmacSHA1(e, '87krsC!IPF@OBRPEOh#Uat9C').toString(CryptoJS.enc.Hex);
            let pas=md5(e)
            return pas;

        }
        Vue.prototype.scientificCounting = function (e) {
            let num = 0
            if (e == 0 || e == '' || e == null || e == undefined || e == NaN) {
                num = 0
            } else {
                num = new BigNumber(`${e}`).div("1e+18").toString(10);
            }
            return num
        }
        //0x  -> th
        Vue.prototype.to32Decimal = function (e) {
            let ban =''
            if(e==''||e==undefined){
                ban=''
            }else {
                ban= Iban.default.toIban(e);
            }
            return ban
        }
        Vue.prototype.to16Decimal = function (e) {
            let ban =''
            if(e === 'TH48000000000000000000000000001EKI'){
              return '0x0000000000000000000000000000000000010002';
            }

            if(e==''||e==undefined){
                ban=''
            }else {
                ban= Iban.default.toAddress(e).toLowerCase()
                // ban= Iban.default.toAddress(e)
            }
            return ban
        }


    }

}
